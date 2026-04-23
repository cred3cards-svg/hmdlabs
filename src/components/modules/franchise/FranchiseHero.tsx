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
            Earn <span className="text-amber-400">₹3–12 Lakh/Month</span> Running a NABL-Accredited Diagnostic Lab
          </h1>

          <p className="mt-5 text-xl text-brand-200 leading-relaxed max-w-2xl">
            West Bengal's fastest-growing lab network. Exclusive territory. 60-day setup. Full training. We run the backend — you earn the revenue.
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
              Check territory availability in your district →
            </a>
            <a 
              href="https://wa.me/917980701285?text=Hi%2C%20I%27m%20interested%20in%20the%20HMD%20Labs%20franchise%2Fpartnership%20opportunity.%20Please%20call%20me%20back."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-base px-7 py-3.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Chat on WhatsApp
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
