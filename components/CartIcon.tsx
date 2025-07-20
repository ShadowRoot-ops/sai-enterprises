"use client";
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { items } = useStore();
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-orange-400 hoverEffect cursor-pointer" />
      <span className="absolute -top-1 -right-1 bg-orange-400 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
