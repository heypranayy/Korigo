"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  ShoppingBag,
  ArrowRight,
  Zap,
  Check,
  Layers,
  Sparkle,
} from "lucide-react";
import { useCart } from "../../lib/context/CartContext";
import { soundFx } from "../../lib/audio/soundEffects";
import { CarouselSlider, type Slide } from "../ui/CarouselSlider";

export interface MakhanaCardItem {
  id: number;
  name: string;
  tagline: string;
  rarity: string;
  rarityColor: string;
  badge: string;
  price: string;
  slug: string;
  packImg: string;
  makhanaImg: string;
  bgGradient: string;
  glowColor: string;
  tastingNotes: string;
  spiceHeat: number;
  spiceLabel: string;
  protein: string;
  calories: string;
  fibre: string;
  bestPairedWith: string;
  originSubtitle: string;
}

export const MAKHANA_DECK_ITEMS: MakhanaCardItem[] = [
  {
    id: 133,
    name: "Sassy Sriracha",
    tagline: "Fiery red chillies slow-roasted with smoky mountain garlic and Himalayan rock salt.",
    rarity: "LEGENDARY FIRE",
    rarityColor: "bg-red-500/20 text-red-300 border-red-500/40",
    badge: "🔥 Best Seller",
    price: "₹99",
    slug: "sassy-sriracha",
    packImg: "/assets/korigo/products/white_front_ssasy_siracha.png",
    makhanaImg: "/assets/korigo/makhana/makhana_sriracha.png",
    bgGradient: "from-[#2f0808] via-[#1a0505] to-[#0c0202]",
    glowColor: "rgba(227, 49, 49, 0.55)",
    tastingNotes: "Sun-ripened red chillies, toasted garlic crisp, smoked sea salt",
    spiceHeat: 4,
    spiceLabel: "Fiery Kick",
    protein: "9.7g / 100g",
    calories: "148 kcal",
    fibre: "3.8g",
    bestPairedWith: "Cold brew, iced tea or late-night gaming binge",
    originSubtitle: "SLOW-ROASTED • FIERY CHILLI POP",
  },
  {
    id: 131,
    name: "Garlicked Cheese",
    tagline: "Rich aged golden cheddar married with slow-toasted pungent mountain garlic.",
    rarity: "EPIC SAVORY",
    rarityColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    badge: "🧀 Fan Favorite",
    price: "₹99",
    slug: "garlicked-cheese-makhana",
    packImg: "/assets/korigo/products/white_front_garlicked_cheese.png",
    makhanaImg: "/assets/korigo/makhana/makhana_cheese.png",
    bgGradient: "from-[#2d1802] via-[#1a0e02] to-[#0d0701]",
    glowColor: "rgba(245, 158, 11, 0.55)",
    tastingNotes: "Aged English cheddar, roasted garlic bits, dried Italian oregano",
    spiceHeat: 1,
    spiceLabel: "Mild & Savory",
    protein: "9.6g / 100g",
    calories: "152 kcal",
    fibre: "3.5g",
    bestPairedWith: "Evening mocktails & gourmet cheese platters",
    originSubtitle: "AGED CHEDDAR • GOLDEN GARLIC",
  },
  {
    id: 128,
    name: "Citrus Cartel",
    tagline: "Explosive sun-kissed lime, garden mint leaves and tangy Himalayan chaat spice.",
    rarity: "RARE ZEST",
    rarityColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    badge: "🍋 Chef's Pick",
    price: "₹99",
    slug: "citrus-cartel-makhana",
    packImg: "/assets/korigo/products/white_front_citrus_cirtel.png",
    makhanaImg: "/assets/korigo/makhana/makhana_roasted.png",
    bgGradient: "from-[#082b11] via-[#041708] to-[#020d04]",
    glowColor: "rgba(20, 143, 44, 0.55)",
    tastingNotes: "Zesty Persian lime, crushed spearmint, black salt, amchur",
    spiceHeat: 2,
    spiceLabel: "Tangy Zing",
    protein: "9.8g / 100g",
    calories: "144 kcal",
    fibre: "4.1g",
    bestPairedWith: "Midday work break & post-workout hydration",
    originSubtitle: "PERSIAN LIME • WILD MINT CRUNCH",
  },
  {
    id: 130,
    name: "Sour Crème d' Onion",
    tagline: "Velvety smooth French sour cream perfectly balanced with sweet tender chives.",
    rarity: "EPIC HERBAL",
    rarityColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    badge: "🧅 Velvety Smooth",
    price: "₹99",
    slug: "creme-d-onion-makhana",
    packImg: "/assets/korigo/products/white_front.png",
    makhanaImg: "/assets/korigo/makhana/makhana_roasted.png",
    bgGradient: "from-[#052919] via-[#02180e] to-[#010e08]",
    glowColor: "rgba(16, 185, 129, 0.55)",
    tastingNotes: "Cultured sour cream, French garden chives, white onion, parsley",
    spiceHeat: 1,
    spiceLabel: "Creamy Herb",
    protein: "9.5g / 100g",
    calories: "150 kcal",
    fibre: "3.6g",
    bestPairedWith: "Weekend movie binge & study focus sessions",
    originSubtitle: "FRENCH CHIVES • HERBED VELVET",
  },
  {
    id: 129,
    name: "Cinnamon Drip",
    tagline: "Pure Ceylon cinnamon bark glazed with warm buttery caramel crunch sweetness.",
    rarity: "SWEET MYTHIC",
    rarityColor: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    badge: "🍯 Dessert Drop",
    price: "₹99",
    slug: "cinnamon-drip-makhana",
    packImg: "/assets/korigo/products/white_front_cinemon_drip.png",
    makhanaImg: "/assets/korigo/makhana/makhana_roasted.png",
    bgGradient: "from-[#2b1704] via-[#170c02] to-[#0c0601]",
    glowColor: "rgba(217, 119, 6, 0.55)",
    tastingNotes: "Ceylon cinnamon, golden cane caramel, vanilla bean, sea salt",
    spiceHeat: 0,
    spiceLabel: "Sweet Cinnamon",
    protein: "9.4g / 100g",
    calories: "155 kcal",
    fibre: "3.9g",
    bestPairedWith: "Guilt-free post-dinner sweet craving",
    originSubtitle: "CEYLON BARK • CARAMEL CRUNCH",
  },
  {
    id: 132,
    name: "Coco Island",
    tagline: "Crisp toasted coconut flakes infused with tropical creaminess and gentle vanilla.",
    rarity: "TROPICAL EXOTIC",
    rarityColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    badge: "🥥 Island Breeze",
    price: "₹99",
    slug: "coco-island-makhana",
    packImg: "/assets/korigo/products/white_front_coco_island.png",
    makhanaImg: "/assets/korigo/makhana/makhana_roasted.png",
    bgGradient: "from-[#072433] via-[#03131c] to-[#010a0e]",
    glowColor: "rgba(56, 189, 248, 0.55)",
    tastingNotes: "Sun-dried grated coconut, light cane nectar, Madagascar vanilla",
    spiceHeat: 0,
    spiceLabel: "Tropical Sweet",
    protein: "9.3g / 100g",
    calories: "153 kcal",
    fibre: "4.0g",
    bestPairedWith: "Morning acai bowls & outdoor adventure trails",
    originSubtitle: "TOASTED COCONUT • VANILLA DRIFT",
  },
];

export const Makhana3DCardDeck: React.FC = () => {
  const [items] = useState<MakhanaCardItem[]>(MAKHANA_DECK_ITEMS);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart, openCart } = useCart();

  const activeItem = items[activeIdx];

  // Convert makhana items to CarouselSlider Slide format
  const slides: Slide[] = items.map((item) => ({
    id: item.id,
    img: item.packImg,
    title: item.name,
    subtitle: item.originSubtitle,
    price: item.price,
    badge: item.badge,
    tag: item.rarity,
    accent: item.glowColor,
    slug: item.slug,
  }));

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);
    soundFx.playCrunch();
    const success = await addToCart(activeItem.id, 1);
    setIsAdding(false);
    if (success) {
      setAdded(true);
      openCart();
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="w-full relative py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* =========================================================
            LEFT COLUMN: WATERMELON CAROUSEL SLIDER WITH SPRING PHYSICS
            ========================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative select-none">
          {/* Ambient Glow Aura */}
          <div
            className="absolute w-[440px] h-[440px] rounded-full blur-[130px] pointer-events-none transition-colors duration-700 opacity-60"
            style={{ backgroundColor: activeItem.glowColor }}
          />

          {/* CarouselSlider component */}
          <CarouselSlider
            slides={slides}
            controlledIndex={activeIdx}
            onSlideChange={(_, idx) => setActiveIdx(idx)}
            className="my-3"
          />

          {/* Swipe Hint */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-serif text-gray-500 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <span className="animate-bounce">👉</span>
            <span>Drag / swipe the card left or right, or click the dots below</span>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: DYNAMIC NUTRITIONAL HUD & FLAVOUR METRICS
            ========================================================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Active Card Specs Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-korigo-lightGreen text-korigo-darkGreen border border-korigo-green/20">
              <Zap className="w-3.5 h-3.5 text-korigo-green" />
              <span>SUPERFOOD POP DECK • LEVEL 1</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-black text-black">
              {activeItem.name}
            </h3>

            <p className="text-gray-600 font-serif text-sm sm:text-base leading-relaxed">
              {activeItem.tagline}
            </p>
          </div>

          {/* Interactive Flavour Stats Grid (Game HUD style) */}
          <div className="grid grid-cols-2 gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-200">
            {/* Heat Meter */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-1">
                SPICE INTENSITY
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-4 h-4 ${
                        i < activeItem.spiceHeat
                          ? "fill-red-500 text-red-500"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700 ml-1">
                  {activeItem.spiceLabel}
                </span>
              </div>
            </div>

            {/* Protein Metric */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-1">
                PLANT PROTEIN
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-korigo-darkGreen font-serif">
                  {activeItem.protein.split(" ")[0]}
                </span>
                <span className="text-xs text-gray-500">
                  / 100g pure fuel
                </span>
              </div>
            </div>

            {/* Fibre Metric */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-1">
                DIETARY FIBRE
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-korigo-darkGreen font-serif">
                  {activeItem.fibre}
                </span>
                <span className="text-xs text-gray-500">
                  per 35g pack
                </span>
              </div>
            </div>

            {/* Calorie Balance */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-1">
                SLOW-ROASTED ENERGY
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-black font-serif">
                  {activeItem.calories.split(" ")[0]}
                </span>
                <span className="text-xs text-gray-500">
                  kcal (0% palm oil)
                </span>
              </div>
            </div>
          </div>

          {/* Tasting Notes & Pairing Advice */}
          <div className="p-4 rounded-2xl bg-korigo-lightGreen/40 border border-korigo-green/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-korigo-darkGreen font-serif uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-korigo-green" />
              <span>Authentic Spice Blend</span>
            </div>
            <p className="text-xs font-serif text-gray-700 leading-relaxed">
              <strong>Tasting Notes:</strong> {activeItem.tastingNotes}
            </p>
            <p className="text-xs font-serif text-gray-600 leading-relaxed">
              <strong>Best Paired With:</strong> {activeItem.bestPairedWith}
            </p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="btn-korigo-primary w-full py-4 text-xs uppercase tracking-wider shadow-glow-green flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Added {activeItem.name}!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {activeItem.name} • {activeItem.price}</span>
                </>
              )}
            </button>

            <Link
              href={`/products/${activeItem.slug}`}
              className="w-full sm:w-auto px-6 py-4 rounded-full border border-gray-300 hover:border-black font-serif text-xs font-bold uppercase tracking-wider text-black text-center transition whitespace-nowrap bg-white hover:bg-gray-50"
            >
              Full Specs →
            </Link>
          </div>

          {/* Deck Thumbnail Selector Bar */}
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
              QUICK SELECT FLAVOUR:
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((item, idx) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    soundFx.playPop();
                    setActiveIdx(idx);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all duration-200 flex items-center gap-1.5 ${
                    activeIdx === idx
                      ? "bg-black text-white font-bold shadow-md scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.glowColor.replace("0.55", "1") }}
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
