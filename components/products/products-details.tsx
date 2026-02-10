"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star, Share2, Heart } from "lucide-react";
import ImageGallery from "@/components/products/image-gallery";
import ProductOptions from "@/components/products/product-options";
import ProductCard from "@/components/products/product-card";
import { IProduct } from "@/models/product";
import { useCart } from "@/hooks/use-cart";
import { useProduct } from "@/hooks/use-product";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { getProductsData } = useProduct();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductsData();
        let allProducts: IProduct[] = [];
        
        if (Array.isArray(response.data)) {
          allProducts = response.data;
        } else if (response.data && typeof response.data === "object") {
          const dataRecord = response.data as Record<string, unknown>;
          allProducts = (Array.isArray(dataRecord.data) ? dataRecord.data : []) as IProduct[];
        }

        // Find the current product
        const currentProduct = allProducts.find(
          (p: IProduct) => p._id?.toString() === productId
        );

        if (!currentProduct) {
          console.error("Product not found");
          return;
        }

        setProduct(currentProduct);

        // Get related products from same category
        const currentCategoryId =
          typeof currentProduct.category === "object" && currentProduct.category
            ? (currentProduct.category as Record<string, unknown>)._id?.toString()
            : currentProduct.category;

        const related = allProducts
          .filter(
            (p: IProduct) => {
              const pCategoryId =
                typeof p.category === "object" && p.category
                  ? (p.category as Record<string, unknown>)._id?.toString()
                  : p.category;
              return pCategoryId === currentCategoryId && p._id?.toString() !== productId;
            }
          )
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleAddToCart = async (options: {
    quantity: number;
    size?: string;
    color?: string;
  }) => {
    if (!product) return;

    try {
      setAddingToCart(true);
      await addToCart(
        product._id?.toString() || "",
        parseFloat(product.price?.USD || "0"),
        options.quantity,
        options.size,
        options.color
      );
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="mx-auto w-[94%] md:w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-gray-400">Sorry, the product you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const categoryName =
    typeof product.category === "object" && product.category
      ? (product.category as Record<string, string>).name
      : typeof product.category === "string"
        ? product.category
        : "Uncategorized";

  return (
    <main className="min-h-screen bg-black py-8 md:py-12">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[85%]">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images || []} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Title */}
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">
                {categoryName}
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            {product.ratings > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-500">
                  {Array.from({ length: Math.round(product.ratings) }).map((_, i) => (
                    <Star key={i} size={18} className="fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  ({product.numOfReviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="py-4 border-y border-white/10">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-white">
                  ${(parseFloat(product.price?.USD || "0") * 0.9).toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${product.price?.USD || "0"}
                </span>
                <span className="text-emerald-600 font-bold">Save 10%</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Price in NGN: ₦{product.price?.NGN || "0"}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Stock Status */}
            <div>
              {product.stock && product.stock > 0 ? (
                <p className="text-emerald-600 font-semibold">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-500 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Product Options */}
            <ProductOptions
              sizes={product.sizes || []}
              colors={product.colors || []}
              onAddToCart={handleAddToCart}
              isLoading={addingToCart}
            />

            {/* Share & Favorite */}
            <div className="flex gap-4 border-t border-white/10 pt-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 transition">
                <Share2 size={20} />
                <span className="text-sm">Share</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 transition ${
                  isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                <span className="text-sm">Favorite</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct._id?.toString()} 
                  product={relatedProduct} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
