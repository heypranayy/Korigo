"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, MessageSquare } from "lucide-react";

export default function ReviewsFormPage() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    flavour: "Garlicked Cheese",
    title: "",
    review: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
            Feedback & Testimonials
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-3">
            Share Your Korigo Experience
          </h1>
          <p className="text-gray-600 text-sm font-serif">
            Your reviews help us continue roasting India's finest flavoured makhana pops. Tell us which flavour rocked your tastebuds!
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded border border-gray-200 shadow-sm font-serif">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-black">Thank You For Your Review!</h2>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                Your feedback has been submitted successfully and will appear on the customer reviews wall following moderation.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-korigo-secondary text-xs uppercase px-6 py-2.5 mt-4"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-gray-300 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || rating) >= star
                            ? "fill-amber-400 stroke-amber-400 text-amber-400"
                            : "stroke-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gray-500 font-semibold ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Flavour Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Flavour Reviewed *
                </label>
                <select
                  value={formData.flavour}
                  onChange={(e) => setFormData({ ...formData, flavour: e.target.value })}
                  className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green bg-white"
                >
                  <option value="Citrus Cartel">Citrus Cartel (Tangy Makhana)</option>
                  <option value="Coco Island">Coco Island (Chocolate Makhana)</option>
                  <option value="Sour Crème d' Onion">Sour Crème d' Onion (Creamy Snack)</option>
                  <option value="Garlicked Cheese">Garlicked Cheese (Savoury Snack)</option>
                  <option value="Cinnamon Drip">Cinnamon Drip (Roasted Snack)</option>
                  <option value="Sassy Sriracha">Sassy Sriracha (Spicy Foxnuts)</option>
                  <option value="Value Combo Bundles">Value Combo Bundles (Dual Packs)</option>
                </select>
              </div>

              {/* Title & Review */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best snack for evening tea!"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Detailed Review *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you liked about the crunch, taste, and freshness..."
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohit Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-korigo-primary w-full py-4 uppercase tracking-wider text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Customer Review</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
