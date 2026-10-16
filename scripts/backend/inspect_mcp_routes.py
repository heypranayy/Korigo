import urllib.request, json, ssl
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://backend-korigo.sampledomain.online/wp-json/', headers=headers)
with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
    data = json.loads(resp.read().decode('utf-8'))

routes = data.get('routes', {})
mcp_routes = {k: v for k, v in routes.items() if 'mcp' in k}
print("MCP Routes in wp-json:")
for r, details in mcp_routes.items():
    print(r, "methods:", [e.get('methods') for e in details.get('endpoints', [])])
