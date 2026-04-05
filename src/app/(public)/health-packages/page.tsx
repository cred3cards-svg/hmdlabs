import type { Metadata } from "next";
import Link from "next/link";
import { Award, CheckCircle2, Clock, Home } from "lucide-react";
import { formatCurrency, calculateDiscountPct } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Health Packages – West Bengal | NABL Accredited | HMD Labs",
  description: "Comprehensive health packages for West Bengal patients. Full body checkup, diabetes, cardiac, women's wellness, and senior citizen panels. Book online.",
};

const PACKAGES = [
  {
    name: "Basic Health Screen", slug: "basic-health", targetGroup: "All Adults", mrp: 1800, price: 999,
    tests: ["CBC", "Blood Sugar (F)", "Urine Routine", "LFT", "KFT", "Lipid Profile"],
    description: "Essential health markers for a quick annual snapshot.",
    color: "border-blue-200 bg-blue-50/30",
  },
  {
    name: "Aarogya Premium 50+", slug: "aarogya-premium", targetGroup: "Adults 30+", mrp: 4500, price: 2499,
    tests: ["CBC", "ESR", "Blood Sugar (F&PP)", "HbA1c", "LFT", "KFT", "Lipid Profile", "Thyroid (T3/T4/TSH)", "Urine Routine", "Vitamin D", "Vitamin B12"],
    description: "Comprehensive wellness panel for the health-conscious adult.",
    color: "border-brand-300 bg-brand-50/50", featured: true,
  },
  {
    name: "Diabetes Care", slug: "diabetes-care", targetGroup: "Diabetics", mrp: 3200, price: 1799,
    tests: ["HbA1c", "Blood Sugar (F&PP)", "Microalbumin", "KFT", "Lipid Profile", "CBC", "Urine Routine"],
    description: "Designed for diabetics to track glycaemic control and organ health.",
    color: "border-orange-200 bg-orange-50/30",
  },
  {
    name: "Cardiac Risk Panel", slug: "heart-health", targetGroup: "Cardiac Risk", mrp: 3800, price: 1999,
    tests: ["Lipid Profile (Detailed)", "hs-CRP", "Homocysteine", "Troponin-I", "CBC", "Blood Sugar"],
    description: "Advanced cardiac risk assessment for high-risk individuals.",
    color: "border-red-200 bg-red-50/30",
  },
  {
    name: "Women's Wellness", slug: "womens-wellness", targetGroup: "Women 18–60", mrp: 5500, price: 2999,
    tests: ["CBC", "Thyroid (T3/T4/TSH)", "Vitamin D", "Vitamin B12", "Iron Studies", "Calcium", "Blood Sugar", "Hormone Panel"],
    description: "Comprehensive screening tailored for women's unique health needs.",
    color: "border-pink-200 bg-pink-50/30",
  },
  {
    name: "Senior Citizen Panel", slug: "senior-citizen", targetGroup: "Age 60+", mrp: 6000, price: 3499,
    tests: ["CBC", "ESR", "LFT", "KFT", "Thyroid", "HbA1c", "Lipid Profile", "Vitamin D", "Vitamin B12", "PSA (Male)", "Urine Routine"],
    description: "Age-appropriate comprehensive panel for elderly patients.",
    color: "border-emerald-200 bg-emerald-50/30",
  },
  {
    name: "Corporate Wellness", slug: "corporate-wellness", targetGroup: "Working Adults", mrp: 2800, price: 1499,
    tests: ["CBC", "Blood Sugar (F)", "Lipid Profile", "LFT", "Urine Routine", "ECG Interpretation"],
    description: "Efficient workplace health screening package. Bulk rates available.",
    color: "border-purple-200 bg-purple-50/30",
  },
  {
    name: "Thyroid + Hormone Panel", slug: "thyroid-hormone", targetGroup: "Women & Thyroid Patients", mrp: 2800, price: 1599,
    tests: ["T3", "T4", "TSH", "Anti-TPO", "Anti-TG", "LH", "FSH", "Prolactin", "Estradiol"],
    description: "Detailed thyroid and hormonal profile for diagnosis and monitoring.",
    color: "border-teal-200 bg-teal-50/30",
  },
];

export default function HealthPackagesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-12">
        <div className="section-container">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-nabl text-xs"><Award className="h-3 w-3" />NABL Certified Results</span>
            <span className="badge-24x7 text-xs"><Clock className="h-3 w-3" />24×7 Booking</span>
          </div>
          <h1 className="text-3xl font-bold font-display sm:text-4xl">Health Packages</h1>
          <p className="mt-2 text-brand-200 max-w-xl">
            Curated for West Bengal patients. Comprehensive panels at honest prices with NABL-accredited results.
          </p>
        </div>
      </div>

      <div className="section-container section-py">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PACKAGES.map((pkg) => {
            const discount = calculateDiscountPct(pkg.mrp, pkg.price);
            return (
              <div key={pkg.slug} className={`relative rounded-2xl border-2 p-6 ${pkg.color} transition-shadow hover:shadow-card-hover`}>
                {pkg.featured && (
                  <span className="absolute -top-3 left-4 rounded-full bg-brand-700 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs text-gray-500">{pkg.targetGroup}</span>
                    <h3 className="text-base font-bold font-display text-gray-900 mt-0.5">{pkg.name}</h3>
                  </div>
                  {discount > 0 && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 shrink-0 ml-2">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{pkg.description}</p>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900 font-display">{formatCurrency(pkg.price)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatCurrency(pkg.mrp)}</span>
                </div>
                <ul className="mb-5 space-y-1">
                  {pkg.tests.slice(0, 5).map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-600" />{t}
                    </li>
                  ))}
                  {pkg.tests.length > 5 && (
                    <li className="text-xs text-brand-600 font-medium pl-5">+{pkg.tests.length - 5} more</li>
                  )}
                </ul>
                <div className="flex gap-2">
                  <Link href={`/health-packages/${pkg.slug}`} className="btn-secondary flex-1 text-xs justify-center py-2">
                    View Details
                  </Link>
                  <Link href={`/book-test/schedule?package=${pkg.slug}`} className="btn-primary flex-1 text-xs justify-center py-2">
                    Book Now
                  </Link>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                  <Home className="h-3 w-3 text-green-600" />
                  Home collection available · WB only
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
