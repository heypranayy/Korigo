"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "../../components/product/ProductCard";
import catalogData from "../../../crawl_data/full_catalog_extracted.json";
import { StoreApiProduct } from "../../lib/woocommerce/types";
import { formatStorePrice } from "../../lib/woocommerce/storeApi";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const allProducts: StoreApiProduct[] = useMemo(() => {
    return (catalogData as any[]).map((p, idx) => {
      const isCombo = p.product_type === "combo";
      const regular = isCombo ? "19900" : "9900";
      const sale = isCombo ? "15900" : "";
      const isSoldOut = p.handle === "coco-world-makhana";

      return {
        id: 122 + idx,
        name: p.title,
        slug: p.handle,
        parent: 0,
        type: isCombo ? "combo" : "simple",
        variation: "",
        permalink: `/products/${p.handle}`,
        sku: `KRG-${p.handle.toUpperCase().replace(/-/g, "_")}`,
        short_description: p.description?.slice(0, 160) || "",
        description: p.description || "",
        on_sale: isCombo,
        prices: {
          price: sale || regular,
          regular_price: regular,
          sale_price: sale,
          price_range: null,
          currency_code: "INR",
          currency_symbol: "₹",
          currency_minor_unit: 2,
          currency_decimal_separator: ".",
          currency_thousand_separator: ",",
          currency_prefix: "₹",
          currency_suffix: "",
        },
        price_html: "",
        average_rating: "5.0",
        review_count: 12,
        images: (p.images || []).map((imgUrl: string, imgIdx: number) => ({
          id: 1000 + imgIdx,
          src: imgUrl,
          thumbnail: imgUrl,
          srcset: "",
          sizes: "",
          name: p.title,
          alt: p.title,
        })),
        categories: [
          {
            id: isCombo ? 17 : 16,
            name: isCombo ? "Value Combos" : "Individual Flavours",
            slug: isCombo ? "combos" : "flavours",
            link: `/shop?category=${isCombo ? "combos" : "flavours"}`,
          },
        ],
        tags: [],
        attributes: [
          {
            id: 1,
            name: "Pack Size",
            taxonomy: null,
            has_variations: false,
            terms: [{ id: 1, name: isCombo ? "2 x 35g (70g)" : "35g", slug: isCombo ? "combo-pack" : "single-pack" }],
          },
        ],
        variations: [],
        has_options: false,
        is_purchasable: !isSoldOut,
        is_in_stock: !isSoldOut,
        is_on_backorder: false,
        low_stock_remaining: null,
        sold_individually: false,
        quantity_limit: 10,
        add_to_cart: {
          text: isSoldOut ? "Sold Out" : "Add to cart",
          description: "",
          url: "",
          minimum: 1,
          maximum: 10,
          multiple_of: 1,
        },
      };
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [allProducts, query]);

  return (
    <div className="py-12 md:py-20 bg-white min-h-[70vh]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-3">
            Search Our Site
          </h1>
          <p className="text-gray-500 text-sm font-serif mb-6">
            Find your favourite slow-roasted flavoured makhana snack or combo bundle.
          </p>

          {/* Search Box */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search flavours (e.g. Sriracha, Cheese, Coco, Combo)..."
              className="w-full text-sm font-serif p-3.5 pl-11 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-korigo-green shadow-sm"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-black p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-serif">
            <span className="text-gray-400">Popular:</span>
            {["Sriracha", "Cheese", "Citrus", "Chocolate", "Combo", "Cinnamon", "Onion"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="pb-4 mb-6 border-b border-gray-100 flex items-center justify-between text-xs font-serif text-gray-500">
          <span>
            Showing {results.length} {results.length === 1 ? "product" : "products"} {query && `for "${query}"`}
          </span>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 font-serif text-base">
              No matching snacks found for "{query}". Try checking your spelling or search for another flavour.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
