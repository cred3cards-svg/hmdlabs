import { NextRequest, NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      tests = [],
      packages = [],
      isHomeCollection,
      scheduledDate,
      scheduledSlot,
      collectionAddress,
      collectionCity,
      collectionDistrict,
      collectionPincode,
      prescriptionId,
      paymentMethod,
      familyMemberId,
    } = body;

    if (!tests.length && !packages.length) {
      return NextResponse.json({ message: "No tests or packages selected" }, { status: 400 });
    }

    if (!scheduledDate || !scheduledSlot) {
      return NextResponse.json(
        { message: "Scheduled date and time slot are required" },
        { status: 400 }
      );
    }

    if (isHomeCollection && (!collectionAddress || !collectionDistrict)) {
      return NextResponse.json(
        { message: "Collection address and district are required for home collection" },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    // TODO: Full booking flow with Prisma:
    // 1. Validate test/package IDs
    // 2. Calculate pricing
    // 3. Create Order + OrderItems
    // 4. Initiate payment (Razorpay)
    // 5. Send booking confirmation SMS/email
    // 6. Assign phlebotomist (if home collection)

    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Order placed successfully.",
      order: {
        orderNumber,
        status: "PENDING",
        scheduledDate,
        scheduledSlot,
        isHomeCollection,
        paymentStatus: "PENDING",
      },
    });
  } catch (error) {
    console.error("[order-create]", error);
    return NextResponse.json({ message: "Order creation failed" }, { status: 500 });
  }
}
