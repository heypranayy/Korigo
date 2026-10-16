"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { StoreApiCart, StoreApiCartItem } from "../woocommerce/types";
import {
  fetchStoreCart,
  addStoreCartItem,
  updateStoreCartQuantity,
  removeStoreCartItem,
  formatStorePrice,
  getFallbackProducts,
} from "../woocommerce/storeApi";

interface CartContextType {
  cart: StoreApiCart | null;
  items: StoreApiCartItem[];
  itemCount: number;
  subtotal: string;
  total: string;
  currencySymbol: string;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (productId: number, quantity?: number) => Promise<boolean>;
  updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
  removeItem: (itemKey: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_TOKEN_KEY = "korigo_wc_cart_token";
const NONCE_KEY = "korigo_wc_cart_nonce";
const LOCAL_CART_KEY = "korigo_local_cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<StoreApiCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartToken, setCartToken] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string | null>(null);

  // Initialize cart session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem(CART_TOKEN_KEY);
      const savedNonce = localStorage.getItem(NONCE_KEY);
      const savedLocalCart = localStorage.getItem(LOCAL_CART_KEY);

      if (savedToken) setCartToken(savedToken);
      if (savedNonce) setNonce(savedNonce);
      if (savedLocalCart) {
        try {
          setCart(JSON.parse(savedLocalCart));
        } catch (_) {}
      }

      refreshCart(savedToken);
    }
  }, []);

  const saveTokens = (newToken?: string, newNonce?: string) => {
    if (newToken && typeof window !== "undefined") {
      localStorage.setItem(CART_TOKEN_KEY, newToken);
      setCartToken(newToken);
    }
    if (newNonce && typeof window !== "undefined") {
      localStorage.setItem(NONCE_KEY, newNonce);
      setNonce(newNonce);
    }
  };

  const updateCartWithPersist = (newCart: StoreApiCart) => {
    setCart(newCart);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart));
    }
  };

  const refreshCart = useCallback(async (token?: string | null) => {
    setIsLoading(true);
    const activeToken = token !== undefined ? token : cartToken;
    const res = await fetchStoreCart(activeToken);
    if (res.cart && res.cart.items && res.cart.items.length > 0) {
      updateCartWithPersist(res.cart);
    }
    if (res.newCartToken || res.nonce) {
      saveTokens(res.newCartToken, res.nonce);
    }
    setIsLoading(false);
  }, [cartToken]);

  const addToCart = async (productId: number, quantity: number = 1): Promise<boolean> => {
    setIsLoading(true);
    const res = await addStoreCartItem(productId, quantity, cartToken, nonce);
    if (res.cart && res.cart.items && res.cart.items.length > 0) {
      updateCartWithPersist(res.cart);
      saveTokens(res.newCartToken, res.nonce);
      setIsOpen(true);
      setIsLoading(false);
      return true;
    }

    // Resilient fallback: Construct / update cart locally
    const catalog = getFallbackProducts();
    const product = catalog.find((p) => p.id === productId) || catalog.find((p) => p.slug.includes(productId.toString())) || catalog[0];
    if (product) {
      const existingItems = cart?.items ? [...cart.items] : [];
      const existingIndex = existingItems.findIndex((it) => it.id === productId || it.name === product.name);

      if (existingIndex >= 0) {
        const item = existingItems[existingIndex];
        const newQty = item.quantity + quantity;
        const lineTotal = (parseFloat(product.prices.price) * newQty).toString();
        existingItems[existingIndex] = {
          ...item,
          quantity: newQty,
          totals: {
            ...item.totals,
            line_total: lineTotal,
          },
        };
      } else {
        const lineTotal = (parseFloat(product.prices.price) * quantity).toString();
        existingItems.push({
          key: `local_${productId}_${Date.now()}`,
          id: productId,
          quantity: quantity,
          name: product.name,
          short_description: product.short_description,
          description: product.description,
          sku: product.sku,
          low_stock_remaining: null,
          backorders_allowed: false,
          show_backorder_badge: false,
          sold_individually: false,
          permalink: product.permalink,
          images: product.images,
          variation: [],
          prices: product.prices,
          totals: {
            line_subtotal: product.prices.price,
            line_total: lineTotal,
            currency_code: "INR",
            currency_symbol: "₹",
            currency_minor_unit: 2,
            currency_prefix: "₹",
            currency_suffix: "",
          },
        });
      }

      const totalMinor = existingItems.reduce((acc, it) => acc + (parseFloat(it.prices.price) * it.quantity), 0);
      const totalCount = existingItems.reduce((acc, it) => acc + it.quantity, 0);

      const fallbackCart: StoreApiCart = {
        items: existingItems,
        coupons: [],
        fees: [],
        totals: {
          total_items: totalMinor.toString(),
          total_items_tax: "0",
          total_fees: "0",
          total_fees_tax: "0",
          total_discount: "0",
          total_discount_tax: "0",
          total_shipping: totalMinor >= 49900 ? "0" : "4900",
          total_shipping_tax: "0",
          total_price: totalMinor.toString(),
          total_tax: "0",
          tax_lines: [],
          currency_code: "INR",
          currency_symbol: "₹",
          currency_minor_unit: 2,
          currency_prefix: "₹",
          currency_suffix: "",
        },
        shipping_address: {} as any,
        billing_address: {} as any,
        needs_shipping: true,
        has_calculated_shipping: true,
        shipping_rates: [],
        items_count: totalCount,
        items_weight: 0,
        cross_sells: [],
      };

      updateCartWithPersist(fallbackCart);
      setIsOpen(true);
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const updateQuantity = async (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemKey);
      return;
    }
    setIsLoading(true);
    const res = await updateStoreCartQuantity(itemKey, quantity, cartToken, nonce);
    if (res.cart && res.cart.items) {
      updateCartWithPersist(res.cart);
      saveTokens(res.newCartToken);
    } else if (cart) {
      // Local fallback
      const updated = cart.items.map((it) => {
        if (it.key === itemKey) {
          const lineTotal = (parseFloat(it.prices.price) * quantity).toString();
          return { ...it, quantity, totals: { ...it.totals, line_total: lineTotal } };
        }
        return it;
      });
      const totalMinor = updated.reduce((acc, it) => acc + (parseFloat(it.prices.price) * it.quantity), 0);
      const totalCount = updated.reduce((acc, it) => acc + it.quantity, 0);
      updateCartWithPersist({
        ...cart,
        items: updated,
        items_count: totalCount,
        totals: {
          ...cart.totals,
          total_items: totalMinor.toString(),
          total_price: totalMinor.toString(),
        },
      });
    }
    setIsLoading(false);
  };

  const removeItem = async (itemKey: string) => {
    setIsLoading(true);
    const res = await removeStoreCartItem(itemKey, cartToken, nonce);
    if (res.cart && res.cart.items) {
      updateCartWithPersist(res.cart);
      saveTokens(res.newCartToken);
    } else if (cart) {
      // Local fallback
      const filtered = cart.items.filter((it) => it.key !== itemKey);
      const totalMinor = filtered.reduce((acc, it) => acc + (parseFloat(it.prices.price) * it.quantity), 0);
      const totalCount = filtered.reduce((acc, it) => acc + it.quantity, 0);
      updateCartWithPersist({
        ...cart,
        items: filtered,
        items_count: totalCount,
        totals: {
          ...cart.totals,
          total_items: totalMinor.toString(),
          total_price: totalMinor.toString(),
        },
      });
    }
    setIsLoading(false);
  };

  const items = cart?.items || [];
  const itemCount = cart?.items_count ?? items.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart?.totals?.total_price ? formatStorePrice(cart.totals.total_price) : "0.00";
  const subtotal = cart?.totals?.total_items ? formatStorePrice(cart.totals.total_items) : total;
  const currencySymbol = cart?.totals?.currency_symbol || "₹";

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        itemCount,
        subtotal,
        total,
        currencySymbol,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((prev) => !prev),
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
