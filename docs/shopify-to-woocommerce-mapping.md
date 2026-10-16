# Shopify → WordPress + WooCommerce Data Mapping Architecture

This specification outlines the data transformation model from Shopify to WordPress + WooCommerce, and its delivery to the headless Next.js frontend storefront.

```
┌─────────────────────────────────┐
│     SHOPIFY SOURCE OBJECTS      │
│ Products, Collections, Blogs,   │
│ Pages, Customers, Orders        │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│    MIGRATION & TRANSFORMATION   │
│ Normalization, Media Ingestion, │
│ Schema Mapping, Metafields      │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   WORDPRESS + WOOCOMMERCE DB    │
│ Products, Categories, Attributes│
│ Posts, Pages, CPTs, Orders      │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   NEXT.JS HEADLESS STOREFRONT   │
│ Server Components, Store API,   │
│ Client State, Auth Endpoints    │
└─────────────────────────────────┘
```

---

## 1. Product Entity Mapping

| Shopify Field | Transformation / Logic | WooCommerce Field | Next.js API / Storefront Property |
| :--- | :--- | :--- | :--- |
| `id` (e.g. `10019186868514`) | Stored as legacy meta `_shopify_product_id` | Post Meta `_shopify_product_id` | `product.id` (WooCommerce ID) |
| `title` | Preserved verbatim (e.g. *Korigo Pops Citrus Cartel...*) | `post_title` / Product Name | `product.name` |
| `handle` | Lowercase sanitized slug (`citrus-cartel-makhana`) | `post_name` / Product Slug | `product.slug` (Route param) |
| `body_html` / Theme Description | Complete HTML product narrative & highlights | `post_content` (Full Description) | `product.description` |
| Theme Excerpt | Clean text summary for cards & meta description | `post_excerpt` (Short Description) | `product.shortDescription` |
| `variants[0].price` | If `compare_at_price > price`, set as `sale_price` | `_sale_price` or `_regular_price` | `product.prices.price` |
| `variants[0].compare_at_price` | If present and > price, set as `regular_price` | `_regular_price` | `product.prices.regular_price` |
| `variants[0].available` | Boolean mapped to stock status | `_stock_status` (`instock` or `outofstock`) | `product.is_in_stock` |
| `variants[0].sku` | Default generated: `KRG-[SLUG-UPPER]` if empty | `_sku` | `product.sku` |
| `variants[0].grams` | Converted to kg or preserved as grams | `_weight` (`0.035` kg) | `product.weight` |
| `product_type` | `single` vs `combo` | Taxonomy: `product_cat` | `product.categories` |
| `tags` | Array of strings | Taxonomy: `product_tag` | `product.tags` |
| `images` | Downloaded to `/wp-content/uploads/` & media library | Featured Image (`_thumbnail_id`) + Gallery (`_product_image_gallery`) | `product.images` (Array of URLs, width, height, alt) |

---

## 2. Product Structured Content Metafields

Shopify stored deep product narrative, nutrition, ingredients, and recipes inside theme-level custom liquids and template blocks. In WooCommerce, these are mapped to structured WordPress Post Meta:

| Domain | WordPress Meta Key | Data Type | Sample Value / Description |
| :--- | :--- | :--- | :--- |
| **Nutritional Table** | `_korigo_nutrition_table` | JSON Object | Key-value pairs: Energy (441.2 kcal), Protein (7.9g), Total Fat (12.2g), etc. |
| **RDA Contributions** | `_korigo_rda_contributions`| JSON Object | Energy: 7.7%, Total Fat: 6.4%, Sodium: 15.9% |
| **Ingredients** | `_korigo_ingredients` | Long Text | Foxnut / Makhana (65%), Cold Pressed Sunflower Oil, Seasonings... |
| **Allergens** | `_korigo_allergens` | Text | Contains milk & soy. And may contain wheat & nuts. |
| **Favorite Recipes** | `_korigo_recipes` | JSON Array | Array of `{ name, image_url, ingredients, instructions }` |
| **Flavour Profile** | `_korigo_flavour_notes` | Text | Tangy & Spicy, Hot & Spicy, Cheesy Favourite, etc. |
| **Net Weight** | `_korigo_pack_size` | String | `35g` (Single) or `2 x 35g (70g)` (Combo) |
| **Constituents** (Combos)| `_korigo_bundle_items` | JSON Array of Product IDs | `[101, 102]` representing constituent single flavours |

---

## 3. Collections → WooCommerce Categories Mapping

| Shopify Collection | Shopify Handle | WooCommerce Category Name | WooCommerce Slug | Products Included |
| :--- | :--- | :--- | :--- | :--- |
| **All Products** | `all` | All Products (Virtual / All) | `all` | 12 Products |
| **Shop (Frontpage)** | `frontpage` | Featured Snacks | `featured` | 6 Individual Flavours |
| **Flavoured Makhana** | `product` | Individual Flavours | `flavours` | 6 Individual Flavours (35g) |
| **Combos** | `combo` | Value Combos | `combos` | 6 Dual-Pack Combos (70g) |

---

## 4. Blog Articles → WordPress Posts Mapping

| Shopify Field | WordPress Target Field | Notes |
| :--- | :--- | :--- |
| `entry.title` | `post_title` | Exact headline preserved verbatim |
| `entry.published` | `post_date` & `post_date_gmt` | Preserves historical publication timeline |
| `entry.author.name` | `post_author` | Sohini Kar (`user_id` in WordPress) |
| `entry.content` | `post_content` | Clean HTML semantic markup with responsive image tags |
| `entry.summary` | `post_excerpt` | Editorial preview text |
| `sitemap image:loc` | `_thumbnail_id` | Downloaded to Media Library as Featured Post Thumbnail |
| Article Handle | `post_name` | Slug maintained for 301 redirect parity |
| Blog Category | `category` | "News" / "Snacking Guides" / "Health & Wellness" |

---

## 5. Institutional & Static Pages → WordPress Pages Mapping

| Shopify Page Handle | WordPress Page Title | WordPress Slug | Template / Model |
| :--- | :--- | :--- | :--- |
| `/pages/about-us` | About Us & Our Story | `about-us` | Custom Story Model (Mithila heritage, Roasting, Founders Sohini Kar & Piya Kar) |
| `/pages/contact` | Contact Us | `contact` | Contact Model (Customer Care, Wholesale Bulk Ordering, Review Submission) |
| `/pages/reviews-form` | Reviews Form | `reviews-form` | Customer Review Intake Form |
| `/policies/refund-policy`| Refund Policy | `refund-policy` | Legal Policy Template |
| `/policies/privacy-policy`| Privacy Policy | `privacy-policy`| Legal Policy Template |
| `/policies/shipping-policy`| Shipping Policy | `shipping-policy`| Legal Policy Template |
| `/policies/terms-of-service`| Terms of Service | `terms-of-service`| Legal Policy Template |

---

## 6. Commerce, Cart & Checkout Pipeline

### Headless Cart Operations (WooCommerce Store API)
- **Endpoint**: `/wp-json/wc/store/v1/cart`
- **Session Identification**: Store API `Cart-Token` or Nonce header passed between Next.js server actions and WooCommerce.
- **Cart Mutation Operations**:
  - `POST /wp-json/wc/store/v1/cart/add-item` -> Add product ID & quantity.
  - `POST /wp-json/wc/store/v1/cart/remove-item` -> Remove line item key.
  - `POST /wp-json/wc/store/v1/cart/update-item` -> Mutate line item quantity.
  - `POST /wp-json/wc/store/v1/cart/apply-coupon` -> Validate & apply promotional discount codes.

### Checkout Operations
- **Endpoint**: `/wp-json/wc/store/v1/checkout`
- **Security Invariant**: Client-side browser only interacts with Next.js API route `/api/checkout`. Next.js server handles validation, order injection, and payment gateway coordination. Privileged WooCommerce Consumer Secret (`ck_...`, `cs_...`) is **never** sent to the browser.
