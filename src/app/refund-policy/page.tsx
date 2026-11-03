import React from "react";
import type { Metadata } from "next";
import { getPageBySlug } from "../../lib/wordpress/client";

export const metadata: Metadata = {
  title: "Refund Policy | Korigo Snacks",
  description: "Read the official Korigo Snacks refund and returns policy regarding food and edible items.",
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

export default async function RefundPolicyPage() {
  const page = await getPageBySlug("refund-policy");

  const fallbackContent = `
    <h2>No-Return & No-Refund Policy</h2>
    <p>Korigo Snacks follows a strict no-return and no-refund policy on all products. Due to the nature of food and consumable items, returns, exchanges, or refunds are not accepted under any circumstances once an order has been delivered.</p>
    <h2>Damaged or Defective Products</h2>
    <p>If you receive a package that is visibly damaged, tampered with, or expired, please contact our support team at <strong>contact@korigosnacks.com</strong> or WhatsApp <strong>+91 8981842929</strong> within 24 hours of delivery with clear photographs of the outer packaging and damaged contents.</p>
    <h2>Order Cancellation</h2>
    <p>Orders can only be cancelled within 2 hours of placement, provided they have not yet been dispatched from our Kolkata warehouse facility.</p>
  `;

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 font-serif">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 pb-2.5 sm:pb-3 border-b border-gray-100">
          Refund Policy
        </h1>
        <div
          className="policy-content font-serif text-gray-700 leading-relaxed text-sm sm:text-base
            [&_p]:text-gray-700 [&_p]:leading-[1.75] [&_p]:mb-4 [&_p]:mt-0
            [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-gray-100
            [&_h2:first-of-type]:mt-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:border-t-0
            [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-2
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:text-gray-700
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:text-gray-700
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
