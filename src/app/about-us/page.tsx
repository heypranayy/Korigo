import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/image";
import { Certifications } from "../../components/home/Certifications";
import { Sparkles, Heart, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — The Story Behind Korigo Snacks",
  description:
    "Learn about Korigo Snacks, our founders Sohini Kar & Piya Kar, and our mission to create 100% slow-roasted, non-fried flavoured makhana for guilt-free crunch.",
};

export default function AboutUsPage() {
  return (
    <div className="py-12 md:py-20 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
            Our Heritage & Passion
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">
            About Korigo Snacks
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed font-serif">
            Korigo believes that healthy snacking should never feel boring. Crafted with pure intention, roasted to airy perfection, and seasoned with authentic spices.
          </p>
        </div>

        {/* Our Journey Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-4 font-serif text-gray-700 leading-relaxed text-sm md:text-base">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">Our Journey</h2>
            <p>
              Korigo was born out of a simple observation: modern snack aisles were crowded with deep-fried chips, artificial flavour powders, and sugar-heavy junk. We knew our bodies deserved something wholesome, yet our tastebuds refused to settle for bland diet food.
            </p>
            <p>
              Enter Makhana (Fox Nuts / Lotus Seeds)—an ancient Ayurvedic superfood treasured across North India for centuries. Light, naturally packed with protein and dietary fibre, it had all the nutritional power of a premium superfood with the crispiness of popcorn.
            </p>
            <p>
              We took this raw heritage grain and developed slow-roasting techniques over low flames, pairing it with 6 distinct modern flavours—from zesty Citrus Cartel to decadent Coco Island and herbed Sour Crème d' Onion.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
            <Image
              src="/assets/korigo/products/citrus.png"
              alt="Korigo Roasted Makhana Journey"
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* The Face Behind the Brand */}
        <div className="py-16 border-t border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
              Founders' Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-black">
              The Faces Behind The Brand
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-serif">
              Meet the entrepreneurs passionate about redefining Indian snacking habits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Founder 1 */}
            <div className="bg-gray-50 rounded border border-gray-200/80 p-6 text-center space-y-4">
              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-2 border-korigo-green shadow-sm">
                <Image
                  src="/assets/korigo/founders/WhatsApp_Image_2026-04-27_at_1.03.35_PM.png"
                  alt="Sohini Kar — Co-Founder, Korigo Snacks"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-black">Sohini Kar</h3>
                <p className="text-xs uppercase tracking-wider font-semibold text-korigo-green">
                  Co-Founder & Product Head
                </p>
              </div>
              <p className="text-xs text-gray-600 font-serif leading-relaxed">
                Leads product flavour formulations, clean ingredient sourcing, and nutritional quality standards for the Korigo brand.
              </p>
            </div>

            {/* Founder 2 */}
            <div className="bg-gray-50 rounded border border-gray-200/80 p-6 text-center space-y-4">
              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-2 border-korigo-green shadow-sm">
                <Image
                  src="/assets/korigo/founders/WhatsApp_Image_2026-04-27_at_12.39.04_PM.png"
                  alt="Piya Kar — Co-Founder, Korigo Snacks"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-black">Piya Kar</h3>
                <p className="text-xs uppercase tracking-wider font-semibold text-korigo-green">
                  Co-Founder & Operations Head
                </p>
              </div>
              <p className="text-xs text-gray-600 font-serif leading-relaxed">
                Directs logistics, pan-India distribution, customer experience, and retail expansion across major Indian metros.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Row */}
        <Certifications />
      </div>
    </div>
  );
}
