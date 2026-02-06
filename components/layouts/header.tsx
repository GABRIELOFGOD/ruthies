"use client";

import { useUserContext } from "@/provider/user-provider";
import { SearchIcon, ShoppingBagIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const { currency, changeCurrency } = useUserContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full flex flex-col border-b-2 shadow bg-black">
      <div className="flex justify-between gap-5 w-[90%] mx-auto py-3 items-center">
        <Link href={"/"} className="flex gap-5 items-center">
          <Image
            src="/images/ruthies_logo.jpg"
            alt="Ruthie's Logo"
            width={50}
            height={25}
          />
          <div className="hidden md:block">
            <h1 className="text-xl font-extrabold text-white">
              Ruthies Africa
            </h1>
            <p className="text-xs text-emerald-600 font-medium italic text-center">
              ...We Style, You Slay
            </p>
          </div>
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <nav className="hidden md:flex gap-8 items-center text-white">
          <Link
            href="/"
            className="text-sm font-semibold hover:text-emerald-600 transition"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold hover:text-emerald-600 transition"
          >
            Shop
          </Link>
          <Link
            href="/services"
            className="text-sm font-semibold hover:text-emerald-600 transition"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold hover:text-emerald-600 transition"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-5 my-auto">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex gap-2 rounded-full h-fit border bg-white/10 border-white/20 py-1 px-3 cursor-pointer my-auto">
                <p className="text-xs font-bold text-white">Currency</p>
                <div className="h-full w-1 bg-gray-600" />
                <p className="text-emerald-600 text-xs font-bold">{currency}</p>
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

          <button type="button" className="text-white hover:text-emerald-600 transition">
            <SearchIcon size={20} />
          </button>
          <Link href="/cart" className="text-white hover:text-emerald-600 transition relative">
            <ShoppingBagIcon size={20} />
          </Link>
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-black border-t border-white/20 py-4 px-5 flex flex-col gap-4 text-white">
          <Link
            href="/"
            className="text-sm font-semibold hover:text-emerald-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold hover:text-emerald-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/services"
            className="text-sm font-semibold hover:text-emerald-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold hover:text-emerald-600 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
        </nav>
      )}
    </div>
  );
};
export default Header;
