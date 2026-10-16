import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug } from "../../../lib/wordpress/client";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Article Not Found | Korigo Snacks" };
  }

  const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, "");
  return {
    title: cleanTitle,
    description: post.excerpt?.rendered?.replace(/<[^>]*>/g, "").slice(0, 160) || cleanTitle,
    openGraph: {
      title: cleanTitle,
      type: "article",
      images: post.featured_media_url ? [{ url: post.featured_media_url }] : [],
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-12 md:py-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider font-semibold text-gray-500 hover:text-black transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-xs font-serif text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-korigo-green" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-korigo-green" />
              {post.author_name || "Sohini Kar"}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-black leading-[1.2]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </header>

        {/* Featured Image */}
        {post.featured_media_url && (
          <div className="relative aspect-[16/10] w-full rounded border border-gray-100 overflow-hidden mb-10 shadow-sm">
            <Image
              src={post.featured_media_url}
              alt={post.title.rendered}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div
          className="prose prose-neutral max-w-none font-serif text-base leading-relaxed text-gray-800 space-y-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:font-serif [&>h2]:text-black [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:font-serif [&>h3]:text-black [&>h3]:mt-6 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>table]:w-full [&>table]:border [&>table]:my-6 [&>table_th]:p-2.5 [&>table_th]:bg-gray-50 [&>table_td]:p-2.5 [&>table_td]:border-t"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Bottom Banner */}
        <div className="mt-16 p-8 bg-gray-50 rounded border border-gray-200 text-center space-y-4">
          <span className="text-korigo-green font-bold text-xs uppercase tracking-widest block font-serif">
            Fuel Your Day Mindfully
          </span>
          <h3 className="text-2xl font-serif font-bold text-black">
            Ready to experience 100% slow-roasted crunch?
          </h3>
          <p className="text-sm text-gray-600 font-serif max-w-md mx-auto">
            Choose from 6 bold flavours and dual-pack combos. Shipped fresh across India.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="btn-korigo-primary text-xs uppercase tracking-wider px-8 py-3.5 inline-flex items-center gap-2"
            >
              <span>Explore Snacks Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
