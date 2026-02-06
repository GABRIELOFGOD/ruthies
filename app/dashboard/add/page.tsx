"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IProduct } from "@/models/product";
import { CheckIcon, Loader2, PencilIcon } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import UploadImages from "@/components/layouts/dashboard/add/upload-image";
import AddProductCategory from "@/components/layouts/dashboard/add/category";
import { useProduct } from "@/hooks/use-product";
import { toast } from "sonner";

const AddProduct = () => {
  const { postProductsData } = useProduct();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [autoConvertPrice, setAutoConvertPrice] = useState(false);

  const [product, setProduct] = useState<Partial<IProduct>>({
    name: "",
    description: "",
    price: { NGN: "0.00", USD: "0.00", GBP: "0.00" },
    category: "",
    stock: null,
    brand: "",
    colors: [],
    sizes: [],
    gender: "unisex",
    publisheshed: false,
  });

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleInputChange = (
    field: string,
    value: string | number | File | null,
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePriceChange = (
    currency: "NGN" | "USD" | "GBP",
    value: string,
  ) => {
    setProduct((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [currency]: value,
      },
    }));
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
    setProduct((prev) => ({
      ...prev,
      sizes: selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...(prev.sizes || []), size],
    }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    try {
      if (isDraft) setIsSavingDraft(true);
      else setIsPublishing(true);

      // Validate required fields
      if (!product.name?.trim()) {
        toast.error("Product name is required");
        if (isDraft) setIsSavingDraft(false);
        else setIsPublishing(false);
        return;
      }

      if (
        !product.category?.trim() ||
        !/^[0-9a-fA-F]{24}$/.test(String(product.category))
      ) {
        toast.error("Please select a valid category");
        // setIsLoading(false);
        return;
      }

      if (images.length === 0) {
        toast.error("Please upload at least one image");
        if (isDraft) setIsSavingDraft(false);
        else setIsPublishing(false);
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description || "");
      formData.append("category", product.category);
      formData.append("brand", product.brand || "");
      formData.append("gender", product.gender || "unisex");
      formData.append("stock", String(product.stock || 0));
      // publisheshed should be true for publish, false for draft
      formData.append("publisheshed", String(!isDraft));

      // Add prices
      formData.append("price[NGN]", product.price?.NGN || "0.00");
      formData.append("price[USD]", product.price?.USD || "0.00");
      formData.append("price[GBP]", product.price?.GBP || "0.00");

      // Add sizes
      selectedSizes.forEach((size) => {
        formData.append("sizes[]", size);
      });

      // Add images
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Call API
      const response = await postProductsData(formData);

      if (response.data) {
        // Reset form
        setProduct({
          name: "",
          description: "",
          price: { NGN: "0.00", USD: "0.00", GBP: "0.00" },
          category: "",
          stock: null,
          brand: "",
          colors: [],
          sizes: [],
          gender: "unisex",
          publisheshed: false,
        });
        setImages([]);
        setSelectedSizes([]);

        if (isDraft) {
          toast.success("Product saved as draft");
        } else {
          toast.success("Product published successfully");
        }
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to submit product");
    } finally {
      setIsPublishing(false);
      setIsSavingDraft(false);
    }
  };

  // Determine whether publish should be enabled
  const canPublish = Boolean(
    product.name?.trim() &&
    product.price?.NGN &&
    product.price?.NGN !== "0.00" &&
    product.category &&
    images.length > 0,
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-600 mt-1">
            Create and publish a new product
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            disabled={isSavingDraft}
            className="gap-2"
          >
            {isSavingDraft ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <PencilIcon className="w-4 h-4" />
            )}
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
            )}
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <Input
                  placeholder="Enter product name"
                  value={product.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Describe your product in details"
                  value={product.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full min-h-[120px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <Input
                  placeholder="Enter product brand"
                  value={product.brand || ""}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Variants Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Variants
            </h2>
            <div className="space-y-6">
              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Available Sizes
                </label>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`w-10 h-10 rounded border-2 font-semibold text-sm transition ${
                        selectedSizes.includes(size)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target Gender
                </label>
                <RadioGroup
                  value={product.gender || "unisex"}
                  onValueChange={(value) =>
                    handleInputChange(
                      "gender",
                      value as "male" | "female" | "unisex",
                    )
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="gender-male" />
                      <Label
                        htmlFor="gender-male"
                        className="text-sm font-medium"
                      >
                        Men
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="gender-female" />
                      <Label
                        htmlFor="gender-female"
                        className="text-sm font-medium"
                      >
                        Women
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unisex" id="gender-unisex" />
                      <Label
                        htmlFor="gender-unisex"
                        className="text-sm font-medium"
                      >
                        Unisex
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Pricing & Stock
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  Auto convert
                </span>
                <Switch
                  checked={autoConvertPrice}
                  onCheckedChange={setAutoConvertPrice}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (NGN)
                </label>
                <Input
                  placeholder="0.00"
                  type="number"
                  value={product.price?.NGN || "0.00"}
                  onChange={(e) => handlePriceChange("NGN", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD)
                </label>
                <Input
                  placeholder="0.00"
                  type="number"
                  value={product.price?.USD || "0.00"}
                  onChange={(e) => handlePriceChange("USD", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (GBP)
                </label>
                <Input
                  placeholder="0.00"
                  type="number"
                  value={product.price?.GBP || "0.00"}
                  onChange={(e) => handlePriceChange("GBP", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <Input
                placeholder="Enter quantity available"
                type="number"
                value={product.stock ?? ""}
                onChange={(e) =>
                  handleInputChange("stock", parseInt(e.target.value) || null)
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Images Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Product Images
            </h2>
            <UploadImages images={images} onImagesChange={setImages} />
          </div>

          {/* Category Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Category
            </h2>
            <AddProductCategory
              selectedCategory={product.category || ""}
              onCategoryChange={(category) =>
                handleInputChange("category", category)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
