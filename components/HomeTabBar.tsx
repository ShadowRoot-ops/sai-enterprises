import { categoriesData } from "@/constants/data";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        {categoriesData?.map((item) => (
          <Button
            variant={"elevated"}
            key={item?.title}
            onClick={() => onTabSelect(item?.title)}
            className={`border border-orange-400/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:text-black hover:border-orange-400  hoverEffect ${selectedTab === item?.title ? "bg-orange-500 text-white border-orange-400" : "bg-orange-400/20"}`}
          >
            {item?.title}
          </Button>
        ))}
      </div>
      <Button
        variant={"elevated"}
        className={`border border-amber-500/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:text-orange-400 hover:border-orange-400 hoverEffect`}
      >
        <Link href={"/shop"}>See all</Link>
      </Button>
    </div>
  );
};

export default HomeTabBar;
