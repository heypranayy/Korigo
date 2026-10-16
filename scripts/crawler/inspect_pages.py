import os
import sys
import json
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

# 1. Header & Announcement Bar
with open('crawl_data/html/homepage.html', 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

announcement = soup.find(id=lambda x: x and 'announcement' in x)
print("=== ANNOUNCEMENT BAR ===")
if announcement:
    print(announcement.get_text(separator=' ', strip=True))

header = soup.find('header') or soup.find(id=lambda x: x and 'header' in x)
print("\n=== HEADER ===")
if header:
    logo = header.find('img')
    print("Logo:", logo.get('src') if logo else 'None')
    nav_links = [(a.get_text(strip=True), a.get('href')) for a in header.find_all('a')]
    print("Nav links:", nav_links)

# 2. Slideshow
slideshow = soup.find(id=lambda x: x and 'slideshow' in x)
print("\n=== SLIDESHOW ===")
if slideshow:
    for img in slideshow.find_all('img'):
        print("Slide img:", img.get('src') or img.get('data-src'))
    for h in slideshow.find_all(['h1', 'h2', 'h3', 'a', 'p']):
        print(f"Slide tag <{h.name}>:", h.get_text(strip=True))

# 3. Footer
footer = soup.find('footer') or soup.find(id=lambda x: x and 'footer' in x)
print("\n=== FOOTER ===")
if footer:
    print(footer.get_text(separator='\n', strip=True))

# 4. About Us / Our Story
print("\n=== ABOUT US PAGE ===")
with open('crawl_data/html/pages_about-us.html', 'r', encoding='utf-8', errors='ignore') as f:
    about_soup = BeautifulSoup(f.read(), 'html.parser')
main_content = about_soup.find('main') or about_soup.find(class_=lambda x: x and 'main' in x)
if main_content:
    print("About main images:", [img.get('src') for img in main_content.find_all('img')])
    print("About text snippet:\n", main_content.get_text(separator='\n', strip=True)[:1000])

# 5. Contact Page
print("\n=== CONTACT PAGE ===")
with open('crawl_data/html/pages_contact.html', 'r', encoding='utf-8', errors='ignore') as f:
    contact_soup = BeautifulSoup(f.read(), 'html.parser')
contact_main = contact_soup.find('main') or contact_soup
forms = contact_main.find_all('form')
print("Forms on contact page:", len(forms))
for i, fm in enumerate(forms):
    print(f"Form {i+1} action: {fm.get('action')}, inputs: {[inp.get('name') or inp.get('type') for inp in fm.find_all(['input', 'textarea', 'select'])]}")
print("Contact text:\n", contact_main.get_text(separator='\n', strip=True)[:1000])
