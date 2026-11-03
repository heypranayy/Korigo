"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Flame, Heart, ArrowRight } from "lucide-react";
import { StoreApiProduct } from "../../lib/woocommerce/types";
import { ProductCard } from "../product/ProductCard";

interface SingleFlavoursSectionProps {
  products: StoreApiProduct[];
}

export const SingleFlavoursSection: React.FC<SingleFlavoursSectionProps> = ({ products }) => {
  const singles = products.filter(
    (p) => p.type !== "combo" && !p.slug.includes("combo")
  );

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-korigo-lightGreen text-korigo-darkGreen text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 border border-korigo-green/20">
            <Sparkles className="w-3.5 h-3.5 text-korigo-green" />
            <span>100% Roasted Superfood Snack</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-black mb-2.5 leading-tight">
            Crunch Into Korigo <span className="text-korigo-green">Signature Flavours</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed font-serif">
            Explore our 6 signature flavours of 100% slow-roasted makhana pops tossed in authentic spices for daily healthy crunch.
          </p>
        </div>

        {/* Clean Grid View of Flavours */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10">
          {singles.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore All Flavours Button Below the Grid */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <Link
            href="/shop"
            className="btn-korigo-primary text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 font-serif flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
          >
            <span>Explore All Flavours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Superfood Benefits Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 hover:border-[#528663] shadow-sm transition-all duration-200 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 leading-snug">
                100% Slow-Roasted
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Never fried. Gently slow-roasted over low heat for crispness with 0% palm oil.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 hover:border-[#528663] shadow-sm transition-all duration-200 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 leading-snug">
                High Plant Protein
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Provides nearly 10g natural plant protein per 100g for sustained fullness.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 hover:border-[#528663] shadow-sm transition-all duration-200 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 leading-snug">
                Heart & Low GI
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Naturally low in sodium, zero cholesterol, and low glycemic load for smart snacking.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 hover:border-[#528663] shadow-sm transition-all duration-200 group flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#eef5f0] border border-[#528663]/30 flex items-center justify-center text-[#528663] mb-2.5 sm:mb-3.5">
                <span className="text-base sm:text-lg">🌿</span>
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-black mb-1 leading-snug">
                Zero Palm Oil
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-serif">
                Clean ingredients only. Free from hydrogenated fats, trans-fat, and chemical fillers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
