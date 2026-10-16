import urllib.request
import json
import ssl
import xml.etree.ElementTree as ET
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
        return resp.read()

def main():
    os.makedirs('crawl_data', exist_ok=True)
    
    print("Fetching sitemap.xml...")
    try:
        sitemap_xml = fetch('https://korigosnacks.com/sitemap.xml').decode('utf-8')
        with open('crawl_data/sitemap.xml', 'w', encoding='utf-8') as f:
            f.write(sitemap_xml)
        print("Saved sitemap.xml")
        
        # parse sitemap index
        root = ET.fromstring(sitemap_xml)
        sub_sitemaps = []
        for sitemap in root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}sitemap'):
            loc = sitemap.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
            if loc is not None and loc.text:
                sub_sitemaps.append(loc.text)
        print(f"Found {len(sub_sitemaps)} sub-sitemaps: {sub_sitemaps}")
        
        all_urls = []
        for sm in sub_sitemaps:
            sm_content = fetch(sm).decode('utf-8')
            sm_filename = sm.split('/')[-1].split('?')[0]
            with open(f'crawl_data/{sm_filename}', 'w', encoding='utf-8') as f:
                f.write(sm_content)
            sm_root = ET.fromstring(sm_content)
            for url in sm_root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
                loc = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
                lastmod = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod')
                # check for images in sitemap
                images = []
                for img in url.findall('{http://www.google.com/schemas/sitemap-image/1.1}image'):
                    img_loc = img.find('{http://www.google.com/schemas/sitemap-image/1.1}loc')
                    img_title = img.find('{http://www.google.com/schemas/sitemap-image/1.1}title')
                    if img_loc is not None and img_loc.text:
                        images.append({'loc': img_loc.text, 'title': img_title.text if img_title is not None else ''})
                if loc is not None and loc.text:
                    all_urls.append({
                        'loc': loc.text,
                        'lastmod': lastmod.text if lastmod is not None else None,
                        'sitemap': sm_filename,
                        'images': images
                    })
        with open('crawl_data/all_sitemap_urls.json', 'w', encoding='utf-8') as f:
            json.dump(all_urls, f, indent=2)
        print(f"Total sitemap URLs discovered: {len(all_urls)}")
    except Exception as e:
        print(f"Error fetching sitemaps: {e}")

    print("\nFetching products.json...")
    try:
        products_raw = fetch('https://korigosnacks.com/products.json?limit=250').decode('utf-8')
        products_data = json.loads(products_raw)
        with open('crawl_data/products.json', 'w', encoding='utf-8') as f:
            f.write(products_raw)
        print(f"Discovered {len(products_data.get('products', []))} products in products.json")
    except Exception as e:
        print(f"Error fetching products.json: {e}")

    print("\nFetching collections.json...")
    try:
        collections_raw = fetch('https://korigosnacks.com/collections.json').decode('utf-8')
        collections_data = json.loads(collections_raw)
        with open('crawl_data/collections.json', 'w', encoding='utf-8') as f:
            f.write(collections_raw)
        print(f"Discovered {len(collections_data.get('collections', []))} collections in collections.json")
    except Exception as e:
        print(f"Error fetching collections.json: {e}")

if __name__ == '__main__':
    main()
