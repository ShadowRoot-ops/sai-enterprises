import { Product } from "@/sanity.types";
import useStore from "@/store";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Props {
  product: Product; // Made required instead of optional
  className?: string;
}

const QuantityButton = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product._id);
  const isOutofStock = product.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product._id);
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(
        `${product.name?.substring(0, 12) || "Product"} removed successfully!`
      );
    }
  };

  const handleAddToCart = () => {
    if ((product.stock || 0) > itemCount) {
      addItem(product);
      toast.success("Quantity Increased successfully!");
    } else {
      toast.error("Can not add more than available stock");
    }
  };

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant={"outline"}
        size={"icon"}
        disabled={itemCount === 0 || isOutofStock}
        className="w-6 h-6 border-0 hover:bg-amber-400/20 hoverEffect"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-Dark-Gray">
        {itemCount}
      </span>
      <Button
        onClick={handleAddToCart}
        variant={"outline"}
        size={"icon"}
        disabled={isOutofStock}
        className="w-6 h-6 border-0 hover:bg-amber-400/20 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButton;
