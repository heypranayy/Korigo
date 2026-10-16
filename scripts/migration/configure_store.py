import sys
import os
sys.path.append(os.path.dirname(__file__))

from config import wp_api_request, get_auth_headers

def configure_store():
    print("=== CONFIGURING WOOCOMMERCE SETTINGS ===")
    
    auth = get_auth_headers()
    if 'Authorization' not in auth:
        print("ERROR: No Authorization header set.")
        return False

    # 1. General settings
    general_settings = [
        {"id": "woocommerce_store_address", "value": "783 Anandapur"},
        {"id": "woocommerce_store_city", "value": "Kolkata"},
        {"id": "woocommerce_default_country", "value": "IN:WB"},
        {"id": "woocommerce_store_postcode", "value": "700107"},
        {"id": "woocommerce_currency", "value": "INR"},
        {"id": "woocommerce_currency_pos", "value": "left"},
        {"id": "woocommerce_allowed_countries", "value": "specific"},
        {"id": "woocommerce_specific_allowed_countries", "value": ["IN"]},
        {"id": "woocommerce_ship_to_countries", "value": "all"},
        {"id": "woocommerce_calc_taxes", "value": "yes"}
    ]

    for item in general_settings:
        s_id = item["id"]
        val = item["value"]
        try:
            res = wp_api_request(f"wc/v3/settings/general/{s_id}", method="PUT", data={"value": val})
            print(f"Set General [{s_id}] = {val} -> SUCCESS")
        except Exception as e:
            print(f"Failed setting [{s_id}]: {e}")

    # 2. Tax settings
    tax_settings = [
        {"id": "woocommerce_prices_include_tax", "value": "yes"},
        {"id": "woocommerce_tax_display_shop", "value": "incl"},
        {"id": "woocommerce_tax_display_cart", "value": "incl"}
    ]

    for item in tax_settings:
        s_id = item["id"]
        val = item["value"]
        try:
            res = wp_api_request(f"wc/v3/settings/tax/{s_id}", method="PUT", data={"value": val})
            print(f"Set Tax [{s_id}] = {val} -> SUCCESS")
        except Exception as e:
            print(f"Failed setting [{s_id}]: {e}")

    # 3. Product settings (kg, cm, stock)
    prod_settings = [
        {"id": "woocommerce_weight_unit", "value": "kg"},
        {"id": "woocommerce_dimension_unit", "value": "cm"},
        {"id": "woocommerce_manage_stock", "value": "yes"},
        {"id": "woocommerce_hide_out_of_stock_items", "value": "no"}
    ]

    for item in prod_settings:
        s_id = item["id"]
        val = item["value"]
        try:
            res = wp_api_request(f"wc/v3/settings/products/{s_id}", method="PUT", data={"value": val})
            print(f"Set Products [{s_id}] = {val} -> SUCCESS")
        except Exception as e:
            print(f"Failed setting [{s_id}]: {e}")

    print("\nWooCommerce Store Configuration Applied Successfully!")
    return True

if __name__ == '__main__':
    configure_store()
