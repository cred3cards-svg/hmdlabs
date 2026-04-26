import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WBDistrict, FranchiseType } from "@prisma/client";
import { sendServerEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      applicantName,
      phone,
      district,
      partnerType,
      source = "website",
    } = body;

    // Validation
    if (!applicantName || !phone || !district || !partnerType) {
      return NextResponse.json(
        { message: "Required fields missing: name, phone, district, partner type" },
        { status: 400 }
      );
    }

    // Calculate lead score based on the new partnerType mapping
    let scoreLabel: "HOT" | "WARM" | "COLD" = "WARM";
    let numericScore = 50;
    
    // Map PartnerType to FranchiseType Enum
    let mappedFranchiseType: FranchiseType = "COLLECTION_CENTER";

    if (partnerType === "Hospital") {
      scoreLabel = "HOT";
      numericScore = 80;
      mappedFranchiseType = "FULL_LAB";
    } else if (partnerType === "Lab") {
      scoreLabel = "HOT";
      numericScore = 80;
      mappedFranchiseType = "FULL_LAB";
    } else if (partnerType === "Doctor") {
      scoreLabel = "WARM";
      numericScore = 65;
      mappedFranchiseType = "MINI_LAB";
    }

    // Convert string "North 24 Parganas" to "NORTH_24_PARGANAS"
    const enumDistrict = district.toUpperCase().replace(/\s+/g, "_") as WBDistrict;

    // Insert into DB with Prisma
    const lead = await prisma.franchiseLead.create({
      data: {
        applicantName,
        phone, 
        email: "no-email@provided.com", // dummy email as schema requires it
        franchiseType: mappedFranchiseType, 
        preferredDistrict: enumDistrict,
        preferredCity: district, // store raw district as city since we only have 1 location field now
        status: "NEW",
        score: scoreLabel,
        leadScore: numericScore,
        source,
        notes: `Partner Type selected: ${partnerType}`,
        termsAccepted: true, // implicit for micro-form
        termsAcceptedAt: new Date(),
      },
    });

    // Fire server-side Lead event for deduplication
    if (body.eventId) {
      // We do not await this to avoid slowing down the response
      sendServerEvent(
        "Lead",
        body.eventId,
        req.headers.get("referer") || req.url,
        {
          ph: [phone],
          fn: [applicantName],
          ct: [district],
          client_ip_address: req.headers.get("x-forwarded-for") || undefined,
          client_user_agent: req.headers.get("user-agent") || undefined,
        },
        {
          content_name: "Franchise Application",
          content_category: partnerType,
        }
      );
    }

    // TODO: Trigger CRM notification (email/Slack/webhook)
    // TODO: Send acknowledgment SMS to applicant

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully. Our team will contact you within 24 hours.",
      leadScore: numericScore,
      scoreLabel,
      applicationId: `HMD-FRNCH-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch (error) {
    console.error("[franchise-apply]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // CRM internal endpoint – list franchise leads (requires auth)
  // TODO: Implement with NextAuth session check + admin role guard
  return NextResponse.json({ message: "Use POST to submit franchise application" }, { status: 405 });
}
