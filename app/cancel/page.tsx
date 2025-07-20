"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function CancellationPolicyPage() {
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
          Cancellation Policy
        </h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Order Cancellation Window
            </h2>
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <p className="text-lg font-semibold text-green-800 mb-2">
                FREE Cancellation within 24 hours
              </p>
              <p className="text-sm">
                You can cancel your order free of charge within 24 hours of
                placing it, provided the order hasn&apos;t been processed or
                shipped yet.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Cancellation Timeline
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="font-medium">Order Placed</span>
                  <p className="text-sm text-gray-600">Within 2 hours</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  100% Refund
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="font-medium">Order Processing</span>
                  <p className="text-sm text-gray-600">2-24 hours</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  95% Refund
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="font-medium">Order Shipped</span>
                  <p className="text-sm text-gray-600">After 24 hours</p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  No Cancellation
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Out for Delivery</span>
                  <p className="text-sm text-gray-600">Final stage</p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  Return Only
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              How to Cancel Your Order
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold text-black mb-3">
                  🌐 Online Method
                </h3>
                <ol className="list-decimal pl-4 space-y-2 text-sm">
                  <li>Login to your Sai Enterprises account</li>
                  <li>Go to &quot;My Orders&quot; section</li>
                  <li>Find the order you want to cancel</li>
                  <li>Click &quot;Cancel Order&quot; button</li>
                  <li>Select cancellation reason</li>
                  <li>Confirm cancellation</li>
                </ol>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold text-black mb-3">
                  📞 Contact Support
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    support@sai-enterprises.com
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> +91-XXXX-XXXXXX
                  </div>
                  <div>
                    <span className="font-medium">WhatsApp:</span>{" "}
                    +91-XXXX-XXXXXX
                  </div>
                  <div>
                    <span className="font-medium">Hours:</span> 9 AM - 8 PM
                    (Mon-Sat)
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Non-Cancellable Orders
            </h2>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-3">
                Orders that cannot be cancelled:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalized or customized stationery items</li>
                <li>Made-to-order sports equipment</li>
                <li>Engraved or custom printed gifts</li>
                <li>Bulk orders (above ₹10,000)</li>
                <li>Orders already shipped from warehouse</li>
                <li>Special promotional or flash sale items</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Refund Processing After Cancellation
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">
                  Online Payment (UPI/Card/Wallet)
                </span>
                <span className="text-blue-600 font-semibold">
                  2-4 business days
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">Net Banking</span>
                <span className="text-blue-600 font-semibold">
                  3-5 business days
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">Cash on Delivery</span>
                <span className="text-blue-600 font-semibold">
                  Not applicable
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Cancellation Charges
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Free cancellation:</span> Within
                  2 hours of order placement
                </li>
                <li>
                  <span className="font-medium">5% processing fee:</span>{" "}
                  Between 2-24 hours (minimum ₹25)
                </li>
                <li>
                  <span className="font-medium">No refund:</span> After order
                  has been shipped
                </li>
                <li>
                  <span className="font-medium">Custom orders:</span> 25%
                  cancellation fee (if cancelled within 24 hours)
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Important Information
            </h2>
            <p>
              Please note that once an order is shipped from our warehouse, it
              cannot be cancelled. However, you can still return the item after
              delivery following our Returns & Exchange policy. For any queries
              regarding order cancellation, feel free to contact our customer
              support team.
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
