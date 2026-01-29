"use client";

import { useProduct } from "@/hooks/use-product";
import { IProduct } from "@/models/product";
import Link from "next/link";
import { useEffect, useState } from "react";
import FeatureProductCard from "./feature-product-card";

const Features = () => {
  const { getProductsData } = useProduct();
  const [data, setData] = useState<IProduct[] | null>(null);

  const getData = async () => {
    const response = await getProductsData();
    setData(response.data as IProduct[] | null);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);
  
  return (
    <div>
      <div className="flex flex-col gap-10 mx-auto w-[90%] py-10">
        <div className="flex gap-5 justify-between w-full">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-primary">CURATED BY RUTHIE</h3>
            <p className="text-3xl font-extrabold">Stylist Picks</p>
          </div>
          <Link href="#" className="text-primary uppercase underline font-semibold self-end">View all</Link>
        </div>

        <div className="flex gap-5 overflow-x-auto w-full">
          {data?.map((product, index) => (
            <FeatureProductCard
              key={index}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Features;