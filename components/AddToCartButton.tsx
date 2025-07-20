"use client";

import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { HiShoppingBag } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";

interface Props {
  product: Product;
}

const AddToCartButton = ({ product }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product._id);
  const isOutofStock = product?.stock === 0;

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      toast.error("Cannot add more than available stock");
    }
  };

  return (
    <div className="flex w-full gap-2 pt-3 group-hover:opacity-100 transition-opacity duration-100">
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-Dark-Gray/80">Quantity</span>
            <QuantityButton product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutofStock}
          className={cn(
            "flex-1 bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <HiShoppingBag /> {isOutofStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
