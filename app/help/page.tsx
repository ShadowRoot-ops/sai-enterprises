"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
          to_name: "Sai Enterprises Support",
          subject: "Help Center Inquiry",
          phone_number: "Not provided",
        }
      );

      if (result.status === 200) {
        setStatus("success");
        setFormData({ from_name: "", from_email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error: unknown) {
      // Changed 'any' to 'unknown'
      setStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
      console.error("EmailJS error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-6 py-12 text-black">
      <Logo />
      <h1 className="mt-8 text-4xl font-bold">Help Center</h1>
      <p className="mt-4 max-w-2xl text-center text-gray-700 leading-relaxed">
        Welcome to our Help Center. Find quick answers to common questions or
        get in touch with our support team for personalized assistance.
      </p>

      {/* Quick Help Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-500">
            Order Support
          </h2>
          <p className="text-gray-700 mb-4">
            Track orders, manage returns, or report issues with your purchases.
          </p>
          <Button
            onClick={() => router.push("/contact")}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Get Order Help
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-500">
            Account Assistance
          </h2>
          <p className="text-gray-700 mb-4">
            Reset password, update profile information, or manage addresses.
          </p>
          <Button
            onClick={() => router.push("/contact")}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Account Support
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-500">
            Product Information
          </h2>
          <p className="text-gray-700 mb-4">
            Learn about product features, availability, or request
            recommendations.
          </p>
          <Button
            onClick={() => router.push("/faqs")}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Product FAQs
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-orange-500">
            Payment & Refunds
          </h2>
          <p className="text-gray-700 mb-4">
            Payment failures, refund status, or billing inquiries.
          </p>
          <Button
            onClick={() => router.push("/contact")}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Payment Help
          </Button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-10 w-full max-w-2xl">
        <div className="bg-black text-white p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Still need help? Send us a message
          </h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="from_name"
                className="block text-sm font-medium mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:border-orange-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="from_email"
                className="block text-sm font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:border-orange-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:border-orange-500 focus:outline-none resize-none"
                placeholder="Please describe your issue or question..."
              />
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
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
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>

            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500 rounded-lg p-3 text-center">
                <p className="text-green-400">
                  ✓ Message sent successfully! We&apos;ll get back to you within
                  24 hours.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-center">
                <p className="text-red-400">✗ {errorMessage}</p>
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-300 mb-4">
              Our support team is available Mon-Sat, 9 AM - 7 PM IST
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "tel:+911234567890")}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                📞 Call +91 12345 67890
              </Button>
              <Button
                onClick={() =>
                  (window.location.href = "mailto:support@saienterprises.in")
                }
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                ✉️ Email Directly
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => router.push("/")}
        className="mt-8 bg-black text-white hover:bg-gray-800"
      >
        Return to Homepage
      </Button>
    </main>
  );
}
