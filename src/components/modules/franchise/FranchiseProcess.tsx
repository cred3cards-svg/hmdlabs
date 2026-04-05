import { PhoneCall, FileCheck, MapPin, GraduationCap, Scissors, TrendingUp } from "lucide-react";

const PROCESS_STEPS = [
  { step: "01", icon: PhoneCall, title: "Apply & Discovery Call", desc: "Fill the application form. Our franchise manager calls you within 24 hours for a discovery conversation." },
  { step: "02", icon: FileCheck, title: "Evaluation & LOI", desc: "We evaluate your profile, location viability, and financial capacity. A Letter of Intent is signed on approval." },
  { step: "03", icon: MapPin, title: "Site Visit & Approval", desc: "Our team visits your proposed site in West Bengal to assess feasibility and finalise the territory." },
  { step: "04", icon: Scissors, title: "Agreement & Setup", desc: "Franchise agreement signing, store design, equipment procurement, and IT system installation." },
  { step: "05", icon: GraduationCap, title: "Training & Certification", desc: "5-day training in Kolkata for you and your staff. SOPs, quality protocols, and system training." },
  { step: "06", icon: TrendingUp, title: "Launch & Growth", desc: "Grand opening support, marketing activation, and ongoing mentorship from your dedicated success manager." },
];

export default function FranchiseProcess() {
  return (
    <section className="section-py bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">From Application to Launch in 60 Days</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Our streamlined onboarding process is designed to get you operational fast.
          </p>
        </div>

        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-700 to-brand-200 hidden sm:block" />

          <div className="space-y-6">
            {PROCESS_STEPS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative flex gap-5 sm:gap-8 pl-0 sm:pl-14">
                <div className="absolute left-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white hidden sm:flex z-10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="card p-5 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white sm:hidden">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-brand-700 font-mono">Step {step}</span>
                  </div>
                  <h3 className="text-base font-semibold font-display text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
