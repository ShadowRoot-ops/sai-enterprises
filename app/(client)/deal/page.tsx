import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Title } from "@/components/text";
import { getDealProducts } from "@/sanity/queries";
import React from "react";
import { Product } from "@/sanity.types"; // Assuming 'Product' is the correct type for your Sanity product documents

const DealPage = async () => {
  // Explicitly type the products array to ensure type safety for its elements
  const products: Product[] | null = await getDealProducts();

  return (
    <div className="py-10 bg-gray-100">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {/* Ensure product is of type Product for ProductCard component */}
          {products?.map((product: Product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
