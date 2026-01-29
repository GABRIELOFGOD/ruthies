"use client";

import { useUserContext } from "@/provider/user-provider";
import { SearchIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  // PopoverDescription,
  // PopoverHeader,
  // PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const { currency, changeCurrency } = useUserContext();

  return (
    <div className="w-full flex border-b-2 shadow">
      <div className="flex justify-between gap-5 w-[90%] mx-auto py-2">
        <div className="flex gap-5">
          <Image
            src="/images/ruthies_logo.jpg"
            alt="Ruthie's Logo"
            width={50}
            height={25}
          />
          <div className="hidden md:block">
            <h1 className="text-xl font-extrabold">Ruthies Africa</h1>
            <p className="text-xs text-primary/50 font-medium italic text-center">
              ...We Style, You Slay
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 my-auto">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex gap-2 rounded-full h-fit border bg-card py-1 px-3 cursor-pointer my-auto
              ">
                <p className="text-xs font-bold">Currency</p>
                <div className="h-full w-1 bg-gray-600" />
                <p className="text-primary text-xs font-bold">{currency}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex gap-3 flex-col">
                {["NGN", "USD", "GBP"].map((curr, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 p-2 text-xs rounded"
                    onClick={() => changeCurrency(curr)}
                  >
                    {curr}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div>
            <SearchIcon />
          </div>
          <div>
            <ShoppingBagIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
