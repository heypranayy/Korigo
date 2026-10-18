"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useCart } from "../../lib/context/CartContext";

export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Outer Floating Header Wrapper - 100% transparent outside the rounded capsule pill */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-transparent ${
          isScrolled ? "py-2" : "py-2.5 sm:py-3.5"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Centered Floating White Capsule Pill with gentle drop shadow */}
          <div className="bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-gray-100/90 px-5 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-200">
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 lg:hidden text-gray-800 hover:text-korigo-green rounded-full transition focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="/"
                className="relative inline-block h-8 sm:h-10 w-28 sm:w-36 transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <Image
                  src="/assets/korigo/logo/Untitled_design_8_9a03f168-3203-4942-b0b0-e445ec329911.webp"
                  alt="Korigo Snacks - Bite Healthy"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 120px, 150px"
                />
              </Link>
            </div>

            {/* Center: Navigation Links ("Home", "Shop", "Our Story", "Contact Us") */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[15px] font-serif">
              <Link
                href="/"
                className={`transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-korigo-green font-bold"
                    : "text-gray-800 hover:text-korigo-green font-medium"
                }`}
              >
                Home
              </Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <Link
                  href="/shop"
                  className={`flex items-center gap-1 transition-colors duration-200 ${
                    pathname?.startsWith("/shop")
                      ? "text-korigo-green font-bold"
                      : "text-gray-800 hover:text-korigo-green font-medium"
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                      shopDropdownOpen ? "rotate-180 text-korigo-green" : ""
                    }`}
                  />
                </Link>

                {shopDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <div className="w-72 bg-white shadow-2xl rounded-2xl border border-gray-100 p-2 text-left">
                      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-korigo-green font-sans">
                          Slow-Roasted Superfoods
                        </span>
                        <span className="text-[10px] bg-korigo-green/10 text-korigo-green px-1.5 py-0.5 rounded font-sans font-bold">
                          12 Packs
                        </span>
                      </div>
                      <Link
                        href="/shop"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-[#f2faee] hover:text-korigo-green rounded-xl transition font-medium"
                      >
                        <span>All Flavours & Packs</span>
                        <span className="text-xs text-gray-400 font-sans">View All</span>
                      </Link>
                      <Link
                        href="/shop?category=flavours"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-[#f2faee] hover:text-korigo-green rounded-xl transition font-medium"
                      >
                        <span>Individual Flavours (35g)</span>
                        <span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-sans font-bold">
                          6 Flavours
                        </span>
                      </Link>
                      <Link
                        href="/shop?category=combos"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-[#f2faee] hover:text-korigo-green rounded-xl transition font-medium"
                      >
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Duo Combos (70g)</span>
                        </div>
                        <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-sans font-bold">
                          Save ₹40
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about-us"
                className={`transition-colors duration-200 ${
                  pathname === "/about-us"
                    ? "text-korigo-green font-bold"
                    : "text-gray-800 hover:text-korigo-green font-medium"
                }`}
              >
                Our Story
              </Link>

              <Link
                href="/contact"
                className={`transition-colors duration-200 ${
                  pathname === "/contact"
                    ? "text-korigo-green font-bold"
                    : "text-gray-800 hover:text-korigo-green font-medium"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right: Search, Account & Shopping Cart with Count (exact match to screenshot) */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/search"
                className="p-1.5 text-gray-700 hover:text-korigo-green transition hidden md:inline-flex"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Link>

              <Link
                href="/my-account"
                className="p-1.5 text-gray-700 hover:text-korigo-green transition hidden md:inline-flex"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Shopping Cart Icon with Count Number right next to it */}
              <button
                onClick={openCart}
                className="flex items-center gap-1.5 py-1 px-2 text-gray-800 hover:text-korigo-green transition active:scale-95 group"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-800 group-hover:text-korigo-green transition-colors stroke-[1.6]" />
                <span className="font-serif font-bold text-sm text-gray-800 group-hover:text-korigo-green min-w-[12px]">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative h-9 w-32 inline-block"
                >
                  <Image
                    src="/assets/korigo/logo/Untitled_design_8_9a03f168-3203-4942-b0b0-e445ec329911.webp"
                    alt="Korigo Snacks"
                    fill
                    className="object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 p-3 bg-[#f2faee] rounded-xl border border-korigo-green/20">
                <p className="text-xs font-bold text-korigo-darkGreen font-serif">
                  🚚 Free Pan-India Delivery on ₹499+
                </p>
                <p className="text-[11px] text-gray-600">
                  100% Slow-Roasted Superfood Makhana
                </p>
              </div>

              <nav className="space-y-2 font-serif text-base">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-gray-900 hover:bg-[#f2faee] hover:text-korigo-green font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-gray-900 hover:bg-[#f2faee] hover:text-korigo-green font-bold flex items-center justify-between"
                >
                  <span>Shop Makhana</span>
                  <span className="text-xs bg-korigo-green text-white px-2 py-0.5 rounded-full">
                    12 Packs
                  </span>
                </Link>
                <Link
                  href="/shop?category=flavours"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 pl-6 text-sm text-gray-600 hover:text-korigo-green"
                >
                  → Individual Flavours (35g)
                </Link>
                <Link
                  href="/shop?category=combos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 pl-6 text-sm text-gray-600 hover:text-korigo-green"
                >
                  → Duo Combos (Save ₹40)
                </Link>
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-gray-900 hover:bg-[#f2faee] hover:text-korigo-green font-medium"
                >
                  Our Story
                </Link>
                <Link
                  href="/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-gray-900 hover:bg-[#f2faee] hover:text-korigo-green font-medium"
                >
                  Recipes & Blog
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-gray-900 hover:bg-[#f2faee] hover:text-korigo-green font-medium"
                >
                  Contact Us
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <Link
                href="/my-account"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-korigo-secondary w-full text-center text-xs uppercase"
              >
                My Account
              </Link>
              <p className="text-[11px] text-gray-400 text-center font-serif">
                © 2026 Korigo Snacks • Healthy Crunch Everywhere
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
