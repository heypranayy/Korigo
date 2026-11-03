import json
import html
import re

def render_table(rows):
    if not rows:
        return ""
    h = ['<table class="w-full border-collapse border border-gray-200 my-6 text-sm">']
    # If first row looks like header
    h.append('<thead><tr class="bg-gray-50">')
    for cell in rows[0]:
        h.append(f'<th class="border border-gray-200 p-2.5 text-left font-semibold text-black">{html.escape(cell)}</th>')
    h.append('</tr></thead>')
    h.append('<tbody>')
    for row in rows[1:]:
        h.append('<tr class="border-t border-gray-100 hover:bg-gray-50/50">')
        for idx, cell in enumerate(row):
            cls = "border border-gray-200 p-2.5 text-gray-800"
            if idx == 0:
                cls += " font-medium"
            h.append(f'<td class="{cls}">{html.escape(cell)}</td>')
        h.append('</tr>')
    h.append('</tbody></table>')
    return ''.join(h)

def build_corporate_gifts():
    with open('scripts/extracted/corporate_gifts.json', encoding='utf-8') as f:
        items = json.load(f)
        
    title = "Healthy Corporate Gifts India: Why Makhana Combo Packs Are Worth Sending"
    slug = "healthy-corporate-gifts-india-makhana-combo-packs"
    date = "2026-10-20T10:00:00"
    excerpt = "Looking for healthy corporate gifts India teams will actually eat? Discover why roasted makhana combo packs make practical, nutritious, and impressive gift hampers without wasting budget."
    
    html_parts = []
    # Items 1 to 42 (ignore meta lines 43-45)
    in_list = False
    
    i = 1
    while i < len(items):
        it = items[i]
        if it['type'] == 'p':
            txt = it['text']
            if txt.startswith("Meta title:") or txt.startswith("Meta description:") or txt.startswith("Slug:"):
                i += 1
                continue
            
            # Bullet list items under "What Makes a Corporate Gift Healthy?" (5-8)
            if i in [5, 6, 7, 8]:
                if not in_list:
                    html_parts.append('<ul class="list-disc pl-5 my-4 space-y-1">')
                    in_list = True
                html_parts.append(f'<li>{html.escape(txt)}</li>')
                i += 1
                continue
            elif in_list:
                html_parts.append('</ul>')
                in_list = False
                
            if it['style'] == 'Heading2':
                html_parts.append(f'<h2>{html.escape(txt)}</h2>')
            elif it['style'] == 'Heading3':
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            elif i in [35, 37, 39]: # FAQ questions
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            elif i in [19, 20, 21, 22, 23]: # Occasions bullet-like paragraphs
                # Format with bold prefix if has period
                parts = txt.split('.', 1)
                if len(parts) == 2:
                    html_parts.append(f'<p><strong>{html.escape(parts[0])}.</strong>{html.escape(parts[1])}</p>')
                else:
                    html_parts.append(f'<p>{html.escape(txt)}</p>')
            elif i in [30, 31, 32, 33]: # Quick checks
                parts = txt.split('.', 1)
                if len(parts) == 2:
                    html_parts.append(f'<p><strong>{html.escape(parts[0])}.</strong>{html.escape(parts[1])}</p>')
                else:
                    html_parts.append(f'<p>{html.escape(txt)}</p>')
            else:
                html_parts.append(f'<p>{html.escape(txt)}</p>')
        elif it['type'] == 'table':
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            html_parts.append(render_table(it['rows']))
        i += 1
        
    if in_list:
        html_parts.append('</ul>')
        
    return {
        "title": title,
        "slug": slug,
        "date": date,
        "excerpt": excerpt,
        "content": "\n".join(html_parts)
    }

def build_travel_snacks():
    with open('scripts/extracted/travel_snacks.json', encoding='utf-8') as f:
        items = json.load(f)
        
    title = "Healthy Travel Snacks for Flights and Train Journeys: What to Pack and What to Skip"
    slug = "healthy-travel-snacks-flights-train-journeys"
    date = "2026-11-03T10:00:00"
    excerpt = "Healthy travel snacks for flights and train journeys: what travels well, what makes a mess, and why light roasted makhana is the best low-calorie, guilt-free journey snack."
    
    html_parts = []
    in_list = False
    
    i = 1
    while i < len(items):
        it = items[i]
        if it['type'] == 'p':
            txt = it['text']
            if txt.startswith("Meta title:") or txt.startswith("Meta description:") or txt.startswith("Slug:"):
                i += 1
                continue
                
            # List 1: What makes healthy travel snacks work (items 5-9)
            if i in [5, 6, 7, 8, 9]:
                if not in_list:
                    html_parts.append('<ul class="list-disc pl-5 my-4 space-y-1">')
                    in_list = True
                html_parts.append(f'<li>{html.escape(txt)}</li>')
                i += 1
                continue
            # List 2: Foods that look healthy but travel badly (items 21-25)
            elif i in [21, 22, 23, 24, 25]:
                if not in_list:
                    html_parts.append('<ul class="list-disc pl-5 my-4 space-y-1">')
                    in_list = True
                html_parts.append(f'<li>{html.escape(txt)}</li>')
                i += 1
                continue
            # List 3: Packing tips (items 37-41)
            elif i in [37, 38, 39, 40, 41]:
                if not in_list:
                    html_parts.append('<ul class="list-disc pl-5 my-4 space-y-1">')
                    in_list = True
                html_parts.append(f'<li>{html.escape(txt)}</li>')
                i += 1
                continue
            elif in_list:
                html_parts.append('</ul>')
                in_list = False
                
            if it['style'] == 'Heading2':
                html_parts.append(f'<h2>{html.escape(txt)}</h2>')
            elif it['style'] == 'Heading3':
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            elif i in [43, 45, 47]: # FAQ questions
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            else:
                html_parts.append(f'<p>{html.escape(txt)}</p>')
        elif it['type'] == 'table':
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            html_parts.append(render_table(it['rows']))
        i += 1
        
    if in_list:
        html_parts.append('</ul>')
        
    return {
        "title": title,
        "slug": slug,
        "date": date,
        "excerpt": excerpt,
        "content": "\n".join(html_parts)
    }

def build_makhana_nutrition():
    with open('scripts/extracted/makhana_nutrition.json', encoding='utf-8') as f:
        items = json.load(f)
        
    title = "Makhana: Calories, Protein Value, Nutrition & Benefits"
    slug = "makhana-calories-protein-value-nutrition-benefits"
    date = "2026-09-20T10:00:00"
    excerpt = "Discover the true nutritional value of makhana per 100g, its protein content, calories, glycaemic index, and scientifically backed health benefits for weight management and everyday snacking."
    
    html_parts = []
    # Skip items 0-4 (metadata table, 'Blog Title', Title heading, 'Blog Body', image table)
    i = 5
    while i < len(items):
        it = items[i]
        if it['type'] == 'p':
            txt = it['text']
            # Headings
            if it['style'] == 'Heading2':
                html_parts.append(f'<h2>{html.escape(txt)}</h2>')
            elif it['style'] == 'Heading3':
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            elif txt in ["Weight Management", "Blood Sugar", "Heart Health", "Bones and Skin"]:
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            elif txt in [
                "Is makhana good for weight loss?",
                "Is makhana good for diabetics?",
                "Is makhana a complete protein?",
                "Raw or roasted—which is healthier?",
                "Raw or roasted?which is healthier?",
                "Does makhana increase uric acid?",
                "Is makhana gluten-free?"
            ]:
                clean_q = txt.replace("?which", "—which")
                html_parts.append(f'<h3>{html.escape(clean_q)}</h3>')
            elif txt.startswith("*Approximate values") or txt.startswith("**USDA"):
                html_parts.append(f'<p class="text-xs text-gray-500 italic">{html.escape(txt)}</p>')
            else:
                html_parts.append(f'<p>{html.escape(txt)}</p>')
        elif it['type'] == 'table':
            html_parts.append(render_table(it['rows']))
        i += 1
        
    return {
        "title": title,
        "slug": slug,
        "date": date,
        "excerpt": excerpt,
        "content": "\n".join(html_parts)
    }

def build_pregnancy():
    with open('scripts/extracted/pregnancy.json', encoding='utf-8') as f:
        items = json.load(f)
        
    title = "Is Makhana Safe During Pregnancy? Benefits & Side Effects"
    slug = "is-makhana-safe-during-pregnancy-benefits-side-effects"
    date = "2026-10-10T10:00:00"
    excerpt = "Is makhana safe during pregnancy? Learn about the benefits, nutritional value, daily recommended portions, trimester guidelines, and precautions for expectant mothers."
    
    html_parts = []
    # Skip items 0-4
    in_list = False
    
    benefit_subheads = [
        "Plant Protein and Calcium for Bone Health",
        "Magnesium and Potassium for Proper Functioning of Muscles and Blood Pressure Regulation",
        "Fibre for Constipation",
        "A Convenient Snack for Cravings and Blood Sugar Control",
        "Lower-Fat and Lower-Calorie Versus Fried Snacks",
        "A Small Contribution of Iron"
    ]
    
    side_effects_subheads = [
        "Bloatedness and Bloating",
        "Constipation",
        "Salt and Oil Content in Packaged Products",
        "Allergy",
        "Gestational Diabetes"
    ]
    
    trimester_subheads = [
        "First Trimester",
        "Second Trimester",
        "Third Trimester"
    ]
    
    faq_questions = [
        "Can I eat makhana every day in pregnancy?",
        "Is makhana safe in the first trimester?",
        "Can makhana cause miscarriage?",
        "Is makhana good for gestational diabetes?",
        "Can I eat roasted or flavoured makhana?"
    ]
    
    i = 5
    while i < len(items):
        it = items[i]
        if it['type'] == 'p':
            txt = it['text']
            
            # Improved preparation methods list (items 64-68)
            if i in [64, 65, 66, 67, 68]:
                if not in_list:
                    html_parts.append('<ul class="list-disc pl-5 my-4 space-y-1">')
                    in_list = True
                html_parts.append(f'<li>{html.escape(txt)}</li>')
                i += 1
                continue
            elif in_list:
                html_parts.append('</ul>')
                in_list = False
                
            if it['style'] == 'Heading2':
                html_parts.append(f'<h2>{html.escape(txt)}</h2>')
            elif it['style'] == 'Heading3':
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            elif txt in benefit_subheads or txt in side_effects_subheads or txt in trimester_subheads:
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            elif txt in faq_questions:
                html_parts.append(f'<h3>{html.escape(txt)}</h3>')
            else:
                html_parts.append(f'<p>{html.escape(txt)}</p>')
        elif it['type'] == 'table':
            if in_list:
                html_parts.append('</ul>')
                in_list = False
            html_parts.append(render_table(it['rows']))
        i += 1
        
    if in_list:
        html_parts.append('</ul>')
        
    return {
        "title": title,
        "slug": slug,
        "date": date,
        "excerpt": excerpt,
        "content": "\n".join(html_parts)
    }

if __name__ == "__main__":
    for fn in [build_makhana_nutrition, build_pregnancy, build_corporate_gifts, build_travel_snacks]:
        res = fn()
        print(f"Rendered: {res['title']}")
        print(f"  Slug: {res['slug']}, Date: {res['date']}")
        print(f"  HTML len: {len(res['content'])} chars")

