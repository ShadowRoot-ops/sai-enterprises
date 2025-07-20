"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Container from "@/components/Container";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  orderNumber: string;
  // Add other fields as needed
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrder = useCallback(async () => {
    try {
      const query = `*[_type == "order" && _id == $orderId][0]`;
      const data = await client.fetch(query, { orderId });
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId, fetchOrder]);

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          {order && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="font-mono font-semibold">{order.orderNumber}</p>
            </div>
          )}
          <div className="space-y-4">
            <Link href="/orders">
              <Button className="w-full">View My Orders</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading order details...</p>
            </div>
          </div>
        </Container>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
