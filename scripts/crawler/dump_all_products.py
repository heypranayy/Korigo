import json

with open('crawl_data/products.json', encoding='utf-8') as f:
    data = json.load(f)

for p in data['products']:
    print(f"==================================================")
    print(f"Title: {p['title']}")
    print(f"Handle: {p['handle']}")
    print(f"Product Type: {p.get('product_type')}")
    print(f"Tags: {p.get('tags')}")
    print(f"Variants count: {len(p.get('variants', []))}")
    for v in p['variants']:
        print(f"  - Variant: {v.get('title')}, Price: {v.get('price')}, Compare: {v.get('compare_at_price')}, SKU: {v.get('sku')}, Avail: {v.get('available')}, Weight: {v.get('grams')}g")
    print(f"Images count: {len(p.get('images', []))}")
    for img in p['images']:
        print(f"  - Img ID {img.get('id')}: {img.get('src')}")
    print(f"Body HTML snippet: {p.get('body_html', '')[:300]}")
