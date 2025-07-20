import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavouriteButton from "@/components/FavouriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacterisitics"; // Corrected import
import { getProductBySlug } from "@/sanity/queries";
import {
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  RotateCcwIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const SingleProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  // Early return if product is not found
  if (!product) {
    return notFound();
  }

  return (
    <Container className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col md:flex-row gap-10 py-10">
        {/* Left Side - Product Images */}
        <div className="space-y-6">
          {product?.images && (
            <ImageView images={product.images} isStock={product.stock} />
          )}

          {/* Product Characteristics - Below Images */}
          <div>
            <ProductCharacteristics product={product} />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-8">
          {/* Product Header */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 text-xs uppercase tracking-widest rounded-full font-medium">
                  Premium Collection
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        size={14}
                        className="text-amber-400"
                        fill={"#fbbf24"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-light">
                    (120 reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="space-y-4 py-6 border-t border-gray-200">
              <PriceView
                price={product.price}
                discount={product.discount}
                className="text-2xl lg:text-3xl font-light text-gray-900"
              />

              <div className="flex items-center gap-4">
                <div
                  className={`px-4 py-2 inline-flex items-center gap-2 text-sm font-medium rounded-full ${
                    product.stock === 0
                      ? "bg-red-50 text-red-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.stock === 0 ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  />
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>

                {product.stock > 0 && (
                  <span className="text-sm text-gray-500 font-light">
                    {product.stock} pieces available
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <AddToCartButton
                  className="flex-1 bg-black text-white hover:bg-gray-800 py-4 px-8 rounded-full font-light tracking-wide transition-all duration-300 transform hover:scale-105"
                  product={product}
                />
                <FavouriteButton
                  showProduct={true}
                  product={product}
                  className="w-14 h-14 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-colors flex items-center justify-center"
                />
              </div>

              <button className="w-full py-4 px-8 border border-gray-200 rounded-full font-light tracking-wide hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                Add to Wishlist
              </button>
            </div>
          </div>

          {/* Premium Services - More Prominent */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-light text-gray-900 mb-6 tracking-wide">
              Premium Services
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                  <TruckIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Complimentary Delivery
                  </h4>
                  <p className="text-sm text-gray-600 font-light">
                    Free shipping on orders above \$50
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Lifetime Warranty
                  </h4>
                  <p className="text-sm text-gray-600 font-light">
                    Comprehensive coverage included
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <RotateCcwIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">30-Day Returns</h4>
                  <p className="text-sm text-gray-600 font-light">
                    Hassle-free return policy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Specifications Preview */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-6 lg:p-8 border border-gray-100">
            <h3 className="text-lg font-light text-gray-900 mb-6 tracking-wide">
              Quick Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  Category
                </span>
                <p className="font-light text-gray-900 mt-1 capitalize">
                  {product.subcategory || "Premium"}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  Type
                </span>
                <p className="font-light text-gray-900 mt-1 capitalize">
                  {product.productType?.replace(/_/g, " ") || "Luxury"}
                </p>
              </div>
              {product.weight && (
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                    Weight
                  </span>
                  <p className="font-light text-gray-900 mt-1">
                    {product.weight}g
                  </p>
                </div>
              )}
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                  Status
                </span>
                <p className="font-light text-gray-900 mt-1 capitalize">
                  {product.status || "Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
