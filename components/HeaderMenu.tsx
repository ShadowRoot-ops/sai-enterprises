"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="hidden md:flex items-center justify-center w-1/3">
      <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full">
        {headerData?.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`
              relative px-6 py-3 text-sm font-medium capitalize
              rounded-full transition-all duration-300 ease-out
              hover:bg-white hover:shadow-lg hover:-translate-y-0.5
              ${
                pathname === item.href
                  ? "bg-white text-black shadow-lg border border-gray-200"
                  : "text-gray-600 hover:text-black"
              }
            `}
          >
            {item.title}
            {/* Active indicator */}
            {pathname === item.href && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></div>
            )}
            {/* Hover orange accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default HeaderMenu;
