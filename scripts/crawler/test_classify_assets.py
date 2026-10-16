import os
import sys
import json
import urllib.request
import ssl
from PIL import Image
import io

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0'}

with open('crawl_data/discovered_images.json', 'r', encoding='utf-8') as f:
    images_dict = json.load(f)

# Also check products.json for high-res product images
with open('crawl_data/products.json', 'r', encoding='utf-8') as f:
    pdata = json.load(f)

product_img_urls = {}
for p in pdata['products']:
    is_combo = 'combo' in p['handle']
    for idx, img in enumerate(p.get('images', [])):
        src = img['src']
        clean = src.split('?')[0]
        product_img_urls[clean] = {
            'src': src,
            'handle': p['handle'],
            'is_combo': is_combo,
            'alt': img.get('alt') or p['title'],
            'order': idx
        }

print(f"Total discovered image URLs in HTML: {len(images_dict)}")
print(f"Total product images in products.json: {len(product_img_urls)}")

# Combine all unique clean URLs
all_targets = {}

for clean_url, data in images_dict.items():
    if not clean_url.startswith('http'):
        continue
    # skip tiny tracking pixels or shopify system icons if any
    if 'monorail' in clean_url or 'boomerang' in clean_url:
        continue
    all_targets[clean_url] = {
        'original_url': data['sample_raw_url'],
        'alt': data['alt'],
        'pages': data['pages'],
        'source': 'html'
    }

for clean_url, data in product_img_urls.items():
    if clean_url not in all_targets:
        all_targets[clean_url] = {
            'original_url': data['src'],
            'alt': data['alt'],
            'pages': [f"products_{data['handle']}.html"],
            'source': 'products.json'
        }
    else:
        all_targets[clean_url]['is_product'] = True
        all_targets[clean_url]['product_handle'] = data['handle']
        all_targets[clean_url]['is_combo'] = data['is_combo']

print(f"Total consolidated targets: {len(all_targets)}")

# Classification rules
def classify(url, item):
    u = url.lower()
    alt = item.get('alt', '').lower()
    pages = " ".join(item.get('pages', [])).lower()
    
    # 1. Logo
    if 'untitled_design_8' in u or 'logo' in u or 'korigo_logo' in u or 'logo' in alt:
        return 'logo'
        
    # 2. Hero / Slideshow
    if 'roasted_makhan_pops_in_irrestible_flavours' in u or 'slideshow' in pages or 'banner' in u:
        return 'hero'
        
    # 3. Founders
    if 'whatsapp_image_2026-04-27_at_12.39.04' in u or 'whatsapp_image_2026-04-27_at_1.03.35' in u or 'sohini' in u or 'piya' in u:
        return 'founders'
        
    # 4. Certifications
    if 'gemini_generated_image_mb7co0mb7co0mb7c' in u or 'whatsapp_image_2026-02-15_at_2.03' in u or 'untitled_design_10' in u or 'certification' in pages or 'fssai' in u or 'iso' in u:
        return 'certifications'
        
    # 5. Recipes
    if 'c9f98e1f-a65b' in u or '81639176-9ba7' in u or 'b47ebe72-b4fe' in u or 'recipe' in pages or 'smoothie' in alt or 'bhel' in alt or 'chia' in alt:
        return 'recipes'
        
    # 6. Blogs
    if 'blogs_' in pages or 'blog' in pages:
        return 'blogs'
        
    # 7. Combos
    if item.get('is_combo') or 'combo' in pages or 'combo' in u or 'creamonion_sassy' in u or 'garlic_sasy' in u:
        return 'combos'
        
    # 8. Products
    if item.get('is_product') or 'products_' in pages or 'white_front' in u or 'whitefront' in u or 'sriracha' in u or 'makhana' in u or 'citrus' in u or 'cinnamon' in u or 'coco' in u:
        return 'products'
        
    # 9. Icons
    if 'icon' in u or '.svg' in u or 'loader' in u or 'star' in u:
        return 'icons'
        
    return 'general'

classified = {}
for u, item in all_targets.items():
    cat = classify(u, item)
    classified.setdefault(cat, []).append((u, item))

for cat, lst in classified.items():
    print(f"Category '{cat}': {len(lst)} assets")
