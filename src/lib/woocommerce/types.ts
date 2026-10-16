export interface StoreApiProduct {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: any;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  price_html: string;
  average_rating: string;
  review_count: number;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    link: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
    link: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    taxonomy: string | null;
    has_variations: boolean;
    terms: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
  }>;
  variations: any[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: number | null;
  sold_individually: boolean;
  quantity_limit: number;
  add_to_cart: {
    text: string;
    description: string;
    url: string;
    minimum: number;
    maximum: number;
    multiple_of: number;
  };

  // Custom metadata fields injected server-side or from fallback
  customMeta?: {
    ingredients?: string;
    allergens?: string;
    nutrition?: string;
    rda?: string;
    recipes?: Array<{
      title: string;
      description?: string;
      prep_time?: string;
      image_url?: string;
      badge?: string;
    }>;
    pack_size?: string;
  };
}

export interface StoreApiCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    alt: string;
  }>;
  variation: any[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_prefix: string;
    currency_suffix: string;
  };
  totals: {
    line_subtotal: string;
    line_total: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_prefix: string;
    currency_suffix: string;
  };
}

export interface StoreApiCart {
  coupons: any[];
  shipping_rates: any[];
  shipping_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  items: StoreApiCartItem[];
  items_count: number;
  items_weight: number;
  cross_sells: any[];
  fees: any[];
  totals: {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string | null;
    total_shipping_tax: string | null;
    total_price: string;
    total_tax: string;
    tax_lines: any[];
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_prefix: string;
    currency_suffix: string;
  };
  needs_shipping: boolean;
  has_calculated_shipping: boolean;
}

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  featured_media_url?: string;
  author_name?: string;
}

export interface WordPressPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}
