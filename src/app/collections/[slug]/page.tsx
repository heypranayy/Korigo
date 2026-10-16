import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoreProducts } from "../../../lib/woocommerce/storeApi";
import { ShopCatalog } from "../../../components/shop/ShopCatalog";

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const isCombo = params.slug.includes("combo");
  const title = isCombo ? "Value Combos Collection" : "Individual Flavours Collection";
  return {
    title: `${title} | Korigo Snacks`,
    description: `Shop our authentic ${title.toLowerCase()} made from roasted makhana pops.`,
  };
}

export const revalidate = 60;

export default async function CollectionPage({ params }: CollectionPageProps) {
  const products = await getStoreProducts();
  const slug = params.slug.toLowerCase();

  const isCombo = slug.includes("combo");
  const isFlavours = slug.includes("product") || slug.includes("flavour") || slug.includes("single");
  const initialCategory = isCombo ? "combos" : isFlavours ? "flavours" : "all";

  const collectionTitle = isCombo
    ? "Value Combos (2-Packs)"
    : isFlavours
    ? "Individual Flavours (35g)"
    : "Snacks Collection";

  return (
    <div className="py-10 md:py-16 bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
            Curated Collection
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-3">
            {collectionTitle}
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            100% slow-roasted makhana with zero guilt and maximum flavour.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 font-serif">Loading collection...</div>}>
          <ShopCatalog products={products} initialCategory={initialCategory} />
        </Suspense>
      </div>
    </div>
  );
}
