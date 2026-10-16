import os
import sys
import json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.dirname(__file__))

from config import wp_api_request, get_auth_headers

def migrate_products():
    print("=== MIGRATING 12 PRODUCTS TO WOOCOMMERCE ===")
    
    auth = get_auth_headers()
    if 'Authorization' not in auth:
        print("ERROR: No Authorization header set. Please provide credentials in .env.local")
        return False

    with open('crawl_data/full_catalog_extracted.json', 'r', encoding='utf-8') as f:
        catalog = json.load(f)

    with open('crawl_data/product_recipes.json', 'r', encoding='utf-8') as f:
        recipes_map = json.load(f)

    media_mapping = {}
    if os.path.exists('crawl_data/wp_media_mapping.json'):
        with open('crawl_data/wp_media_mapping.json', 'r', encoding='utf-8') as f:
            media_mapping = json.load(f)

    # 1. Ensure Categories exist
    print("Creating/verifying product categories...")
    categories = [
        {"name": "Individual Flavours", "slug": "flavours", "description": "Single 35g packs of roasted flavoured makhana"},
        {"name": "Value Combos", "slug": "combos", "description": "Curated dual-pack flavour combos (70g)"}
    ]
    cat_id_map = {}
    for cat in categories:
        try:
            existing = wp_api_request(f"wc/v3/products/categories?slug={cat['slug']}")
            if existing and len(existing) > 0:
                cat_id_map[cat['slug']] = existing[0]['id']
                print(f"Category '{cat['name']}' exists with ID {existing[0]['id']}")
            else:
                created = wp_api_request("wc/v3/products/categories", method="POST", data=cat)
                cat_id_map[cat['slug']] = created['id']
                print(f"Created category '{cat['name']}' with ID {created['id']}")
        except Exception as e:
            print(f"Error handling category {cat['slug']}: {e}")

    # 2. Iterate and Migrate Products
    for p in catalog:
        handle = p['handle']
        title = p['title']
        is_combo = p['product_type'] == 'combo'
        
        price = p['price']
        compare = p['compare_at_price']
        is_sale = float(compare) > float(price) if compare and price else False
        regular_price = str(compare) if is_sale else str(price)
        sale_price = str(price) if is_sale else ""
        
        # Determine stock status (Coco Island is out of stock per live source)
        is_instock = False if handle == 'coco-world-makhana' else p.get('available', True)
        stock_status = 'instock' if is_instock else 'outofstock'
        
        cat_slug = 'combos' if is_combo else 'flavours'
        cat_id = cat_id_map.get(cat_slug)
        cats_payload = [{"id": cat_id}] if cat_id else []
        
        # Collect images
        product_images_payload = []
        for img_url in p.get('images', []):
            fname = img_url.split('?')[0].split('/')[-1]
            if fname in media_mapping and 'id' in media_mapping[fname]:
                product_images_payload.append({"id": media_mapping[fname]['id']})
            elif fname in media_mapping and 'source_url' in media_mapping[fname]:
                product_images_payload.append({"src": media_mapping[fname]['source_url']})
            else:
                product_images_payload.append({"src": img_url})

        # Structured metadata
        recipes = recipes_map.get(handle, [])
        meta_data = [
            {"key": "_shopify_product_id", "value": str(p['shopify_id'])},
            {"key": "_korigo_ingredients", "value": p.get('ingredients', '')},
            {"key": "_korigo_allergens", "value": p.get('allergens', '')},
            {"key": "_korigo_nutrition", "value": p.get('nutrition', '')},
            {"key": "_korigo_rda", "value": p.get('rda', '')},
            {"key": "_korigo_recipes", "value": json.dumps(recipes)},
            {"key": "_korigo_pack_size", "value": "2 x 35g (70g)" if is_combo else "35g"}
        ]

        payload = {
            "name": title,
            "slug": handle,
            "type": "simple",
            "regular_price": regular_price,
            "sale_price": sale_price,
            "description": p.get('description', ''),
            "short_description": p.get('description', '')[:200] + '...' if p.get('description') else '',
            "sku": f"KRG-{handle.upper().replace('-', '_')}",
            "manage_stock": True,
            "stock_quantity": 50 if is_instock else 0,
            "stock_status": stock_status,
            "weight": "0.070" if is_combo else "0.035",
            "categories": cats_payload,
            "images": product_images_payload,
            "attributes": [
                {
                    "name": "Pack Size",
                    "position": 0,
                    "visible": True,
                    "variation": False,
                    "options": ["2 x 35g (70g)" if is_combo else "35g"]
                }
            ],
            "meta_data": meta_data
        }

        # Check existing product by slug
        try:
            existing_p = wp_api_request(f"wc/v3/products?slug={handle}")
            if existing_p and len(existing_p) > 0:
                p_id = existing_p[0]['id']
                updated = wp_api_request(f"wc/v3/products/{p_id}", method="PUT", data=payload)
                print(f"Updated product [{p_id}] '{title}' -> Status: {stock_status}, Price: ₹{regular_price}")
            else:
                created = wp_api_request("wc/v3/products", method="POST", data=payload)
                print(f"Created product [{created['id']}] '{title}' -> Status: {stock_status}, Price: ₹{regular_price}")
        except Exception as e:
            print(f"Failed migrating product {handle}: {e}")

    print("\nAll 12 products processed successfully.")
    return True

if __name__ == '__main__':
    migrate_products()
