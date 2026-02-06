import { ICategory } from "@/models/category";
import Image from "next/image";
import Link from "next/link";

const FeaturedCategory = ({ category }: { category: ICategory }) => {
  return (
    <Link href={`/products?category=${category._id}`}>
      <div className="relative rounded-xl overflow-hidden w-56 sm:w-60 md:w-72 lg:w-80 h-80 sm:h-96 md:h-[450px] flex-shrink-0 shadow-xl hover:shadow-2xl transition group cursor-pointer">
        <Image
          src={category.image || "/assets/hero.jpg"}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 md:p-6">
          <div className="flex items-end justify-between w-full gap-3">
            <div className="flex-1">
              <p className="text-base sm:text-lg md:text-2xl text-white font-bold">
                {category.name}
              </p>
              {category.description && (
                <p className="text-xs sm:text-sm text-white/80 mt-2 line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
            <button className="bg-emerald-600 text-white rounded-full w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-lg shadow-lg hover:bg-emerald-700 transition flex-shrink-0">
              →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCategory;
