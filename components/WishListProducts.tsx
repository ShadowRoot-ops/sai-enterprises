"use client";
import useStore from "@/store";
import React, { useState } from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import Link from "next/link";
import { Heart, X, ShoppingBag, Minus, Plus } from "lucide-react";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 4, favoriteProduct.length));
  };

  const loadLess = () => {
    setVisibleProducts((prev) => Math.max(prev - 4, 8));
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromFavorite(productId);
    toast.success("Removed from wishlist", {
      style: {
        background: "#000",
        color: "#fff",
        border: "1px solid #f97316",
      },
    });
  };

  const handleResetWishlist = () => {
    resetFavorite();
    toast.success("Wishlist cleared", {
      style: {
        background: "#000",
        color: "#fff",
        border: "1px solid #f97316",
      },
    });
  };

  return (
    <Container>
      <div className="py-12">
        {favoriteProduct?.length > 0 ? (
          <>
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-light tracking-wide text-black mb-4">
                Your Wishlist
              </h1>
              <div className="w-20 h-0.5 bg-orange-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 font-light">
                {favoriteProduct.length} item
                {favoriteProduct.length !== 1 ? "s" : ""} saved
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {favoriteProduct
                .slice(0, visibleProducts)
                ?.map((product: Product) => (
                  <div
                    key={product?._id}
                    className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-orange-500/20"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(product?._id)}
                      className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
                    >
                      <X size={16} />
                    </button>

                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {product?.images && (
                        <Link
                          href={{
                            pathname: `/product${product?.slug?.current}`,
                            query: { id: product?._id },
                          }}
                        >
                          <Image
                            src={urlFor(product?.images[0]).url()}
                            alt={product?.name || "Product"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </Link>
                      )}

                      {/* Stock Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            (product?.stock as number) > 0
                              ? "bg-orange-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {(product?.stock as number) > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-black mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                          {product?.name}
                        </h3>
                        {product?.categories && (
                          <p className="text-sm text-gray-500 uppercase tracking-wide font-light">
                            {product?.categories.map((cat) => cat).join(", ")}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xl font-light text-black">
                          <PriceFormatter amount={product?.price} />
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="mt-6">
                        <AddToCartButton
                          product={product}
                          className="w-full bg-black text-white hover:bg-orange-500 border-none rounded-lg py-3 font-medium transition-all duration-300 hover:shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-4">
                {visibleProducts < favoriteProduct?.length && (
                  <Button
                    onClick={loadMore}
                    variant="outline"
                    className="px-8 py-3 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Load More
                  </Button>
                )}

                {visibleProducts > 8 && (
                  <Button
                    onClick={loadLess}
                    variant="outline"
                    className="px-8 py-3 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Minus size={16} />
                    Show Less
                  </Button>
                )}
              </div>

              {favoriteProduct?.length > 0 && (
                <Button
                  onClick={handleResetWishlist}
                  className="px-8 py-3 bg-orange-500 text-white hover:bg-orange-600 border-none rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Clear Wishlist
                </Button>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 px-4 text-center">
            <div className="relative">
              <div className="absolute -top-2 -right-2 h-6 w-6 animate-ping rounded-full bg-orange-500/20" />
              <div className="bg-gray-50 rounded-full p-8">
                <Heart className="h-16 w-16 text-gray-400" strokeWidth={1} />
              </div>
            </div>

            <div className="space-y-4 max-w-md">
              <h2 className="text-3xl font-light tracking-wide text-black">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                Save your favorite items here and never lose track of what you
                love. Start building your perfect collection today.
              </p>
            </div>

            <Button
              asChild
              className="px-8 py-4 bg-black text-white hover:bg-orange-500 border-none rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2"
            >
              <Link href="/shop">
                <ShoppingBag size={18} />
                Explore Products
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default WishListProducts;
