// app/layout.tsx  (the ONLY root layout)
import "../globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sai Enterprises",
  description: "Online stationery store by Sai Enterprises",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: "#000000", color: "#ffffff" },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
