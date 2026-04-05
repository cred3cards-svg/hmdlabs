import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { identifier } = await req.json();

    if (!identifier?.trim()) {
      return NextResponse.json(
        { message: "Identifier (phone or order ID) is required" },
        { status: 400 }
      );
    }

    // TODO: 
    // 1. Look up user/order by phone or orderNumber in DB
    // 2. Generate 6-digit OTP, store in OTPToken table with 10min expiry
    // 3. Send via SMS (Twilio / MSG91 / 2Factor)
    // 4. Return masked phone

    // Demo: always succeed
    const maskedPhone = identifier.replace(/(\d{2})\d{6}(\d{2})/, "$1XXXXXX$2");

    return NextResponse.json({
      success: true,
      message: `OTP sent to ${maskedPhone}`,
      maskedPhone,
    });
  } catch (error) {
    console.error("[report-otp]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
