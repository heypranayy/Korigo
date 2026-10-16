# Korigo Snacks — Full Implementation Plan & Migration Roadmap

This document outlines the systematic, phased engineering roadmap to rebuild and migrate the Shopify-powered [https://korigosnacks.com/](https://korigosnacks.com/) to a modern, decoupled **WordPress + WooCommerce + Next.js/React** storefront.

Per **Rule 46 (First Action — Do Not Code)**: Phase 1 through Phase 5 (Crawling, Auditing, Asset Preservation, Schema Mapping, and Content Modeling) represent the completed prerequisites before UI construction.

---

## 1. Technical Stack & Architectural Overview

```
                      ┌───────────────────────────────────────────────┐
                      │          NEXT.JS 15 STOREFRONT (REACT)        │
                      │  App Router, TypeScript, Tailwind CSS         │
                      │  Server Components & Optimized Image Pipeline  │
                      └──────────────────────┬────────────────────────┘
                                             │
                       HTTPS / REST & Store API / Server Actions
                                             │
                                             ▼
                      ┌───────────────────────────────────────────────┐
                      │          HEADLESS WORDPRESS + WOOCOMMERCE     │
                      │  - WooCommerce Store API (Cart & Checkout)    │
                      │  - WooCommerce REST API v3 (Catalog & Auth)   │
                      │  - WordPress Core REST API (Posts, Pages, FAQ)│
                      │  - Custom Post Meta & Taxonomies              │
                      └──────────────────────┬────────────────────────┘
                                             │
                                             ▼
                      ┌───────────────────────────────────────────────┐
                      │              MYSQL DATABASE                   │
                      │  Single Source of Truth for Products, Orders, │
                      │  Customers, Inventory, and Editorial Content  │
                      └───────────────────────────────────────────────┘
```

---

## 2. Phase-by-Phase Roadmap

### PHASE 1: Complete Crawl (COMPLETED)
- [x] Crawled XML sitemaps (`sitemap_products_1.xml`, `sitemap_pages_1.xml`, `sitemap_collections_1.xml`, `sitemap_blogs_1.xml`, `sitemap_agentic_discovery.xml`).
- [x] Crawled `products.json` (12 products discovered) and `collections.json` (3 collections discovered).
- [x] Crawled all 35 live HTML pages into `crawl_data/html/`.
- [x] Extracted `agents.md`, theme stylesheets (`t4s-base.css`, `t4s-theme.css`, `colors.css`), and Atom feed (`blogs/news.atom`).

### PHASE 2: Site Inventory (COMPLETED)
- [x] Audited all 35 pages and routes.
- [x] Created `/docs/korigo-site-inventory.md` detailing URL, Page Type, Title, Purpose, Sections, Linked Assets, Linked Products, and SEO data.
- [x] Created `/docs/korigo-routes.md` with complete discovered route catalog.

### PHASE 3: Asset Inventory & Preservation (COMPLETED)
- [x] Harvested 171 authentic media assets directly from Shopify CDN.
- [x] Structured local storage in `/public/assets/korigo/`:
  - `logo/`: Official Korigo Snacks branding.
  - `hero/`: High-resolution desktop & mobile slideshow banners.
  - `products/`: 57 packshots, moodshots, nutrition tables, and ingredients graphics.
  - `combos/`: 21 dual-pack combo packaging graphics and bundle shots.
  - `founders/`: Authentic photographs of Sohini Kar and Piya Kar.
  - `certifications/`: FSSAI, ISO, and recognition badges.
  - `recipes/`: 11 recipe preparation and presentation photographs.
  - `blogs/`: High-resolution editorial feature thumbnails.
  - `general/`: Mithila pond waterlily harvesting imagery, benefit icons, badges.
- [x] Generated `/public/assets/korigo/manifest.json` with original URLs, local paths, and usage tags.
- [x] Created `/docs/korigo-assets.md` and `/docs/content-missing.md`.

### PHASE 4: Shopify → WooCommerce Data Model (COMPLETED)
- [x] Created `/docs/shopify-to-woocommerce-mapping.md` mapping products, prices, variants, inventory, categories, tags, images, and metafields.
- [x] Created `/docs/product-migration-map.md` mapping all 12 products.

### PHASE 5: WordPress Content Model (COMPLETED)
- [x] Modeled Posts for the 7 blog articles with exact authors and dates.
- [x] Modeled Pages for About Us, Contact Us, and 4 Legal Policies.
- [x] Modeled Custom Post Meta for Nutritional Tables, RDA Percentages, Ingredients, Allergens, and Recipe accordions.
- [x] Created `/docs/content-migration.md`.

---

### PHASE 6: Next.js Foundation & Architecture (UPCOMING)
- Initialize Next.js App Router project with TypeScript and Tailwind CSS.
- Configure Google Font `Andada Pro` (Carolina Giovagnoli) in weights 400, 500, 600, 700, 800.
- Create `/lib/api/` abstraction modules:
  - `/lib/api/woocommerce/products.ts`
  - `/lib/api/woocommerce/cart.ts`
  - `/lib/api/woocommerce/checkout.ts`
  - `/lib/api/wordpress/posts.ts`
  - `/lib/api/wordpress/pages.ts`
  - `/lib/api/auth/customer.ts`

### PHASE 7: Global Styles, Header & Navigation, Footer
- Implement Tailwind configuration mirroring `/docs/design-system.md` (`#148f2c` accent, `#000000` dark, `#868686` text, `1440px` max wrapper).
- Build Announcement Bar (`Free shipping` / promotional banners).
- Build Sticky Desktop Header: Korigo logo, navigation links (`Home`, `Shop`, `Our Story`, `Contact Us`), Cart drawer toggle.
- Build Mobile Drawer Menu with slide-in animation.
- Build Dark Contrast Footer: Newsletter subscription form, contact info (`783 Anandapur, Kolkata -700107`, `contact@korigosnacks.com`), policy links, copyright notice.

### PHASE 8: Homepage Recreation
- Hero Slideshow: Recreate Flickity carousel with authentic banners.
- Nutritional Story & Claims: "Crunch Into Korigo Flavoured Makhana".
- Comparison Table: Korigo Roasted Makhana vs Other Fried Snacks (Protein, Fat, Fiber, Gluten-Free).
- "Why Makhana Is the Smarter Snack Choice" & "Mithila, Bihar" story.
- "Why KORIGO?": कोरी (kori) purity story + 6 benefit badges.
- Flavour Showcase: Tangy Citrus Cartel, Sassy Sriracha, Cinnamon Drip, Garlicked Cheese, Sour Crème d' Onion, Coco Island.
- Featured Combos Carousel: 6 value combos with price strikethroughs (₹159 vs ₹199).
- Accessible Accordion FAQs: 12 exact questions and answers.
- Testimonial Carousel: "Happy Customers ⭐⭐⭐⭐⭐" (Rohit Sharma, Ananya Sen, Amit Verma, Priya Malhotra, Jaccy B).
- Certifications & Recognitions section: 4 authentic certification badges.

### PHASE 9: Shop / Catalog (`/shop`)
- Category filter pills: All, Individual Flavours (35g), Combos (70g).
- Product grid with dual-image hover swaps (packshot -> moodshot).
- Stock status badges ("Sold Out" on Coco Island, "Save ₹40" on Combos).
- Quick Add to Cart & Buy Now CTA buttons.

### PHASE 10: Product Detail Pages (`/products/[slug]`)
- Multi-image gallery with thumbnails and lightbox preview.
- Dynamic pricing, pack size selector, stock availability notice.
- Interactive Add to Cart & Buy Now with quantity selector.
- Pincode delivery estimator.
- Detailed accordions:
  - About the Product narrative
  - Nutritional Information Table (per 100g)
  - % Contribution to RDA per serve (35g)
  - List of Ingredients
  - Allergen Declaration
- "Our Favorite Recipes" interactive accordion with dish photos, ingredients, and step-by-step instructions.
- Cross-sell slider ("Explore our Other Products").

### PHASE 11: Combo Products Architecture
- Bundle relationship rendering for dual flavours.
- Display constituent single flavours and savings badge.

### PHASE 12: Cart Experience
- Headless WooCommerce Store API cart integration.
- Slide-over mini-cart drawer and full `/cart` page.
- Line item quantity increment/decrement, item removal.
- Coupon code submission with instant subtotal recalculation.

### PHASE 13: Checkout Flow (`/checkout`)
- Server-side route handler communicating with `/wp-json/wc/store/v1/checkout`.
- Multi-step or streamlined one-page form: Customer contact, Shipping Address, Billing Address, Shipping Method, Payment Method.
- Secure environment isolation for payment gateway secrets.
- Order confirmation page (`/order-confirmation`).

### PHASE 14: Customer Accounts & Authentication
- `/account/login` and `/account/register` forms with client/server validation.
- Secure cookie-based JWT or session tokens.
- Protected customer dashboard: Profile details, past orders, shipping addresses.

### PHASE 15: Blog (`/blog` and `/blog/[slug]`)
- Blog index feed displaying all 7 articles with publication dates and author Sohini Kar.
- Article detail view rendering full semantic HTML, typography, and related snacks.

### PHASE 16: About Us / Our Story (`/pages/about-us`)
- Brand story, gentle roasting philosophy, harvesting in quiet Mithila ponds.
- "The Face Behind the Brand": Sohini Kar (Co-Founder) and Piya Kar (Co-Founder) authentic profiles and portraits.

### PHASE 17: Contact Us (`/pages/contact`)
- Customer care details (`contact@korigosnacks.com`, `+91 8981842929`).
- Bulk Order B2B inquiry form supporting all 12 commercial categories.
- Review submission form with 5-star rating selector.

### PHASE 18: FAQ & Help
- Accessible FAQ accordion rendered from WordPress data.

### PHASE 19: Legal Policies
- `/policies/refund-policy` (Strict no-refund policy, 48h damaged transit clause).
- `/policies/privacy-policy` (Full privacy disclosure).
- `/policies/shipping-policy` (1–3 business day timeline, pan-India logistics).
- `/policies/terms-of-service` (Terms, conditions, and jurisdiction).

### PHASE 20: SEO, Schemas & Redirects
- Open Graph, Twitter Cards, Canonical URLs.
- Schema.org JSON-LD: Product schema, BreadcrumbList, Organization, Article, FAQPage.
- `robots.txt` and dynamic `sitemap.xml`.
- Next.js middleware handling 301 redirects from old Shopify URLs per `/docs/url-redirect-map.csv`.

### PHASE 21–25: Performance, Accessibility & Comprehensive QA
- Next.js image optimization (`next/image`), WebP/AVIF formats.
- Lighthouse score targets: 90+ across Performance, Accessibility, Best Practices, SEO.
- Side-by-side browser visual comparison against `https://korigosnacks.com/`.
- Functional QA across Mobile (375px, 390px, 414px) and Desktop (1024px, 1280px, 1440px).
