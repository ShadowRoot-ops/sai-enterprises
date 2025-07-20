import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import { Sparkles, Flame, Star, StarIcon } from "lucide-react";
// import AddToWishlistButton from "./AddToWishlistButton";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import ProductSideMenu from "./ProductSideMenu";

const ProductCard = ({ product }: { product: Product }) => {
  const hasImages = product?.images && product.images.length > 0;
  const imageUrl =
    hasImages && product.images ? urlFor(product.images[0]).url() : null;

  const hasDiscount = product?.discount && product.discount > 0;
  console.log("Product Stock:", product?.stock);

  const getStatusIcon = () => {
    switch (product?.status) {
      case "new":
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span className="text-xs font-medium text-gray-800">New</span>
          </div>
        );
      case "hot":
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
            <Flame className="w-3 h-3 text-orange-500" />
            <span className="text-xs font-medium text-gray-800">Hot</span>
          </div>
        );
      case "limited":
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
            <Star className="w-3 h-3 text-orange-500" />
            <span className="text-xs font-medium text-gray-800">Limited</span>
          </div>
        );
      case "featured":
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
            <Star className="w-3 h-3 text-orange-500" />
            <span className="text-xs font-medium text-gray-800">Featured</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative group overflow-hidden bg-gray-50 h-64 w-full">
        {/* Main Link covering entire image area */}
        <Link
          href={`/product/${product?.slug?.current || product?._id || "#"}`}
          className="absolute inset-0 z-10 cursor-pointer"
        >
          <div className="w-full h-full flex items-center justify-center">
            {hasImages && imageUrl ? (
              <Image
                src={imageUrl}
                alt={product?.name || "Product Image"}
                width={500}
                height={500}
                priority
                className={`w-full h-64 object-contain transition-transform duration-500 
                  ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"></div>

        {/* Status Badge - positioned above the link */}
        <div className="absolute top-3 left-3 z-30 transform transition-all duration-300 group-hover:scale-110 pointer-events-none">
          {getStatusIcon()}
        </div>

        {/* Wishlist Button - positioned above the link with pointer events */}
        <div className="absolute top-3 right-3 z-30 transform transition-all duration-300 group-hover:scale-110">
          <ProductSideMenu product={product} />
        </div>

        {/* Discount Badge - positioned above the link */}
        {hasDiscount && (
          <div className="absolute bottom-3 left-3 z-30 pointer-events-none">
            <div className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
              -{product.discount}%
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category */}
        {product?.categories && (
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
            <p className="uppercase text-xs text-gray-500 font-medium tracking-wide">
              {product?.categories?.map((cat) => cat).join(", ")}
            </p>
          </div>
        )}

        {/* Product Name - Also clickable */}
        <Link
          href={`/product/${product?.slug?.current || product?._id || "#"}`}
        >
          <h3 className="text-base font-semibold text-black line-clamp-2 leading-tight hover:text-orange-500 transition-colors duration-200 cursor-pointer">
            {product?.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={14}
                key={index}
                className={index < 4 ? "text-orange-400" : "text-gray-300"}
                fill={index < 4 ? "#fb923c" : "#e5e7eb"}
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">5 Reviews</span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${product?.stock === 0 ? "bg-red-500" : "bg-green-500"}`}
            ></div>
            <span className="text-sm text-gray-600">
              {(product?.stock as number) > 0
                ? `${product?.stock} in stock`
                : "Out of stock"}
            </span>
          </div>
          {(product?.stock as number) > 0 &&
            (product?.stock as number) <= 5 && (
              <span className="text-xs text-orange-600 font-medium">
                Low Stock
              </span>
            )}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <PriceView
            className="text-base font-bold"
            price={product?.price}
            discount={product?.discount}
          />
        </div>

        {/* Action Buttons */}
        <div>
          <AddToCartButton product={product} className="w-36 rounded-full" />
        </div>
      </div>

      {/* Subtle Shadow Effect */}
      <div className="absolute inset-0 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;
