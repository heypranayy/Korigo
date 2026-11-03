"use client";

import React from "react";
import Image from "next/image";

export const HealthBadgesSection: React.FC = () => {
  const badges = [
    {
      src: "/assets/korigo/general/1_cadfef2d-934e-4cc6-b139-bc6f5cdb38f9.webp",
      alt: "No Palm Oil",
    },
    {
      src: "/assets/korigo/general/2_15419f25-53eb-47cd-9c8f-44b806843f2c.webp",
      alt: "Source of Fibre",
    },
    {
      src: "/assets/korigo/general/3_02a62b20-3fcd-4e1f-a3b5-bb93d4f77110.webp",
      alt: "Antioxidant Rich",
    },
    {
      src: "/assets/korigo/general/4_b064a3d0-2cc6-4f51-9a0b-dec64bb3d90a.webp",
      alt: "Superfood Makhana",
    },
    {
      src: "/assets/korigo/general/5_00ed0e48-5c9a-423b-83f4-d0d34d16a4a9.webp",
      alt: "Protein Source",
    },
    {
      src: "/assets/korigo/general/6_a1d0a702-193e-45d4-9287-6cdb35635bf9.webp",
      alt: "Antidiabetic Friendly",
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex items-center justify-center aspect-square group"
            >
              <div className="relative w-full h-full max-w-[120px] max-h-[120px] group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

