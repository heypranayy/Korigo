"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingBag, Truck, ShieldCheck, Check, Sparkles, Tag } from "lucide-react";
import { useCart } from "../../lib/context/CartContext";
import { soundFx } from "../../lib/audio/soundEffects";

interface ProductActionsProps {
  productId: number;
  isSoldOut: boolean;
  basePrice?: number;
  isCombo?: boolean;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  isSoldOut,
  basePrice = 99,
  isCombo = false,
}) => {
  const { addToCart, isLoading, openCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Variant Options
  const variants = isCombo
    ? [
        {
          id: 1,
          name: "1 Duo-Pack (70g)",
          desc: "2 x 35g Packs",
          multiplier: 1,
          price: 158,
          regularPrice: 198,
          badge: "Save ₹40",
        },
        {
          id: 2,
          name: "2 Duo-Packs (140g)",
          desc: "4 x 35g Packs",
          multiplier: 2,
          price: 300,
          regularPrice: 396,
          badge: "Save ₹96",
        },
        {
          id: 3,
          name: "3 Duo-Packs (210g)",
          desc: "6 x 35g Packs",
          multiplier: 3,
          price: 450,
          regularPrice: 594,
          badge: "FREE SHIPPING • Save ₹144",
        },
      ]
    : [
        {
          id: 1,
          name: "Single Pack (35g)",
          desc: "Snack on the go",
          multiplier: 1,
          price: 99,
          regularPrice: 119,
          badge: "Trial Size",
        },
        {
          id: 2,
          name: "Pack of 3 (105g)",
          desc: "3 x 35g Pouches",
          multiplier: 3,
          price: 289,
          regularPrice: 357,
          badge: "Save ₹68",
        },
        {
          id: 3,
          name: "Family Pack of 6 (210g)",
          desc: "6 x 35g Pouches",
          multiplier: 6,
          price: 549,
          regularPrice: 714,
          badge: "FREE SHIPPING • Save ₹165",
        },
      ];

  const currentVariant = variants[selectedVariant];
  const totalPrice = currentVariant.price * quantity;

  const handleAdd = async () => {
    if (isSoldOut || isLoading) return;
    soundFx.playCrunch();
    // Add corresponding quantity based on variant multiplier * user count
    const totalQty = currentVariant.multiplier * quantity;
    const success = await addToCart(productId, totalQty);
    if (success) {
      setAdded(true);
      openCart();
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="space-y-5 my-6">
      {/* Pack Size / Variant Selector Buttons */}
      {!isSoldOut && (
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 block">
            SELECT PACK QUANTITY & SAVINGS:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {variants.map((v, i) => (
              <button
                type="button"
                key={v.id}
                onClick={() => {
                  soundFx.playPop();
                  setSelectedVariant(i);
                }}
                className={`p-3 rounded-xl border text-left transition-all duration-200 relative ${
                  selectedVariant === i
                    ? "border-korigo-green bg-korigo-lightGreen/50 shadow-sm ring-1 ring-korigo-green"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                {/* Savings Pill */}
                {v.badge && (
                  <span
                    className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5 ${
                      selectedVariant === i
                        ? "bg-korigo-darkGreen text-white"
                        : "bg-emerald-100 text-korigo-darkGreen"
                    }`}
                  >
                    {v.badge}
                  </span>
                )}
                <div className="font-serif font-bold text-sm text-black">
                  {v.name}
                </div>
                <div className="text-[11px] text-gray-500 font-serif mb-1">
                  {v.desc}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-black text-base text-black">
                    ₹{v.price}
                  </span>
                  {v.regularPrice && (
                    <span className="text-[11px] text-gray-400 line-through">
                      ₹{v.regularPrice}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {!isSoldOut && (
          <div className="flex items-center justify-between border border-gray-300 rounded-xl px-3 py-2 w-full sm:w-36 flex-shrink-0 bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1 text-gray-500 hover:text-black"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-base px-3">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="p-1 text-gray-500 hover:text-black"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={isSoldOut || isLoading}
          className={`flex-1 py-4 px-6 font-serif uppercase tracking-wider text-sm font-bold transition-all flex items-center justify-center gap-2 rounded-xl shadow-md ${
            isSoldOut
              ? "bg-neutral-200 text-neutral-500 cursor-not-allowed border border-neutral-300"
              : added
              ? "bg-korigo-darkGreen text-white"
              : "btn-korigo-primary hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>
                {isSoldOut
                  ? "Sold Out"
                  : isLoading
                  ? "Adding..."
                  : `Add ${currentVariant.name} • ₹${totalPrice}`}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Logistics & Delivery Notice */}
      <div className="bg-korigo-lightGreen/50 p-4 rounded-xl border border-korigo-green/20 space-y-2 text-xs text-gray-700 font-serif">
        <div className="flex items-center gap-2 text-korigo-darkGreen font-bold">
          <Truck className="w-4 h-4 text-korigo-green flex-shrink-0" />
          <span>Pan-India Fast Dispatch (Free Delivery above ₹499)</span>
        </div>
        <p>
          Dispatched within 24 hours directly from our roasting facility in Kolkata. Guaranteed 100% freshness in tamper-proof nitrogen sealed packs.
        </p>
        <div className="flex items-center gap-2 pt-1 text-korigo-darkGreen font-semibold">
          <ShieldCheck className="w-4 h-4 text-korigo-green flex-shrink-0" />
          <span>Certified Non-GMO, Slow-Roasted Lotus Seeds (FSSAI Certified)</span>
        </div>
      </div>
    </div>
  );
};
