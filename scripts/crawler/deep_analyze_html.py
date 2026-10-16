import os
import glob
import json
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

files = glob.glob('crawl_data/html/*.html')
print(f"Analyzing {len(files)} HTML files...")

all_internal_links = set()
all_external_links = set()
all_images = {} # url -> {src, alt, pages: []}
all_css = set()
all_fonts = set()
design_tokens = {
    'colors': set(),
    'font_families': set()
}

for fpath in files:
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Links
    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        if not href or href.startswith('javascript:') or href.startswith('#') or href.startswith('tel:') or href.startswith('mailto:'):
            continue
        if href.startswith('/'):
            all_internal_links.add(href.split('?')[0])
        elif 'korigosnacks.com' in href:
            p = urlparse(href).path
            all_internal_links.add(p)
        else:
            all_external_links.add(href)
            
    # 2. Images
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        srcset = img.get('srcset') or img.get('data-srcset')
        alt = img.get('alt', '').strip()
        
        sources = []
        if src:
            sources.append(src)
        if srcset:
            for s in srcset.split(','):
                parts = s.strip().split()
                if parts:
                    sources.append(parts[0])
                    
        for s in sources:
            if s.startswith('//'):
                s = 'https:' + s
            clean_url = s.split('?')[0]
            if clean_url not in all_images:
                all_images[clean_url] = {
                    'raw_urls': set([s]),
                    'alt': alt,
                    'pages': set([fname])
                }
            else:
                all_images[clean_url]['raw_urls'].add(s)
                all_images[clean_url]['pages'].add(fname)
                if alt and not all_images[clean_url]['alt']:
                    all_images[clean_url]['alt'] = alt
                    
    # Also background images in style attributes
    for el in soup.find_all(style=True):
        style = el['style']
        bg_matches = re.findall(r'url\([\'"]?([^\'"\)]+)[\'"]?\)', style)
        for bg in bg_matches:
            if bg.startswith('//'):
                bg = 'https:' + bg
            clean_url = bg.split('?')[0]
            if clean_url not in all_images:
                all_images[clean_url] = {'raw_urls': {bg}, 'alt': 'background', 'pages': {fname}}
            else:
                all_images[clean_url]['pages'].add(fname)

    # 3. CSS
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href')
        if href:
            if href.startswith('//'):
                href = 'https:' + href
            all_css.add(href)

    # 4. Fonts
    font_matches = re.findall(r'https?://[^\s"\']+\.(?:woff2|woff|ttf|otf)', html)
    for fm in font_matches:
        all_fonts.add(fm)

print(f"Total Unique Internal Link Paths: {len(all_internal_links)}")
print(f"Total Unique External Links: {len(all_external_links)}")
print(f"Total Unique Image URLs: {len(all_images)}")
print(f"Total Stylesheets: {len(all_css)}")
print(f"Total Fonts: {len(all_fonts)}")

# Save links
with open('crawl_data/internal_links.json', 'w', encoding='utf-8') as f:
    json.dump(sorted(list(all_internal_links)), f, indent=2)

with open('crawl_data/external_links.json', 'w', encoding='utf-8') as f:
    json.dump(sorted(list(all_external_links)), f, indent=2)

# Save images manifest
images_export = {}
for k, v in all_images.items():
    images_export[k] = {
        'clean_url': k,
        'alt': v['alt'],
        'sample_raw_url': list(v['raw_urls'])[0],
        'pages': sorted(list(v['pages']))
    }

with open('crawl_data/discovered_images.json', 'w', encoding='utf-8') as f:
    json.dump(images_export, f, indent=2)

with open('crawl_data/discovered_css.json', 'w', encoding='utf-8') as f:
    json.dump(sorted(list(all_css)), f, indent=2)

with open('crawl_data/discovered_fonts.json', 'w', encoding='utf-8') as f:
    json.dump(sorted(list(all_fonts)), f, indent=2)

print("Saved internal_links.json, external_links.json, discovered_images.json, discovered_css.json, discovered_fonts.json")
