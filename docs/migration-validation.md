# Korigo Snacks — Live Backend Migration & Validation Report

**Audit Execution Timestamp:** 2026-09-29T00:08:00+05:30  
**Target WordPress Backend:** `https://backend-korigo.sampledomain.online`  
**WooCommerce REST API Target:** `https://backend-korigo.sampledomain.online/wp-json/wc/v3`  
**WooCommerce Store API Target:** `https://backend-korigo.sampledomain.online/wp-json/wc/store/v1`  

## 1. Executive Summary & Verification Matrix

| Subsystem / Entity | Source Target | Migrated Count | Validation Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **WooCommerce Settings** | INR / West Bengal / Tax Inc | Configured | **PASS** | Currency ₹, GST inclusive, Stock enabled |
| **Media Library Assets** | 108 authentic assets | 109 items | **PASS** | 100% migrated to WP uploads, 0 Shopify CDN links |
| **Product Categories** | 2 categories | 2 categories | **PASS** | Individual Flavours (ID 16), Value Combos (ID 17) |
| **WooCommerce Products** | 12 products | 12/12 passed | **PASS** | 6 singles + 6 combos, stock & pricing authentic |
| **WordPress Blog Posts** | 7 articles | 7/7 passed | **PASS** | Default post deleted, featured images attached |
| **WordPress Static Pages** | 7 core pages & policies | 7/7 passed | **PASS** | HTML content migrated, slugs aligned |
| **Headless Store API** | Products & Cart endpoints | 12 products | **PASS** | Public headless endpoints active & tested |

---

## 2. WooCommerce Products Audit (12 of 12)

| ID | SKU | Product Name | Slug | Price | Sale | Stock Status | Gallery Images | Recipes Meta |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 122 | `KRG-SASSY_SRIRACHA_SOU` | Sour Crème d' Onion + Sassy Sriracha Combo | `sassy-sriracha-sour-cream-onion-combo` | ₹199.00 | ₹159.00 | `instock` | 7 imgs (Local WP) | Yes (3 recipes) |
| 123 | `KRG-CINNAMON_DRIP_SOUR` | Cinnamon Drip + Sour Crème d' Onion Combo | `cinnamon-drip-sour-cream-onion-combo` | ₹199.00 | ₹159.00 | `instock` | 7 imgs (Local WP) | Yes (3 recipes) |
| 124 | `KRG-GARLICKED_CHEESE_C` | Garlicked Cheese + Cinnamon Drip Combo | `garlicked-cheese-cinnamon-drip-combo` | ₹199.00 | ₹159.00 | `instock` | 7 imgs (Local WP) | Yes (3 recipes) |
| 125 | `KRG-CITRUS_CARTEL_GARL` | Citrus Cartel + Garlicked Cheese Combo | `citrus-cartel-garlicked-cheese-combo` | ₹199.00 | ₹159.00 | `instock` | 7 imgs (Local WP) | Yes (3 recipes) |
| 126 | `KRG-CITRUS_CARTEL_SASS` | Citrus Cartel + Sassy Sriracha Combo | `citrus-cartel-sassy-sriracha-combo` | ₹199.00 | ₹159.00 | `instock` | 7 imgs (Local WP) | Yes (3 recipes) |
| 127 | `KRG-GARLIC_CHEESE_SASS` | Garlic Cheese + Sassy Sriracha Combo | `garlic-cheese-sassy-sriracha-combo` | ₹199.00 | ₹159.00 | `instock` | 7 imgs (Local WP) | Yes (3 recipes) |
| 128 | `KRG-CITRUS_CARTEL_MAKH` | Korigo Pops Citrus Cartel Tangy Makhana Foxnuts | Spicy Citrus | 35g | `citrus-cartel-makhana` | ₹99.00 | — | `instock` | 8 imgs (Local WP) | Yes (3 recipes) |
| 129 | `KRG-COCO_WORLD_MAKHANA` | Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g | `coco-world-makhana` | ₹99.00 | — | `outofstock` | 8 imgs (Local WP) | Yes (3 recipes) |
| 130 | `KRG-CREME_D_ONION_MAKH` | Korigo Pops Sour Crème d' Onion Makhana Foxnuts | Creamy Snack | 35g | `creme-d-onion-makhana` | ₹99.00 | — | `instock` | 8 imgs (Local WP) | Yes (3 recipes) |
| 131 | `KRG-GARLICKED_CHEESE_M` | Korigo Pops Garlicked Cheese Makhana Foxnuts | Savoury Snack | 35g | `garlicked-cheese-makhana` | ₹99.00 | — | `instock` | 9 imgs (Local WP) | Yes (3 recipes) |
| 132 | `KRG-CINNAMON_DRIP` | Korigo Pops Cinnamon Drip Makhana Foxnuts | Roasted | 35g | `cinnamon-drip` | ₹99.00 | — | `instock` | 9 imgs (Local WP) | Yes (3 recipes) |
| 133 | `KRG-SASSY_SRIRACHA` | Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts | Spicy |35g | `sassy-sriracha` | ₹99.00 | — | `instock` | 8 imgs (Local WP) | Yes (3 recipes) |

---

## 3. Blog Articles Audit (7 of 7)

| ID | Article Title | Slug | Featured Media ID | Content Length | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 134 | Late Night Healthy Snacks That Won’t Make You Feel Guilty | `late-night-healthy-snacks-that-won-t-make-you-feel-guilty` | ID 20 | 11583 chars | **PASS** |
| 135 | Top 4 Healthy Snacks for Desk Jobs | `top-5-healthy-snacks-for-desk-jobs` | ID 14 | 10746 chars | **PASS** |
| 136 | Healthy Makhana Recipes You Can Make at Home | `healthy-makhana-recipes-you-can-make-at-home` | ID 15 | 12030 chars | **PASS** |
| 137 | Why Cheese Makhana Is Becoming India’s Favorite Healthy Snack | `why-cheese-makhana-is-becoming-india-s-favorite-healthy-snack` | ID 16 | 11069 chars | **PASS** |
| 138 | Makhana vs Other Snacks: Why It&#8217;s the Healthiest? | `makhana-vs-other-snacks-why-its-the-healthiest` | ID 18 | 11721 chars | **PASS** |
| 139 | Makhana for Weight Loss: How to Eat? | `makhana-for-weight-loss-how-to-eat` | ID 17 | 10502 chars | **PASS** |
| 140 | Top Health Benefits of Makhana (Fox Nuts / Lotus Seeds) | `top-health-benefits-of-makhana-fox-nuts-lotus-seeds` | ID 19 | 14090 chars | **PASS** |

---

## 4. Pages & Legal Policies Audit (7 of 7)

| ID | Page Title | Slug | Target Route | Content Length | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 141 | About Us | `about-us` | `/about-us` | 21931 chars | **PASS** |
| 142 | Contact Us | `contact` | `/contact` | 41056 chars | **PASS** |
| 143 | Reviews Form | `reviews-form` | `/reviews-form` | 41060 chars | **PASS** |
| 144 | Refund Policy | `refund-policy` | `/refund-policy` | 1570 chars | **PASS** |
| 145 | Privacy Policy | `privacy-policy` | `/privacy-policy` | 15868 chars | **PASS** |
| 146 | Shipping Policy | `shipping-policy` | `/shipping-policy` | 2568 chars | **PASS** |
| 147 | Terms of Service | `terms-of-service` | `/terms-of-service` | 3329 chars | **PASS** |

---

## 5. Store API & Decoupled Frontend Readiness

- **`/wp-json/wc/store/v1/products`**: Active and verified returning all 12 products with minor-unit pricing (`9900` = ₹99, `15900` = ₹159).
- **`/wp-json/wc/store/v1/cart`**: Active and verified initializing cart session in INR currency (`₹`).
- **`/wp-json/wp/v2/posts`**: Active and verified returning published articles with featured image URLs.
- **`/wp-json/wp/v2/pages`**: Active and verified delivering sanitized HTML bodies for static pages and policies.
- **LiteSpeed Cache Note**: Next.js data fetching should include `revalidate: 60` or cache-busting headers (`Cache-Control: no-cache`) when mutating cart or stock.

**Migration Phase C Status:** COMPLETE and FULLY AUDITED.