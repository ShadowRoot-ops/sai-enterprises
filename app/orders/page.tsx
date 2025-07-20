import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Container from "@/components/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Package, FileText, ArrowLeft } from "lucide-react";

// Define the Order interface
interface Order {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  orderDate: string;
  status: string;
  paymentStatus: string;
  products: Array<{
    quantity: number;
    product: {
      name: string;
      price: number;
    };
  }>;
}

async function getOrders(userId: string): Promise<Order[]> {
  return await client.fetch(
    `*[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      _id,
      orderNumber,
      totalPrice,
      orderDate,
      status,
      paymentStatus,
      products[]{
        quantity,
        product-> { name, price }
      }
    }`,
    { userId }
  );
}

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const orders = await getOrders(userId);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Container className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              No Orders Yet
            </h1>
            <p className="text-gray-600 mb-8">
              You haven&apos;t placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-none font-light tracking-wide"
            >
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <Button
              asChild
              variant="ghost"
              className="mb-8 p-0 h-auto font-normal text-black hover:text-orange-500 hover:bg-transparent"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>

            <div className="mb-8">
              <h1 className="text-4xl font-light tracking-wide text-black mb-2">
                My Orders
              </h1>
              <div className="w-16 h-px bg-orange-500"></div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order: Order) => (
              <div
                key={order._id}
                className="border border-gray-100 hover:border-gray-200 transition-colors duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-light text-black mb-1">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(order.orderDate), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full ${
                          order.paymentStatus === "completed"
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full ${
                          order.status === "delivered"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      {order.products.length} item
                      {order.products.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <p className="text-xl font-light text-black mb-4 md:mb-0">
                      Total: ₹{order.totalPrice.toLocaleString()}
                    </p>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="border-gray-200 text-black hover:bg-gray-50 px-6 py-2 rounded-none font-light"
                      >
                        <Link href={`/orders/${order._id}`}>View Details</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-gray-200 text-black hover:bg-gray-50 px-6 py-2 rounded-none font-light"
                      >
                        <Link
                          href={`/api/invoice/${order._id}`}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Invoice
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
