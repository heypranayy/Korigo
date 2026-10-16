# Korigo Snacks — Next.js Frontend Routes Map

**Document Version:** 1.0  
**Implementation Date:** September 29, 2026

---

## 1. Customer-Facing Route Inventory

| Route | Page Type | Component / Target | Data Source | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Homepage | `src/app/page.tsx` | Store API + Local Brand Assets | **Live & Verified (200)** |
| `/shop` | Product Catalog | `src/app/shop/page.tsx` | Store API `/wc/store/v1/products` | **Live & Verified (200)** |
| `/collections/[slug]` | Category Collections | `src/app/collections/[slug]/page.tsx` | Store API Filtered | **Live & Verified (200)** |
| `/products/[slug]` | Product Detail Page (PDP) | `src/app/products/[slug]/page.tsx` | Store API + WP Media + Metadata | **Live & Verified (200)** |
| `/blogs` | Blog Index | `src/app/blogs/page.tsx` | WP REST `/wp/v2/posts` | **Live & Verified (200)** |
| `/blogs/[slug]` | Single Blog Article | `src/app/blogs/[slug]/page.tsx` | WP REST `/wp/v2/posts?slug=` | **Live & Verified (200)** |
| `/about-us` | Brand & Founders Story | `src/app/about-us/page.tsx` | WP Pages + Authentic Founder Assets | **Live & Verified (200)** |
| `/contact` | Contact & Bulk Orders | `src/app/contact/page.tsx` | Interactive Client Form | **Live & Verified (200)** |
| `/reviews-form` | Review Submission | `src/app/reviews-form/page.tsx` | Interactive Review Rating Form | **Live & Verified (200)** |
| `/cart` | Shopping Cart | `src/app/cart/page.tsx` | Store API Cart Session | **Live & Verified (200)** |
| `/checkout` | Headless Checkout | `src/app/checkout/page.tsx` | Shipping & Billing Collection | **Live & Verified (200)** |
| `/my-account` | Customer Portal | `src/app/my-account/page.tsx` | Customer Auth & Orders Dashboard | **Live & Verified (200)** |
| `/search` | Live Search | `src/app/search/page.tsx` | Full Catalog Filter | **Live & Verified (200)** |
| `/refund-policy` | Legal Policy | `src/app/refund-policy/page.tsx` | WP REST `/wp/v2/pages?slug=` | **Live & Verified (200)** |
| `/privacy-policy` | Legal Policy | `src/app/privacy-policy/page.tsx` | WP REST `/wp/v2/pages?slug=` | **Live & Verified (200)** |
| `/shipping-policy` | Legal Policy | `src/app/shipping-policy/page.tsx` | WP REST `/wp/v2/pages?slug=` | **Live & Verified (200)** |
| `/terms-of-service`| Legal Policy | `src/app/terms-of-service/page.tsx` | WP REST `/wp/v2/pages?slug=` | **Live & Verified (200)** |
| `/sitemap.xml` | SEO Sitemap | `src/app/sitemap.ts` | Dynamic XML MetadataRoute | **Live & Verified (200)** |
| `/robots.txt` | Crawler Directives | `src/app/robots.ts` | Dynamic MetadataRoute | **Live & Verified (200)** |

---

## 2. Legacy Shopify 301 Redirect Rules (next.config.mjs)

| Legacy Shopify URL | Canonical Next.js Destination | HTTP Status | Purpose |
| :--- | :--- | :--- | :--- |
| `/collections/all` | `/shop` | **308 Permanent** | Canonical catalog redirect |
| `/collections/frontpage` | `/shop` | **308 Permanent** | Frontpage collection redirect |
| `/collections/product` | `/shop?category=singles` | **308 Permanent** | Singles filter shortcut |
| `/collections/combo` | `/shop?category=combos` | **308 Permanent** | Combos filter shortcut |
| `/pages/our-story` | `/about-us` | **308 Permanent** | Alias consolidation |
| `/pages/about-us` | `/about-us` | **308 Permanent** | Clean route rewrite |
| `/pages/contact` | `/contact` | **308 Permanent** | Clean route rewrite |
| `/pages/reviews-form`| `/reviews-form` | **308 Permanent** | Clean route rewrite |
| `/policies/refund-policy` | `/refund-policy` | **308 Permanent** | Policy route rewrite |
| `/policies/privacy-policy` | `/privacy-policy` | **308 Permanent** | Policy route rewrite |
| `/policies/shipping-policy` | `/shipping-policy` | **308 Permanent** | Policy route rewrite |
| `/policies/terms-of-service` | `/terms-of-service` | **308 Permanent** | Policy route rewrite |
| `/blogs/news` | `/blogs` | **308 Permanent** | Blog archive consolidation |
| `/blogs/news/:slug` | `/blogs/:slug` | **308 Permanent** | Clean individual blog route |
| `/account/login` | `/my-account` | **308 Permanent** | Customer portal consolidation |
| `/account/register` | `/my-account` | **308 Permanent** | Customer registration consolidation |
