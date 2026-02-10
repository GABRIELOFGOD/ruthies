import ProductDetailPage from "@/components/products/products-details";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ProductDetailPage />
    </Suspense>
  );
}
