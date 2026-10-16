import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('crawl_data/full_catalog_extracted.json', 'r', encoding='utf-8') as f:
    catalog = json.load(f)

with open('crawl_data/product_recipes.json', 'r', encoding='utf-8') as f:
    recipes_map = json.load(f)

with open('crawl_data/all_sitemap_urls.json', 'r', encoding='utf-8') as f:
    sitemap_urls = json.load(f)

md = [
    "# Korigo Snacks — Complete Product Migration Map",
    "",
    "This document establishes the authoritative migration schema and field mapping for all 12 Korigo Snacks products (6 individual flavours and 6 value combos) from Shopify to WordPress WooCommerce and Next.js.",
    "",
    "## Migration Hierarchy",
    "```",
    "SHOPIFY PRODUCT (Catalog & Metafields)",
    "       ↓",
    "WOOCOMMERCE PRODUCT (Post, Taxonomy & Custom Meta)",
    "       ↓",
    "WOOCOMMERCE REST / STORE API (Product ID & Session Token)",
    "       ↓",
    "NEXT.JS DYNAMIC STOREFRONT ROUTE (/products/[slug])",
    "```",
    "",
    "---",
    ""
]

woo_id_start = 101

for p in catalog:
    handle = p['handle']
    title = p['title']
    is_combo = p['product_type'] == 'combo'
    woo_id = woo_id_start
    woo_id_start += 1
    
    price = p['price']
    compare = p['compare_at_price']
    is_sale = float(compare) > float(price) if compare and price else False
    sale_price = price if is_sale else ""
    regular_price = compare if is_sale else price
    
    recipes = recipes_map.get(handle, [])
    
    md.append(f"## {p['title']}")
    md.append("")
    md.append(f"**Migration Routing:**")
    md.append(f"- **Shopify Source**: `https://korigosnacks.com/products/{handle}`")
    md.append(f"- **WooCommerce Target Product**: `{title}` (Slug: `{handle}`)")
    md.append(f"- **Assigned WooCommerce ID**: `{woo_id}`")
    md.append(f"- **Next.js Dynamic Route**: `/products/{handle}`")
    md.append("")
    md.append(f"### Product Metadata & Specifications")
    md.append(f"| Attribute | Value |")
    md.append(f"| :--- | :--- |")
    md.append(f"| **Product Handle** | `{handle}` |")
    md.append(f"| **Product Type** | `{'Combo Bundle (2-Pack)' if is_combo else 'Simple Product (Individual Flavour)'}` |")
    md.append(f"| **Pack Size / Weight** | `{'2 x 35g (70g)' if is_combo else 'Single (35g)'}` |")
    md.append(f"| **Regular Price** | ₹{regular_price} |")
    md.append(f"| **Sale Price** | {'₹' + sale_price if sale_price else 'N/A (Full Price)'} |")
    md.append(f"| **SKU** | `KRG-{handle.upper().replace('-', '_')}` |")
    md.append(f"| **Stock Status** | `{'instock' if p['available'] else 'outofstock'}` |")
    md.append(f"| **Availability** | `{'Available' if p['available'] else 'SOLD OUT'}` |")
    md.append(f"| **Categories** | `{'Combos, Snacks' if is_combo else 'Flavoured Makhana, Snacks'}` |")
    md.append(f"| **Tags** | `{'combo, bundle, value-pack' if is_combo else 'roasted-makhana, healthy-snack, gluten-free, foxnuts'}` |")
    md.append(f"| **Gallery Image Count** | {len(p['images'])} images |")
    md.append(f"| **SEO Title** | `{p['seo_title'] or title + ' – Korigo Snacks'}` |")
    md.append(f"| **Canonical URL** | `https://korigosnacks.com/products/{handle}` |")
    md.append("")
    
    md.append(f"### Product Gallery & Image Ordering")
    for idx, img in enumerate(p['images']):
        fname = img.split('?')[0].split('/')[-1]
        folder = 'combos' if is_combo else 'products'
        md.append(f"{idx+1}. `{folder}/{fname}` (Shopify Source: [{fname}]({img}))")
    md.append("")
    
    if p['description']:
        md.append("### Description (About the Product)")
        md.append("```")
        md.append(p['description'])
        md.append("```")
        md.append("")
        
    if p['ingredients']:
        md.append("### Ingredients List")
        md.append(f"> {p['ingredients']}")
        md.append("")
        
    if p['allergens']:
        md.append("### Allergen Declaration")
        md.append(f"**Warning**: {p['allergens']}")
        md.append("")
        
    if p['nutrition']:
        md.append("### Nutritional Information (Approx. per 100g)")
        md.append("```")
        md.append(p['nutrition'])
        md.append("```")
        md.append("")
        
    if p['rda']:
        md.append("### % Contribution to RDA per serve (35g)")
        md.append("```")
        md.append(p['rda'])
        md.append("```")
        md.append("")
        
    if recipes:
        md.append(f"### Curated Recipes ({len(recipes)} recipes)")
        for r in recipes:
            md.append(f"#### Recipe: {r['name']}")
            if r.get('image'):
                md.append(f"- **Image**: `{r['image'].split('?')[0].split('/')[-1]}`")
            md.append(f"- **Ingredients**: {r['ingredients']}")
            md.append(f"- **Instructions**: {r['instructions']}")
            md.append("")
            
    if is_combo:
        md.append("### Constituent Products & Bundle Behavior")
        md.append("In WooCommerce, this combo product is linked to two simple products with a bundled price of ₹159 (regular ₹199).")
        md.append("")

    md.append("---")
    md.append("")

with open('docs/product-migration-map.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"Generated docs/product-migration-map.md with {len(catalog)} products.")
