import { sanityFetch } from "../lib/live";
import { Category } from "@/sanity.types";
import {
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
} from "./query";

// Define the return type for categories with product count
type CategoryWithProductCount = Category & {
  productCount: number;
};

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;

    const result = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });

    return result;
  } catch (error) {
    console.log("Error fetching the data", error);
    // Return the same structure as sanityFetch but with empty data
    return {
      data: [] as CategoryWithProductCount[],
      sourceMap: null,
      tags: [],
    };
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// Fixed getBrand function
const getBrand = async (slug: string) => {
  try {
    const result = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });

    // Since BRAND_QUERY now returns a single object, not an array
    return result?.data || null;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
};
const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching deal Products:", error);
    return [];
  }
};

export {
  getCategories,
  getAllBrands,
  getProductBySlug,
  getBrand,
  getDealProducts,
};
