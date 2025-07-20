import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
  { label: "Newest First", value: "newest" },
  { label: "Best Selling", value: "best_selling" },
  { label: "Most Reviewed", value: "most_reviewed" },
];

const SortFilter = ({ selectedSort, setSelectedSort }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
      <Select value={selectedSort} onValueChange={setSelectedSort}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select sorting option" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;
