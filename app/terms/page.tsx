"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-black mb-8">
          Terms & Conditions
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 mb-6">Last updated: January 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By accessing and using the Sai Enterprises website, you accept
                and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                2. Use of Website
              </h2>
              <p className="text-gray-700">
                You may use our website for lawful purposes only. You agree not
                to use the website for any fraudulent or harmful activities, or
                in any way that violates any applicable laws or regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                3. Product Information
              </h2>
              <p className="text-gray-700">
                We strive to provide accurate product descriptions and images.
                However, we do not warrant that product descriptions or other
                content is accurate, complete, reliable, current, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                4. Pricing and Payment
              </h2>
              <p className="text-gray-700">
                All prices are listed in Indian Rupees (INR) and are subject to
                change without notice. We reserve the right to refuse or cancel
                any orders placed for products listed at an incorrect price.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                5. Shipping and Delivery
              </h2>
              <p className="text-gray-700">
                We deliver products across India. Delivery times may vary based
                on location and product availability. We are not responsible for
                delays caused by shipping carriers or unforeseen circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                6. Returns and Refunds
              </h2>
              <p className="text-gray-700">
                Our return and refund policy is designed to ensure customer
                satisfaction. Please refer to our detailed return policy for
                specific conditions and procedures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content on this website, including text, graphics, logos,
                and images, is the property of Sai Enterprises and is protected
                by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                8. Contact Information
              </h2>
              <p className="text-gray-700">
                For any questions regarding these terms and conditions, please
                contact us at support@saienterprises.com.
              </p>
            </section>
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
