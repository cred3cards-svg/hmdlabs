import Link from "next/link";
import { ArrowRight, Clock, FlaskConical } from "lucide-react";
import { formatCurrency, calculateDiscountPct } from "@/lib/utils";
import prisma from "@/lib/prisma";

export default async function PopularTestsSection() {
  const tests = await prisma.test.findMany({
    where: { isPopular: true, isActive: true },
    include: { category: true },
    orderBy: { code: 'asc' },
    take: 8
  });

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
          {tests.map((test) => {
            const discount = calculateDiscountPct(test.mrpPrice, test.discountedPrice);
            return (
              <div key={test.id} className="card p-5 flex flex-col gap-3">
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
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                    {test.category?.name || "General"}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug font-display">{test.name}</h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  {test.turnaroundTime}h report · {test.sampleType}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900 font-display">{formatCurrency(test.discountedPrice)}</span>
                    {test.mrpPrice > test.discountedPrice && (
                      <span className="ml-1.5 text-xs text-gray-400 line-through">{formatCurrency(test.mrpPrice)}</span>
                    )}
                  </div>
                  <Link href={`/book-test?test=${test.slug}`} className="btn-primary text-xs px-3 py-2">
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
