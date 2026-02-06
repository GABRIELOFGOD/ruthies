import { IProduct } from "@/models/product";
import Image from "next/image";

const FeatureProductCard = ({ product }: { product: IProduct | null }) => {
  if (product === null) return <div></div>;
  return (
    <div className="relative rounded-xl overflow-hidden w-56 sm:w-60 md:w-72 lg:w-80 h-80 sm:h-96 md:h-[450px] flex-shrink-0 shadow-xl hover:shadow-2xl transition">
      <Image
        src={
          product.images !== null &&
          product.images !== undefined &&
          product.images.length
            ? product.images[0]
            : "/assets/hero.jpg"
        }
        alt={product.name}
        fill
        className="object-cover hover:scale-105 transition duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 md:p-6">
        <div className="flex items-end justify-between w-full gap-3">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wide">
              {product.category}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white font-bold mt-2">
              {product.name}
            </p>
            <p className="text-xs sm:text-sm text-white/90 mt-2 font-semibold">
              ${product.price?.USD ?? "0"} USD • ${product.price?.NGN ?? "0"}{" "}
              NGN
            </p>
          </div>
          <button className="bg-white text-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-lg shadow-lg hover:bg-gray-200 transition flex-shrink-0">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductCard;
