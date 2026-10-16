import os
import sys
import json
import urllib.request
import ssl
from PIL import Image
import io
import re

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def clean_filename(url):
    path = url.split('?')[0]
    fname = os.path.basename(path)
    # clean any strange characters
    fname = re.sub(r'[^a-zA-Z0-9_\.-]', '_', fname)
    return fname

# 1. Load HTML images
with open('crawl_data/discovered_images.json', 'r', encoding='utf-8') as f:
    images_dict = json.load(f)

# 2. Load products.json
with open('crawl_data/products.json', 'r', encoding='utf-8') as f:
    pdata = json.load(f)

# 3. Load blog sitemap
import xml.etree.ElementTree as ET
blog_root = ET.parse('crawl_data/sitemap_blogs_1.xml').getroot()
blog_sitemap_imgs = {}
for u in blog_root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
    loc = u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text
    for img in u.findall('{http://www.google.com/schemas/sitemap-image/1.1}image'):
        iloc = img.find('{http://www.google.com/schemas/sitemap-image/1.1}loc')
        ititle = img.find('{http://www.google.com/schemas/sitemap-image/1.1}title')
        if iloc is not None and iloc.text:
            blog_sitemap_imgs[iloc.text.split('?')[0]] = {
                'raw': iloc.text,
                'page': loc,
                'alt': ititle.text if ititle is not None else ''
            }

# 4. Load recipe images
with open('crawl_data/product_recipes.json', 'r', encoding='utf-8') as f:
    recipes_data = json.load(f)

recipe_imgs = {}
for prod_handle, r_list in recipes_data.items():
    for r in r_list:
        if r.get('image'):
            img_url = r['image']
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            recipe_imgs[img_url.split('?')[0]] = {
                'raw': img_url,
                'page': f'/products/{prod_handle}',
                'alt': r['name']
            }

all_assets = {}

# Add product images from products.json (highest resolution, no crop)
for p in pdata['products']:
    is_combo = 'combo' in p['handle']
    for idx, img in enumerate(p.get('images', [])):
        src = img['src']
        clean = src.split('?')[0]
        cat = 'combos' if is_combo else 'products'
        all_assets[clean] = {
            'original_url': src,
            'clean_url': clean,
            'page': f"/products/{p['handle']}",
            'type': cat,
            'alt': img.get('alt') or p['title']
        }

# Add blog images from sitemap
for clean, data in blog_sitemap_imgs.items():
    if clean not in all_assets:
        all_assets[clean] = {
            'original_url': data['raw'],
            'clean_url': clean,
            'page': data['page'],
            'type': 'blogs',
            'alt': data['alt']
        }

# Add recipe images
for clean, data in recipe_imgs.items():
    if clean not in all_assets:
        all_assets[clean] = {
            'original_url': data['raw'],
            'clean_url': clean,
            'page': data['page'],
            'type': 'recipes',
            'alt': data['alt']
        }

# Add all other HTML images
for clean, data in images_dict.items():
    if not clean.startswith('http'):
        continue
    if clean in all_assets:
        continue
    
    # Classify
    u = clean.lower()
    alt = data.get('alt', '').lower()
    pages = " ".join(data.get('pages', [])).lower()
    
    if 'untitled_design_8' in u or 'logo' in u or 'korigo_logo' in u:
        cat = 'logo'
    elif 'roasted_makhan_pops_in_irrestible_flavours' in u:
        cat = 'hero'
    elif 'whatsapp_image_2026-04-27_at_12.39.04' in u or 'whatsapp_image_2026-04-27_at_1.03.35' in u:
        cat = 'founders'
    elif 'gemini_generated_image_mb7co0mb7co0mb7c' in u or 'whatsapp_image_2026-02-15_at_2.03' in u or 'untitled_design_10' in u or 'fssai' in u:
        cat = 'certifications'
    elif 'c9f98e1f-a65b' in u or '81639176-9ba7' in u or 'b47ebe72-b4fe' in u or 'recipe' in pages:
        cat = 'recipes'
    elif 'blogs_' in pages:
        cat = 'blogs'
    elif 'combo' in pages or 'combo' in u or 'creamonion_sassy' in u or 'garlic_sasy' in u:
        cat = 'combos'
    elif 'products_' in pages or 'white_front' in u or 'whitefront' in u or 'sriracha' in u or 'makhana' in u or 'citrus' in u or 'cinnamon' in u or 'coco' in u:
        cat = 'products'
    elif '.svg' in u or 'icon' in u or 'loader' in u or 'star' in u:
        cat = 'icons'
    else:
        cat = 'general'
        
    all_assets[clean] = {
        'original_url': data['sample_raw_url'],
        'clean_url': clean,
        'page': data['pages'][0] if data['pages'] else '/',
        'type': cat,
        'alt': data['alt']
    }

print(f"Total unique assets to catalog and download: {len(all_assets)}")

# Prepare directories
base_dir = 'public/assets/korigo'
categories = ['logo', 'products', 'combos', 'hero', 'founders', 'certifications', 'blogs', 'recipes', 'icons', 'general']
for cat in categories:
    os.makedirs(os.path.join(base_dir, cat), exist_ok=True)

manifest = []
inventory_list = []
asset_counter = 1

for clean, item in sorted(all_assets.items(), key=lambda x: (x[1]['type'], x[0])):
    cat = item['type']
    orig_url = item['original_url']
    orig_fname = clean_filename(clean)
    local_rel_path = f"/assets/korigo/{cat}/{orig_fname}"
    local_full_path = os.path.join(base_dir, cat, orig_fname)
    
    # Download
    print(f"[{asset_counter}/{len(all_assets)}] Downloading ({cat}): {orig_fname}...")
    width = 0
    height = 0
    fmt = ''
    try:
        req = urllib.request.Request(orig_url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            data_bytes = resp.read()
            with open(local_full_path, 'wb') as f:
                f.write(data_bytes)
                
            # inspect image
            try:
                img = Image.open(io.BytesIO(data_bytes))
                width, height = img.size
                fmt = img.format.lower() if img.format else orig_fname.split('.')[-1]
            except:
                fmt = orig_fname.split('.')[-1]
    except Exception as e:
        print(f"Failed downloading {orig_url}: {e}")
        continue
        
    manifest_entry = {
        "originalUrl": orig_url,
        "localPath": local_rel_path,
        "page": item['page'],
        "type": cat
    }
    manifest.append(manifest_entry)
    
    inventory_entry = {
        "asset_id": f"AST-{asset_counter:03d}",
        "original_url": orig_url,
        "page": item['page'],
        "asset_type": cat,
        "original_filename": orig_fname,
        "local_filename": f"{cat}/{orig_fname}",
        "local_path": local_rel_path,
        "width": width,
        "height": height,
        "format": fmt,
        "alt_text": item['alt'],
        "usage": f"Used on {item['page']} as {cat}"
    }
    inventory_list.append(inventory_entry)
    asset_counter += 1

# Save manifest.json
with open(os.path.join(base_dir, 'manifest.json'), 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)

with open('crawl_data/assets_inventory.json', 'w', encoding='utf-8') as f:
    json.dump(inventory_list, f, indent=2)

print(f"\nDone! Downloaded {len(manifest)} assets. Manifest and inventory saved.")
