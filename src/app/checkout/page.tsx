"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ShieldCheck, Truck, ArrowLeft, AlertCircle } from "lucide-react";
import { useCart } from "../../lib/context/CartContext";
import { formatStorePrice } from "../../lib/woocommerce/storeApi";

export default function CheckoutPage() {
  const { items, itemCount, subtotal, total, currencySymbol } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "Kolkata",
    state: "West Bengal",
    postcode: "700107",
    country: "IN",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Display authentic checkout pending status per project specification
    setOrderNotice(
      "Your shipping details have been validated. Live online payments (Razorpay / UPI / Cashfree) will be finalized once payment credentials are synchronized with the merchant account. No payment has been debited."
    );
    setIsSubmitting(false);
  };

  const numSubtotal = parseFloat(subtotal);
  const shippingFee = numSubtotal >= 499 ? 0 : 50;
  const grandTotal = (numSubtotal + shippingFee).toFixed(2);

  return (
    <div className="py-10 md:py-16 bg-[#fcfcfc] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
          <Link href="/" className="relative h-10 w-36 inline-block">
            <Image
              src="/assets/korigo/logo/Untitled_design_8_9a03f168-3203-4942-b0b0-e445ec329911.png"
              alt="Korigo Snacks"
              fill
              className="object-contain"
            />
          </Link>
          <div className="flex items-center gap-2 text-xs font-serif text-gray-500">
            <Lock className="w-4 h-4 text-korigo-green" />
            <span>Secure Headless Checkout</span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white p-8 rounded border border-gray-200 max-w-md mx-auto">
            <h2 className="text-xl font-serif font-bold text-black mb-2">No items to checkout</h2>
            <p className="text-xs text-gray-500 mb-6">Your shopping cart is currently empty.</p>
            <Link href="/shop" className="btn-korigo-primary text-xs uppercase px-6 py-3">
              Explore Snacks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Customer & Shipping Address Form */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded border border-gray-200 space-y-6">
              {orderNotice && (
                <div className="p-4 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs md:text-sm font-serif leading-relaxed flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-1">Payment Gateway Notice</strong>
                    {orderNotice}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h2 className="font-serif font-bold text-lg text-black mb-4">
                    1. Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-serif text-gray-600 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@example.com"
                        className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif text-gray-600 mb-1">
                        Phone Number (For Delivery SMS) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="pt-4 border-t border-gray-100">
                  <h2 className="font-serif font-bold text-lg text-black mb-4">
                    2. Shipping Address (Pan-India)
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-serif text-gray-600 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-gray-600 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-serif text-gray-600 mb-1">
                        Street Address & House / Flat No. *
                      </label>
                      <input
                        type="text"
                        name="address1"
                        required
                        value={formData.address1}
                        onChange={handleInputChange}
                        placeholder="House / Apartment / Street Name"
                        className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif text-gray-600 mb-1">
                        Apartment, Suite, Unit, Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        placeholder="Near Metro Station / Landmark"
                        className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-serif text-gray-600 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-gray-600 mb-1">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green bg-white"
                        >
                          <option value="West Bengal">West Bengal</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Other">Other State</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-serif text-gray-600 mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          required
                          maxLength={6}
                          value={formData.postcode}
                          onChange={handleInputChange}
                          placeholder="700107"
                          className="w-full text-sm font-serif p-2.5 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="pt-4 border-t border-gray-100">
                  <h2 className="font-serif font-bold text-lg text-black mb-2">
                    3. Payment Method
                  </h2>
                  <div className="p-4 rounded border border-gray-200 bg-gray-50 text-xs font-serif text-gray-600 space-y-2">
                    <p className="font-semibold text-black">
                      Integrated Indian Payment Options (UPI / NetBanking / Cards / Wallets)
                    </p>
                    <p>
                      Payment credentials will be plugged in via WooCommerce Payment Gateways prior to production orders.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Link
                    href="/cart"
                    className="text-xs uppercase font-serif tracking-wider font-semibold text-gray-600 hover:text-black flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
                  </Link>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-korigo-primary text-xs uppercase tracking-wider py-3.5 px-8 font-serif font-semibold"
                  >
                    {isSubmitting ? "Validating Order..." : "Confirm Shipping Details"}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded border border-gray-200 space-y-6">
              <h3 className="font-serif font-bold text-lg text-black pb-3 border-b border-gray-100">
                Order Review ({itemCount} {itemCount === 1 ? "Item" : "Items"})
              </h3>

              <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto no-scrollbar">
                {items.map((item) => {
                  const imgUrl = item.images?.[0]?.src || "/assets/korigo/products/citrus.png";
                  const itemTotal = item.totals?.line_total
                    ? formatStorePrice(item.totals.line_total)
                    : formatStorePrice(item.prices.price);

                  return (
                    <div key={item.key} className="py-3 flex gap-3 items-center">
                      <div className="relative w-14 h-14 bg-gray-50 rounded border border-gray-100 flex-shrink-0 overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="60px"
                        />
                        <span className="absolute -top-1 -right-1 bg-gray-700 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-semibold text-black line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-serif">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-serif font-bold text-sm text-black">
                        {currencySymbol}{itemTotal}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm font-serif">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">
                    {currencySymbol}{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-black">
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}.00`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (Inclusive)</span>
                  <span className="text-xs text-gray-500">Included in prices</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-black">
                  <span>Total Amount</span>
                  <span className="text-korigo-darkGreen">
                    {currencySymbol}{grandTotal}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded border border-gray-100 text-xs text-gray-600 font-serif space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-black">
                  <Truck className="w-4 h-4 text-korigo-green" />
                  <span>Dispatch from Kolkata Warehouse</span>
                </div>
                <p>Pan-India tracked courier delivery within 3–5 working days.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
