import { Category } from "@/sanity.types";
import React from "react";
import { Title } from "../text";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Tag } from "lucide-react";

interface Props {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryLists = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}: Props) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-gray-500" />
          <Title className="text-base font-medium text-gray-900">
            Categories
          </Title>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg
              className="h-8 w-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            {Array.isArray(categories)
              ? "No categories available"
              : "Loading categories..."}
          </p>
        </div>
      </div>
    );
  }

  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-gray-500" />
          <Title className="text-base font-medium text-gray-900">
            Categories
          </Title>
        </div>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 h-auto rounded-full transition-colors"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {categories.map((category) => {
          const slug = category?.slug?.current || "unknown";
          const isChecked = selectedCategories.includes(slug);

          return (
            <div
              key={category._id}
              className={`
                flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer
                ${isChecked ? "bg-blue-50 border border-blue-200" : ""}
              `}
            >
              <Checkbox
                id={slug}
                checked={isChecked}
                onCheckedChange={() => handleCategoryToggle(slug)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label
                htmlFor={slug}
                className={`
                  text-sm cursor-pointer flex-1 transition-colors
                  ${isChecked ? "text-blue-700 font-medium" : "text-gray-700 hover:text-gray-900"}
                `}
              >
                {category?.title || "Untitled Category"}
              </Label>
            </div>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map((categorySlug) => {
              const category = categories.find(
                (cat) => cat?.slug?.current === categorySlug
              );
              return (
                <span
                  key={categorySlug}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {category?.title || categorySlug}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryLists;
