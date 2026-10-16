import os
import json
import urllib.request
import ssl
from bs4 import BeautifulSoup
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch_url(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=25) as resp:
        return resp.read()

urls_to_crawl = [
    # Homepage
    'https://korigosnacks.com/',
    # Collections
    'https://korigosnacks.com/collections/all',
    'https://korigosnacks.com/collections/frontpage',
    'https://korigosnacks.com/collections/product',
    'https://korigosnacks.com/collections/combo',
    # Pages
    'https://korigosnacks.com/pages/about-us',
    'https://korigosnacks.com/pages/our-story',
    'https://korigosnacks.com/pages/contact',
    'https://korigosnacks.com/pages/reviews-form',
    # Policies
    'https://korigosnacks.com/policies/refund-policy',
    'https://korigosnacks.com/policies/privacy-policy',
    'https://korigosnacks.com/policies/shipping-policy',
    'https://korigosnacks.com/policies/terms-of-service',
    # Blog Index
    'https://korigosnacks.com/blogs/news',
    # Blog Posts
    'https://korigosnacks.com/blogs/news/top-health-benefits-of-makhana-fox-nuts-lotus-seeds',
    'https://korigosnacks.com/blogs/news/makhana-for-weight-loss-how-to-eat',
    'https://korigosnacks.com/blogs/news/makhana-vs-other-snacks-why-its-the-healthiest',
    'https://korigosnacks.com/blogs/news/why-cheese-makhana-is-becoming-india-s-favorite-healthy-snack',
    'https://korigosnacks.com/blogs/news/healthy-makhana-recipes-you-can-make-at-home',
    'https://korigosnacks.com/blogs/news/top-5-healthy-snacks-for-desk-jobs',
    'https://korigosnacks.com/blogs/news/late-night-healthy-snacks-that-won-t-make-you-feel-guilty',
    # Products
    'https://korigosnacks.com/products/citrus-cartel-makhana',
    'https://korigosnacks.com/products/coco-world-makhana',
    'https://korigosnacks.com/products/creme-d-onion-makhana',
    'https://korigosnacks.com/products/garlicked-cheese-makhana',
    'https://korigosnacks.com/products/cinnamon-drip',
    'https://korigosnacks.com/products/sassy-sriracha',
    # Combos
    'https://korigosnacks.com/products/garlic-cheese-sassy-sriracha-combo',
    'https://korigosnacks.com/products/citrus-cartel-sassy-sriracha-combo',
    'https://korigosnacks.com/products/citrus-cartel-garlicked-cheese-combo',
    'https://korigosnacks.com/products/garlicked-cheese-cinnamon-drip-combo',
    'https://korigosnacks.com/products/cinnamon-drip-sour-cream-onion-combo',
    'https://korigosnacks.com/products/sassy-sriracha-sour-cream-onion-combo',
    # Cart / Account / Search
    'https://korigosnacks.com/cart',
    'https://korigosnacks.com/account/login',
    'https://korigosnacks.com/account/register',
    'https://korigosnacks.com/search'
]

os.makedirs('crawl_data/html', exist_ok=True)
page_metadata = {}

for url in urls_to_crawl:
    slug = url.replace('https://korigosnacks.com', '').strip('/')
    if not slug:
        slug = 'homepage'
    file_safe_slug = re.sub(r'[^a-zA-Z0-9_-]', '_', slug)
    filepath = f'crawl_data/html/{file_safe_slug}.html'
    
    print(f"Crawling {url} -> {filepath}")
    try:
        html = fetch_url(url)
        with open(filepath, 'wb') as f:
            f.write(html)
            
        soup = BeautifulSoup(html, 'html.parser')
        title = soup.title.string.strip() if soup.title and soup.title.string else ''
        meta_desc = ''
        desc_tag = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
        if desc_tag and desc_tag.get('content'):
            meta_desc = desc_tag['content'].strip()
            
        canonical = ''
        canon_tag = soup.find('link', attrs={'rel': 'canonical'})
        if canon_tag and canon_tag.get('href'):
            canonical = canon_tag['href'].strip()
            
        og_image = ''
        og_img_tag = soup.find('meta', attrs={'property': 'og:image'})
        if og_img_tag and og_img_tag.get('content'):
            og_image = og_img_tag['content'].strip()
            
        json_ld = []
        for s in soup.find_all('script', type='application/ld+json'):
            try:
                json_ld.append(json.loads(s.string))
            except:
                pass
                
        page_metadata[url] = {
            'url': url,
            'title': title,
            'meta_description': meta_desc,
            'canonical': canonical,
            'og_image': og_image,
            'json_ld': json_ld
        }
    except Exception as e:
        print(f"Error crawling {url}: {e}")
        page_metadata[url] = {
            'url': url,
            'error': str(e)
        }

with open('crawl_data/page_metadata.json', 'w', encoding='utf-8') as f:
    json.dump(page_metadata, f, indent=2)

print("\nCrawl complete. Metadata saved.")
