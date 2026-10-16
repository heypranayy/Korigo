import json
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def fetch_text(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return f"ERROR: {e}"

print("--- AGENTS.MD ---")
agents_md = fetch_text('https://korigosnacks.com/agents.md')
print(agents_md[:1500])

print("\n--- PRODUCTS.JSON SUMMARY ---")
with open('crawl_data/products.json', encoding='utf-8') as f:
    pdata = json.load(f)

for p in pdata.get('products', []):
    variants = p.get('variants', [])
    v_info = ", ".join([f"{v.get('title')}: Rs.{v.get('price')} (compare: Rs.{v.get('compare_at_price')}, available: {v.get('available')}, sku: {v.get('sku')})" for v in variants])
    images = p.get('images', [])
    print(f"ID: {p.get('id')} | Title: {p.get('title')} | Handle: {p.get('handle')} | Images: {len(images)} | Tags: {p.get('tags')}")
    print(f"   Variants: {v_info}")

print("\n--- COLLECTIONS.JSON SUMMARY ---")
with open('crawl_data/collections.json', encoding='utf-8') as f:
    cdata = json.load(f)

for c in cdata.get('collections', []):
    print(f"ID: {c.get('id')} | Title: {c.get('title')} | Handle: {c.get('handle')} | Products count: {c.get('products_count')}")
