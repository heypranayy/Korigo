"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const NoKernelPopcornSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-10 md:py-16 px-3.5 sm:px-6 lg:px-8">
      <div
        className="max-w-[1240px] mx-auto rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden p-6 sm:p-8 md:p-14 lg:p-16 shadow-lg sm:shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, #1c5b36 0%, #3a684a 45%, #7e9185 100%)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left: Write-up Content */}
          <div className="w-full lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-2xl sm:text-3xl md:text-[42px] lg:text-[46px] font-bold text-white font-serif leading-[1.2] sm:leading-[1.18] tracking-tight mb-4 sm:mb-6">
              What is this no kernel
              <br className="hidden sm:inline" />
              {" "}popcorn? 👀
            </h2>

            <p className="text-white text-[15px] sm:text-[17px] md:text-[18px] font-normal font-serif leading-relaxed sm:leading-[1.65] mb-3.5 sm:mb-5">
              No-kernel popcorn is makhana (fox nuts) – a light, crunchy snack
              that pops without any hard kernels, so nothing gets stuck in your
              teeth like popcorn.
            </p>

            <p className="text-white text-[15px] sm:text-[17px] md:text-[18px] font-normal font-serif leading-relaxed sm:leading-[1.65] mb-6 sm:mb-8">
              Naturally rich in protein, fibre, and antioxidants, our makhanas
              are roasted to perfection, never fried, making them a clean and
              wholesome snack for everyday munching.
            </p>

            <div>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center px-7 py-2.5 sm:py-3 rounded-full bg-[#467058] hover:bg-[#395e49] text-white text-sm sm:text-[15px] font-serif font-medium transition-all duration-200 shadow-sm hover:shadow active:scale-98"
              >
                Know More
              </Link>
            </div>
          </div>

          {/* Right: Product Collection Image (Desktop/Tablet only, hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <div className="relative w-full aspect-[3/2] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/assets/korigo/general/ChatGPT_Image_Mar_28_2026_06_54_32_PM.webp"
                alt="Korigo Makhana Snack Packs — Cinnamon Drip, Citrus Cartel, Coco Island, Sour Creme & Onion, Garlicked Cheese"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

