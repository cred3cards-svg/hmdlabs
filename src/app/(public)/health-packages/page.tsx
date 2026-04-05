import type { Metadata } from "next";
import Link from "next/link";
import { Award, CheckCircle2, Clock, Home } from "lucide-react";
import { formatCurrency, calculateDiscountPct } from "@/lib/utils";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Health Packages – West Bengal | NABL Accredited | HMD Labs",
  description: "Comprehensive health packages for West Bengal patients. Full body checkup, diabetes, cardiac, women's wellness, and senior citizen panels. Book online.",
};

export default async function HealthPackagesPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    include: { tests: { include: { test: true } } },
    orderBy: { sortOrder: 'asc' }
  });

  const colors = [
    "border-blue-200 bg-blue-50/30",
    "border-brand-300 bg-brand-50/50",
    "border-orange-200 bg-orange-50/30",
    "border-red-200 bg-red-50/30",
    "border-pink-200 bg-pink-50/30",
    "border-emerald-200 bg-emerald-50/30",
    "border-purple-200 bg-purple-50/30",
    "border-teal-200 bg-teal-50/30"
  ];

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
          {packages.map((pkg, idx) => {
            const discount = calculateDiscountPct(pkg.mrpPrice, pkg.discountedPrice);
            const color = colors[idx % colors.length];
            const testNames = pkg.tests.map(pt => pt.test.name);

            return (
              <div key={pkg.id} className={`relative rounded-2xl border-2 p-6 ${color} transition-shadow hover:shadow-card-hover`}>
                {pkg.isFeatured && (
                  <span className="absolute -top-3 left-4 rounded-full bg-brand-700 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs text-gray-500">{pkg.targetGroup || "All Patients"}</span>
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
                  <span className="text-2xl font-bold text-gray-900 font-display">{formatCurrency(pkg.discountedPrice)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatCurrency(pkg.mrpPrice)}</span>
                </div>
                <ul className="mb-5 space-y-1">
                  {testNames.slice(0, 5).map((tName) => (
                    <li key={tName} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-600" />{tName}
                    </li>
                  ))}
                  {testNames.length > 5 && (
                    <li className="text-xs text-brand-600 font-medium pl-5">+{testNames.length - 5} more</li>
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
