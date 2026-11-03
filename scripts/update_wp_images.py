import os
import requests
import json

WP_URL = 'https://backend-korigo.sampledomain.online'
AUTH = ('bot.admin', 'lG4t c3fM vado 1JBz Hla8 ibrS')

TARGET_DIR = r"d:\SOFTWARE DEVELOPMENT\KORIGO SNACKS\public\assets\korigo\blogs"

def upload_image(filename):
    file_path = os.path.join(TARGET_DIR, filename)
    url = f"{WP_URL}/wp-json/wp/v2/media"
    headers = {
        'Content-Disposition': f'attachment; filename="{filename}"',
        'Content-Type': 'image/jpeg'
    }
    with open(file_path, 'rb') as f:
        data = f.read()
    r = requests.post(url, auth=AUTH, headers=headers, data=data)
    if r.status_code in [200, 201]:
        res = r.json()
        print(f"  [OK] Uploaded {filename} -> Media ID: {res['id']}, URL: {res['source_url']}")
        return res['id'], res['source_url']
    else:
        print(f"  [FAIL] Upload {filename}: {r.status_code} - {r.text[:200]}")
        return None, None

def main():
    # 1. Upload healthy-travel-snacks.jpg
    print("Uploading updated travel snack image with Korigo packets...")
    travel_media_id, travel_url = upload_image("healthy-travel-snacks.jpg")
    
    # 2. Upload healthy-corporate-gifts.jpg
    print("Uploading updated corporate gifts image with Korigo packets...")
    corp_media_id, corp_url = upload_image("healthy-corporate-gifts.jpg")
    
    # Update post 171 (travel)
    if travel_media_id:
        r = requests.post(f"{WP_URL}/wp-json/wp/v2/posts/171", auth=AUTH, json={"featured_media": travel_media_id})
        print(f"Post 171 update: {r.status_code}")
        
    # Update post 170 (corporate)
    if corp_media_id:
        r = requests.post(f"{WP_URL}/wp-json/wp/v2/posts/170", auth=AUTH, json={"featured_media": corp_media_id})
        print(f"Post 170 update: {r.status_code}")
        
    # Update posts_cache.json
    cache_path = r"src/lib/wordpress/posts_cache.json"
    with open(cache_path, 'r', encoding='utf-8') as f:
        posts = json.load(f)
        
    for p in posts:
        if p['id'] == 171 and travel_url:
            p['featured_media'] = travel_media_id
            p['featured_media_url'] = travel_url
        elif p['id'] == 170 and corp_url:
            p['featured_media'] = corp_media_id
            p['featured_media_url'] = corp_url
            
    with open(cache_path, 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
        
    print("Updated posts_cache.json successfully!")

if __name__ == '__main__':
    main()
