// ProductGrid.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import HomeTabBar from "./HomeTabBar";
import { categoriesData } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    categoriesData[0]?.title || ""
  );

  // Normalize the selected tab for query consistency
  const normalizedTab =
    selectedTab.toLowerCase() === "all"
      ? "all"
      : selectedTab.charAt(0).toUpperCase() +
        selectedTab.slice(1).toLowerCase();

  // Dynamically generate the query based on the selected tab
  const query = useMemo(() => {
    if (normalizedTab === "all") {
      return `*[_type == "product"] | order(_createdAt desc){
        _id,
        name,
        price,
        discount,
        status,
        stock,
        "categories": categories[]->title,
        images,
        "imageUrl": images[0].asset->url,
        productType,
        slug
      }`;
    } else {
      return `*[_type == "product" && $categoryTitle in categories[]->title] | order(_createdAt desc){
        _id,
        name,
        price,
        discount,
        status,
        stock,
        "categories": categories[]->title,
        images,
        "imageUrl": images[0].asset->url,
        productType,
        slug
      }`;
    }
  }, [normalizedTab]); // Dependency: normalizedTab

  // Generate query parameters based on the selected tab
  const params = useMemo(() => {
    return normalizedTab === "all" ? {} : { categoryTitle: normalizedTab };
  }, [normalizedTab]); // Dependency: normalizedTab

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        console.log("Fetched products:", response); // Debug log
        setProducts(response);
      } catch (error) {
        console.error("Product fetching Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab, query, params]); // Fixed: Added missing dependencies

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
          <div className="space-x-2 flex items-center text-orange-400">
            <Loader2 className="w-5 h-6 animate-spin" />
            <span>Products are loading...</span>
          </div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          {products?.map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
