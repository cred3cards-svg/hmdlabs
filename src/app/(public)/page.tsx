import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import FacilityCarouselSection from "@/components/sections/FacilityCarouselSection";
import PopularTestsSection from "@/components/sections/PopularTestsSection";
import HealthPackagesSection from "@/components/sections/HealthPackagesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FranchiseCTASection from "@/components/sections/FranchiseCTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WBCoverageSection from "@/components/sections/WBCoverageSection";
import KnowledgeHubPreview from "@/components/sections/KnowledgeHubPreview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HMD Labs – West Bengal | NABL Accredited Diagnostic Laboratory | 24×7",
  description:
    "Book blood tests, health packages & home sample collection across West Bengal. Fully NABL accredited, 24×7 operations. Serving Kolkata, Howrah, Hooghly & all 23 WB districts.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <FacilityCarouselSection />
      <PopularTestsSection />
      <HealthPackagesSection />
      <HowItWorksSection />
      <WBCoverageSection />
      <FranchiseCTASection />
      <TestimonialsSection />
      <KnowledgeHubPreview />
    </>
  );
}
