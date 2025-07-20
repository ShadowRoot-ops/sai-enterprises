// app/orders/[orderId]/page.tsx
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Container from "@/components/Container";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, MapPin, Calendar, CreditCard } from "lucide-react";

type Props = { params: Promise<{ orderId: string }> };

export default async function OrderDetailPage({ params }: Props) {
  // 🔑 await params before using it
  const { orderId } = await params;

  const order = await client.fetch(
    `*[_type == "order" && _id == $id][0]{
      _id,
      orderNumber,
      totalPrice,
      orderDate,
      status,
      products[]{
        quantity,
        product-> { name, price }
      },
      address
    }`,
    { id: orderId }
  );

  if (!order) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <div className="mb-16">
            <Button
              asChild
              variant="ghost"
              className="mb-8 p-0 h-auto font-normal text-black hover:text-orange-500 hover:bg-transparent transition-colors duration-200"
            >
              <Link href="/orders" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Orders
              </Link>
            </Button>

            <div className="mb-8">
              <h1 className="text-4xl font-light tracking-wide text-black mb-2">
                Order #{order.orderNumber}
              </h1>
              <div className="w-16 h-px bg-orange-500"></div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-light uppercase tracking-wider mb-1">
                      Order Date
                    </p>
                    <p className="text-black font-light">
                      {format(new Date(order.orderDate), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-light uppercase tracking-wider mb-1">
                      Payment Status
                    </p>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full ${
                        order.status === "paid"
                          ? "bg-orange-50 text-orange-600 border border-orange-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-light uppercase tracking-wider mb-1">
                      Delivery Address
                    </p>
                    <div className="text-black font-light leading-relaxed">
                      <p>{order.address.address}</p>
                      <p>
                        {order.address.city}, {order.address.state}
                      </p>
                      <p>{order.address.zip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Package className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl font-light tracking-wide text-black">
                Order Items
              </h2>
            </div>

            <div className="border-t border-gray-100">
              {order.products.map(
                (
                  product: {
                    quantity: number;
                    product: { name: string; price: number };
                  },
                  idx: number
                ) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-6 border-b border-gray-50 last:border-b-0"
                  >
                    <div className="flex-1">
                      <h3 className="text-black font-light mb-1">
                        {product.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-light">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-black font-light">
                        ₹
                        {(
                          product.quantity * product.product.price
                        ).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        ₹{product.product.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Order Total */}
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-light text-black">Total Amount</h3>
                <p className="text-2xl font-light text-black">
                  ₹{order.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-none font-light tracking-wide transition-colors duration-200"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-gray-200 text-black hover:bg-gray-50 px-8 py-3 rounded-none font-light tracking-wide transition-colors duration-200"
            >
              <Link href="/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
