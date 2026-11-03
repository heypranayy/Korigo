"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Utensils, Clock, CheckCircle, ChevronDown } from "lucide-react";

interface Recipe {
  name: string;
  image?: string;
  ingredients: string;
  instructions: string;
}

interface RecipeGuideSectionProps {
  recipes: Recipe[];
  flavourName: string;
}

export const RecipeGuideSection: React.FC<RecipeGuideSectionProps> = ({
  recipes,
  flavourName,
}) => {
  // Mobile accordion state: first recipe (index 0) open by default, others closed
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!recipes || recipes.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const cleanName =
    flavourName
      .replace(/Korigo\s*Pops/i, "")
      .replace(/Flavoured.*$/i, "")
      .replace(/Foxnuts.*$/i, "")
      .replace(/\|\s*Spicy.*$/i, "")
      .replace(/\|\s*35g.*$/i, "")
      .trim() || flavourName;

  return (
    <section className="py-10 md:py-16 pb-16 md:pb-20 border-t border-gray-100 bg-[#fafafa] -mx-4 md:-mx-8 px-4 md:px-8 mt-10 md:mt-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 text-korigo-green font-bold text-xs uppercase tracking-wider mb-2 font-serif">
            <Utensils className="w-4 h-4" />
            <span>Chef&apos;s Inspiration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-2">
            Our Favorite Recipes with {cleanName}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-serif">
            Makhana isn&apos;t just for snacking out of the bag. Elevate everyday dishes with signature crunchy toppings.
          </p>
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW: Compact Accordion (1 open by default, others closed) */}
        {/* ============================================================== */}
        <div className="md:hidden space-y-3">
          {recipes.map((r, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm transition-all"
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(i)}
                  className="w-full p-4 flex items-center justify-between text-left gap-3 select-none hover:bg-gray-50/70 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-korigo-lightGreen text-korigo-darkGreen text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Recipe #{i + 1}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Clock className="w-3 h-3" /> 5-10 Mins
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-black truncate">
                      {r.name}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-korigo-lightGreen text-korigo-darkGreen" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-100 animate-fadeIn">
                    {/* Recipe Image */}
                    {r.image && (
                      <div className="relative aspect-video w-full rounded-xl bg-gray-100 overflow-hidden mb-3.5 shadow-inner">
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    )}

                    {/* Ingredients */}
                    <div className="mb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Ingredients:
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed font-serif">
                        {r.ingredients}
                      </p>
                    </div>

                    {/* Instructions */}
                    <div className="mb-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Preparation:
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-serif">
                        {r.instructions}
                      </p>
                    </div>

                    {/* Superfood Garnish Badge */}
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 mt-2">
                      <CheckCircle className="w-3.5 h-3.5 text-korigo-green flex-shrink-0" />
                      <span>Superfood Crunch Garnish</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW: Full 3-Card Grid Layout */}
        {/* ============================================================== */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {recipes.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Recipe Image */}
                {r.image && (
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-korigo-lightGreen text-korigo-darkGreen text-[11px] font-bold px-2 py-0.5 rounded uppercase">
                      Recipe #{i + 1}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock className="w-3 h-3" /> 5-10 Mins
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-black mb-3">
                    {r.name}
                  </h3>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Ingredients:
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-serif">
                      {r.ingredients}
                    </p>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      Preparation:
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-serif">
                      {r.instructions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/80 border-t border-gray-100 text-xs text-korigo-darkGreen font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-korigo-green" />
                <span>Superfood Crunch Garnish</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
