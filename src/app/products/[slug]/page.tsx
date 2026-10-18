import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Flame, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { getStoreProductBySlug, getStoreProducts, formatStorePrice } from "../../../lib/woocommerce/storeApi";
import { ProductGallery } from "../../../components/product/ProductGallery";
import { ProductActions } from "../../../components/product/ProductActions";
import { ProductDetailsAccordion } from "../../../components/product/ProductDetailsAccordion";
import { DeliveryEstimator } from "../../../components/product/DeliveryEstimator";
import { RecipeGuideSection } from "../../../components/product/RecipeGuideSection";
import { ProductCard } from "../../../components/product/ProductCard";
import { StickyAddToCartBar } from "../../../components/product/StickyAddToCartBar";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

function cleanProductDescription(desc?: string): string {
  if (!desc) return "";
  let clean = desc;
  const pinIdx = clean.indexOf("25,000+ pincodes");
  if (pinIdx !== -1) {
    clean = clean.substring(pinIdx + "25,000+ pincodes".length);
  }
  return clean
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/^\/\s*/, "")
    .replace(/Free Delivery on Orders above[^\.]*\./gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getStoreProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found | Korigo Snacks" };
  }

  const price = formatStorePrice(product.prices.price);
  const imgUrl = product.images?.[0]?.src || "/assets/korigo/products/citrus.webp";
  const desc =
    cleanProductDescription(product.short_description || product.description) ||
    `Buy authentic ${product.name}. 100% slow-roasted makhana pops with bold seasoning, high protein, and zero guilt.`;

  return {
    title: `${product.name} — Buy Online ₹${price} | Korigo Snacks`,
    description: desc,
    keywords: [
      product.name,
      "makhana",
      "fox nuts",
      "roasted lotus seeds",
      "healthy snacks",
      "korigo snacks",
      "superfood",
      "high protein snacks",
    ],
    openGraph: {
      title: `${product.name} | Korigo Snacks`,
      description: desc,
      url: `https://korigosnacks.com/products/${product.slug}`,
      siteName: "Korigo Snacks",
      images: [
        {
          url: imgUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Korigo Snacks`,
      description: desc,
      images: [imgUrl],
    },
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getStoreProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const allProducts = await getStoreProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  const isSoldOut = !product.is_in_stock || product.slug === "coco-world-makhana";
  const currentPrice = formatStorePrice(product.prices.price);
  const regularPrice = formatStorePrice(product.prices.regular_price);
  const isOnSale = product.on_sale || parseFloat(regularPrice) > parseFloat(currentPrice);
  const categoryName = product.categories?.[0]?.name || "Flavoured Makhana";
  const categorySlug = product.categories?.[0]?.slug || "flavours";
  const primaryImgUrl = product.images?.[0]?.src || "/assets/korigo/products/citrus.webp";
  const cleanedDesc = cleanProductDescription(product.description);
  const recipes = product.customMeta?.recipes || [];

  // Schema.org Structured Data for SEO (Product + Breadcrumbs + Recipes)
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => img.src) || [primaryImgUrl],
    description: cleanedDesc || `${product.name} - 100% Slow-Roasted Makhana Pops`,
    sku: product.sku || `KRG-${product.slug.toUpperCase()}`,
    brand: {
      "@type": "Brand",
      name: "Korigo Snacks",
    },
    offers: {
      "@type": "Offer",
      url: `https://korigosnacks.com/products/${product.slug}`,
      priceCurrency: "INR",
      price: currentPrice,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: isSoldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Korigo Snacks",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "324",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://korigosnacks.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://korigosnacks.com/shop",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `https://korigosnacks.com/shop?category=${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://korigosnacks.com/products/${product.slug}`,
      },
    ],
  };

  const recipesJsonLd = recipes.map((r: any) => ({
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: `${r.name} with ${product.name}`,
    image: [r.image],
    author: {
      "@type": "Person",
      name: "Chef Korigo",
    },
    prepTime: "PT10M",
    cookTime: "PT5M",
    totalTime: "PT15M",
    description: r.instructions,
    recipeIngredient: r.ingredients.split(",").map((s: string) => s.trim()),
    recipeInstructions: [
      {
        "@type": "HowToStep",
        text: r.instructions,
      },
    ],
  }));

  return (
    <div className="py-8 md:py-14 bg-white min-h-screen relative">
      {/* SEO Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      {recipesJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recipesJsonLd) }}
        />
      )}

      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-serif mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-korigo-green">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-korigo-green">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${categorySlug}`} className="hover:text-korigo-green">
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-black font-semibold truncate max-w-[200px] md:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Interactive 3D Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
              isSoldOut={isSoldOut}
            />
          </div>

          {/* Right: Info, Price, Delivery Estimator, Variants & Accordions */}
          <div className="lg:col-span-5 space-y-4">
            {/* Category & CRO Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-korigo-lightGreen text-korigo-darkGreen text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-korigo-green/20">
                {product.type === "combo" || product.slug.includes("combo") ? "Dual-Pack Combo (70g)" : "Single Pack (35g)"}
              </span>
              {isOnSale && (
                <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                  Save ₹40 • 20% OFF
                </span>
              )}
              <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                100% Slow-Roasted
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black leading-tight">
              {product.name}
            </h1>

            {/* Live Social Proof Rating Bar */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800 font-serif">
                4.9 / 5.0
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-korigo-green font-semibold">
                324 Verified Reviews
              </span>
              <span className="text-xs text-gray-400">•</span>
              <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>38 bought today</span>
              </div>
            </div>

            {/* Price Row with Tax Info */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-black">
                ₹{currentPrice}
              </span>
              {isOnSale && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{regularPrice}
                </span>
              )}
              <span className="text-xs text-korigo-green font-bold bg-korigo-lightGreen px-2 py-0.5 rounded">
                Inclusive of GST
              </span>
            </div>

            {/* Free Shipping Alert Pill */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
              <Truck className="w-4 h-4 text-korigo-green flex-shrink-0" />
              <span>
                <strong>Free Pan-India Delivery</strong> on orders over ₹499. Dispatched in 24 hours.
              </span>
            </div>

            {/* Clean Editorial Description */}
            {cleanedDesc && (
              <div className="text-sm text-gray-600 font-serif leading-relaxed pt-1">
                <p>{cleanedDesc}</p>
              </div>
            )}

            {/* Estimated Delivery Date Pincode Checker (Exact from korigosnacks.com) */}
            <DeliveryEstimator />

            {/* Purchase CTA Component with Pack Size Variants */}
            <ProductActions
              productId={product.id}
              isSoldOut={isSoldOut}
              basePrice={parseFloat(currentPrice)}
              isCombo={product.type === "combo" || product.slug.includes("combo")}
            />

            {/* Nutrition & Ingredients Accordion (Exact tables & RDA) */}
            <ProductDetailsAccordion
              ingredients={product.customMeta?.ingredients}
              allergens={product.customMeta?.allergens}
              nutrition={product.customMeta?.nutrition as any}
              rda={product.customMeta?.rda as any}
              description={cleanedDesc}
            />
          </div>
        </div>

        {/* 3 Recipe Guides (Exact from korigosnacks.com) */}
        {recipes.length > 0 && (
          <RecipeGuideSection
            recipes={recipes as any}
            flavourName={product.name.split("|")[0].trim()}
          />
        )}

        {/* Related Products Grid with variant selectors */}
        <div className="pt-16 mt-16 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-korigo-green font-serif block mb-1">
                Complementary Crunch
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black">
                Explore More Flavours
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase font-serif tracking-wider font-bold text-korigo-darkGreen hover:text-korigo-green underline underline-offset-4"
            >
              View All 12 Snacks →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* High-Converting Sticky Bottom Add to Cart Bar */}
      <StickyAddToCartBar
        productId={product.id}
        productName={product.name}
        price={currentPrice}
        regularPrice={isOnSale ? regularPrice : undefined}
        isOnSale={isOnSale}
        imageUrl={primaryImgUrl}
        isSoldOut={isSoldOut}
      />
    </div>
  );
}
