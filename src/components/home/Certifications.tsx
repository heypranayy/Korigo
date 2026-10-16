"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";
import { TiltCard3D } from "../ui/TiltCard3D";

export const Certifications: React.FC = () => {
  const certs = [
    {
      src: "/assets/korigo/certifications/Gemini_Generated_Image_mb7co0mb7co0mb7c_adc6621f-f87f-4148-ac65-8bae4b70b01a.png",
      title: "FSSAI Food Safety Assured",
      desc: "Govt. of India Licensed Food Authority Standard",
      badge: "Govt. Certified",
    },
    {
      src: "/assets/korigo/certifications/WhatsApp_Image_2026-02-15_at_2.03.50_PM.jpg",
      title: "ISO 22000 Facility",
      desc: "World-Class Food Safety Management System",
      badge: "ISO Standard",
    },
    {
      src: "/assets/korigo/certifications/Untitled_design_10_a79ccb9b-cfe1-4c3b-a4be-6b614b6fa975.png",
      title: "100% Pure Vegetarian",
      desc: "Guaranteed Green Dot vegetarian facility",
      badge: "100% Veg",
    },
    {
      src: "/assets/korigo/certifications/WhatsApp_Image_2026-02-15_at_2.03.49_PM.jpg",
      title: "Non-GMO & Zero Chemical Additives",
      desc: "Clean-label naturally harvested Bihar makhana",
      badge: "Non-GMO",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-korigo-lightGreen text-korigo-darkGreen text-xs font-bold uppercase tracking-widest mb-2 font-serif border border-korigo-green/20">
            <ShieldCheck className="w-4 h-4 text-korigo-green" />
            <span>Uncompromising Food Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black">
            Our Quality Certifications & Assurances
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-serif max-w-lg mx-auto mt-2">
            Every batch of Korigo Snacks is manufactured in sterile, certified facilities complying with the highest domestic and international standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certs.map((c, i) => (
            <TiltCard3D key={i} maxRotation={6} scale={1.02}>
              <div className="flex flex-col items-center justify-between p-6 rounded-2xl bg-gradient-to-b from-gray-50/80 to-white border border-gray-200/80 hover:border-korigo-green shadow-sm hover:shadow-lg hover:shadow-korigo-green/10 transition-all text-center h-full group">
                <span className="text-[10px] font-bold uppercase tracking-wider text-korigo-green bg-korigo-lightGreen px-2.5 py-0.5 rounded-full mb-3">
                  {c.badge}
                </span>
                <div className="relative w-28 h-28 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={c.src}
                    alt={c.title}
                    fill
                    className="object-contain"
                    sizes="140px"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-black mb-1 group-hover:text-korigo-green transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-serif leading-tight">
                    {c.desc}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};
