import React from "react";
import { Title } from "../text";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface Props {
  selectedProductTypes: string[];
  setSelectedProductTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const productTypeOptions = [
  { label: "Pen", value: "pen" },
  { label: "Pencil", value: "pencil" },
  { label: "Marker", value: "marker" },
  { label: "Highlighter", value: "highlighter" },
  { label: "Notebook", value: "notebook" },
  { label: "Diary", value: "diary" },
  { label: "Planner", value: "planner" },
  { label: "Sticky Notes", value: "sticky_notes" },
  { label: "Eraser", value: "eraser" },
  { label: "Ruler", value: "ruler" },
  { label: "Stapler", value: "stapler" },
  { label: "Paper Clips", value: "paper_clips" },
  { label: "Binder", value: "binder" },
  { label: "File Folder", value: "file_folder" },
  { label: "Calculator", value: "calculator" },
  { label: "Scissors", value: "scissors" },
  { label: "Glue", value: "glue" },
  { label: "Tape", value: "tape" },
];

const ProductTypeFilter = ({
  selectedProductTypes,
  setSelectedProductTypes,
}: Props) => {
  const handleProductTypeToggle = (value: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSelectedProductTypes([]);
  };

  return (
    <div className="w-full bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <Title className="text-base font-black">Product Type</Title>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-xs ml-2 px-3 py-1"
        >
          Clear
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {productTypeOptions.map((type) => {
          const isChecked = selectedProductTypes.includes(type.value);

          return (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={type.value}
                checked={isChecked}
                onCheckedChange={() => handleProductTypeToggle(type.value)}
              />
              <Label htmlFor={type.value} className="cursor-pointer">
                {type.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTypeFilter;
