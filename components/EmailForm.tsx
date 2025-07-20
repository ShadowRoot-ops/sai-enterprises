"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

interface EmailFormProps {
  formTitle?: string;
  successMessage?: string;
}

const EmailForm = ({
  formTitle = "Send us a message",
  successMessage = "Your message has been sent!",
}: EmailFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      // Reset success status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-xl">
      <h3 className="text-2xl font-semibold mb-6 text-center">{formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
            placeholder="Please describe your issue or question..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full ${status === "sending" ? "bg-orange-400" : "bg-orange-500"} text-white font-medium py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-70`}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && (
          <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}
        {status === "error" && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">
            Failed to send. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
};

export default EmailForm;
