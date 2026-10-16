# Korigo Snacks — Live WordPress & WooCommerce Backend Audit Report

**Audit Date**: September 28, 2026  
**Target Backend URL**: [https://backend-korigo.sampledomain.online/](https://backend-korigo.sampledomain.online/)  
**WordPress Admin URL**: [https://backend-korigo.sampledomain.online/wp-admin/](https://backend-korigo.sampledomain.online/wp-admin/)  
**Infrastructure**: Hostinger Cloud Platform (LiteSpeed Web Server + Cloud CDN / hcdn)  
**Security Notice**: Credentials remain strictly isolated and are never written to this repository.

---

## 1. Executive Summary

A comprehensive post-installation verification of the live WordPress backend at `https://backend-korigo.sampledomain.online/` was performed via direct HTTP response analysis and WooCommerce REST & Store API querying.

**Key Finding**: **WooCommerce 11.1.2 is INSTALLED AND ACTIVATED**.  
The headless **WooCommerce Store API (`/wp-json/wc/store/v1/`) is 100% operational**. The 4 essential WooCommerce core pages (`Shop`, `Cart`, `Checkout`, `My account`) have been automatically provisioned.

---

## 2. Environment & System Specifications

| Parameter | Current Live State | Verification Source |
| :--- | :--- | :--- |
| **WordPress Core Version** | **7.1.2** | Verified via `<meta name="generator">` and `/feed/` generator metadata |
| **WooCommerce Version** | **11.1.2** (Latest) | Verified via HTML generator tag and plugin headers |
| **PHP Version** | **8.3.33** | Verified via HTTP response header `x-powered-by: PHP/8.3.33` |
| **Web Server** | **LiteSpeed / OpenLiteSpeed** | Response headers `x-litespeed-cache: hit`, `server: hcdn` |
| **Hosting Platform** | **Hostinger** (`platform: hostinger`, `panel: hpanel`) | Hostinger platform headers |
| **SSL / HTTPS** | **Active & Enforced** (TLS 1.3 / HTTP/3 available) | `alt-svc: h3=":443"` |
| **Active Theme** | **Twenty Twenty-Five** (`twentytwentyfive`) | Style/theme directory references |
| **Permalink Structure** | **`/%postname%/` (Post Name)** | Verified from `/shop/`, `/cart/`, and `/hello-world/` URLs |

---

## 3. WordPress & WooCommerce REST API Health Check

| API Endpoint / Namespace | HTTP Status | Response Details | Operational Health |
| :--- | :--- | :--- | :--- |
| `GET /wp-json/` | **200 OK** | 12 WooCommerce namespaces present (`wc/v3`, `wc/store/v1`, `wc-admin`, etc.) | **Fully Operational** |
| `GET /wp-json/wc/store/v1/products` | **200 OK** | Empty catalog (`0` products ready for import) | **Fully Operational** |
| `GET /wp-json/wc/store/v1/cart` | **200 OK** | Session-ready cart object (totals, items, coupons, shipping, billing) | **Fully Operational** |
| `GET /wp-json/wc/v3` | **200 OK** | Full WooCommerce REST API v3 schema routes (254 KB) | **Fully Operational** |
| `GET /wp-json/wp/v2/pages` | **200 OK** | 4 WooCommerce core pages provisioned | **Fully Operational** |
| `GET /wp-json/wp/v2/posts` | **200 OK** | 1 default post ("Hello world!") | **Operational** |
| `GET /wp-json/wp/v2/media` | **200 OK** | Empty media library (`0` items) | **Ready for Asset Upload** |

---

## 4. Default Core Pages Created by WooCommerce

| Page ID | Title | Slug | Live URL | Function in Headless Architecture |
| :--- | :--- | :--- | :--- | :--- |
| **7** | **Shop** | `shop` | `https://backend-korigo.sampledomain.online/shop/` | Backend catalog archive anchor |
| **8** | **Cart** | `cart` | `https://backend-korigo.sampledomain.online/cart/` | Headless Store API cart anchor |
| **9** | **Checkout** | `checkout` | `https://backend-korigo.sampledomain.online/checkout/` | Headless Store API checkout anchor |
| **10** | **My account**| `my-account` | `https://backend-korigo.sampledomain.online/my-account/` | Backend customer account portal |

---

## 5. Current Commerce Configuration vs Target Store Configuration

| Commerce Setting | Current Backend State | Required Target State (From Shopify Source) | Action Required |
| :--- | :--- | :--- | :--- |
| **Currency** | `USD` (`$`) | **Indian Rupee (INR — ₹)** | Update to INR in WooCommerce Settings |
| **Currency Position** | Left (`$0.00`) | **Left (`₹99.00`)** | Update to `₹` prefix |
| **Base Country / State**| Default / Unset | **India — West Bengal (`IN:WB`), PIN 700107** | Set Anandapur, Kolkata base location |
| **Selling Locations** | All countries | **Sell to India (Pan-India delivery)** | Restrict to India |
| **Shipping Locations** | All countries | **Ship to India** | Restrict shipping to India |
| **Tax Inclusivity** | Default exclusive | **Prices entered with tax (GST included)** | Enable inclusive tax display |
| **Inventory Management**| Default enabled | **Track inventory, mark Coco Island as Out of Stock** | Ingest stock states from `/docs/product-migration-map.md` |
| **Store API Headless** | **Active & Ready** | **Connected to Next.js Cart & Checkout components** | Confirmed ready |

---

## 6. Migration Readiness Checklist

- [x] WordPress Core 7.1.2 operational.
- [x] WooCommerce 11.1.2 installed & activated.
- [x] WooCommerce Store API (`/wp-json/wc/store/v1/`) active and returning 200 OK.
- [x] WooCommerce REST API v3 schema active.
- [x] Core pages (Shop, Cart, Checkout, My account) registered with clean permalinks.
- [x] 171 authentic Korigo assets ready in `/public/assets/korigo/` for media ingestion.
- [x] 12 products (6 singles + 6 combos) fully mapped in `/docs/product-migration-map.md`.
- [x] 7 blog articles fully audited in `/docs/content-migration.md`.
- [ ] Configure Store Currency to INR (₹) and Country to India (West Bengal).
- [ ] Ingest products and media into WooCommerce.
