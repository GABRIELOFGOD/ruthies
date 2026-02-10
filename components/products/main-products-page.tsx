"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Filters, { FilterState } from "@/components/products/filters";
import Sorting from "@/components/products/sorting";
import ProductCard from "@/components/products/product-card";
import { IProduct } from "@/models/product";
import { useProduct } from "@/hooks/use-product";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { getProductsData } = useProduct();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    gender: [],
    sizes: [],
    colors: [],
  });

  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = (await getProductsData()) as {
          data: IProduct[] | { data: IProduct[] };
        };
        let allProducts = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        // Filter by category if provided
        if (categoryId) {
          allProducts = allProducts.filter((p: IProduct) => {
            const categoryValue =
              typeof p.category === "object" && p.category
                ? (p.category as { _id: string })._id
                : p.category;
            return categoryValue === categoryId;
          });
        }

        // Apply filters
        allProducts = allProducts.filter((p: IProduct) => {
          const price = parseFloat(p.price?.USD || "0");
          if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
            return false;
          }

          if (
            filters.gender.length > 0 &&
            !filters.gender.includes(p.gender || "")
          ) {
            return false;
          }

          if (filters.sizes.length > 0) {
            const hasSizeMatch = filters.sizes.some((s) =>
              p.sizes?.includes(s),
            );
            if (!hasSizeMatch) return false;
          }

          if (filters.colors.length > 0) {
            const hasColorMatch = filters.colors.some((c) =>
              p.colors?.includes(c),
            );
            if (!hasColorMatch) return false;
          }

          return true;
        });

        // Sort products
        const sorted = [...allProducts].sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return (
                parseFloat(a.price?.USD || "0") -
                parseFloat(b.price?.USD || "0")
              );
            case "price-high":
              return (
                parseFloat(b.price?.USD || "0") -
                parseFloat(a.price?.USD || "0")
              );
            case "rating":
              return (b.ratings || 0) - (a.ratings || 0);
            case "name":
              return (a.name || "").localeCompare(b.name || "");
            default:
              return 0;
          }
        });

        setProducts(sorted);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, sortBy, filters]);

  return (
    <main className="min-h-screen bg-black py-8 md:py-12">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[85%]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
            Shop Our Collection
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Discover our curated selection of premium African fashion
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar - Filters (Hidden on mobile) */}
          <div className="hidden lg:block">
            <Filters onFilterChange={setFilters} />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Sorting and View Options */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div className="text-sm text-gray-400">
                Showing{" "}
                <span className="text-white font-semibold">
                  {products.length}
                </span>{" "}
                {products.length === 1 ? "product" : "products"}
              </div>
              <Sorting onSortChange={setSortBy} />
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-700 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id.toString()} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-gray-400 text-lg mb-4">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 5000],
                      gender: [],
                      sizes: [],
                      colors: [],
                    })
                  }
                  className="text-emerald-600 hover:text-emerald-500 font-semibold transition"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Mobile Filters (Bottom Sheet would be ideal) */}
            <div className="lg:hidden mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-white font-semibold mb-4">Filters</p>
              <Filters onFilterChange={setFilters} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
