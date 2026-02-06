"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SortingProps {
  onSortChange: (sortBy: string) => void;
}

const Sorting = ({ onSortChange }: SortingProps) => {
  const [sortBy, setSortBy] = useState("newest");
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "name", label: "Alphabetical" },
  ];

  const handleSort = (value: string) => {
    setSortBy(value);
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
      >
        <span className="text-sm font-semibold">
          {sortOptions.find((opt) => opt.value === sortBy)?.label}
        </span>
        <ChevronDown
          size={18}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`w-full text-left px-4 py-3 text-sm transition ${
                sortBy === option.value
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sorting;
