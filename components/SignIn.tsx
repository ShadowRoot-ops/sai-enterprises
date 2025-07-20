import React from "react";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <Button className="text-sm font-semibold" variant="elevated">
        Login
      </Button>
    </SignInButton>
  );
};

export default SignIn;
