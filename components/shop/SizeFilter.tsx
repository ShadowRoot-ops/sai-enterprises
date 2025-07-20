import React from "react";
import { Title } from "../text";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface Props {
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
}

const sizeOptions = [
  { label: "A3", value: "a3", description: "29.7 × 42.0 cm" },
  { label: "A4", value: "a4", description: "21.0 × 29.7 cm" },
  { label: "A5", value: "a5", description: "14.8 × 21.0 cm" },
  { label: "A6", value: "a6", description: "10.5 × 14.8 cm" },
  { label: "Letter", value: "letter", description: "8.5 × 11 inch" },
  { label: "Legal", value: "legal", description: "8.5 × 14 inch" },
  { label: "Small", value: "small", description: "Pocket size" },
  { label: "Medium", value: "medium", description: "Standard size" },
  { label: "Large", value: "large", description: "Oversized" },
  { label: "XL", value: "xl", description: "Extra large" },
];

const SizeFilter = ({ selectedSizes, setSelectedSizes }: Props) => {
  const handleSizeToggle = (value: string) => {
    setSelectedSizes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSelectedSizes([]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Title className="text-base font-medium text-gray-900">Size</Title>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear
        </Button>
      </div>

      <div className="space-y-3">
        {sizeOptions.map((size) => {
          const isChecked = selectedSizes.includes(size.value);

          return (
            <div key={size.value} className="flex items-center space-x-3">
              <Checkbox
                id={size.value}
                checked={isChecked}
                onCheckedChange={() => handleSizeToggle(size.value)}
              />
              <div className="flex-1">
                <Label
                  htmlFor={size.value}
                  className="text-sm text-gray-700 cursor-pointer block"
                >
                  {size.label}
                </Label>
                <p className="text-xs text-gray-500 mt-1">{size.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeFilter;
