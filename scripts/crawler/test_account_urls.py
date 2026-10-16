import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

for p in ['account/login', 'account/register', 'search']:
    url = f'https://korigosnacks.com/{p}'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            content = resp.read()
            print(f'{url}: Status {resp.status}, final_url: {resp.url}, length: {len(content)}')
            with open(f'crawl_data/html/{p.replace("/", "_")}.html', 'wb') as f:
                f.write(content)
    except Exception as e:
        print(f'{url}: Error {e}')
