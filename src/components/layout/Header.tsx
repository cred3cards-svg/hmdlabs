"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  FlaskConical,
  Award,
  Clock,
  ChevronDown,
  Phone,
  User,
  Package,
  Upload,
  Download,
  MapPin,
  Activity,
  Stethoscope,
  Building2,
  BookOpen,
  Handshake,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Services",
    children: [
      { label: "Book a Test", href: "/book-test", icon: FlaskConical, desc: "800+ tests available" },
      { label: "Health Packages", href: "/health-packages", icon: Package, desc: "Curated for WB patients" },
      { label: "Upload Prescription", href: "/upload-prescription", icon: Upload, desc: "Doctor-ordered tests" },
      { label: "Download Report", href: "/download-report", icon: Download, desc: "Secure OTP access" },
      { label: "Track Sample", href: "/track-sample", icon: Activity, desc: "Live status updates" },
      { label: "Lab Locator", href: "/lab-locator", icon: MapPin, desc: "Find nearest center" },
    ],
  },
  {
    label: "Partners",
    children: [
      { label: "Franchise Opportunity", href: "/partner-with-us", icon: Handshake, desc: "Own a HMD Labs center" },
      { label: "Doctors & Clinics", href: "/doctors-clinics", icon: Stethoscope, desc: "Refer patients, earn more" },
    ],
  },
  { label: "Company", href: "/company" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/hmd-logo.png" alt="HMD Labs Logo" className="h-10 w-auto" />
          </Link>

          {/* Trust badges – desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="bg-white rounded p-1 shadow-sm border border-gray-100 flex items-center justify-center">
              <img src="/nabl-logo.png" alt="NABL Accredited" className="h-8 w-auto mix-blend-multiply" />
            </div>
            <span className="badge-24x7">
              <Clock className="h-3 w-3" />
              24×7 Operations
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-700 transition-colors">
                    {item.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openDropdown === item.label && "rotate-180")} />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors group",
                            pathname === child.href && "bg-brand-50",
                          )}
                        >
                          <div className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                            pathname === child.href ? "bg-brand-100 text-brand-700" : "bg-gray-100 text-gray-500 group-hover:bg-brand-100 group-hover:text-brand-700"
                          )}>
                            <child.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{child.label}</div>
                            <div className="text-xs text-gray-500">{child.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-brand-700",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* CTA actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:03312345678"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>033-1234-5678</span>
            </a>
            <Link href="/book-test" className="btn-primary text-xs px-4 py-2">
              Book Now
            </Link>
            <Link href="/login" className="btn-secondary text-xs px-4 py-2">
              <User className="h-4 w-4" />
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white pb-4 animate-fade-in">
          <div className="section-container pt-3 space-y-1">
            {/* Trust badges mobile */}
            <div className="flex gap-2 pb-3 pt-1">
              <div className="bg-white rounded p-1 border border-gray-100 flex items-center justify-center shrink-0">
                <img src="/nabl-logo.png" alt="NABL Accredited" className="h-6 w-auto mix-blend-multiply" />
              </div>
              <span className="badge-24x7 text-[10px]">
                <Clock className="h-2.5 w-2.5" />
                24×7 Open
              </span>
            </div>

            {[
              { label: "Book a Test", href: "/book-test", icon: FlaskConical },
              { label: "Health Packages", href: "/health-packages", icon: Package },
              { label: "Upload Prescription", href: "/upload-prescription", icon: Upload },
              { label: "Download Report", href: "/download-report", icon: Download },
              { label: "Track Sample", href: "/track-sample", icon: Activity },
              { label: "Lab Locator", href: "/lab-locator", icon: MapPin },
              { label: "Franchise Opportunity", href: "/partner-with-us", icon: Handshake },
              { label: "Doctors & Clinics", href: "/doctors-clinics", icon: Stethoscope },
              { label: "Company", href: "/company", icon: Building2 },
              { label: "Knowledge Hub", href: "/knowledge-hub", icon: BookOpen },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}

            <div className="pt-3 flex gap-2">
              <Link href="/book-test" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-sm justify-center">
                Book Now
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-sm justify-center">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
