"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { banner_1, banner_2, banner_3, banner_4, banner_5 } from "@/images";

const bannerImages = [banner_1, banner_2, banner_3, banner_4, banner_5];

// Define the particle type
interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

const HomeBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Generate particles only on client side to avoid hydration mismatch
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.02),transparent_50%)]"></div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-orange-200/40 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 items-center gap-12">
        {/* Enhanced Text Content */}
        <div
          className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Premium Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-orange-200/60 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-800">
              Premium Collection
            </span>
          </div> */}

          {/* Luxury Heading */}
          <h1 className="text-4xl md:text-6xl font-light text-black leading-tight">
            <span className="block font-light">Refined</span>
            <span className="block mt-2 font-bold text-orange-600">
              Stationery
            </span>
            <span className="block mt-2 text-2xl md:text-3xl text-gray-800 font-light">
              for Modern{" "}
              <span className="font-semibold text-orange-500">Desks</span>
            </span>
          </h1>

          {/* Elegant Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Discover meticulously crafted stationery that transforms ordinary
            moments into extraordinary experiences. Where sophistication meets
            functionality.
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span>Explore Collection</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
            <div className="text-center">
              {/* <div className="text-2xl font-bold text-black">50K+</div>
              <div className="text-sm text-gray-500">Happy Customers</div> */}
            </div>
            <div className="text-center">
              {/* <div className="text-2xl font-bold text-black">Premium</div> */}
              <div className="text-sm text-gray-500">Quality Assured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>
          </div>
        </div>

        {/* Compact Slider Section */}
        <div
          className={`relative transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Clean White Container */}
          <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-100">
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-20"></div>

            {bannerImages.map((image, index) => (
              <div key={index} className="absolute inset-0">
                <Image
                  src={image}
                  alt={`Premium Banner ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-1000 ${
                    current === index
                      ? "opacity-100 z-10 scale-100"
                      : "opacity-0 z-0 scale-105"
                  }`}
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Minimalist Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`relative transition-all duration-300 ${
                    current === index
                      ? "w-8 h-2 bg-orange-500 rounded-full"
                      : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                  }`}
                >
                  {current === index && (
                    <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-50"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Clean Navigation Arrows */}
            <button
              onClick={() =>
                setCurrent(
                  (prev) =>
                    (prev - 1 + bannerImages.length) % bannerImages.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-black hover:bg-white hover:shadow-lg transition-all duration-300 z-30 group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrent((prev) => (prev + 1) % bannerImages.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-black hover:bg-white hover:shadow-lg transition-all duration-300 z-30 group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Elegant Orange Accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full opacity-80 animate-pulse z-30"></div>
          </div>

          {/* Subtle Floating Elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm font-light">Scroll to explore</span>
          <div className="w-5 h-8 border border-gray-300 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-orange-500 rounded-full animate-bounce mt-1"></div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default HomeBanner;
