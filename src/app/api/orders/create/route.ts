import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { OrderStatus, PaymentStatus, PaymentMethod, WBDistrict } from "@prisma/client";

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

    // 1. Find or create user (Guest Checkout)
    let user = await prisma.user.findFirst({
      where: { phone: phone }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name,
          phone: phone,
          email: email || undefined,
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

    // Flexibility: Check if district is a valid enum value, otherwise store it in the address string
    const validDistricts = Object.values(WBDistrict);
    const districtEnum = validDistricts.includes(district as any) ? (district as WBDistrict) : null;
    
    // If district isn't in our enum, we append it to the city/address to ensure it's not lost
    const finalCity = districtEnum ? city : `${city}, ${district}`;

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
        collectionAddress: address,
        collectionCity: finalCity,
        collectionDistrict: districtEnum,
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

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      message: "Order placed successfully! We will call you to confirm.",
    });

  } catch (error: any) {
    console.error("[ORDER_CREATE_ERROR]", error);
    return NextResponse.json({ 
      message: "Internal Server Error", 
      error: error.message,
      details: error.code 
    }, { status: 500 });
  }
}
