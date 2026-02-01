import { IProduct } from "@/models/product";
import Image from "next/image";

const FeatureProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="w-75 h-112.5 overflow-hidden relative rounded-md">
      <Image
        src={(product.images !== null && product.images !== undefined && product.images.length) ? product.images[0] : "/assets/hero.jpg"}
        alt={product.name}
        fill
        className="h-full w-full object-cover"
      />
      <div className="absolute w-full h-full bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end">
        <p className="text-lg text-white p-4 font-semibold">{product.category}</p>
      </div>
    </div>
  )
}
export default FeatureProductCard;