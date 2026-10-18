"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqSchema } from "../../lib/schema";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = faqSchema.mainEntity.map((item) => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  }));

  return (
    <section id="faq" className="py-8 sm:py-12 md:py-16 bg-white">
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
