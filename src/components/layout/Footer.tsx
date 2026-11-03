"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#528663] via-[#467655] to-[#3b6649] text-white pt-7 pb-6 md:pt-12 md:pb-8 border-t border-[#68a07a]/40 shadow-inner">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 md:gap-10 pb-6 md:pb-12 border-b border-white/15 text-xs md:text-sm">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-1 space-y-2.5 md:space-y-4">
            <Link
              href="/"
              className="inline-block relative h-8 w-28 md:h-10 md:w-36 bg-white/95 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl shadow-sm"
            >
              <Image
                src="/assets/korigo/logo/Untitled_design_8_9a03f168-3203-4942-b0b0-e445ec329911.webp"
                alt="Korigo Snacks Logo"
                fill
                className="object-contain p-0.5 md:p-1"
                sizes="150px"
              />
            </Link>
            <p className="text-white/85 text-xs md:text-sm leading-relaxed font-serif max-w-sm">
              100% slow-roasted, non-fried flavoured makhana pops. Handcrafted with authentic spices for clean, guilt-free crunch.
            </p>
            <div className="inline-block text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-amber-200/90 font-semibold bg-white/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded border border-white/15">
              A UNIT OF KLOVE PRIVATE LIMITED
            </div>
            <div className="space-y-1.5 md:space-y-2 text-white/80 text-[11px] md:text-xs pt-1 font-serif">
              <div className="flex items-start gap-1.5 md:gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>783 Anandapur, Kolkata - 700107, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300 flex-shrink-0" />
                <a
                  href="mailto:contact@korigosnacks.com"
                  className="hover:text-white transition underline underline-offset-2"
                >
                  contact@korigosnacks.com
                </a>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300 flex-shrink-0" />
                <a
                  href="tel:+918981842929"
                  className="hover:text-white transition underline underline-offset-2"
                >
                  +91 8981842929
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-serif font-bold text-xs md:text-base text-white mb-2.5 md:mb-4 uppercase tracking-wider border-b border-white/20 pb-1 inline-block">
              Shop Snacks
            </h4>
            <ul className="space-y-1.5 md:space-y-2.5 text-white/85 font-serif text-[12px] md:text-sm">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  All Snacks (12)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=flavours" className="hover:text-white transition">
                  Individual (35g)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=combos" className="hover:text-white transition">
                  Value Combos (70g)
                </Link>
              </li>
              <li>
                <Link href="/products/coco-world-makhana" className="hover:text-white transition">
                  Coco Island Chocolate
                </Link>
              </li>
              <li>
                <Link href="/products/sassy-sriracha" className="hover:text-white transition">
                  Sassy Sriracha Spicy
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn & Explore */}
          <div className="col-span-1">
            <h4 className="font-serif font-bold text-xs md:text-base text-white mb-2.5 md:mb-4 uppercase tracking-wider border-b border-white/20 pb-1 inline-block">
              Explore Korigo
            </h4>
            <ul className="space-y-1.5 md:space-y-2.5 text-white/85 font-serif text-[12px] md:text-sm">
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  Our Story &amp; Founders
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/reviews-form" className="hover:text-white transition">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact &amp; Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/my-account" className="hover:text-white transition">
                  Customer Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Assurances */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="font-serif font-bold text-xs md:text-base text-white mb-2.5 md:mb-4 uppercase tracking-wider border-b border-white/20 pb-1 inline-block">
              Policies
            </h4>
            <ul className="space-y-1.5 md:space-y-2.5 text-white/85 font-serif text-[12px] md:text-sm">
              <li>
                <Link href="/refund-policy" className="hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
            <div className="mt-3 md:mt-5 p-2 md:p-3 rounded-lg md:rounded-xl bg-white/10 border border-white/15 text-[11px] md:text-xs text-white/90 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-amber-300 flex-shrink-0" />
              <span>Certified Non-GMO, 100% Vegetarian &amp; FSSAI Approved</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credit Row */}
        <div className="pt-5 md:pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] md:text-xs text-white/75 gap-3 md:gap-4 font-serif">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left">
            <p>© 2026 Korigo Snacks. All Rights Reserved.</p>
            <span className="hidden sm:inline text-white/40">•</span>
            <p className="font-semibold text-white tracking-wide">
              A UNIT OF KLOVE PRIVATE LIMITED
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] md:text-[11px] font-mono tracking-wider shadow-sm">
              <span className="text-white/90">BUILT BY</span>
              <a
                href="https://gexart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 font-black underline underline-offset-2 hover:text-white transition cursor-pointer"
                title="GEXART"
              >
                GEXART
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[11px] md:text-xs">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-white transition">
              Terms
            </Link>
            <span>•</span>
            <Link href="/shipping-policy" className="hover:text-white transition">
              Shipping
            </Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-white transition">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
