import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { format } from "date-fns";

type Props = {
  params: Promise<{ orderId: string }>;
};

// Define interfaces for better type safety
interface ProductItemInOrder {
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

interface OrderAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface OrderDetailsForInvoice {
  _id: string;
  orderNumber: string;
  invoiceNumber?: string; // Optional initially, will be generated if missing
  customerName: string;
  email: string;
  totalPrice: number;
  currency: string;
  amountDiscount?: number; // Optional as it might not always be present
  orderDate: string; // Sanity usually returns date strings
  paymentMethod: string;
  paymentStatus: string;
  address: OrderAddress;
  products: ProductItemInOrder[];
  // These are added programmatically before passing to generateInvoiceHTML
  subtotal?: number;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { orderId } = await params;

    // Fetch order details
    const order: OrderDetailsForInvoice | null = await client.fetch(
      `*[_type == "order" && _id == $orderId][0]{
        _id,
        orderNumber,
        invoiceNumber,
        customerName,
        email,
        totalPrice,
        currency,
        amountDiscount,
        orderDate,
        paymentMethod,
        paymentStatus,
        address,
        products[]{
          quantity,
          product-> {
            name,
            price
          }
        }
      }`,
      { orderId }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Generate invoice number if not exists
    let invoiceNumber = order.invoiceNumber;
    if (!invoiceNumber) {
      invoiceNumber = `INV-${order.orderNumber}-${Date.now()}`;
      // Update the order with invoice number
      await client.patch(orderId).set({ invoiceNumber }).commit();
    }

    // Calculate subtotal
    const subtotal = order.products.reduce(
      (sum: number, item: ProductItemInOrder) =>
        sum + item.quantity * item.product.price,
      0
    );

    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML({
      ...order,
      invoiceNumber,
      subtotal,
    } as OrderDetailsForInvoice); // Assert the type after adding properties

    return new NextResponse(invoiceHTML, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="invoice-${order.orderNumber}.html"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}

function generateInvoiceHTML(order: OrderDetailsForInvoice) {
  const formattedDate = format(new Date(order.orderDate), "MMMM d, yyyy");
  const discount = order.amountDiscount || 0;
  const subtotal = order.subtotal || 0; // Ensure subtotal is defined

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice - ${order.invoiceNumber}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; }
        .invoice-container { max-width: 800px; margin: 20px auto; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: #f97316; color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 28px; font-weight: 300; margin-bottom: 10px; }
        .header p { opacity: 0.9; }
        .invoice-details { padding: 30px; border-bottom: 2px solid #f1f5f9; }
        .invoice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .invoice-info h3 { color: #f97316; margin-bottom: 15px; font-size: 18px; font-weight: 500; }
        .invoice-info p { margin-bottom: 5px; color: #64748b; }
        .invoice-info strong { color: #1e293b; }
        .items-section { padding: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .items-table th { background: #f8fafc; color: #475569; font-weight: 500; padding: 15px; text-align: left; border-bottom: 2px solid #e2e8f0; }
        .items-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; }
        .items-table tr:hover { background: #f8fafc; }
        .totals { margin-top: 30px; border-top: 2px solid #f1f5f9; padding-top: 20px; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .total-row.final { font-size: 20px; font-weight: 600; color: #f97316; border-top: 2px solid #f1f5f9; padding-top: 15px; margin-top: 15px; }
        .footer { background: #f8fafc; padding: 20px 30px; text-align: center; color: #64748b; font-size: 14px; }
        .status-badge { display: inline-block; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; text-transform: uppercase; }
        .status-completed { background: #dcfce7; color: #166534; }
        .status-pending { background: #fef3c7; color: #92400e; }
        @media print {
            body { background: white; }
            .invoice-container { box-shadow: none; margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <h1>SAI ENTERPRISES</h1>
            <p>Thank you for your business</p>
        </div>

        <div class="invoice-details">
            <div class="invoice-grid">
                <div class="invoice-info">
                    <h3>Invoice Details</h3>
                    <p><strong>Invoice Number:</strong> ${order.invoiceNumber}</p>
                    <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                    <p><strong>Invoice Date:</strong> ${formattedDate}</p>
                    <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
                    <p><strong>Payment Status:</strong> 
                        <span class="status-badge ${order.paymentStatus === "completed" ? "status-completed" : "status-pending"}">
                            ${order.paymentStatus}
                        </span>
                    </p>
                </div>

                <div class="invoice-info">
                    <h3>Bill To</h3>
                    <p><strong>${order.customerName}</strong></p>
                    <p>${order.email}</p>
                    <br>
                    <p><strong>Shipping Address:</strong></p>
                    <p>${order.address.name}</p>
                    <p>${order.address.address}</p>
                    <p>${order.address.city}, ${order.address.state}</p>
                    <p>${order.address.zip}</p>
                </div>
            </div>
        </div>

        <div class="items-section">
            <h3 style="color: #f97316; margin-bottom: 20px; font-size: 18px;">Order Items</h3>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.products
                      .map(
                        (item: ProductItemInOrder) => `
                        <tr>
                            <td>${item.product.name}</td>
                            <td>${item.quantity}</td>
                            <td>₹${item.product.price.toLocaleString()}</td>
                            <td>₹${(item.quantity * item.product.price).toLocaleString()}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>

            <div class="totals">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toLocaleString()}</span>
                </div>
                ${
                  discount > 0
                    ? `
                <div class="total-row">
                    <span>Discount:</span>
                    <span>-₹${discount.toLocaleString()}</span>
                </div>
                `
                    : ""
                }
                <div class="total-row final">
                    <span>Total Amount:</span>
                    <span>₹${order.totalPrice.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <div class="footer no-print">
            <p>This is a computer-generated invoice. No signature is required.</p>
            <p style="margin-top: 10px;">
                <button onclick="window.print()" style="background: #f97316; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    Print Invoice
                </button>
            </p>
        </div>
    </div>
</body>
</html>`;
}
