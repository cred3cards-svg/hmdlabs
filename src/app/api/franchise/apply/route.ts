import { NextRequest, NextResponse } from "next/server";
import { calculateFranchiseLeadScore, getLeadScoreLabel } from "@/lib/utils";

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
    // We can just use a default or map it.
    let scoreLabel = "WARM";
    let numericScore = 50;

    if (partnerType === "Hospital" || partnerType === "Lab") {
      scoreLabel = "HOT";
      numericScore = 80;
    }

    // TODO: Insert into DB with Prisma:
    // const lead = await prisma.franchiseLead.create({
    //   data: {
    //     applicantName, phone, 
    //     email: "no-email@provided.com", // dummy if required
    //     franchiseType: "COLLECTION_CENTER", // dummy if required
    //     preferredDistrict: district,
    //     preferredCity: district,
    //     status: "NEW",
    //     score: scoreLabel,
    //     leadScore: numericScore,
    //     source,
    //     notes: `Partner Type: ${partnerType}`,
    //     termsAccepted: true,
    //     termsAcceptedAt: new Date(),
    //   },
    // });

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
