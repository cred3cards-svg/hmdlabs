import Link from "next/link";
import { Award, Clock, TrendingUp, MapPin, Users, CheckCircle2, ArrowDown } from "lucide-react";

const STATS = [
  { value: "200+", label: "Centers in WB" },
  { value: "₹3–12L", label: "Monthly Revenue" },
  { value: "60 Days", label: "Avg. Setup Time" },
  { value: "NABL", label: "Brand Power" },
];

export default function FranchiseHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-brand-950 to-brand-900 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-brand-500/10 blur-2xl" />
      </div>

      <div className="section-container relative z-10 py-16 lg:py-24">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="badge-nabl">
              <Award className="h-3 w-3" />
              NABL Accredited
            </span>
            <span className="badge-24x7">
              <Clock className="h-3 w-3" />
              24×7 Operations
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/30">
              <TrendingUp className="h-3 w-3" />
              High ROI Business
            </span>
          </div>

          <h1 className="text-4xl font-bold font-display leading-tight sm:text-5xl lg:text-6xl">
            Own a{" "}
            <span className="text-amber-400">HMD Labs Franchise</span>
            {" "}in West Bengal
          </h1>

          <p className="mt-5 text-xl text-brand-200 leading-relaxed max-w-2xl">
            Partner with West Bengal's most trusted NABL-accredited diagnostic brand. 
            Full support from day one — training, IT, supply chain, and co-branded marketing.
          </p>

          <div className="mt-6 space-y-2">
            {[
              "NABL-backed brand credibility from day one",
              "Complete IT system: LIS, LIMS, patient app & partner portal",
              "Centralized processing at our main labs — lower capital for partners",
              "Dedicated franchise success manager for each partner",
              "All 23 districts of West Bengal — exclusive territory available",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2.5 text-sm text-brand-200">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                {point}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#apply" className="btn-accent text-base px-7 py-3.5">
              Apply for Franchise
            </a>
            <a href="#brochure" className="btn-ghost border border-white/20 text-white hover:bg-white/10 text-base px-7 py-3.5">
              Download Brochure
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl">
            {STATS.map(({ value, label }) => (
              <div key={label} className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold font-display text-amber-400">{value}</div>
                <div className="text-xs text-brand-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-brand-400">
          <ArrowDown className="h-4 w-4 animate-bounce" />
          Scroll to explore franchise formats
        </div>
      </div>
    </section>
  );
}
