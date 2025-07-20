"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function FaqsPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-6 py-12 text-black">
      <Logo />
      <h1 className="mt-8 text-4xl font-bold">Frequently Asked Questions</h1>

      <div className="mt-8 max-w-3xl w-full space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            What are your delivery charges?
          </h3>
          <p className="text-gray-700">
            Free delivery on orders above ₹499. For orders below ₹499, we charge
            ₹49 for standard delivery. Express delivery available at ₹99 for all
            orders.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            How long does delivery take?
          </h3>
          <p className="text-gray-700">
            Standard delivery takes 5-7 business days. Express delivery reaches
            you within 2-3 business days. Metro cities usually receive orders
            faster.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            What is your return policy?
          </h3>
          <p className="text-gray-700">
            Returns accepted within 7 days of delivery. Items must be unused,
            unopened, and in original packaging. Cosmetics and personal care
            items are non-returnable for hygiene reasons.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            Which payment methods do you accept?
          </h3>
          <p className="text-gray-700">
            We accept credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net
            banking, wallets, and cash on delivery (COD) for orders up to
            ₹5,000.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            Do you ship internationally?
          </h3>
          <p className="text-gray-700">
            Currently, we only deliver within India. We&apos;re working on
            expanding internationally and will update our customers when this
            service becomes available.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            How can I track my order?
          </h3>
          <p className="text-gray-700">
            Once your order ships, you&apos;ll receive tracking details via SMS
            and email. You can also track your order by logging into your
            account on our website.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">
            Are your products genuine?
          </h3>
          <p className="text-gray-700">
            Yes, we source all products directly from authorized distributors
            and brands. Every product comes with manufacturer warranty where
            applicable.
          </p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold mb-2">Can I cancel my order?</h3>
          <p className="text-gray-700">
            Orders can be cancelled within 24 hours of placement. Once shipped,
            cancellation is not possible, but you can initiate a return after
            delivery.
          </p>
        </div>
      </div>

      <Button
        onClick={() => router.push("/")}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white"
      >
        Return to homepage
      </Button>
    </main>
  );
}
