import { NextRequest, NextResponse } from "next/server";
import { calculateFranchiseLeadScore, getLeadScoreLabel } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      applicantName,
      phone,
      email,
      franchiseType,
      preferredDistrict,
      preferredCity,
      investmentCapacity,
      existingSpace,
      spaceArea,
      businessExperience,
      currentOccupation,
      addressLine1,
      city,
      district,
      pincode,
      termsAccepted,
      source = "website",
    } = body;

    // Validation
    if (!applicantName || !phone || !email || !franchiseType || !preferredDistrict) {
      return NextResponse.json(
        { message: "Required fields missing: name, phone, email, franchise type, district" },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { message: "Terms and conditions must be accepted" },
        { status: 400 }
      );
    }

    // Calculate lead score
    const numericScore = calculateFranchiseLeadScore({
      investmentCapacity: Number(investmentCapacity) || 0,
      existingSpace: Boolean(existingSpace),
      businessExperience: Number(businessExperience) || 0,
      franchiseType,
    });
    const scoreLabel = getLeadScoreLabel(numericScore);

    // TODO: Insert into DB with Prisma:
    // const lead = await prisma.franchiseLead.create({
    //   data: {
    //     applicantName, phone, email, franchiseType,
    //     preferredDistrict, preferredCity: preferredCity || city,
    //     investmentCapacity: investmentCapacity ? Number(investmentCapacity) : null,
    //     existingSpace: Boolean(existingSpace),
    //     spaceArea: spaceArea ? Number(spaceArea) : null,
    //     businessExperience: businessExperience ? Number(businessExperience) : null,
    //     currentOccupation,
    //     addressLine1, city, district, pincode,
    //     status: "NEW",
    //     score: scoreLabel,
    //     leadScore: numericScore,
    //     source,
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
