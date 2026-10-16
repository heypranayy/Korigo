import urllib.request
import json
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

# 1. Inspect WooCommerce pages
req_pages = urllib.request.Request('https://backend-korigo.sampledomain.online/wp-json/wp/v2/pages', headers=headers)
with urllib.request.urlopen(req_pages, context=ctx, timeout=10) as resp:
    pages = json.loads(resp.read().decode('utf-8'))

print("--- EXISTING PAGES CREATED BY WOOCOMMERCE ---")
for p in pages:
    print(f"ID: {p['id']} | Title: {p['title']['rendered']} | Slug: {p['slug']} | Link: {p['link']}")

# 2. Inspect Cart Settings (currency, totals)
req_cart = urllib.request.Request('https://backend-korigo.sampledomain.online/wp-json/wc/store/v1/cart', headers=headers)
with urllib.request.urlopen(req_cart, context=ctx, timeout=10) as resp:
    cart = json.loads(resp.read().decode('utf-8'))

print("\n--- CART & COMMERCE CONFIGURATION ---")
print("Totals / Currency info:", cart.get('totals', {}))

# 3. Check HTML for WooCommerce version
req_home = urllib.request.Request('https://backend-korigo.sampledomain.online/', headers=headers)
with urllib.request.urlopen(req_home, context=ctx, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

wc_ver_match = re.search(r'woocommerce/([0-9\.]+)', html) or re.search(r'name="generator" content="WooCommerce ([0-9\.]+)"', html)
print("WooCommerce Version in HTML:", wc_ver_match.group(1) if wc_ver_match else "Unknown")
