import Link from "next/link";
import { ArrowRight, Clock, FlaskConical } from "lucide-react";
import { formatCurrency, calculateDiscountPct } from "@/lib/utils";

const POPULAR_TESTS = [
  { name: "Complete Blood Count (CBC)", code: "CBC", mrp: 400, price: 249, tat: 6, sample: "Blood", category: "Haematology" },
  { name: "Liver Function Test (LFT)", code: "LFT", mrp: 650, price: 449, tat: 8, sample: "Blood", category: "Biochemistry" },
  { name: "Kidney Function Test (KFT)", code: "KFT", mrp: 750, price: 499, tat: 8, sample: "Blood", category: "Biochemistry" },
  { name: "Thyroid Profile (T3/T4/TSH)", code: "TFT", mrp: 900, price: 599, tat: 12, sample: "Blood", category: "Endocrinology" },
  { name: "HbA1c (Glycated Haemoglobin)", code: "HBA1C", mrp: 600, price: 399, tat: 6, sample: "Blood", category: "Diabetes" },
  { name: "Lipid Profile", code: "LIPID", mrp: 700, price: 449, tat: 8, sample: "Blood", category: "Cardiology" },
  { name: "Vitamin D (25-OH)", code: "VITD", mrp: 1400, price: 799, tat: 24, sample: "Blood", category: "Vitamins" },
  { name: "Vitamin B12", code: "VITB12", mrp: 1200, price: 699, tat: 24, sample: "Blood", category: "Vitamins" },
];

export default function PopularTestsSection() {
  return (
    <section className="section-py">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Popular Tests</h2>
            <p className="section-subtitle max-w-xl">
              800+ tests available across West Bengal. NABL-accredited results.
            </p>
          </div>
          <Link href="/book-test" className="btn-secondary hidden sm:inline-flex">
            View All Tests
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_TESTS.map((test) => {
            const discount = calculateDiscountPct(test.mrp, test.price);
            return (
              <div key={test.code} className="card p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                    <FlaskConical className="h-5 w-5 text-brand-700" />
                  </div>
                  {discount > 0 && (
                    <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{test.category}</p>
                  <h3 className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug font-display">{test.name}</h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  {test.tat}h report · {test.sample}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900 font-display">{formatCurrency(test.price)}</span>
                    {test.mrp > test.price && (
                      <span className="ml-1.5 text-xs text-gray-400 line-through">{formatCurrency(test.mrp)}</span>
                    )}
                  </div>
                  <Link href={`/book-test?test=${test.code}`} className="btn-primary text-xs px-3 py-2">
                    Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/book-test" className="btn-secondary">
            View All Tests
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
