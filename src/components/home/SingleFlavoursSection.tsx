"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Flame, Heart, ShieldCheck, ArrowRight, LayoutGrid, Layers } from "lucide-react";
import { StoreApiProduct } from "../../lib/woocommerce/types";
import { ProductCard } from "../product/ProductCard";
import { Makhana3DCardDeck } from "./Makhana3DCardDeck";
import { soundFx } from "../../lib/audio/soundEffects";

interface SingleFlavoursSectionProps {
  products: StoreApiProduct[];
}

export const SingleFlavoursSection: React.FC<SingleFlavoursSectionProps> = ({ products }) => {
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");

  const singles = products.filter(
    (p) => p.type !== "combo" && !p.slug.includes("combo")
  );

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-korigo-lightGreen/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial Story Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-korigo-lightGreen text-korigo-darkGreen text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 border border-korigo-green/20">
            <Sparkles className="w-3.5 h-3.5 text-korigo-green" />
            <span>100% Roasted Superfood Snack</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-black mb-2.5 leading-tight">
            Crunch Into Korigo <span className="text-korigo-green">Signature Flavours</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-serif max-w-2xl mx-auto">
            Makhana is the no-kernel superfood pop you will fall in love with. Slow-roasted to crunchy perfection and coated in authentic spices, every bite provides dietary fibre, plant protein, and antioxidants with zero cholesterol.
          </p>

          {/* View Mode Toggle: 3D Game Deck vs Grid */}
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 bg-gray-100 rounded-full border border-gray-200 text-xs font-serif shadow-inner">
              <button
                onClick={() => {
                  setViewMode("deck");
                  soundFx.playPop();
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold transition-all duration-200 text-xs ${
                  viewMode === "deck"
                    ? "bg-[#528663] text-white shadow-md shadow-[#528663]/30 scale-102"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span>🎮 3D Deck</span>
              </button>
              <button
                onClick={() => {
                  setViewMode("grid");
                  soundFx.playPop();
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold transition-all duration-200 text-xs ${
                  viewMode === "grid"
                    ? "bg-[#528663] text-white shadow-md shadow-[#528663]/30 scale-102"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-emerald-300" />
                <span>▦ Grid View</span>
              </button>
            </div>

            <Link
              href="/shop?category=flavours"
              className="btn-korigo-primary text-xs uppercase tracking-wider px-5 py-2 font-serif hidden sm:flex items-center gap-1.5"
            >
              <span>Explore All (35g)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3D Game Card Deck vs 6 Singles Grid */}
        <div className="mb-8 sm:mb-12">
          {viewMode === "deck" ? (
            <Makhana3DCardDeck />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 animate-in fade-in duration-300">
              {singles.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* 4 Superfood Benefits Grid with Distinct Crisp Borders in Logo Green (2x2 on Mobile, 4 across on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-5 sm:pt-8 border-t border-gray-200">
          <div className="bg-white p-3.5 sm:p-6 rounded-2xl border-2 border-stone-200 hover:border-[#528663] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 group-hover:text-[#528663] transition-colors leading-snug">
                100% Slow-Roasted
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Never fried. Gently slow-roasted over low heat for crispness with 0% palm oil.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-6 rounded-2xl border-2 border-stone-200 hover:border-[#528663] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 group-hover:text-[#528663] transition-colors leading-snug">
                High Plant Protein
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Provides nearly 10g natural plant protein per 100g for sustained fullness.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-6 rounded-2xl border-2 border-stone-200 hover:border-[#528663] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 group-hover:text-[#528663] transition-colors leading-snug">
                Heart & Low GI
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Naturally low in sodium, zero cholesterol, and low glycemic load for smart snacking.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-6 rounded-2xl border-2 border-stone-200 hover:border-[#528663] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 group-hover:text-[#528663] transition-colors leading-snug">
                Clean Ingredients
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Real spices, zero chemical preservatives, no artificial colors, 100% vegetarian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
