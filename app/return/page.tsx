"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function ReturnsExchangePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Logo />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-black mb-8">
          Returns & Exchange Policy
        </h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Return Window
            </h2>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <p className="text-lg font-semibold text-orange-800 mb-2">
                7-Day Return Policy
              </p>
              <p className="text-sm">
                You can return or exchange eligible items within 7 days of
                delivery. Items must be in original condition with tags and
                packaging intact.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Eligible Items for Return/Exchange
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  ✓ Returnable Items
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Unused stationery items</li>
                  <li>Unopened cosmetic products</li>
                  <li>Sports equipment in original packaging</li>
                  <li>Gift items (non-personalized)</li>
                  <li>Damaged or defective products</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">
                  ✗ Non-Returnable Items
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Used or opened cosmetics</li>
                  <li>Personalized stationery</li>
                  <li>Sports gear with wear signs</li>
                  <li>Engraved gift items</li>
                  <li>Items without original packaging</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Exchange Process
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="list-decimal pl-6 space-y-3">
                <li className="font-medium">
                  Contact Support
                  <p className="font-normal text-sm mt-1">
                    Email us at support@sai-enterprises.com with your order
                    details
                  </p>
                </li>
                <li className="font-medium">
                  Schedule Pickup
                  <p className="font-normal text-sm mt-1">
                    We&apso;ll arrange free pickup for exchanges within 2-3
                    business days
                  </p>
                </li>
                <li className="font-medium">
                  Quality Check
                  <p className="font-normal text-sm mt-1">
                    Items undergo quality inspection upon receipt at our
                    warehouse
                  </p>
                </li>
                <li className="font-medium">
                  New Item Dispatch
                  <p className="font-normal text-sm mt-1">
                    Replacement items are shipped within 24 hours of approval
                  </p>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Return Shipping
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">Defective/Wrong Items</span>
                <span className="text-blue-600 font-semibold">
                  FREE Return Shipping
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Change of Mind/Size</span>
                <span className="text-gray-600">
                  Customer bears return shipping cost
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Exchange vs Return
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold text-black mb-2">
                  Exchange Benefits
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Faster processing (3-5 days)</li>
                  <li>No refund delays</li>
                  <li>Free pickup & delivery</li>
                  <li>Priority support</li>
                </ul>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold text-black mb-2">
                  Return Process
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Full refund processing</li>
                  <li>5-10 business days</li>
                  <li>Money back to source</li>
                  <li>Order cancellation</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Important Notes
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Items must be returned in original condition with all
                  accessories
                </li>
                <li>Original invoice/receipt must be included with returns</li>
                <li>Exchanges are subject to product availability</li>
                <li>
                  Size exchanges available only for sports equipment and gifts
                </li>
                <li>Custom orders cannot be returned unless defective</li>
              </ul>
            </div>
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
