"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Flame } from "lucide-react";
import { StoreApiProduct } from "../../lib/woocommerce/types";
import { ProductCard } from "../product/ProductCard";

interface CombosSectionProps {
  products: StoreApiProduct[];
}

export const CombosSection: React.FC<CombosSectionProps> = ({ products }) => {
  const combos = products.filter(
    (p) => p.type === "combo" || p.slug.includes("combo")
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-korigo-lightGreen/20 to-white relative overflow-hidden border-b border-gray-100">
      {/* 3D Background Decorative Floating Accents */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-korigo-green/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* CRO Promo Highlight Strip */}
        <div className="mb-10 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-[#3a794a] via-[#467655] to-[#528663] text-white shadow-xl shadow-[#3a794a]/15 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/20">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300 flex-shrink-0 border border-white/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs uppercase font-black tracking-widest text-amber-300">
                  Value Saver Dual-Packs
                </span>
                <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Save 20%
                </span>
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-white">
                Double The Flavour • Save ₹40 On Every Combo Pack
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-100 font-serif hidden sm:inline">
              🚚 Buy any 3 combos to get automatic FREE Pan-India Shipping
            </span>
            <Link
              href="/shop?category=combos"
              className="px-5 py-2.5 rounded-xl bg-white text-[#3a794a] hover:bg-neutral-50 font-bold font-serif text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Explore Combos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-200/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-korigo-green font-bold text-xs uppercase tracking-widest mb-1.5 font-serif">
              <Flame className="w-4 h-4 text-korigo-green" />
              <span>Crowd-Favorite Multi-Packs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black tracking-tight">
              Hand-Crafted Dual-Flavour Combos
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-serif mt-1">
              Curated pairings of complementary roasted makhana flavours designed for discerning snack lovers.
            </p>
          </div>
          <Link
            href="/shop?category=combos"
            className="text-sm font-bold text-korigo-darkGreen hover:text-korigo-green inline-flex items-center gap-1.5 font-serif group"
          >
            <span>View All 6 Combos (70g)</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Combos Grid with 3D TiltCards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {combos.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
