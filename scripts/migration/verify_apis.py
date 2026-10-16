import os
import sys
import time
import json
import urllib.request
import ssl

sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.dirname(__file__))
from config import WP_URL, ctx

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache'
}

def verify_apis():
    print("=== VERIFYING HEADLESS REST & STORE APIS ===")
    
    results = {}
    
    ts = int(time.time())
    # 1. Store API Products
    url_p = f"{WP_URL}/wp-json/wc/store/v1/products?per_page=50&_ts={ts}"
    try:
        req = urllib.request.Request(url_p, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            products = json.loads(resp.read().decode('utf-8'))
            results['store_api_products'] = {
                "status": "PASS",
                "count": len(products),
                "items": [{"id": p['id'], "name": p['name'], "price": p['prices']['price'], "in_stock": p['is_in_stock']} for p in products]
            }
            print(f"Store API Products: PASS ({len(products)} products found)")
    except Exception as e:
        results['store_api_products'] = {"status": "FAIL", "error": str(e)}
        print(f"Store API Products: FAIL ({e})")

    # 2. Store API Cart
    url_c = f"{WP_URL}/wp-json/wc/store/v1/cart?_ts={ts}"
    try:
        req = urllib.request.Request(url_c, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            cart = json.loads(resp.read().decode('utf-8'))
            results['store_api_cart'] = {
                "status": "PASS",
                "currency": cart.get('totals', {}).get('currency_code'),
                "symbol": cart.get('totals', {}).get('currency_symbol')
            }
            print(f"Store API Cart: PASS (Currency: {results['store_api_cart']['currency']} {results['store_api_cart']['symbol']})")
    except Exception as e:
        results['store_api_cart'] = {"status": "FAIL", "error": str(e)}
        print(f"Store API Cart: FAIL ({e})")

    # 3. Store API Categories
    url_cat = f"{WP_URL}/wp-json/wc/store/v1/products/categories?_ts={ts}"
    try:
        req = urllib.request.Request(url_cat, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            cats = json.loads(resp.read().decode('utf-8'))
            results['store_api_categories'] = {
                "status": "PASS",
                "count": len(cats),
                "categories": [c['name'] for c in cats]
            }
            print(f"Store API Categories: PASS ({len(cats)} categories found: {[c['name'] for c in cats]})")
    except Exception as e:
        results['store_api_categories'] = {"status": "FAIL", "error": str(e)}
        print(f"Store API Categories: FAIL ({e})")

    # 4. WordPress Posts (Blogs)
    url_posts = f"{WP_URL}/wp-json/wp/v2/posts?per_page=50&_ts={ts}"
    try:
        req = urllib.request.Request(url_posts, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            posts = json.loads(resp.read().decode('utf-8'))
            results['wordpress_posts'] = {
                "status": "PASS",
                "count": len(posts),
                "titles": [p['title']['rendered'] for p in posts]
            }
            print(f"WordPress Posts: PASS ({len(posts)} posts found)")
    except Exception as e:
        results['wordpress_posts'] = {"status": "FAIL", "error": str(e)}
        print(f"WordPress Posts: FAIL ({e})")

    # 5. WordPress Pages
    url_pages = f"{WP_URL}/wp-json/wp/v2/pages?per_page=50&_ts={ts}"
    try:
        req = urllib.request.Request(url_pages, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            pages = json.loads(resp.read().decode('utf-8'))
            results['wordpress_pages'] = {
                "status": "PASS",
                "count": len(pages),
                "pages": [p['title']['rendered'] for p in pages]
            }
            print(f"WordPress Pages: PASS ({len(pages)} pages found)")
    except Exception as e:
        results['wordpress_pages'] = {"status": "FAIL", "error": str(e)}
        print(f"WordPress Pages: FAIL ({e})")

    with open('crawl_data/api_verification_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    return results

if __name__ == '__main__':
    verify_apis()
