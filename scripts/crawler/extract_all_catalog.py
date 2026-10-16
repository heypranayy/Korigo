import os
import sys
import json
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open('crawl_data/products.json', encoding='utf-8') as f:
    pdata = json.load(f)

extracted_catalog = []

for p in pdata['products']:
    pid = p['id']
    title = p['title']
    handle = p['handle']
    images = p.get('images', [])
    variants = p.get('variants', [])
    
    html_file = f'crawl_data/html/products_{handle}.html'
    page_data = {
        'shopify_id': pid,
        'title': title,
        'handle': handle,
        'product_type': 'combo' if 'combo' in handle else 'single',
        'price': variants[0].get('price') if variants else '99.00',
        'compare_at_price': variants[0].get('compare_at_price') if variants else '99.00',
        'available': variants[0].get('available', True) if variants else True,
        'sku': variants[0].get('sku') if variants else None,
        'weight_grams': variants[0].get('grams', 35) if variants else 35,
        'images': [img.get('src') for img in images],
        'variants': variants,
        'description': '',
        'nutrition': '',
        'rda': '',
        'ingredients': '',
        'allergens': '',
        'recipes': [],
        'faqs': [],
        'seo_title': '',
        'seo_description': ''
    }
    
    if os.path.exists(html_file):
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
            
        if soup.title:
            page_data['seo_title'] = soup.title.string.strip()
        m_desc = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
        if m_desc and m_desc.get('content'):
            page_data['seo_description'] = m_desc['content'].strip()
            
        # Extract sections from product tabs
        for tag in soup.find_all(['div', 'section']):
            txt = tag.get_text(separator='\n', strip=True)
            if 'Turn up the zing' in txt or 'Why you\'ll love it:' in txt or 'About the Product' in txt:
                # Find the clean description block
                lines = txt.split('\n')
                desc_lines = []
                for line in lines:
                    if 'Nutritional Information' in line or 'List of Ingredients' in line:
                        break
                    if line not in ['About the Product', 'Ingredients List']:
                        desc_lines.append(line)
                if desc_lines and not page_data['description']:
                    page_data['description'] = '\n'.join(desc_lines).strip()
                    
            if 'List of Ingredients' in txt and 'Foxnut' in txt:
                # Extract ingredients
                lines = txt.split('\n')
                try:
                    ing_idx = lines.index('List of Ingredients')
                    all_idx = -1
                    for i, l in enumerate(lines):
                        if 'Allergen Declaration' in l:
                            all_idx = i
                            break
                    if ing_idx != -1:
                        if all_idx != -1:
                            page_data['ingredients'] = ' '.join(lines[ing_idx+1:all_idx]).strip()
                            page_data['allergens'] = ' '.join(lines[all_idx+1:]).strip()
                        else:
                            page_data['ingredients'] = ' '.join(lines[ing_idx+1:]).strip()
                except:
                    pass

            if 'Nutritional Information' in txt and 'Per 100 g' in txt:
                # extract nutrition
                lines = txt.split('\n')
                nut_lines = []
                rda_lines = []
                is_rda = False
                for l in lines:
                    if 'List of Ingredients' in l or 'Allergen' in l:
                        break
                    if '% Contribution to RDA' in l:
                        is_rda = True
                        continue
                    if is_rda:
                        rda_lines.append(l)
                    else:
                        nut_lines.append(l)
                if not page_data['nutrition']:
                    page_data['nutrition'] = '\n'.join(nut_lines).strip()
                    page_data['rda'] = '\n'.join(rda_lines).strip()

        # Extract Recipes
        recipe_heading = soup.find(lambda t: t.name in ['h2', 'h3'] and 'Our Favorite Recipes' in t.get_text())
        if recipe_heading:
            parent = recipe_heading.find_parent(['section', 'div'])
            if parent:
                r_titles = [h.get_text(strip=True) for h in parent.find_all('h3') if 'Our Favorite Recipes' not in h.get_text()]
                for rt in r_titles:
                    # find following ingredients and instructions
                    h_tag = parent.find(lambda t: t.name == 'h3' and t.get_text(strip=True) == rt)
                    if h_tag:
                        recipe_item = {'name': rt, 'ingredients': '', 'instructions': ''}
                        # walk siblings
                        curr = h_tag.next_sibling
                        mode = None
                        while curr:
                            if hasattr(curr, 'name') and curr.name == 'h3':
                                break
                            if hasattr(curr, 'get_text'):
                                text_val = curr.get_text(strip=True)
                                if 'Ingredients' in text_val:
                                    mode = 'ingredients'
                                elif 'Instructions' in text_val:
                                    mode = 'instructions'
                                elif mode == 'ingredients' and text_val:
                                    recipe_item['ingredients'] += ' ' + text_val
                                elif mode == 'instructions' and text_val:
                                    recipe_item['instructions'] += ' ' + text_val
                            curr = curr.next_sibling
                        recipe_item['ingredients'] = recipe_item['ingredients'].strip()
                        recipe_item['instructions'] = recipe_item['instructions'].strip()
                        if recipe_item['ingredients'] or recipe_item['instructions']:
                            page_data['recipes'].append(recipe_item)

    extracted_catalog.append(page_data)
    print(f"Processed {handle} -> Desc: {len(page_data['description'])} chars | Ing: {bool(page_data['ingredients'])} | Nut: {bool(page_data['nutrition'])} | Recipes: {len(page_data['recipes'])}")

with open('crawl_data/full_catalog_extracted.json', 'w', encoding='utf-8') as f:
    json.dump(extracted_catalog, f, indent=2)

print("\nFull catalog extracted and saved to crawl_data/full_catalog_extracted.json")
