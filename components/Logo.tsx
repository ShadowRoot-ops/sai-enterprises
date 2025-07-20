import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
  showImage?: boolean;
  customImageSrc?: string;
  disableEffects?: boolean;
}

const Logo = ({
  className = "text-black",
  showImage = true,
  customImageSrc,
}: LogoProps) => {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 hover:scale-105 transition-transform duration-300"
    >
      {showImage && (
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-orange-200 transition-colors duration-300">
          <Image
            src={customImageSrc || "/sai_enter_logo.png"}
            alt="Sai Enterprises Logo"
            fill
            className="object-contain p-1"
            priority
          />
          {/* Subtle orange glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="flex flex-col">
        <h2 className={cn("text-xl font-bold tracking-tight", className)}>
          <span className="bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
            SAI ENTERPRISES
          </span>
        </h2>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
          <div className="w-2 h-0.5 bg-orange-300 rounded-full"></div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
