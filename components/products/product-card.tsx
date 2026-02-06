"use client";

import { useState } from "react";
import Image from "next/image";
import { IProduct } from "@/models/product";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/assets/hero.jpg"];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/products/${product._id}`}>
      <div className="group cursor-pointer bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-emerald-600/50 transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gray-800 overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Image Indicators */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentImageIndex
                        ? "bg-emerald-600"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 z-20 bg-white/10 hover:bg-emerald-600 text-white rounded-full p-2 transition"
          >
            <Heart size={18} className={isFavorite ? "fill-current" : ""} />
          </button>

          {/* Stock Badge */}
          {product.stock && product.stock > 0 && (
            <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              In Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          {/* Category */}
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest">
            {typeof product.category === "object" &&
            product.category &&
            "name" in product.category
              ? (product.category as { name: string }).name
              : typeof product.category === "string"
                ? product.category
                : "Uncategorized"}
          </p>

          {/* Product Name */}
          <h3 className="text-base md:text-lg font-bold text-white mt-2 line-clamp-2 group-hover:text-emerald-400 transition">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {product.ratings > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-500 text-xs">
                {"★".repeat(Math.round(product.ratings))}
              </div>
              <span className="text-xs text-gray-400">
                ({product.numOfReviews})
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 line-through">
                ${product.price?.USD || "0"}
              </p>
              <p className="text-lg md:text-xl font-bold text-white">
                ${(parseFloat(product.price?.USD || "0") * 0.9).toFixed(2)}
              </p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold transition">
              +
            </button>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-400">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
