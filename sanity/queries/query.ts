import { defineQuery } from "next-sanity";
import { client } from "../lib/client";
import { Category } from "@/sanity.types";

const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(title asc)`);

const getCategories = async (): Promise<Category[]> => {
  const result = await client.fetch(
    `*[_type == "category"] | order(title asc)`,
    {},
    {
      next: { revalidate: 60 }, // Optional: add caching
    }
  );

  // Return just the data, not the full Sanity result object
  return result.data || result;
};

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
);

// Fixed BRAND_QUERY - this should return a single object, not an array
const BRAND_QUERY =
  defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  "brandName": brand->title
}`);
const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,"categories": categories[]->title
  }`
);

export {
  BRANDS_QUERY,
  getCategories,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  DEAL_PRODUCTS,
};
