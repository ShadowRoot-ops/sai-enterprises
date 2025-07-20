import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  MessageCircle,
  Share2,
  Star,
  Award,
  Package,
  Info,
  Heart,
} from "lucide-react";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  // Early return if no product or slug
  if (!product || !product.slug?.current) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm font-light">Product information unavailable</p>
        </div>
      </div>
    );
  }

  try {
    const brand = await getBrand(product.slug.current);

    return (
      <div className="space-y-6">
        {/* Brand & Quick Info */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {brand?.brandName || "Premium Brand"}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="text-sm text-gray-600 font-light">4.8</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 font-light">Availability</span>
              <div className="font-medium text-gray-900">
                {product.stock !== undefined ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block"></span>
                    {product.stock} in stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                    Available
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="text-gray-500 font-light">Type</span>
              <p className="font-medium text-gray-900 capitalize">
                {product.productType?.replace(/_/g, " ") || "Premium"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="group flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all duration-300">
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-light text-sm">Inquire</span>
          </button>
          <button className="group flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300">
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-light text-sm">Share</span>
          </button>
        </div>

        {/* Product Details Accordion */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="specifications"
              className="border-b border-gray-100"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-sm">
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-gray-600" />
                  Specifications
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Category
                    </span>
                    <span className="font-light text-sm">
                      {product.subcategory || "Premium"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Weight
                    </span>
                    <span className="font-light text-sm">
                      {product.weight ? `${product.weight}g` : "Standard"}
                    </span>
                  </div>
                  {product.dimensions && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Dimensions
                      </span>
                      <span className="font-light text-sm">
                        {product.dimensions.length &&
                          `${product.dimensions.length}cm`}
                        {product.dimensions.length &&
                          product.dimensions.width &&
                          " × "}
                        {product.dimensions.width &&
                          `${product.dimensions.width}cm`}
                        {(product.dimensions.length ||
                          product.dimensions.width) &&
                          product.dimensions.height &&
                          " × "}
                        {product.dimensions.height &&
                          `${product.dimensions.height}cm`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Featured
                    </span>
                    <span className="font-light text-sm">
                      {product.isFeatured ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="description"
              className="border-b border-gray-100"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-sm">
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-gray-600" />
                  Description
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed font-light text-sm">
                  {product.description ||
                    "Meticulously crafted with attention to detail, this premium piece embodies sophistication and timeless elegance. Each element has been carefully selected to deliver an exceptional experience."}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details" className="border-b border-gray-100">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-sm">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-gray-600" />
                  Details
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Collections
                    </span>
                    <p className="font-light text-sm mt-1">
                      {product.categories && product.categories.length > 0
                        ? `${product.categories.length} exclusive collections`
                        : "Signature collection"}
                    </p>
                  </div>

                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                        Attributes
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-50 text-xs rounded-full font-light hover:bg-gray-100 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reviews">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-sm">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-gray-600" />
                  Reviews
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-300" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Share Your Experience
                  </h4>
                  <p className="text-gray-600 font-light text-sm mb-6">
                    Be the first to review this piece
                  </p>
                  <button className="px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 font-light text-sm">
                    Write Review
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching brand:", error);
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-sm font-light">Unable to load product details</p>
        </div>
      </div>
    );
  }
};

export default ProductCharacteristics;
