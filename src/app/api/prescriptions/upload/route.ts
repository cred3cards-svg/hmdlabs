import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const phone = formData.get("phone") as string;
    const notes = formData.get("notes") as string;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Only JPG, PNG, WebP or PDF files are allowed" },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ message: "File size must be under 10MB" }, { status: 400 });
    }

    // TODO:
    // 1. Upload file to S3: await s3.putObject(...)
    // 2. Store Prescription record in DB
    // 3. Notify support team
    // 4. If user is logged in, link to their account

    const prescriptionId = `HMD-RX-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      prescriptionId,
      message: "Prescription uploaded successfully. Our team will review and confirm tests within 2 hours.",
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[prescription-upload]", error);
    return NextResponse.json({ message: "Upload failed. Try again." }, { status: 500 });
  }
}
