"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const NoKernelPopcornSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-[1240px] mx-auto rounded-[28px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden p-6 sm:p-10 md:p-14 lg:p-16 shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, #1c5b36 0%, #3a684a 45%, #7e9185 100%)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Write-up Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-bold text-white font-serif leading-[1.18] tracking-tight mb-6">
              What is this no kernel
              <br className="hidden sm:inline" />
              {" "}popcorn? 👀
            </h2>

            <p className="text-white text-[16px] sm:text-[17px] md:text-[18px] font-normal font-serif leading-[1.65] mb-5">
              No-kernel popcorn is makhana (fox nuts) – a light, crunchy snack
              that pops without any hard kernels, so nothing gets stuck in your
              teeth like popcorn.
            </p>

            <p className="text-white text-[16px] sm:text-[17px] md:text-[18px] font-normal font-serif leading-[1.65] mb-8">
              Naturally rich in protein, fibre, and antioxidants, our makhanas
              are roasted to perfection, never fried, making them a clean and
              wholesome snack for everyday munching.
            </p>

            <div>
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#467058] hover:bg-[#395e49] text-white text-sm sm:text-[15px] font-serif font-medium transition-all duration-200 shadow-sm hover:shadow"
              >
                Know More
              </Link>
            </div>
          </div>

          {/* Right: Product Collection Image */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-[3/2] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/assets/korigo/general/ChatGPT_Image_Mar_28_2026_06_54_32_PM.webp"
                alt="Korigo Makhana Snack Packs — Cinnamon Drip, Citrus Cartel, Coco Island, Sour Creme & Onion, Garlicked Cheese"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

