import { MetadataRoute } from "next";
import catalog from "../../crawl_data/full_catalog_extracted.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://korigosnacks.com";

  const staticRoutes = [
    "",
    "/shop",
    "/about-us",
    "/contact",
    "/reviews-form",
    "/blogs",
    "/refund-policy",
    "/privacy-policy",
    "/shipping-policy",
    "/terms-of-service",
    "/search",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = (catalog as any[]).map((p) => ({
    url: `${baseUrl}/products/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = [
    "healthy-travel-snacks-flights-train-journeys",
    "healthy-corporate-gifts-india-makhana-combo-packs",
    "is-makhana-safe-during-pregnancy-benefits-side-effects",
    "makhana-calories-protein-value-nutrition-benefits",
    "late-night-healthy-snacks-that-won-t-make-you-feel-guilty",
    "top-5-healthy-snacks-for-desk-jobs",
    "healthy-makhana-recipes-you-can-make-at-home",
    "why-cheese-makhana-is-becoming-india-s-favorite-healthy-snack",
    "makhana-vs-other-snacks-why-its-the-healthiest",
    "makhana-for-weight-loss-how-to-eat",
    "top-health-benefits-of-makhana-fox-nuts-lotus-seeds",
  ].map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
