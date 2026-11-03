import os
import shutil
import requests
import json
from html_generator import (
    build_makhana_nutrition,
    build_pregnancy,
    build_corporate_gifts,
    build_travel_snacks
)

WP_URL = 'https://backend-korigo.sampledomain.online'
AUTH = ('bot.admin', 'lG4t c3fM vado 1JBz Hla8 ibrS')

TARGET_DIR = r"d:\SOFTWARE DEVELOPMENT\KORIGO SNACKS\public\assets\korigo\blogs"

# Map of blog slug or ID to local image file name
OLD_POSTS_MEDIA = {
    134: "late-night-healthy-snacks.jpg",
    135: "desk-job-healthy-snacks.jpg",
    136: "healthy-makhana-recipes.jpg",
    137: "cheese-makhana.jpg",
    138: "makhana-vs-other-snacks.jpg",
    139: "makhana-weight-loss.jpg",
    140: "makhana-health-benefits.jpg",
}

NEW_POSTS_DATA = [
    {
        "builder": build_makhana_nutrition,
        "image_file": "makhana-nutrition-shoot1.jpg"
    },
    {
        "builder": build_pregnancy,
        "image_file": "makhana-pregnancy-safe.jpg"
    },
    {
        "builder": build_corporate_gifts,
        "image_file": "healthy-corporate-gifts.jpg"
    },
    {
        "builder": build_travel_snacks,
        "image_file": "healthy-travel-snacks.jpg"
    }
]

def upload_image(filename):
    file_path = os.path.join(TARGET_DIR, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return None, None
        
    url = f"{WP_URL}/wp-json/wp/v2/media"
    headers = {
        'Content-Disposition': f'attachment; filename="{filename}"',
        'Content-Type': 'image/jpeg' if filename.endswith(('.jpg', '.jpeg')) else 'image/png'
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
    uploaded_media = {}
    all_image_files = set(list(OLD_POSTS_MEDIA.values()) + [p['image_file'] for p in NEW_POSTS_DATA])
    
    print(f"Uploading {len(all_image_files)} images to WordPress...")
    for img_file in all_image_files:
        media_id, source_url = upload_image(img_file)
        if media_id:
            uploaded_media[img_file] = {
                "id": media_id,
                "url": source_url,
                "local_url": f"/assets/korigo/blogs/{img_file}"
            }
            
    print("\nUpdating 7 old posts in WordPress with new featured images...")
    for post_id, img_file in OLD_POSTS_MEDIA.items():
        if img_file in uploaded_media:
            m_id = uploaded_media[img_file]['id']
            r = requests.post(f"{WP_URL}/wp-json/wp/v2/posts/{post_id}", auth=AUTH, json={
                "featured_media": m_id
            })
            if r.status_code in [200, 201]:
                print(f"  [OK] Updated post {post_id} with featured_media: {m_id}")
            else:
                print(f"  [FAIL] Updating post {post_id}: {r.status_code} - {r.text[:150]}")
                
    print("\nCreating/Updating 4 new blog posts in WordPress...")
    created_posts = []
    
    # First get existing posts to see if any new slug already exists
    r = requests.get(f"{WP_URL}/wp-json/wp/v2/posts?per_page=50", auth=AUTH)
    existing_posts = {p['slug']: p['id'] for p in r.json()} if r.status_code == 200 else {}
    
    for item in NEW_POSTS_DATA:
        data = item['builder']()
        slug = data['slug']
        img_file = item['image_file']
        m_id = uploaded_media.get(img_file, {}).get('id', 0)
        
        post_payload = {
            "title": data['title'],
            "slug": slug,
            "status": "publish",
            "date": data['date'],
            "content": data['content'],
            "excerpt": data['excerpt'],
            "featured_media": m_id
        }
        
        if slug in existing_posts:
            post_id = existing_posts[slug]
            r = requests.post(f"{WP_URL}/wp-json/wp/v2/posts/{post_id}", auth=AUTH, json=post_payload)
            action = "Updated"
        else:
            r = requests.post(f"{WP_URL}/wp-json/wp/v2/posts", auth=AUTH, json=post_payload)
            action = "Created"
            
        if r.status_code in [200, 201]:
            res = r.json()
            print(f"  [OK] {action} post: '{data['title']}' -> ID: {res['id']}, Date: {res['date']}, Slug: {res['slug']}")
            created_posts.append(res)
        else:
            print(f"  [FAIL] {action} post: '{data['title']}': {r.status_code} - {r.text[:200]}")
            
    print("\nFetching full updated list of all posts from WordPress...")
    r = requests.get(f"{WP_URL}/wp-json/wp/v2/posts?per_page=50&_embed=true", auth=AUTH)
    if r.status_code == 200:
        all_posts = r.json()
        print(f"Total posts now in WordPress: {len(all_posts)}")
        
        # Save a master cache for Next.js fallback and instant SSR
        cache_data = []
        for p in all_posts:
            feat_url = ""
            if p.get('_embedded', {}).get('wp:featuredmedia'):
                feat_url = p['_embedded']['wp:featuredmedia'][0].get('source_url', '')
                
            cache_data.append({
                "id": p['id'],
                "date": p['date'],
                "slug": p['slug'],
                "status": p['status'],
                "title": p['title'],
                "content": p['content'],
                "excerpt": p['excerpt'],
                "featured_media": p.get('featured_media'),
                "featured_media_url": feat_url or "/assets/korigo/blogs/ChatGPT_Image_Sep_16_2026_04_34_01_PM.png",
                "author_name": "Sohini Kar"
            })
            
        cache_path = r"d:\SOFTWARE DEVELOPMENT\KORIGO SNACKS\src\lib\wordpress\posts_cache.json"
        with open(cache_path, 'w', encoding='utf-8') as f:
            json.dump(cache_data, f, indent=2, ensure_ascii=False)
        print(f"Saved {len(cache_data)} posts to {cache_path}")

if __name__ == "__main__":
    main()
