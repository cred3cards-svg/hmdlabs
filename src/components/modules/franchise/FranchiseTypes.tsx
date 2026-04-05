import { CheckCircle2, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const TYPES = [
  {
    type: "COLLECTION_CENTER",
    name: "Collection Center",
    invest: "3,00,000",
    investMax: "8,00,000",
    area: "200–400 sq.ft",
    setup: "45–60 days",
    revenue: "₹1–3L/month",
    features: [
      "Blood & urine sample collection",
      "Basic on-site testing (BS, Urine dip)",
      "Samples dispatched to main lab",
      "Digital reporting via portal",
      "HMD Labs branded center",
      "Phlebotomy equipment provided",
    ],
    best: "Small towns, clinics, pharmacies",
    color: "border-blue-200",
    headerColor: "bg-blue-50",
  },
  {
    type: "MINI_LAB",
    name: "Mini Lab",
    invest: "15,00,000",
    investMax: "30,00,000",
    area: "500–800 sq.ft",
    setup: "75–90 days",
    revenue: "₹3–6L/month",
    features: [
      "Full sample collection + partial processing",
      "Haematology & biochemistry analysers",
      "Local reporting for routine tests",
      "Advanced tests sent to main lab",
      "Consulting room (optional)",
      "24×7 home collection team",
    ],
    best: "Suburban areas, district HQs",
    color: "border-brand-300 ring-2 ring-brand-200",
    headerColor: "bg-brand-50",
    popular: true,
  },
  {
    type: "FULL_LAB",
    name: "Full Diagnostics Lab",
    invest: "40,00,000",
    investMax: "80,00,000",
    area: "1,200+ sq.ft",
    setup: "100–120 days",
    revenue: "₹6–12L/month",
    features: [
      "Complete testing: 400+ tests in-house",
      "Full analyser suite + microbiology",
      "Radiology integration (X-Ray, USG)",
      "NABL accreditation support",
      "Doctor consultation space",
      "Corporate wellness contracts",
    ],
    best: "District HQs, urban centres",
    color: "border-amber-200",
    headerColor: "bg-amber-50",
  },
  {
    type: "MOBILE_UNIT",
    name: "Mobile Collection Unit",
    invest: "8,00,000",
    investMax: "15,00,000",
    area: "Vehicle-based",
    setup: "30–45 days",
    revenue: "₹1.5–4L/month",
    features: [
      "Fully equipped collection vehicle",
      "Corporate & residential camps",
      "GPS-tracked and digitally managed",
      "Home collection without fixed center",
      "Events, factories, offices",
      "Can be paired with Collection Center",
    ],
    best: "Rural areas, corporate zones",
    color: "border-emerald-200",
    headerColor: "bg-emerald-50",
  },
];

export default function FranchiseTypes() {
  return (
    <section id="types" className="section-py bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Choose Your Franchise Format</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Four flexible models designed for different markets across West Bengal.
            All come with NABL brand support, IT systems, and training.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TYPES.map((t) => (
            <div key={t.type} className={`relative rounded-2xl border-2 bg-white overflow-hidden ${t.color} transition-shadow hover:shadow-card-hover`}>
              {t.popular && (
                <div className="absolute top-0 right-0 bg-brand-700 text-white text-xs font-semibold px-3 py-1 rounded-bl-xl">
                  Most Popular
                </div>
              )}

              <div className={`p-5 ${t.headerColor}`}>
                <h3 className="text-lg font-bold font-display text-gray-900">{t.name}</h3>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-gray-900 font-display">₹{t.invest}</span>
                  <span className="text-sm text-gray-500"> – ₹{t.investMax}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Total investment</p>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <div className="font-semibold text-gray-900">{t.area}</div>
                    <div className="text-gray-500">Space needed</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <div className="font-semibold text-gray-900">{t.setup}</div>
                    <div className="text-gray-500">Setup time</div>
                  </div>
                  <div className="rounded-lg bg-green-50 p-2.5 col-span-2">
                    <div className="font-semibold text-green-700">{t.revenue}</div>
                    <div className="text-gray-500">Revenue potential</div>
                  </div>
                </div>

                <ul className="space-y-1.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-3">
                    <span className="font-medium text-gray-700">Best for:</span> {t.best}
                  </p>
                  <a href="#apply" className="btn-primary w-full justify-center text-xs">
                    Apply for {t.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
