"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddProductCategoryProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: string[];
}

const AddProductCategory = ({
  selectedCategory,
  onCategoryChange,
  categories = [],
}: AddProductCategoryProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      // TODO: Implement API call to add new category
      // const response = await fetch("/api/category", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: newCategoryName,
      //     description: newCategoryDescription,
      //   }),
      // });
      
      // For now, just close dialog and show success
      setNewCategoryName("");
      setNewCategoryDescription("");
      setIsDialogOpen(false);
      toast.success("Category added successfully");
    } catch (error) {
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
            {categories.length > 0 ? (
              categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))
            ) : (
              <>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </>
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
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Add category</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold">Category Name</p>
                    <Input
                      placeholder="Enter category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold">Category Description</p>
                    <Textarea
                      placeholder="Describe your category in details"
                      value={newCategoryDescription}
                      onChange={(e) => setNewCategoryDescription(e.target.value)}
                      className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-40 placeholder:text-gray-400 placeholder:italic"
                    />
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddCategory}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
export default AddProductCategory;
