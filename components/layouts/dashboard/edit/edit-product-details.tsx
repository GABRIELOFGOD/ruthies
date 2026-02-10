"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckIcon, Loader2, PencilIcon } from "lucide-react";
import { useProduct } from "@/hooks/use-product";
import { toast } from "sonner";

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { updateProduct } = useProduct();

  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  interface Product {
    name: string;
    description: string;
    price: { NGN: string; USD: string; GBP: string };
    category: string;
    stock: number | null;
    brand: string;
    gender: string;
    publisheshed: boolean;
  }

  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: { NGN: "0.00", USD: "0.00", GBP: "0.00" },
    category: "",
    stock: null,
    brand: "",
    gender: "unisex",
    publisheshed: false,
  });

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data?.data || data || {});
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean | object,
  ) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (
    currency: "NGN" | "USD" | "GBP",
    value: string,
  ) => {
    setProduct((prev: Product) => ({
      ...prev,
      price: { ...(prev.price || {}), [currency]: value },
    }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    try {
      if (isDraft) setIsSavingDraft(true);
      else setIsPublishing(true);

      if (!product.name?.trim()) {
        toast.error("Product name is required");
        if (isDraft) setIsSavingDraft(false);
        else setIsPublishing(false);
        return;
      }

      if (
        !product.category ||
        !/^[0-9a-fA-F]{24}$/.test(String(product.category))
      ) {
        toast.error("Please select a valid category");
        if (isDraft) setIsSavingDraft(false);
        else setIsPublishing(false);
        return;
      }

      // Prepare update payload
      const payload = {
        ...product,
        publisheshed: !isDraft,
      };

      const res = await updateProduct(id, payload);
      if (res?.data) {
        toast.success(isDraft ? "Saved as draft" : "Published successfully");
        router.replace(`/dashboard`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setIsPublishing(false);
      setIsSavingDraft(false);
    }
  };

  const canPublish = Boolean(
    product.name?.trim() &&
    product.price?.NGN &&
    product.price?.NGN !== "0.00" &&
    product.category,
  );

  if (loading)
    return (
      <div className="p-6">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <Input
            value={product.name || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("name", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={product.description || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange("description", e.target.value)
            }
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (NGN)
            </label>
            <Input
              type="number"
              value={product.price?.NGN || "0.00"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePriceChange("NGN", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (USD)
            </label>
            <Input
              type="number"
              value={product.price?.USD || "0.00"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePriceChange("USD", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (GBP)
            </label>
            <Input
              type="number"
              value={product.price?.GBP || "0.00"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePriceChange("GBP", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Input
            value={product.category || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("category", e.target.value)
            }
            placeholder="Category id"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            disabled={isSavingDraft}
          >
            {isSavingDraft ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <PencilIcon className="w-4 h-4" />
            )}{" "}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={isPublishing || !canPublish}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            {isPublishing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckIcon className="w-4 h-4" />
            )}{" "}
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
