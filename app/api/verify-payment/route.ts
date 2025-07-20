import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { client } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Verification request body:", body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("Missing payment details:", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      return NextResponse.json(
        { success: false, error: "Missing payment details" },
        { status: 400 }
      );
    }

    // Get the secret key
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("RAZORPAY_KEY_SECRET not found in environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create the signature
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    console.log("Generated signature:", digest);
    console.log("Received signature:", razorpay_signature);
    console.log("Signatures match:", digest === razorpay_signature);

    if (digest !== razorpay_signature) {
      console.error("Signature verification failed");
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed",
          details: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    // Signature is valid, create order in Sanity
    console.log("Creating order in Sanity...");

    const sanityOrder = {
      _type: "order",
      orderNumber: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      clerkUserId: orderDetails.clerkUserId,
      customerName: orderDetails.customerName,
      email: orderDetails.email,
      products: orderDetails.products,
      totalPrice: orderDetails.totalPrice,
      currency: "INR",
      address: orderDetails.address,
      status: "paid",
      paymentMethod: "razorpay",
      paymentStatus: "completed",
      orderDate: new Date().toISOString(),
    };

    const result = await client.create(sanityOrder);
    console.log("Order created successfully:", result._id);

    return NextResponse.json({
      success: true,
      order: result,
    });
  } catch (error: unknown) {
    console.error("Error in verify-payment API:", error);

    const errorMessage = "Payment verification failed"; // Changed 'let' to 'const'
    let errorDetails: string | undefined;

    if (error instanceof Error) {
      errorDetails = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      errorDetails = (error as { message: string }).message;
    } else {
      errorDetails = String(error);
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
