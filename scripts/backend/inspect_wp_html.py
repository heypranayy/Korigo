import urllib.request
import re
import ssl
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://backend-korigo.sampledomain.online/', headers=headers)
with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

soup = BeautifulSoup(html, 'html.parser')

print("--- SITE HTML ANALYSIS ---")
# generator meta
gen = soup.find('meta', attrs={'name': 'generator'})
print("Generator tag:", gen.get('content') if gen else 'Not found')

# stylesheets / theme
theme_matches = re.findall(r'/wp-content/themes/([^/]+)/', html)
print("Themes referenced:", set(theme_matches))

# plugins referenced in HTML
plugin_matches = re.findall(r'/wp-content/plugins/([^/]+)/', html)
print("Plugins referenced in HTML:", set(plugin_matches))

# permalink structure from sample post link
post_links = [a.get('href') for a in soup.find_all('a', href=True) if 'hello-world' in a.get('href')]
print("Sample post links:", post_links)

# RSS Feed
try:
    req_feed = urllib.request.Request('https://backend-korigo.sampledomain.online/feed/', headers=headers)
    with urllib.request.urlopen(req_feed, context=ctx, timeout=10) as rfeed:
        feed_xml = rfeed.read().decode('utf-8', errors='ignore')
        gen_feed = re.findall(r'<generator>(.*?)</generator>', feed_xml)
        print("Feed generator (WP Version):", gen_feed)
except Exception as e:
    print("Feed error:", e)

# Check wp-login.php
try:
    req_login = urllib.request.Request('https://backend-korigo.sampledomain.online/wp-login.php', headers=headers)
    with urllib.request.urlopen(req_login, context=ctx, timeout=10) as rlogin:
        print("wp-login.php status:", rlogin.status)
except Exception as e:
    print("wp-login.php error:", e)
