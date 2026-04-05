import type { Metadata } from "next";
import FranchiseHero from "@/components/modules/franchise/FranchiseHero";
import FranchiseTypes from "@/components/modules/franchise/FranchiseTypes";
import FranchiseApplicationForm from "@/components/modules/franchise/FranchiseApplicationForm";
import FranchiseBrochureGate from "@/components/modules/franchise/FranchiseBrochureGate";
import FranchiseProcess from "@/components/modules/franchise/FranchiseProcess";

export const metadata: Metadata = {
  title: "Franchise Opportunity – Own a Diagnostic Lab in West Bengal | HMD Labs",
  description:
    "Join HMD Labs' NABL-accredited franchise network across West Bengal. Earn ₹3–12L/month. 4 formats: Collection Center, Mini Lab, Full Lab, Mobile Unit. Apply now.",
  keywords: [
    "diagnostic lab franchise West Bengal",
    "pathology lab franchise Kolkata",
    "NABL franchise West Bengal",
    "HMD Labs franchise",
    "collection center franchise WB",
  ],
};

export default function PartnerWithUsPage() {
  return (
    <div>
      <FranchiseHero />
      <FranchiseTypes />
      <FranchiseProcess />
      <FranchiseBrochureGate />
      <FranchiseApplicationForm />
    </div>
  );
}
