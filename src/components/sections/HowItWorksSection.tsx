import { Search, Calendar, Home, FileText } from "lucide-react";

const STEPS = [
  { step: "01", icon: Search, title: "Choose Test or Package", desc: "Search from 800+ tests or pick a curated health package designed for WB patients.", color: "bg-brand-100 text-brand-700" },
  { step: "02", icon: Calendar, title: "Book & Schedule", desc: "Select your preferred date, time slot & location. Home collection or walk-in — your choice.", color: "bg-purple-100 text-purple-700" },
  { step: "03", icon: Home, title: "Sample Collection", desc: "Our certified phlebotomist visits your home across any WB district, 24×7.", color: "bg-orange-100 text-orange-700" },
  { step: "04", icon: FileText, title: "Receive Report", desc: "Download your NABL-certified report via OTP or email. Doctor review available.", color: "bg-green-100 text-green-700" },
];

export default function HowItWorksSection() {
  return (
    <section className="section-py">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Book a test in under 2 minutes. We handle the rest — from collection to report delivery.
          </p>
        </div>

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] hidden h-0.5 bg-gray-100 lg:block" />

          {STEPS.map(({ step, icon: Icon, title, desc, color }) => (
            <div key={step} className="relative flex flex-col items-center text-center p-6">
              <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${color} mb-5 z-10`}>
                <Icon className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-gray-700 ring-1 ring-gray-200">
                  {step}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 font-display mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
