// Fixed Shop Component with useCallback
"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState, useCallback } from "react";
import Container from "./Container";
import { Title } from "./text";
import CategoryLists from "./shop/CategoryLists";
import BrandLists from "./shop/BrandLists";
import { useSearchParams } from "next/navigation";
import PriceList from "@/app/(client)/shop/PriceList";
import ProductTypeFilter from "./shop/ProductType";
import SortFilter from "./shop/SortFilter";
import { Button } from "./ui/button";
import { Filter, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

// Define the wrapped data structure type
type SanityResponse<T> = {
  data: T;
  sourceMap: unknown;
  tags: string[];
};

interface Props {
  categories: Category[] | SanityResponse<Category[]>;
  brands: BRANDS_QUERYResult | SanityResponse<BRANDS_QUERYResult>;
}

const Shop = ({ categories, brands }: Props) => {
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    categoryParams ? [categoryParams] : []
  );
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const categoriesArray = Array.isArray(categories)
    ? categories
    : (categories as SanityResponse<Category[]>).data || [];

  const brandsArray = Array.isArray(brands)
    ? brands
    : (brands as SanityResponse<BRANDS_QUERYResult>).data || [];

  const handleResetFilters = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedPrice(null);
    setSelectedProductTypes([]);
    setSelectedSizes([]);
    setSelectedSort("featured");
  };

  const activeFiltersCount =
    selectedCategory.length +
    selectedBrand.length +
    selectedProductTypes.length +
    selectedSizes.length +
    (selectedPrice ? 1 : 0);

  useEffect(() => {
    if (brandParams) {
      setSelectedBrand([brandParams]);
    }
  }, [brandParams]);

  useEffect(() => {
    if (categoryParams) {
      setSelectedCategory([categoryParams]);
    }
  }, [categoryParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }

      let query = `
        *[_type == 'product' 
          && price >= $minPrice 
          && price <= $maxPrice
      `;

      if (selectedCategory.length > 0) {
        query += ` && references(*[_type == "category" && slug.current in $selectedCategory]._id)`;
      }

      if (selectedBrand.length > 0) {
        query += ` && references(*[_type == "brand" && slug.current in $selectedBrand]._id)`;
      }

      if (selectedProductTypes.length > 0) {
        query += ` && productType in $selectedProductTypes`;
      }

      if (selectedSizes.length > 0) {
        query += ` && count((sizes[])[@ in $selectedSizes]) > 0`;
      }

      let orderClause = "";
      switch (selectedSort) {
        case "price_asc":
          orderClause = "| order(price asc)";
          break;
        case "price_desc":
          orderClause = "| order(price desc)";
          break;
        case "name_asc":
          orderClause = "| order(name asc)";
          break;
        case "name_desc":
          orderClause = "| order(name desc)";
          break;
        case "newest":
          orderClause = "| order(_createdAt desc)";
          break;
        case "featured":
          orderClause = '| order((status == "featured") desc, name asc)';
          break;
        case "best_selling":
          orderClause = "| order(salesCount desc)";
          break;
        case "most_reviewed":
          orderClause = "| order(reviewCount desc)";
          break;
        default:
          orderClause = "| order(name asc)";
          break;
      }

      query += `] ${orderClause} {
        ...,
        "categories": categories[]->title,
        "brand": brand->title
      }`;

      const data = await client.fetch(query, {
        selectedCategory,
        selectedBrand,
        selectedProductTypes,
        selectedSizes,
        minPrice,
        maxPrice,
      });

      setProducts(data || []);
    } catch (error) {
      console.log("Shop Products Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [
    selectedCategory,
    selectedBrand,
    selectedPrice,
    selectedProductTypes,
    selectedSizes,
    selectedSort,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Container className="py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <Title className="text-3xl font-light text-gray-900 mb-2">
              Discover
            </Title>
            <div className="hidden lg:flex items-center gap-4">
              <SortFilter
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
              {activeFiltersCount > 0 && (
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  className="text-gray-600 hover:text-red-600 hover:border-red-300 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reset All ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mt-4 flex items-center justify-between">
            <Button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              {isFiltersOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <SortFilter
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
              {activeFiltersCount > 0 && (
                <Button
                  onClick={handleResetFilters}
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div
            className={`lg:w-80 lg:flex-shrink-0 ${isFiltersOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="lg:sticky lg:top-8 space-y-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      onClick={handleResetFilters}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-red-600 text-sm"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                <CategoryLists
                  categories={categoriesArray}
                  selectedCategories={selectedCategory}
                  setSelectedCategories={setSelectedCategory}
                />
                <BrandLists
                  brands={brandsArray}
                  selectedBrands={selectedBrand}
                  setSelectedBrands={setSelectedBrand}
                />
                <div className="border-t border-gray-100">
                  <PriceList
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                  />
                </div>
                <div className="border-t border-gray-100">
                  <ProductTypeFilter
                    selectedProductTypes={selectedProductTypes}
                    setSelectedProductTypes={setSelectedProductTypes}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Products
                  </h3>
                  <div className="text-sm text-gray-500">
                    {products.length}{" "}
                    {products.length === 1 ? "product" : "products"} found
                  </div>
                </div>
              </div>

              <div className="pt-5 px-6 pb-6">
                {loading ? (
                  <div className="p-20 flex flex-col items-center justify-center bg-white">
                    <Loader2 className="w-10 h-10 text-gray-200 animate-spin" />
                    <p className="font-semibold tracking-wide">
                      Product is Loading..
                    </p>
                  </div>
                ) : products?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <NoProductAvailable className="bg-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
