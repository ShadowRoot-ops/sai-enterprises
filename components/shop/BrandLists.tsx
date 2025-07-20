import { BRANDS_QUERYResult } from "@/sanity.types";
import React from "react";
import { Title } from "../text";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandLists = ({ brands, selectedBrands, setSelectedBrands }: Props) => {
  if (!Array.isArray(brands) || brands.length === 0) {
    return (
      <div className="p-6">
        <Title className="text-base font-medium text-gray-900">Brands</Title>
        <p className="text-sm text-gray-500 mt-4">
          {!Array.isArray(brands) ? "Loading brands..." : "No brands found"}
        </p>
      </div>
    );
  }

  const safeSelectedBrands = selectedBrands || [];

  const handleBrandToggle = (slug: string) => {
    setSelectedBrands((prev) => {
      const safePrev = prev || [];
      return safePrev.includes(slug)
        ? safePrev.filter((item) => item !== slug)
        : [...safePrev, slug];
    });
  };

  const resetFilters = () => {
    setSelectedBrands([]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Title className="text-base font-medium text-gray-900">Brands</Title>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear
        </Button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {brands.map((brand) => {
          const slug = brand?.slug?.current || "unknown";
          const isChecked = safeSelectedBrands.includes(slug);

          return (
            <div key={brand._id} className="flex items-center space-x-3">
              <Checkbox
                id={slug}
                checked={isChecked}
                onCheckedChange={() => handleBrandToggle(slug)}
              />
              <Label
                htmlFor={slug}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {brand?.title || "Untitled Brand"}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandLists;
