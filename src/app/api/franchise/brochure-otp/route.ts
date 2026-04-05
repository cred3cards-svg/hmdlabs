import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone, action } = await req.json();

    if (!phone?.trim()) {
      return NextResponse.json({ message: "Phone number is required" }, { status: 400 });
    }

    if (action === "request") {
      // TODO:
      // 1. Create OTPToken with purpose="brochure"
      // 2. Send SMS
      // 3. Update FranchiseLead.brochureOtpSent = true if lead exists

      const maskedPhone = phone.replace(/(\d{2})\d{6}(\d{2})/, "$1XXXXXX$2");
      return NextResponse.json({
        success: true,
        message: `OTP sent to ${maskedPhone}`,
      });
    }

    if (action === "verify") {
      const { otp } = await req.json();

      if (!otp || otp !== "123456") {
        // TODO: real OTP verification
        return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 401 });
      }

      // TODO: Generate time-limited signed URL to brochure PDF in S3
      // TODO: Update FranchiseLead.brochureDownloaded = true

      return NextResponse.json({
        success: true,
        downloadUrl: "/brochure/hmd-labs-franchise-brochure-2025.pdf",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[brochure-otp]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
