"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "../../lib/context/CartContext";
import { formatStorePrice } from "../../lib/woocommerce/storeApi";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    total,
    currencySymbol,
    updateQuantity,
    removeItem,
    isLoading,
  } = useCart();

  const numSubtotal = parseFloat(subtotal);
  const freeShippingThreshold = 499;
  const amountNeeded = Math.max(0, freeShippingThreshold - numSubtotal);
  const progressPercent = Math.min(100, (numSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="py-10 md:py-16 bg-white min-h-[70vh]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-8">
          Your Shopping Cart ({itemCount})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded border border-gray-100 max-w-2xl mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-black mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
              You haven't added any crunchy makhana flavours yet. Explore our slow-roasted snacks now!
            </p>
            <Link
              href="/shop"
              className="btn-korigo-primary text-xs uppercase tracking-wider px-8 py-3.5 inline-flex items-center gap-2"
            >
              <span>Explore Snacks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping progress bar */}
              <div className="bg-gray-50 p-4 rounded border border-gray-200/80 mb-6">
                <p className="text-xs md:text-sm font-serif text-gray-700 mb-2">
                  {amountNeeded > 0 ? (
                    <span>
                      Add <strong className="text-korigo-green">₹{amountNeeded.toFixed(2)}</strong> more to unlock <strong className="text-black">FREE Shipping</strong>!
                    </span>
                  ) : (
                    <span className="text-korigo-darkGreen font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-korigo-green" />
                      Congratulations! You unlocked FREE Standard Shipping across India.
                    </span>
                  )}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-korigo-green h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="divide-y divide-gray-100 border border-gray-200 rounded">
                <div className="hidden md:grid grid-cols-12 p-4 bg-gray-50 text-xs font-serif font-bold uppercase tracking-wider text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {items.map((item) => {
                  const imgUrl = item.images?.[0]?.src || "/assets/korigo/products/citrus.png";
                  const unitPrice = formatStorePrice(item.prices.price);
                  const lineTotal = item.totals?.line_total
                    ? formatStorePrice(item.totals.line_total)
                    : unitPrice;

                  return (
                    <div
                      key={item.key}
                      className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product Details */}
                      <div className="col-span-6 flex gap-4 items-center">
                        <div className="relative w-20 h-20 bg-gray-50 rounded border border-gray-100 flex-shrink-0 overflow-hidden">
                          <Image
                            src={imgUrl}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-serif font-semibold text-sm md:text-base text-black leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.key)}
                            disabled={isLoading}
                            className="text-xs text-gray-400 hover:text-red-600 transition flex items-center gap-1 mt-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-2 text-center font-serif text-sm text-gray-700 hidden md:block">
                        {currencySymbol}{unitPrice}
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-2 flex justify-start md:justify-center">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            disabled={isLoading}
                            className="p-1.5 text-gray-500 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-serif font-bold text-xs px-3">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-1.5 text-gray-500 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-2 text-right font-serif font-bold text-base text-black">
                        {currencySymbol}{lineTotal}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4">
                <Link
                  href="/shop"
                  className="text-xs uppercase font-serif tracking-wider font-semibold text-black hover:text-korigo-green flex items-center gap-1"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 bg-gray-50 p-6 md:p-8 rounded border border-gray-200/80 space-y-6">
              <h2 className="text-xl font-serif font-bold text-black border-b border-gray-200 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm font-serif">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">
                    {currencySymbol}{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Shipping</span>
                  <span className="text-black">
                    {amountNeeded === 0 ? "FREE" : "₹50.00 (Calculated at checkout)"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST / Tax</span>
                  <span className="text-xs text-gray-500">Included in prices</span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-black">
                  <span>Total</span>
                  <span>
                    {currencySymbol}{total}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-korigo-primary w-full py-4 text-center text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 rounded"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-[11px] text-gray-500 font-serif leading-relaxed text-center space-y-1">
                <p>🔒 256-Bit SSL Encrypted Headless Checkout</p>
                <p>Orders dispatched securely from Kolkata base warehouse.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
