"use client";

import { useCategory } from "@/hooks/use-category";
import { ICategory } from "@/models/category";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Users, Globe } from "lucide-react";
import FeaturedCategory from "./featured-category";

const Features = () => {
  const { getCategories } = useCategory();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCategories();
        const categoryArray = Array.isArray(data) ? data : data?.data || [];
        setCategories(categoryArray);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <section className="py-8 md:py-14 bg-black">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[80%]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="font-bold text-emerald-600 text-sm md:text-base">
              CURATED BY RUTHIE
            </h3>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Shop by Category
            </p>
          </div>
          <Link
            href="/products"
            className="text-emerald-600 uppercase font-semibold text-xs md:text-sm self-end hidden sm:inline hover:text-emerald-500"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-56 sm:w-60 md:w-72 h-80 sm:h-96 bg-gray-700 rounded-xl flex-shrink-0 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="w-full overflow-x-auto scrollbar-hide py-2">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide w-fit pb-3">
              {categories?.map((category) => (
                <FeaturedCategory key={category._id.toString()} category={category} />
              ))}
            </div>
          </div>
        )}

        {/* Info cards section */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-700 rounded-xl p-8 md:p-10 flex items-start gap-4 hover:shadow-lg transition">
            <div className="bg-emerald-600 rounded-full p-4 flex-shrink-0">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-lg">
                1-on-1 Styling
              </h4>
              <p className="mt-2 text-sm text-emerald-100">
                Personal consultations with Ruthie to elevate your wardrobe.
              </p>
            </div>
          </div>

          <div className="bg-yellow-700 rounded-xl p-8 md:p-10 flex items-start gap-4 hover:shadow-lg transition">
            <div className="bg-yellow-600 rounded-full p-4 flex-shrink-0">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-lg">
                Global Shipping
              </h4>
              <p className="mt-2 text-sm text-yellow-100">
                Delivering African excellence to 120+ countries worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
