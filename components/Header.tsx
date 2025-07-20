// Header.tsx (After setting up middleware)
import React from "react";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "@/components/SearchBar";
import CartIcon from "@/components/CartIcon";
import FavouriteButton from "@/components/FavouriteButton";
import SignIn from "@/components/SignIn";
import MobileMenu from "@/components/MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";

const Header = async () => {
  const user = await currentUser();
  console.log("User:", user);

  return (
    <header className="bg-white/70 sticky top-0 z-25 backdrop-blur-md border-gray-100 shadow-sm">
      {/* Premium top accent line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

      <Container className="py-6 flex items-center justify-between text-black">
        {/* Left Section */}
        <div className="flex items-center gap-4 w-auto md:w-1/3">
          <MobileMenu />
          <Logo />
        </div>

        {/* Center Navigation */}
        <HeaderMenu />

        {/* Right Section */}
        <div className="flex items-center justify-end gap-4 w-auto md:w-1/3">
          <SearchBar />
          <div className="flex items-center gap-3">
            <CartIcon />
            <FavouriteButton />
            <ClerkLoaded>
              <SignedIn>
                <div className="ml-2">
                  <UserButton />
                </div>
                <Link className="ml-2" href={"/orders"}>
                  <Logs />
                </Link>
              </SignedIn>
              <SignedOut>
                <SignIn />
              </SignedOut>
            </ClerkLoaded>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
