# Korigo Snacks — Migration Errors & Pending Dependencies Log

**Target Backend**: [https://backend-korigo.sampledomain.online/](https://backend-korigo.sampledomain.online/)  
**Last Updated**: September 29, 2026 (Phase C — Fully Completed)

---

## 1. Resolved Blockers

| Item | Resolution | Verified Status |
| :--- | :--- | :--- |
| **Backend REST Ingestion Auth** | Configured Application Password for `bot.admin` via secure `.env.local` basic auth wrapper. | **RESOLVED & VERIFIED** |
| **Media Library Ingestion** | Uploaded all 108 authentic assets to WordPress media library via `/wp-json/wp/v2/media`. | **RESOLVED & VERIFIED** |
| **Product Catalog Creation** | Created 12 products (IDs 122–133) and 2 categories (IDs 16, 17) via `/wp-json/wc/v3/products`. | **RESOLVED & VERIFIED** |
| **Blog Articles Creation** | Created 7 articles (IDs 134–140) and linked featured media via `/wp-json/wp/v2/posts`. | **RESOLVED & VERIFIED** |
| **Static Pages & Policies** | Created 7 pages (IDs 141–147) and cleaned default boilerplate via `/wp-json/wp/v2/pages`. | **RESOLVED & VERIFIED** |
| **Store Currency & Country** | Live settings configured to INR ₹, India / West Bengal, tax inclusive. | **RESOLVED & VERIFIED** |

---

## 2. Upstream Missing Source Assets (Audit Inherited)

| Asset ID / URL | Status | Details | Policy Enforcement |
| :--- | :--- | :--- | :--- |
| `ChatGPT_Image_Jun_29_2026_09_28_14_PM_66d2b53a...png` | **RECORDED MISSING UPSTREAM** | Returned 547-byte transparent GIF from Shopify CDN for blog draft. | Rule 10: Do NOT generate AI replacement. Clean typographic card layout used on frontend. |
| `ChatGPT_Image_Jul_4_2026_11_41_48_AM_7f20d58a...png` | **RECORDED MISSING UPSTREAM** | Returned 547-byte transparent GIF from Shopify CDN for blog draft. | Rule 10: Do NOT generate AI replacement. |
| `ChatGPT_Image_Aug_8_2026_06_57_20_PM.png` | **RECORDED MISSING UPSTREAM** | Returned 547-byte transparent GIF from Shopify CDN for blog draft. | Rule 10: Do NOT generate AI replacement. |

---

## 3. Pending Operational Configurations (Source Data Required)

| Setting / Area | Status | Reason | Next Action |
| :--- | :--- | :--- | :--- |
| **Payment Gateway Live Credentials** | **PENDING — SOURCE DATA REQUIRED** | Merchant API credentials (e.g., Razorpay, Cashfree, or PhonePe PG) are private keys not exposed in Shopify storefront crawl. | Admin to enter gateway keys in WP-Admin > WooCommerce > Payments prior to production orders. |
| **Shipping Courier API Integration** | **PENDING — SOURCE DATA REQUIRED** | Live courier API (e.g., Shiprocket, Delhivery, or Flat ₹50 / Free over ₹499) needs merchant policy confirmation. | Configure preferred shipping zones/rates in WP-Admin > WooCommerce > Shipping. |
| **Specific GST Slabs** | **PENDING — SOURCE DATA REQUIRED** | All product prices are entered as GST-inclusive (₹99.00 / ₹159.00). Specific split slabs (5% vs 12%) require CA confirmation. | Store already operates seamlessly with price inclusive of tax. |
