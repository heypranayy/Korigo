# Korigo Snacks — Missing, Inaccessible, or External Dependencies Audit

This document records all assets, endpoints, or functionality that could not be retrieved from the live Shopify store ([https://korigosnacks.com/](https://korigosnacks.com/)), or that require explicit architectural replacement during migration to WordPress + WooCommerce + Next.js.

Per **Rule 10 (Absolute Image Rule)** and **Rule 41 (Asset-Only Policy)**:
> *"If the old website has an asset: USE THE OLD ASSET.*  
> *If the old website does not have an asset: DO NOT INVENT ONE.*  
> *If the old asset cannot be downloaded: DOCUMENT IT."*

---

## 1. Live Asset Availability Discrepancies

### Blog Featured Images on Shopify CDN
During the sitemap crawl of `https://korigosnacks.com/sitemap_blogs_1.xml`, 7 blog featured images were declared. Upon fetching directly from Shopify's CDN:
1. `ChatGPT_Image_Jun_29_2026_09_28_14_PM_66d2b53a-03d2-4720-9afd-8d0c03cb9694.png`
   - **Status**: Returned a 547-byte transparent fallback GIF from Shopify CDN.
   - **Impact**: The live blog article relies on the article body text and inline layout rather than a high-res hero thumbnail.
   - **Action**: Recorded as missing upstream. In Next.js blog template, fallback to branded product packaging or typographic card header. Do not generate AI replacement.
2. `ChatGPT_Image_Jul_4_2026_11_41_48_AM_7f20d58a-70d4-48ff-b8e1-65d4ddb80d65.png`
   - **Status**: Returned a 547-byte fallback GIF from Shopify CDN.
   - **Action**: Recorded as missing upstream.
3. `ChatGPT_Image_Aug_8_2026_06_57_20_PM.png`
   - **Status**: Returned a 547-byte fallback GIF from Shopify CDN.
   - **Action**: Recorded as missing upstream.

*Note: The remaining 4 blog post images (`7add9947-...png`, `ChatGPT_Image_Jul_27...png`, `ChatGPT_Image_Jul_4_11_46...png`, `ChatGPT_Image_Sep_16...png`) were successfully downloaded in high resolution (1.7 MB - 2.4 MB).*

---

## 2. Product Catalog Availability State

### Sold Out Product
- **Handle**: `coco-world-makhana`
- **Title**: *Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g*
- **Status on Live Site**: `available: false` (SOLD OUT).
- **Migration Policy**:
  - Migrated into WooCommerce with `stock_status: 'outofstock'` and `manage_stock: true`.
  - Next.js product page renders "Sold Out" badge and disables the Add to Cart / Buy Now buttons in strict accordance with live store state.

---

## 3. External Proprietary Shopify Services Requiring Architecture Replacement

### 1. Shopify Hosted New Customer Accounts
- **Old Behavior**: Links to `/account/login` perform an HTTP 302 redirect to Shopify's proprietary hosted auth portal (`https://shopify.com/98528952610/account?locale=en...`).
- **New Architecture**:
  - Native Headless WordPress/WooCommerce Authentication.
  - Server-side Next.js route handlers (`/api/auth/login`, `/api/auth/register`, `/api/auth/logout`) communicating with WooCommerce REST API / JWT Authentication.
  - Custom Next.js customer account pages (`/account`, `/account/orders`, `/account/addresses`).

### 2. Shopify Hosted Checkout
- **Old Behavior**: Shopify proprietary `/checkouts/*` checkout pipeline.
- **New Architecture**:
  - Headless WooCommerce Store API (`/wp-json/wc/store/v1/checkout`).
  - Next.js server actions handle order submission, address validation, tax, and shipping calculation without exposing WooCommerce credentials.

### 3. Third-Party Shopify Apps
- **Whatmore Live Video** (`https://apps.shopify.com/whatmore-live`):
  - Used for short-form video reels on Shopify.
  - In the headless WooCommerce architecture, video embeds can be managed via WordPress Custom Meta (`korigo_product_video_url`) or Next.js video components rather than proprietary Shopify app scripts.
- **Judge.me Product Reviews**:
  - The live store uses the Judge.me script widget.
  - In WordPress/WooCommerce, native WooCommerce product reviews and custom form submissions are used, decoupling the store from third-party monthly SaaS subscriptions while preserving review integrity.
