import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import { Title } from "@/components/text";
import { getCategories } from "@/sanity/queries";
import React from "react";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categoriesResult = await getCategories();
  const categories = categoriesResult.data || categoriesResult; // Handle both cases
  const { slug } = params;

  return (
    <div className="py-10">
      <Container>
        <Title>
          Products by Category:{" "}
          <span className="font-bold text-orange-400">{slug}</span>
        </Title>
        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
