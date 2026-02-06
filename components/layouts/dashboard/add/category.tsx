"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddCategory from "../add-category";
import { useCategory } from "@/hooks/use-category";

interface Category {
  _id: string;
  name: string;
}

interface AddProductCategoryProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: string[];
}

const AddProductCategory = ({
  selectedCategory,
  onCategoryChange,
  // categories = [],
}: AddProductCategoryProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getCategories, createCategory } = useCategory();
  const [availableCategories, setAvailableCategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data))
          setAvailableCategories(
            data.map((c: Category) => ({ _id: c._id, name: c.name })),
          );
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      const created = await createCategory({
        name: newCategoryName,
        description: newCategoryDescription,
        imageFile: newCategoryImage || undefined,
      });
      setNewCategoryName("");
      setNewCategoryDescription("");
      setNewCategoryImage(null);
      setIsDialogOpen(false);
      toast.success("Category added successfully");

      // Refresh available categories and select the new one
      const data = await getCategories();
      if (Array.isArray(data))
        setAvailableCategories(
          data.map((c: Category) => ({ _id: c._id, name: c.name })),
        );
      if (created?._id) onCategoryChange(created._id);
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to add category");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold">Product Category</p>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            {availableCategories.length > 0 ? (
              availableCategories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))
            ) : (
              // <>
                <SelectItem value="none">No categories</SelectItem>
              // </>
            )}
          </SelectContent>
        </Select>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger className="w-fit">
            <Button
              className="rounded-full w-fit justify-self-start"
              size={"lg"}
              type="button"
            >
              Add category
            </Button>
          </AlertDialogTrigger>
          <AddCategory
            newCategoryName={newCategoryName}
            setNewCategoryName={setNewCategoryName}
            newCategoryDescription={newCategoryDescription}
            setNewCategoryDescription={setNewCategoryDescription}
            handleAddCategory={handleAddCategory}
            newCategoryImage={newCategoryImage}
            setNewCategoryImage={setNewCategoryImage}
          />
        </AlertDialog>
      </div>
    </div>
  );
};
export default AddProductCategory;
