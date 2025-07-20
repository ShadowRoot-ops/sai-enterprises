"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButton from "@/components/QuantityButton";
import PaymentModal from "@/components/PaymentModal";
import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash, CreditCard, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback, useRef } from "react";
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

// Order details types
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
  clerkUserId: string | undefined;
  customerName: string | null | undefined;
  email: string | undefined;
  products: ProductInOrder[];
  totalPrice: number;
  address: OrderAddressData;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();

  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentError, setPaymentError] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // Use ref to prevent recreation
  const hasFetchedRef = useRef(false);

  // Calculate values directly without useMemo
  const subtotal = getSubTotalPrice();
  const tax = subtotal * 0.1;
  const total = getTotalPrice() + tax;
  const totalItems = groupedItems.reduce(
    (total, item) => total + getItemCount(item.product?._id),
    0
  );

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (typeof window !== "undefined" && window.Razorpay) {
        setRazorpayLoaded(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) {
        const checkLoaded = () => {
          if (window.Razorpay) {
            setRazorpayLoaded(true);
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        toast.error("Failed to load payment system. Please refresh the page.");
      };

      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  // Fetch addresses without circular dependencies
  useEffect(() => {
    const fetchAddresses = async () => {
      // These internal checks for `loading` and `selectedAddress` are for flow control
      // within a single execution of the effect, not for triggering re-runs of the effect itself.
      // `hasFetchedRef.current` ensures it runs only once per isSignedIn change.
      if (!isSignedIn || loading || hasFetchedRef.current) return;

      hasFetchedRef.current = true;
      setLoading(true);

      try {
        const query = `*[_type=="address"] | order(_createdAt desc) {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          name,
          email,
          address,
          city,
          state,
          zip,
          default,
          createdAt
        }`;
        const data: Address[] = await client.fetch(query);

        setAddresses(data);

        if (data.length > 0 && !selectedAddress) {
          const defaultAddress = data.find((addr: Address) => addr.default);
          setSelectedAddress(defaultAddress || data[0]);
        }
      } catch (error) {
        console.error("Addresses fetching error:", error);
        toast.error("Failed to fetch addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]); // Only depend on isSignedIn for initial fetch

  const handleAddressChange = useCallback(
    (value: string) => {
      const address = addresses?.find((addr) => addr._id === value);
      if (address) {
        setSelectedAddress(address);
      }
    },
    [addresses]
  );

  const handleResetCart = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart has been reset successfully");
    }
  }, [resetCart]);

  const createRazorpayOrder = useCallback(async () => {
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      return data.order;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
      return null;
    }
  }, [total]);

  const verifyPayment = useCallback(
    async (response: RazorpaySuccessResponse, orderDetails: OrderDetails) => {
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
          resetCart();
          router.push(`/order-success?orderId=${verifyData.order._id}`);
        } else {
          throw new Error(verifyData.error || "Payment verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setPaymentError(
          "Payment verification failed. Please contact support if amount was deducted."
        );
        setShowPaymentModal(true);
      }
    },
    [resetCart, router]
  );

  const handleCheckOut = useCallback(async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!razorpayLoaded) {
      toast.error("Payment system is still loading. Please try again.");
      return;
    }

    setProcessingPayment(true);
    setPaymentError("");

    try {
      const order = await createRazorpayOrder();
      if (!order) {
        setProcessingPayment(false);
        return;
      }

      // selectedAddress is guaranteed to be non-null here due to the check above
      const orderDetails: OrderDetails = {
        clerkUserId: user?.id,
        customerName: user?.fullName || selectedAddress.name,
        email: user?.emailAddresses[0]?.emailAddress || selectedAddress.email,
        products: groupedItems.map((item) => ({
          product: { _ref: item.product._id, _type: "reference" },
          quantity: getItemCount(item.product._id),
        })),
        totalPrice: total,
        address: {
          name: selectedAddress.name!, // Assert as string
          address: selectedAddress.address!, // Assert as string
          city: selectedAddress.city!, // Assert as string
          state: selectedAddress.state!, // Assert as string
          zip: selectedAddress.zip!, // Assert as string
        },
      };

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Store Name",
        description: "Purchase from Your Store",
        order_id: order.id,
        handler: async function (response: RazorpaySuccessResponse) {
          await verifyPayment(response, orderDetails);
          setProcessingPayment(false);
        },
        prefill: {
          name: orderDetails.customerName || undefined,
          email: orderDetails.email || undefined,
          contact: user?.phoneNumbers?.[0]?.phoneNumber || undefined,
        },
        theme: {
          color: "#F97316",
        },
        modal: {
          ondismiss: function () {
            setPaymentError("Payment was cancelled. Your cart items are safe.");
            setShowPaymentModal(true);
            setProcessingPayment(false);
          },
          escape: false,
          backdropclose: false,
          confirm_close: true,
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response: RazorpayFailureResponse) {
          console.log("Payment failed:", response); // Log full response for debugging
          router.push(
            `/payment-failed?error=${encodeURIComponent(response.description)}&orderId=${order.id}` // Corrected property access
          );
          setProcessingPayment(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      setPaymentError("Something went wrong. Please try again.");
      setShowPaymentModal(true);
      setProcessingPayment(false);
    }
  }, [
    selectedAddress,
    razorpayLoaded,
    createRazorpayOrder,
    user,
    groupedItems,
    getItemCount,
    total,
    verifyPayment,
    router,
  ]);

  // Early return for non-signed in users
  if (!isSignedIn) {
    return <NoAccess />;
  }

  // Early return for empty cart
  if (!groupedItems?.length) {
    return (
      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-8">
            <EmptyCart />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Container>
        <div className="py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <Title className="text-2xl font-light text-black">
              Shopping Cart
            </Title>
            <span className="ml-auto text-sm text-gray-500 font-light">
              {totalItems} items
            </span>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                {groupedItems?.map((item, index) => {
                  const itemCount = getItemCount(item.product?._id);
                  return (
                    <div
                      key={item.product?._id}
                      className={`p-6 ${
                        index !== groupedItems.length - 1
                          ? "border-b border-gray-50"
                          : ""
                      } hover:bg-gray-50/50 transition-colors duration-200`}
                    >
                      <div className="flex items-start gap-6">
                        {/* Product Image */}
                        {item.product?.images && (
                          <Link
                            href={`/product/${item.product.slug?.current}`}
                            className="group shrink-0"
                          >
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                              <Image
                                src={urlFor(item?.product?.images[0]).url()}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </Link>
                        )}

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium text-black text-lg leading-tight line-clamp-2">
                                {item?.product?.name}
                              </h3>
                              <div className="flex flex-col gap-1 mt-2">
                                <p className="text-sm text-gray-500">
                                  Type:{" "}
                                  <span className="font-medium text-gray-700">
                                    {item?.product?.productType}
                                  </span>
                                </p>
                                <p className="text-sm text-gray-500">
                                  Status:{" "}
                                  <span className="font-medium text-gray-700">
                                    {item?.product?.status}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <PriceFormatter
                                amount={
                                  (item.product?.price as number) * itemCount
                                }
                                className="font-semibold text-lg text-black"
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                <PriceFormatter
                                  amount={item.product?.price as number}
                                  className="text-gray-500"
                                />{" "}
                                each
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <QuantityButton product={item.product} />

                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <ProductSideMenu
                                      product={item.product}
                                      className="relative top-0 right-0"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-medium">
                                    Add to Favourites
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      onClick={() => {
                                        deleteCartProduct(item.product?._id);
                                        toast.success(
                                          "Product removed from cart"
                                        );
                                      }}
                                      className="p-2 rounded-full hover:bg-red-50 transition-colors duration-200 group"
                                    >
                                      <Trash className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="font-medium bg-red-600">
                                    Remove Item
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Reset Cart Button */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                  <Button
                    onClick={handleResetCart}
                    variant="outline"
                    className="w-full md:w-auto border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors duration-200"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1 space-y-6">
              {/* Address Selection */}
              {addresses && addresses.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
                  <Card className="border-0 shadow-none">
                    <CardHeader>
                      <CardTitle>Delivery Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={selectedAddress?._id || ""}
                        onValueChange={handleAddressChange}
                      >
                        {addresses.map((address) => (
                          <div
                            key={address._id}
                            className={`flex items-center space-x-2 mb-4 cursor-pointer p-3 rounded-lg border transition-colors ${
                              selectedAddress?._id === address._id
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedAddress(address)}
                          >
                            <RadioGroupItem
                              value={address._id}
                              id={`address-${address._id}`}
                            />
                            <Label
                              htmlFor={`address-${address._id}`}
                              className="grid gap-1.5 flex-1 cursor-pointer"
                            >
                              <span className="font-semibold text-black">
                                {address.name}
                              </span>
                              <span className="text-sm text-gray-600">
                                {address.address}, {address.city},{" "}
                                {address.state} {address.zip}
                              </span>
                              {address.default && (
                                <span className="text-xs text-orange-600 font-medium">
                                  Default Address
                                </span>
                              )}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <Button variant="outline" className="w-full mt-4">
                        Add New Address
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* No addresses message */}
              {addresses && addresses.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-700">
                    No addresses found. Please add a delivery address.
                  </p>
                  <Button variant="outline" className="w-full mt-2">
                    Add Your First Address
                  </Button>
                </div>
              )}

              {/* Sticky Order Summary */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-medium text-black mb-6 pb-3 border-b border-gray-100">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <PriceFormatter
                      amount={subtotal}
                      className="font-medium text-black"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-orange-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (10%)</span>
                    <PriceFormatter
                      amount={tax}
                      className="font-medium text-black"
                    />
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-black">
                        Total
                      </span>
                      <PriceFormatter
                        amount={total}
                        className="text-xl font-semibold text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Selected Address Summary */}
                {selectedAddress && (
                  <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Delivering to:
                    </h4>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">
                        {selectedAddress.name}
                      </span>
                      <br />
                      {selectedAddress.address}, {selectedAddress.city},{" "}
                      {selectedAddress.state} {selectedAddress.zip}
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 h-auto rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  disabled={
                    loading ||
                    processingPayment ||
                    !selectedAddress ||
                    !razorpayLoaded
                  }
                  onClick={handleCheckOut}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {processingPayment
                    ? "Processing..."
                    : !razorpayLoaded
                      ? "Loading Payment..."
                      : "Proceed to Checkout"}
                </Button>

                {/* Payment Methods Info */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">
                    Available payment methods:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded">
                      UPI
                    </span>
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded">
                      Cards
                    </span>
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded">
                      Net Banking
                    </span>
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded">
                      Wallets
                    </span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout powered by Razorpay</span>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-black mb-3">
                    Order Benefits
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0"></span>
                      Free shipping on orders over ₹100
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0"></span>
                      30-day return policy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0"></span>
                      Secure payment processing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Payment Error Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onRetry={() => {
          setShowPaymentModal(false);
          handleCheckOut();
        }}
        error={paymentError}
      />
    </div>
  );
};

export default CartPage;
