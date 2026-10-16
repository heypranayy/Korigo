import React from "react";
import type { Metadata } from "next";
import { getPageBySlug } from "../../lib/wordpress/client";

export const metadata: Metadata = {
  title: "Terms of Service | Korigo Snacks",
  description: "Read the official Terms of Service governing purchases, website access, and customer terms on Korigo Snacks.",
};

export const revalidate = 60;

export default async function TermsOfServicePage() {
  const page = await getPageBySlug("terms-of-service");

  const fallbackContent = `
    <h2>Terms of Service</h2>
    <p>Welcome to Korigo Snacks. By accessing, browsing, or purchasing from our website, you agree to be bound by the following Terms of Service. Please read them carefully before using our services.</p>
    <h2>Use of Website</h2>
    <p>By using this website, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any unauthorized or illegal purpose.</p>
    <h2>Product Pricing & Modifications</h2>
    <p>Prices for our products are subject to change without notice. All prices displayed on our website are inclusive of applicable GST taxes. We reserve the right at any time to modify or discontinue products without liability.</p>
    <h2>Governing Law</h2>
    <p>These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction in the courts of Kolkata, West Bengal.</p>
  `;

  return (
    <div className="py-12 md:py-20 bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 font-serif">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 pb-4 border-b border-gray-100">
          Terms of Service
        </h1>
        <div
          className="prose prose-neutral max-w-none text-gray-700 leading-relaxed text-sm md:text-base space-y-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-6 [&>h2]:mb-2"
          dangerouslySetInnerHTML={{ __html: page?.content?.rendered || fallbackContent }}
        />
      </div>
    </div>
  );
}
