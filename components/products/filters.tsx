"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  gender: string[];
  sizes: string[];
  colors: string[];
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    gender: true,
    sizes: true,
    colors: false,
  });

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    gender: [],
    sizes: [],
    colors: [],
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePriceChange = (value: number, type: "min" | "max") => {
    const newRange = [...filters.priceRange] as [number, number];
    if (type === "min") newRange[0] = value;
    else newRange[1] = value;
    setFilters({ ...filters, priceRange: newRange });
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleGenderChange = (gender: string) => {
    const newGenders = filters.gender.includes(gender)
      ? filters.gender.filter((g) => g !== gender)
      : [...filters.gender, gender];
    setFilters({ ...filters, gender: newGenders });
    onFilterChange({ ...filters, gender: newGenders });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    setFilters({ ...filters, sizes: newSizes });
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    setFilters({ ...filters, colors: newColors });
    onFilterChange({ ...filters, colors: newColors });
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Blue", "Red", "Green", "Yellow"];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto">
      <h3 className="text-lg font-bold text-white mb-6">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-4 text-white font-semibold"
        >
          Price Range
          <ChevronDown
            size={18}
            className={`transition ${expandedSections.price ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Min: ${filters.priceRange[0]}
              </label>
              <Input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handlePriceChange(parseInt(e.target.value), "min")
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Max: ${filters.priceRange[1]}
              </label>
              <Input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange(parseInt(e.target.value), "max")
                }
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Gender */}
      <div className="mb-6 border-t border-white/10 pt-6">
        <button
          onClick={() => toggleSection("gender")}
          className="flex items-center justify-between w-full mb-4 text-white font-semibold"
        >
          Gender
          <ChevronDown
            size={18}
            className={`transition ${expandedSections.gender ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.gender && (
          <div className="space-y-3">
            {["male", "female", "unisex"].map((gender) => (
              <label
                key={gender}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.gender.includes(gender)}
                  onChange={() => handleGenderChange(gender)}
                  className="w-4 h-4 rounded bg-white/10 border-white/20"
                />
                <span className="text-sm text-gray-300 capitalize">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-6 border-t border-white/10 pt-6">
        <button
          onClick={() => toggleSection("sizes")}
          className="flex items-center justify-between w-full mb-4 text-white font-semibold"
        >
          Sizes
          <ChevronDown
            size={18}
            className={`transition ${expandedSections.sizes ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.sizes && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-2 rounded border text-sm font-medium transition ${
                  filters.sizes.includes(size)
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-t border-white/10 pt-6">
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full mb-4 text-white font-semibold"
        >
          Colors
          <ChevronDown
            size={18}
            className={`transition ${expandedSections.colors ? "rotate-180" : ""}`}
          />
        </button>
        {expandedSections.colors && (
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`p-3 rounded border text-xs font-medium text-center transition ${
                  filters.colors.includes(color)
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          const newFilters: FilterState = {
            priceRange: [0, 5000],
            gender: [],
            sizes: [],
            colors: [],
          };
          setFilters(newFilters);
          onFilterChange(newFilters);
        }}
        className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition border border-white/10"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
