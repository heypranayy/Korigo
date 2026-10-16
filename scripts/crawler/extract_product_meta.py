import sys
from bs4 import BeautifulSoup
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('crawl_data/html/products_citrus-cartel-makhana.html', 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# Let's find sections or tabs
for tag in soup.find_all(['div', 'section']):
    text = tag.get_text()
    if 'List of Ingredients' in text and len(text) < 1000:
        print("--- INGREDIENTS BLOCK ---")
        print(tag.get_text(separator='\n', strip=True))
        print("-------------------------")
        break

for tag in soup.find_all(['div', 'section']):
    text = tag.get_text()
    if 'Nutritional Information' in text and len(text) < 2000:
        print("--- NUTRITION BLOCK ---")
        print(tag.get_text(separator='\n', strip=True))
        print("-----------------------")
        break

for tag in soup.find_all(['div', 'section']):
    text = tag.get_text()
    if 'Our Favorite Recipes' in text and len(text) < 3000:
        print("--- RECIPES BLOCK ---")
        print(tag.get_text(separator='\n', strip=True))
        print("---------------------")
        break
