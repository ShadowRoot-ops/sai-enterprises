"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Razorpay type declarations
interface RazorpayInstance {
  open: () => void;
  on: (
    event: string,
    callback: (response: RazorpayFailureResponse) => void
  ) => void;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
    confirm_close?: boolean;
  };
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id: string;
  };
}

// Order details types (re-used from previous context, modified for this component's needs)
interface ProductInOrder {
  product: {
    _ref: string;
    _type: "reference";
  };
  quantity: number;
}

interface OrderAddressData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface OrderDetails {
  customerName?: string | null;
  email?: string;
  phone?: string;
  products: ProductInOrder[];
  totalPrice: number;
  address: OrderAddressData;
  clerkUserId?: string; // Optional if not always provided in this specific context
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  orderDetails: OrderDetails;
  onSuccess?: () => void;
  onFailure?: () => void;
}

export default function RazorpayCheckout({
  amount,
  orderDetails,
  onSuccess,
  onFailure,
}: RazorpayCheckoutProps) {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async () => {
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to create order");
      }

      return data.order;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
      return null;
    }
  };

  const handlePayment = async () => {
    const order = await createOrder();
    if (!order) return;

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your Store Name",
      description: "Purchase from Your Store",
      order_id: order.id,
      handler: async function (response: RazorpaySuccessResponse) {
        try {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            toast.success("Payment successful!");
            onSuccess?.();
            router.push(`/order-success?orderId=${verifyData.order._id}`);
          } else {
            throw new Error("Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Payment verification failed");
          onFailure?.();
        }
      },
      prefill: {
        name: orderDetails.customerName || undefined,
        email: orderDetails.email || undefined,
        contact: orderDetails.phone || undefined,
      },
      theme: {
        color: "#F97316", // Orange color to match your theme
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
          onFailure?.();
        },
      },
    };

    if (typeof window !== "undefined" && window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      toast.error("Razorpay script not loaded.");
    }
  };

  return { handlePayment };
}
