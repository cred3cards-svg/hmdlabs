import type { Metadata } from "next";
import { Search, FlaskConical, Filter, Clock, Home, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Book a Diagnostic Test – West Bengal",
  description: "Book 800+ NABL-accredited diagnostic tests online. Home collection across all 23 districts of West Bengal. 24×7 booking available.",
};

export default async function BookTestPage({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const query = searchParams.q || "";
  const categorySlug = searchParams.category || "";

  // Fetch all tests with their categories
  const [tests, categories] = await Promise.all([
    prisma.test.findMany({
      where: {
        isActive: true,
        AND: [
          query ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { code: { contains: query, mode: 'insensitive' } },
            ]
          } : {},
          categorySlug ? {
            category: { slug: categorySlug }
          } : {}
        ]
      },
      include: { category: true },
      orderBy: { name: 'asc' }
    }),
    prisma.testCategory.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-900 text-white py-10">
        <div className="section-container text-center max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FlaskConical className="h-6 w-6 text-amber-400" />
            <span className="badge-nabl text-xs">800+ Tests Available</span>
            <span className="badge-24x7 text-xs">NABL Certified</span>
          </div>
          <h1 className="text-3xl font-bold font-display sm:text-4xl px-4">Book a Diagnostic Test</h1>
          <p className="mt-3 text-brand-200">Home collection across all 23 districts of West Bengal.</p>

          <form action="/book-test" method="GET" className="mt-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                name="q"
                type="text"
                defaultValue={query}
                placeholder="Search by test name, code, or symptom..."
                className="w-full rounded-xl bg-white pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 shadow-sm"
              />
            </div>
            <button type="submit" className="btn-accent shrink-0 px-6">Search</button>
          </form>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Categories</h3>
                {categorySlug && (
                  <Link href="/book-test" className="text-xs text-brand-600 hover:underline">Clear</Link>
                )}
              </div>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <Link 
                  href="/book-test"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    !categorySlug ? "bg-brand-600 text-white shadow-brand shadow-sm" : "bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-700 border border-gray-100"
                  }`}
                >
                  All Categories
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/book-test?category=${cat.slug}${query ? `&q=${query}` : ""}`}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      categorySlug === cat.slug ? "bg-brand-600 text-white shadow-brand shadow-sm" : "bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-700 border border-gray-100"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Test Listing */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500"><span className="font-bold text-gray-900">{tests.length}</span> tests showing</p>
              {query && (
                <Link href="/book-test" className="text-xs text-gray-500 flex items-center gap-1 hover:text-brand-700">
                  <ArrowLeft className="h-3 w-3" /> Clear search results
                </Link>
              )}
            </div>

            {tests.length === 0 ? (
              <div className="card py-16 px-4 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No tests found</h3>
                <p className="text-sm text-gray-500 mt-1">Try another search term or browse by category.</p>
                <Link href="/book-test" className="btn-secondary mt-6 inline-flex">Show All Tests</Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {tests.map((test) => (
                  <div key={test.id} className="card p-5 group hover:border-brand-300 transition-colors">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{test.category?.name || "General"}</p>
                          <h3 className="font-bold text-gray-900 mt-0.5 leading-snug font-display h-10 line-clamp-2">{test.name}</h3>
                        </div>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-mono text-gray-500">{test.code}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-5">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.turnaroundTime}h</span>
                        <span className="flex items-center gap-1"><FlaskConical className="h-3 w-3" /> {test.sampleType}</span>
                        <span className="flex items-center gap-1"><Home className="h-3 w-3 text-green-600" /> Home Collection</span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900 font-display">{formatCurrency(test.discountedPrice)}</p>
                          {test.mrpPrice > test.discountedPrice && (
                            <p className="text-xs text-gray-400 line-through">{formatCurrency(test.mrpPrice)}</p>
                          )}
                        </div>
                        <Link
                          href={`/book-test/schedule?test=${test.slug}`}
                          className="btn-primary text-xs px-5 py-2.5"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
