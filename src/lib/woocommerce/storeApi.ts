import { StoreApiProduct, StoreApiCart } from "./types";
import catalogFallback from "../../../crawl_data/full_catalog_extracted.json";
import recipesFallback from "../../../crawl_data/product_recipes.json";
import productDataMap from "./productData.json";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://backend-korigo.sampledomain.online";

// Convert Store API price (paisa/minor units) to formatted rupee string e.g. "9900" -> "99.00"
export function formatStorePrice(minorUnits: string | number, decimals: number = 2): string {
  const num = typeof minorUnits === "string" ? parseFloat(minorUnits) : minorUnits;
  if (isNaN(num)) return "0.00";
  return (num / Math.pow(10, decimals)).toFixed(decimals);
}

function normalizeRecipeImage(imgUrl?: string): string {
  if (!imgUrl) return "/assets/korigo/recipes/unnamed.jpg";
  if (imgUrl.startsWith("/assets/")) return imgUrl;
  const filename = imgUrl.split("/").pop()?.split("?")[0];
  if (filename) {
    return `/assets/korigo/recipes/${filename}`;
  }
  return imgUrl;
}

export function getProductRecipes(slug: string): any[] {
  const recipesMap = recipesFallback as Record<string, any[]>;
  let list = recipesMap[slug] || [];

  if (list.length === 0) {
    if (slug.includes("combo")) {
      // Gather recipes from both constituent flavours in the combo
      const combined: any[] = [];
      if (slug.includes("sassy") || slug.includes("sriracha")) {
        combined.push(...(recipesMap["sassy-sriracha"] || []).slice(0, 2));
      }
      if (slug.includes("cheese") || slug.includes("garlic")) {
        combined.push(...(recipesMap["garlicked-cheese-makhana"] || []).slice(0, 2));
      }
      if (slug.includes("citrus")) {
        combined.push(...(recipesMap["citrus-cartel-makhana"] || []).slice(0, 2));
      }
      if (slug.includes("creme") || slug.includes("cream") || slug.includes("onion")) {
        combined.push(...(recipesMap["creme-d-onion-makhana"] || []).slice(0, 2));
      }
      if (slug.includes("cinnamon")) {
        combined.push(...(recipesMap["cinnamon-drip"] || []).slice(0, 2));
      }
      if (slug.includes("coco")) {
        combined.push(...(recipesMap["coco-world-makhana"] || []).slice(0, 2));
      }
      list = combined.slice(0, 3);
    } else if (slug.includes("sassy") || slug.includes("sriracha")) {
      list = recipesMap["sassy-sriracha"] || [];
    } else if (slug.includes("cheese") || slug.includes("garlic")) {
      list = recipesMap["garlicked-cheese-makhana"] || [];
    } else if (slug.includes("citrus")) {
      list = recipesMap["citrus-cartel-makhana"] || [];
    } else if (slug.includes("creme") || slug.includes("onion")) {
      list = recipesMap["creme-d-onion-makhana"] || [];
    } else if (slug.includes("cinnamon")) {
      list = recipesMap["cinnamon-drip"] || [];
    } else if (slug.includes("coco")) {
      list = recipesMap["coco-world-makhana"] || [];
    }
  }

  return list.map((r) => ({
    ...r,
    image: normalizeRecipeImage(r.image),
  }));
}

// Enrich product with rich local metadata (recipes, nutrition, ingredients, allergens)
export function enrichProduct(product: StoreApiProduct): StoreApiProduct {
  const canonicalSlug =
    product.slug === "cinnamon-drip-makhana"
      ? "cinnamon-drip"
      : product.slug === "coco-island-makhana"
      ? "coco-world-makhana"
      : product.slug;

  const localData =
    (productDataMap as Record<string, any>)[canonicalSlug] ||
    (productDataMap as Record<string, any>)[product.slug];
  const fallback = (catalogFallback as any[]).find(
    (p) => p.handle === canonicalSlug || p.handle === product.slug
  );
  const recipes = getProductRecipes(canonicalSlug);

  return {
    ...product,
    customMeta: {
      ingredients: localData?.ingredients || fallback?.ingredients || "",
      allergens: localData?.allergens || fallback?.allergens || "",
      nutrition: localData?.nutrition && localData.nutrition.length > 0 ? localData.nutrition : fallback?.nutrition || "",
      rda: localData?.rda && localData.rda.length > 0 ? localData.rda : fallback?.rda || "",
      recipes: recipes.length > 0 ? recipes : undefined,
      pack_size: product.type === "combo" || product.slug.includes("combo") ? "2 x 35g (70g)" : "35g",
    },
  };
}

export async function getStoreProducts(categorySlug?: string): Promise<StoreApiProduct[]> {
  try {
    const url = new URL(`${WP_URL}/wp-json/wc/store/v1/products`);
    url.searchParams.set("per_page", "50");

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Korigo-Next-Client",
      },
    });

    if (!res.ok) {
      console.warn(`Store API returned status ${res.status}, using enriched catalog`);
      return enrichFallbackProducts();
    }

    const data: StoreApiProduct[] = await res.json();
    let enriched = data.map(enrichProduct);

    if (categorySlug) {
      enriched = enriched.filter((p) =>
        p.categories.some((c) => c.slug.toLowerCase() === categorySlug.toLowerCase())
      );
    }

    return enriched;
  } catch (err) {
    console.error("Error fetching Store API products:", err);
    return enrichFallbackProducts();
  }
}

export async function getStoreProductBySlug(slug: string): Promise<StoreApiProduct | null> {
  const canonicalSlug =
    slug === "cinnamon-drip-makhana"
      ? "cinnamon-drip"
      : slug === "coco-island-makhana"
      ? "coco-world-makhana"
      : slug;

  try {
    const url = new URL(`${WP_URL}/wp-json/wc/store/v1/products`);
    url.searchParams.set("slug", canonicalSlug);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Korigo-Next-Client",
      },
    });

    if (!res.ok) {
      return getFallbackProductBySlug(canonicalSlug);
    }

    const data: StoreApiProduct[] = await res.json();
    if (data && data.length > 0) {
      return enrichProduct(data[0]);
    }

    return getFallbackProductBySlug(canonicalSlug);
  } catch (err) {
    console.error(`Error fetching product ${slug}:`, err);
    return getFallbackProductBySlug(canonicalSlug);
  }
}

// Fallback helpers to guarantee 100% catalog availability
function enrichFallbackProducts(): StoreApiProduct[] {
  return (catalogFallback as any[]).map((p, idx) => {
    const isCombo = p.product_type === "combo";
    const regular = isCombo ? "19900" : "9900";
    const sale = isCombo ? "15900" : "";
    const isSoldOut = p.handle === "coco-world-makhana";

    return enrichProduct({
      id: 122 + idx,
      name: p.title,
      slug: p.handle,
      parent: 0,
      type: isCombo ? "combo" : "simple",
      variation: "",
      permalink: `/products/${p.handle}`,
      sku: `KRG-${p.handle.toUpperCase().replace(/-/g, "_")}`,
      short_description: p.description ? p.description.slice(0, 160) + "..." : "",
      description: p.description || "",
      on_sale: isCombo,
      prices: {
        price: sale || regular,
        regular_price: regular,
        sale_price: sale,
        price_range: null,
        currency_code: "INR",
        currency_symbol: "₹",
        currency_minor_unit: 2,
        currency_decimal_separator: ".",
        currency_thousand_separator: ",",
        currency_prefix: "₹",
        currency_suffix: "",
      },
      price_html: "",
      average_rating: "5.0",
      review_count: 12,
      images: (p.images || []).map((imgUrl: string, imgIdx: number) => ({
        id: 1000 + imgIdx,
        src: imgUrl,
        thumbnail: imgUrl,
        srcset: "",
        sizes: "",
        name: p.title,
        alt: p.title,
      })),
      categories: [
        {
          id: isCombo ? 17 : 16,
          name: isCombo ? "Value Combos" : "Individual Flavours",
          slug: isCombo ? "combos" : "flavours",
          link: `/shop?category=${isCombo ? "combos" : "flavours"}`,
        },
      ],
      tags: [],
      attributes: [
        {
          id: 1,
          name: "Pack Size",
          taxonomy: null,
          has_variations: false,
          terms: [{ id: 1, name: isCombo ? "2 x 35g (70g)" : "35g", slug: isCombo ? "combo-pack" : "single-pack" }],
        },
      ],
      variations: [],
      has_options: false,
      is_purchasable: !isSoldOut,
      is_in_stock: !isSoldOut,
      is_on_backorder: false,
      low_stock_remaining: null,
      sold_individually: false,
      quantity_limit: 10,
      add_to_cart: {
        text: isSoldOut ? "Sold Out" : "Add to cart",
        description: "",
        url: "",
        minimum: 1,
        maximum: 10,
        multiple_of: 1,
      },
    });
  });
}

export function getFallbackProducts(): StoreApiProduct[] {
  return enrichFallbackProducts();
}

function getFallbackProductBySlug(slug: string): StoreApiProduct | null {
  const canonical =
    slug === "cinnamon-drip-makhana"
      ? "cinnamon-drip"
      : slug === "coco-island-makhana"
      ? "coco-world-makhana"
      : slug;
  const all = enrichFallbackProducts();
  return all.find((p) => p.slug === canonical || p.slug === slug) || null;
}

// Client-side / Session Cart Operations via Store API or Local Proxy
export async function fetchStoreCart(cartToken?: string | null): Promise<{ cart: StoreApiCart | null; newCartToken?: string; nonce?: string }> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (cartToken) {
      headers["Cart-Token"] = cartToken;
    }

    const endpoint = typeof window !== "undefined" ? `/api/cart?_nocache=${Date.now()}` : `${WP_URL}/wp-json/wc/store/v1/cart?_nocache=${Date.now()}`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const newCartToken = res.headers.get("Cart-Token") || undefined;
    const nonce = res.headers.get("Nonce") || undefined;

    if (!res.ok) {
      console.warn("Cart response not ok:", res.status);
      return { cart: null };
    }

    const cart: StoreApiCart = await res.json();
    return { cart, newCartToken, nonce };
  } catch (err) {
    console.error("Error fetching cart from Store API:", err);
    return { cart: null };
  }
}

export async function addStoreCartItem(
  productId: number,
  quantity: number = 1,
  cartToken?: string | null,
  nonce?: string | null
): Promise<{ cart: StoreApiCart | null; newCartToken?: string; nonce?: string }> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (cartToken) headers["Cart-Token"] = cartToken;
    if (nonce) headers["Nonce"] = nonce;

    const endpoint = typeof window !== "undefined" ? `/api/cart?_nocache=${Date.now()}` : `${WP_URL}/wp-json/wc/store/v1/cart/add-item?_nocache=${Date.now()}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ id: productId, quantity }),
    });

    const newCartToken = res.headers.get("Cart-Token") || cartToken || undefined;
    const newNonce = res.headers.get("Nonce") || nonce || undefined;

    if (!res.ok) {
      const errBody = await res.text();
      console.warn("Add to cart error:", errBody);
      return { cart: null };
    }

    const cart: StoreApiCart = await res.json();
    return { cart, newCartToken, nonce: newNonce };
  } catch (err) {
    console.error("Error adding to cart:", err);
    return { cart: null };
  }
}

export async function updateStoreCartQuantity(
  itemKey: string,
  quantity: number,
  cartToken?: string | null,
  nonce?: string | null
): Promise<{ cart: StoreApiCart | null; newCartToken?: string }> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (cartToken) headers["Cart-Token"] = cartToken;
    if (nonce) headers["Nonce"] = nonce;

    const res = await fetch(`${WP_URL}/wp-json/wc/store/v1/cart/update-item?_nocache=${Date.now()}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ key: itemKey, quantity }),
    });

    const newCartToken = res.headers.get("Cart-Token") || cartToken || undefined;
    if (!res.ok) return { cart: null };

    const cart: StoreApiCart = await res.json();
    return { cart, newCartToken };
  } catch (err) {
    console.error("Error updating cart item:", err);
    return { cart: null };
  }
}

export async function removeStoreCartItem(
  itemKey: string,
  cartToken?: string | null,
  nonce?: string | null
): Promise<{ cart: StoreApiCart | null; newCartToken?: string }> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (cartToken) headers["Cart-Token"] = cartToken;
    if (nonce) headers["Nonce"] = nonce;

    const res = await fetch(`${WP_URL}/wp-json/wc/store/v1/cart/remove-item?_nocache=${Date.now()}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ key: itemKey }),
    });

    const newCartToken = res.headers.get("Cart-Token") || cartToken || undefined;
    if (!res.ok) return { cart: null };

    const cart: StoreApiCart = await res.json();
    return { cart, newCartToken };
  } catch (err) {
    console.error("Error removing cart item:", err);
    return { cart: null };
  }
}
