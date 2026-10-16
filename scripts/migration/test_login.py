import os
import sys
import ssl
import urllib.request
import urllib.parse
import http.cookiejar
import json
import base64

# Read .env.local
env_file = os.path.join(os.path.dirname(__file__), '..', '..', '.env.local')
env_vars = {}
with open(env_file, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            env_vars[k.strip()] = v.strip().strip('"').strip("'")

WP_URL = env_vars.get('WORDPRESS_URL', 'https://backend-korigo.sampledomain.online').rstrip('/')
USER = env_vars.get('WORDPRESS_ADMIN_USER', '')
PASS = env_vars.get('WORDPRESS_ADMIN_PASSWORD', '')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# 1. Test Basic Auth with REST API
print("--- 1. Testing REST API Basic Auth ---")
auth_str = f"{USER}:{PASS}"
b64_auth = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
headers = {
    'User-Agent': 'Mozilla/5.0',
    'Authorization': f"Basic {b64_auth}"
}

req_rest = urllib.request.Request(f"{WP_URL}/wp-json/wp/v2/users/me", headers=headers)
try:
    with urllib.request.urlopen(req_rest, context=ctx, timeout=10) as resp:
        user_info = json.loads(resp.read().decode('utf-8'))
        print("Basic Auth REST SUCCESS! Logged in as:", user_info.get('name'), user_info.get('slug'), user_info.get('roles'))
except urllib.error.HTTPError as e:
    print("Basic Auth HTTP Error:", e.code, e.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Basic Auth Error:", e)

# 2. Test Cookie Login via wp-login.php
print("\n--- 2. Testing Cookie Session Login via wp-login.php ---")
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=ctx), urllib.request.HTTPCookieProcessor(cj))

login_url = f"{WP_URL}/wp-login.php"
login_data = urllib.parse.urlencode({
    'log': USER,
    'pwd': PASS,
    'rememberme': 'forever',
    'wp-submit': 'Log In',
    'redirect_to': f"{WP_URL}/wp-admin/"
}).encode('utf-8')

req_login = urllib.request.Request(login_url, data=login_data, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with opener.open(req_login, timeout=15) as resp:
        print("Login response URL:", resp.geturl())
        print("Login status:", resp.status)
        cookies = {c.name: c.value for c in cj}
        print("Cookies obtained:", list(cookies.keys()))
        
        # Test admin page
        req_admin = urllib.request.Request(f"{WP_URL}/wp-admin/", headers={'User-Agent': 'Mozilla/5.0'})
        with opener.open(req_admin, timeout=15) as resp_admin:
            admin_html = resp_admin.read().decode('utf-8', errors='ignore')
            if 'Dashboard' in admin_html or 'wp-admin' in admin_html:
                print("ADMIN ACCESS CONFIRMED! Dashboard reached successfully.")
            else:
                print("Warning: Admin page content unexpected.")
except Exception as e:
    print("Login error:", e)
