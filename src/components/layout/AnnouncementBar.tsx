"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#24462f] text-white text-xs font-serif py-2 px-4 border-b border-[#3d694b]/40">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-medium tracking-wide text-xs sm:text-sm text-stone-100">
            FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹499 • USE CODE: <strong className="text-amber-300 font-bold">KORIGO10</strong> FOR 10% OFF
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/shop"
            className="text-[11px] font-bold uppercase tracking-wider text-amber-200 hover:text-white underline underline-offset-2 transition"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
};
