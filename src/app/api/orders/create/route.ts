import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { OrderStatus, PaymentStatus, PaymentMethod, WBDistrict } from "@prisma/client";
import { sendServerEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, 
      phone, 
      email,
      address, 
      city, 
      district, 
      pincode, 
      scheduledDate, 
      scheduledSlot,
      testId,
      packageId,
      subtotal,
      totalAmount,
      homeFee = 0
    } = body;

    if (!name || !phone || !address || !city || (!testId && !packageId)) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1. Find or create user (Guest Checkout) - Using Phone as primary identifier
    let user = await prisma.user.findFirst({
      where: { phone: phone }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name,
          phone: phone,
          // Skipping email in User model because it has a strict unique constraint 
          // that blocks guest checkouts if the email was used before.
          role: "PATIENT",
          isActive: true,
        }
      });
    }

    // 2. Create the Order
    // Generate an order number: HMD-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `HMD-${dateStr}-${randomSuffix}`;

    // Flexibility: Store everything in free-text fields to bypass strict enum/pattern checks as requested
    const addressWithDistrict = `${address}, ${district || ''}, PIN: ${pincode || ''}`.trim();
    const finalCity = city; 

    try {
      const order = await prisma.order.create({
        data: {
          orderNumber,
          userId: user.id,
          status: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          paymentMethod: PaymentMethod.CASH,
          isHomeCollection: true,
          scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
          scheduledSlot: scheduledSlot,
          collectionAddress: addressWithDistrict,
          collectionCity: finalCity,
          collectionDistrict: null, // Bypassing enum check
          collectionPincode: pincode ? String(pincode) : null,
          subtotal: Number(subtotal) || 0,
          totalAmount: Number(totalAmount) || 0,
          homeFee: Number(homeFee) || 0,
          items: {
            create: testId ? [{
              name: body.testName || "Diagnostic Test",
              price: Number(subtotal) || 0,
              testId: testId,
            }] : [{
              name: body.packageName || "Health Package",
              price: Number(subtotal) || 0,
              packageId: packageId,
            }]
          }
        },
        include: {
          items: true
        }
      });

      // Fire server-side Purchase event for deduplication
      if (body.eventId) {
        // We do not await this to avoid slowing down the response
        sendServerEvent(
          "Purchase",
          body.eventId,
          req.headers.get("referer") || req.url,
          {
            ph: [phone],
            fn: [name],
            em: email ? [email] : [],
            ct: [finalCity],
            zp: [pincode ? String(pincode) : ""],
            client_ip_address: req.headers.get("x-forwarded-for") || undefined,
            client_user_agent: req.headers.get("user-agent") || undefined,
          },
          {
            value: Number(totalAmount) || 0,
            currency: "INR",
            content_name: body.testName || body.packageName || "Diagnostic Test/Package",
            content_ids: [testId || packageId].filter(Boolean) as string[],
          }
        );
      }

      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        message: "Order placed successfully! We will call you to confirm.",
      });

    } catch (orderError: any) {
      console.error("[PRISMA_ORDER_ERROR]", orderError);
      return NextResponse.json({ 
        message: "Database Error", 
        error: orderError.message,
        code: orderError.code 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("[ORDER_CREATE_ERROR]", error);
    return NextResponse.json({ 
      message: "Internal Server Error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
