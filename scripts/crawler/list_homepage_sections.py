from bs4 import BeautifulSoup
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('crawl_data/html/homepage.html', 'r', encoding='utf-8', errors='ignore') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

print("--- SECTIONS IN HOMEPAGE ---")
sections = soup.find_all('section')
print(f"Total <section> tags: {len(sections)}")

for i, sec in enumerate(sections):
    sec_id = sec.get('id', '')
    sec_class = " ".join(sec.get('class', []))
    # heading inside
    h = sec.find(['h1', 'h2', 'h3', 'h4'])
    h_text = h.get_text(strip=True) if h else '(no heading)'
    print(f"Section {i+1}: ID='{sec_id}' | Class='{sec_class}' | Heading='{h_text}'")

# Also check div[id^="shopify-section-"]
print("\n--- SHOPIFY SECTIONS ---")
shopify_sections = soup.find_all(lambda tag: tag.has_attr('id') and 'shopify-section' in tag['id'])
print(f"Total shopify-section divs: {len(shopify_sections)}")
for i, s in enumerate(shopify_sections):
    sid = s.get('id')
    h = s.find(['h1', 'h2', 'h3', 'h4'])
    htext = h.get_text(strip=True) if h else ''
    first_p = s.find('p')
    ptext = first_p.get_text(strip=True)[:60] if first_p else ''
    print(f"{i+1}. {sid} | Heading: '{htext}' | Text snippet: '{ptext}'")
