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
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#04260c] via-korigo-deepForest to-[#031c09] text-white relative overflow-hidden">
      {/* 3D Atmospheric Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-korigo-green/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-korigo-green/20 border border-korigo-emerald/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Why Smart Snackers Choose Korigo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Roasted Foxnut Superfood vs. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-100 to-green-400">
              Traditional Fried Chips
            </span>
          </h2>
          <p className="text-emerald-100/80 text-sm md:text-base font-serif leading-relaxed">
            See how Korigo's authentic slow-roasted makhana outperforms old-school fried snacks in every nutritional category — delivering maximum crunch with zero guilt.
          </p>
        </div>

        {/* 3D Elevated Comparison Matrix */}
        <div className="max-w-5xl mx-auto">
          <TiltCard3D maxRotation={6} scale={1.01} className="w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-korigo-green/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
              {/* Card Header Comparison Labels */}
              <div className="grid grid-cols-12 gap-4 pb-6 mb-6 border-b border-white/10 items-center">
                <div className="col-span-4 sm:col-span-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300 font-sans">
                  Nutritional Metric
                </div>
                <div className="col-span-4 sm:col-span-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-korigo-green text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-korigo-green/30">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>Korigo Makhana</span>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                    <span>Fried Chips</span>
                  </div>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-4">
                {comparisonData.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 items-center p-3.5 sm:p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                  >
                    {/* Metric Name */}
                    <div className="col-span-4 sm:col-span-4 font-serif font-semibold text-white text-xs sm:text-sm">
                      {row.metric}
                    </div>

                    {/* Korigo Value (Winner) */}
                    <div className="col-span-4 sm:col-span-4 flex items-center justify-center gap-2 text-center bg-korigo-green/15 py-2.5 px-3 rounded-xl border border-korigo-green/30">
                      <div className="w-5 h-5 rounded-full bg-korigo-green text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="font-serif text-xs sm:text-sm font-bold text-emerald-200">
                        {row.korigo}
                      </span>
                    </div>

                    {/* Regular Chips Value (Deficit) */}
                    <div className="col-span-4 sm:col-span-4 flex items-center justify-center gap-2 text-center bg-red-950/20 py-2.5 px-3 rounded-xl border border-red-500/10">
                      <div className="w-5 h-5 rounded-full bg-red-900/60 text-red-300 flex items-center justify-center flex-shrink-0">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="font-serif text-xs sm:text-sm text-neutral-400">
                        {row.chips}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom 3D CRO Guarantee Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      100% Satisfaction Guarantee
                    </h4>
                    <p className="text-xs text-emerald-200/70">
                      Loved by 2,800+ health enthusiasts across India.
                    </p>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-korigo-green text-black hover:text-white font-bold font-serif text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Experience The Crunch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </div>
    </section>
  );
};
