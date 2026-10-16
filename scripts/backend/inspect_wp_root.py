import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://backend-korigo.sampledomain.online/wp-json/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
    data = json.loads(resp.read().decode('utf-8'))

print("Site Name:", data.get('name'))
print("Description:", data.get('description'))
print("URL:", data.get('url'))
print("Home:", data.get('home'))
print("Namespaces:", data.get('namespaces'))

# Check users
req_u = urllib.request.Request('https://backend-korigo.sampledomain.online/wp-json/wp/v2/users', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_u, context=ctx, timeout=15) as resp:
    users = json.loads(resp.read().decode('utf-8'))
print("\nUsers:", users)

# Check posts
req_p = urllib.request.Request('https://backend-korigo.sampledomain.online/wp-json/wp/v2/posts', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_p, context=ctx, timeout=15) as resp:
    posts = json.loads(resp.read().decode('utf-8'))
print("\nPosts:", [(p.get('id'), p.get('title', {}).get('rendered'), p.get('slug')) for p in posts])
