# Korigo Snacks — Backend Store Configuration Specification

**Target Backend**: [https://backend-korigo.sampledomain.online/](https://backend-korigo.sampledomain.online/)  
**Document Purpose**: Authoritative reference for WordPress and WooCommerce store settings aligned with the live Shopify source store.

---

## 1. General Store Settings

| Parameter | Required Value | WooCommerce Setting Key | Source Basis | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Store Address Line 1** | 783 Anandapur | `woocommerce_store_address` | Live Shopify Footer / Contact | **Configured Live** |
| **City** | Kolkata | `woocommerce_store_city` | Live Shopify Footer / Contact | **Configured Live** |
| **Country / State** | India — West Bengal (`IN:WB`) | `woocommerce_default_country` | Kolkata, West Bengal | **Configured Live** |
| **Postcode / PIN** | 700107 | `woocommerce_store_postcode` | Live Shopify Footer / Contact | **Configured Live** |
| **Selling Locations** | Sell to specific countries (`specific`) | `woocommerce_allowed_countries` | Domestic Snack Brand | **Configured Live** |
| **Specific Selling Countries**| India (`IN`) | `woocommerce_specific_allowed_countries`| India Pan-India | **Configured Live** |
| **Shipping Locations** | Ship to all allowed countries (`all`) | `woocommerce_ship_to_countries` | Pan-India Logistics | **Configured Live** |
| **Default Customer Location** | Shop base address (`base`) | `woocommerce_default_customer_address`| Kolkata Base | **Configured Live** |

---

## 2. Currency Settings

| Parameter | Required Value | WooCommerce Setting Key | Source Basis | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Currency** | Indian Rupee (`INR`) | `woocommerce_currency` | Live Shopify Store Currency | **Configured Live** |
| **Currency Position** | Left (`₹99.00`) | `woocommerce_currency_pos` | Live Shopify Price Display | **Configured Live** |
| **Thousand Separator** | `,` (Comma) | `woocommerce_price_thousand_sep` | Standard Indian Notation | **Configured Live** |
| **Decimal Separator** | `.` (Period) | `woocommerce_price_decimal_sep` | Standard Currency Notation | **Configured Live** |
| **Number of Decimals** | `2` | `woocommerce_price_num_decimals` | Live Shopify Prices (₹99.00) | **Configured Live** |

---

## 3. Tax Settings (GST Compliance)

| Parameter | Required Value | WooCommerce Setting Key | Source Basis / Rule | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Enable Taxes** | Yes (`yes`) | `woocommerce_calc_taxes` | Indian E-Commerce Regulatory | **Configured Live** |
| **Prices Entered With Tax** | Yes, I will enter prices inclusive of tax (`yes`) | `woocommerce_prices_include_tax` | Live Shopify Prices Inclusive | **Configured Live** |
| **Calculate Tax Based On** | Customer shipping address | `woocommerce_tax_based_on` | Inter-State / Intra-State GST | **Configured Live** |
| **Display Prices in the Shop** | Including tax (`incl`) | `woocommerce_tax_display_shop` | Consumer MRP Compliance | **Configured Live** |
| **Display Prices During Cart/Checkout** | Including tax (`incl`) | `woocommerce_tax_display_cart` | Clean Checkout Experience | **Configured Live** |

---

## 4. Inventory Settings

| Parameter | Required Value | WooCommerce Setting Key | Source Basis | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Manage Stock** | Yes (`yes`) | `woocommerce_manage_stock` | Accurate Stock Control | **Configured Live** |
| **Hold Stock (Minutes)**| `60` | `woocommerce_hold_stock_minutes` | Standard Cart Reservation | **Configured Live** |
| **Notifications** | Enable low stock & out of stock notifications | `woocommerce_notify_no_stock` | Store Operations | **Configured Live** |
| **Notification Recipient**| `contact@korigosnacks.com` | `woocommerce_stock_email_recipient`| Official Korigo Contact | **Configured Live** |
| **Out of Stock Visibility**| Show out of stock items in catalog | `woocommerce_hide_out_of_stock_items` | Show Coco Island as "Sold Out" | **Configured Live** |

---

## 5. Shipping & Payment Gateways

| Component | Status | Policy / Action Required |
| :--- | :--- | :--- |
| **Shipping Zones** | **PENDING — SOURCE DATA REQUIRED** | Pan-India standard shipping zone. Default flat-rate or free shipping threshold requires confirmation from store owner. |
| **Payment Gateways** | **PENDING — SOURCE DATA REQUIRED** | Live credentials (Razorpay, Cashfree, PhonePe, or PayU) must NOT be invented. Sandbox / COD to be initialized during checkout phase. |
