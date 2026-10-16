# Korigo Snacks — Headless API Verification Report

**Backend Target**: [https://backend-korigo.sampledomain.online/](https://backend-korigo.sampledomain.online/)  
**Verification Date**: September 29, 2026 (Phase C — Fully Verified Live)  
**Execution Script**: `scripts/migration/verify_apis.py`

---

## 1. Headless Endpoint Health Check Matrix

| API Endpoint | HTTP Method | Response Status | Live Payload / State | Operational Readiness |
| :--- | :--- | :--- | :--- | :--- |
| `/wp-json/wc/store/v1/products` | `GET` | **200 OK** | 12 active products (6 singles + 6 combos) | **PASS — Verified** |
| `/wp-json/wc/store/v1/cart` | `GET` | **200 OK** | Cart session in INR (`totals.currency_code = "INR"`, `currency_symbol = "₹"`) | **PASS — Verified** |
| `/wp-json/wc/store/v1/products/categories` | `GET` | **200 OK** | 2 categories (`Individual Flavours`, `Value Combos`) | **PASS — Verified** |
| `/wp-json/wc/v3/products` | `GET` | **200 OK** | Authenticated admin product catalog endpoint | **PASS — Verified** |
| `/wp-json/wp/v2/posts` | `GET` | **200 OK** | 7 authentic blog posts by Sohini Kar (default removed) | **PASS — Verified** |
| `/wp-json/wp/v2/pages` | `GET` | **200 OK** | 11 pages (4 WC core + 7 migrated Korigo pages & policies) | **PASS — Verified** |
| `/wp-json/wp/v2/media` | `GET` | **200 OK** | 108 authentic assets uploaded and active | **PASS — Verified** |

---

## 2. Store API Cart Session Structure

Direct verification query to `/wp-json/wc/store/v1/cart`:

```json
{
  "coupons": [],
  "items": [],
  "fees": [],
  "totals": {
    "total_items": "0",
    "total_items_tax": "0",
    "total_fees": "0",
    "total_fees_tax": "0",
    "total_discount": "0",
    "total_discount_tax": "0",
    "total_shipping": null,
    "total_shipping_tax": null,
    "total_price": "0",
    "total_tax": "0",
    "tax_lines": [],
    "currency_code": "INR",
    "currency_symbol": "₹",
    "currency_minor_unit": 2,
    "currency_decimal_separator": ".",
    "currency_thousand_separator": ",",
    "currency_prefix": "₹",
    "currency_suffix": ""
  },
  "shipping_address": {
    "first_name": "",
    "last_name": "",
    "company": "",
    "address_1": "",
    "address_2": "",
    "city": "",
    "state": "",
    "postcode": "",
    "country": "IN",
    "phone": ""
  },
  "billing_address": {
    "first_name": "",
    "last_name": "",
    "company": "",
    "address_1": "",
    "address_2": "",
    "city": "",
    "state": "",
    "postcode": "",
    "country": "IN",
    "email": "",
    "phone": ""
  },
  "needs_shipping": false,
  "has_calculated_shipping": false
}
```

---

## 3. Store API Products Structure

Direct verification query to `/wp-json/wc/store/v1/products`:
- Returns all 12 products.
- Prices returned in minor units (`9900` for ₹99.00, `15900` for ₹159.00).
- Product images link directly to `https://backend-korigo.sampledomain.online/wp-content/uploads/2026/09/...`.
- `is_in_stock` evaluates to `false` exclusively for `coco-world-makhana` (preserving live Shopify out-of-stock state).
- Categories returned: `Individual Flavours` (ID 16), `Value Combos` (ID 17).

---

## 4. Frontend Integration Notes

1. **Hostinger LiteSpeed Caching**:
   - The LiteSpeed web server caches `GET` responses aggressively. For client-side mutations (cart updates, inventory checks), the Next.js API client must pass a cache-busting timestamp or `Cache-Control: no-cache` header.
2. **Cart Token Management**:
   - Store API persists carts via the `Cart-Token` and `Nonce` HTTP headers returned on initial cart retrieval or item addition.
3. **Decoupled Architecture Ready**:
   - Ready for Phase H (Next.js storefront implementation).
