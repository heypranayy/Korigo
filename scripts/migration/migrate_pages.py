import os
import sys
import json
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.dirname(__file__))

from config import wp_api_request, get_auth_headers

def migrate_pages():
    print("=== MIGRATING PAGES & POLICIES TO WORDPRESS PAGES ===")
    
    auth = get_auth_headers()
    if 'Authorization' not in auth:
        print("ERROR: No Authorization header set. Please provide credentials in .env.local")
        return False

    # Clean default sample-page if present
    try:
        existing_pages = wp_api_request("wp/v2/pages")
        for p in existing_pages:
            if p['slug'] == 'sample-page':
                wp_api_request(f"wp/v2/pages/{p['id']}?force=true", method="DELETE")
                print(f"Removed default boilerplate page ID {p['id']} ('Sample Page')")
    except Exception as e:
        print(f"Notice cleaning sample page: {e}")

    pages_to_migrate = [
        {
            "title": "About Us",
            "slug": "about-us",
            "html_source": "crawl_data/html/pages_about-us.html",
            "selector": "main"
        },
        {
            "title": "Contact Us",
            "slug": "contact",
            "html_source": "crawl_data/html/pages_contact.html",
            "selector": "main"
        },
        {
            "title": "Reviews Form",
            "slug": "reviews-form",
            "html_source": "crawl_data/html/pages_reviews-form.html",
            "selector": "main"
        },
        {
            "title": "Refund Policy",
            "slug": "refund-policy",
            "html_source": "crawl_data/html/policies_refund-policy.html",
            "selector": ".shopify-policy__container, main"
        },
        {
            "title": "Privacy Policy",
            "slug": "privacy-policy",
            "html_source": "crawl_data/html/policies_privacy-policy.html",
            "selector": ".shopify-policy__container, main"
        },
        {
            "title": "Shipping Policy",
            "slug": "shipping-policy",
            "html_source": "crawl_data/html/policies_shipping-policy.html",
            "selector": ".shopify-policy__container, main"
        },
        {
            "title": "Terms of Service",
            "slug": "terms-of-service",
            "html_source": "crawl_data/html/policies_terms-of-service.html",
            "selector": ".shopify-policy__container, main"
        }
    ]

    for p in pages_to_migrate:
        title = p["title"]
        slug = p["slug"]
        src_path = p["html_source"]
        
        content = ""
        if os.path.exists(src_path):
            with open(src_path, 'r', encoding='utf-8', errors='ignore') as f:
                soup = BeautifulSoup(f.read(), 'html.parser')
                main = soup.find('main') or soup.find(class_='shopify-policy__container') or soup.body
                if main:
                    content = str(main)

        payload = {
            "title": title,
            "slug": slug,
            "content": content,
            "status": "publish"
        }

        # Check existing page by slug
        try:
            existing = wp_api_request(f"wp/v2/pages?slug={slug}")
            if existing and len(existing) > 0:
                p_id = existing[0]['id']
                updated = wp_api_request(f"wp/v2/pages/{p_id}", method="PUT", data=payload)
                print(f"Updated page [{p_id}] '{title}'")
            else:
                created = wp_api_request("wp/v2/pages", method="POST", data=payload)
                print(f"Created page [{created['id']}] '{title}'")
        except Exception as e:
            print(f"Failed migrating page {slug}: {e}")

    print("\nPages and policies migration completed.")
    return True

if __name__ == '__main__':
    migrate_pages()
