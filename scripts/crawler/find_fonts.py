from bs4 import BeautifulSoup
import re

with open('crawl_data/html/homepage.html', 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("Checking style tags...")
for i, s in enumerate(soup.find_all('style')):
    content = s.string or ''
    if 'font-' in content or '--font' in content or '@font-face' in content or '@import' in content:
        print(f"--- Style tag #{i} (id={s.get('id')}) ---")
        for line in content.split('\n'):
            if any(k in line for k in ['font-family', '--font', '@font-face', '@import', ':root']):
                print(line.strip()[:160])

print("\nChecking link fonts...")
for l in soup.find_all('link'):
    if 'font' in str(l):
        print(l)
