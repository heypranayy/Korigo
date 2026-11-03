"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#528663] via-[#467655] to-[#3b6649] text-white pt-12 pb-8 border-t border-[#68a07a]/40 shadow-inner">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15 text-sm">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block relative h-10 w-36 bg-white/95 px-3 py-1.5 rounded-xl shadow-sm">
              <Image
                src="/assets/korigo/logo/Untitled_design_8_9a03f168-3203-4942-b0b0-e445ec329911.webp"
                alt="Korigo Snacks Logo"
                fill
                className="object-contain p-1"
                sizes="150px"
              />
            </Link>
            <p className="text-white/85 text-sm leading-relaxed font-serif">
              100% slow-roasted, non-fried flavoured makhana pops. Handcrafted with authentic spices for clean, guilt-free crunch.
            </p>
            <div className="inline-block text-[11px] font-mono uppercase tracking-wider text-amber-200/90 font-semibold bg-white/10 px-2.5 py-1 rounded border border-white/15">
              A UNIT OF KLOVE PRIVATE LIMITED
            </div>
            <div className="space-y-2 text-white/80 text-xs pt-2 font-serif">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>783 Anandapur, Kolkata - 700107, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <a href="mailto:contact@korigosnacks.com" className="hover:text-white transition underline underline-offset-2">
                  contact@korigosnacks.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-base text-white mb-4 uppercase tracking-wider border-b border-white/20 pb-1 inline-block">
              Shop Snacks
            </h4>
            <ul className="space-y-2.5 text-white/85 font-serif">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  All Snacks Catalog (12)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=flavours" className="hover:text-white transition">
                  Individual Flavours (35g)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=combos" className="hover:text-white transition">
                  Value Combos (70g Packs)
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
          <div>
            <h4 className="font-serif font-bold text-base text-white mb-4 uppercase tracking-wider border-b border-white/20 pb-1 inline-block">
              Explore Korigo
            </h4>
            <ul className="space-y-2.5 text-white/85 font-serif">
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  Our Story & Founders
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
                  Contact Us & Bulk Inquiries
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
          <div>
            <h4 className="font-serif font-bold text-base text-white mb-4 uppercase tracking-wider border-b border-white/20 pb-1 inline-block">
              Policies
            </h4>
            <ul className="space-y-2.5 text-white/85 font-serif">
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
            <div className="mt-5 p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-white/90 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <span>Certified Non-GMO, 100% Vegetarian & FSSAI Approved</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credit Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/75 gap-4 font-serif">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>© 2026 Korigo Snacks. All Rights Reserved.</p>
            <span className="hidden sm:inline text-white/40">•</span>
            <p className="font-semibold text-white tracking-wide">
              A UNIT OF KLOVE PRIVATE LIMITED
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-mono tracking-wider shadow-sm">
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

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
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
