"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makhana flavours does Korigo offer?",
      a: "Korigo offers six delicious different flavours of makhana: Citrus Cartel, Coco Island, Sour Crème d' Onion, Garlicked Cheese, Cinnamon Drip, and Sassy Sriracha, available as single 35g packs and curated 70g value combos.",
    },
    {
      q: "Is Korigo makhana roasted or fried?",
      a: "Korigo makhanas are 100% slow-roasted over low flame to get their authentic crispy crunch without deep frying or excess oils.",
    },
    {
      q: "What is the nutritional value of Korigo's flavoured makhana?",
      a: "Korigo’s flavoured makhanas are rich in all-natural protein (~9.7g per 100g), high dietary fibre, and vital plant antioxidants with zero trans fats and zero cholesterol.",
    },
    {
      q: "What makes Korigo's makhana online purchase experience different?",
      a: "Korigo’s online purchase experience is different because, along with thorough product details and nutrition panels, you also get full allergen declarations and our favourite culinary recipe guides.",
    },
    {
      q: "Is makhana a healthy daily snack?",
      a: "Absolutely. Makhana is a proven ayurvedic superfood and an exceptionally healthy option as a daily snack for work breaks, tea time, and late-night cravings.",
    },
    {
      q: "Can I buy different makhana flavours in a single order?",
      a: "Absolutely. You can buy individual flavours and curated dual-pack combos in a single order with fast domestic dispatch across India.",
    },
    {
      q: "Is Korigo flavoured makhana safe for kids?",
      a: "Yes, the 100% natural ingredients, plant protein, and slow-roasted processing make Korigo flavoured makhana safe and nutritious for kids.",
    },
    {
      q: "Can diabetic people eat flavoured makhana?",
      a: "Makhanas have a low glycemic index and are widely recognized as a healthy snack replacement for diabetic individuals. Korigo enhances the taste using authentic seasonings without artificial syrups.",
    },
    {
      q: "What is the shelf life of Korigo-flavoured makhana?",
      a: "The shelf life of Korigo-Flavoured Makhana is 8 months from the date of manufacture when stored in a cool, dry place.",
    },
    {
      q: "Is Korigo flavoured makhana good for weight loss?",
      a: "Yes, because of its high fibre and protein content, makhana promotes satiety and keeps you feeling full longer with significantly fewer calories than potato chips.",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-korigo-darkGreen font-bold text-[11px] sm:text-xs uppercase tracking-widest block mb-1.5 font-serif">
            Got Questions? We Have Answers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black mb-2">
            FAQs (Frequently Asked Questions)
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">
            Everything you need to know about Korigo roasted makhana, ordering, and nutrition.
          </p>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-4 py-2 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-base md:text-lg text-black group-hover:text-korigo-green transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 group-hover:text-korigo-green transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-korigo-green" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-2 pb-4 text-sm text-gray-600 leading-relaxed font-serif animate-in fade-in-50 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
