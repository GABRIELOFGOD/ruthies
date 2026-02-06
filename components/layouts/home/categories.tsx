"use client";

import { useCategory } from "@/hooks/use-category";
import { useEffect, useState } from "react";
import { ICategory } from "@/models/category";

const Categories = () => {
  const { getCategories } = useCategory();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const categoryArray = Array.isArray(data) ? data : data?.data || [];
        setCategories(categoryArray);
        if (categoryArray.length > 0) {
          setSelectedCategory(categoryArray[0]?._id);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-6 md:py-10 bg-black border-b border-gray-800">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[80%]">
        <div className="flex items-center gap-3 md:gap-6 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <button
              key={category._id.toString()}
              onClick={() => setSelectedCategory(category._id.toString())}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base whitespace-nowrap transition ${
                selectedCategory === category._id.toString()
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
