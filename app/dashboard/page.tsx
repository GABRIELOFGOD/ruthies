import DashboardProducts from "@/components/layouts/dashboard/product/dashboard-products";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <DashboardProducts />
    </Suspense>
  );
}
