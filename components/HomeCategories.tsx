// Fixed HomeCategories Component
import React from "react";
import { Title } from "./text";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="bg-white border border-Dark-Gray/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-white p-5 flex items-center gap-3 group"
          >
            {category?.image && (
              <div className="overflow-hidden border border-black/25 hover:border-orange-400 hoverEffect w-20 h-20 p-1">
                <Link
                  href={{
                    pathname: "/shop",
                    query: { category: category.slug?.current },
                  }}
                >
                  <Image
                    src={urlFor(category.image).url()}
                    alt={category.title || "Category Image"}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-1">
              <h3 className="text-base font-semibold">{category.title}</h3>
              <p className="text-sm">
                <span className="font-bold text-Dark-Gray">{`(${category?.productCount ?? 0})`}</span>{" "}
                Items Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
