import React from "react";
import type { Metadata } from "next";
import { getPageBySlug } from "../../lib/wordpress/client";

export const metadata: Metadata = {
  title: "Refund Policy | Korigo Snacks",
  description: "Read the official Korigo Snacks refund and returns policy regarding food and edible items.",
};

export const revalidate = 60;

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
    <div className="py-12 md:py-20 bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 font-serif">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 pb-4 border-b border-gray-100">
          Refund Policy
        </h1>
        <div
          className="prose prose-neutral max-w-none text-gray-700 leading-relaxed text-sm md:text-base space-y-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-6 [&>h2]:mb-2"
          dangerouslySetInnerHTML={{ __html: page?.content?.rendered || fallbackContent }}
        />
      </div>
    </div>
  );
}
