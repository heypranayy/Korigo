import sys
from bs4 import BeautifulSoup
import json

sys.stdout.reconfigure(encoding='utf-8')

def inspect_product_page(fpath):
    print(f"\n==========================================")
    print(f"FILE: {fpath}")
    print(f"==========================================")
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Title
    h1 = soup.find('h1')
    print("H1 Title:", h1.get_text(strip=True) if h1 else 'None')

    # Price
    price_tags = soup.find_all(class_=lambda x: x and 'price' in x.lower())
    for p in price_tags[:5]:
        txt = p.get_text(strip=True)
        if txt and ('₹' in txt or 'Rs' in txt or any(char.isdigit() for char in txt)):
            print("Price tag text:", txt)
            break

    # Images
    imgs = [img.get('src') or img.get('data-src') for img in soup.find_all('img') if 'cdn/shop/files' in (img.get('src') or img.get('data-src') or '')]
    print(f"Product Images found ({len(imgs)}):", imgs[:3])

    # Tabs or Accordions (e.g. Description, Ingredients, Nutrition, FAQs, Recipes)
    tabs = soup.find_all(class_=lambda x: x and ('tab' in x.lower() or 'accordion' in x.lower() or 'panel' in x.lower()))
    print(f"Tab/Accordion elements: {len(tabs)}")
    
    # Headings on product page
    headings = [(h.name, h.get_text(strip=True)) for h in soup.find_all(['h2', 'h3', 'h4'])]
    print("Headings on page:")
    for h in headings[:15]:
        print("  ", h)

inspect_product_page('crawl_data/html/products_citrus-cartel-makhana.html')
inspect_product_page('crawl_data/html/products_garlic-cheese-sassy-sriracha-combo.html')
