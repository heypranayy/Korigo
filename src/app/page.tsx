import React from "react";
import { getStoreProducts } from "../lib/woocommerce/storeApi";
import { HeroBanner } from "../components/home/HeroBanner";
import { NoKernelPopcornSection } from "../components/home/NoKernelPopcornSection";
import { CombosSection } from "../components/home/CombosSection";
import { SingleFlavoursSection } from "../components/home/SingleFlavoursSection";
import { HealthBadgesSection } from "../components/home/HealthBadgesSection";
import { SuperfoodComparison } from "../components/home/SuperfoodComparison";
import { Certifications } from "../components/home/Certifications";
import { ReviewsSection } from "../components/home/ReviewsSection";
import { FaqSection } from "../components/home/FaqSection";
import { faqSchema } from "../lib/schema";

export const revalidate = 300;

export default async function HomePage() {
  const products = await getStoreProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroBanner />
      <NoKernelPopcornSection />
      <SingleFlavoursSection products={products} />
      <CombosSection products={products} />
      <HealthBadgesSection />
      <SuperfoodComparison />
      <Certifications />
      <ReviewsSection />
      <FaqSection />
    </div>
  );
}
