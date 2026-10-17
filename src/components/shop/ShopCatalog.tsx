"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { StoreApiProduct } from "../../lib/woocommerce/types";
import { ProductCard } from "../product/ProductCard";
import { formatStorePrice } from "../../lib/woocommerce/storeApi";
import { SlidersHorizontal } from "lucide-react";

interface ShopCatalogProps {
  products: StoreApiProduct[];
  initialCategory?: string;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({ products, initialCategory }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || initialCategory || "all";

  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory === "flavours") {
      list = list.filter((p) => p.type !== "combo" && !p.slug.includes("combo"));
    } else if (activeCategory === "combos") {
      list = list.filter((p) => p.type === "combo" || p.slug.includes("combo"));
    }

    // Sort
    if (sortBy === "price-low") {
      list.sort((a, b) => parseFloat(formatStorePrice(a.prices.price)) - parseFloat(formatStorePrice(b.prices.price)));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => parseFloat(formatStorePrice(b.prices.price)) - parseFloat(formatStorePrice(a.prices.price)));
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <div className="space-y-8">
      {/* Category Tabs & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-2 sm:pb-0">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 text-xs font-serif uppercase tracking-wider font-semibold rounded-full transition ${
              activeCategory === "all"
                ? "bg-[#528663] text-white shadow-md shadow-[#528663]/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Snacks ({products.length})
          </button>
          <button
            onClick={() => setActiveCategory("flavours")}
            className={`px-5 py-2 text-xs font-serif uppercase tracking-wider font-semibold rounded-full transition ${
              activeCategory === "flavours"
                ? "bg-[#528663] text-white shadow-md shadow-[#528663]/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Individual Flavours (6)
          </button>
          <button
            onClick={() => setActiveCategory("combos")}
            className={`px-5 py-2 text-xs font-serif uppercase tracking-wider font-semibold rounded-full transition ${
              activeCategory === "combos"
                ? "bg-[#528663] text-white shadow-md shadow-[#528663]/30"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Value Combos (6)
          </button>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-serif">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-serif bg-gray-50 border border-gray-200 rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-korigo-green"
          >
            <option value="featured">Featured Collection</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Alphabetically: A-Z</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 font-serif text-base">No products match this selection.</p>
        </div>
      )}
    </div>
  );
};
