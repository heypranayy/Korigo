# Korigo Snacks — Complete Product Migration Map

This document establishes the authoritative migration schema and field mapping for all 12 Korigo Snacks products (6 individual flavours and 6 value combos) from Shopify to WordPress WooCommerce and Next.js.

## Migration Hierarchy
```
SHOPIFY PRODUCT (Catalog & Metafields)
       ↓
WOOCOMMERCE PRODUCT (Post, Taxonomy & Custom Meta)
       ↓
WOOCOMMERCE REST / STORE API (Product ID & Session Token)
       ↓
NEXT.JS DYNAMIC STOREFRONT ROUTE (/products/[slug])
```

---

## Sour Crème d' Onion + Sassy Sriracha Combo

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/sassy-sriracha-sour-cream-onion-combo`
- **WooCommerce Target Product**: `Sour Crème d' Onion + Sassy Sriracha Combo` (Slug: `sassy-sriracha-sour-cream-onion-combo`)
- **Assigned WooCommerce ID**: `101`
- **Next.js Dynamic Route**: `/products/sassy-sriracha-sour-cream-onion-combo`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `sassy-sriracha-sour-cream-onion-combo` |
| **Product Type** | `Combo Bundle (2-Pack)` |
| **Pack Size / Weight** | `2 x 35g (70g)` |
| **Regular Price** | ₹199.00 |
| **Sale Price** | ₹159.00 |
| **SKU** | `KRG-SASSY_SRIRACHA_SOUR_CREAM_ONION_COMBO` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Combos, Snacks` |
| **Tags** | `combo, bundle, value-pack` |
| **Gallery Image Count** | 7 images |
| **SEO Title** | `Sour Crème d' Onion + Sassy Sriracha Combo – Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/sassy-sriracha-sour-cream-onion-combo` |

### Product Gallery & Image Ordering
1. `combos/creamonion_sassy.png` (Shopify Source: [creamonion_sassy.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/creamonion_sassy.png?v=1782536295))
2. `combos/whitefrontssasysiracha.png` (Shopify Source: [whitefrontssasysiracha.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontssasysiracha.png?v=1782479975))
3. `combos/white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png` (Shopify Source: [white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png?v=1782479379))
4. `combos/sassy_sirsa.png` (Shopify Source: [sassy_sirsa.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/sassy_sirsa.png?v=1782479079))
5. `combos/creme.png` (Shopify Source: [creme.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/creme.png?v=1782479079))
6. `combos/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png` (Shopify Source: [Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png?v=1782479964))
7. `combos/Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png` (Shopify Source: [Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png?v=1782479385))

### Constituent Products & Bundle Behavior
In WooCommerce, this combo product is linked to two simple products with a bundled price of ₹159 (regular ₹199).

---

## Cinnamon Drip + Sour Crème d' Onion Combo

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/cinnamon-drip-sour-cream-onion-combo`
- **WooCommerce Target Product**: `Cinnamon Drip + Sour Crème d' Onion Combo` (Slug: `cinnamon-drip-sour-cream-onion-combo`)
- **Assigned WooCommerce ID**: `102`
- **Next.js Dynamic Route**: `/products/cinnamon-drip-sour-cream-onion-combo`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `cinnamon-drip-sour-cream-onion-combo` |
| **Product Type** | `Combo Bundle (2-Pack)` |
| **Pack Size / Weight** | `2 x 35g (70g)` |
| **Regular Price** | ₹199.00 |
| **Sale Price** | ₹159.00 |
| **SKU** | `KRG-CINNAMON_DRIP_SOUR_CREAM_ONION_COMBO` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Combos, Snacks` |
| **Tags** | `combo, bundle, value-pack` |
| **Gallery Image Count** | 7 images |
| **SEO Title** | `Cinnamon Drip + Sour Crème d' Onion Combo – Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/cinnamon-drip-sour-cream-onion-combo` |

### Product Gallery & Image Ordering
1. `combos/creme_cinemo.png` (Shopify Source: [creme_cinemo.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/creme_cinemo.png?v=1782536274))
2. `combos/white_front_cinemon_drip.png` (Shopify Source: [white_front_cinemon_drip.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/white_front_cinemon_drip.png?v=1782479928))
3. `combos/white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png` (Shopify Source: [white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png?v=1782479379))
4. `combos/cinemon_drip.png` (Shopify Source: [cinemon_drip.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/cinemon_drip.png?v=1782479086))
5. `combos/creme.png` (Shopify Source: [creme.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/creme.png?v=1782479079))
6. `combos/Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png` (Shopify Source: [Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png?v=1782479385))
7. `combos/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png` (Shopify Source: [Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png?v=1782479464))

### Constituent Products & Bundle Behavior
In WooCommerce, this combo product is linked to two simple products with a bundled price of ₹159 (regular ₹199).

---

## Garlicked Cheese + Cinnamon Drip Combo

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/garlicked-cheese-cinnamon-drip-combo`
- **WooCommerce Target Product**: `Garlicked Cheese + Cinnamon Drip Combo` (Slug: `garlicked-cheese-cinnamon-drip-combo`)
- **Assigned WooCommerce ID**: `103`
- **Next.js Dynamic Route**: `/products/garlicked-cheese-cinnamon-drip-combo`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `garlicked-cheese-cinnamon-drip-combo` |
| **Product Type** | `Combo Bundle (2-Pack)` |
| **Pack Size / Weight** | `2 x 35g (70g)` |
| **Regular Price** | ₹199.00 |
| **Sale Price** | ₹159.00 |
| **SKU** | `KRG-GARLICKED_CHEESE_CINNAMON_DRIP_COMBO` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Combos, Snacks` |
| **Tags** | `combo, bundle, value-pack` |
| **Gallery Image Count** | 7 images |
| **SEO Title** | `Garlicked Cheese + Cinnamon Drip Combo – Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/garlicked-cheese-cinnamon-drip-combo` |

### Product Gallery & Image Ordering
1. `combos/garlic_cinemon.png` (Shopify Source: [garlic_cinemon.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/garlic_cinemon.png?v=1782536265))
2. `combos/white_front_cinemon_drip.png` (Shopify Source: [white_front_cinemon_drip.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/white_front_cinemon_drip.png?v=1782479928))
3. `combos/whitefrontgarlickedcheese_1.png` (Shopify Source: [whitefrontgarlickedcheese_1.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontgarlickedcheese_1.png?v=1782479473))
4. `combos/cinemon_drip.png` (Shopify Source: [cinemon_drip.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/cinemon_drip.png?v=1782479086))
5. `combos/garliced_cheese.png` (Shopify Source: [garliced_cheese.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/garliced_cheese.png?v=1782479086))
6. `combos/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png` (Shopify Source: [Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png?v=1782479464))
7. `combos/Ingredients_5639beb5-012e-406a-8701-8f34177f4bee.png` (Shopify Source: [Ingredients_5639beb5-012e-406a-8701-8f34177f4bee.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_5639beb5-012e-406a-8701-8f34177f4bee.png?v=1782479928))

### Constituent Products & Bundle Behavior
In WooCommerce, this combo product is linked to two simple products with a bundled price of ₹159 (regular ₹199).

---

## Citrus Cartel + Garlicked Cheese Combo

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/citrus-cartel-garlicked-cheese-combo`
- **WooCommerce Target Product**: `Citrus Cartel + Garlicked Cheese Combo` (Slug: `citrus-cartel-garlicked-cheese-combo`)
- **Assigned WooCommerce ID**: `104`
- **Next.js Dynamic Route**: `/products/citrus-cartel-garlicked-cheese-combo`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `citrus-cartel-garlicked-cheese-combo` |
| **Product Type** | `Combo Bundle (2-Pack)` |
| **Pack Size / Weight** | `2 x 35g (70g)` |
| **Regular Price** | ₹199.00 |
| **Sale Price** | ₹159.00 |
| **SKU** | `KRG-CITRUS_CARTEL_GARLICKED_CHEESE_COMBO` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Combos, Snacks` |
| **Tags** | `combo, bundle, value-pack` |
| **Gallery Image Count** | 7 images |
| **SEO Title** | `Citrus Cartel + Garlicked Cheese Combo – Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/citrus-cartel-garlicked-cheese-combo` |

### Product Gallery & Image Ordering
1. `combos/garlc_citrus.png` (Shopify Source: [garlc_citrus.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/garlc_citrus.png?v=1782536254))
2. `combos/whitefrontcitruscirtel.png` (Shopify Source: [whitefrontcitruscirtel.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontcitruscirtel.png?v=1782479032))
3. `combos/whitefrontgarlickedcheese_1.png` (Shopify Source: [whitefrontgarlickedcheese_1.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontgarlickedcheese_1.png?v=1782479473))
4. `combos/garliced_cheese.png` (Shopify Source: [garliced_cheese.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/garliced_cheese.png?v=1782479086))
5. `combos/citru.png` (Shopify Source: [citru.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/citru.png?v=1782479079))
6. `combos/Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png` (Shopify Source: [Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png?v=1782479032))
7. `combos/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png` (Shopify Source: [Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png?v=1782479464))

### Constituent Products & Bundle Behavior
In WooCommerce, this combo product is linked to two simple products with a bundled price of ₹159 (regular ₹199).

---

## Citrus Cartel + Sassy Sriracha Combo

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/citrus-cartel-sassy-sriracha-combo`
- **WooCommerce Target Product**: `Citrus Cartel + Sassy Sriracha Combo` (Slug: `citrus-cartel-sassy-sriracha-combo`)
- **Assigned WooCommerce ID**: `105`
- **Next.js Dynamic Route**: `/products/citrus-cartel-sassy-sriracha-combo`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `citrus-cartel-sassy-sriracha-combo` |
| **Product Type** | `Combo Bundle (2-Pack)` |
| **Pack Size / Weight** | `2 x 35g (70g)` |
| **Regular Price** | ₹199.00 |
| **Sale Price** | ₹159.00 |
| **SKU** | `KRG-CITRUS_CARTEL_SASSY_SRIRACHA_COMBO` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Combos, Snacks` |
| **Tags** | `combo, bundle, value-pack` |
| **Gallery Image Count** | 7 images |
| **SEO Title** | `Citrus Cartel + Sassy Sriracha Combo – Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/citrus-cartel-sassy-sriracha-combo` |

### Product Gallery & Image Ordering
1. `combos/citrus_sassy.png` (Shopify Source: [citrus_sassy.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/citrus_sassy.png?v=1782535631))
2. `combos/whitefrontcitruscirtel.png` (Shopify Source: [whitefrontcitruscirtel.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontcitruscirtel.png?v=1782479032))
3. `combos/whitefrontssasysiracha.png` (Shopify Source: [whitefrontssasysiracha.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontssasysiracha.png?v=1782479975))
4. `combos/sassy_sirsa.png` (Shopify Source: [sassy_sirsa.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/sassy_sirsa.png?v=1782479079))
5. `combos/citru.png` (Shopify Source: [citru.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/citru.png?v=1782479079))
6. `combos/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png` (Shopify Source: [Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png?v=1782479964))
7. `combos/Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png` (Shopify Source: [Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png?v=1782479032))

### Constituent Products & Bundle Behavior
In WooCommerce, this combo product is linked to two simple products with a bundled price of ₹159 (regular ₹199).

---

## Garlic Cheese + Sassy Sriracha Combo

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/garlic-cheese-sassy-sriracha-combo`
- **WooCommerce Target Product**: `Garlic Cheese + Sassy Sriracha Combo` (Slug: `garlic-cheese-sassy-sriracha-combo`)
- **Assigned WooCommerce ID**: `106`
- **Next.js Dynamic Route**: `/products/garlic-cheese-sassy-sriracha-combo`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `garlic-cheese-sassy-sriracha-combo` |
| **Product Type** | `Combo Bundle (2-Pack)` |
| **Pack Size / Weight** | `2 x 35g (70g)` |
| **Regular Price** | ₹199.00 |
| **Sale Price** | ₹159.00 |
| **SKU** | `KRG-GARLIC_CHEESE_SASSY_SRIRACHA_COMBO` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Combos, Snacks` |
| **Tags** | `combo, bundle, value-pack` |
| **Gallery Image Count** | 7 images |
| **SEO Title** | `Garlic Cheese + Sassy Sriracha Combo – Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/garlic-cheese-sassy-sriracha-combo` |

### Product Gallery & Image Ordering
1. `combos/garlic_sasy.png` (Shopify Source: [garlic_sasy.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/garlic_sasy.png?v=1782534948))
2. `combos/sassy_sirsa.png` (Shopify Source: [sassy_sirsa.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/sassy_sirsa.png?v=1782479079))
3. `combos/garliced_cheese.png` (Shopify Source: [garliced_cheese.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/garliced_cheese.png?v=1782479086))
4. `combos/whitefrontssasysiracha.png` (Shopify Source: [whitefrontssasysiracha.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontssasysiracha.png?v=1782479975))
5. `combos/whitefrontgarlickedcheese_1.png` (Shopify Source: [whitefrontgarlickedcheese_1.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontgarlickedcheese_1.png?v=1782479473))
6. `combos/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png` (Shopify Source: [Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png?v=1782479464))
7. `combos/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png` (Shopify Source: [Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png?v=1782479964))

### Constituent Products & Bundle Behavior
In WooCommerce, this combo product is linked to two simple products with a bundled price of ₹159 (regular ₹199).

---

## Korigo Pops Citrus Cartel Tangy Makhana Foxnuts | Spicy Citrus | 35g

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/citrus-cartel-makhana`
- **WooCommerce Target Product**: `Korigo Pops Citrus Cartel Tangy Makhana Foxnuts | Spicy Citrus | 35g` (Slug: `citrus-cartel-makhana`)
- **Assigned WooCommerce ID**: `107`
- **Next.js Dynamic Route**: `/products/citrus-cartel-makhana`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `citrus-cartel-makhana` |
| **Product Type** | `Simple Product (Individual Flavour)` |
| **Pack Size / Weight** | `Single (35g)` |
| **Regular Price** | ₹99.00 |
| **Sale Price** | N/A (Full Price) |
| **SKU** | `KRG-CITRUS_CARTEL_MAKHANA` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Flavoured Makhana, Snacks` |
| **Tags** | `roasted-makhana, healthy-snack, gluten-free, foxnuts` |
| **Gallery Image Count** | 8 images |
| **SEO Title** | `Buy Citrus Flavored Makhana Online | Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/citrus-cartel-makhana` |

### Product Gallery & Image Ordering
1. `products/5_dd1f10bc-c51c-4988-9411-2ee28ce00aa4.png` (Shopify Source: [5_dd1f10bc-c51c-4988-9411-2ee28ce00aa4.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/5_dd1f10bc-c51c-4988-9411-2ee28ce00aa4.png?v=1782500076))
2. `products/whitefrontcitruscirtel.png` (Shopify Source: [whitefrontcitruscirtel.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontcitruscirtel.png?v=1782479032))
3. `products/citru.png` (Shopify Source: [citru.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/citru.png?v=1782479079))
4. `products/info.png` (Shopify Source: [info.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/info.png?v=1782479039))
5. `products/Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png` (Shopify Source: [Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_f31bc9c8-9be9-40ab-a6b9-7aae1d0637da.png?v=1782479032))
6. `products/ChatGPT_Image_Jun_12_2026_01_40_08_AM.png` (Shopify Source: [ChatGPT_Image_Jun_12_2026_01_40_08_AM.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPT_Image_Jun_12_2026_01_40_08_AM.png?v=1782479119))
7. `products/Moodshot_2.png` (Shopify Source: [Moodshot_2.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot_2.png?v=1782479126))
8. `products/Moodshot_3.png` (Shopify Source: [Moodshot_3.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot_3.png?v=1782479127))

### Description (About the Product)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Citrus Cartel Tangy Makhana Foxnuts | Spicy Citrus | 35g
Click to enlarge
Korigo Pops Citrus Cartel Tangy Makhana Foxnuts | Spicy Citrus | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
Turn up the zing with Korigo Pops – Citrus Cartel! 🍊
Bursting with bold citrus flavor, Citrus Cartel is the perfect snack for anyone who loves a tangy twist. Made from crunchy makhana pops and coated with a refreshing citrus seasoning, every bite delivers a delicious balance of tangy, salty, and savory goodness.
Light, crunchy, and incredibly addictive, Korigo Pops are the perfect guilt-free snack for movie nights, work breaks, or anytime cravings.
Why you'll love it:
• Tangy citrus flavor with a bold punch
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect snack for anytime munching
Snack smarter. Snack tastier.
Join the Citrus Cartel with Korigo Pops!
```

### Ingredients List
> Foxnut / Makhana (65%), Cold Pressed Sunflower Oil, Seasoning (Salt, Red Chilli Powder, Sugar, Lemon, Dehydrated Vegetable Powder (Garlic, Onion), Citric Acid (INS330), Flavour Enhancer (INS631 & INS627), Sunflower Oil, Black Pepper, Ginger, Cumin Seeds, Turmeric, Nutmeg, Cloves, Anticaking Agent (INS551)).

### Allergen Declaration
**Warning**: Contains milk & soy. And may contains wheat & nuts.

### Nutritional Information (Approx. per 100g)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Citrus Cartel Tangy Makhana Foxnuts | Spicy Citrus | 35g
Click to enlarge
Korigo Pops Citrus Cartel Tangy Makhana Foxnuts | Spicy Citrus | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
About the Product
Ingredients List
Turn up the zing with Korigo Pops – Citrus Cartel! 🍊
Bursting with bold citrus flavor, Citrus Cartel is the perfect snack for anyone who loves a tangy twist. Made from crunchy makhana pops and coated with a refreshing citrus seasoning, every bite delivers a delicious balance of tangy, salty, and savory goodness.
Light, crunchy, and incredibly addictive, Korigo Pops are the perfect guilt-free snack for movie nights, work breaks, or anytime cravings.
Why you'll love it:
• Tangy citrus flavor with a bold punch
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect snack for anytime munching
Snack smarter. Snack tastier.
Join the Citrus Cartel with Korigo Pops!
Nutritional Information (Approx.)
Per 100 g
Energy (kcal): 441.2
Protein (g): 7.9
Total Carbohydrate (g): 75.00
Total Sugar (g): 3.7
Includes Added Sugar (g): 0.00
Dietary Fiber (g): 7.50
Total Fat (g): 12.20
Saturated Fat (g): 1.20
Trans Fat (g): 0
Cholesterol (mg): 0
Sodium (mg): 911.2
```

### % Contribution to RDA per serve (35g)
```
Energy: 7.7%
Total Fat: 6.4%
Saturated Fat: 1.9%
Trans Fat: 0.0%
Sodium: 15.9%
```

### Curated Recipes (3 recipes)
#### Recipe: Bhel
- **Image**: `c9f98e1f-a65b-411d-8aea-ba76f77c7452.jpg`
- **Ingredients**: 1 cup puffed rice, 1/2 onion chopped, 1 tomato chopped, coriander leaves, 1/4 cup Korigo Chilli Lime Makhana.
- **Instructions**: Combine puffed rice, onion and tomato in a bowl, mix well and top with Korigo Chilli Lime Makhana and coriander before serving

#### Recipe: Pani Puri Filling Bowl
- **Image**: `81639176-9ba7-44cd-a8b5-359378230827.jpg`
- **Ingredients**: 1 boiled potato chopped, 1/4 cup boiled chana, onion and coriander, 1/4 cup Korigo Chilli Lime Makhana.
- **Instructions**: Mix potato, chana, onion and coriander in a bowl and add Korigo Chilli Lime Makhana for crunch before serving.

#### Recipe: Citrus Salad
- **Image**: `b47ebe72-b4fe-4737-a98c-4a678c6190db.jpg`
- **Ingredients**: 1 cucumber chopped, 1 avocado sliced, lime juice, onion slices, 1/4 cup Korigo Chilli Lime Makhana.
- **Instructions**: Combine cucumber, avocado and onion in a bowl, drizzle lime juice and gently mix. Top with Korigo Chilli Lime Makhana.

---

## Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/coco-world-makhana`
- **WooCommerce Target Product**: `Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g` (Slug: `coco-world-makhana`)
- **Assigned WooCommerce ID**: `108`
- **Next.js Dynamic Route**: `/products/coco-world-makhana`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `coco-world-makhana` |
| **Product Type** | `Simple Product (Individual Flavour)` |
| **Pack Size / Weight** | `Single (35g)` |
| **Regular Price** | ₹99.00 |
| **Sale Price** | N/A (Full Price) |
| **SKU** | `KRG-COCO_WORLD_MAKHANA` |
| **Stock Status** | `outofstock` |
| **Availability** | `SOLD OUT` |
| **Categories** | `Flavoured Makhana, Snacks` |
| **Tags** | `roasted-makhana, healthy-snack, gluten-free, foxnuts` |
| **Gallery Image Count** | 8 images |
| **SEO Title** | `Buy Chocolate Flavored Makhana Online | Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/coco-world-makhana` |

### Product Gallery & Image Ordering
1. `products/2_00f95c46-8497-45e9-8b34-538289ea0bef.png` (Shopify Source: [2_00f95c46-8497-45e9-8b34-538289ea0bef.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/2_00f95c46-8497-45e9-8b34-538289ea0bef.png?v=1782500076))
2. `products/white_front_coco_island_1.png` (Shopify Source: [white_front_coco_island_1.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/white_front_coco_island_1.png?v=1782479238))
3. `products/choco_831e67b9-b7b0-405d-8b70-7bee25b6ef52.png` (Shopify Source: [choco_831e67b9-b7b0-405d-8b70-7bee25b6ef52.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/choco_831e67b9-b7b0-405d-8b70-7bee25b6ef52.png?v=1782479080))
4. `products/Ingredients_525f9196-c7ac-473e-ba96-033c92e956e5.png` (Shopify Source: [Ingredients_525f9196-c7ac-473e-ba96-033c92e956e5.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_525f9196-c7ac-473e-ba96-033c92e956e5.png?v=1782479237))
5. `products/info_ae0eca67-c443-4d15-93f8-c656f745e793.png` (Shopify Source: [info_ae0eca67-c443-4d15-93f8-c656f745e793.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/info_ae0eca67-c443-4d15-93f8-c656f745e793.png?v=1782479238))
6. `products/ChatGPTImageJun12_2026_02_05_48AM.png` (Shopify Source: [ChatGPTImageJun12_2026_02_05_48AM.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPTImageJun12_2026_02_05_48AM.png?v=1782479189))
7. `products/ChatGPTImageJun12_2026_01_46_57AM.png` (Shopify Source: [ChatGPTImageJun12_2026_01_46_57AM.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPTImageJun12_2026_01_46_57AM.png?v=1782479189))
8. `products/Moodshot3.png` (Shopify Source: [Moodshot3.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot3.png?v=1782479189))

### Description (About the Product)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g
Click to enlarge
Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Out of stock
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
Dive into the rich and indulgent world of Korigo Pops – Coco World! 🍫
A perfect fusion of crunchy makhana pops and smooth chocolatey goodness, Coco World is made for those who love a sweet, satisfying snack. Every bite delivers a light crunch coated with a delicious cocoa flavor that melts perfectly on your taste buds.
Whether you're craving a mid-day treat, a movie night snack, or a sweet bite after meals, Korigo Pops Coco World brings the perfect balance of crunch and cocoa delight.
Why you'll love it:
• Rich cocoa flavor in every bite
• Light and crunchy makhana pops
• Less oil, more indulgence
• Perfect sweet snack for anytime cravings
Snack smarter. Snack tastier.
Welcome to the delicious Coco World with Korigo Pops!
```

### Ingredients List
> Peanut (Makhana) (55%), Sugar, Edible Vegetable Fat [Hydrogenated], Cocoa Solids (7%), Milk Solids, Emulsifiers (INS322 II, INS492, INS476), Iodised Salt, Nature Identical Vanilla Flavouring Substances, Artificial Condensed Milk Flavouring.

### Allergen Declaration
**Warning**: Contains milk & soy, and wheat & nuts.

### Nutritional Information (Approx. per 100g)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g
Click to enlarge
Korigo Pops Coco Island Chocolate Makhana Foxnuts | Sweet Snack | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Out of stock
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
About the Product
Ingredients List
Dive into the rich and indulgent world of Korigo Pops – Coco World! 🍫
A perfect fusion of crunchy makhana pops and smooth chocolatey goodness, Coco World is made for those who love a sweet, satisfying snack. Every bite delivers a light crunch coated with a delicious cocoa flavor that melts perfectly on your taste buds.
Whether you're craving a mid-day treat, a movie night snack, or a sweet bite after meals, Korigo Pops Coco World brings the perfect balance of crunch and cocoa delight.
Why you'll love it:
• Rich cocoa flavor in every bite
• Light and crunchy makhana pops
• Less oil, more indulgence
• Perfect sweet snack for anytime cravings
Snack smarter. Snack tastier.
Welcome to the delicious Coco World with Korigo Pops!
Nutritional Information (Approx.)
Per 100 g
Energy (kcal): 463.1
Protein (g): 6.9
Total Carbohydrate (g): 76.60
Total Sugar (g): 41.5
Includes Added Sugar (g): 33.6
Dietary Fiber (g): 7.50
Total Fat (g): 14.40
Saturated Fat (g): 14.0
Trans Fat (g): 0
Cholesterol (mg): 0
Sodium (mg): 52.0
```

### % Contribution to RDA per serve (35g)
```
Energy: 8.1%
Includes Added Sugar: 23.5%
Total Fat: 7.5%
Saturated Fat: 22.2%
Trans Fat: 0.0%
Sodium: 0.9%
```

### Curated Recipes (3 recipes)
#### Recipe: Banana / Berry Smoothie Bowl
- **Image**: `unnamed.jpg`
- **Ingredients**: 1 banana or 1 cup mixed berries, 1/2 cup yogurt or milk, 1/4 cup granola (optional), 1/4 cup Korigo Chocolate Makhana, coconut flakes or almonds
- **Instructions**: Blend banana or berries with yogurt or milk to make a smoothie base. Pour into a bowl and add granola, coconut flakes or almonds and Korigo Chocolate Makhana on top. Serve immediately.

#### Recipe: Healthy Trail Mix
- **Image**: `unnamed_de1781e8-0705-49b3-b36a-c80299a61206.jpg`
- **Ingredients**: 1/4 cup almonds, 1/4 cup cashews, 1/4 cup raisins, 1/2 cup Korigo Chocolate Makhana.
- **Instructions**: Combine almonds, cashews, raisins and Korigo Chocolate Makhana in a bowl. Mix well and store in an airtight container for a quick energy boosting snack.

#### Recipe: Chia Pudding Bowl
- **Image**: `WhatsApp_Image_2026-03-11_at_1.11.19_AM.jpg`
- **Ingredients**: 2 tbsp chia seeds, 1 cup milk, 1 tsp honey or maple syrup, 1/4 cup Korigo Chocolate Makhana.
- **Instructions**: Soak chia seeds in milk overnight until thick. Add honey or maple syrup and top with Korigo Chocolate Makhana before serving

---

## Korigo Pops Sour Crème d' Onion Makhana Foxnuts | Creamy Snack | 35g

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/creme-d-onion-makhana`
- **WooCommerce Target Product**: `Korigo Pops Sour Crème d' Onion Makhana Foxnuts | Creamy Snack | 35g` (Slug: `creme-d-onion-makhana`)
- **Assigned WooCommerce ID**: `109`
- **Next.js Dynamic Route**: `/products/creme-d-onion-makhana`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `creme-d-onion-makhana` |
| **Product Type** | `Simple Product (Individual Flavour)` |
| **Pack Size / Weight** | `Single (35g)` |
| **Regular Price** | ₹99.00 |
| **Sale Price** | N/A (Full Price) |
| **SKU** | `KRG-CREME_D_ONION_MAKHANA` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Flavoured Makhana, Snacks` |
| **Tags** | `roasted-makhana, healthy-snack, gluten-free, foxnuts` |
| **Gallery Image Count** | 8 images |
| **SEO Title** | `Cream and Onion Makhana Snacks | Crunchy Fox Nuts – Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/creme-d-onion-makhana` |

### Product Gallery & Image Ordering
1. `products/4_81665c1c-4948-45d8-8ef0-fed0d1bb7d25.png` (Shopify Source: [4_81665c1c-4948-45d8-8ef0-fed0d1bb7d25.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/4_81665c1c-4948-45d8-8ef0-fed0d1bb7d25.png?v=1782500076))
2. `products/white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png` (Shopify Source: [white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/white_front_f9e72cdd-78fc-4c01-a7ff-182a7df4a9bc.png?v=1782479379))
3. `products/creme.png` (Shopify Source: [creme.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/creme.png?v=1782479079))
4. `products/Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png` (Shopify Source: [Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_f749e9c9-86f2-4cea-bfef-9a903c5e49ad.png?v=1782479385))
5. `products/info_f38b7bc7-9c57-4755-b623-f16f1a2ac8c2.png` (Shopify Source: [info_f38b7bc7-9c57-4755-b623-f16f1a2ac8c2.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/info_f38b7bc7-9c57-4755-b623-f16f1a2ac8c2.png?v=1782479385))
6. `products/Moodshot1.png` (Shopify Source: [Moodshot1.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot1.png?v=1782479340))
7. `products/Moodshot2_80dfedcc-526a-437f-a561-6f8d8082d094.png` (Shopify Source: [Moodshot2_80dfedcc-526a-437f-a561-6f8d8082d094.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot2_80dfedcc-526a-437f-a561-6f8d8082d094.png?v=1782479341))
8. `products/Moodshot4.png` (Shopify Source: [Moodshot4.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot4.png?v=1782479349))

### Description (About the Product)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Sour Crème d' Onion Makhana Foxnuts | Creamy Snack | 35g
Click to enlarge
Korigo Pops Sour Crème d' Onion Makhana Foxnuts | Creamy Snack | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
Experience the perfect balance of creamy and tangy with Korigo Pops – Sour Crème d' Onion! 🧅
Crafted from light and crunchy makhana pops, this flavour blends the smooth richness of sour cream with the bold kick of onion to create a snack that’s irresistibly satisfying. Each bite delivers a burst of savory goodness with a delightful crunch that keeps you reaching for more.
Whether it’s movie time, work breaks, or late-night cravings, Korigo Pops Sour Crème d' Onion brings a flavorful twist to your snacking moments.
Why you'll love it:
• Creamy sour cream and onion flavour
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect savory snack for anytime munching
Snack smarter. Snack tastier.
Enjoy the irresistible crunch of Korigo Pops!
```

### Ingredients List
> Foxnut / Makhana (65%), Cold Pressed Sunflower Oil, Seasoning (Sugar, Iodised Salt, Milk Solid, Onion Powder, Parsley Leaves, Flavour Enhancer (INS631, INS627), Maltodextrin, Garlic Powder, Acidity Regulator (INS330), Anticaking Agent (INS341 III, INS551), Natural & Nature Identical Flavouring Substances).

### Allergen Declaration
**Warning**: Contains milk & soy. And may contains wheat & nuts.

### Nutritional Information (Approx. per 100g)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Sour Crème d' Onion Makhana Foxnuts | Creamy Snack | 35g
Click to enlarge
Korigo Pops Sour Crème d' Onion Makhana Foxnuts | Creamy Snack | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
About the Product
Ingredients List
Experience the perfect balance of creamy and tangy with Korigo Pops – Sour Crème d' Onion! 🧅
Crafted from light and crunchy makhana pops, this flavour blends the smooth richness of sour cream with the bold kick of onion to create a snack that’s irresistibly satisfying. Each bite delivers a burst of savory goodness with a delightful crunch that keeps you reaching for more.
Whether it’s movie time, work breaks, or late-night cravings, Korigo Pops Sour Crème d' Onion brings a flavorful twist to your snacking moments.
Why you'll love it:
• Creamy sour cream and onion flavour
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect savory snack for anytime munching
Snack smarter. Snack tastier.
Enjoy the irresistible crunch of Korigo Pops!
Nutritional Information (Approx.)
Per 100 g
Energy (kcal): 442.2
Protein (g): 7.9
Total Carbohydrate (g): 74.90
Total Sugar (g): 3.7
Includes Added Sugar (g): 5.40
Dietary Fiber (g): 7.50
Total Fat (g): 12.40
Saturated Fat (g): 1.20
Trans Fat (g): 0
Cholesterol (mg): 0
Sodium (mg): 915.8
```

### % Contribution to RDA per serve (35g)
```
Energy: 7.7%
Includes Added Sugar: 3.8%
Total Fat: 6.5%
Saturated Fat: 2.0%
Trans Fat: 0.0%
Sodium: 16.0%
```

### Curated Recipes (3 recipes)
#### Recipe: Savory Oats Bowl
- **Image**: `WhatsApp_Image_2026-03-11_at_1.18.26_AM.jpg`
- **Ingredients**: 1/2 cup oats, 1 cup water or milk, mixed vegetables, 1/4 cup Korigo Cream & Onion Makhana.
- **Instructions**: Cook oats with water or milk and add vegetables while cooking. Transfer to a bowl and top with Korigo Cream & Onion Makhana.

#### Recipe: Yogurt Dip Bowl
- **Image**: `WhatsApp_Image_2026-03-11_at_1.23.02_AM.jpg`
- **Ingredients**: 1 cup Greek yogurt, 1/2 cucumber chopped, fresh herbs, 1/4 cup Korigo Cream & Onion Makhana.
- **Instructions**: Mix Greek yogurt with cucumber and herbs in a bowl and sprinkle Korigo Cream & Onion Makhana on top before serving.

#### Recipe: Stuffed Sandwich
- **Image**: `unnamed_7db7f77e-6d96-44e1-941e-3345f2513085.jpg`
- **Ingredients**: 2 slices whole wheat bread, hummus or mashed avocado, fresh vegetables, 1/4 cup Korigo Cream & Onion Makhana.
- **Instructions**: Spread hummus or avocado on bread, add vegetables and Korigo Cream & Onion Makhana, then close the sandwich and serve.

---

## Korigo Pops Garlicked Cheese Makhana Foxnuts | Savoury Snack | 35g

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/garlicked-cheese-makhana`
- **WooCommerce Target Product**: `Korigo Pops Garlicked Cheese Makhana Foxnuts | Savoury Snack | 35g` (Slug: `garlicked-cheese-makhana`)
- **Assigned WooCommerce ID**: `110`
- **Next.js Dynamic Route**: `/products/garlicked-cheese-makhana`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `garlicked-cheese-makhana` |
| **Product Type** | `Simple Product (Individual Flavour)` |
| **Pack Size / Weight** | `Single (35g)` |
| **Regular Price** | ₹99.00 |
| **Sale Price** | N/A (Full Price) |
| **SKU** | `KRG-GARLICKED_CHEESE_MAKHANA` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Flavoured Makhana, Snacks` |
| **Tags** | `roasted-makhana, healthy-snack, gluten-free, foxnuts` |
| **Gallery Image Count** | 9 images |
| **SEO Title** | `Buy Garlic Cheese Makhana Online | Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/garlicked-cheese-makhana` |

### Product Gallery & Image Ordering
1. `products/1_352042ac-b02b-4f54-add6-83ebb031abb6.png` (Shopify Source: [1_352042ac-b02b-4f54-add6-83ebb031abb6.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/1_352042ac-b02b-4f54-add6-83ebb031abb6.png?v=1782500076))
2. `products/whitefrontgarlickedcheese_1.png` (Shopify Source: [whitefrontgarlickedcheese_1.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontgarlickedcheese_1.png?v=1782479473))
3. `products/garliced_cheese.png` (Shopify Source: [garliced_cheese.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/garliced_cheese.png?v=1782479086))
4. `products/infoo.png` (Shopify Source: [infoo.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/infoo.png?v=1782479473))
5. `products/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png` (Shopify Source: [Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_0cdedc16-06ee-4284-bc59-6732dc151171.png?v=1782479464))
6. `products/ChatGPT_Image_Jun_12_2026_01_05_00_AM.png` (Shopify Source: [ChatGPT_Image_Jun_12_2026_01_05_00_AM.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPT_Image_Jun_12_2026_01_05_00_AM.png?v=1782479493))
7. `products/a952062c-633f-42e4-a39c-ababe40943e4.png` (Shopify Source: [a952062c-633f-42e4-a39c-ababe40943e4.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/a952062c-633f-42e4-a39c-ababe40943e4.png?v=1782479493))
8. `products/Moodshot_2_d64a3724-c4e4-436e-bd27-aa2ddc90d727.png` (Shopify Source: [Moodshot_2_d64a3724-c4e4-436e-bd27-aa2ddc90d727.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot_2_d64a3724-c4e4-436e-bd27-aa2ddc90d727.png?v=1782479493))
9. `products/ed86da5a-21ac-4170-a49d-a2095f8d99ef.png` (Shopify Source: [ed86da5a-21ac-4170-a49d-a2095f8d99ef.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ed86da5a-21ac-4170-a49d-a2095f8d99ef.png?v=1782479493))

### Description (About the Product)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Garlicked Cheese Makhana Foxnuts | Savoury Snack | 35g
Click to enlarge
Korigo Pops Garlicked Cheese Makhana Foxnuts | Savoury Snack | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
Indulge in the bold and savory delight of Korigo Pops – Garlicked Cheese! 🧄🧀
Made from light and crunchy makhana pops, this flavour combines the rich creaminess of cheese with the aromatic kick of garlic to create a snack that’s irresistibly flavorful. Every bite delivers a perfect balance of cheesy goodness and garlicky zest, giving your taste buds a satisfying savory experience.
Perfect for movie nights, quick snack breaks, or anytime cravings, Korigo Pops Garlicked Cheese is the ultimate treat for those who love bold and indulgent flavors.
Why you'll love it:
• Rich cheese flavor with a hint of garlic
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect savory snack for anytime munching
Snack smarter. Snack tastier.
Enjoy the bold crunch of Korigo Pops!
```

### Ingredients List
> Foxnut / Makhana (65%), Cold Pressed Sunflower Oil, Seasoning (Maltodextrin, Sugar, Dehydrated Vegetable Powders (Garlic, Onion), Iodised Salt, Cheese Powder, Edible Vegetable Fat Powder, Flavour Enhancer (INS627, INS631), Acidity Regulator (INS330), Paprika Oleoresin (INS160c), Anticaking Agent (INS551), Natural & Nature Identical Flavouring Substances (Cheese & Garlic)).

### Allergen Declaration
**Warning**: Contains milk & soy. And may contains wheat & nuts.

### Nutritional Information (Approx. per 100g)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Garlicked Cheese Makhana Foxnuts | Savoury Snack | 35g
Click to enlarge
Korigo Pops Garlicked Cheese Makhana Foxnuts | Savoury Snack | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
About the Product
Ingredients List
Indulge in the bold and savory delight of Korigo Pops – Garlicked Cheese! 🧄🧀
Made from light and crunchy makhana pops, this flavour combines the rich creaminess of cheese with the aromatic kick of garlic to create a snack that’s irresistibly flavorful. Every bite delivers a perfect balance of cheesy goodness and garlicky zest, giving your taste buds a satisfying savory experience.
Perfect for movie nights, quick snack breaks, or anytime cravings, Korigo Pops Garlicked Cheese is the ultimate treat for those who love bold and indulgent flavors.
Why you'll love it:
• Rich cheese flavor with a hint of garlic
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect savory snack for anytime munching
Snack smarter. Snack tastier.
Enjoy the bold crunch of Korigo Pops!
Nutritional Information (Approx.)
Per 100 g
Energy (kcal): 442.2
Protein (g): 7.91
Total Carbohydrate (g): 74.72
Total Sugar (g): 3.77
Includes Added Sugar (g): 0.00
Dietary Fiber (g): 7.50
Total Fat (g): 12.41
Saturated Fat (g): 1.21
Trans Fat (g): 0
Cholesterol (mg): 0
Sodium (mg): 922.3
```

### % Contribution to RDA per serve (35g)
```
Energy: 7.7%
Total Fat: 6.5%
Saturated Fat: 1.9%
Trans Fat: 0.0%
Sodium: 16.1%
```

### Curated Recipes (3 recipes)
#### Recipe: Avocado Toast
- **Image**: `unnamed_608da05b-7adc-46f9-acbf-d77685370238.jpg`
- **Ingredients**: 1 slice whole grain bread, 1/2 avocado mashed, salt and pepper, 1/4 cup Korigo Garlic Cheese Makhana.
- **Instructions**: Toast the bread and spread mashed avocado on top. Season with salt and pepper and sprinkle Korigo Garlic Cheese Makhana for a crunchy topping.

#### Recipe: Buddha Bowl
- **Image**: `WhatsApp_Image_2026-03-11_at_1.16.01_AM.jpg`
- **Ingredients**: 1/2 cup quinoa or brown rice, 1/2 cup roasted vegetables, 1/4 cup chickpeas, 1/4 cup Korigo Garlic Cheese Makhana.
- **Instructions**: Place quinoa or rice in a bowl and add roasted vegetables and chickpeas. Finish by sprinkling Korigo Garlic Cheese Makhana for added flavor and texture.

#### Recipe: Creamy Soup Topping
- **Image**: `WhatsApp_Image_2026-03-11_at_1.12.47_AM.jpg`
- **Ingredients**: 1 bowl tomato, mushroom or pumpkin soup, 1/4 cup Korigo Garlic Cheese Makhana.
- **Instructions**: Prepare your soup and pour it into a bowl. Add Korigo Garlic Cheese Makhana on top just before serving to create a crunchy topping.

---

## Korigo Pops Cinnamon Drip Makhana Foxnuts | Roasted | 35g

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/cinnamon-drip`
- **WooCommerce Target Product**: `Korigo Pops Cinnamon Drip Makhana Foxnuts | Roasted | 35g` (Slug: `cinnamon-drip`)
- **Assigned WooCommerce ID**: `111`
- **Next.js Dynamic Route**: `/products/cinnamon-drip`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `cinnamon-drip` |
| **Product Type** | `Simple Product (Individual Flavour)` |
| **Pack Size / Weight** | `Single (35g)` |
| **Regular Price** | ₹99.00 |
| **Sale Price** | N/A (Full Price) |
| **SKU** | `KRG-CINNAMON_DRIP` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Flavoured Makhana, Snacks` |
| **Tags** | `roasted-makhana, healthy-snack, gluten-free, foxnuts` |
| **Gallery Image Count** | 9 images |
| **SEO Title** | `Buy Honey Cinnamon Makhana Online | Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/cinnamon-drip` |

### Product Gallery & Image Ordering
1. `products/6_a811079f-436d-4f6f-bf05-dac281c5c5e8.png` (Shopify Source: [6_a811079f-436d-4f6f-bf05-dac281c5c5e8.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/6_a811079f-436d-4f6f-bf05-dac281c5c5e8.png?v=1782500076))
2. `products/white_front_cinemon_drip.png` (Shopify Source: [white_front_cinemon_drip.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/white_front_cinemon_drip.png?v=1782479928))
3. `products/cinemon_drip.png` (Shopify Source: [cinemon_drip.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/cinemon_drip.png?v=1782479086))
4. `products/Ingredients_5639beb5-012e-406a-8701-8f34177f4bee.png` (Shopify Source: [Ingredients_5639beb5-012e-406a-8701-8f34177f4bee.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_5639beb5-012e-406a-8701-8f34177f4bee.png?v=1782479928))
5. `products/info_efbe8f36-0010-4b71-bc1a-a72ef71e6f8c.png` (Shopify Source: [info_efbe8f36-0010-4b71-bc1a-a72ef71e6f8c.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/info_efbe8f36-0010-4b71-bc1a-a72ef71e6f8c.png?v=1782479938))
6. `products/ChatGPTImageJun12_2026_02_12_48AM_9ca5c814-9350-471c-a9f0-99464303148d.png` (Shopify Source: [ChatGPTImageJun12_2026_02_12_48AM_9ca5c814-9350-471c-a9f0-99464303148d.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPTImageJun12_2026_02_12_48AM_9ca5c814-9350-471c-a9f0-99464303148d.png?v=1782479899))
7. `products/ChatGPTImageJun12_2026_12_33_02AM_8ffc3e6c-77ca-4008-8fae-2a27ee13d1e2.png` (Shopify Source: [ChatGPTImageJun12_2026_12_33_02AM_8ffc3e6c-77ca-4008-8fae-2a27ee13d1e2.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPTImageJun12_2026_12_33_02AM_8ffc3e6c-77ca-4008-8fae-2a27ee13d1e2.png?v=1782479889))
8. `products/colorfront_99bca94b-337c-46e6-a88b-7f1b51fe0d82.png` (Shopify Source: [colorfront_99bca94b-337c-46e6-a88b-7f1b51fe0d82.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/colorfront_99bca94b-337c-46e6-a88b-7f1b51fe0d82.png?v=1782479899))
9. `products/Moodshot3_5988ddd3-28a4-42eb-97c0-35145d18ef65.png` (Shopify Source: [Moodshot3_5988ddd3-28a4-42eb-97c0-35145d18ef65.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Moodshot3_5988ddd3-28a4-42eb-97c0-35145d18ef65.png?v=1782479889))

### Description (About the Product)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Cinnamon Drip Makhana Foxnuts | Roasted | 35g
Click to enlarge
Korigo Pops Cinnamon Drip Makhana Foxnuts | Roasted | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
Treat your taste buds to a warm and delightful twist with Korigo Pops – Cinnamon Drip! 🍯✨
Made from light and crunchy makhana pops, this flavour blends the comforting sweetness of cinnamon with a smooth, indulgent drizzle-like taste that creates the perfect balance of crunch and sweetness. Every bite delivers a warm, aromatic flavor that feels both satisfying and unique.
Whether you're looking for a sweet snack during the day or a comforting treat in the evening, Korigo Pops Cinnamon Drip brings a deliciously cozy experience to every bite.
Why you'll love it:
• Warm cinnamon sweetness in every bite
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect sweet snack for anytime cravings
Snack smarter. Snack tastier.
Enjoy the warm crunch of Korigo Pops!
```

### Ingredients List
> Foxnut / Makhana (65%), Cold Pressed Sunflower Oil, Seasoning (Sugar, Maltodextrin, Spices and Spice Extract (Cinnamon), Whole Milk Powder, Iodised Salt, Flavour Enhancer (INS627, INS631), Hydrolysed Vegetable Protein (Soya), Anti Caking Agents (INS551, INS341 III), Honey Powder, Acidity Regulator (INS296), Natural & Nature Identical Flavouring Substances (Honey, Cinnamon)).

### Allergen Declaration
**Warning**: Contains milk & soy. And may contains wheat & nuts.

### Nutritional Information (Approx. per 100g)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Cinnamon Drip Makhana Foxnuts | Roasted | 35g
Click to enlarge
Korigo Pops Cinnamon Drip Makhana Foxnuts | Roasted | 35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
About the Product
Ingredients List
Treat your taste buds to a warm and delightful twist with Korigo Pops – Cinnamon Drip! 🍯✨
Made from light and crunchy makhana pops, this flavour blends the comforting sweetness of cinnamon with a smooth, indulgent drizzle-like taste that creates the perfect balance of crunch and sweetness. Every bite delivers a warm, aromatic flavor that feels both satisfying and unique.
Whether you're looking for a sweet snack during the day or a comforting treat in the evening, Korigo Pops Cinnamon Drip brings a deliciously cozy experience to every bite.
Why you'll love it:
• Warm cinnamon sweetness in every bite
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect sweet snack for anytime cravings
Snack smarter. Snack tastier.
Enjoy the warm crunch of Korigo Pops!
Nutritional Information (Approx.)
Per 100 g
Energy (kcal): 445.4
Protein (g): 8.1
Total Carbohydrate (g): 74.90
Total Sugar (g): 3.8
Includes Added Sugar (g): 0.00
Dietary Fiber (g): 7.50
Total Fat (g): 12.60
Saturated Fat (g): 1.20
Trans Fat (g): 0
Cholesterol (mg): 0
Sodium (mg): 52.0
```

### % Contribution to RDA per serve (35g)
```
Energy: 7.8%
Total Fat: 6.6%
Saturated Fat: 1.9%
Trans Fat: 0.0%
Sodium: 0.9%
```

### Curated Recipes (3 recipes)
#### Recipe: Apple Cinnamon Toast
- **Image**: `97c5157c-01ac-4306-9a30-a08094902fad.jpg`
- **Ingredients**: 1 slice whole grain bread, peanut or almond butter, apple slices, 1/4 cup Korigo Cinnamon Honey Makhana.
- **Instructions**: Toast bread and spread peanut or almond butter on top. Add apple slices and sprinkle Korigo Cinnamon Honey Makhana

#### Recipe: Ricotta Honey Dessert Bowl
- **Image**: `f2f95fb0-f9f4-475c-8616-10c6cfda3e71.jpg`
- **Ingredients**: 1/2 cup ricotta cheese, 1 tsp honey, 1/4 cup Korigo Cinnamon Honey Makhana
- **Instructions**: Add ricotta to a bowl, drizzle honey and top with Korigo Cinnamon Honey Makhana for a creamy dessert

#### Recipe: Frozen Yogurt Bark
- **Image**: `5419cb35-46fc-4931-bbfa-6a709423ee8a.jpg`
- **Ingredients**: 1 cup Greek yogurt, mixed fruits, 1/4 cup Korigo Cinnamon Honey Makhana
- **Instructions**: Spread yogurt on a tray, add fruits and Korigo Cinnamon Honey Makhana and freeze until solid. Break into pieces before serving

---

## Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts | Spicy |35g

**Migration Routing:**
- **Shopify Source**: `https://korigosnacks.com/products/sassy-sriracha`
- **WooCommerce Target Product**: `Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts | Spicy |35g` (Slug: `sassy-sriracha`)
- **Assigned WooCommerce ID**: `112`
- **Next.js Dynamic Route**: `/products/sassy-sriracha`

### Product Metadata & Specifications
| Attribute | Value |
| :--- | :--- |
| **Product Handle** | `sassy-sriracha` |
| **Product Type** | `Simple Product (Individual Flavour)` |
| **Pack Size / Weight** | `Single (35g)` |
| **Regular Price** | ₹99.00 |
| **Sale Price** | N/A (Full Price) |
| **SKU** | `KRG-SASSY_SRIRACHA` |
| **Stock Status** | `instock` |
| **Availability** | `Available` |
| **Categories** | `Flavoured Makhana, Snacks` |
| **Tags** | `roasted-makhana, healthy-snack, gluten-free, foxnuts` |
| **Gallery Image Count** | 8 images |
| **SEO Title** | `Buy Spicy Sriracha Makhana Online | Korigo Snacks` |
| **Canonical URL** | `https://korigosnacks.com/products/sassy-sriracha` |

### Product Gallery & Image Ordering
1. `products/3_9c34a3c2-3828-4bd9-8a64-75fc16af7b40.png` (Shopify Source: [3_9c34a3c2-3828-4bd9-8a64-75fc16af7b40.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/3_9c34a3c2-3828-4bd9-8a64-75fc16af7b40.png?v=1782500076))
2. `products/whitefrontssasysiracha.png` (Shopify Source: [whitefrontssasysiracha.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/whitefrontssasysiracha.png?v=1782479975))
3. `products/sassy_sirsa.png` (Shopify Source: [sassy_sirsa.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/sassy_sirsa.png?v=1782479079))
4. `products/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png` (Shopify Source: [Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/Ingredients_cc66fbec-2f50-424b-90c9-3eee2e94a863.png?v=1782479964))
5. `products/info_d1f1fecb-b1af-4230-8fb6-210e5f43afe6.png` (Shopify Source: [info_d1f1fecb-b1af-4230-8fb6-210e5f43afe6.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/info_d1f1fecb-b1af-4230-8fb6-210e5f43afe6.png?v=1782479975))
6. `products/ChatGPT_Image_Jun_12_2026_01_10_18_AM.png` (Shopify Source: [ChatGPT_Image_Jun_12_2026_01_10_18_AM.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPT_Image_Jun_12_2026_01_10_18_AM.png?v=1782480001))
7. `products/ChatGPT_Image_Jun_12_2026_01_38_19_AM.png` (Shopify Source: [ChatGPT_Image_Jun_12_2026_01_38_19_AM.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPT_Image_Jun_12_2026_01_38_19_AM.png?v=1782480001))
8. `products/ChatGPT_Image_Jun_12_2026_01_14_10_AM.png` (Shopify Source: [ChatGPT_Image_Jun_12_2026_01_14_10_AM.png](https://cdn.shopify.com/s/files/1/0985/2895/2610/files/ChatGPT_Image_Jun_12_2026_01_14_10_AM.png?v=1782480012))

### Description (About the Product)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts | Spicy |35g
Click to enlarge
Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts | Spicy |35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
Turn up the heat with Korigo Pops – Sassy Sriracha! 🌶️🔥
Made from light and crunchy makhana pops, this bold flavour brings the perfect balance of spice and tanginess inspired by the iconic sriracha taste. Each bite delivers a fiery kick followed by a savory crunch that keeps your taste buds excited.
Whether you're craving something spicy during movie nights, snack breaks, or late-night munching, Korigo Pops Sassy Sriracha is the perfect snack for those who love a little heat with their crunch.
Why you'll love it:
• Bold and spicy sriracha flavor
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect spicy snack for anytime cravings
Snack smarter. Snack tastier.
Feel the heat with Korigo Pops!
```

### Ingredients List
> Foxnut / Makhana (65%), Cold Pressed Sunflower Oil, Seasoning (Maltodextrin, Sugar, Iodised Salt, Dehydrated Vegetable Powders (Garlic, Onion), Spices and Spice Extract (Coriander, Chilli), Acidity Regulator (INS330, INS334), Soya Sauce Powder, Hydrolysed Vegetable Protein (Soya Base), Flavour Enhancer (INS627, INS631), Anticaking Agent (INS551), Natural & Nature Identical Flavouring Substances (Schezwan, Bell Pepper)).

### Allergen Declaration
**Warning**: Contains milk & soy. And may contains wheat & nuts.

### Nutritional Information (Approx. per 100g)
```
Home
Shop
Our Story
Contact Us
0
Home
Shop
Our Story
Contact Us
Home
Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts | Spicy |35g
Click to enlarge
Korigo Pops Sassy Sriracha Flavoured Makhana Foxnuts | Spicy |35g
Rs. 99.00
Free Delivery on Orders above ₹349
Single
Pack Size:
Single
Single
Add to cart
Notify Me When Available
Estimated Delivery Date
CHECK PINCODE
Check
48 Hrs Return
On Damaged & Expired Products Only
Secure Checkout
Encrypted payments via trusted gateways
Pan-India Shipping
Delivering to 25,000+ pincodes
About the Product
Ingredients List
Turn up the heat with Korigo Pops – Sassy Sriracha! 🌶️🔥
Made from light and crunchy makhana pops, this bold flavour brings the perfect balance of spice and tanginess inspired by the iconic sriracha taste. Each bite delivers a fiery kick followed by a savory crunch that keeps your taste buds excited.
Whether you're craving something spicy during movie nights, snack breaks, or late-night munching, Korigo Pops Sassy Sriracha is the perfect snack for those who love a little heat with their crunch.
Why you'll love it:
• Bold and spicy sriracha flavor
• Light and crunchy makhana pops
• Less oil, more flavor
• Perfect spicy snack for anytime cravings
Snack smarter. Snack tastier.
Feel the heat with Korigo Pops!
Nutritional Information (Approx.)
Per 100 g
Energy (kcal): 440.3
Protein (g): 7.8
Total Carbohydrate (g): 74.60
Total Sugar (g): 3.5
Includes Added Sugar (g): 0.00
Dietary Fiber (g): 7.50
Total Fat (g): 13.30
Saturated Fat (g): 1.2
Trans Fat (g): 0
Cholesterol (mg): 0
Sodium (mg): 908.5
```

### % Contribution to RDA per serve (35g)
```
Energy: 7.7%
Total Fat: 6.4%
Saturated Fat: 2.0%
Trans Fat: 0.0%
Sodium: 15.9%
```

### Curated Recipes (3 recipes)
#### Recipe: Spicy Wrap
- **Image**: `WhatsApp_Image_2026-03-11_at_1.03.22_AM.jpg`
- **Ingredients**: 1 whole wheat tortilla, lettuce leaves, grilled vegetables, 1/4 cup Korigo Sweet Sriracha Makhana.
- **Instructions**: Place lettuce and grilled vegetables on the tortilla, add Korigo Sweet Sriracha Makhana, roll the wrap tightly and slice before serving.

#### Recipe: Asian Salad
- **Image**: `WhatsApp_Image_2026-03-11_at_12.58.37_AM.jpg`
- **Ingredients**: 1 cup shredded cabbage, 1/2 cup carrot, 1/2 cup cucumber, sesame dressing, 1/4 cup Korigo Sweet Sriracha Makhana.
- **Instructions**: Mix cabbage, carrot and cucumber in a bowl and toss with sesame dressing. Top with Korigo Sweet Sriracha Makhana for extra crunch.

#### Recipe: Rice Paper Rolls
- **Image**: `unnamed_ac989fcd-85b0-4538-aa80-52bbdb160fdd.jpg`
- **Ingredients**: Rice paper sheets, mixed vegetables, fresh herbs, 1/4 cup Korigo Sweet Sriracha Makhana.
- **Instructions**: Soften rice paper in warm water, add vegetables, herbs and Korigo Sweet Sriracha Makhana, then roll tightly and serve with dipping sauce

---
