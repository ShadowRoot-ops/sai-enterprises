import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import React from "react";

const AddToWishlistButton = () => {
  return (
    <div className={cn("absolute top-2 right-2")}>
      <button className="p-2.5 rounded-full hover:bg-orange-400 hover:text-white hoverEffect cursor-pointer bg-[#f1f3f8]">
        <Heart size={15} />
      </button>
    </div>
  );
};

export default AddToWishlistButton;
