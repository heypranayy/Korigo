import os
import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open('crawl_data/html/homepage.html', 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

os.makedirs('crawl_data/homepage_sections', exist_ok=True)

sections = soup.find_all(lambda tag: tag.has_attr('id') and 'shopify-section-template--' in tag['id'])

for s in sections:
    sid = s.get('id')
    h = s.find(['h1', 'h2', 'h3', 'h4'])
    htext = h.get_text(strip=True) if h else '(no heading)'
    
    # get all images inside
    imgs = [img.get('src') or img.get('data-src') for img in s.find_all('img')]
    
    # get text
    text_content = s.get_text(separator='\n', strip=True)
    
    with open(f'crawl_data/homepage_sections/{sid}.txt', 'w', encoding='utf-8') as out:
        out.write(f"SECTION ID: {sid}\n")
        out.write(f"HEADING: {htext}\n")
        out.write(f"IMAGES: {imgs}\n\n")
        out.write("--- TEXT CONTENT ---\n")
        out.write(text_content)
        
    print(f"Saved {sid} | Heading: {htext} | Imgs: {len(imgs)} | Text length: {len(text_content)}")
