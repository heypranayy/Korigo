import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('crawl_data/assets_inventory.json', 'r', encoding='utf-8') as f:
    inventory = json.load(f)

md_lines = [
    "# Korigo Snacks — Complete Asset Migration Inventory",
    "",
    "This document catalogs every single image and media asset retrieved and preserved from [https://korigosnacks.com/](https://korigosnacks.com/) stored locally under `/public/assets/korigo/`.",
    "",
    "Per **Rule 8**, **Rule 9**, and **Rule 41 (Asset-Only Policy)**: The new storefront utilizes the existing authentic Korigo assets with 100% provenance and zero AI/stock substitutes.",
    "",
    f"**Total Assets Cataloged and Preserved:** {len(inventory)}",
    "",
    "| Asset ID | Type | Local Filename | Dimensions | Format | Alt Text / Description | Original Source URL |",
    "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |"
]

for item in inventory:
    dims = f"{item['width']}x{item['height']}" if item['width'] > 0 else "Vector / Icon"
    alt = item['alt_text'].replace('|', '-').replace('\n', ' ') if item['alt_text'] else "(none)"
    if len(alt) > 35:
        alt = alt[:32] + "..."
    orig_url = item['original_url']
    short_orig = orig_url.split('?')[0].split('/')[-1]
    if len(short_orig) > 30:
        short_orig = short_orig[:27] + "..."
    md_lines.append(f"| `{item['asset_id']}` | **{item['asset_type']}** | `{item['local_filename']}` | {dims} | {item['format'].upper()} | {alt} | [{short_orig}]({orig_url}) |")

md_lines.append("")
md_lines.append("## Category Breakdown")
md_lines.append("")

breakdown = {}
for item in inventory:
    breakdown[item['asset_type']] = breakdown.get(item['asset_type'], 0) + 1

for cat, count in sorted(breakdown.items(), key=lambda x: x[1], reverse=True):
    md_lines.append(f"- **{cat.capitalize()}**: {count} assets")

md_lines.append("")
md_lines.append("---")
md_lines.append("*Manifest json source:* `/public/assets/korigo/manifest.json`")

with open('docs/korigo-assets.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md_lines))

print(f"Generated docs/korigo-assets.md with {len(inventory)} items.")
