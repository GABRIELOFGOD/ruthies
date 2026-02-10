import EditProductPage from "@/components/layouts/dashboard/edit/edit-product-details";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <EditProductPage />
    </Suspense>
  );
}
