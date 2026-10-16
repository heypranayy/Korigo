import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://korigosnacks.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/my-account", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
