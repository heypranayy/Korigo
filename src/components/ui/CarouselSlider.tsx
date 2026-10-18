"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { soundFx } from "../../lib/audio/soundEffects";

/* ---------------- Types ---------------- */

export interface Slide {
  id: number;
  img: string;
  title?: string;
  subtitle?: string;
  price?: string;
  tag?: string;
  badge?: string;
  accent?: string;
  slug?: string;
}

type IconRenderer = (props?: { className?: string; isLiked?: boolean }) => React.ReactNode;

interface CarouselSliderProps {
  slides?: Slide[];
  favouriteIcon?: IconRenderer;
  className?: string;
  cardClassName?: string;
  controlledIndex?: number;
  onSlideChange?: (currentSlide: Slide, index: number) => void;
  showCardDetails?: boolean;
}

/* ---------------- Defaults ---------------- */

export const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    img: "/assets/korigo/products/transparent_sassy_sriracha.webp",
    title: "Sassy Sriracha",
    subtitle: "Fiery Chilli • Smoky Garlic",
    price: "₹99",
    badge: "🔥 Best Seller",
    tag: "LEGENDARY FIRE",
    accent: "#e33131",
    slug: "sassy-sriracha",
  },
  {
    id: 2,
    img: "/assets/korigo/products/transparent_garlicked_cheese.webp",
    title: "Garlicked Cheese",
    subtitle: "Aged Cheddar • Golden Garlic",
    price: "₹99",
    badge: "🧀 Fan Favorite",
    tag: "EPIC SAVORY",
    accent: "#f59e0b",
    slug: "garlicked-cheese-makhana",
  },
  {
    id: 3,
    img: "/assets/korigo/products/transparent_citrus_cartel.webp",
    title: "Citrus Cartel",
    subtitle: "Zesty Lime • Crushed Mint",
    price: "₹99",
    badge: "🍋 Chef's Pick",
    tag: "RARE ZEST",
    accent: "#148f2c",
    slug: "citrus-cartel-makhana",
  },
  {
    id: 4,
    img: "/assets/korigo/products/transparent_creme_onion.webp",
    title: "Sour Crème d' Onion",
    subtitle: "French Herbs • Velvet Cream",
    price: "₹99",
    badge: "🧅 Smooth Herb",
    tag: "EPIC HERBAL",
    accent: "#10b981",
    slug: "creme-d-onion-makhana",
  },
  {
    id: 5,
    img: "/assets/korigo/products/transparent_cinnamon_drip.webp",
    title: "Cinnamon Drip",
    subtitle: "Ceylon Cinnamon • Caramel Glaze",
    price: "₹99",
    badge: "🍯 Dessert Drop",
    tag: "SWEET MYTHIC",
    accent: "#d97706",
    slug: "cinnamon-drip-makhana",
  },
  {
    id: 6,
    img: "/assets/korigo/products/transparent_coco_island.webp",
    title: "Coco Island",
    subtitle: "Toasted Coconut • Vanilla Drift",
    price: "₹99",
    badge: "🥥 Island Breeze",
    tag: "TROPICAL EXOTIC",
    accent: "#0ea5e9",
    slug: "coco-island-makhana",
  },
];

/* ---------------- Animation Variants (Watermelon UI Specification) ---------------- */

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 220 : -220,
    filter: "brightness(1.8)",
    scale: 0.75,
    opacity: 0,
    rotate: direction > 0 ? 28 : -28,
  }),
  center: {
    x: 0,
    filter: "brightness(1)",
    scale: 1,
    opacity: 1,
    rotate: -3,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -220 : 220,
    filter: "brightness(1.8)",
    scale: 0.75,
    opacity: 0,
    rotate: direction > 0 ? -28 : 28,
    zIndex: 0,
  }),
};

/* ---------------- Component ---------------- */

export const CarouselSlider: React.FC<CarouselSliderProps> = ({
  slides = DEFAULT_SLIDES,
  favouriteIcon,
  className = "",
  cardClassName = "",
  controlledIndex,
  onSlideChange,
  showCardDetails = true,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (
      controlledIndex !== undefined &&
      controlledIndex !== index &&
      controlledIndex >= 0 &&
      controlledIndex < slides.length
    ) {
      setDirection(controlledIndex > index ? 1 : -1);
      setIndex(controlledIndex);
    }
  }, [controlledIndex, slides.length]);

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-18, 18]);

  const paginate = (newDirection: number) => {
    soundFx.playCrunch();
    setDirection(newDirection);
    setIndex((prev) => {
      const nextIdx = (prev + newDirection + slides.length) % slides.length;
      if (onSlideChange) {
        onSlideChange(slides[nextIdx], nextIdx);
      }
      return nextIdx;
    });
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -90) paginate(1);
    else if (info.offset.x > 90) paginate(-1);
  };

  const toggleLike = (slideId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    setLiked((prev) => ({ ...prev, [slideId]: !prev[slideId] }));
  };

  const currentSlide = slides[index];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Slider Wrapper with playful game-card tilt */}
      <div className="relative w-64 sm:w-72 md:w-80 h-96 sm:h-[420px] flex items-center justify-center -rotate-[6deg]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", bounce: 0.22, duration: 0.55 },
              scale: { duration: 0.35 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ rotate, x: dragX }}
            onDragEnd={handleDragEnd}
            className={`absolute w-full h-full bg-white rounded-[40px] p-2.5 shadow-[0_20px_50px_rgba(82,134,99,0.18)] border-2 border-[#528663]/30 overflow-hidden cursor-grab active:cursor-grabbing will-change-transform ${cardClassName}`}
          >
            <div className="w-full h-full rounded-[32px] overflow-hidden bg-gradient-to-b from-white via-[#f7faf8] to-[#eef5f0] border border-[#528663]/15 relative flex flex-col justify-between p-4">
              {/* Top Tag & Like Button */}
              <div className="flex items-center justify-between z-10">
                {currentSlide.badge ? (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#528663] text-white shadow-sm border border-[#467655]">
                    {currentSlide.badge}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#528663]/10 text-[#528663] border border-[#528663]/20">
                    SLIDE {String(index + 1).padStart(2, "0")}
                  </span>
                )}

                {/* Favourite Button */}
                <button
                  type="button"
                  title="Favourite"
                  onClick={(e) => toggleLike(currentSlide.id, e)}
                  className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-[#528663]/25 active:scale-90 transition-transform"
                >
                  {favouriteIcon ? (
                    favouriteIcon({
                      className: "text-[#528663]",
                      isLiked: !!liked[currentSlide.id],
                    })
                  ) : (
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        liked[currentSlide.id]
                          ? "fill-red-500 text-red-500"
                          : "text-[#528663]"
                      }`}
                    />
                  )}
                </button>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 w-full flex items-center justify-center my-2 pointer-events-none">
                {currentSlide.accent && (
                  <div
                    className="absolute w-36 h-36 rounded-full blur-2xl opacity-40 animate-pulse"
                    style={{ backgroundColor: currentSlide.accent }}
                  />
                )}
                <div className="relative w-full h-full max-h-[220px] flex items-center justify-center">
                  <img
                    src={currentSlide.img}
                    alt={currentSlide.title || ""}
                    className="object-contain max-h-full max-w-full drop-shadow-[0_20px_35px_rgba(82,134,99,0.25)] filter brightness-105"
                  />
                </div>
              </div>

              {/* Bottom Details Card */}
              {showCardDetails && currentSlide.title && (
                <div className="z-10 rounded-[22px] bg-white/95 backdrop-blur-md p-3.5 border border-[#528663]/20 shadow-lg text-black">
                  <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-gray-500 mb-0.5">
                    <span className="font-semibold">{currentSlide.tag || "ROASTED SUPERFOOD"}</span>
                    <span className="font-bold text-[#528663]">
                      STARTING
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-lg font-black tracking-tight text-black">
                      {currentSlide.title}
                    </h3>
                    <span className="font-serif text-base font-black text-black">
                      {currentSlide.price || "₹99"}
                    </span>
                  </div>
                  {currentSlide.subtitle && (
                    <p className="text-[10px] text-gray-600 font-serif line-clamp-1 mt-0.5">
                      {currentSlide.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background Stacked Card 1 (Behind) */}
        <div className="absolute -z-10 w-[95%] h-[95%] bg-white rounded-[40px] border-[4px] border-[#528663]/20 shadow-md scale-95 opacity-80 -rotate-[2deg] translate-x-2 translate-y-2 pointer-events-none" />

        {/* Background Stacked Card 2 (Far Behind) */}
        <div className="absolute -z-20 w-[90%] h-[90%] bg-[#eef5f0] rounded-[40px] border-[3px] border-[#528663]/15 scale-90 opacity-60 rotate-[3deg] translate-x-4 translate-y-4 pointer-events-none" />
      </div>

      {/* Pagination Dots at -rotate-[6deg] */}
      <div className="flex items-center gap-2.5 mt-8 pl-6 -rotate-[6deg]">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === index ? 1.35 : 1,
              opacity: i === index ? 1 : 0.45,
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 22,
            }}
            className={`h-2.5 rounded-full cursor-pointer transition-all ${
              i === index
                ? "w-7 bg-[#528663] shadow-sm shadow-[#528663]/40"
                : "w-2.5 bg-[#CCC7B8] hover:bg-gray-400"
            }`}
            onClick={() => {
              soundFx.playPop();
              setDirection(i > index ? 1 : -1);
              setIndex(i);
              if (onSlideChange) {
                onSlideChange(slides[i], i);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselSlider;
