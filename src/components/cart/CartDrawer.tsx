"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Check, Sparkles, ShieldCheck, Lock } from "lucide-react";
import { useCart } from "../../lib/context/CartContext";
import { formatStorePrice } from "../../lib/woocommerce/storeApi";

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    itemCount,
    subtotal,
    currencySymbol,
    updateQuantity,
    removeItem,
    addToCart,
    isLoading,
  } = useCart();

  if (!isOpen) return null;

  // Free shipping threshold calculations (₹499)
  const numericSubtotal = parseFloat(subtotal) || 0;
  const shippingThreshold = 499;
  const amountRemaining = Math.max(0, shippingThreshold - numericSubtotal);
  const progressPercent = Math.min(100, Math.round((numericSubtotal / shippingThreshold) * 100));
  const hasFreeShipping = numericSubtotal >= shippingThreshold;

  // Recommended quick add-on item (Citrus Cartel)
  const upsellFlavour = {
    id: 128,
    name: "Citrus Cartel Makhana (35g)",
    price: 99,
    image: "/assets/korigo/products/citrus.png",
  };

  const handleQuickAddUpsell = async () => {
    await addToCart(upsellFlavour.id, 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-sm"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-korigo-lightGreen flex items-center justify-center text-korigo-green">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold font-serif text-black">
                Your Snack Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CRO: Free Shipping Progress Bar */}
          <div className="bg-emerald-50/70 border-b border-emerald-100 p-4">
            <div className="flex items-center justify-between text-xs font-serif mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-korigo-green" />
                <span className="font-semibold text-emerald-950">
                  {hasFreeShipping ? (
                    <span className="text-korigo-darkGreen font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-korigo-green" />
                      Unlocked FREE Pan-India Shipping!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{amountRemaining}</strong> more for <strong>FREE Shipping</strong>
                    </span>
                  )}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 font-sans">
                {progressPercent}%
              </span>
            </div>
            {/* Progress Track */}
            <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-korigo-darkGreen via-korigo-green to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Drawer Body: Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-korigo-lightGreen flex items-center justify-center mb-4 text-korigo-green">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-serif mb-2 text-black">Your Cart Is Empty</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-xs font-serif">
                  Ready to experience the ultimate guilt-free crunch? Explore our 6 signature flavours.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn-korigo-primary text-xs uppercase tracking-wider px-7 py-3 font-serif"
                >
                  Start Snacking Now
                </Link>
              </div>
            ) : (
              <>
                {items.map((item) => {
                  const imgUrl = item.images?.[0]?.src || "/assets/korigo/products/citrus.png";
                  const linePrice = item.totals?.line_total
                    ? formatStorePrice(item.totals.line_total)
                    : formatStorePrice(item.prices.price);

                  return (
                    <div key={item.key} className="py-4 flex gap-4 items-center">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0 overflow-hidden shadow-sm">
                        <Image
                          src={imgUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-serif font-bold text-black leading-tight line-clamp-2 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm font-bold text-korigo-darkGreen mb-2 font-serif">
                          {currencySymbol}{linePrice}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              disabled={isLoading}
                              className="p-1 hover:bg-gray-100 text-gray-600 transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              disabled={isLoading}
                              className="p-1 hover:bg-gray-100 text-gray-600 transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.key)}
                            disabled={isLoading}
                            className="text-gray-400 hover:text-red-600 p-1.5 transition rounded hover:bg-red-50"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* CRO: 1-Click Upsell Card */}
                <div className="pt-4 mt-2">
                  <div className="p-3 rounded-xl bg-gray-50 border border-dashed border-korigo-green/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-12 h-12 bg-white rounded-lg border border-gray-100 p-1 flex-shrink-0">
                        <Image
                          src={upsellFlavour.image}
                          alt={upsellFlavour.name}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-1.5 rounded">
                            Popular Add-On
                          </span>
                        </div>
                        <p className="text-xs font-serif font-bold text-black leading-tight">
                          {upsellFlavour.name}
                        </p>
                        <p className="text-xs font-bold text-korigo-darkGreen">
                          ₹{upsellFlavour.price}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleQuickAddUpsell}
                      disabled={isLoading}
                      className="px-3 py-1.5 rounded-lg bg-korigo-green hover:bg-korigo-darkGreen text-white text-xs font-serif font-bold transition shadow-sm flex-shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with High-CRO Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/70 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-base font-bold font-serif text-black">
                  <span>Subtotal</span>
                  <span className="text-korigo-darkGreen">
                    {currencySymbol}{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-serif">
                  <span>Shipping</span>
                  <span className="text-korigo-green font-semibold">
                    {hasFreeShipping ? "FREE" : "₹49 (Pan-India)"}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-serif pt-1">
                  Taxes & GST included. Courier tracking sent via SMS & WhatsApp.
                </p>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-korigo-darkGreen via-korigo-green to-emerald-500 text-white font-serif font-bold uppercase tracking-wider text-xs sm:text-sm text-center shadow-lg shadow-korigo-green/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-emerald-200" />
                  <span>Secure Checkout • {currencySymbol}{subtotal}</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-xs font-serif font-semibold text-gray-600 hover:text-korigo-green py-1 underline"
                >
                  View Full Cart Page
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-2 border-t border-gray-200 flex items-center justify-around text-[10px] text-gray-500 font-serif">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-korigo-green" />
                  100% Genuine
                </span>
                <span>•</span>
                <span>UPI / Cards / COD</span>
                <span>•</span>
                <span>Safe 256-Bit SSL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
