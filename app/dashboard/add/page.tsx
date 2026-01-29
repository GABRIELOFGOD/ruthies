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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);

      // Validate required fields
      if (!product.name?.trim()) {
        toast.error("Product name is required");
        return;
      }

      if (!product.category?.trim()) {
        toast.error("Please select a category");
        return;
      }

      if (images.length === 0) {
        toast.error("Please upload at least one image");
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
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 md:p-4 flex flex-col gap-5">
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">Add Product</p>
          <p className="text-xs font-medium italic text-gray-500">
            Please fill in the details below to add a new product.
          </p>
        </div>
        <div className="flex gap-5 my-auto">
          <Button
            variant="outline"
            className="flex"
            onClick={() => handleSubmit(true)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <PencilIcon />}
            <span className="ml-2">
              {isLoading ? "Saving draft..." : "Save Draft"}
            </span>
          </Button>
          <Button
            className="flex"
            onClick={() => handleSubmit(false)}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <CheckIcon />}
            <span className="ml-2">
              {isLoading ? "Publishing..." : "Publish Product"}
            </span>
          </Button>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5 flex-1 md:flex-3 w-full">
          <div className="flex w-full p-4 rounded-md bg-gray-50">
            <div className="flex flex-col gap-3 w-full">
              <p className="font-bold">General Information</p>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold">Product Name</p>
                <Input
                  placeholder="Enter product name"
                  value={product.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold">Product Description</p>
                <Textarea
                  placeholder="Describe your product in details"
                  value={product.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-40 placeholder:text-gray-400 placeholder:italic"
                />
              </div>

              <div className="flex flex-col gap-5 w-full md:flex-row">
                <div className="flex flex-col w-full gap-1">
                  <div className="flex flex-col">
                    <p className="text-xs font-bold">Size</p>
                    <p className="text-[10px] text-gray-400 font-semibold">
                      Select all available sizes
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`flex items-center justify-center w-10 h-10 border rounded-sm duration-100 cursor-pointer ${
                          selectedSizes.includes(size)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        <span className="text-xs font-bold">{size}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <div className="flex flex-col">
                    <p className="text-xs font-bold">Gender</p>
                    <p className="text-[10px] text-gray-400 font-semibold">
                      Pick available gender
                    </p>
                  </div>
                  <RadioGroup
                    className="flex gap-2 my-auto w-full justify-between"
                    value={product.gender || "unisex"}
                    onValueChange={(value) =>
                      handleInputChange(
                        "gender",
                        value as "male" | "female" | "unisex",
                      )
                    }
                  >
                    <div className="flex my-auto items-center space-x-2">
                      <RadioGroupItem value="male" id="option-one" />
                      <Label htmlFor="option-one" className="text-xs font-bold">
                        Men
                      </Label>
                    </div>
                    <div className="flex my-auto items-center space-x-2">
                      <RadioGroupItem value="female" id="option-two" />
                      <Label htmlFor="option-two" className="text-xs font-bold">
                        Women
                      </Label>
                    </div>
                    <div className="flex my-auto items-center space-x-2">
                      <RadioGroupItem value="unisex" id="option-three" />
                      <Label
                        htmlFor="option-three"
                        className="text-xs font-bold"
                      >
                        Unisex
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full p-4 rounded-md bg-gray-50">
            <div className="col-span-2 w-full flex justify-between">
              <p className="font-bold">Pricing and Stock</p>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold text-gray-500">
                  Auto convert prices
                </p>
                <Switch
                  checked={autoConvertPrice}
                  onCheckedChange={setAutoConvertPrice}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Price NGN</p>
              <Input
                placeholder="Enter product price in Naira"
                type="number"
                value={product.price?.NGN || "0.00"}
                onChange={(e) => handlePriceChange("NGN", e.target.value)}
                className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Price USD</p>
              <Input
                placeholder="Enter product price in Dollars"
                type="number"
                value={product.price?.USD || "0.00"}
                onChange={(e) => handlePriceChange("USD", e.target.value)}
                className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Price GBP</p>
              <Input
                placeholder="Enter product price in Pounds"
                type="number"
                value={product.price?.GBP || "0.00"}
                onChange={(e) => handlePriceChange("GBP", e.target.value)}
                className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Stock</p>
              <Input
                placeholder="Enter quantity available in stock"
                type="number"
                value={product.stock ?? ""}
                onChange={(e) =>
                  handleInputChange("stock", parseInt(e.target.value) || null)
                }
                className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-1 md:flex-2 w-full p-2 border rounded-md h-fit">
          <div className="flex w-full p-4 rounded-md bg-gray-50">
            <div className="flex flex-col gap-3 w-full">
              <p className="font-bold">Upload Images</p>
              <UploadImages images={images} onImagesChange={setImages} />
            </div>
          </div>
          <div className="flex w-full p-4 rounded-md bg-gray-50">
            <div className="flex flex-col gap-3 w-full">
              <p className="font-bold">Category</p>
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
    </div>
  );
};
export default AddProduct;
