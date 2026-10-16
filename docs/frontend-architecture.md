# Korigo Snacks — Next.js Headless Frontend Architecture

**Document Version:** 1.0 (Phase D Implementation)  
**Target Backend:** WordPress 7.1.2 + WooCommerce 11.1.2 (`https://backend-korigo.sampledomain.online`)  
**Frontend Framework:** Next.js 14.2 (App Router), React 18, TypeScript, Tailwind CSS

---

## 1. Architectural Overview

```
                      CUSTOMER BROWSER
                             │
                             ▼
              NEXT.JS 14 STOREFRONT (App Router)
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼
  SERVER COMPONENTS                       CLIENT ISLANDS
  • Static Generation (ISR 60s)           • Cart Drawer & Context
  • Rich Metadata & OpenGraph             • Product Actions & Qty
  • Sanitized CMS Content                 • Catalog Category Filters
  • SEO Sitemap / Robots                  • Live Product Search
         │                                       │
         ▼                                       ▼
  WORDPRESS REST API                      WOOCOMMERCE STORE API
  /wp-json/wp/v2/posts                    /wp-json/wc/store/v1/products
  /wp-json/wp/v2/pages                    /wp-json/wc/store/v1/cart
  /wp-json/wp/v2/media                    /wp-json/wc/store/v1/cart/add-item
```

---

## 2. Directory Structure

```
/src
  /app
    layout.tsx               # Root layout (Google fonts, CartProvider, Header, Footer)
    page.tsx                 # Homepage with all authentic sections
    globals.css              # Design tokens and Andada Pro typography
    sitemap.ts               # Dynamic XML sitemap generator
    robots.ts                # Production robots.txt
    /shop/page.tsx           # Full 12-product catalog with live filters
    /products/[slug]/page.tsx# PDP with gallery, nutrition, recipes, actions
    /collections/[slug]/page.tsx # Legacy & category collection routes
    /blogs/page.tsx          # 7-article blog archive
    /blogs/[slug]/page.tsx   # Single blog article with HTML rendering
    /about-us/page.tsx       # Founder stories & brand journey
    /contact/page.tsx        # Customer care & bulk ordering forms
    /reviews-form/page.tsx   # Interactive review submission
    /cart/page.tsx           # Full-page shopping cart with shipping meter
    /checkout/page.tsx       # Headless checkout & shipping collection
    /my-account/page.tsx     # Customer authentication & order dashboard
    /search/page.tsx         # Site-wide live product search
    /refund-policy/page.tsx  # Dynamic CMS policy
    /privacy-policy/page.tsx # Dynamic CMS policy
    /shipping-policy/page.tsx# Dynamic CMS policy
    /terms-of-service/page.tsx# Dynamic CMS policy
  /components
    /layout
      Header.tsx             # Responsive sticky header with dropdown & cart badge
      AnnouncementBar.tsx    # Promotional shipping message
      Footer.tsx             # Dark footer with newsletter, links, and certs
    /home
      HeroBanner.tsx         # Hero section with authentic hero artwork
      FlavoursMarquee.tsx    # Horizontal continuous flavour badge marquee
      CombosSection.tsx      # 6 value combo bundle cards
      SingleFlavoursSection.tsx # 6 single flavours & 4 superfood pillars
      Certifications.tsx     # FSSAI, ISO, Vegetarian, Non-GMO badges
      ReviewsSection.tsx     # Customer testimonials & review button
      FaqSection.tsx         # 10 collapsible authentic FAQs
    /product
      ProductCard.tsx        # Card with hover image swap & Add to Cart
      ProductGallery.tsx     # Thumbnail selector and zoom packshot
      ProductActions.tsx     # Quantity counter & Add to Cart handler
      ProductDetailsAccordion.tsx # Nutrition table, RDA %, ingredients, allergens
      RecipeGuideSection.tsx # 3 authentic chef recipes per flavour
    /shop
      ShopCatalog.tsx        # Client filtering by category and price sorting
    /cart
      CartDrawer.tsx         # Slide-over shopping bag drawer
  /lib
    /woocommerce
      storeApi.ts            # Store API HTTP client, price formatting, enrichment
      types.ts               # TypeScript interfaces
    /wordpress
      client.ts              # Posts and pages REST API client
    /context
      CartContext.tsx        # Global React Context with session persistence
```

---

## 3. Data Ingestion & State Management

1. **WooCommerce Store API**:
   - Product catalog is fetched server-side via `/wp-json/wc/store/v1/products` with Incremental Static Regeneration (`revalidate: 60`).
   - Prices in minor units (subunits/paisa) are cleanly formatted via `formatStorePrice()`.
   - Out-of-stock items (`coco-world-makhana`) are displayed with disabled buttons and prominent "Sold Out" badges.
2. **Session-Based Cart**:
   - Cart operations occur directly against `/wp-json/wc/store/v1/cart/*`.
   - `Cart-Token` and `Nonce` headers are persisted in browser `localStorage` under `korigo_wc_cart_token`.
   - Cart drawer auto-opens on add and updates subtotal in real-time.
3. **WordPress CMS Content**:
   - Blogs and static pages pull rendered HTML from `/wp-json/wp/v2/posts` and `/wp-json/wp/v2/pages`.
   - Embedded featured media URLs map to authentic WordPress Media Library uploads.
