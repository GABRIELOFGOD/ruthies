export const useCategory = () => {
  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const createCategory = async (opts: {
    name: string;
    description?: string;
    imageFile?: File | null;
  }) => {
    const { name, description, imageFile } = opts;
    let imageBase64: string | null = null;
    if (imageFile) {
      imageBase64 = await fileToDataUrl(imageFile);
    }

    const res = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, imageBase64 }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || "Failed to create category");
    }

    return res.json();
  };

  const getCategories = async () => {
    const res = await fetch("/api/category");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  };

  const updateCategory = async (opts: {
    id: string;
    name?: string;
    description?: string;
    imageFile?: File | null;
  }) => {
    const { id, name, description, imageFile } = opts;
    let imageBase64: string | null | undefined = undefined;
    if (imageFile !== undefined) {
      imageBase64 = imageFile ? await fileToDataUrl(imageFile) : null;
    }

    const res = await fetch("/api/category", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, description, imageBase64 }),
    });
    if (!res.ok) throw new Error("Failed to update category");
    return res.json();
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch("/api/category", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Failed to delete category");
    return res.json();
  };

  return { createCategory, getCategories, updateCategory, deleteCategory };
};
