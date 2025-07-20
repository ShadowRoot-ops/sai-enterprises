"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FavouriteButtonProps {
  showProduct?: boolean;
  product?: Product | null | undefined;
  className?: string;
}

const FavouriteButton = ({
  showProduct = false,
  product,
  className = "",
}: FavouriteButtonProps) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!product?._id) {
      setExistingProduct(null);
      return;
    }

    const availableItem = favoriteProduct.find(
      (item) => item?._id === product._id
    );
    setExistingProduct(availableItem || null);
  }, [product?._id, favoriteProduct]);

  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!product?._id) {
      toast.error("Product information is missing");
      return;
    }

    try {
      await addToFavorite(product);
      toast.success(
        existingProduct
          ? "Product removed from favorites!"
          : "Product added to favorites!"
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Favorite action failed:", error);
    }
  };

  return (
    <>
      {!showProduct ? (
        <Link href="/wishlist" className={`group relative ${className}`}>
          <Heart className="w-5 h-5 hover:text-orange-400 hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-orange-400 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all">
            {favoriteProduct?.length || 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          disabled={!product?._id}
          className={`group relative hover:text-orange-400 hoverEffect border border-orange-400/80 hover:border-orange-400 p-1.5 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
          <Heart
            className={`mt-0.5 w-5 h-5 hoverEffect ${
              existingProduct
                ? "text-orange-400 fill-orange-400"
                : "text-orange-400/60 group-hover:text-orange-400"
            }`}
          />
        </button>
      )}
    </>
  );
};

export default FavouriteButton;
