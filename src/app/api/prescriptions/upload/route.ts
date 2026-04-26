import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";
import { sendServerEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const phone = formData.get("phone") as string;
    const eventId = formData.get("eventId") as string;

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

    // Upload to UploadThing
    const utapi = new UTApi();
    const uploadResponses = await utapi.uploadFiles(files);

    for (let i = 0; i < uploadResponses.length; i++) {
        const result = uploadResponses[i];
        if (result.error) {
            console.error("[uploadthing-error]", result.error);
            continue;
        }

        await prisma.prescription.create({
            data: {
              userId: user.id,
              fileName: files[i].name,
              mimeType: files[i].type,
              fileUrl: result.data.url,
            },
        });
    }

    const prescriptionId = `HMD-RX-${Date.now().toString(36).toUpperCase()}`;

    // Fire server-side Lead event for deduplication
    if (eventId) {
      sendServerEvent(
        "Lead",
        eventId,
        req.headers.get("referer") || req.url,
        {
          ph: [phone],
          client_ip_address: req.headers.get("x-forwarded-for") || undefined,
          client_user_agent: req.headers.get("user-agent") || undefined,
        },
        {
          content_name: "Prescription Upload",
        }
      );
    }

    return NextResponse.json({
      success: true,
      prescriptionId,
      message: "Prescription uploaded successfully. Our team will review and confirm tests within 2 hours.",
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[prescription-upload]", error);
    return NextResponse.json({ message: "Upload failed. Try again." }, { status: 500 });
  }
}
