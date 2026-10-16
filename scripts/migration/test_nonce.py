import re
import urllib.request
import json
import ssl
from test_login import opener, WP_URL

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# 1. Fetch /wp-admin/ to extract nonce
req_admin = urllib.request.Request(f"{WP_URL}/wp-admin/", headers={'User-Agent': 'Mozilla/5.0'})
with opener.open(req_admin, timeout=15) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

nonce_match = re.search(r'wpApiSettings\s*=\s*\{[^}]*"nonce":"([^"]+)"', html) or re.search(r'"nonce":"([^"]+)"', html)
nonce = nonce_match.group(1) if nonce_match else None
print("Found REST API Nonce:", nonce)

# 2. Test REST API with Cookie + Nonce
if nonce:
    req_me = urllib.request.Request(f"{WP_URL}/wp-json/wp/v2/users/me", headers={
        'User-Agent': 'Mozilla/5.0',
        'X-WP-Nonce': nonce
    })
    with opener.open(req_me, timeout=15) as resp_me:
        user_info = json.loads(resp_me.read().decode('utf-8'))
        print("REST API with Nonce SUCCESS! Current User:", user_info.get('name'), "Roles:", user_info.get('roles'))
