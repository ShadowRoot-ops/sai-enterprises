import { Title } from "@/components/text";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const priceArray = [
  { title: "Under ₹100", value: "0-100" },
  { title: "₹100-₹200", value: "100-200" },
  { title: "₹200-₹300", value: "200-300" },
  { title: "₹300-₹500", value: "300-500" },
  { title: "Over 500", value: "500-10000" },
];

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  const handlePriceToggle = (priceValue: string) => {
    // Toggle selection: if already selected, deselect it; otherwise select it
    if (selectedPrice === priceValue) {
      setSelectedPrice(null);
    } else {
      setSelectedPrice(priceValue);
    }
  };

  const resetFilters = () => {
    setSelectedPrice(null);
  };

  return (
    <div className="w-full bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <Title className="text-base font-black">Price</Title>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-xs ml-2 px-3 py-1"
        >
          Clear
        </Button>
      </div>

      <div className="space-y-2">
        {priceArray.map((price, index) => {
          const isChecked = selectedPrice === price.value;

          return (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={price.value}
                checked={isChecked}
                onCheckedChange={() => handlePriceToggle(price.value)}
              />
              <Label htmlFor={price.value} className="cursor-pointer">
                {price.title}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceList;
