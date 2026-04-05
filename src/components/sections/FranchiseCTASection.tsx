import Link from "next/link";
import { ArrowRight, TrendingUp, MapPin, Award, Users } from "lucide-react";

const BENEFITS = [
  { icon: TrendingUp, value: "₹3–12L/mo", label: "Revenue Potential" },
  { icon: MapPin, value: "200+", label: "Locations in WB" },
  { icon: Award, value: "NABL", label: "Brand Credibility" },
  { icon: Users, value: "5L+", label: "Patient Base" },
];

export default function FranchiseCTASection() {
  return (
    <section className="section-py bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="section-container">
        <div className="rounded-3xl bg-white border border-amber-100 shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="p-8 lg:p-12">
              <span className="badge-nabl mb-4 inline-flex">
                <Award className="h-3 w-3" />
                NABL-Backed Franchise
              </span>
              <h2 className="text-3xl font-bold font-display text-gray-900 sm:text-4xl">
                Own a HMD Labs Franchise in{" "}
                <span className="text-amber-600">West Bengal</span>
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Join West Bengal's fastest-growing diagnostic lab network. Full training, brand support, 
                IT systems and a guaranteed NABL-branded business — ready in 60 days.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {BENEFITS.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="rounded-2xl bg-amber-50 p-4 border border-amber-100">
                    <Icon className="h-5 w-5 text-amber-600 mb-2" />
                    <div className="text-xl font-bold text-gray-900 font-display">{value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/partner-with-us" className="btn-accent">
                  Apply for Franchise
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/partner-with-us#brochure" className="btn-secondary">
                  Download Brochure
                </Link>
              </div>
            </div>

            {/* Right – types */}
            <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-8 lg:p-12 text-white">
              <h3 className="text-xl font-bold font-display mb-6">Choose Your Format</h3>
              {[
                { type: "Collection Center", invest: "₹3–8 Lakhs", area: "200–400 sq.ft", tat: "60 days setup" },
                { type: "Mini Lab", invest: "₹15–30 Lakhs", area: "500–800 sq.ft", tat: "90 days setup" },
                { type: "Full Diagnostics Lab", invest: "₹40–80 Lakhs", area: "1200+ sq.ft", tat: "120 days setup" },
                { type: "Mobile Collection Unit", invest: "₹8–15 Lakhs", area: "Vehicle-based", tat: "45 days setup" },
              ].map((f) => (
                <div key={f.type} className="mb-4 rounded-xl bg-white/10 border border-white/15 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm font-display">{f.type}</span>
                    <span className="text-xs text-amber-300 font-medium">{f.invest}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-brand-300">
                    <span>{f.area}</span>
                    <span>•</span>
                    <span>{f.tat}</span>
                  </div>
                </div>
              ))}
              <Link href="/partner-with-us#types" className="mt-2 flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200 transition-colors">
                Compare all formats <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
