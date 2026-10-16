import { WordPressPost, WordPressPage } from "../woocommerce/types";
import mediaMapping from "../../../crawl_data/wp_media_mapping.json";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://backend-korigo.sampledomain.online";

export async function getPosts(): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=50&_embed=true&_nocache=${Date.now()}`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Korigo-Next-Client",
      },
    });

    if (!res.ok) {
      console.warn("Failed fetching WP posts, status:", res.status);
      return [];
    }

    const posts: any[] = await res.json();
    return posts.map((p) => {
      // Find embedded featured media or map via mediaMapping
      let featUrl = "";
      if (p._embedded && p._embedded["wp:featuredmedia"] && p._embedded["wp:featuredmedia"][0]) {
        featUrl = p._embedded["wp:featuredmedia"][0].source_url;
      }
      if (!featUrl && p.featured_media) {
        const match = Object.values(mediaMapping).find((m: any) => m.id === p.featured_media);
        if (match) featUrl = (match as any).source_url;
      }

      return {
        id: p.id,
        date: p.date,
        slug: p.slug,
        status: p.status,
        title: p.title,
        content: p.content,
        excerpt: p.excerpt,
        featured_media: p.featured_media,
        featured_media_url: featUrl || "/assets/korigo/blogs/ChatGPT_Image_Sep_16_2026_04_34_01_PM.png",
        author_name: "Sohini Kar",
      };
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed=true&_nocache=${Date.now()}`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Korigo-Next-Client",
      },
    });

    if (!res.ok) return null;
    const posts = await res.json();
    if (!posts || posts.length === 0) return null;

    const p = posts[0];
    let featUrl = "";
    if (p._embedded && p._embedded["wp:featuredmedia"] && p._embedded["wp:featuredmedia"][0]) {
      featUrl = p._embedded["wp:featuredmedia"][0].source_url;
    }
    if (!featUrl && p.featured_media) {
      const match = Object.values(mediaMapping).find((m: any) => m.id === p.featured_media);
      if (match) featUrl = (match as any).source_url;
    }

    return {
      id: p.id,
      date: p.date,
      slug: p.slug,
      status: p.status,
      title: p.title,
      content: p.content,
      excerpt: p.excerpt,
      featured_media: p.featured_media,
      featured_media_url: featUrl || "/assets/korigo/blogs/ChatGPT_Image_Sep_16_2026_04_34_01_PM.png",
      author_name: "Sohini Kar",
    };
  } catch (err) {
    console.error(`Error fetching post by slug ${slug}:`, err);
    return null;
  }
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
