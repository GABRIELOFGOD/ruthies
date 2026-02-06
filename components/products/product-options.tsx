"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductOptionsProps {
  sizes?: string[];
  colors?: string[];
  onAddToCart: (options: {
    quantity: number;
    size?: string;
    color?: string;
  }) => void;
  isLoading?: boolean;
}

const ProductOptions = ({
  sizes = [],
  colors = [],
  onAddToCart,
  isLoading = false,
}: ProductOptionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddToCart = () => {
    // Validate selections
    if (sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    onAddToCart({
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 rounded-lg border-2 font-semibold text-sm transition ${
                  selectedSize === size
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {colors.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Color</h3>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`p-3 rounded-lg border-2 font-semibold text-xs text-center transition ${
                  selectedColor === color
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Quantity</h3>
        <div className="flex items-center gap-4 bg-white/5 border border-white/20 rounded-lg w-fit p-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-white hover:text-emerald-600 transition"
          >
            <Minus size={18} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center bg-transparent text-white font-semibold text-lg outline-none"
            title="Quantity"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-white hover:text-emerald-600 transition"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-lg rounded-lg transition disabled:opacity-50"
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </Button>

      {/* Additional Info */}
      <div className="space-y-2 text-sm text-gray-400 border-t border-white/10 pt-6">
        <div className="flex justify-between">
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="flex justify-between">
          <span>30-day return policy</span>
        </div>
        <div className="flex justify-between">
          <span>Authentic product guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
