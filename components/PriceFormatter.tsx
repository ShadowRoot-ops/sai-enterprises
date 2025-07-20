import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = new Number(amount).toLocaleString("en-IN", {
    currency: "INR",
    style: "currency",
    maximumFractionDigits: 2,
  });
  return (
    <span className={twMerge("text-sm font-semibold text-black", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
