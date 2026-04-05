import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const phone = formData.get("phone") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ message: "Phone number is required" }, { status: 400 });
    }

    // Find or create user based on phone
    let user = await prisma.user.findFirst({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          name: `Guest (${phone.slice(0, 4)}...)`,
          role: "PATIENT",
        },
      });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads/prescriptions");
    await fs.mkdir(uploadDir, { recursive: true }).catch(() => {});

    for (const file of files) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!allowedTypes.includes(file.type)) continue;

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeName);
      
      await fs.writeFile(filePath, buffer);
      
      const fileUrl = `/uploads/prescriptions/${safeName}`;

      await prisma.prescription.create({
        data: {
          userId: user.id,
          fileName: file.name,
          mimeType: file.type,
          fileUrl: fileUrl,
        },
      });
    }

    const prescriptionId = `HMD-RX-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      prescriptionId,
      message: "Prescription uploaded successfully.",
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[prescription-upload]", error);
    return NextResponse.json({ message: "Upload failed. Try again." }, { status: 500 });
  }
}
