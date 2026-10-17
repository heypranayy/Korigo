import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const FlavoursMarquee: React.FC = () => {
  const flavours = [
    { name: "Citrus Cartel", tag: "Tangy Zest", slug: "citrus-cartel-makhana" },
    { name: "Coco Island", tag: "Chocolate Glaze", slug: "coco-world-makhana" },
    { name: "Sour Crème d' Onion", tag: "Creamy Herbs", slug: "creme-d-onion-makhana" },
    { name: "Garlicked Cheese", tag: "Savoury Crunch", slug: "garlicked-cheese-makhana" },
    { name: "Cinnamon Drip", tag: "Sweet Roasted", slug: "cinnamon-drip" },
    { name: "Sassy Sriracha", tag: "Spicy Heat", slug: "sassy-sriracha" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#1b3523] via-[#24462f] to-[#1b3523] text-white py-3 overflow-hidden border-y border-[#528663]/40 shadow-inner">
      <div className="flex space-x-10 animate-marquee whitespace-nowrap overflow-x-auto no-scrollbar py-1 px-4">
        {[...flavours, ...flavours, ...flavours].map((flavour, idx) => (
          <Link
            key={idx}
            href={`/products/${flavour.slug}`}
            className="inline-flex items-center gap-2.5 text-xs md:text-sm uppercase tracking-wider font-serif text-amber-100 hover:text-amber-300 transition group"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)] group-hover:scale-125 transition-transform" />
            <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
              {flavour.name}
            </span>
            <span className="text-amber-300/70 text-[11px] font-sans">
              [{flavour.tag}]
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
