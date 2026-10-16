"use client";

import React, { useState } from "react";
import { Truck, CheckCircle2, MapPin, Sparkles, Clock } from "lucide-react";

export const DeliveryEstimator: React.FC = () => {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    city?: string;
    dateRange?: string;
    message?: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setResult({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code (e.g. 700001, 110001, 560001).",
      });
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      // Calculate realistic delivery date (2 - 4 days from now)
      const now = new Date();
      const minDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
      const maxDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
      };
      const minFormatted = minDate.toLocaleDateString("en-IN", options);
      const maxFormatted = maxDate.toLocaleDateString("en-IN", options);

      // Simple region hint
      let regionHint = "Pan-India Express Hub";
      const prefix = cleanPin.substring(0, 2);
      if (prefix === "70" || prefix === "71" || prefix === "72" || prefix === "73" || prefix === "74") {
        regionHint = "West Bengal & East India (Next-Day / 48hr Dispatch)";
      } else if (prefix === "11" || prefix === "12" || prefix === "20") {
        regionHint = "Delhi-NCR & North India";
      } else if (prefix === "40" || prefix === "41" || prefix === "42") {
        regionHint = "Maharashtra & West Coast";
      } else if (prefix === "56" || prefix === "60" || prefix === "50") {
        regionHint = "South Metro Hub";
      }

      setResult({
        valid: true,
        city: regionHint,
        dateRange: `${minFormatted} – ${maxFormatted}`,
        message: "Standard Express Shipping Available",
      });
      setIsChecking(false);
    }, 300);
  };

  return (
    <div className="bg-[#f8fdf9] border border-korigo-green/20 rounded-2xl p-4 my-4 font-serif">
      <div className="flex items-center gap-2 mb-2.5">
        <Truck className="w-4 h-4 text-korigo-green flex-shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider text-black">
          Estimated Delivery Date
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            className="w-full pl-8 pr-3 py-2 text-xs bg-white rounded-xl border border-gray-200 focus:border-korigo-green focus:outline-none transition font-sans"
          />
        </div>
        <button
          type="submit"
          disabled={isChecking || pincode.length < 6}
          className="px-4 py-2 bg-korigo-darkGreen hover:bg-korigo-green text-white text-xs font-bold uppercase rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
        >
          {isChecking ? "Checking..." : "Check"}
        </button>
      </form>

      {result && (
        <div className="mt-3 pt-3 border-t border-korigo-green/15 text-xs">
          {result.valid ? (
            <div className="space-y-1 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-korigo-darkGreen font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Expected Delivery: <span className="underline decoration-korigo-green underline-offset-2">{result.dateRange}</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-600 pl-5.5">
                Serviceable to {result.city}. Dispatched directly from roasting facility in Kolkata within 24 hours.
              </p>
              <div className="flex items-center gap-3 text-[10px] text-gray-500 pl-5.5 pt-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Free Shipping above ₹499
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" /> Tamper-Proof Fresh Nitrogen Seal
                </span>
              </div>
            </div>
          ) : (
            <p className="text-red-600 text-[11px]">{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
};
