"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Container from "@/components/Container";
import FooterTop from "@/components/FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./text";
import {
  categoriesData,
  deliveryReturns,
  quickLinsData,
} from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID!,
        {
          subscriber_email: email,
          to_name: "Sai Enterprises",
          subscription_date: new Date().toLocaleDateString(),
          subscription_time: new Date().toLocaleTimeString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.status === 200) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      console.error("EmailJS error:", error);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <footer className="bg-gray-100 border-t">
      <Container>
        <FooterTop />

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Left section with Logo + Paragraph + Social */}
          <div className="space-y-6 col-span-1">
            {/* <Logo
              showImage={false}
              disableEffects={true}
              className="flex-nowrap items-center space-x-2"
            />

            <SubText className="leading-relaxed text-gray-600">
              From school kits to self-care, Sai Enterprises is your trusted
              destination for top-quality stationery, sports gear, thoughtful
              gifts, and everyday cosmetics. We bring together functionality,
              creativity, and celebration — all in one seamless shopping
              experience.
            </SubText> */}
            <SocialMedia
              className="text-black/60"
              iconClassName="border-darkColor/60 hover:border-black hover:text-orange-400"
              tooltipClassName="bg-orange-400"
            />
          </div>

          {/* Company Info */}
          <div>
            <SubTitle>Company Info</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinsData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-gray-600 hover:text-gray-500 hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="text-gray-600 hover:text-gray-500 hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery */}
          <div>
            <SubTitle>Delivery & Returns</SubTitle>
            <ul className="space-y-3 mt-4">
              {deliveryReturns?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-gray-600 hover:text-gray-500 hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <SubTitle>Let&apos;s get in touch</SubTitle>
            <SubText className="text-gray-600">
              Sign up for our newsletter and receive 10% off your first order
            </SubText>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
              <Input
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="focus:border-orange-500"
              />
              <Button
                type="submit"
                disabled={status === "loading" || !email}
                className="hover:text-orange-400 w-full"
                variant={"elevated"}
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                  <p className="text-green-800 text-xs text-center">
                    ✓ Successfully subscribed to our newsletter!
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <p className="text-red-800 text-xs text-center">
                    ✗ Failed to subscribe. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600 flex items-center justify-center gap-1 flex-wrap">
          <span>&copy; {new Date().getFullYear()}</span>
          <Logo disableEffects={true} className="text-sm" />
          <span>. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
