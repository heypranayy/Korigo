"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Plus, Minus, Check, Flame } from "lucide-react";
import { useCart } from "../../lib/context/CartContext";

interface StickyAddToCartBarProps {
  productId: number;
  productName: string;
  price: string;
  regularPrice?: string;
  isOnSale?: boolean;
  imageUrl: string;
  isSoldOut: boolean;
}

export const StickyAddToCartBar: React.FC<StickyAddToCartBarProps> = ({
  productId,
  productName,
  price,
  regularPrice,
  isOnSale,
  imageUrl,
  isSoldOut,
}) => {
  const { addToCart, isLoading, openCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = async () => {
    if (isSoldOut || isLoading) return;
    const success = await addToCart(productId, quantity);
    if (success) {
      setAdded(true);
      openCart();
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Sticky Add to Cart Bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-korigo-green/30 shadow-2xl shadow-korigo-darkGreen/20 py-3 px-4 md:px-8 transition-transform duration-300 animate-in slide-in-from-bottom"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Product Thumbnail & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-12 bg-white rounded-lg border border-korigo-green/20 p-1 flex-shrink-0 shadow-sm">
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm text-black truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {productName}
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Flame className="w-3 h-3 text-amber-500" />
                <span>High Demand</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-black font-serif">₹{price}</span>
              {isOnSale && regularPrice && (
                <span className="text-gray-400 line-through">₹{regularPrice}</span>
              )}
              <span className="text-[11px] text-korigo-green font-medium hidden md:inline">
                • 100% Roasted Foxnut Pops
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quantity Selector & CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {!isSoldOut && (
            <div className="hidden sm:flex items-center border border-gray-300 rounded-lg px-2 py-1.5 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-0.5 text-gray-500 hover:text-black"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-serif font-bold text-xs px-2.5">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="p-0.5 text-gray-500 hover:text-black"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={isSoldOut || isLoading}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-serif uppercase tracking-wider text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 ${
              isSoldOut
                ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                : added
                ? "bg-korigo-darkGreen text-white shadow-korigo-green/30"
                : "bg-gradient-to-r from-korigo-darkGreen via-korigo-green to-emerald-500 text-white shadow-korigo-green/40 hover:shadow-lg hover:scale-105 active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{isSoldOut ? "Sold Out" : isLoading ? "Adding..." : `Add to Cart • ₹${(parseFloat(price) * quantity).toFixed(0)}`}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
