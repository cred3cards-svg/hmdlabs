import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { formatCurrency, calculateDiscountPct } from "@/lib/utils";
import prisma from "@/lib/prisma";

export default async function HealthPackagesSection() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    include: { tests: { include: { test: true } } },
    take: 6,
    orderBy: { sortOrder: 'asc' }
  });

  // Function to assign arbitrary color based on index or category
  const colors = [
    "border-blue-200 bg-blue-50/50",
    "border-brand-300 bg-brand-50/50",
    "border-orange-200 bg-orange-50/50",
    "border-red-200 bg-red-50/50",
    "border-pink-200 bg-pink-50/50",
    "border-emerald-200 bg-emerald-50/50"
  ];

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
          {packages.map((pkg, idx) => {
            const discount = calculateDiscountPct(pkg.mrpPrice, pkg.discountedPrice);
            const color = colors[idx % colors.length];
            const testNames = pkg.tests.map(pt => pt.test.name);
            
            return (
              <div
                key={pkg.slug}
                className={`relative rounded-2xl border-2 p-6 transition-shadow hover:shadow-card-hover ${color} ${pkg.isFeatured ? "ring-2 ring-brand-500/30" : ""}`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 left-5 rounded-full bg-brand-700 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">{pkg.targetGroup || "All Patients"}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5 font-display">{pkg.name}</h3>
                  </div>
                  {discount > 0 && (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900 font-display">{formatCurrency(pkg.discountedPrice)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatCurrency(pkg.mrpPrice)}</span>
                </div>

                <ul className="mb-5 space-y-1.5">
                  {testNames.slice(0, 5).map((tName) => (
                    <li key={tName} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-600" />
                      {tName}
                    </li>
                  ))}
                  {testNames.length > 5 && (
                    <li className="text-xs text-brand-600 font-medium ml-5.5">
                      +{testNames.length - 5} more tests
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
