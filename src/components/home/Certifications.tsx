"use client";

import React from "react";
import Image from "next/image";

export const Certifications: React.FC = () => {
  const certs = [
    {
      src: "/assets/korigo/certifications/Gemini_Generated_Image_mb7co0mb7co0mb7c_adc6621f-f87f-4148-ac65-8bae4b70b01a.webp",
      alt: "Made in India Lion Logo",
    },
    {
      src: "/assets/korigo/certifications/WhatsApp_Image_2026-02-15_at_2.03.50_PM.webp",
      alt: "MSME Ministry of Micro Small & Medium Enterprises",
    },
    {
      src: "/assets/korigo/certifications/Untitled_design_10_a79ccb9b-cfe1-4c3b-a4be-6b614b6fa975.webp",
      alt: "FSSAI Food Safety and Standards Authority of India",
    },
    {
      src: "/assets/korigo/certifications/WhatsApp_Image_2026-02-15_at_2.03.49_PM.webp",
      alt: "DPIIT Department for Promotion of Industry and Internal Trade",
    },
  ];

  return (
    <section className="content-auto py-10 sm:py-14 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-center text-black mb-8 sm:mb-12">
          Our Certifications &amp; Recognitions
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {certs.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-200 p-6 sm:p-8 flex items-center justify-center aspect-[4/3] sm:aspect-square"
            >
              <div className="relative w-full h-full max-w-[160px] max-h-[100px] flex items-center justify-center">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
