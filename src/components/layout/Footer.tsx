"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#3e8a5b] text-white py-10 sm:py-12 px-4 font-serif">
      <div className="max-w-[800px] mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-4.5">
        {/* Logo */}
        <div className="relative w-28 sm:w-32 h-10 flex items-center justify-center mb-1">
          <Link href="/" aria-label="Korigo Snacks Home">
            <Image
              src="/assets/korigo/logo/logo_white.png"
              alt="Korigo - Better Crunch"
              width={130}
              height={50}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Subscribe form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-row items-center justify-center gap-2 w-full max-w-[420px]"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email Address"
            className="w-48 sm:w-60 px-4 py-2 rounded-full bg-white text-gray-800 placeholder:text-gray-400 font-serif text-[13px] sm:text-[14px] outline-none shadow-sm focus:ring-2 focus:ring-white/40"
          />
          <button
            type="submit"
            className="px-5 sm:px-6 py-2 rounded-full bg-white text-[#3e8a5b] font-serif font-medium text-[13px] sm:text-[14px] shadow-sm hover:bg-white/95 active:scale-95 transition-all duration-150 shrink-0"
          >
            {subscribed ? "Subscribed!" : "Subscribe"}
          </button>
        </form>

        {/* Address */}
        <p className="text-white text-[13px] sm:text-[14px] font-serif tracking-wide pt-1">
          Address: 783 Anandapur, Kolkata -700107
        </p>

        {/* Email */}
        <div>
          <a
            href="mailto:contact@korigosnacks.com"
            className="text-white text-[13px] sm:text-[14px] font-serif underline underline-offset-4 hover:opacity-85 transition tracking-wide"
          >
            contact@korigosnacks.com
          </a>
        </div>

        {/* Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 text-white text-[12.5px] sm:text-[13.5px] font-serif tracking-wide pt-1">
          <Link href="/refund-policy" className="hover:underline hover:opacity-90 transition">
            Refund Policy
          </Link>
          <Link href="/privacy-policy" className="hover:underline hover:opacity-90 transition">
            Privacy Policy
          </Link>
          <Link href="/shipping-policy" className="hover:underline hover:opacity-90 transition">
            Shipping Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline hover:opacity-90 transition">
            Terms of Service
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <a
            href="https://www.instagram.com/korigosnacks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-150"
          >
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61560945924729"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-150"
          >
            <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </a>
          <a
            href="https://www.linkedin.com/company/korigo-snacks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-150"
          >
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white text-[11px] sm:text-[12px] font-serif tracking-wide pt-1 opacity-90">
          © 2024 Korigo Snacks. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
