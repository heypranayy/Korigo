"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#467655] to-[#3a794a] text-white pt-16 pb-8 border-t border-[#528663] shadow-inner">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Top Newsletter Row */}
        <div className="border-b border-white/15 pb-12 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-white/20">
              <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>KORIGO VIP SNACK CLUB</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
              Don’t miss out on a sale again.
            </h3>
            <p className="text-white/85 text-sm mb-6 font-serif">
              Sign up now for seasonal sale alerts, secret drops & healthy snacking tips.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="bg-white/10 border border-white/25 text-white placeholder:text-white/60 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-white flex-1"
              />
              <button
                type="submit"
                className="bg-white hover:bg-neutral-100 text-[#3a794a] px-6 py-3 text-sm font-bold uppercase tracking-wider transition font-serif rounded-lg shadow-md hover:scale-102 active:scale-98"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15 text-sm">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block relative h-10 w-36 bg-white/95 px-3 py-1.5 rounded-xl shadow-sm">
              <Image
                src="/assets/korigo/logo/Untitled_design_8_9a03f168-3203-4942-b0b0-e445ec329911.png"
                alt="Korigo Snacks Logo"
                fill
                className="object-contain p-1"
                sizes="150px"
              />
            </Link>
            <p className="text-white/85 text-sm leading-relaxed font-serif">
              100% slow-roasted, non-fried flavoured makhana pops. Handcrafted with authentic spices for clean, guilt-free crunch.
            </p>
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
                  Blog & Health Articles
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

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4 font-serif">
          <p>© 2026 Korigo Snacks. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
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
