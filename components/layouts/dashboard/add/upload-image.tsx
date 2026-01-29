"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface UploadImagesProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
}

const UploadImages = ({ images, onImagesChange }: UploadImagesProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const safeSelectedImage =
    images.length > 0 ? Math.min(selectedImage, images.length - 1) : 0;

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const newImages = [...images, ...Array.from(files)];
      onImagesChange(newImages);
    }
  };

  // const handleRemoveImage = (index: number) => {
  //   const newImages = images.filter((_, i) => i !== index);
  //   if (selectedImage >= newImages.length && newImages.length > 0) {
  //     setSelectedImage(newImages.length - 1);
  //   }
  //   onImagesChange(newImages);
  // };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);

    setSelectedImage((prev) => {
      if (newImages.length === 0) return 0;
      if (prev > index) return prev - 1;
      if (prev === index) return Math.max(0, index - 1);
      return prev;
    });

    onImagesChange(newImages);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 w-full overflow-x-hidden">
        <div className="w-full relative h-48 rounded-md border border-gray-300 border-dashed flex items-center justify-center bg-gray-50">
          {images.length > 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={URL.createObjectURL(images[safeSelectedImage])}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
                fill
              />
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No images selected</p>
          )}
        </div>
        <div className="flex gap-3 w-full overflow-x-auto pb-2">
          <div
            onClick={handleAddImage}
            className="w-10 h-10 rounded-md border border-gray-300 border-dashed flex justify-center items-center cursor-pointer hover:bg-gray-100 duration-100 shrink-0"
          >
            <PlusIcon size={20} className="text-gray-600" />
          </div>
          {images.map((image, index) => (
            <div
              onClick={() => setSelectedImage(index)}
              key={index}
              className="relative w-12 h-12 cursor-pointer shrink-0"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                className="w-full h-full object-cover rounded-md"
                fill
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                }}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
              >
                <X size={12} className="text-white" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
export default UploadImages;
