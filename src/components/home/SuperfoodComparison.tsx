"use client";

import React from "react";
import Link from "next/link";
import { Check, X, Sparkles, Flame, ShieldAlert, Award, ArrowRight } from "lucide-react";
import { TiltCard3D } from "../ui/TiltCard3D";

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
    <section className="content-auto py-10 sm:py-16 md:py-20 bg-gradient-to-b from-[#1b3523] via-[#24462f] to-[#162c1d] text-white relative overflow-hidden border-b border-[#2d5539]">
      {/* 3D Atmospheric Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial Heading */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Why Smart Snackers Choose Korigo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight">
            Roasted Foxnut Superfood vs. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
              Traditional Fried Chips
            </span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base font-serif leading-relaxed max-w-2xl mx-auto">
            See how Korigo's authentic slow-roasted makhana outperforms old-school fried snacks in every nutritional category — delivering maximum crunch with zero guilt.
          </p>
        </div>

        {/* 3D Elevated Comparison Matrix */}
        <div className="max-w-5xl mx-auto">
          <TiltCard3D maxTilt={4} scale={1.01} className="w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-8 md:p-10 relative overflow-hidden">
              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block">
                {/* Card Header Comparison Labels */}
                <div className="grid grid-cols-12 gap-4 pb-4 mb-4 border-b border-white/10 items-center">
                  <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-amber-300 font-sans">
                    Nutritional Metric
                  </div>
                  <div className="col-span-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#528663] to-[#416f4f] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>Korigo Makhana</span>
                    </div>
                  </div>
                  <div className="col-span-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                      <span>Fried Chips</span>
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

                      {/* Korigo Value (Winner in Logo Green) */}
                      <div className="col-span-4 flex items-center justify-center gap-2 text-center bg-[#528663]/20 py-2 px-3 rounded-xl border border-[#528663]/40">
                        <div className="w-5 h-5 rounded-full bg-[#528663] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-serif text-xs font-bold text-white">
                          {row.korigo}
                        </span>
                      </div>

                      {/* Regular Chips Value (Deficit) */}
                      <div className="col-span-4 flex items-center justify-center gap-2 text-center bg-red-950/20 py-2 px-3 rounded-xl border border-red-500/10">
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

              {/* MOBILE OPTIMIZED COMPARISON MATRIX (Crisp, Soothing, Side-by-Side in Logo Green) */}
              <div className="block md:hidden">
                {/* Mobile Column Headers */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-center">
                  <div className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#528663] to-[#416f4f] text-white font-serif text-[11px] font-bold shadow-sm flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3] text-amber-300" />
                    <span>Korigo Makhana</span>
                  </div>
                  <div className="py-2 px-2.5 rounded-xl bg-white/10 text-neutral-400 font-serif text-[11px] font-semibold flex items-center justify-center gap-1">
                    <X className="w-3.5 h-3.5 text-red-400" />
                    <span>Fried Chips</span>
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

              {/* Bottom 3D CRO Guarantee Footer */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-center sm:text-left">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-white">
                      100% Satisfaction Guarantee
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Loved by 2,800+ health enthusiasts across India.
                    </p>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:brightness-110 font-bold font-serif text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Experience The Crunch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </div>
    </section>
  );
};
