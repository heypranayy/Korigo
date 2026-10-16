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
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-korigo-lightGreen/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial Story Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-korigo-lightGreen text-korigo-darkGreen text-xs font-bold uppercase tracking-widest mb-3 border border-korigo-green/20">
            <Sparkles className="w-3.5 h-3.5 text-korigo-green" />
            <span>100% Roasted Superfood Snack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-black mb-4 leading-tight">
            Crunch Into Korigo <span className="text-korigo-green">Signature Flavours</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-serif">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                  viewMode === "deck"
                    ? "bg-black text-white shadow-md scale-102"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span>🎮 3D Card Deck</span>
              </button>
              <button
                onClick={() => {
                  setViewMode("grid");
                  soundFx.playPop();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-black text-white shadow-md scale-102"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-emerald-400" />
                <span>▦ Grid View</span>
              </button>
            </div>

            <Link
              href="/shop?category=flavours"
              className="btn-korigo-primary text-xs uppercase tracking-wider px-6 py-2.5 font-serif hidden sm:flex items-center gap-2"
            >
              <span>Explore All (35g)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3D Game Card Deck vs 6 Singles Grid */}
        <div className="mb-16">
          {viewMode === "deck" ? (
            <Makhana3DCardDeck />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 animate-in fade-in duration-300">
              {singles.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* 4 Superfood Benefits Grid with 3D Hover Depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-gray-200">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 hover:border-korigo-green shadow-sm hover:shadow-xl hover:shadow-korigo-green/10 transition-all duration-300 group -translate-y-0 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-korigo-lightGreen flex items-center justify-center text-korigo-green mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-black mb-1 group-hover:text-korigo-green transition-colors">
              100% Slow-Roasted
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-serif">
              Never fried. Gently slow-roasted over low heat to lock in natural crispiness without greasy palm oils.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 hover:border-korigo-green shadow-sm hover:shadow-xl hover:shadow-korigo-green/10 transition-all duration-300 group -translate-y-0 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-korigo-lightGreen flex items-center justify-center text-korigo-green mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-black mb-1 group-hover:text-korigo-green transition-colors">
              High Plant Protein
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-serif">
              Provides nearly 10g of natural plant-based protein per 100g, supporting sustained energy and healthy fullness.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 hover:border-korigo-green shadow-sm hover:shadow-xl hover:shadow-korigo-green/10 transition-all duration-300 group -translate-y-0 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-korigo-lightGreen flex items-center justify-center text-korigo-green mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-black mb-1 group-hover:text-korigo-green transition-colors">
              Heart-Friendly & Low GI
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-serif">
              Naturally low in sodium, zero cholesterol, and low glycemic load — the ideal smart snack for active lifestyles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 hover:border-korigo-green shadow-sm hover:shadow-xl hover:shadow-korigo-green/10 transition-all duration-300 group -translate-y-0 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-korigo-lightGreen flex items-center justify-center text-korigo-green mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-black mb-1 group-hover:text-korigo-green transition-colors">
              Clean Ingredients
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-serif">
              Real spices, no chemical preservatives, no artificial food colors, and 100% vegetarian goodness in every pack.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
