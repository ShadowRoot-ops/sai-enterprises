"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function RefundPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Logo />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-black mb-8">Refund Policy</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Refund Eligibility
            </h2>
            <p>
              At Sai Enterprises, we want you to be completely satisfied with
              your purchase. Refunds are available for eligible items within 7
              days of delivery, provided the items are in their original
              condition, unused, and with all original packaging.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Refund Processing Time
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">
                  Online Payments (UPI/Card/Wallet)
                </span>
                <span className="text-orange-500">3-5 business days</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Net Banking</span>
                <span className="text-orange-500">5-7 business days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Cash on Delivery</span>
                <span className="text-orange-500">7-10 business days</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Non-Refundable Items
            </h2>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalized or customized stationery items</li>
                <li>Used cosmetics or opened beauty products</li>
                <li>Sports equipment that shows signs of use</li>
                <li>Gift items that have been engraved or personalized</li>
                <li>Items damaged due to misuse or normal wear</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              How to Request a Refund
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Contact our customer support team at support@sai-enterprises.com
              </li>
              <li>Provide your order number and reason for refund</li>
              <li>
                Send clear photos of the product (if damaged or defective)
              </li>
              <li>Our team will review and approve eligible refund requests</li>
              <li>You&apos;ll receive a refund confirmation once processed</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Shipping Charges Refund
            </h2>
            <p>
              Shipping charges are refundable only in cases where the product
              received is damaged, defective, or significantly different from
              what was ordered. For voluntary returns, shipping charges are
              non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Partial Refunds
            </h2>
            <p>
              In certain cases, partial refunds may be offered for items that
              are returned in less than perfect condition, have been damaged
              during return shipping, or are missing parts for reasons not due
              to our error.
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
