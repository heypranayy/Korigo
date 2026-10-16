"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactUsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
            We’d Love to Hear From You
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-3">
            Contact Us & Bulk Orders
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-serif">
            Have questions about our flavours, bulk institutional orders, or corporate gifting? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8 font-serif">
            <div className="bg-gray-50 p-6 md:p-8 rounded border border-gray-200/80 space-y-6">
              <h2 className="text-xl font-bold text-black border-b border-gray-200 pb-3">
                Customer Care & Headquarters
              </h2>

              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-korigo-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-black font-semibold">Registered Office:</strong>
                    <span>783 Anandapur, Kolkata - 700107, West Bengal, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-korigo-green flex-shrink-0" />
                  <div>
                    <strong className="block text-black font-semibold">Email:</strong>
                    <a href="mailto:contact@korigosnacks.com" className="hover:text-korigo-green transition">
                      contact@korigosnacks.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-korigo-green flex-shrink-0" />
                  <div>
                    <strong className="block text-black font-semibold">Phone / WhatsApp Support:</strong>
                    <a href="tel:+918981842929" className="hover:text-korigo-green transition">
                      +91 8981842929
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk Order Segments */}
            <div className="p-6 bg-korigo-lightGreen/50 rounded border border-korigo-lightGreen space-y-3">
              <h3 className="text-base font-bold text-korigo-darkGreen">
                Place a Bulk or Corporate Order
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                We cater to corporate hampers, festive gifting, hotels, fitness centers, and café networks across India. Select "Corporate Gifting" or "Bulk Order" in the form.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded border border-gray-200 shadow-sm font-serif">
            {formSubmitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-black">Message Received!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out to Korigo Snacks. Our team will review your inquiry and respond within 24 business hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-korigo-secondary text-xs uppercase px-6 py-2.5 mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-3">
                  Send us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green bg-white"
                    >
                      <option value="General Inquiry">General Customer Care</option>
                      <option value="Corporate Gifting">Corporate Gifting & Hampers</option>
                      <option value="Bulk Order">HORECA / Institutional Order</option>
                      <option value="Retail Distribution">Retail & Distribution Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirement..."
                    className="w-full text-sm p-3 border border-gray-300 rounded focus:outline-none focus:border-korigo-green"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-korigo-primary text-xs uppercase tracking-wider py-3.5 px-8 font-semibold flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
