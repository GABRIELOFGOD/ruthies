"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCategory } from "@/hooks/use-category";
import AddCategory from "@/components/layouts/dashboard/add-category";
import EditCategory from "@/components/layouts/dashboard/edit-category";
import Image from "next/image";
import {
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string | null;
  createdAt?: string;
}

const DashboardCategories = () => {
  const { createCategory, getCategories, updateCategory, deleteCategory } =
    useCategory();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add category state
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Edit category state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryDescription, setEditCategoryDescription] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState<string | null>(
    null,
  );
  const [editCategoryImageFile, setEditCategoryImageFile] =
    useState<File | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setError("Category name is required");
      return;
    }
    try {
      await createCategory({
        name: newCategoryName,
        description: newCategoryDescription,
        imageFile: newCategoryImage || undefined,
      });
      setNewCategoryName("");
      setNewCategoryDescription("");
      setNewCategoryImage(null);
      setOpenAddDialog(false);
      await fetchCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create category",
      );
    }
  };

  const handleEditCategory = async () => {
    if (!editingId) return;
    if (!editCategoryName.trim()) {
      setError("Category name is required");
      return;
    }
    try {
      await updateCategory({
        id: editingId,
        name: editCategoryName,
        description: editCategoryDescription,
        imageFile: editCategoryImageFile || undefined,
      });
      setEditingId(null);
      setEditCategoryName("");
      setEditCategoryDescription("");
      setEditCategoryImage(null);
      setEditCategoryImageFile(null);
      setOpenEditDialog(false);
      await fetchCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update category",
      );
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      setDeleteConfirm(null);
      await fetchCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete category",
      );
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category._id);
    setEditCategoryName(category.name);
    setEditCategoryDescription(category.description || "");
    setEditCategoryImage(category.image || null);
    setEditCategoryImageFile(null);
    setOpenEditDialog(true);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your product categories
          </p>
        </div>
        <AlertDialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <AlertDialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Category
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

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-xs text-red-600 hover:text-red-700 mt-1 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-64 animate-pulse"
            />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No categories yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first category
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              {/* Category Image */}
              {category.image ? (
                <div className="relative w-full h-40 bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">
                  {category.description || "No description provided"}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <AlertDialog
                    open={openEditDialog}
                    onOpenChange={setOpenEditDialog}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                        onClick={() => startEdit(category)}
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </Button>
                    </AlertDialogTrigger>
                    {editingId === category._id && (
                      <EditCategory
                        categoryId={editingId}
                        categoryName={editCategoryName}
                        setCategoryName={setEditCategoryName}
                        categoryDescription={editCategoryDescription}
                        setCategoryDescription={setEditCategoryDescription}
                        handleEditCategory={handleEditCategory}
                        categoryImage={editCategoryImage}
                        categoryImageFile={editCategoryImageFile}
                        setCategoryImageFile={setEditCategoryImageFile}
                      />
                    )}
                  </AlertDialog>

                  <AlertDialog
                    open={deleteConfirm === category._id}
                    onOpenChange={(open) => {
                      if (!open) setDeleteConfirm(null);
                    }}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => setDeleteConfirm(category._id)}
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete category?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &ldquo;{category.name}&ldquo;?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category._id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <AlertDialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        {editingId && (
          <EditCategory
            categoryId={editingId}
            categoryName={editCategoryName}
            setCategoryName={setEditCategoryName}
            categoryDescription={editCategoryDescription}
            setCategoryDescription={setEditCategoryDescription}
            handleEditCategory={handleEditCategory}
            categoryImage={editCategoryImage}
            categoryImageFile={editCategoryImageFile}
            setCategoryImageFile={setEditCategoryImageFile}
          />
        )}
      </AlertDialog>
    </div>
  );
};

export default DashboardCategories;
