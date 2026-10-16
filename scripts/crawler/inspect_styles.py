with open('crawl_data/css/colors.css', 'r', encoding='utf-8', errors='ignore') as f:
    print("--- colors.css ---")
    print(f.read())

import re
with open('crawl_data/html/homepage.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

print("\n--- Inline CSS Variables / Font settings in homepage.html ---")
# find :root or --t4s or font-family
var_matches = re.findall(r'(--[a-zA-Z0-9_-]+:\s*[^;]+;)', html)
for vm in var_matches[:40]:
    print(vm)

print("\n--- Font imports or style blocks in homepage.html ---")
fonts = re.findall(r'font-family:\s*([^;\}]+)', html)
unique_fonts = set([f.strip() for f in fonts])
print("Unique font families mentioned:", unique_fonts)
