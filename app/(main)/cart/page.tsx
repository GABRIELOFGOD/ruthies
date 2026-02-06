"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();

  const cartWithDetails = useMemo(() => {
    return cart?.items || [];
  }, [cart]);

  const subtotal = cartWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleQuantityChange = async (
    index: number,
    newQuantity: number
  ) => {
    const item = cartWithDetails[index];
    if (newQuantity === 0) {
      await removeFromCart(item.productId, item.size, item.color);
    } else {
      await updateCartItem(
        item.productId,
        newQuantity,
        item.size,
        item.color
      );
    }
  };

  const handleRemoveItem = async (index: number) => {
    const item = cartWithDetails[index];
    await removeFromCart(item.productId, item.size, item.color);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="mx-auto w-[94%] md:w-[90%] lg:w-[85%]">
          <div className="h-96 bg-gray-700 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black py-8 md:py-12">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[85%]">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-500 transition mb-4">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
        </div>

        {cartWithDetails.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Start adding items to get started!</p>
            <Link href="/products">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg">
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartWithDetails.map((item, index) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-6"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-700 rounded-lg flex-shrink-0"></div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Product {item.productId}
                      </h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-400">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <p className="text-emerald-600 font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex flex-col items-end justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(index, item.quantity - 1)
                        }
                        className="text-white hover:text-emerald-600 transition p-2"
                        title="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, parseInt(e.target.value) || 1)
                        }
                        className="w-8 text-center bg-transparent text-white font-semibold outline-none"
                        title="Quantity"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(index, item.quantity + 1)
                        }
                        className="text-white hover:text-emerald-600 transition p-2"
                        title="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-400 transition p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit sticky top-20">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>

                {/* Summary Details */}
                <div className="space-y-3 border-b border-white/10 pb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                  )}
                  {shipping === 0 && subtotal > 100 && (
                    <div className="flex justify-between text-emerald-600 text-sm">
                      <span>Free Shipping</span>
                      <span>Applied</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-3xl font-black text-emerald-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-lg rounded-lg">
                  Proceed to Checkout
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/5"
                >
                  <Link href="/products" className="w-full">
                    Continue Shopping
                  </Link>
                </Button>

                {/* Additional Info */}
                <div className="space-y-2 text-xs text-gray-400 pt-4 border-t border-white/10">
                  <p>✓ Free shipping on orders over $100</p>
                  <p>✓ 30-day return policy</p>
                  <p>✓ Secure checkout</p>
                </div>
              </div>

              {/* Clear Cart Button */}
              {cartWithDetails.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your cart?")) {
                      clearCart();
                    }
                  }}
                  className="w-full mt-4 text-red-500 hover:text-red-400 font-semibold transition"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
