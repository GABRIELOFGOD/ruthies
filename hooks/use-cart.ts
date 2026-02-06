"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  name?: string;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  updatedAt: string;
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], total: 0, updatedAt: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId: string,
    price: number,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity,
          size,
          color,
          price,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      const data = await res.json();
      setCart(data.cart);
      toast.success("Added to cart!");
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
      throw error;
    }
  };

  const updateCartItem = async (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity,
          size,
          color,
        }),
      });

      if (!res.ok) throw new Error("Failed to update cart");
      const data = await res.json();
      setCart(data.cart);
      return data;
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
      throw error;
    }
  };

  const removeFromCart = async (
    productId: string,
    size?: string,
    color?: string
  ) => {
    try {
      const params = new URLSearchParams({
        productId,
        ...(size && { size }),
        ...(color && { color }),
      });

      const res = await fetch(`/api/cart?${params}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove from cart");
      const data = await res.json();
      setCart(data.cart);
      toast.success("Removed from cart");
      return data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item");
      throw error;
    }
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, updatedAt: new Date().toISOString() });
  };

  return {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    itemCount: cart?.items.length || 0,
    totalPrice: cart?.total || 0,
  };
};
