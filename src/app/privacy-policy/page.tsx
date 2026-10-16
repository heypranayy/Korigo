import React from "react";
import type { Metadata } from "next";
import { getPageBySlug } from "../../lib/wordpress/client";

export const metadata: Metadata = {
  title: "Privacy Policy | Korigo Snacks",
  description: "Read the Korigo Snacks privacy policy detailing customer data protection, cookies, and privacy rights.",
};

export const revalidate = 60;

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy-policy");

  const fallbackContent = `
    <h2>Privacy Policy</h2>
    <p>At Korigo Snacks, we take your personal privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.</p>
    <h2>Personal Information We Collect</h2>
    <p>When you visit the site, we automatically collect certain device information, including details about your web browser, IP address, time zone, and cookies. Additionally, as you browse the site, we collect information about the individual web pages or products that you view.</p>
    <h2>How Do We Use Your Personal Information?</h2>
    <p>We use Order Information generally to fulfill any orders placed through the Site (including processing payment information, arranging for shipping, and providing order confirmations/invoices).</p>
    <h2>Sharing Your Personal Information</h2>
    <p>We share your Personal Information with third parties solely to help us use your Personal Information, such as trusted courier and logistics partners for order delivery across India.</p>
    <h2>Contact Us</h2>
    <p>For more information about our privacy practices or if you have questions, please contact us by e-mail at <strong>contact@korigosnacks.com</strong>.</p>
  `;

  return (
    <div className="py-12 md:py-20 bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 font-serif">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 pb-4 border-b border-gray-100">
          Privacy Policy
        </h1>
        <div
          className="prose prose-neutral max-w-none text-gray-700 leading-relaxed text-sm md:text-base space-y-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-black [&>h2]:mt-6 [&>h2]:mb-2"
          dangerouslySetInnerHTML={{ __html: page?.content?.rendered || fallbackContent }}
        />
      </div>
    </div>
  );
}
