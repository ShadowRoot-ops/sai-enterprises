import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccess = ({
  details = "Log in to view your card items and checkout. Dont miss out your favourite products",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center flex-col gap-1">
          <Logo />
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-medium text-Dark-Gray/80">{details}</p>
          <SignInButton mode="modal">
            <Button
              className="bg-orange-400/80 text-white font-semibold shadow w-full hover:bg-orange-400 hoverEffect"
              size={"lg"}
            >
              Sign In
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 ">
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
          </div>
          <SignUpButton mode="modal">
            <Button variant={"outline"} className="w-full" size={"lg"}>
              Sign Up
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
