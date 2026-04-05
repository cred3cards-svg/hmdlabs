import type { Metadata } from "next";
import { Search, FlaskConical, Filter, Clock, Home } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Diagnostic Test – West Bengal",
  description: "Book 800+ NABL-accredited diagnostic tests online. Home collection across all 23 districts of West Bengal. 24×7 booking available.",
};

const CATEGORIES = [
  "All Tests", "Haematology", "Biochemistry", "Endocrinology", "Diabetes",
  "Cardiology", "Vitamins & Minerals", "Infection & Immunity", "Hormones",
  "Cancer Markers", "Urine & Stool", "Microbiology",
];

const SAMPLE_TESTS = [
  { name: "Complete Blood Count (CBC)", code: "CBC", price: 249, mrp: 400, tat: 6, sample: "Blood", category: "Haematology", popular: true },
  { name: "Liver Function Test (LFT)", code: "LFT", price: 449, mrp: 650, tat: 8, sample: "Blood", category: "Biochemistry", popular: true },
  { name: "Kidney Function Test (KFT/RFT)", code: "KFT", price: 499, mrp: 750, tat: 8, sample: "Blood", category: "Biochemistry", popular: true },
  { name: "Thyroid Profile (T3 T4 TSH)", code: "TFT", price: 599, mrp: 900, tat: 12, sample: "Blood", category: "Endocrinology", popular: true },
  { name: "HbA1c (Glycated Haemoglobin)", code: "HBA1C", price: 399, mrp: 600, tat: 6, sample: "Blood", category: "Diabetes", popular: true },
  { name: "Lipid Profile", code: "LIPID", price: 449, mrp: 700, tat: 8, sample: "Blood", category: "Cardiology", popular: false },
  { name: "Vitamin D (25-OH)", code: "VITD", price: 799, mrp: 1400, tat: 24, sample: "Blood", category: "Vitamins & Minerals", popular: true },
  { name: "Vitamin B12", code: "VITB12", price: 699, mrp: 1200, tat: 24, sample: "Blood", category: "Vitamins & Minerals", popular: false },
  { name: "Blood Sugar Fasting (BSF)", code: "BSF", price: 79, mrp: 120, tat: 4, sample: "Blood", category: "Diabetes", popular: false },
  { name: "Urine Routine & Microscopy", code: "URE", price: 99, mrp: 150, tat: 4, sample: "Urine", category: "Urine & Stool", popular: false },
  { name: "ESR (Westergren Method)", code: "ESR", price: 89, mrp: 130, tat: 4, sample: "Blood", category: "Haematology", popular: false },
  { name: "C-Reactive Protein (CRP)", code: "CRP", price: 299, mrp: 500, tat: 8, sample: "Blood", category: "Infection & Immunity", popular: false },
];

export default function BookTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-brand-900 text-white py-10">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-3">
            <FlaskConical className="h-6 w-6 text-amber-400" />
            <span className="badge-nabl text-xs">NABL Accredited Tests</span>
            <span className="badge-24x7 text-xs">24×7 Booking</span>
          </div>
          <h1 className="text-3xl font-bold font-display sm:text-4xl">Book a Diagnostic Test</h1>
          <p className="mt-2 text-brand-200">800+ tests · Home collection across West Bengal · Results in 4–48 hours</p>

          {/* Search */}
          <div className="mt-6 flex max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by test name, code, or symptom..."
                className="w-full rounded-xl bg-white pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
            <button className="btn-accent shrink-0">Search</button>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="card p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900">
                <Filter className="h-4 w-4" />
                Filters
              </div>
              
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-brand-700 py-0.5">
                      <input type="checkbox" className="rounded border-gray-300 text-brand-700 focus:ring-brand-500" />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sample Type</p>
                {["Blood", "Urine", "Stool", "Swab", "Other"].map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-brand-700 py-0.5">
                    <input type="checkbox" className="rounded border-gray-300 text-brand-700 focus:ring-brand-500" />
                    {s}
                  </label>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Price Range</p>
                <div className="space-y-1">
                  {["Under ₹200", "₹200–500", "₹500–1000", "₹1000+"].map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-brand-700 py-0.5">
                      <input type="radio" name="price" className="border-gray-300 text-brand-700 focus:ring-brand-500" />
                      {r}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Test listing */}
          <main className="flex-1 min-w-0">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-thin">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    cat === "All Tests"
                      ? "bg-brand-700 text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-brand-300 hover:text-brand-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mb-4">{SAMPLE_TESTS.length} tests found</p>

            <div className="space-y-3">
              {SAMPLE_TESTS.map((test) => (
                <div key={test.code} className="card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {test.popular && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Popular</span>
                        )}
                        <span className="text-xs text-gray-400 font-mono">{test.code}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">{test.category}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base font-display">{test.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.tat}h report</span>
                        <span className="flex items-center gap-1"><FlaskConical className="h-3 w-3" /> {test.sample}</span>
                        <span className="flex items-center gap-1"><Home className="h-3 w-3 text-green-600" /> Home collection available</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 font-display">{formatCurrency(test.price)}</div>
                        {test.mrp > test.price && (
                          <div className="text-xs text-gray-400 line-through">{formatCurrency(test.mrp)}</div>
                        )}
                      </div>
                      <Link
                        href={`/book-test/schedule?test=${test.code}`}
                        className="btn-primary text-xs px-4 py-2"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
