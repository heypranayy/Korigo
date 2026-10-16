# Korigo Snacks — Complete Discovered Route Architecture

This document catalogs every route discovered during the comprehensive audit and crawl of the live Shopify-powered Korigo Snacks website ([https://korigosnacks.com/](https://korigosnacks.com/)).

---

## 1. Route Summary Statistics

| Category | Discovered Live Routes | New Target Routes | Redirect Type |
| :--- | :--- | :--- | :--- |
| **Storefront Core** | 5 | 5 | Direct / Canonical |
| **Collections / Catalog** | 4 | 4 | 301 / Rewrite to `/shop` |
| **Individual Flavour Products** | 6 | 6 | Exact Slug Match (`/products/[slug]`) |
| **Combo Products** | 6 | 6 | Exact Slug Match (`/products/[slug]`) |
| **Institutional Pages** | 4 | 3 | Canonicalized (`/pages/our-story` -> `/pages/about-us`) |
| **Blog Index & Articles** | 8 | 8 | Maintained (`/blogs/news/*` -> `/blog/*` + 301 alias) |
| **Legal / Compliance Policies** | 4 | 4 | Maintained (`/policies/*` -> Next.js Policy Pages) |
| **Commerce Flow (Cart/Checkout)** | 2 | 3 | Headless WooCommerce Cart & Store API Checkout |
| **Customer Authentication / Account** | 3 | 4 | Next.js Server Actions + WooCommerce Customer Auth |
| **Agent / Discovery Meta** | 1 | 1 | Preserved (`/agents.md`) |
| **TOTAL UNIQUE ROUTES** | **43** | **44** | Fully Accounted For |

---

## 2. Storefront Core Routes

### `GET /`
- **Shopify URL**: `https://korigosnacks.com/`
- **New Next.js Route**: `app/page.tsx` (`/`)
- **Page Type**: Homepage (High-Impact Hero, Visual Storytelling, Product Showcase, Social Proof)
- **Status**: 200 OK
- **Auth Required**: No (Public)
- **Data Sources**: WooCommerce Featured Products, Combos, WordPress FAQs, Testimonials, Media Library Assets.

### `GET /cart`
- **Shopify URL**: `https://korigosnacks.com/cart`
- **New Next.js Route**: `app/cart/page.tsx` (`/cart`)
- **Page Type**: Interactive Shopping Cart
- **Status**: 200 OK
- **Auth Required**: No (Session/Cart Token via WooCommerce Store API)
- **Features**: Line item increment/decrement, coupon redemption, shipping estimator, subtotal, checkout CTA.

### `GET /checkout`
- **Shopify URL**: `https://korigosnacks.com/checkouts/*` (Shopify Hosted Checkout)
- **New Next.js Route**: `app/checkout/page.tsx` (`/checkout`)
- **Page Type**: One-Page Checkout Flow
- **Status**: 200 OK
- **Auth Required**: Guest checkout allowed; customer login optional
- **Backend API**: WooCommerce Store API (`/wp-json/wc/store/v1/checkout`)
- **Security**: Payment secrets & WooCommerce Consumer Secrets isolated strictly to server-side route handlers.

### `GET /order-confirmation`
- **Shopify URL**: `https://korigosnacks.com/orders/*`
- **New Next.js Route**: `app/checkout/order-received/[orderId]/page.tsx` (`/order-confirmation`)
- **Page Type**: Order Receipt & Summary
- **Status**: 200 OK
- **Auth Required**: Order key / JWT validation

### `GET /search`
- **Shopify URL**: `https://korigosnacks.com/search`
- **New Next.js Route**: `app/search/page.tsx` (`/search`)
- **Page Type**: Product & Recipe Search Results
- **Status**: 200 OK
- **Auth Required**: No

---

## 3. Product Catalog & Collection Routes

### `GET /collections/all`
- **Shopify URL**: `https://korigosnacks.com/collections/all`
- **New Next.js Route**: `app/shop/page.tsx` (`/shop` with 301 redirect from `/collections/all`)
- **Page Type**: Full Storefront Catalog
- **Products Rendered**: All 12 Products (6 Individual Flavours + 6 Combo Packs)
- **Features**: Category filter pills (All, Flavours, Combos), Stock indicators, Quick Add to Cart, Dynamic Pricing.

### `GET /collections/frontpage`
- **Shopify URL**: `https://korigosnacks.com/collections/frontpage`
- **New Next.js Route**: `app/shop/page.tsx?collection=frontpage` (301 Redirect to `/shop`)
- **Page Type**: Curated single flavour snacks (6 products).

### `GET /collections/product`
- **Shopify URL**: `https://korigosnacks.com/collections/product`
- **New Next.js Route**: `app/shop/page.tsx?category=singles` (301 Redirect)
- **Page Type**: Individual 35g Flavour Packs (6 products).

### `GET /collections/combo`
- **Shopify URL**: `https://korigosnacks.com/collections/combo`
- **New Next.js Route**: `app/shop/page.tsx?category=combos` (301 Redirect)
- **Page Type**: Dual-Pack Flavour Combos (6 combo products).

---

## 4. Product Detail Routes (`/products/[slug]`)

Dynamic Route Handler: `app/products/[slug]/page.tsx`

| Product Slug | Product Title | Pack Size | Price (INR) | Compare Price | Stock Status | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `citrus-cartel-makhana` | Korigo Pops Citrus Cartel Tangy Makhana Foxnuts \| Spicy Citrus \| 35g | 35g | ₹99.00 | ₹99.00 | In Stock | Single Flavour |
| `coco-world-makhana` | Korigo Pops Coco Island Chocolate Makhana Foxnuts \| Sweet Snack \| 35g | 35g | ₹99.00 | ₹99.00 | **Sold Out** | Single Flavour |
| `creme-d-onion-makhana` | Korigo Pops Sour Crème d' Onion Makhana Foxnuts \| Creamy Snack \| 35g | 35g | ₹99.00 | ₹99.00 | In Stock | Single Flavour |
| `garlicked-cheese-makhana` | Korigo Pops Garlicked Cheese Makhana Foxnuts \| Savoury Snack \| 35g | 35g | ₹99.00 | ₹99.00 | In Stock | Single Flavour |
| `cinnamon-drip` | Korigo Pops Cinnamon Drip Makhana Foxnuts \| Roasted \| 35g | 35g | ₹99.00 | ₹99.00 | In Stock | Single Flavour |
| `sassy-sriracha` | Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts \| Spicy \| 35g | 35g | ₹99.00 | ₹99.00 | In Stock | Single Flavour |
| `garlic-cheese-sassy-sriracha-combo` | Garlic Cheese + Sassy Sriracha Combo | 2x35g (70g) | ₹159.00 | ₹199.00 | In Stock | Combo (2-Pack) |
| `citrus-cartel-sassy-sriracha-combo` | Citrus Cartel + Sassy Sriracha Combo | 2x35g (70g) | ₹159.00 | ₹199.00 | In Stock | Combo (2-Pack) |
| `citrus-cartel-garlicked-cheese-combo` | Citrus Cartel + Garlicked Cheese Combo | 2x35g (70g) | ₹159.00 | ₹199.00 | In Stock | Combo (2-Pack) |
| `garlicked-cheese-cinnamon-drip-combo` | Garlicked Cheese + Cinnamon Drip Combo | 2x35g (70g) | ₹159.00 | ₹199.00 | In Stock | Combo (2-Pack) |
| `cinnamon-drip-sour-cream-onion-combo` | Cinnamon Drip + Sour Crème d' Onion Combo | 2x35g (70g) | ₹159.00 | ₹199.00 | In Stock | Combo (2-Pack) |
| `sassy-sriracha-sour-cream-onion-combo` | Sour Crème d' Onion + Sassy Sriracha Combo | 2x35g (70g) | ₹159.00 | ₹199.00 | In Stock | Combo (2-Pack) |

---

## 5. Institutional & Static Pages

### `GET /pages/about-us`
- **Shopify URL**: `https://korigosnacks.com/pages/about-us`
- **New Next.js Route**: `app/pages/about-us/page.tsx` (`/pages/about-us` and alias `/about`)
- **Page Type**: Brand Story & Founders
- **Content**: The Korigo Journey, Harvest in Mithila ponds, Roasting philosophy, Founders Sohini Kar & Piya Kar, Core product benefits.

### `GET /pages/our-story`
- **Shopify URL**: `https://korigosnacks.com/pages/our-story`
- **New Next.js Route**: Canonical 301 redirect to `/pages/about-us`.
- **Notes**: Identical content to `about-us` on Shopify; unified under `/pages/about-us` for SEO integrity.

### `GET /pages/contact`
- **Shopify URL**: `https://korigosnacks.com/pages/contact`
- **New Next.js Route**: `app/pages/contact/page.tsx` (`/pages/contact` and alias `/contact`)
- **Page Type**: Customer Care, Wholesale B2B Inquiries, Review Submission
- **Forms**:
  1. Bulk Order Form (12 categories: Corporate Gifting, HORECAS, Wellness centres, Vending machines, etc.)
  2. Customer Review Submission Form (Rating, Name, Email, Phone, Review, Feedback)
- **Direct Contacts**: `contact@korigosnacks.com`, `sales@korigosnacks.com`, `+91 8981842929`
- **Certifications**: FSSAI, ISO, etc. showcase at bottom.

### `GET /pages/reviews-form`
- **Shopify URL**: `https://korigosnacks.com/pages/reviews-form`
- **New Next.js Route**: `app/pages/reviews-form/page.tsx` (`/pages/reviews-form`)
- **Notes**: Form duplicate of contact page review form; maintained for legacy inbound campaign links.

---

## 6. Blog & Content Routes

### `GET /blogs/news`
- **Shopify URL**: `https://korigosnacks.com/blogs/news`
- **New Next.js Route**: `app/blog/page.tsx` (`/blog`, with rewrite/301 for `/blogs/news`)
- **Page Type**: Blog Index & Article Feed
- **Author**: Sohini Kar

### Individual Blog Post Routes:
Dynamic Route Handler: `app/blog/[slug]/page.tsx` (with Next.js middleware 301 rewrite from `/blogs/news/[slug]`):

1. `GET /blogs/news/top-health-benefits-of-makhana-fox-nuts-lotus-seeds`
   - **Target**: `/blog/top-health-benefits-of-makhana-fox-nuts-lotus-seeds`
   - **Title**: Top Health Benefits of Makhana (Fox Nuts / Lotus Seeds)
   - **Published**: 2026-06-10

2. `GET /blogs/news/makhana-for-weight-loss-how-to-eat`
   - **Target**: `/blog/makhana-for-weight-loss-how-to-eat`
   - **Title**: Makhana for Weight Loss: How to Eat?
   - **Published**: 2026-06-20

3. `GET /blogs/news/makhana-vs-other-snacks-why-its-the-healthiest`
   - **Target**: `/blog/makhana-vs-other-snacks-why-its-the-healthiest`
   - **Title**: Makhana vs Other Snacks: Why It's the Healthiest?
   - **Published**: 2026-06-29

4. `GET /blogs/news/why-cheese-makhana-is-becoming-india-s-favorite-healthy-snack`
   - **Target**: `/blog/why-cheese-makhana-is-becoming-india-s-favorite-healthy-snack`
   - **Title**: Why Cheese Makhana Is Becoming India’s Favorite Healthy Snack
   - **Published**: 2026-07-27

5. `GET /blogs/news/healthy-makhana-recipes-you-can-make-at-home`
   - **Target**: `/blog/healthy-makhana-recipes-you-can-make-at-home`
   - **Title**: Healthy Makhana Recipes You Can Make at Home
   - **Published**: 2026-08-05

6. `GET /blogs/news/top-5-healthy-snacks-for-desk-jobs`
   - **Target**: `/blog/top-5-healthy-snacks-for-desk-jobs`
   - **Title**: Top 4 Healthy Snacks for Desk Jobs
   - **Published**: 2026-08-25

7. `GET /blogs/news/late-night-healthy-snacks-that-won-t-make-you-feel-guilty`
   - **Target**: `/blog/late-night-healthy-snacks-that-won-t-make-you-feel-guilty`
   - **Title**: Late Night Healthy Snacks That Won’t Make You Feel Guilty
   - **Published**: 2026-09-10

---

## 7. Legal & Policy Routes

Dynamic or static handler: `app/policies/[slug]/page.tsx`

1. `GET /policies/refund-policy` -> `app/policies/refund-policy/page.tsx` (Strict No-Return/No-Refund, 48h Transit Damage)
2. `GET /policies/privacy-policy` -> `app/policies/privacy-policy/page.tsx` (Comprehensive Privacy Disclosure)
3. `GET /policies/shipping-policy` -> `app/policies/shipping-policy/page.tsx` (1–3 Days Processing, Pan-India logistics)
4. `GET /policies/terms-of-service` -> `app/policies/terms-of-service/page.tsx` (Conditions of Use, Kolkata Jurisdiction)

---

## 8. Customer Authentication & Account Routes

Headless WordPress/WooCommerce Authenticated routes:
1. `GET /account/login` -> `app/account/login/page.tsx` (JWT/Session Login)
2. `GET /account/register` -> `app/account/register/page.tsx` (New Customer Registration)
3. `GET /account` -> `app/account/page.tsx` (Customer Dashboard)
4. `GET /account/orders` -> `app/account/orders/page.tsx` (Past Orders & Fulfillment Status)
5. `GET /account/addresses` -> `app/account/addresses/page.tsx` (Billing & Shipping Address Management)
6. `POST /api/auth/login` -> Next.js Server-Side Route Handler
7. `POST /api/auth/register` -> Next.js Server-Side Route Handler
8. `POST /api/auth/logout` -> Next.js Server-Side Route Handler

---

## 9. Machine Agent & Discovery Routes

1. `GET /agents.md` -> `public/agents.md` (Maintained from live Shopify discovery specification)
2. `GET /robots.txt` -> `app/robots.ts`
3. `GET /sitemap.xml` -> `app/sitemap.ts`
