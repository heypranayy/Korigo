"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

export interface NutritionItem {
  nutrient: string;
  per100g: string;
}

export interface RdaItem {
  nutrient: string;
  percent: string;
}

interface ProductDetailsAccordionProps {
  ingredients?: string;
  allergens?: string;
  nutrition?: NutritionItem[] | string;
  rda?: RdaItem[] | string;
  description?: string;
}

export const ProductDetailsAccordion: React.FC<ProductDetailsAccordionProps> = ({
  ingredients,
  allergens,
  nutrition,
  rda,
  description,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    nutrition: true,
    ingredients: true,
    allergens: false,
    about: false,
  });

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Convert per 100g value to per 35g serve
  const calculatePerServe = (per100gVal: string): string => {
    const num = parseFloat(per100gVal);
    if (isNaN(num)) return per100gVal;
    const perServe = num * 0.35;
    return perServe % 1 === 0 ? perServe.toFixed(0) : perServe.toFixed(1);
  };

  const isNutritionArray = Array.isArray(nutrition);
  const isRdaArray = Array.isArray(rda);

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200 my-8">
      {/* 1. About the Product */}
      {description && (
        <div className="py-4">
          <button
            onClick={() => toggle("about")}
            className="w-full flex items-center justify-between text-left py-2 font-serif font-bold text-base md:text-lg text-black hover:text-korigo-green transition"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-korigo-green" />
              <span>About the Product</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openSections.about ? "rotate-180 text-korigo-green" : ""
              }`}
            />
          </button>
          {openSections.about && (
            <div className="pt-2 pb-4 text-sm text-gray-600 font-serif leading-relaxed">
              <p>{description}</p>
            </div>
          )}
        </div>
      )}

      {/* 2. Nutritional Information & % RDA */}
      {(nutrition || rda) && (
        <div className="py-4">
          <button
            onClick={() => toggle("nutrition")}
            className="w-full flex items-center justify-between text-left py-2 font-serif font-bold text-base md:text-lg text-black hover:text-korigo-green transition"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-korigo-green" />
              <span>Nutritional Information & % RDA</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openSections.nutrition ? "rotate-180 text-korigo-green" : ""
              }`}
            />
          </button>
          {openSections.nutrition && (
            <div className="pt-2 pb-4 space-y-4 text-sm font-serif">
              {/* Nutritional Facts Table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-[#f8fdf9] border-b border-gray-200">
                    <tr>
                      <th className="p-3 font-serif font-bold text-black">Nutritional Facts (Approx.)</th>
                      <th className="p-3 font-serif font-bold text-black">Per 100g</th>
                      <th className="p-3 font-serif font-bold text-korigo-green">Per Serve (35g)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {isNutritionArray && (nutrition as NutritionItem[]).length > 0 ? (
                      (nutrition as NutritionItem[]).map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50">
                          <td className="p-2.5 font-medium text-gray-800">{row.nutrient}</td>
                          <td className="p-2.5 text-gray-600">{row.per100g}</td>
                          <td className="p-2.5 font-semibold text-korigo-darkGreen">
                            {calculatePerServe(row.per100g)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td className="p-2.5">Energy (kcal)</td>
                          <td className="p-2.5">440.3</td>
                          <td className="p-2.5 font-semibold text-korigo-green">154.1</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">Protein (g)</td>
                          <td className="p-2.5 font-semibold text-korigo-green">7.8</td>
                          <td className="p-2.5 font-semibold text-korigo-green">2.7</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">Total Carbohydrate (g)</td>
                          <td className="p-2.5">74.60</td>
                          <td className="p-2.5">26.1</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">Total Fat (g)</td>
                          <td className="p-2.5">13.30</td>
                          <td className="p-2.5">4.7</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">Trans Fat (g)</td>
                          <td className="p-2.5">0.0</td>
                          <td className="p-2.5">0.0</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">Dietary Fiber (g)</td>
                          <td className="p-2.5">7.50</td>
                          <td className="p-2.5">2.6</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">Sodium (mg)</td>
                          <td className="p-2.5">908.5</td>
                          <td className="p-2.5">318.0</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* % Contribution to RDA per serve (35g) */}
              <div className="p-3.5 bg-[#f8fdf9] rounded-xl border border-korigo-green/20">
                <div className="flex items-center gap-1.5 font-serif font-bold text-xs uppercase tracking-wider text-korigo-darkGreen mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-korigo-green" />
                  <span>% Contribution to RDA per serve (35g)</span>
                </div>

                {isRdaArray && (rda as RdaItem[]).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs font-serif">
                    {(rda as RdaItem[]).map((r, i) => (
                      <div key={i} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100">
                        <span className="text-gray-600">{r.nutrient}:</span>
                        <span className="font-bold text-korigo-green">{r.percent}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600 leading-relaxed font-serif">
                    Energy: 7.7% • Total Fat: 6.4% • Saturated Fat: 2.0% • Trans Fat: 0.0% • Sodium: 15.9% based on an average adult diet of 2,000 kcal.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. List of Ingredients */}
      {ingredients && (
        <div className="py-4">
          <button
            onClick={() => toggle("ingredients")}
            className="w-full flex items-center justify-between text-left py-2 font-serif font-bold text-base md:text-lg text-black hover:text-korigo-green transition"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-korigo-green" />
              <span>List of Ingredients</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openSections.ingredients ? "rotate-180 text-korigo-green" : ""
              }`}
            />
          </button>
          {openSections.ingredients && (
            <div className="pt-2 pb-4 text-xs sm:text-sm text-gray-700 font-serif leading-relaxed">
              <div className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-200">
                <p>{ingredients}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Allergen Declaration */}
      {allergens && (
        <div className="py-4">
          <button
            onClick={() => toggle("allergens")}
            className="w-full flex items-center justify-between text-left py-2 font-serif font-bold text-base md:text-lg text-black hover:text-korigo-green transition"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Allergen Declaration</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openSections.allergens ? "rotate-180 text-korigo-green" : ""
              }`}
            />
          </button>
          {openSections.allergens && (
            <div className="pt-2 pb-4 text-xs sm:text-sm text-gray-600 font-serif leading-relaxed">
              <p className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 font-medium">
                {allergens}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
