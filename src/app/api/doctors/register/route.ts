import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      qualification,
      specialisation,
      registrationNo,
      clinicName,
      clinicAddress,
      city,
      district,
      pincode,
      preferredPickupSlot,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Doctor name and phone are required" },
        { status: 400 }
      );
    }

    // TODO: Insert into DB:
    // await prisma.doctorLead.create({ data: { ... } });
    // TODO: Send welcome SMS/email

    return NextResponse.json({
      success: true,
      message: "Registration successful. Our representative will contact you within 24 hours.",
      referenceId: `HMD-DR-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch (error) {
    console.error("[doctor-register]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
