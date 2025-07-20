"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-6 py-12 text-black">
      <Logo />
      <h1 className="mt-8 text-4xl font-bold">Privacy Policy</h1>
      <article className="mt-6 max-w-3xl space-y-6 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
            Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect personal information you provide directly, including
            name, email, phone number, shipping address, and payment details. We
            also automatically collect device information, IP address, and
            browsing behavior on our site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
            How We Use Your Data
          </h2>
          <p className="text-gray-700">
            Your information helps us process orders, communicate about
            purchases, personalize your shopping experience, prevent fraud, and
            improve our services. We never sell your personal data to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
            Data Security
          </h2>
          <p className="text-gray-700">
            We implement SSL encryption, secure payment gateways, regular
            security audits, and restricted access controls. Your payment
            information is tokenized and never stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
            Your Rights
          </h2>
          <p className="text-gray-700">
            You can request access to your data, update incorrect information,
            delete your account, or opt out of marketing communications at any
            time by contacting support@saienterprises.in
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
            Cookies
          </h2>
          <p className="text-gray-700">
            We use essential cookies for site functionality and analytical
            cookies to understand user behavior. You can manage cookie
            preferences through your browser settings.
          </p>
        </section>
      </article>
      <Button
        onClick={() => router.push("/")}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white"
      >
        Return to homepage
      </Button>
    </main>
  );
}
