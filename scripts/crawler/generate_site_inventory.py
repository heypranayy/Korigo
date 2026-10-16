import os
import sys
import glob
import json
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open('crawl_data/full_catalog_extracted.json', 'r', encoding='utf-8') as f:
    catalog = json.load(f)

md = [
    "# Korigo Snacks — Complete Site Inventory & Page Audit",
    "",
    "This inventory audits every accessible page on [https://korigosnacks.com/](https://korigosnacks.com/) detailing page type, layout sections, linked assets, linked products, SEO titles and descriptions, and architectural migration notes.",
    "",
    "---",
    ""
]

files = glob.glob('crawl_data/html/*.html')

for fpath in sorted(files):
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. URL and Title
    title = soup.title.string.strip() if soup.title and soup.title.string else fname
    
    # canonical
    canonical = ''
    can_tag = soup.find('link', rel='canonical')
    if can_tag and can_tag.get('href'):
        canonical = can_tag['href']
        
    # page type & purpose
    if fname == 'homepage.html':
        url = 'https://korigosnacks.com/'
        page_type = 'Homepage'
        purpose = 'Brand storytelling, product intro, nutritional value comparison, combo showcase, reviews, and trust building.'
    elif 'collections_' in fname:
        col_name = fname.replace('collections_', '').replace('.html', '')
        url = f'https://korigosnacks.com/collections/{col_name}'
        page_type = 'Collection / Shop'
        purpose = f"Browse and filter products in the '{col_name}' category."
    elif 'products_' in fname:
        p_handle = fname.replace('products_', '').replace('.html', '')
        url = f'https://korigosnacks.com/products/{p_handle}'
        page_type = 'Product Detail (PDP)'
        purpose = f"Individual product page with nutrition, ingredients, recipes, gallery, and purchase CTAs for {p_handle}."
    elif 'blogs_news_' in fname:
        b_slug = fname.replace('blogs_news_', '').replace('.html', '')
        url = f'https://korigosnacks.com/blogs/news/{b_slug}'
        page_type = 'Blog Article'
        purpose = 'SEO content marketing, educational guide on health benefits of makhana, recipes, and snacking tips.'
    elif fname == 'blogs_news.html':
        url = 'https://korigosnacks.com/blogs/news'
        page_type = 'Blog Archive'
        purpose = 'Catalog of all published blog articles and health guides.'
    elif 'pages_' in fname:
        p_name = fname.replace('pages_', '').replace('.html', '')
        url = f'https://korigosnacks.com/pages/{p_name}'
        page_type = 'Institutional Page'
        purpose = f"Brand information, contact, or review submission for {p_name}."
    elif 'policies_' in fname:
        pol_name = fname.replace('policies_', '').replace('.html', '')
        url = f'https://korigosnacks.com/policies/{pol_name}'
        page_type = 'Legal / Compliance Policy'
        purpose = f"Regulatory legal disclosure for {pol_name}."
    elif fname == 'cart.html':
        url = 'https://korigosnacks.com/cart'
        page_type = 'Cart Page'
        purpose = 'Review selected items, update quantities, apply coupon codes, and proceed to checkout.'
    elif fname == 'search.html':
        url = 'https://korigosnacks.com/search'
        page_type = 'Search Page'
        purpose = 'Live site-wide product and content search.'
    else:
        url = f"https://korigosnacks.com/{fname.replace('.html', '')}"
        page_type = 'General'
        purpose = 'Storefront view'

    # 2. Sections
    headings = [h.get_text(strip=True) for h in soup.find_all(['h1', 'h2', 'h3']) if h.get_text(strip=True)]
    unique_sections = []
    seen_h = set()
    for h in headings[:10]:
        h_clean = re.sub(r'\s+', ' ', h)
        if h_clean not in seen_h and len(h_clean) < 80:
            unique_sections.append(h_clean)
            seen_h.add(h_clean)
            
    # 3. Linked Assets
    imgs = []
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src and 'cdn/shop/files' in src:
            imgs.append(src.split('?')[0].split('/')[-1])
    unique_imgs = list(set(imgs))[:8]
    
    # 4. Linked Products
    prod_links = []
    for a in soup.find_all('a', href=True):
        if '/products/' in a['href']:
            p_slug = a['href'].split('/products/')[-1].split('?')[0].split('#')[0]
            if p_slug and p_slug not in prod_links:
                prod_links.append(p_slug)

    # 5. SEO Information
    meta_desc = ''
    m_tag = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
    if m_tag and m_tag.get('content'):
        meta_desc = m_tag['content'].strip()
        
    md.append(f"## PAGE: {title}")
    md.append("")
    md.append(f"- **URL**: `{url}`")
    md.append(f"- **PAGE TYPE**: `{page_type}`")
    md.append(f"- **TITLE**: `{title}`")
    md.append(f"- **PURPOSE**: {purpose}")
    md.append(f"- **SECTIONS**: {', '.join(unique_sections) if unique_sections else 'Standard Content Layout'}")
    md.append(f"- **LINKED ASSETS ({len(imgs)} total)**: {', '.join([f'`{im}`' for im in unique_imgs]) if unique_imgs else 'None'}")
    md.append(f"- **LINKED PRODUCTS ({len(prod_links)})**: {', '.join([f'`{pl}`' for pl in prod_links[:6]]) if prod_links else 'None'}")
    md.append(f"- **SEO INFORMATION**:")
    md.append(f"  - *Meta Description*: {meta_desc if meta_desc else 'Default brand meta'}")
    md.append(f"  - *Canonical*: `{canonical or url}`")
    md.append(f"- **NOTES**: Migrating to Next.js route with direct WooCommerce/WordPress API integration.")
    md.append("")
    md.append("---")
    md.append("")

with open('docs/korigo-site-inventory.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"Generated docs/korigo-site-inventory.md with {len(files)} pages.")
