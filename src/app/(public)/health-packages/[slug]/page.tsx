import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatCurrency, calculateDiscountPct } from "@/lib/utils";
import { CheckCircle2, Clock, Home, Award, AlertCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await prisma.package.findUnique({
    where: { slug: params.slug },
  });

  if (!pkg) return { title: "Package Not Found" };

  return {
    title: `${pkg.name} – Health Package | HMD Labs`,
    description: pkg.description || `Book the ${pkg.name} health package online at HMD Labs.`,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const pkg = await prisma.package.findUnique({
    where: { slug: params.slug, isActive: true },
    include: {
      tests: {
        include: {
          test: {
            include: { category: true }
          }
        }
      }
    }
  });

  if (!pkg) notFound();

  const discount = calculateDiscountPct(pkg.mrpPrice, pkg.discountedPrice);
  const tests = pkg.tests.map(pt => pt.test);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs / Back */}
      <div className="bg-white border-b">
        <div className="section-container py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span>/</span>
          <Link href="/health-packages" className="hover:text-brand-700">Health Packages</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{pkg.name}</span>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="badge-nabl text-xs"><Award className="h-3 w-3" />NABL Accredited</span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {pkg.targetGroup || "All Patients"}
                </span>
              </div>
              <h1 className="text-3xl font-bold font-display text-gray-900 sm:text-4xl">{pkg.name}</h1>
              <p className="mt-4 text-gray-600 leading-relaxed">{pkg.description}</p>
              
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Home className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Sample</p>
                    <p className="text-sm font-semibold">Home Collection</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Reports</p>
                    <p className="text-sm font-semibold">Same Day/24h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Prep</p>
                    <p className="text-sm font-semibold">10-12h Fasting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test List */}
            <div className="card p-8">
              <h2 className="text-xl font-bold font-display mb-6">Included Tests ({tests.length})</h2>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {tests.map((test) => (
                  <div key={test.id} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{test.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tight">{test.category?.name || "General"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 border-2 border-brand-100 bg-brand-50/10">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900 font-display">{formatCurrency(pkg.discountedPrice)}</span>
                  {discount > 0 && (
                    <span className="text-lg text-gray-400 line-through">{formatCurrency(pkg.mrpPrice)}</span>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-sm font-bold text-green-600">Save {discount}% Today</p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500">Service Area</span>
                  <span className="font-semibold">Pan West Bengal</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500">Method</span>
                  <span className="font-semibold">Cash on Collection</span>
                </div>
              </div>

              <Link
                href={`/book-test/schedule?package=${pkg.slug}`}
                className="btn-primary w-full justify-center text-lg py-4"
              >
                Book Package
              </Link>
              
              <p className="mt-4 text-center text-[10px] text-gray-500">
                Book now to get a confirmation call within 15 minutes. 24x7 service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
