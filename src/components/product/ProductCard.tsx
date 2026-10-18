"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, Check, Sparkles } from "lucide-react";
import { StoreApiProduct } from "../../lib/woocommerce/types";
import { formatStorePrice } from "../../lib/woocommerce/storeApi";
import { useCart } from "../../lib/context/CartContext";
import { soundFx } from "../../lib/audio/soundEffects";
import { TiltCard3D } from "../ui/TiltCard3D";

interface ProductCardProps {
  product: StoreApiProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isLoading, openCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  const isSoldOut = !product.is_in_stock || product.slug === "coco-world-makhana";
  const isCombo = product.type === "combo" || product.slug.includes("combo");

  const LOCAL_TRANSPARENT_IMAGES: Record<string, string> = {
    "sassy-sriracha": "/assets/korigo/products/transparent_sassy_sriracha.webp",
    "garlicked-cheese-makhana": "/assets/korigo/products/transparent_garlicked_cheese.webp",
    "citrus-cartel-makhana": "/assets/korigo/products/transparent_citrus_cartel.webp",
    "creme-d-onion-makhana": "/assets/korigo/products/transparent_creme_onion.webp",
    "cinnamon-drip": "/assets/korigo/products/transparent_cinnamon_drip.webp",
    "cinnamon-drip-makhana": "/assets/korigo/products/transparent_cinnamon_drip.webp",
    "coco-world-makhana": "/assets/korigo/products/transparent_coco_island.webp",
    "coco-island-makhana": "/assets/korigo/products/transparent_coco_island.webp",
    "garlic-cheese-sassy-sriracha-combo": "/assets/korigo/combos/transparent_garlic_sasy.webp",
    "citrus-cartel-sassy-sriracha-combo": "/assets/korigo/combos/transparent_citrus_sassy.webp",
    "citrus-cartel-garlicked-cheese-combo": "/assets/korigo/combos/transparent_garlc_citrus.webp",
    "garlicked-cheese-cinnamon-drip-combo": "/assets/korigo/combos/transparent_garlic_cinemon.webp",
    "cinnamon-drip-sour-cream-onion-combo": "/assets/korigo/combos/transparent_creme_cinemo.webp",
    "sassy-sriracha-sour-cream-onion-combo": "/assets/korigo/combos/transparent_creamonion_sassy.webp",
  };

  const primaryImg = LOCAL_TRANSPARENT_IMAGES[product.slug] || product.images?.[0]?.src || "/assets/korigo/products/transparent_citrus_cartel.webp";
  const hoverImg = LOCAL_TRANSPARENT_IMAGES[product.slug] || product.images?.[1]?.src || primaryImg;

  // Variants for each card type
  const variants = isCombo
    ? [
        { label: "1 Duo (70g)", multiplier: 1, price: 158, regularPrice: 198, badge: "Save ₹40" },
        { label: "2 Duos (140g)", multiplier: 2, price: 300, regularPrice: 396, badge: "Save ₹96" },
        { label: "3 Duos (210g)", multiplier: 3, price: 450, regularPrice: 594, badge: "Save ₹144" },
      ]
    : [
        { label: "35g Single", multiplier: 1, price: 99, regularPrice: 119, badge: null },
        { label: "3-Pack", multiplier: 3, price: 289, regularPrice: 357, badge: "Save ₹68" },
        { label: "6-Pack", multiplier: 6, price: 549, regularPrice: 714, badge: "Save ₹165" },
      ];

  const currentVariant = variants[selectedVariantIdx];
  const isOnSale = isCombo || currentVariant.badge !== null;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut || isAdding) return;
    setIsAdding(true);
    soundFx.playCrunch();
    const success = await addToCart(product.id, currentVariant.multiplier);
    setIsAdding(false);
    if (success) {
      setAdded(true);
      openCart();
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleVariantSelect = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    soundFx.playPop();
    setSelectedVariantIdx(idx);
  };

  return (
    <TiltCard3D
      maxTilt={6}
      scale={1.02}
      className="group relative flex flex-col bg-white border border-gray-100 hover:border-korigo-green/40 hover:shadow-3d transition-all duration-300 rounded-2xl p-3 md:p-4 overflow-hidden"
    >
      {/* Product Image Stage */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full bg-gradient-to-b from-[#faf9f7] to-[#f2eee7] border border-gray-100/80 rounded-xl overflow-hidden flex items-center justify-center mb-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 pointer-events-none">
          {isSoldOut ? (
            <span className="bg-neutral-600 text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-full shadow-sm">
              Sold Out
            </span>
          ) : currentVariant.badge ? (
            <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black px-2.5 py-0.5 uppercase tracking-wider rounded-full shadow-md animate-pulse">
              {currentVariant.badge}
            </span>
          ) : isCombo ? (
            <span className="bg-korigo-darkGreen/90 backdrop-blur-sm text-emerald-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-400/20">
              Dual Pack
            </span>
          ) : null}
        </div>

        {/* 3D Floating Packshot */}
        <div className="relative w-4/5 h-4/5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
          <Image
            src={isHovered ? hoverImg : primaryImg}
            alt={product.name}
            fill
            className="object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.18)]"
            sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 240px"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Social Proof Star Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-500 font-sans">
              4.9 (180+)
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif font-bold text-sm text-black line-clamp-2 leading-snug group-hover:text-korigo-green transition-colors mb-2">
            <Link href={`/products/${product.slug}`}>
              {product.name.replace(/&#8217;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"')}
            </Link>
          </h3>

          {/* Interactive Pack Variant Selector Chips */}
          {!isSoldOut && (
            <div className="my-2">
              <div className="flex items-center gap-1.5">
                {variants.map((v, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleVariantSelect(e, idx)}
                    className={`flex-1 py-1 px-1.5 text-[10px] font-serif font-bold rounded-lg border transition-all text-center whitespace-nowrap ${
                      selectedVariantIdx === idx
                        ? "bg-korigo-darkGreen text-white border-korigo-darkGreen shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="pt-2 border-t border-gray-50 mt-1">
          <div className="flex items-baseline justify-between gap-2 mb-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-base md:text-lg text-black">
                ₹{currentVariant.price}
              </span>
              {currentVariant.regularPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{currentVariant.regularPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] font-serif text-korigo-green font-semibold">
              {currentVariant.label}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isSoldOut || isAdding || isLoading}
            className={`w-full py-2.5 px-3 rounded-xl font-serif uppercase tracking-wider text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm ${
              isSoldOut
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                : added
                ? "bg-korigo-darkGreen text-white shadow-md shadow-korigo-green/20"
                : "bg-korigo-lightGreen text-korigo-darkGreen border border-korigo-green/30 hover:bg-korigo-green hover:text-white hover:shadow-md hover:shadow-korigo-green/20 active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  {isSoldOut ? "Sold Out" : isAdding ? "Adding..." : `Add to Cart • ₹${currentVariant.price}`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </TiltCard3D>
  );
};
