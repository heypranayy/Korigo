"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, LogOut, Lock, CheckCircle2 } from "lucide-react";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsLoggedIn(true);
    setCustomerEmail(emailInput);
    setNotice("Logged in successfully to your Korigo Customer account.");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsLoggedIn(true);
    setCustomerEmail(emailInput);
    setNotice("Account created successfully! Welcome to Korigo Snacks.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCustomerEmail("");
    setEmailInput("");
    setPasswordInput("");
    setNotice("You have logged out of your account.");
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50/50 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
            Customer Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-black">
            {isLoggedIn ? "My Account" : "Account Access"}
          </h1>
        </div>

        {notice && (
          <div className="mb-6 p-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs md:text-sm font-serif flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {isLoggedIn ? (
          /* Logged In Dashboard */
          <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase font-serif tracking-wider text-gray-500 mb-1">
                  Signed in as
                </p>
                <h2 className="text-xl font-serif font-bold text-black">{customerEmail}</h2>
              </div>
              <button
                onClick={handleLogout}
                className="btn-korigo-secondary text-xs uppercase tracking-wider px-4 py-2 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 p-6 md:p-8 gap-6 md:gap-0 font-serif">
              {/* Order History */}
              <div className="md:px-4 space-y-3">
                <div className="flex items-center gap-2 text-black font-bold text-base">
                  <Package className="w-5 h-5 text-korigo-green" />
                  <span>Order History</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You haven't placed any orders yet. Once you place an order, tracked dispatch and invoices will appear here.
                </p>
                <Link
                  href="/shop"
                  className="inline-block text-xs font-bold text-korigo-darkGreen hover:underline pt-2"
                >
                  Start Shopping →
                </Link>
              </div>

              {/* Address Details */}
              <div className="md:px-4 space-y-3">
                <div className="flex items-center gap-2 text-black font-bold text-base">
                  <MapPin className="w-5 h-5 text-korigo-green" />
                  <span>Shipping Address</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Saved domestic delivery address for faster 1-click headless checkout across India.
                </p>
                <p className="text-xs font-semibold text-gray-800">
                  Default Address: 783 Anandapur, Kolkata, WB - 700107
                </p>
              </div>

              {/* Account Security */}
              <div className="md:px-4 space-y-3">
                <div className="flex items-center gap-2 text-black font-bold text-base">
                  <Lock className="w-5 h-5 text-korigo-green" />
                  <span>Security & Privacy</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your credentials and addresses are encrypted according to industry privacy standards.
                </p>
                <Link
                  href="/privacy-policy"
                  className="inline-block text-xs font-bold text-korigo-darkGreen hover:underline pt-2"
                >
                  View Privacy Policy →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Authentication Forms */
          <div className="bg-white p-6 md:p-10 rounded border border-gray-200 shadow-sm max-w-md mx-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 text-sm font-serif font-bold uppercase tracking-wider text-center border-b-2 transition ${
                  activeTab === "login"
                    ? "border-black text-black"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 text-sm font-serif font-bold uppercase tracking-wider text-center border-b-2 transition ${
                  activeTab === "register"
                    ? "border-black text-black"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                Create Account
              </button>
            </div>

            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4 font-serif">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-korigo-primary w-full py-3.5 uppercase tracking-wider text-xs font-semibold mt-2"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 font-serif">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                  />
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  By creating an account, you agree to Korigo Snacks' Terms of Service and Privacy Policy.
                </p>
                <button
                  type="submit"
                  className="btn-korigo-primary w-full py-3.5 uppercase tracking-wider text-xs font-semibold mt-2"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
