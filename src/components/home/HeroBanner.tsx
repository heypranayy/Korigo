"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hidden SEO Heading */}
      <h1 className="sr-only">
        Korigo Makhana Redefined — 100% Slow-Roasted Flavoured Foxnuts
      </h1>

      {/* DESKTOP HERO BANNER (>= 768px): Landscape 16:9 banner */}
      <div className="hidden md:flex w-full items-center justify-center bg-[#edff86]">
        <Link
          href="/shop"
          className="relative w-full max-w-[1360px] aspect-[1024/586] block cursor-pointer transition-transform duration-300 hover:scale-[1.005]"
          aria-label="Shop Korigo Makhana Redefined Collection"
        >
          <Image
            src="/assets/korigo/hero/hero_banner_desktop.webp"
            alt="Korigo Makhana Redefined — All Flavours"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-contain select-none"
          />
        </Link>
      </div>

      {/* MOBILE HERO BANNER (< 768px): Longer vertical framing with balanced padding */}
      <div className="block md:hidden w-full bg-[#d0e45f] px-[20px] pt-[36px] pb-[44px]">
        <div className="relative w-full aspect-[808/469]">
          <Image
            src="/assets/korigo/hero/hero_banner_mobile.webp"
            alt="Korigo Makhana Redefined — All Flavours"
            fill
            priority
            sizes="100vw"
            className="object-contain select-none"
          />

          {/* Interactive Shop Now CTA on Mobile */}
          <Link
            href="/shop"
            className="absolute z-20 rounded-full cursor-pointer focus:outline-none"
            style={{
              top: "82.0%",
              left: "29.5%",
              width: "42.0%",
              height: "18.0%",
            }}
            aria-label="Shop All Flavours of Korigo Makhana"
          >
            <span className="sr-only">Shop Now</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
