import json

with open('crawl_data/all_sitemap_urls.json', encoding='utf-8') as f:
    urls = json.load(f)

print(f"Total URLs: {len(urls)}")
for u in urls:
    img_count = len(u.get('images', []))
    print(f"[{u['sitemap']}] {u['loc']} (Images in sitemap: {img_count})")
