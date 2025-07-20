import React from "react";
import { Title } from "./text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { HiOutlineGift, HiOutlinePhone } from "react-icons/hi2";
import { TbFlagFilled, TbLeaf } from "react-icons/tb";
import type { Brand } from "@/sanity.types"; // ✅ Import Brand type

const extrData = [
  {
    title: "24/7 Customer Support",
    subtitle: "We're always here to assist you",
    icon: <HiOutlinePhone size={24} />,
  },
  {
    title: "Made in India",
    subtitle: "Locally sourced & proudly crafted",
    icon: <TbFlagFilled size={24} />,
  },
  {
    title: "Gift Wrapping Available",
    subtitle: "Beautifully packed with your message",
    icon: <HiOutlineGift size={24} />,
  },
  {
    title: "Eco-Friendly Packaging",
    subtitle: "We care about sustainability",
    icon: <TbLeaf size={24} />,
  },
];

const ShopByBrands = async () => {
  const brands: Brand[] = await getAllBrands(); // ✅ Annotate response

  return (
    <div className="mb-10 lg:pb-20 bg-gray-100 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title className="text-2xl">Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-orange-400 hoverEffect"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((brand: Brand, index: number) => (
          <Link
            key={brand?.slug?.current || brand?._id || index}
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
            className="bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-md shadow-gray-200 hoverEffect"
            aria-label={`Shop ${brand?.title || "brand"} products`}
          >
            {brand?.image?.asset?._ref && (
              <Image
                src={urlFor(brand.image).url()}
                alt={`${brand?.title || "Brand"} logo`}
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
              />
            )}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm shadow-gray-300 py-5">
        {extrData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-gray-400 hover:text-orange-400"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-black font-bold capitalize">{item?.title}</p>
              <p className="text-gray-400">{item?.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
