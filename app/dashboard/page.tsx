
"use client";

import { useEffect, useState } from "react";
import DashboardCards from "@/components/layouts/dashboard/dashboard-cards";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProduct } from "@/hooks/use-product";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  images?: string[];
  price?: { NGN?: string; USD?: string; GBP?: string };
  category?: { name: string };
  publisheshed?: boolean;
  stock?: number;
  brand?: string;
}

export default function Page() {
  const { getProductsData, deleteProduct } = useProduct();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProductsData();
      setProducts(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardCards />

      {/* Products Section */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and view all your products
            </p>
          </div>
          <Link href="/dashboard/add">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </Button>
          </Link>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-xs text-red-600 hover:text-red-700 mt-1 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg h-80 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4m0 0L4 7m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0L12 3m0 0L4 7"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first product
            </p>
            <Link href="/dashboard/add">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Product
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                {/* Product Image */}
                {product.images && product.images.length > 0 ? (
                  <div className="relative w-full h-40 bg-gray-100">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4m0 0L4 7m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0L12 3m0 0L4 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.brand || "No brand"}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                        product.publisheshed
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.publisheshed ? "Published" : "Draft"}
                    </div>
                  </div>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Price (NGN)</p>
                      <p className="font-semibold text-gray-900">
                        ₦{product.price?.NGN || "0.00"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className="font-semibold text-gray-900">
                        {product.stock || 0}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  {product.category && (
                    <p className="text-xs text-blue-600 mb-4">
                      Category: {product.category.name}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-4 border-t">
                    <Link href={`/dashboard/edit/${product._id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </Button>
                    </Link>

                    <AlertDialog
                      open={deleteConfirm === product._id}
                      onOpenChange={(open) => {
                        if (!open) setDeleteConfirm(null);
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => setDeleteConfirm(product._id)}
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete product?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &ldquo;{product.name}&ldquo;?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
