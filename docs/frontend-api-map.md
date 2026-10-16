# Korigo Snacks — Frontend API Ingestion Map

**Document Version:** 1.0  
**Target Backend:** `https://backend-korigo.sampledomain.online/`

---

## 1. WooCommerce Store API Endpoints (Public Commerce)

| Endpoint | Method | Client Utility | Purpose & Payload |
| :--- | :--- | :--- | :--- |
| `/wp-json/wc/store/v1/products` | `GET` | `getStoreProducts(cat?)` | Returns 12 active products with minor-unit pricing (`9900` = ₹99, `15900` = ₹159) and images. |
| `/wp-json/wc/store/v1/products?slug={slug}` | `GET` | `getStoreProductBySlug(slug)` | Fetches single product details for PDP. |
| `/wp-json/wc/store/v1/cart` | `GET` | `fetchStoreCart(token)` | Retrieves session cart, items array, totals, and currency symbol. |
| `/wp-json/wc/store/v1/cart/add-item` | `POST` | `addStoreCartItem(id, qty)` | Adds product to cart; returns updated `Cart-Token` and `Nonce`. |
| `/wp-json/wc/store/v1/cart/update-item` | `POST` | `updateStoreCartQuantity(key, qty)` | Updates line item quantity. |
| `/wp-json/wc/store/v1/cart/remove-item` | `POST` | `removeStoreCartItem(key)` | Removes line item from session. |

---

## 2. WordPress REST API Endpoints (CMS & Content)

| Endpoint | Method | Client Utility | Purpose & Payload |
| :--- | :--- | :--- | :--- |
| `/wp-json/wp/v2/posts?_embed=true` | `GET` | `getPosts()` | Returns 7 blog articles by Sohini Kar with embedded featured media. |
| `/wp-json/wp/v2/posts?slug={slug}&_embed=true` | `GET` | `getPostBySlug(slug)` | Fetches full article content and publish timestamp. |
| `/wp-json/wp/v2/pages?slug={slug}` | `GET` | `getPageBySlug(slug)` | Fetches static HTML for legal policies and company pages. |

---

## 3. Caching & Cache-Busting Strategy

1. **Hostinger LiteSpeed Caching**:
   - The WordPress host aggressively caches public `GET` requests.
   - All server-side data fetching functions (`getStoreProducts`, `getPosts`, etc.) pass `next: { revalidate: 60 }` with `Accept: application/json` headers.
   - Client-side cart mutations append a cache-busting timestamp `_nocache={timestamp}` to guarantee real-time cart accuracy.
2. **Session Persistence**:
   - Browser stores `korigo_wc_cart_token` and `korigo_wc_cart_nonce` in `localStorage`.
   - On page refresh, the cart session is seamlessly restored via the `Cart-Token` HTTP header.
