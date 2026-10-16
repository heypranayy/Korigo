import glob
import os
import sys
from bs4 import BeautifulSoup
import json

sys.stdout.reconfigure(encoding='utf-8')

blog_files = glob.glob('crawl_data/html/blogs_news_*.html')
print(f"Total blog articles found: {len(blog_files)}")

blog_data = []

for bf in blog_files:
    with open(bf, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
        
    article = soup.find('article') or soup
    h1 = article.find('h1')
    title = h1.get_text(strip=True) if h1 else os.path.basename(bf)
    
    # date
    time_tag = article.find('time')
    date_str = time_tag.get_text(strip=True) if time_tag else ''
    datetime_val = time_tag.get('datetime', '') if time_tag else ''
    
    # author
    author_tag = article.find(class_=lambda x: x and 'author' in x)
    author = author_tag.get_text(strip=True) if author_tag else 'Korigo Snacks'
    
    # featured image
    img = article.find('img')
    feat_img = img.get('src') or img.get('data-src') if img else ''
    
    # content
    content_div = article.find(class_=lambda x: x and ('content' in x or 'article' in x or 'rte' in x))
    content_text = content_div.get_text(separator='\n', strip=True) if content_div else article.get_text(separator='\n', strip=True)
    
    blog_data.append({
        'filename': os.path.basename(bf),
        'title': title,
        'date': date_str,
        'datetime': datetime_val,
        'author': author,
        'featured_image': feat_img,
        'content_snippet': content_text[:300],
        'full_text_len': len(content_text)
    })
    print(f"Title: {title} | Date: {date_str} | Img: {feat_img[:50]}... | Len: {len(content_text)}")

with open('crawl_data/parsed_blogs.json', 'w', encoding='utf-8') as f:
    json.dump(blog_data, f, indent=2)
