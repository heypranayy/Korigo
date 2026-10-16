import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getStoreProducts } from "../../lib/woocommerce/storeApi";
import { ShopCatalog } from "../../components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop All Flavours & Value Combos",
  description:
    "Explore our complete range of slow-roasted flavoured makhana pops and value bundles. High protein, gluten-free, and guilt-free snacking.",
  openGraph: {
    title: "Shop All Snacks | Korigo Snacks",
    description: "Crunch into all 6 delicious flavours and 6 value combos.",
  },
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getStoreProducts();

  return (
    <div className="py-10 md:py-16 bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
            Roasted • Non-Fried • Plant Protein
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-3">
            Shop All Snacks
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Discover our entire collection of crunchy slow-roasted makhana pops. From tangy citrus to fiery sriracha and rich chocolate, find your signature crunch.
          </p>
        </div>

        {/* Catalog */}
        <Suspense fallback={<div className="text-center py-12 font-serif">Loading catalog...</div>}>
          <ShopCatalog products={products} />
        </Suspense>
      </div>
    </div>
  );
}
