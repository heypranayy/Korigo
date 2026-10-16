import sys
from bs4 import BeautifulSoup
import json

sys.stdout.reconfigure(encoding='utf-8')

products = [
    'citrus-cartel-makhana',
    'coco-world-makhana',
    'creme-d-onion-makhana',
    'garlicked-cheese-makhana',
    'cinnamon-drip',
    'sassy-sriracha'
]

all_recipes = {}

for p in products:
    fpath = f'crawl_data/html/products_{p}.html'
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    items = soup.find_all(class_=lambda x: x and 'ai-recipe-accordion-item' in x)
    recipes = []
    seen = set()
    for item in items:
        title = item.find(class_=lambda x: x and 'title-text' in x)
        t_text = title.get_text(strip=True) if title else ''
        if not t_text or t_text in seen:
            continue
        seen.add(t_text)
        
        img = item.find('img')
        img_src = img.get('src') or img.get('data-src') if img else ''
        
        # text parts
        content = item.find(class_=lambda x: x and 'content' in x)
        ing = ''
        ins = ''
        if content:
            raw = content.get_text(separator='\n', strip=True).split('\n')
            mode = None
            for line in raw:
                line = line.strip()
                if 'Ingredients' in line:
                    mode = 'ing'
                elif 'Instructions' in line:
                    mode = 'ins'
                elif mode == 'ing':
                    ing += (' ' if ing else '') + line
                elif mode == 'ins':
                    ins += (' ' if ins else '') + line
                    
        recipes.append({
            'name': t_text,
            'image': img_src,
            'ingredients': ing,
            'instructions': ins
        })
    all_recipes[p] = recipes
    print(f"Product {p}: {len(recipes)} recipes found: {[r['name'] for r in recipes]}")

with open('crawl_data/product_recipes.json', 'w', encoding='utf-8') as f:
    json.dump(all_recipes, f, indent=2)
