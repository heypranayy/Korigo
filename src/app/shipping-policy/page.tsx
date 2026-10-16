import React from "react";
import type { Metadata } from "next";
import { getPageBySlug } from "../../lib/wordpress/client";

export const metadata: Metadata = {
  title: "Shipping Policy | Korigo Snacks",
  description: "Read the Korigo Snacks shipping policy for domestic delivery across India, processing timelines, and tracking.",
};

export const revalidate = 60;

export default async function ShippingPolicyPage() {
  const page = await getPageBySlug("shipping-policy");

  const fallbackContent = `
    <h2>Pan-India Shipping Policy</h2>
    <p>Korigo Snacks delivers across India using trusted courier and logistics partners to ensure safe and timely delivery of our freshly roasted flavoured makhana snacks.</p>
    <h2>Order Processing & Timelines</h2>
    <p>All orders are processed and packed within 1–2 business days from our Kolkata, West Bengal facility. Orders placed before 2:00 PM IST on working days are prioritized for same-day dispatch.</p>
    <h2>Delivery Schedule</h2>
    <p>Standard delivery timelines across metro cities range between 2 to 4 business days. For non-metro and regional locations, delivery typically takes 4 to 6 business days.</p>
    <h2>Free Shipping Threshold</h2>
    <p>We offer <strong>FREE Standard Delivery</strong> pan-India on all orders valued at ₹499 or above. Orders below ₹499 carry a flat delivery fee of ₹50.</p>
    <h2>Order Tracking</h2>
    <p>Once your order has been dispatched, you will receive an automated tracking link via SMS and email to monitor your package in real-time.</p>
  `;

  return (
    <div className="py-12 md:py-20 bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 font-serif">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 pb-4 border-b border-gray-100">
          Shipping Policy
        </h1>
        <div
          className="prose prose-neutral max-w-none text-gray-700 leading-relaxed text-sm md:text-base space-y-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-6 [&>h2]:mb-2"
          dangerouslySetInnerHTML={{ __html: page?.content?.rendered || fallbackContent }}
        />
      </div>
    </div>
  );
}
