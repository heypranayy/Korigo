import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Korigo Snacks",
  description:
    "Learn about Korigo Snacks, our journey from serene ponds to airy roasted makhana, and our founders Sohini Kar & Piya Kar.",
};

const HIGHLIGHTS = [
  "Roasted, not fried",
  "Naturally light & crunchy",
  "Source of plant protein",
  "High dietary fibre",
  "No trans fat",
];

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen py-10 sm:py-14 md:py-16 font-serif">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION 1: ABOUT US (Screenshot 2)                        */}
        {/* ========================================================= */}
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#14532d] text-center mb-10 sm:mb-12 md:mb-14 tracking-tight">
          About Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Story & Highlights */}
          <div className="font-serif text-[#4f5660] text-[14px] sm:text-[15px] leading-[1.75] space-y-4 sm:space-y-5">
            <p>
              Korigo believes that healthy snacking should never feel boring. Our makhana is sourced
              carefully and roasted to perfection so every bite delivers a satisfying crunch and
              wholesome goodness. Packed with natural nutrients, it is the perfect snack for those who
              want something light, tasty, and nourishing at the same time.
            </p>
            <p>
              We focus on keeping things simple and honest. No unnecessary additives, no heavy oils,
              just pure roasted makhana crafted with flavours that make snacking exciting again.
              Whether you need a mid-day boost, a movie-time snack, or something to carry on the go,
              Korigo makes sure you always have a better choice in your hands.
            </p>
            <p>
              At Korigo, we celebrate the richness of traditional Indian superfoods and give them a
              modern twist. By combining clean ingredients, bold flavours, and thoughtful
              preparation, we bring you a snack that fits perfectly into today&apos;s healthy lifestyle
              while staying rooted in nature.
            </p>
            <p className="flex items-center gap-1.5 pt-1 text-[#4f5660]">
              <span>Because good food should make you feel great, every single day.</span>
              <span className="text-base select-none">🌱</span>
            </p>

            {/* Feature Checkmarks */}
            <div className="pt-3 space-y-2.5">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#eaf7ea] flex items-center justify-center text-[#2a823b] shrink-0">
                    <Check className="w-3 h-3 stroke-[2.75]" />
                  </span>
                  <span className="font-serif text-[#444444] text-[13.5px] sm:text-[14.5px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Makhana Bowl Image */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
            <Image
              src="/assets/korigo/about/makhana-bowl.jpg"
              alt="Korigo Roasted Makhana in a Wooden Bowl"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: OUR JOURNEY (Screenshot 3 - Top)               */}
        {/* ========================================================= */}
        <section className="mt-20 sm:mt-24 md:mt-28 text-center max-w-[760px] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111827] mb-5 sm:mb-6 tracking-tight">
            Our Journey
          </h2>
          <p className="font-serif text-[#555555] text-[13.5px] sm:text-[14.5px] md:text-[15px] leading-[1.8] mb-8 sm:mb-9 px-2">
            At Korigo Snacks, our journey begins in the still waters of quiet ponds, where skilled
            farmers carefully hand-harvest waterlily seeds. These tiny pearls are then slow-roasted
            over a gentle flame, naturally puffing into light, crispy Makhana. We thoughtfully
            season each batch with rich, natural flavors—transforming a humble seed into a delicious,
            mindful snack you can feel good about ingredients that nourish the body and satisfy the
            soul.
          </p>
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center font-serif bg-[#188c2e] hover:bg-[#147325] text-white px-8 sm:px-9 py-2.5 sm:py-3 rounded-full text-[14px] sm:text-[15px] font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
            >
              Explore Our Products
            </Link>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: THE FACE BEHIND THE BRAND (Screenshot 3 - Bottom) */}
        {/* ========================================================= */}
        <section className="mt-20 sm:mt-24 md:mt-28">
          <div className="text-center max-w-[780px] mx-auto mb-10 sm:mb-12 md:mb-14">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111827] mb-4 sm:mb-5 tracking-tight">
              The Face Behind the Brand
            </h2>
            <p className="font-serif text-[#555555] text-[13.5px] sm:text-[14.5px] md:text-[15px] leading-[1.8] px-2">
              Meet Sohini Kar and Piya Kar, the mother daughter duo behind Korigo Snacks. Their shared
              love for food and healthy snacking started at home. For them, snacks were never just
              about taste. It was about enjoying food while staying healthy and feeling good every
              day. Sohini Kar, a University of Birmingham graduate with a background in marketing and
              branding, brings fresh ideas and bold flavour concepts to the brand. Piya Kar, a young
              mom at heart who loves healthy snacking to stay active and energetic, brings warmth and
              passion to the journey. Together, they created Korigo to make healthy snacking fun,
              tasty, and easy to enjoy anytime. 😋
            </p>
          </div>

          {/* Founder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[760px] mx-auto pb-8 sm:pb-12">
            {/* Founder 1: Sohini Kar */}
            <div className="bg-[#f7f7f7] rounded-2xl p-7 sm:p-9 text-center flex flex-col items-center border border-black/[0.02]">
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden border-[3px] border-[#2a823b] mb-5 shadow-sm">
                <Image
                  src="/assets/korigo/founders/WhatsApp_Image_2026-04-27_at_1.03.35_PM.png"
                  alt="Sohini Kar"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] mb-1">
                Sohini Kar
              </h3>
              <p className="font-serif italic text-[14px] sm:text-[15px] text-[#2a823b] mb-3">
                Co- Founder
              </p>
              <p className="font-serif text-[12.5px] sm:text-[13.5px] text-[#666666] leading-relaxed max-w-[280px]">
                Passionate about creating healthier snack choices, Sohini leads Korigo with a vision
                to combine taste, quality, and mindful nutrition.
              </p>
            </div>

            {/* Founder 2: Piya Kar */}
            <div className="bg-[#f7f7f7] rounded-2xl p-7 sm:p-9 text-center flex flex-col items-center border border-black/[0.02]">
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden border-[3px] border-[#2a823b] mb-5 shadow-sm">
                <Image
                  src="/assets/korigo/founders/WhatsApp_Image_2026-04-27_at_12.39.04_PM.png"
                  alt="Piya Kar"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] mb-1">
                Piya Kar
              </h3>
              <p className="font-serif italic text-[14px] sm:text-[15px] text-[#2a823b] mb-3">
                Co- Founder
              </p>
              <p className="font-serif text-[12.5px] sm:text-[13.5px] text-[#666666] leading-relaxed max-w-[280px]">
                Piya focuses on product development and brand growth, ensuring Korigo delivers
                flavorful snacks with high quality and innovation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
