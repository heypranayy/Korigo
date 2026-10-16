import os
import sys
import json
import xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.dirname(__file__))

from config import wp_api_request, get_auth_headers

def migrate_blogs():
    print("=== MIGRATING 7 BLOG ARTICLES TO WORDPRESS POSTS ===")
    
    auth = get_auth_headers()
    if 'Authorization' not in auth:
        print("ERROR: No Authorization header set. Please provide credentials in .env.local")
        return False

    media_mapping = {}
    if os.path.exists('crawl_data/wp_media_mapping.json'):
        with open('crawl_data/wp_media_mapping.json', 'r', encoding='utf-8') as f:
            media_mapping = json.load(f)

    # 1. Clean default "Hello world!" post if present
    try:
        existing_posts = wp_api_request("wp/v2/posts")
        for p in existing_posts:
            if p['slug'] == 'hello-world':
                wp_api_request(f"wp/v2/posts/{p['id']}?force=true", method="DELETE")
                print(f"Removed default boilerplate post ID {p['id']} ('Hello world!')")
    except Exception as e:
        print(f"Notice cleaning default post: {e}")

    # 2. Parse Atom feed
    root = ET.parse('crawl_data/blogs_news.atom').getroot()
    ns = {'atom': 'http://www.w3.org/2005/Atom'}
    entries = root.findall('atom:entry', ns)
    print(f"Discovered {len(entries)} articles in Atom feed.")

    # Sitemap blog images map
    blog_sitemap_root = ET.parse('crawl_data/sitemap_blogs_1.xml').getroot()
    sitemap_imgs = {}
    for u in blog_sitemap_root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
        loc = u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text
        slug = loc.split('/')[-1]
        for img in u.findall('{http://www.google.com/schemas/sitemap-image/1.1}image'):
            iloc = img.find('{http://www.google.com/schemas/sitemap-image/1.1}loc')
            if iloc is not None and iloc.text:
                sitemap_imgs[slug] = iloc.text

    for entry in entries:
        title = entry.find('atom:title', ns).text
        published = entry.find('atom:published', ns).text
        content_html = entry.find('atom:content', ns).text
        
        # Determine slug from entry id or link
        link_elem = entry.find("atom:link[@rel='alternate']", ns)
        href = link_elem.get('href', '') if link_elem is not None else ''
        slug = href.split('/')[-1] if href else title.lower().replace(' ', '-')

        # Match featured media
        featured_media_id = 0
        img_url = sitemap_imgs.get(slug, '')
        if img_url:
            fname = img_url.split('?')[0].split('/')[-1]
            if fname in media_mapping and 'id' in media_mapping[fname]:
                featured_media_id = media_mapping[fname]['id']

        payload = {
            "title": title,
            "slug": slug,
            "content": content_html,
            "status": "publish",
            "date": published[:19],
            "featured_media": featured_media_id if featured_media_id else None
        }

        # Check existing post by slug
        try:
            existing = wp_api_request(f"wp/v2/posts?slug={slug}")
            if existing and len(existing) > 0:
                p_id = existing[0]['id']
                updated = wp_api_request(f"wp/v2/posts/{p_id}", method="PUT", data=payload)
                print(f"Updated article [{p_id}] '{title}'")
            else:
                created = wp_api_request("wp/v2/posts", method="POST", data=payload)
                print(f"Created article [{created['id']}] '{title}'")
        except Exception as e:
            print(f"Failed migrating article {slug}: {e}")

    print("\nBlog articles migration completed.")
    return True

if __name__ == '__main__':
    migrate_blogs()
