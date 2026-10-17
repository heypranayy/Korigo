"use client";

import React from "react";
import Link from "next/link";
import { Star, CheckCircle, Quote, ThumbsUp } from "lucide-react";
import { TiltCard3D } from "../ui/TiltCard3D";

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: "Rohit Sharma",
      location: "Bengaluru",
      review: "Korigo Snacks are honestly addictive! Super fresh, perfectly crunchy, and not oily at all. You can feel the slow-roasted quality in every single bite. The Garlicked Cheese combo is mind-blowing.",
      rating: 5,
      flavour: "Garlicked Cheese & Citrus Cartel Combo",
      date: "Verified Buyer • 2 days ago",
    },
    {
      name: "Ananya Sen",
      location: "Kolkata",
      review: "Tried Korigo for the first time with our evening chai. The Sour Crème d' Onion is balanced so well — not too spicy, yet bursting with flavour. My kids love it too!",
      rating: 5,
      flavour: "Sour Crème d' Onion (35g)",
      date: "Verified Buyer • 4 days ago",
    },
    {
      name: "Amit Verma",
      location: "Mumbai",
      review: "Very premium feel compared to regular supermarket snacks. Clean taste, zero greasy feeling on the fingers, and feels remarkably light on the stomach. 10/10 recommendation.",
      rating: 5,
      flavour: "Sassy Sriracha Combo",
      date: "Verified Buyer • 1 week ago",
    },
    {
      name: "Priya Malhotra",
      location: "New Delhi",
      review: "Finally a healthy snack brand that doesn't compromise on taste! Love that it's 100% roasted with no palm oil. Cinnamon Drip is my go-to post-workout sweet craving fix.",
      rating: 5,
      flavour: "Cinnamon Drip (35g)",
      date: "Verified Buyer • 1 week ago",
    },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-[#faf8f5] relative overflow-hidden border-b border-gray-100">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        {/* Header with CRO Rating Badge */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            <div className="flex gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span>4.9 / 5.0 Rating • 2,840+ Verified Reviews</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black mb-2.5">
            Loved By Healthy Foodies
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base font-serif max-w-lg mx-auto">
            Discover why health-conscious snackers across India choose Korigo over ordinary fried snacks.
          </p>
        </div>

        {/* 4 Reviews with 3D TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {reviews.map((r, i) => (
            <TiltCard3D key={i} maxTilt={4} scale={1.02} className="h-full">
              <div className="bg-white p-5 sm:p-7 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between h-full relative group">
                <Quote className="absolute top-4 right-4 w-7 h-7 text-amber-500/15 group-hover:text-amber-500/30 transition-colors" />

                <div>
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-400 mb-2.5">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-xs sm:text-sm font-serif italic leading-relaxed mb-3.5">
                    "{r.review}"
                  </p>
                </div>

                {/* Author & Flavour Badge */}
                <div className="pt-3 border-t border-gray-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-xs sm:text-sm text-black">{r.name}</p>
                    <span className="text-[10px] sm:text-[11px] text-gray-400">{r.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-700 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{r.date}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 truncate font-mono pt-0.5">
                    Purchased: {r.flavour}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>

        {/* Social Proof Stats Banner in Brand Logo Green */}
        <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#3e6b4c] via-[#528663] to-[#3e6b4c] text-white shadow-xl shadow-[#528663]/20 flex flex-wrap items-center justify-around gap-4 sm:gap-6 mb-8 sm:mb-10 border border-[#6ea680]/50">
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-black font-serif text-white mb-0.5">
              50,000+
            </div>
            <div className="text-[10px] sm:text-xs text-amber-200/80 font-serif uppercase tracking-wider">
              Bags Dispatched
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-black font-serif text-amber-400 mb-0.5">
              4.9 ★
            </div>
            <div className="text-[10px] sm:text-xs text-amber-200/80 font-serif uppercase tracking-wider">
              Customer Satisfaction
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-black font-serif text-white mb-0.5">
              100%
            </div>
            <div className="text-[10px] sm:text-xs text-amber-200/80 font-serif uppercase tracking-wider">
              Slow-Roasted in India
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-black font-serif text-white mb-0.5">
              0%
            </div>
            <div className="text-[10px] sm:text-xs text-amber-200/80 font-serif uppercase tracking-wider">
              Palm Oil & Trans Fat
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/reviews-form"
            className="btn-korigo-primary text-xs uppercase tracking-wider px-8 py-3.5 font-serif"
          >
            Leave Your Customer Review
          </Link>
        </div>
      </div>
    </section>
  );
};
