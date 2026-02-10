import ProductsPage from "@/components/products/main-products-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ProductsPage />
    </Suspense>
  );
}
