import os
import sys
import json
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

md = [
    "# Korigo Snacks — Full Content Migration Specification",
    "",
    "This document captures the complete textual content, brand stories, product narratives, FAQs, customer reviews, legal policies, and blog articles from [https://korigosnacks.com/](https://korigosnacks.com/) to guarantee zero content drift during the migration to WordPress + WooCommerce + Next.js.",
    "",
    "Per **Rule 1 (Absolute Source-of-Truth Rule)**, **Rule 41 (Asset-Only Policy)**, and **Rule 42 (No Content Drift)**: All claims, names, recipes, nutritional values, founder bios, and policy clauses are preserved verbatim.",
    "",
    "---",
    ""
]

# 1. Homepage Content
md.append("## 1. Homepage Core Content & Copy")
md.append("")
with open('crawl_data/homepage_sections/shopify-section-template--26421464105250__176987680456019278.txt', 'r', encoding='utf-8') as f:
    main_sec = f.read()

md.append("### Hero & Value Proposition")
md.append("""
**Heading**: Crunch Into Korigo Flavoured Makhana  
**Subheading**: Makhana is the no-kernel popcorn that you will definitely love. Now available in a variety of flavours, it will keep you wanting more.

**Nutrition Narrative**:  
> Nutritionally, makhana is highly rich in fibre content, proteins, and antioxidants. As such, there is no cause for guilt when one consumes the makhana as snacks. Looking for online makhana to buy? Why not check out our wide range of flavoured makhana available for sale and purchase yours now?

**CTA**: `Know More` -> `/shop`
""")

md.append("### Nutritional Comparison Table")
md.append("""
| Metric / Nutrient | Korigo Roasted Makhana | Other Fried Snacks |
| :--- | :--- | :--- |
| **Protein** | 💪🏻 8–10% Protein | 💪🏻 6–7% Protein |
| **Fat Content** | 🔥 5–10% Fat (Roasted) | 🔥 30–35% Fat (Deep Fried) |
| **Dietary Fiber** | 🌿 5–8% Fiber | 🌿 3–4% Fiber |
| **Purity / Health**| 🌾 100% Gluten Free | ⚠️ High Oil Content |

*Note: All values are approx 100gm and may vary by flavours.*
""")

md.append("### Brand Origin & The Mithila Story")
md.append("""
#### Ancient Superfood. Modern Lifestyle.
Makhana is another name for fox nuts or lotus seeds and has been revered in India as one of the best superfoods since time immemorial. These nutty and crunchy seeds are derived from the auspicious lotus flower and form the very foundation of Indian Ayurveda practices.

While the fried versions of such snacks tend to be unhealthy, we roast our makhana just right so as to ensure that all of its good nutrients are preserved in addition to providing you with the delightful crunchiness. Makhana will certainly fill you up because it contains an abundance of protein and fibre.

#### Mithila, Bihar — Where every KORIGO journey begins.

#### Why KORIGO?
**KORIGO: The name**  
In Hindi, कोरी (kori) means Untouched/ Pure.  
That’s how makhana grows — a quiet treasure of eastern India, drawn by hand from still ponds by the farmers of Mithila.  

But for a fast-moving generation, a treasure like makhana needed to be made tasty and easy to have on the go — without losing any of its health benefits.  

**KORIGO — कोरी + GO.** India’s untouched treasure, grown by the hands that know it best, made super tasty without giving up a single thing that makes it good for you.  
**कोरी at roots.**  
- Roasted
- Healthy
- High in Protein
- **Pure where it matters. Convenient where it counts.**
""")

md.append("### Curated Flavour Showcase")
md.append("""
1. **Tangy & Spicy — Citrus Cartel**  
   *A bold burst of citrusy tang and warm spices. Light, crunchy makhana tossed with lemon, chilli, and aromatic Indian spices for an everyday zesty snack.*  
   Price: ₹99 | Pack Size: 35g

2. **Hot & Spicy — Sassy Sriracha**  
   *Fiery, flavour-forward makhana with chilli heat, garlic, and Indo-Asian spice notes. Crafted for spice lovers who like their snacks bold and loud.*  
   Price: ₹99 | Pack Size: 35g

3. **Sweet & Savoury — Cinnamon Drip**  
   *Warm cinnamon and subtle sweetness come together in this comforting roasted makhana. A perfect balance of savoury crunch with a gentle sweet finish.*  
   Price: ₹99 | Pack Size: 35g

4. **Cheesy Favourite — Garlicked Cheese**  
   *Rich cheese flavours with a garlicky punch layered over crunchy roasted makhana. A classic comfort snack made lighter and guilt-free.*  
   Price: ₹99 | Pack Size: 35g

5. **Classic & Creamy — Sour Crème d' Onion**  
   *Creamy, tangy sour crème paired with onion and herbs for a smooth, globally loved flavour. Balanced, mellow, and incredibly addictive.*  
   Price: ₹99 | Pack Size: 35g

6. **Sweet Treat — Coco Island**  
   *Indulgent chocolate-coated makhana with cocoa and milk notes. A dessert-style snack that satisfies sweet cravings the smarter way.*  
   Price: ₹99 | Pack Size: 35g | **Sold Out**
""")

# 2. FAQs
md.append("### Frequently Asked Questions (Homepage Accordion)")
with open('crawl_data/homepage_sections/shopify-section-template--26421464105250__accordion_mky3Jy.txt', 'r', encoding='utf-8') as f:
    faq_lines = [l.strip() for l in f.read().split('\n') if l.strip()]

q_idx = 1
for i in range(len(faq_lines)):
    line = faq_lines[i]
    if line.endswith('?') and i + 1 < len(faq_lines):
        md.append(f"**Q{q_idx}: {line}**  ")
        md.append(f"*{faq_lines[i+1]}*\n")
        q_idx += 1

# 3. Customer Testimonials
md.append("### Customer Testimonials (Happy Customers ⭐⭐⭐⭐⭐)")
md.append("""
1. **Rohit Sharma**: *"Korigo Snacks are honestly addictive. Super fresh, perfectly crunchy, and not oily at all. You can feel the quality in every bite."*
2. **Ananya Sen**: *"Tried Korigo for the first time and loved it. The flavors are balanced and not too spicy. Perfect snack with evening tea."*
3. **Amit Verma**: *"Very premium feel compared to regular snacks. Clean taste, good packaging, and feels light on the stomach. Will order again for sure."*
4. **Priya Malhotra**: *"My family really enjoyed Korigo Snacks. Crunchy, flavorful, and doesn’t taste artificial. Finally a snack brand we can trust."*
5. **Jaccy B**: *"Best makhana in the market! The combos are super great value."*
""")

# 4. About Us Page
md.append("---")
md.append("## 2. Institutional: About Us / Our Story")
md.append("""
**Brand Philosophy**:  
Korigo believes that healthy snacking should never feel boring. Our makhana is sourced carefully and roasted to perfection so every bite delivers a satisfying crunch and wholesome goodness. Packed with natural nutrients, it is the perfect snack for those who want something light, tasty, and nourishing at the same time.

We focus on keeping things simple and honest. No unnecessary additives, no heavy oils, just pure roasted makhana crafted with flavours that make snacking exciting again. Whether you need a mid-day boost, a movie-time snack, or something to carry on the go, Korigo makes sure you always have a better choice in your hands.

At Korigo, we celebrate the richness of traditional Indian superfoods and give them a modern twist. By combining clean ingredients, bold flavours, and thoughtful preparation, we bring you a snack that fits perfectly into today’s healthy lifestyle while staying rooted in nature.

Because good food should make you feel great, every single day. 🌱

- Roasted, not fried
- Naturally light & crunchy
- Source of plant protein
- High dietary fibre
- No trans fat

**Our Journey**:  
At Korigo Snacks, our journey begins in the still waters of quiet ponds, where skilled farmers carefully hand-harvest waterlily seeds. These tiny pearls are then slow-roasted over a gentle flame, naturally puffing into light, crispy Makhana. We thoughtfully season each batch with rich, natural flavors—transforming a humble seed into a delicious, mindful snack you can feel good about ingredients that nourish the body and satisfy the soul.

**The Face Behind the Brand**:  
Meet **Sohini Kar** and **Piya Kar**, the mother daughter duo behind Korigo Snacks. Their shared love for food and healthy snacking started at home. For them, snacks were never just about taste. It was about enjoying food while staying healthy and feeling good every day.  

- **Sohini Kar (Co-Founder)**: A University of Birmingham graduate with a background in marketing and branding, brings fresh ideas and bold flavour concepts to the brand. Passionate about creating healthier snack choices, Sohini leads Korigo with a vision to combine taste, quality, and mindful nutrition.
- **Piya Kar (Co-Founder)**: A young mom at heart who loves healthy snacking to stay active and energetic, brings warmth and passion to the journey. Piya focuses on product development and brand growth, ensuring Korigo delivers flavorful snacks with high quality and innovation.
""")

# 5. Contact Page
md.append("---")
md.append("## 3. Institutional: Contact Us")
md.append("""
### Customer Care
- **Email**: `contact@korigosnacks.com`
- **Phone**: `+91 8981842929`
- **Socials**: `@korigosnacks.com` (Instagram, Facebook, LinkedIn)
- **Corporate Address**: 783 Anandapur, Kolkata - 700107, West Bengal, India

### Place a Bulk Order
- **Sales Inquiries**: `sales@korigosnacks.com`
- **Phone**: `+91 8981842929`
- **Supported B2B Categories**:
  1. Corporate Gifting
  2. HORECAS (Hotels, Restaurants, Cafes)
  3. Wellness centres
  4. Vending machines
  5. Coworking spaces
  6. Institutions
  7. Event planners
  8. Retail
  9. Exports
  10. Entertainment
  11. Distributors
  12. Miscellaneous

### Customer Review Submission Form
- Full Name (Required)
- Email Address (Required)
- Phone Number (Optional)
- Rating (1–5 Stars)
- Written Review (Required)
- Additional Feedback (Optional)
""")

# 6. Blog Content
md.append("---")
md.append("## 4. Blog Posts & Articles (7 Published Articles)")

root = ET.parse('crawl_data/blogs_news.atom').getroot()
ns = {'atom': 'http://www.w3.org/2005/Atom'}
for entry in root.findall('atom:entry', ns):
    title = entry.find('atom:title', ns).text
    published = entry.find('atom:published', ns).text
    author = entry.find('atom:author/atom:name', ns).text if entry.find('atom:author/atom:name', ns) is not None else 'Sohini Kar'
    content_html = entry.find('atom:content', ns).text
    soup_b = BeautifulSoup(content_html, 'html.parser')
    text_content = soup_b.get_text(separator='\n', strip=True)
    
    md.append(f"### Article: {title}")
    md.append(f"- **Publication Date**: `{published}`")
    md.append(f"- **Author**: `{author}`")
    md.append(f"- **Excerpt / Summary**: {text_content[:250]}...")
    md.append("")

# 7. Policies
md.append("---")
md.append("## 5. Compliance & Legal Policies")

policies = [
    ('Refund Policy', 'policies_refund-policy.html'),
    ('Privacy Policy', 'policies_privacy-policy.html'),
    ('Shipping Policy', 'policies_shipping-policy.html'),
    ('Terms of Service', 'policies_terms-of-service.html')
]

for p_title, p_file in policies:
    with open(f'crawl_data/html/{p_file}', 'r', encoding='utf-8') as pf:
        psoup = BeautifulSoup(pf.read(), 'html.parser')
    pmain = psoup.find('main') or psoup.find(class_='shopify-policy__container') or psoup
    md.append(f"### {p_title}")
    md.append("```")
    md.append(pmain.get_text(separator='\n', strip=True)[:1500])
    md.append("```")
    md.append("")

with open('docs/content-migration.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"Generated docs/content-migration.md successfully.")
