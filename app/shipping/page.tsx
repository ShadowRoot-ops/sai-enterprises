"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function ShippingPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Logo />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-black mb-8">Shipping Policy</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Shipping Coverage
            </h2>
            <p>
              We proudly deliver to all locations across India, ensuring our
              products reach every corner of the country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Delivery Timeframes
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Metro Cities</span>
                <span className="text-orange-500">3-5 business days</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Non-Metro Cities</span>
                <span className="text-orange-500">5-7 business days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Remote Areas</span>
                <span className="text-orange-500">7-10 business days</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Shipping Charges
            </h2>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <p className="text-lg font-semibold text-orange-800 mb-2">
                FREE SHIPPING on orders above ₹499!
              </p>
              <p className="text-sm">
                For orders below ₹499, a flat shipping charge of ₹49 applies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Order Processing
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders placed before 2 PM are processed the same day</li>
              <li>
                Orders placed after 2 PM are processed the next business day
              </li>
              <li>Orders are not processed on Sundays and public holidays</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Tracking Your Order
            </h2>
            <p>
              Once your order is shipped, you&#39;ll receive a tracking number
              via SMS and email. You can track your package using this number on
              our website or the courier partner&#39;s website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Delivery Partners
            </h2>
            <p>
              We work with trusted courier partners including Delhivery, Blue
              Dart, and India Post to ensure safe and timely delivery of your
              orders.
            </p>
          </section>
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
