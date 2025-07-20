"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <div
        className={`
        flex items-center gap-2 px-4 py-2.5 
        bg-gray-50 border border-gray-200 rounded-full
        transition-all duration-300 ease-out
        ${isFocused ? "bg-white border-orange-200 shadow-lg" : "hover:bg-white hover:border-gray-300"}
      `}
      >
        <Search
          className={`w-4 h-4 transition-colors duration-300 ${
            isFocused ? "text-orange-500" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent border-none outline-none text-sm text-black placeholder-gray-400 w-32 md:w-48"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
