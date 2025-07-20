"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-black mb-8">About Us</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Welcome to Sai Enterprises, your trusted destination for premium
            quality products across India. Since our inception, we have been
            dedicated to bringing you the finest selection of stationery, sports
            items, cosmetics, and gift items.
          </p>

          <div className="border-l-4 border-orange-500 pl-6 my-8">
            <p className="text-xl font-semibold text-black">
              Our mission is to provide exceptional products that enhance your
              daily life, delivered with unmatched service and care.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-black mt-12 mb-4">
            Our Story
          </h2>
          <p>
            Founded with a vision to make quality products accessible to
            everyone, Sai Enterprises has grown from a small venture to a
            trusted name in e-commerce. We believe in the power of great
            products to make life better, more beautiful, and more enjoyable.
          </p>

          <h2 className="text-2xl font-semibold text-black mt-12 mb-4">
            What Sets Us Apart
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">
                Quality Assurance
              </h3>
              <p className="text-sm">
                Every product is carefully selected and quality-checked before
                reaching you.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">
                Pan-India Delivery
              </h3>
              <p className="text-sm">
                We deliver to every corner of India with secure packaging and
                tracking.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">Customer First</h3>
              <p className="text-sm">
                Your satisfaction is our priority, with easy returns and
                responsive support.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-2">Diverse Range</h3>
              <p className="text-sm">
                From stationery to cosmetics, we offer products for every need.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => router.push("/")}
          className="mt-12 bg-black text-white hover:bg-gray-800"
        >
          Return to Homepage
        </Button>
      </main>
    </div>
  );
}
