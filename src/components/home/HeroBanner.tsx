"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Flame,
  ShieldCheck,
  ArrowRight,
  Star,
  ShoppingBag,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Heart,
  Check,
} from "lucide-react";
import { useCart } from "../../lib/context/CartContext";
import { TiltCard3D } from "../ui/TiltCard3D";
import { FloatingMakhanaField } from "./FloatingMakhanaField";
import { soundFx } from "../../lib/audio/soundEffects";

export const HeroBanner: React.FC = () => {
  const { addToCart, isLoading, openCart } = useCart();
  const [activeSlide, setActiveSlide] = useState<"punch" | "space" | "combo">("punch");
  const [selectedPlanet, setSelectedPlanet] = useState(0);
  const [heroFlavourIndex, setHeroFlavourIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const planets = [
    {
      name: "Sassy Sriracha",
      atmosphere: "Planet Fiery Mars",
      tagline: "Slow-roasted fiery red chillies & smoky garlic crisp",
      flavorNotes: "Red Chilli • Garlic • Himalayan Rock Salt",
      spiceLevel: "🔥🔥🔥🔥",
      badge: "Best Seller 🔥",
      price: "₹99",
      id: 133,
      slug: "sassy-sriracha",
      packImg: "/assets/korigo/products/transparent_sassy_sriracha.png",
      glowColor: "rgba(227, 49, 49, 0.55)",
      bgGradient: "from-[#2b0707] via-[#170505] to-[#0d0202]",
      colorHex: "#e33131",
    },
    {
      name: "Garlicked Cheese",
      atmosphere: "Planet Golden Cheddar",
      tagline: "Rich aged cheddar fused with golden roasted garlic",
      flavorNotes: "Cheddar Cheese • Slow-Roasted Garlic • Herbs",
      spiceLevel: "🧀 Mild & Savory",
      badge: "Trending 🧀",
      price: "₹99",
      id: 131,
      slug: "garlicked-cheese-makhana",
      packImg: "/assets/korigo/products/transparent_garlicked_cheese.png",
      glowColor: "rgba(245, 158, 11, 0.55)",
      bgGradient: "from-[#291703] via-[#170e02] to-[#0c0701]",
      colorHex: "#f59e0b",
    },
    {
      name: "Citrus Cartel",
      atmosphere: "Planet Zesty Lime",
      tagline: "Burst of sun-ripened lime, mint leaves & tangy masala",
      flavorNotes: "Zesty Lime • Peppermint • Chaat Masala",
      spiceLevel: "🍋 Tangy & Zingy",
      badge: "Chef's Pick 🍋",
      price: "₹99",
      id: 128,
      slug: "citrus-cartel-makhana",
      packImg: "/assets/korigo/products/transparent_citrus_cartel.png",
      glowColor: "rgba(20, 143, 44, 0.6)",
      bgGradient: "from-[#082910] via-[#041708] to-[#020d04]",
      colorHex: "#148f2c",
    },
    {
      name: "Sour Crème d' Onion",
      atmosphere: "Planet Herbed Velvet",
      tagline: "Velvety herbed creaminess balanced with delicate sweet chives",
      flavorNotes: "Sour Cream • French Chives • Parsley",
      spiceLevel: "🧅 Creamy Smooth",
      badge: "Fan Favourite 🧅",
      price: "₹99",
      id: 130,
      slug: "creme-d-onion-makhana",
      packImg: "/assets/korigo/products/transparent_creme_onion.png",
      glowColor: "rgba(16, 185, 129, 0.55)",
      bgGradient: "from-[#042416] via-[#02170e] to-[#010e08]",
      colorHex: "#10b981",
    },
    {
      name: "Cinnamon Drip",
      atmosphere: "Planet Sweet Spice",
      tagline: "Ceylon cinnamon infused with buttery caramel indulgence",
      flavorNotes: "Ceylon Cinnamon • Caramel • Brown Sugar",
      spiceLevel: "✨ Sweet & Warm",
      badge: "Dessert Drop 🍯",
      price: "₹99",
      id: 129,
      slug: "cinnamon-drip",
      packImg: "/assets/korigo/products/transparent_cinnamon_drip.png",
      glowColor: "rgba(217, 119, 6, 0.55)",
      bgGradient: "from-[#281504] via-[#170c02] to-[#0d0601]",
      colorHex: "#d97706",
    },
    {
      name: "Coco Island",
      atmosphere: "Planet Tropical Palm",
      tagline: "Toasted coconut crunch with gentle vanilla breeze",
      flavorNotes: "Toasted Coconut • Vanilla • Natural Cane",
      spiceLevel: "🥥 Tropical Fresh",
      badge: "Exotic 🥥",
      price: "₹99",
      id: 132,
      slug: "coco-world-makhana",
      packImg: "/assets/korigo/products/transparent_coco_island.png",
      glowColor: "rgba(56, 189, 248, 0.55)",
      bgGradient: "from-[#071f2c] via-[#031118] to-[#01090d]",
      colorHex: "#38bdf8",
    },
  ];

  const currentPlanet = planets[selectedPlanet];
  const activeHeroFlavour = planets[heroFlavourIndex];

  const nextHeroFlavour = () => {
    setHeroFlavourIndex((prev) => (prev + 1) % planets.length);
    soundFx.playPop();
  };

  const prevHeroFlavour = () => {
    setHeroFlavourIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
    soundFx.playPop();
  };

  const setHeroFlavour = (idx: number) => {
    setHeroFlavourIndex(idx);
    soundFx.playPop();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      nextHeroFlavour();
    } else if (diff < -45) {
      prevHeroFlavour();
    }
    setTouchStartX(null);
  };

  const handleQuickAdd = async (id: number) => {
    setIsAdding(true);
    soundFx.playCrunch();
    const success = await addToCart(id, 1);
    setIsAdding(false);
    if (success) {
      openCart();
    }
  };

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFx.playPop();
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#1b3523] via-[#24462f] to-[#162c1d] text-white">
      {/* Interactive 3D Floating Makhana Field (Click-to-Pop Physics) */}
      <FloatingMakhanaField />

      {/* Top Controller Bar: Slide Mode Switcher & Audio Toggle */}
      <div className="max-w-[1260px] mx-auto px-3 sm:px-6 pt-3 sm:pt-6 pb-2 relative z-30 flex items-center justify-between gap-2">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-[10px] sm:text-xs font-serif shadow-lg overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setActiveSlide("punch");
              soundFx.playPop();
            }}
            className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold transition-all duration-200 whitespace-nowrap ${
              activeSlide === "punch"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                : "text-gray-200 hover:text-white"
            }`}
          >
            🔥 The Crunch
          </button>
          <button
            onClick={() => {
              setActiveSlide("space");
              soundFx.playPop();
            }}
            className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${
              activeSlide === "space"
                ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                : "text-gray-200 hover:text-white"
            }`}
          >
            <span>🪐 Flavour Space</span>
            <span className="hidden md:inline text-[9px] bg-white/20 px-1.5 py-0.2 rounded-full">
              6 Planets
            </span>
          </button>
          <button
            onClick={() => {
              setActiveSlide("combo");
              soundFx.playPop();
            }}
            className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold transition-all duration-200 whitespace-nowrap ${
              activeSlide === "combo"
                ? "bg-amber-500 text-black font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                : "text-gray-200 hover:text-white"
            }`}
          >
            🎁 Combos
          </button>
        </div>

        {/* Audio Crunch Sound Toggle */}
        <button
          onClick={toggleSound}
          className="flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-serif bg-white/10 hover:bg-white/20 border border-white/15 transition backdrop-blur-md text-amber-200"
          title={isMuted ? "Unmute Crunch Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          )}
          <span className="hidden sm:inline">{isMuted ? "Sound: Off" : "Crunch FX: On"}</span>
        </button>
      </div>

      {/* =========================================================================
          SLIDE 1: "THE CRUNCH THAT MAKES YOU POP!" (Interactive 6-Flavour Showcase)
          ========================================================================= */}
      {activeSlide === "punch" && (
        <section className="relative pt-4 sm:pt-8 pb-12 sm:pb-20 overflow-hidden animate-in fade-in duration-300">
          {/* Dynamic Background Lighting matching active flavour + botanical logo green base */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#528663]/35 via-[#24462f]/90 to-[#162c1d] pointer-events-none" />
          <div
            className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[130px] opacity-35 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: activeHeroFlavour.colorHex }}
          />
          <div
            className="absolute bottom-10 -right-20 w-96 h-96 rounded-full blur-[140px] opacity-30 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: activeHeroFlavour.colorHex }}
          />

          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 relative z-10">
            {/* =========================================================
                STREAMLINED MOBILE HERO (< 1024px)
                ========================================================= */}
            <div className="block lg:hidden text-center space-y-3 pt-1 pb-2">
              {/* Rating pill */}
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-serif font-semibold text-white shadow-sm">
                <div className="flex gap-0.5 text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-300 stroke-amber-300" />
                  ))}
                </div>
                <span>4.9 / 5.0 • 2,400+ Verified Buyers</span>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight text-white">
                  Flavoured Makhana
                </h1>
                <p className="text-base sm:text-lg font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
                  THE CRUNCH THAT MAKES YOU POP!
                </p>
              </div>

              {/* Interactive Packshot Stage on Mobile */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative max-w-[260px] mx-auto my-1"
              >
                <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-white/15 via-[#528663]/25 to-black/30 backdrop-blur-lg border border-[#528663]/40 p-3 shadow-xl flex items-center justify-center overflow-hidden">
                  {/* Flavour Tag Pill inside stage */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md"
                      style={{
                        backgroundColor: `${activeHeroFlavour.colorHex}33`,
                        color: "#ffffff",
                        borderColor: `${activeHeroFlavour.colorHex}66`,
                      }}
                    >
                      {activeHeroFlavour.badge}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 z-20 text-[10px] font-mono text-amber-200 font-bold">
                    35g • ₹99
                  </div>

                  {/* Ambient Glow */}
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none"
                    style={{ backgroundColor: activeHeroFlavour.colorHex }}
                  />

                  {/* Packshot Image */}
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <Image
                      key={activeHeroFlavour.slug}
                      src={activeHeroFlavour.packImg}
                      alt={`Korigo ${activeHeroFlavour.name}`}
                      fill
                      priority
                      className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] filter brightness-105"
                      sizes="220px"
                    />
                  </div>

                  {/* Quick prev/next overlay tap buttons on pack */}
                  <button
                    onClick={prevHeroFlavour}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm z-20 active:scale-95"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextHeroFlavour}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm z-20 active:scale-95"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dots indicator directly under packshot */}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {planets.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroFlavour(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        heroFlavourIndex === i ? "w-6" : "w-1.5 bg-white/30"
                      }`}
                      style={{
                        backgroundColor: heroFlavourIndex === i ? f.colorHex : undefined,
                      }}
                      aria-label={f.name}
                    />
                  ))}
                </div>
              </div>

              {/* Active Flavour Info */}
              <div className="space-y-0.5">
                <h2 className="text-lg font-serif font-black text-white">
                  {activeHeroFlavour.name}
                </h2>
                <p className="text-[11px] text-amber-200/90 font-serif max-w-xs mx-auto leading-relaxed">
                  {activeHeroFlavour.tagline}
                </p>
              </div>

              {/* 3 Compact Value Badges */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
                <span className="bg-white/10 border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-serif">
                  <Flame className="w-3 h-3 text-amber-300" /> Slow-Roasted
                </span>
                <span className="bg-white/10 border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-serif">
                  <Sparkles className="w-3 h-3 text-amber-300" /> 9.7g Protein
                </span>
                <span className="bg-white/10 border border-white/20 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-serif">
                  <ShieldCheck className="w-3 h-3 text-amber-300" /> Zero Palm Oil
                </span>
              </div>

              {/* Single High-Converting CTA Row */}
              <div className="flex items-center justify-center gap-2 pt-1 max-w-xs mx-auto">
                <button
                  onClick={() => handleQuickAdd(activeHeroFlavour.id)}
                  disabled={isAdding || isLoading}
                  className="btn-korigo-primary flex-1 py-3 text-xs uppercase tracking-wider font-serif shadow-glow-green flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isAdding ? "Adding..." : `Add • ${activeHeroFlavour.price}`}</span>
                </button>
                <Link
                  href={`/products/${activeHeroFlavour.slug}`}
                  className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-serif font-bold uppercase tracking-wider border border-white/20 transition whitespace-nowrap"
                >
                  Details →
                </Link>
              </div>

              {/* Flavour Chips Scroll Strip */}
              <div className="pt-1 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {planets.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setHeroFlavour(i)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-serif transition-all duration-200 flex items-center gap-1 flex-shrink-0 ${
                      heroFlavourIndex === i
                        ? "bg-white text-black font-extrabold shadow-md scale-105"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f.colorHex }} />
                    <span>{f.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* =========================================================
                DESKTOP VIEW (>= 1024px)
                ========================================================= */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Bold Catchy Punchline & Flavour Info */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Social Proof Pill */}
                <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-1.5 rounded-full text-xs font-serif font-semibold text-white shadow-xl">
                  <div className="flex gap-0.5 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300 stroke-amber-300" />
                    ))}
                  </div>
                  <span>4.9 / 5.0 (2,400+ Verified Makhana Munchers)</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-black tracking-tight leading-[1.1] text-white">
                    Flavoured Makhana
                  </h1>
                  <p className="text-2xl sm:text-4xl xl:text-5xl font-serif font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300 drop-shadow-[0_4px_24px_rgba(255,255,255,0.3)]">
                    THE CRUNCH THAT MAKES YOU POP!
                  </p>
                </div>

                {/* Dynamic Flavour Story */}
                <div className="transition-all duration-300">
                  <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-serif">
                    100% slow-roasted over low flame for an airy, shatteringly crisp crunch.{" "}
                    <span className="text-amber-200 font-semibold">{activeHeroFlavour.name}:</span>{" "}
                    {activeHeroFlavour.tagline}. Crafted with 9.7g plant protein and zero palm oil.
                  </p>
                </div>

                {/* High-Impact Value Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1">
                  <span className="bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 font-serif font-semibold shadow-sm">
                    <Flame className="w-3.5 h-3.5 text-amber-300" /> 100% Slow-Roasted
                  </span>
                  <span className="bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 font-serif font-semibold shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> 9.7g Protein / 100g
                  </span>
                  <span className="bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 font-serif font-semibold shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Zero Palm Oil
                  </span>
                </div>

                {/* Slide Changer Option 2: Quick Flavour Chips / Pills */}
                <div className="pt-1 sm:pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300/80 mb-2 font-semibold">
                    Explore All 6 Flavours:
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 flex-wrap">
                    {planets.map((f, i) => (
                      <button
                        key={f.id}
                        onClick={() => setHeroFlavour(i)}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-serif transition-all duration-200 flex items-center gap-1.5 ${
                          heroFlavourIndex === i
                            ? "bg-white text-black font-extrabold shadow-lg scale-105 ring-2 ring-white/50"
                            : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: f.colorHex }}
                        />
                        <span>{f.name.split(" ")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 justify-center lg:justify-start pt-1 sm:pt-2">
                  <button
                    onClick={() => handleQuickAdd(activeHeroFlavour.id)}
                    disabled={isAdding || isLoading}
                    className="btn-korigo-primary text-xs sm:text-sm uppercase tracking-wider py-3.5 sm:py-4 px-6 sm:px-8 flex items-center justify-center gap-2 group shadow-glow-green"
                  >
                    <ShoppingBag className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>
                      {isAdding ? "Adding..." : `Add ${activeHeroFlavour.name} • ${activeHeroFlavour.price}`}
                    </span>
                  </button>

                  <Link
                    href={`/products/${activeHeroFlavour.slug}`}
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full py-3.5 sm:py-4 px-6 sm:px-8 text-xs sm:text-sm uppercase font-serif font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm text-center"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Interactive Tip */}
                <div className="pt-1 text-[11px] sm:text-xs text-amber-200/80 font-serif flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>💡 Tip: Swipe pack or click arrows to explore all flavours!</span>
                </div>
              </div>

              {/* Right Column: 3D Stage with Middle Slide Changer & Bottom Pagination */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-4 lg:mt-0">
                {/* Slide Changer Option 1: Desktop Middle Slide Changer Header */}
                <div className="hidden lg:flex items-center justify-between w-full max-w-[420px] mb-4 px-1 relative z-40">
                  <button
                    onClick={prevHeroFlavour}
                    className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 active:scale-95 transition flex items-center gap-1.5 text-xs font-serif font-bold text-white shadow-sm"
                    aria-label="Previous Flavour"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/15 flex items-center gap-2 text-xs font-mono font-bold text-white shadow-sm">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: activeHeroFlavour.colorHex }}
                    />
                    <span>
                      {String(heroFlavourIndex + 1).padStart(2, "0")} / 06 • {activeHeroFlavour.name}
                    </span>
                  </div>

                  <button
                    onClick={nextHeroFlavour}
                    className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 active:scale-95 transition flex items-center gap-1.5 text-xs font-serif font-bold text-white shadow-sm"
                    aria-label="Next Flavour"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3D Rotating Starburst Badge (Desktop only to prevent mobile clutter) */}
                <div className="hidden md:flex absolute top-10 -right-3 sm:top-12 sm:-right-6 z-20 pointer-events-none">
                  <div
                    className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center animate-spin"
                    style={{ animationDuration: "18s" }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(245,158,11,0.5)]">
                      <polygon
                        points="50,0 61,15 79,9 85,27 100,38 92,55 99,73 82,80 75,98 57,92 43,100 35,84 17,86 16,68 0,61 8,44 1,27 18,22 23,4 41,9"
                        fill="#f59e0b"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black font-black uppercase leading-tight p-2">
                      <span className="text-[10px] tracking-widest">SLOW</span>
                      <span className="text-sm font-extrabold tracking-tighter">ROASTED</span>
                      <span className="text-[9px] bg-black text-amber-300 px-1 py-0.2 rounded mt-0.5">
                        100% NON-FRIED
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3D Levitating Packshot Tilt Card (with touch swipe support) */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="w-full max-w-[320px] sm:max-w-[420px]"
                >
                  <TiltCard3D
                    maxTilt={12}
                    scale={1.03}
                    className="w-full p-4 sm:p-7 rounded-3xl bg-gradient-to-b from-white/15 via-[#528663]/25 to-black/30 backdrop-blur-xl border border-[#528663]/40 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-sm"
                        style={{
                          backgroundColor: `${activeHeroFlavour.colorHex}33`,
                          color: "#ffffff",
                          borderColor: `${activeHeroFlavour.colorHex}66`,
                        }}
                      >
                        {activeHeroFlavour.badge}
                      </span>
                      <span className="text-xs font-serif text-amber-200/80 font-semibold">
                        Slow-Roasted 35g
                      </span>
                    </div>

                    {/* Packshot Image Stage */}
                    <div className="relative aspect-square w-full flex items-center justify-center my-2">
                      <div
                        className="absolute inset-0 rounded-full blur-3xl opacity-70 transition-colors duration-500 animate-pulse"
                        style={{ backgroundColor: activeHeroFlavour.colorHex }}
                      />
                      <Image
                        key={activeHeroFlavour.slug}
                        src={activeHeroFlavour.packImg}
                        alt={`Korigo ${activeHeroFlavour.name} Makhana`}
                        fill
                        priority
                        className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.8)] filter brightness-105 animate-in zoom-in-95 duration-300"
                        sizes="(max-width: 768px) 300px, 400px"
                      />
                    </div>

                    {/* Flavor Specs */}
                    <div className="text-center pt-2">
                      <h3 className="text-2xl font-serif font-extrabold text-white mb-1">
                        {activeHeroFlavour.name}
                      </h3>
                      <p className="text-xs text-amber-100/90 font-serif mb-4 line-clamp-2">
                        {activeHeroFlavour.tagline}
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleQuickAdd(activeHeroFlavour.id)}
                          disabled={isAdding || isLoading}
                          className="btn-korigo-primary w-full text-xs uppercase tracking-wider py-3"
                        >
                          Quick Add • {activeHeroFlavour.price}
                        </button>
                        <Link
                          href={`/products/${activeHeroFlavour.slug}`}
                          className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-serif font-semibold whitespace-nowrap transition"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </TiltCard3D>
                </div>

                {/* Slide Changer Option 3: Bottom Pagination Down Below */}
                <div className="flex flex-col items-center gap-2 pt-5">
                  <div className="flex items-center gap-2">
                    {planets.map((f, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroFlavour(i)}
                        aria-label={`Switch to ${f.name}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          heroFlavourIndex === i
                            ? "w-8 shadow-md"
                            : "w-2.5 bg-white/30 hover:bg-white/50"
                        }`}
                        style={{
                          backgroundColor: heroFlavourIndex === i ? f.colorHex : undefined,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-serif text-white/75">
                    <button
                      onClick={prevHeroFlavour}
                      className="hover:text-white transition flex items-center gap-0.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Prev
                    </button>
                    <span>•</span>
                    <button
                      onClick={nextHeroFlavour}
                      className="hover:text-white transition flex items-center gap-0.5"
                    >
                      Next <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SLIDE 2: "FLAVOUR SPACE — Pick Your Planet" (Direct Mr Makhana Cosmic Ideation)
          ========================================================================= */}
      {activeSlide === "space" && (
        <section
          className={`relative pt-8 sm:pt-12 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b ${currentPlanet.bgGradient} transition-colors duration-700 animate-in fade-in`}
        >
          {/* Cosmic Starfield & Nebula Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent pointer-events-none" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] opacity-40 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: currentPlanet.colorHex }}
          />

          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 relative z-10">
            {/* Space Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-white/10 border border-white/20 text-purple-300 mb-3">
                <span>🪐 FLAVOUR SPACE ODYSSEY</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white mb-2">
                PICK YOUR PLANET.
              </h2>
              <p className="text-sm sm:text-base font-serif text-gray-300">
                Six gourmet atmospheres. Slow-roasted lotus seed superfood launched into flavour orbit.
              </p>
            </div>

            {/* 3D Planetary Orbit Stage */}
            <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 my-4">
              {/* Previous Button */}
              <button
                onClick={() => {
                  setSelectedPlanet((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
                  soundFx.playPop();
                }}
                className="hidden lg:flex absolute left-4 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition hover:scale-110 active:scale-95"
                aria-label="Previous Planet"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* 3D Planet & Packshot Center Stage */}
              <div className="relative w-full max-w-[480px] flex items-center justify-center">
                {/* 3D Planetary Orbit Rings */}
                <div
                  className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-white/20 animate-spin pointer-events-none"
                  style={{ animationDuration: "35s" }}
                />
                <div
                  className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-white/30 animate-spin pointer-events-none"
                  style={{ animationDuration: "25s", animationDirection: "reverse" }}
                />

                {/* Glowing Planetary Atmosphere Core */}
                <div
                  className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-2xl opacity-60 transition-all duration-500"
                  style={{ backgroundColor: currentPlanet.colorHex }}
                />

                {/* 3D Tilt Packshot */}
                <TiltCard3D
                  maxTilt={16}
                  scale={1.05}
                  className="relative z-10 w-full aspect-square max-w-[340px] sm:max-w-[380px] flex items-center justify-center p-4 cursor-pointer"
                >
                  <Image
                    key={currentPlanet.slug}
                    src={currentPlanet.packImg}
                    alt={currentPlanet.name}
                    fill
                    priority
                    className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-300"
                    sizes="(max-width: 768px) 300px, 420px"
                  />
                </TiltCard3D>
              </div>

              {/* Planet Details Card */}
              <div className="max-w-md text-center lg:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white">
                  <span>{currentPlanet.atmosphere}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-serif font-black text-white">
                  {currentPlanet.name}
                </h3>

                <p className="text-sm font-serif text-gray-200 leading-relaxed">
                  {currentPlanet.tagline}
                </p>

                <div className="p-3.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15 space-y-2 text-xs font-serif">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-300 gap-1">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-gray-400">Tasting Notes:</span>
                    <span className="font-semibold text-white">{currentPlanet.flavorNotes}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-gray-400">Intensity:</span>
                    <span className="font-semibold text-amber-300">{currentPlanet.spiceLevel}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-gray-400">Nutrients:</span>
                    <span className="font-semibold text-emerald-300">9.7g Protein • 0% Trans Fat</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleQuickAdd(currentPlanet.id)}
                    disabled={isAdding || isLoading}
                    className="btn-korigo-primary flex-1 text-sm uppercase py-3.5 px-6 shadow-glow-green"
                  >
                    Add to Cart • {currentPlanet.price}
                  </button>
                  <Link
                    href={`/products/${currentPlanet.slug}`}
                    className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
                    title="View Product Page"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  setSelectedPlanet((prev) => (prev === planets.length - 1 ? 0 : prev + 1));
                  soundFx.playPop();
                }}
                className="hidden lg:flex absolute right-4 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition hover:scale-110 active:scale-95"
                aria-label="Next Planet"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Planet Thumbnail Navigation Strip */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 flex-wrap">
              {planets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPlanet(idx);
                    soundFx.playPop();
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-serif transition-all duration-300 ${
                    selectedPlanet === idx
                      ? "bg-white text-black font-extrabold shadow-lg scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: p.colorHex }}
                  />
                  <span>{p.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SLIDE 3: "DUAL COMBOS — Double The Pop, Save ₹40"
          ========================================================================= */}
      {activeSlide === "combo" && (
        <section className="relative pt-8 sm:pt-12 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#1b3523] via-[#24462f] to-[#162c1d] animate-in fade-in">
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> VALUE COMBOS • 70G
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white mb-2">
                DOUBLE THE POP. SAVE ₹40.
              </h2>
              <p className="text-sm sm:text-base font-serif text-gray-200">
                Pair bold spices with creamy herbs. Two full-size 35g packs bundled together at exclusive savings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Combo 1: Sriracha + Garlicked Cheese */}
              <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-[#528663]/30 flex flex-col justify-between hover:border-[#528663] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                    Fire & Cheese Duo
                  </span>
                  <span className="text-xs font-serif text-emerald-300 font-bold">
                    Save ₹40
                  </span>
                </div>

                <div className="relative aspect-video w-full flex items-center justify-center my-3">
                  <Image
                    src="/assets/korigo/combos/transparent_garlic_sasy.png"
                    alt="Sriracha and Cheese Combo"
                    fill
                    className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    sizes="(max-width: 768px) 300px, 450px"
                  />
                </div>

                <div className="pt-2 text-center">
                  <h3 className="text-xl font-serif font-extrabold text-white mb-1">
                    Sassy Sriracha + Garlicked Cheese
                  </h3>
                  <p className="text-xs text-gray-300 font-serif mb-4">
                    The ultimate contrast: fiery chilli crunch alongside rich golden cheddar.
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-2xl font-serif font-bold text-white">₹158</span>
                    <span className="text-sm font-serif line-through text-gray-400">₹198</span>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(139)}
                    disabled={isAdding || isLoading}
                    className="btn-korigo-primary w-full text-xs uppercase py-3.5 shadow-glow-green"
                  >
                    Add Duo Pack • ₹158
                  </button>
                </div>
              </div>

              {/* Combo 2: Citrus + Sour Creme */}
              <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-[#528663]/30 flex flex-col justify-between hover:border-[#528663] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                    Zest & Herb Duo
                  </span>
                  <span className="text-xs font-serif text-emerald-300 font-bold">
                    Save ₹40
                  </span>
                </div>

                <div className="relative aspect-video w-full flex items-center justify-center my-3">
                  <Image
                    src="/assets/korigo/combos/transparent_creamonion_sassy.png"
                    alt="Citrus and Creme Combo"
                    fill
                    className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    sizes="(max-width: 768px) 300px, 450px"
                  />
                </div>

                <div className="pt-2 text-center">
                  <h3 className="text-xl font-serif font-extrabold text-white mb-1">
                    Citrus Cartel + Crème d' Onion
                  </h3>
                  <p className="text-xs text-gray-300 font-serif mb-4">
                    Zesty tanginess paired with luxurious velvety French chives and herbs.
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-2xl font-serif font-bold text-white">₹158</span>
                    <span className="text-sm font-serif line-through text-gray-400">₹198</span>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(140)}
                    disabled={isAdding || isLoading}
                    className="btn-korigo-primary w-full text-xs uppercase py-3.5 shadow-glow-green"
                  >
                    Add Duo Pack • ₹158
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          CLEAN-LABEL USP ICON BAR (Luxury Roasted Gourmet Ribbon)
          ========================================================================= */}
      <div className="relative z-20 border-t border-b border-[#3d694b]/60 bg-gradient-to-r from-[#467655] via-[#528663] to-[#467655] py-3.5 px-4 overflow-x-auto scrollbar-none shadow-md">
        <div className="max-w-[1260px] mx-auto flex items-center justify-between gap-6 min-w-[760px] text-xs font-serif text-white/95">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
            <span className="font-bold uppercase tracking-wider text-white">100% GLUTEN FREE</span>
          </div>
          <span className="text-white/40">•</span>
          <div className="flex items-center gap-2">
            <span className="text-base">🌱</span>
            <span className="font-bold uppercase tracking-wider text-white">NON-GMO & VEGAN</span>
          </div>
          <span className="text-amber-500/40">•</span>
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <span className="font-bold uppercase tracking-wider text-white">SLOW-ROASTED (0% PALM OIL)</span>
          </div>
          <span className="text-amber-500/40">•</span>
          <div className="flex items-center gap-2">
            <span className="text-base">💪</span>
            <span className="font-bold uppercase tracking-wider text-white">9.7G PROTEIN / 100G</span>
          </div>
          <span className="text-amber-500/40">•</span>
          <div className="flex items-center gap-2">
            <span className="text-base">❤️</span>
            <span className="font-bold uppercase tracking-wider text-white">ZERO CHOLESTEROL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
