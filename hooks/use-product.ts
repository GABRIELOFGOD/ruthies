import { cache } from "react";
import { toast } from "sonner";

export const useProduct = () => {
  const getProductsData = cache(async () => {
    let loading = true;
    let data: unknown | null = null;
    try {
      const response = await fetch("/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if (!response.ok) {
      //   throw new Error(response.error || "Failed to fetch products data");
      // }
      data = await response.json();
      loading = false;
    } catch (error: unknown) {
      console.log("Error fetching products data:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
      data = null;
      loading = false;
    } finally {
      return { data, loading };
    }
  });

  const postProductsData = async (productData: FormData) => {
    let loading = true;
    let data: unknown | null = null;

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        body: productData,
      });
      // if (!response.ok) {
      //   throw new Error("Failed to post product data");
      // }
      data = await response.json();
      loading = false;
      toast.success("Product added successfully");
    } catch (error: unknown) {
      console.log("Error posting product data:", error);
      loading = false;
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      return { data, loading };
    }
  };

  return { getProductsData, postProductsData };
}