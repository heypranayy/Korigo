import React from "react";
import type { Metadata } from "next";
import { getPageBySlug } from "../../lib/wordpress/client";

export const metadata: Metadata = {
  title: "Shipping Policy | Korigo Snacks",
  description: "Read the Korigo Snacks shipping policy for domestic delivery across India, processing timelines, and tracking.",
};

export const revalidate = 60;

function sanitizePolicyHtml(rawHtml: string): string {
  if (!rawHtml) return "";
  let clean = rawHtml
    .replace(/<p><main[^>]*><\/p>/gi, "")
    .replace(/<main[^>]*>/gi, "")
    .replace(/<\/main>/gi, "")
    .replace(/<div class="shopify-policy__title">[\s\S]*?<\/div>/gi, "");

  // Remove empty headings (h1-h6) containing only whitespace, strong, br, nbsp
  clean = clean.replace(/<h[1-6][^>]*>(\s*|<strong[^>]*>\s*<\/strong>|<br\s*\/?>|&nbsp;)*<\/h[1-6]>/gi, "");
  // Remove empty paragraphs
  clean = clean.replace(/<p[^>]*>(\s*|<br\s*\/?>|&nbsp;)*<\/p>/gi, "");
  // Second pass for nested empties
  clean = clean.replace(/<h[1-6][^>]*>(\s*|<strong[^>]*>\s*<\/strong>|<br\s*\/?>|&nbsp;)*<\/h[1-6]>/gi, "");
  clean = clean.replace(/<p[^>]*>(\s*|<br\s*\/?>|&nbsp;)*<\/p>/gi, "");

  return clean.trim();
}

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
    <div className="py-8 sm:py-12 md:py-16 bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 font-serif">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 pb-2.5 sm:pb-3 border-b border-gray-100">
          Shipping Policy
        </h1>
        <div
          className="policy-content font-serif text-gray-700 leading-relaxed text-sm sm:text-base
            [&_p]:text-gray-700 [&_p]:leading-[1.75] [&_p]:mb-4 [&_p]:mt-0
            [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-gray-100
            [&_h2:first-of-type]:mt-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:border-t-0
            [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-2
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:text-gray-700
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2 [&_ul]:text-gray-700
            [&_li]:leading-relaxed [&_li]:pl-1
            [&_strong]:text-black [&_strong]:font-semibold
            [&_a]:text-korigo-darkGreen [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:text-korigo-green"
          dangerouslySetInnerHTML={{
            __html: sanitizePolicyHtml(page?.content?.rendered || fallbackContent),
          }}
        />
      </div>
    </div>
  );
}
