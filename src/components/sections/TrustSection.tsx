import { Award, Clock, ShieldCheck, Microscope, Users, Star } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Award, title: "NABL Accredited", desc: "ISO 15189 certified — India's gold standard for diagnostic labs.", color: "text-amber-600 bg-amber-50" },
  { icon: Clock, title: "24×7 Operations", desc: "Round-the-clock availability. Home collection anytime.", color: "text-green-700 bg-green-50" },
  { icon: ShieldCheck, title: "Quality Assured", desc: "Rigorous QC at every step. 99.9% test accuracy.", color: "text-brand-700 bg-brand-50" },
  { icon: Microscope, title: "Advanced Equipment", desc: "State-of-the-art analysers. Internationally validated kits.", color: "text-purple-700 bg-purple-50" },
  { icon: Users, title: "Expert Team", desc: "MD Pathologists, PhD Scientists, certified phlebotomists.", color: "text-rose-700 bg-rose-50" },
  { icon: Star, title: "4.9★ Rating", desc: "Trusted by 5 lakh+ patients across West Bengal.", color: "text-orange-700 bg-orange-50" },
];

export default function TrustSection() {
  return (
    <section className="py-14 bg-gray-50 border-y border-gray-100">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title text-2xl sm:text-3xl">Why West Bengal Trusts HMD Labs</h2>
          <p className="section-subtitle text-base">Built on precision, transparency, and compassion since 2005.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-card-hover transition-shadow">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-3 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 font-display">{title}</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
