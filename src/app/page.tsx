import React from "react";
import { getStoreProducts } from "../lib/woocommerce/storeApi";
import { HeroBanner } from "../components/home/HeroBanner";
import { FlavoursMarquee } from "../components/home/FlavoursMarquee";
import { CombosSection } from "../components/home/CombosSection";
import { SingleFlavoursSection } from "../components/home/SingleFlavoursSection";
import { SuperfoodComparison } from "../components/home/SuperfoodComparison";
import { Certifications } from "../components/home/Certifications";
import { ReviewsSection } from "../components/home/ReviewsSection";
import { FaqSection } from "../components/home/FaqSection";
import { faqSchema } from "../lib/schema";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getStoreProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroBanner />
      <FlavoursMarquee />
      <SingleFlavoursSection products={products} />
      <CombosSection products={products} />
      <SuperfoodComparison />
      <Certifications />
      <ReviewsSection />
      <FaqSection />
    </div>
  );
}
