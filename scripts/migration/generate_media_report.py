import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

def generate_media_report():
    mapping_file = 'crawl_data/wp_media_mapping.json'
    if not os.path.exists(mapping_file):
        print("Mapping file does not exist yet.")
        return

    with open(mapping_file, 'r', encoding='utf-8') as f:
        mapping = json.load(f)

    with open('crawl_data/assets_inventory.json', 'r', encoding='utf-8') as f:
        inventory = json.load(f)

    # Build product association map
    with open('crawl_data/full_catalog_extracted.json', 'r', encoding='utf-8') as f:
        catalog = json.load(f)

    img_to_prod = {}
    for p in catalog:
        for img in p.get('images', []):
            fn = img.split('?')[0].split('/')[-1]
            img_to_prod.setdefault(fn, []).append(p['title'])

    lines = [
        "# Korigo Snacks — Media Migration & Provenance Report",
        "",
        "This report tracks every authentic Korigo asset migrated into the WordPress Media Library, mapping local asset paths to their source Shopify CDN provenance, resulting WordPress Media URLs, and associated WooCommerce products.",
        "",
        f"**Total Mapped Media Items:** {len(mapping)}",
        "",
        "| Local Asset Path | Original Shopify CDN Provenance | WordPress Media Library URL | Associated Product / Usage |",
        "| :--- | :--- | :--- | :--- |"
    ]

    for fname, data in sorted(mapping.items()):
        if fname == 'woocommerce-placeholder.webp':
            continue
        local_path = data.get('local_path', f'/assets/korigo/{fname}')
        orig_url = data.get('original_url', '(discovered)')
        wp_url = data.get('source_url', '')
        
        # Product association
        prods = img_to_prod.get(fname, [])
        usage = ", ".join(prods) if prods else "Site Section / Brand Asset"
        if len(usage) > 40:
            usage = usage[:37] + "..."

        short_orig = orig_url.split('?')[0].split('/')[-1]
        lines.append(f"| `{local_path}` | [{short_orig}]({orig_url}) | [{fname}]({wp_url}) | {usage} |")

    with open('docs/media-migration-report.md', 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"Generated docs/media-migration-report.md with {len(mapping)} items.")

if __name__ == '__main__':
    generate_media_report()
