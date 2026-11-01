"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Sparkles, Award, ArrowRight } from "lucide-react";

export const SuperfoodComparison: React.FC = () => {
  const comparisonData = [
    {
      metric: "Cooking Method",
      korigo: "100% Slow-Roasted over low flame",
      chips: "Deep-fried in commercial palm oil",
      korigoGood: true,
    },
    {
      metric: "Protein Content (per 100g)",
      korigo: "9.7g Pure Plant Protein",
      chips: "Barely 1.5g – 2.0g Protein",
      korigoGood: true,
    },
    {
      metric: "Fat Content",
      korigo: "80% Less Fat • Zero Trans Fat",
      chips: "Loaded with saturated & trans fats",
      korigoGood: true,
    },
    {
      metric: "Calorie Density",
      korigo: "Light & Airy (~380 kcal / 100g)",
      chips: "Heavy & Greasy (560+ kcal / 100g)",
      korigoGood: true,
    },
    {
      metric: "Oil & Additives",
      korigo: "0% Palm Oil • Natural Indian Spices",
      chips: "Industrial palm oil & synthetic flavours",
      korigoGood: true,
    },
    {
      metric: "Post-Snack Feeling",
      korigo: "Energized, light, and 100% guilt-free",
      chips: "Sluggish, bloated, and regretful",
      korigoGood: true,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#1b3523] via-[#24462f] to-[#162c1d] text-white relative overflow-hidden border-b border-[#2d5539]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Why Smart Snackers Choose Korigo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight">
            Superfood vs. Traditional Fried Chips
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base font-serif leading-relaxed max-w-2xl mx-auto">
            See how Korigo's authentic slow-roasted makhana outperforms old-school fried potato chips in every nutritional category — delivering maximum crunch with zero guilt.
          </p>
        </div>

        {/* Clean Comparison Card (No 3D Tilt) */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-4 sm:p-8 md:p-10 relative overflow-hidden">
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block">
              {/* Card Header Comparison Labels with Authentic Packshots */}
              <div className="grid grid-cols-12 gap-4 pb-6 mb-4 border-b border-white/10 items-end">
                <div className="col-span-4 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans">
                    Nutritional Metric
                  </span>
                </div>

                {/* Korigo Makhana Column Header with Packet */}
                <div className="col-span-4 flex flex-col items-center justify-end text-center">
                  <div className="relative w-28 h-28 mb-2 flex items-center justify-center">
                    <Image
                      src="/assets/korigo/products/transparent_citrus_cartel.webp"
                      alt="Korigo Makhana Superfood Pack"
                      fill
                      className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.4)]"
                      sizes="120px"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#528663] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>Korigo Makhana</span>
                  </div>
                </div>

                {/* Traditional Fried Chips Column Header with Red Packet */}
                <div className="col-span-4 flex flex-col items-center justify-end text-center">
                  <div className="relative w-28 h-28 mb-2 flex items-center justify-center">
                    <Image
                      src="/assets/korigo/general/traditional_fried_chips_red.webp"
                      alt="Traditional Fried Potato Chips"
                      fill
                      className="object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.4)] opacity-90"
                      sizes="120px"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider">
                    <X className="w-3.5 h-3.5 text-red-400" />
                    <span>Traditional Fried Chips</span>
                  </div>
                </div>
              </div>

              {/* Desktop Rows */}
              <div className="space-y-3">
                {comparisonData.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 items-center p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                  >
                    {/* Metric Name */}
                    <div className="col-span-4 font-serif font-semibold text-white text-sm">
                      {row.metric}
                    </div>

                    {/* Korigo Value (Winner) */}
                    <div className="col-span-4 flex items-center justify-center gap-2 text-center bg-[#528663]/25 py-2.5 px-3 rounded-xl border border-[#528663]/40">
                      <div className="w-5 h-5 rounded-full bg-[#528663] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-serif text-xs font-bold text-white">
                        {row.korigo}
                      </span>
                    </div>

                    {/* Regular Chips Value */}
                    <div className="col-span-4 flex items-center justify-center gap-2 text-center bg-red-950/20 py-2.5 px-3 rounded-xl border border-red-500/10">
                      <div className="w-5 h-5 rounded-full bg-red-900/60 text-red-300 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="font-serif text-xs text-neutral-400">
                        {row.chips}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE COMPARISON MATRIX WITH PACKETS */}
            <div className="block md:hidden">
              {/* Mobile Headers with Packets */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-center items-end">
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-1.5 flex items-center justify-center">
                    <Image
                      src="/assets/korigo/products/transparent_citrus_cartel.webp"
                      alt="Korigo Makhana"
                      fill
                      className="object-contain drop-shadow-md"
                      sizes="80px"
                    />
                  </div>
                  <div className="w-full py-1.5 px-2 rounded-xl bg-[#528663] text-white font-serif text-[11px] font-bold shadow-sm flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3] text-amber-300" />
                    <span>Korigo Makhana</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-1.5 flex items-center justify-center">
                    <Image
                      src="/assets/korigo/general/traditional_fried_chips_red.webp"
                      alt="Fried Chips"
                      fill
                      className="object-contain drop-shadow-md opacity-90"
                      sizes="80px"
                    />
                  </div>
                  <div className="w-full py-1.5 px-2 rounded-xl bg-white/10 text-neutral-300 font-serif text-[11px] font-semibold flex items-center justify-center gap-1">
                    <X className="w-3.5 h-3.5 text-red-400" />
                    <span>Fried Chips</span>
                  </div>
                </div>
              </div>

              {/* Mobile Comparative Rows */}
              <div className="space-y-2">
                {comparisonData.map((row, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="text-[10px] font-mono uppercase font-bold text-amber-300/90 text-center mb-1.5 tracking-wider">
                      {row.metric}
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-stretch">
                      <div className="p-2 rounded-lg bg-[#528663]/25 border border-[#528663]/40 flex items-center gap-1.5 text-left">
                        <Check className="w-3 h-3 stroke-[3] text-[#68a07a] flex-shrink-0" />
                        <span className="font-serif text-[11px] font-bold text-white leading-tight">
                          {row.korigo}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900/50 border border-neutral-700/30 flex items-center gap-1.5 text-left">
                        <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span className="font-serif text-[11px] text-neutral-400 leading-tight">
                          {row.chips}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA Row */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-white">
                  100% Roasted Superfood • Zero Guilt
                </h4>
                <p className="text-[11px] text-gray-400 font-serif">
                  Switch from oily fried chips to crisp, gourmet flavoured makhana.
                </p>
              </div>

              <Link
                href="/shop"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:brightness-110 font-bold font-serif text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Shop Healthy Makhana</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
