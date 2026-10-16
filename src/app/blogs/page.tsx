import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "../../lib/wordpress/client";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Health & Snacking Blog | Makhana Insights & Recipes",
  description:
    "Explore nutritional insights, makhana health benefits, recipes, and snacking guides from Korigo Snacks. Written by health enthusiasts for everyday wellness.",
  openGraph: {
    title: "Korigo Snacks Blog — Makhana Superfood Insights",
    description: "Read all 7 expert articles on roasted makhana, desk job snacks, and weight management.",
  },
};

export const revalidate = 60;

export default async function BlogArchivePage() {
  const posts = await getPosts();

  return (
    <div className="py-12 md:py-20 bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block mb-2 font-serif">
            The Korigo Journal
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-4">
            Blog & Healthy Snacking Guides
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Everything you need to know about the nutritional science of fox nuts, recipes you can make in 10 minutes, and smart guilt-free munching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <article
                key={post.id}
                className="bg-white rounded border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] bg-gray-50 overflow-hidden">
                    <Image
                      src={post.featured_media_url || "/assets/korigo/blogs/ChatGPT_Image_Sep_16_2026_04_34_01_PM.png"}
                      alt={post.title.rendered}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-serif mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-korigo-green" />
                        {formattedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-korigo-green" />
                        {post.author_name || "Sohini Kar"}
                      </span>
                    </div>

                    <Link href={`/blogs/${post.slug}`}>
                      <h2
                        className="font-serif font-bold text-lg md:text-xl text-black hover:text-korigo-green transition-colors leading-snug line-clamp-2 mb-3"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </Link>

                    <div
                      className="text-xs md:text-sm text-gray-600 line-clamp-3 leading-relaxed font-serif"
                      dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || "" }}
                    />
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50 mt-4">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs uppercase font-serif font-bold tracking-wider text-black hover:text-korigo-green transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
