import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { formatCurrency, calculateDiscountPct } from "@/lib/utils";

const PACKAGES = [
  {
    name: "Basic Health Checkup",
    slug: "basic-health",
    targetGroup: "All Adults",
    mrp: 1800,
    price: 999,
    tests: ["CBC", "Blood Sugar (F)", "Urine Routine", "LFT", "KFT", "Lipid Profile"],
    popular: false,
    featured: false,
    color: "border-blue-200 bg-blue-50/50",
    badge: "",
  },
  {
    name: "Aarogya Premium",
    slug: "aarogya-premium",
    targetGroup: "Males & Females 30+",
    mrp: 4500,
    price: 2499,
    tests: ["CBC", "ESR", "Blood Sugar (F&PP)", "HbA1c", "LFT", "KFT", "Lipid Profile", "Thyroid (T3/T4/TSH)", "Urine Routine", "Vitamin D", "Vitamin B12"],
    popular: true,
    featured: true,
    color: "border-brand-300 bg-brand-50/50",
    badge: "Most Popular",
  },
  {
    name: "Diabetes Care Panel",
    slug: "diabetes-care",
    targetGroup: "Diabetics & Pre-Diabetics",
    mrp: 3200,
    price: 1799,
    tests: ["HbA1c", "Blood Sugar (F&PP)", "Microalbumin", "KFT", "Lipid Profile", "CBC", "Urine Routine"],
    popular: false,
    featured: false,
    color: "border-orange-200 bg-orange-50/50",
    badge: "",
  },
  {
    name: "Heart Health Package",
    slug: "heart-health",
    targetGroup: "Cardiac Risk Patients",
    mrp: 3800,
    price: 1999,
    tests: ["Lipid Profile (Detailed)", "hs-CRP", "Homocysteine", "Troponin-I", "ECG Interpretation", "CBC", "Blood Sugar"],
    popular: false,
    featured: false,
    color: "border-red-200 bg-red-50/50",
    badge: "",
  },
  {
    name: "Women's Wellness",
    slug: "womens-wellness",
    targetGroup: "Women 18–60",
    mrp: 5500,
    price: 2999,
    tests: ["CBC", "Thyroid (T3/T4/TSH)", "Vitamin D", "Vitamin B12", "Iron Studies", "Calcium", "Blood Sugar", "Pap Smear (add-on)", "Pelvic USG"],
    popular: false,
    featured: false,
    color: "border-pink-200 bg-pink-50/50",
    badge: "Bestseller",
  },
  {
    name: "Senior Citizen Panel",
    slug: "senior-citizen",
    targetGroup: "Age 60+",
    mrp: 6000,
    price: 3499,
    tests: ["CBC", "ESR", "LFT", "KFT", "Thyroid", "HbA1c", "Lipid Profile", "Vitamin D", "Vitamin B12", "PSA (Male)", "Urine Routine", "ECG"],
    popular: false,
    featured: false,
    color: "border-emerald-200 bg-emerald-50/50",
    badge: "",
  },
];

export default function HealthPackagesSection() {
  return (
    <section className="section-py bg-gray-50">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Health Packages</h2>
            <p className="section-subtitle max-w-xl">
              Curated for West Bengal patients. Comprehensive, affordable, NABL-certified results.
            </p>
          </div>
          <Link href="/health-packages" className="btn-secondary hidden sm:inline-flex">
            All Packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => {
            const discount = calculateDiscountPct(pkg.mrp, pkg.price);
            return (
              <div
                key={pkg.slug}
                className={`relative rounded-2xl border-2 p-6 transition-shadow hover:shadow-card-hover ${pkg.color} ${pkg.featured ? "ring-2 ring-brand-500/30" : ""}`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-5 rounded-full bg-brand-700 px-3 py-0.5 text-xs font-semibold text-white">
                    {pkg.badge}
                  </span>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">{pkg.targetGroup}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5 font-display">{pkg.name}</h3>
                  </div>
                  {discount > 0 && (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900 font-display">{formatCurrency(pkg.price)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatCurrency(pkg.mrp)}</span>
                </div>

                <ul className="mb-5 space-y-1.5">
                  {pkg.tests.slice(0, 5).map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-600" />
                      {t}
                    </li>
                  ))}
                  {pkg.tests.length > 5 && (
                    <li className="text-xs text-brand-600 font-medium ml-5.5">
                      +{pkg.tests.length - 5} more tests
                    </li>
                  )}
                </ul>

                <Link
                  href={`/health-packages/${pkg.slug}`}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Book This Package
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
