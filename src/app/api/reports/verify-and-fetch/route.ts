import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { identifier, otp } = await req.json();

    if (!identifier?.trim() || !otp?.trim()) {
      return NextResponse.json({ message: "Identifier and OTP are required" }, { status: 400 });
    }

    if (otp.length !== 6) {
      return NextResponse.json({ message: "OTP must be 6 digits" }, { status: 400 });
    }

    // TODO: 
    // 1. Find OTPToken by phone/identifier matching purpose="report"
    // 2. Check OTP matches, not expired, attempts < 3
    // 3. Mark OTPToken as used
    // 4. Fetch associated reports from DB
    // 5. Generate pre-signed S3 URL for download (expire 24h)

    // Demo: accept OTP "123456"
    if (otp !== "123456") {
      return NextResponse.json(
        { message: "Invalid or expired OTP. Please try again." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      name: "Subrata Chatterjee",
      reportNumber: "HMD-RPT-2026-00123",
      date: "06 Mar 2026",
      reports: [
        {
          id: "rpt_demo_1",
          testName: "Complete Blood Count (CBC)",
          reportNumber: "HMD-RPT-2026-00123",
          generatedAt: "2026-03-06T14:00:00Z",
          downloadUrl: "/api/reports/download?token=demo_token",
        },
        {
          id: "rpt_demo_2",
          testName: "Liver Function Test (LFT)",
          reportNumber: "HMD-RPT-2026-00124",
          generatedAt: "2026-03-06T14:00:00Z",
          downloadUrl: "/api/reports/download?token=demo_token_2",
        },
      ],
    });
  } catch (error) {
    console.error("[report-verify]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
