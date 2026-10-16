"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Truck, Tag, ShieldCheck } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    {
      icon: <Truck className="w-3.5 h-3.5 text-emerald-300" />,
      text: "FREE EXPRESS PAN-INDIA SHIPPING ON ORDERS ABOVE ₹499",
      badge: "LIMITED OFFER",
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
      text: "DOUBLE CRUNCH: BUY ANY 2 COMBOS & SAVE EXTRA ₹40",
      badge: "BEST VALUE",
    },
    {
      icon: <Tag className="w-3.5 h-3.5 text-emerald-200" />,
      text: "USE COUPON CODE: KORIGO10 FOR 10% INSTANT DISCOUNT",
      badge: "SPECIAL CODE",
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />,
      text: "100% SLOW-ROASTED • 0% PALM OIL • ZERO CHOLESTEROL",
      badge: "CLEAN LABEL",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="relative bg-gradient-to-r from-[#3a794a] via-[#528663] to-[#3a794a] text-white text-xs font-medium py-2 px-4 overflow-hidden border-b border-[#3a794a]/30 shadow-sm z-50">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Left Urgency Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white border border-white/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            Live Store
          </span>
          <span className="text-[11px] text-white/90 font-serif">
            Same-day dispatch for orders placed before 2 PM
          </span>
        </div>

        {/* Center Animated Carousel */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 text-center transition-all duration-500 ease-in-out">
            <div className="flex-shrink-0 animate-bounce">
              {announcements[currentIndex].icon}
            </div>
            <span className="font-serif tracking-wide text-xs sm:text-sm font-semibold text-white drop-shadow-sm">
              {announcements[currentIndex].text}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black shadow-sm">
              {announcements[currentIndex].badge}
            </span>
          </div>
        </div>

        {/* Right CTA Link (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/shop"
            className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 hover:text-white underline underline-offset-2 transition"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
};
