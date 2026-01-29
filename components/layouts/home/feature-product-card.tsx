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
    </div>
  )
}
export default FeatureProductCard;