import os
import sys
import json
import mimetypes
import urllib.request
sys.path.append(os.path.dirname(__file__))

from config import WP_URL, get_auth_headers, ctx

def migrate_media():
    print("=== MIGRATING MEDIA TO WORDPRESS MEDIA LIBRARY ===")
    
    auth = get_auth_headers()
    if 'Authorization' not in auth:
        print("ERROR: No Authorization header set. Please provide credentials in .env.local")
        return False

    mapping_file = 'crawl_data/wp_media_mapping.json'
    uploaded_mapping = {}
    if os.path.exists(mapping_file):
        try:
            with open(mapping_file, 'r', encoding='utf-8') as f:
                uploaded_mapping = json.load(f)
            print(f"Loaded {len(uploaded_mapping)} already mapped media items.")
        except:
            uploaded_mapping = {}

    # Check existing media on WordPress site to avoid duplicates
    try:
        req = urllib.request.Request(f"{WP_URL}/wp-json/wp/v2/media?per_page=100", headers=auth)
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            existing_wp_media = json.load(resp)
            print(f"Found {len(existing_wp_media)} existing media items in WordPress.")
            for em in existing_wp_media:
                src_url = em.get('source_url', '')
                fname = os.path.basename(src_url)
                if fname:
                    uploaded_mapping[fname] = {
                        "id": em['id'],
                        "source_url": src_url,
                        "title": em.get('title', {}).get('rendered', '')
                    }
    except Exception as e:
        print(f"Notice querying existing media: {e}")

    with open('crawl_data/assets_inventory.json', 'r', encoding='utf-8') as f:
        inventory = json.load(f)

    success_count = 0
    skipped_count = 0

    for item in inventory:
        orig_fname = item['original_filename']
        local_rel = item['local_path'].lstrip('/')
        local_full = os.path.join(os.path.dirname(__file__), '..', '..', 'public', local_rel)
        
        if not os.path.exists(local_full):
            print(f"Local file not found: {local_full}")
            continue

        if orig_fname in uploaded_mapping:
            skipped_count += 1
            continue

        # Upload
        mime_type, _ = mimetypes.guess_type(local_full)
        if not mime_type:
            mime_type = 'application/octet-stream'

        with open(local_full, 'rb') as fp:
            file_bytes = fp.read()

        upload_headers = dict(auth)
        upload_headers['Content-Type'] = mime_type
        upload_headers['Content-Disposition'] = f'attachment; filename="{orig_fname}"'

        upload_url = f"{WP_URL}/wp-json/wp/v2/media"
        req = urllib.request.Request(upload_url, data=file_bytes, headers=upload_headers, method='POST')
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))
                media_id = res_data['id']
                source_url = res_data.get('source_url', '')
                uploaded_mapping[orig_fname] = {
                    "id": media_id,
                    "source_url": source_url,
                    "local_path": item['local_path'],
                    "original_url": item['original_url'],
                    "alt_text": item['alt_text']
                }
                success_count += 1
                print(f"Uploaded [{media_id}]: {orig_fname} -> {source_url}")
        except Exception as e:
            print(f"Failed uploading {orig_fname}: {e}")

        # Save mapping periodically
        with open(mapping_file, 'w', encoding='utf-8') as f:
            json.dump(uploaded_mapping, f, indent=2)

    print(f"\nMedia migration summary: Uploaded: {success_count} | Already existed: {skipped_count} | Total mapped: {len(uploaded_mapping)}")
    return True

if __name__ == '__main__':
    migrate_media()
