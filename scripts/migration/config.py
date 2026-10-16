import os
import ssl
import json
import base64
import urllib.request
import urllib.error

# Load .env.local if present
env_file = os.path.join(os.path.dirname(__file__), '..', '..', '.env.local')
if os.path.exists(env_file):
    with open(env_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ[k.strip()] = v.strip().strip('"').strip("'")

WP_URL = os.environ.get('WORDPRESS_URL', 'https://backend-korigo.sampledomain.online').rstrip('/')
WP_USER = os.environ.get('WORDPRESS_ADMIN_USER', 'admin')
WP_APP_PASS = os.environ.get('WORDPRESS_APPLICATION_PASSWORD', '')
WC_KEY = os.environ.get('WOOCOMMERCE_CONSUMER_KEY', '')
WC_SECRET = os.environ.get('WOOCOMMERCE_CONSUMER_SECRET', '')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def get_auth_headers():
    headers = {
        'User-Agent': 'KorigoMigrationTool/1.0',
        'Accept': 'application/json'
    }
    if WP_APP_PASS:
        # Basic auth with username:application_password
        auth_str = f"{WP_USER}:{WP_APP_PASS}"
        b64_auth = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
        headers['Authorization'] = f"Basic {b64_auth}"
    elif WC_KEY and WC_SECRET:
        auth_str = f"{WC_KEY}:{WC_SECRET}"
        b64_auth = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
        headers['Authorization'] = f"Basic {b64_auth}"
    return headers

def wp_api_request(endpoint, method='GET', data=None, content_type='application/json'):
    url = f"{WP_URL}/wp-json/{endpoint.lstrip('/')}"
    headers = get_auth_headers()
    if content_type:
        headers['Content-Type'] = content_type

    payload = None
    if data is not None:
        if content_type == 'application/json':
            payload = json.dumps(data).encode('utf-8')
        else:
            payload = data

    req = urllib.request.Request(url, data=payload, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            raw = resp.read()
            if raw:
                try:
                    return json.loads(raw.decode('utf-8'))
                except:
                    return raw.decode('utf-8')
            return None
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='ignore')
        print(f"HTTP Error {e.code} on {method} {url}: {err_body}")
        raise
    except Exception as e:
        print(f"Request Error on {method} {url}: {e}")
        raise
