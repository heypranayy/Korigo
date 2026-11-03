import { WordPressPost, WordPressPage } from "../woocommerce/types";
import mediaMapping from "../../../crawl_data/wp_media_mapping.json";
import postsCache from "./posts_cache.json";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://backend-korigo.sampledomain.online";

export const LOCAL_BLOG_IMAGES: Record<string, string> = {
  "healthy-travel-snacks-flights-train-journeys": "/assets/korigo/blogs/healthy-travel-snacks.jpg",
  "healthy-corporate-gifts-india-makhana-combo-packs": "/assets/korigo/blogs/healthy-corporate-gifts.jpg",
  "is-makhana-safe-during-pregnancy-benefits-side-effects": "/assets/korigo/blogs/makhana-pregnancy-safe.jpg",
  "makhana-calories-protein-value-nutrition-benefits": "/assets/korigo/blogs/makhana-nutrition-shoot1.jpg",
  "late-night-healthy-snacks-that-won-t-make-you-feel-guilty": "/assets/korigo/blogs/late-night-healthy-snacks.jpg",
  "top-5-healthy-snacks-for-desk-jobs": "/assets/korigo/blogs/desk-job-healthy-snacks.jpg",
  "healthy-makhana-recipes-you-can-make-at-home": "/assets/korigo/blogs/healthy-makhana-recipes.jpg",
  "why-cheese-makhana-is-becoming-india-s-favorite-healthy-snack": "/assets/korigo/blogs/cheese-makhana.jpg",
  "makhana-vs-other-snacks-why-its-the-healthiest": "/assets/korigo/blogs/makhana-vs-other-snacks.jpg",
  "makhana-for-weight-loss-how-to-eat": "/assets/korigo/blogs/makhana-weight-loss.jpg",
  "top-health-benefits-of-makhana-fox-nuts-lotus-seeds": "/assets/korigo/blogs/makhana-health-benefits.jpg",
};

function cleanText(str: string): string {
  if (!str) return "";
  return str
    .replace(/\ufffd/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&");
}

function formatPost(p: any): WordPressPost {
  let featUrl = LOCAL_BLOG_IMAGES[p.slug] || "";
  if (!featUrl && p._embedded && p._embedded["wp:featuredmedia"] && p._embedded["wp:featuredmedia"][0]) {
    featUrl = p._embedded["wp:featuredmedia"][0].source_url;
  }
  if (!featUrl && p.featured_media) {
    const match = Object.values(mediaMapping).find((m: any) => m.id === p.featured_media);
    if (match) featUrl = (match as any).source_url;
  }

  const cleanTitle = p.title ? { rendered: cleanText(p.title.rendered || "") } : { rendered: "" };
  const cleanExcerpt = p.excerpt ? { rendered: cleanText(p.excerpt.rendered || "") } : { rendered: "" };
  const cleanContent = p.content ? { rendered: cleanText(p.content.rendered || "") } : { rendered: "" };

  return {
    id: p.id,
    date: p.date,
    slug: p.slug,
    status: p.status,
    title: cleanTitle,
    content: cleanContent,
    excerpt: cleanExcerpt,
    featured_media: p.featured_media,
    featured_media_url: featUrl || "/assets/korigo/blogs/late-night-healthy-snacks.jpg",
    author_name: "Sohini Kar",
  };
}

export async function getPosts(): Promise<WordPressPost[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=50&_embed=true&_nocache=${Date.now()}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Korigo-Next-Client",
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const posts: any[] = await res.json();
      if (Array.isArray(posts) && posts.length > 0) {
        return posts.map(formatPost);
      }
    }
  } catch (err) {
    console.warn("Falling back to local posts cache:", err);
  }

  // Fallback to local posts cache
  return (postsCache as any[]).map(formatPost);
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed=true&_nocache=${Date.now()}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Korigo-Next-Client",
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts) && posts.length > 0) {
        return formatPost(posts[0]);
      }
    }
  } catch (err) {
    console.warn(`Falling back to local posts cache for slug ${slug}:`, err);
  }

  // Fallback to local posts cache
  const cached = (postsCache as any[]).find((p) => p.slug === slug);
  if (cached) {
    return formatPost(cached);
  }

  return null;
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&_nocache=${Date.now()}`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Korigo-Next-Client",
      },
    });

    if (!res.ok) return null;
    const pages = await res.json();
    if (!pages || pages.length === 0) return null;

    const p = pages[0];
    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      content: p.content,
    };
  } catch (err) {
    console.error(`Error fetching page ${slug}:`, err);
    return null;
  }
}
