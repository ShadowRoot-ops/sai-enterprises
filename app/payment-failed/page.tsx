"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Container from "@/components/Container";
import { XCircle, RefreshCw, Home, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  const errorMessage =
    searchParams.get("error") || "Payment could not be processed";
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/cart");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <XCircle className="w-20 h-20 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Payment Failed
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {errorMessage}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Details */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                What went wrong?
              </h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• The payment was cancelled or declined</li>
                <li>• There might be insufficient funds</li>
                <li>• Your bank may have blocked the transaction</li>
              </ul>
            </div>

            {/* Order ID if available */}
            {orderId && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-600">Reference ID</p>
                <p className="font-mono text-sm font-semibold">{orderId}</p>
              </div>
            )}

            {/* What to do next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                What can you do?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Check your payment details and try again</li>
                <li>• Try a different payment method</li>
                <li>• Contact your bank if the issue persists</li>
              </ul>
            </div>

            {/* Auto redirect notice */}
            <div className="text-center text-sm text-gray-500">
              Redirecting to cart in {countdown} seconds...
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/cart" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>

                <Link href="/cart">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Support */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="text-orange-600 hover:underline"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="min-h-screen flex items-center justify-center py-12">
            <Card className="max-w-md w-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Loading...
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </Container>
      }
    >
      <PaymentFailedContent />
    </Suspense>
  );
}
