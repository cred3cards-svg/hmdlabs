"use client";

import Link from "next/link";
import { FlaskConical, Award, Clock, MapPin, ArrowRight, Search, Upload, Download, Activity } from "lucide-react";
import { WB_DISTRICTS } from "@/lib/utils";

const QUICK_ACTIONS = [
  { label: "Book a Test", href: "/book-test", icon: FlaskConical, color: "bg-brand-50 text-brand-700 hover:bg-brand-100" },
  { label: "Upload Rx", href: "/upload-prescription", icon: Upload, color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
  { label: "Get Report", href: "/download-report", icon: Download, color: "bg-green-50 text-green-700 hover:bg-green-100" },
  { label: "Track Sample", href: "/track-sample", icon: Activity, color: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
];

const POPULAR_TESTS = ["CBC", "LFT", "KFT", "Thyroid (T3/T4/TSH)", "HbA1c", "Lipid Profile", "Vitamin D", "Vitamin B12"];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-brand-600/20 blur-2xl" />
      </div>

      <div className="section-container relative z-10 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left – hero copy */}
          <div className="text-white animate-fade-in">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="badge-nabl">
                <Award className="h-3 w-3" />
                Fully NABL Accredited
              </span>
              <span className="badge-24x7">
                <Clock className="h-3 w-3" />
                24×7 Operations
              </span>
              <span className="badge-wb">
                <MapPin className="h-3 w-3" />
                West Bengal Only
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight font-display sm:text-5xl lg:text-6xl">
              West Bengal's{" "}
              <span className="text-amber-400">Most Trusted</span>{" "}
              Diagnostic Lab
            </h1>

            <p className="mt-5 text-lg text-brand-200 leading-relaxed max-w-lg">
              NABL accredited precision diagnostics across all 23 districts of West Bengal. 
              Home sample collection, 800+ tests, and reports in your hands — 24 hours, every day.
            </p>

            {/* Search bar */}
            <div className="mt-8 flex max-w-lg gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tests, packages..."
                  className="w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-4 py-3.5 text-sm text-white placeholder-brand-300 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <Link href="/book-test" className="btn-accent px-5 shrink-0">
                Search
              </Link>
            </div>

            {/* Popular tests */}
            <div className="mt-5">
              <span className="text-xs text-brand-400 uppercase tracking-wider">Popular:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {POPULAR_TESTS.map((test) => (
                  <Link
                    key={test}
                    href={`/book-test?q=${encodeURIComponent(test)}`}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-brand-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {test}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-white hover:bg-white/15 transition-colors border border-white/10 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right – stats & district selector */}
          <div className="space-y-4 animate-slide-in lg:pl-8">
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "800+", label: "Diagnostic Tests", icon: FlaskConical },
                { value: "23", label: "WB Districts Covered", icon: MapPin },
                { value: "24×7", label: "Always Open", icon: Clock },
                { value: "NABL", label: "Accredited Lab", icon: Award },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-4 text-white">
                  <Icon className="h-5 w-5 text-amber-400 mb-2" />
                  <div className="text-2xl font-bold font-display text-white">{value}</div>
                  <div className="text-xs text-brand-300 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* District quick selector */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-5">
              <h3 className="text-sm font-semibold text-white mb-3 font-display">
                Find a Lab in Your District
              </h3>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto scrollbar-thin">
                {WB_DISTRICTS.map((d) => (
                  <Link
                    key={d}
                    href={`/lab-locator?district=${encodeURIComponent(d)}`}
                    className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-brand-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {d}
                  </Link>
                ))}
              </div>
            </div>

            {/* Partner CTA */}
            <Link
              href="/partner-with-us"
              className="flex items-center justify-between rounded-2xl bg-amber-500/20 border border-amber-400/30 p-4 hover:bg-amber-500/30 transition-colors group"
            >
              <div>
                <div className="text-sm font-semibold text-amber-300 font-display">Own a HMD Labs Franchise</div>
                <div className="text-xs text-amber-400/80 mt-0.5">Earn ₹3–12L/month. Apply now →</div>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
