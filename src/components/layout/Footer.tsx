import Link from "next/link";
import { FlaskConical, Award, Clock, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const FOOTER_LINKS = {
  Services: [
    { label: "Book a Test", href: "/book-test" },
    { label: "Health Packages", href: "/health-packages" },
    { label: "Upload Prescription", href: "/upload-prescription" },
    // { label: "Download Report", href: "/download-report" },
    { label: "Track Your Sample", href: "/track-sample" },
    { label: "Find a Lab", href: "/lab-locator" },
  ],
  Partners: [
    { label: "Franchise Opportunity", href: "/partner-with-us" },
    { label: "Doctors & Clinics", href: "/doctors-clinics" },
    { label: "Corporate Wellness", href: "/partner-with-us#corporate" },
    { label: "Partner Portal", href: "/partner-portal" },
  ],
  Company: [
    { label: "About HMD Labs", href: "/company" },
    { label: "NABL Accreditation", href: "/company#nabl" },
    { label: "Leadership Team", href: "/company#team" },
    { label: "Careers", href: "/company#careers" },
    { label: "CSR Initiatives", href: "/company#csr" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const WB_DISTRICTS = [
  "Kolkata", "Howrah", "Hooghly", "North 24 Parganas", "South 24 Parganas",
  "Nadia", "Murshidabad", "Birbhum", "Burdwan", "Bankura",
  "Midnapore", "Darjeeling", "Jalpaiguri", "Malda",
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Trust strip */}
      <div className="border-b border-gray-800 bg-brand-950">
        <div className="section-container py-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Award, title: "Fully NABL Accredited", sub: "ISO 15189 Certified Lab", isNabl: true },
              { icon: Clock, title: "24×7 Operations", sub: "Never Closed, Always Serving" },
              { icon: MapPin, title: "All 23 Districts", sub: "West Bengal Coverage" },
              { icon: FlaskConical, title: "800+ Tests", sub: "Comprehensive Diagnostics" },
            ].map(({ icon: Icon, title, sub, isNabl }) => (
              <div key={title} className="flex items-start gap-3">
                {isNabl ? (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white rounded-xl p-0.5 shadow-sm">
                    <img src="/nabl-logo.png" alt="NABL" className="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-800">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-white font-display">{title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-xl max-w-fit">
              <img src="/hmd-logo.png" alt="HMD Labs Logo" className="h-10 w-auto" />
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              West Bengal's most trusted NABL accredited diagnostic laboratory. Committed to accuracy, 
              compassion, and accessibility across all 23 districts — 24 hours a day, 7 days a week.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm">
              <a href="tel:7980701285" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-brand-400 shrink-0" />
                +91 79807 01285
              </a>
              <a href="mailto:support@hmdlabs.in" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-brand-400 shrink-0" />
                support@hmdlabs.in
              </a>
              <div className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Health Max Diagnostic Pvt. Ltd., 3, Chowringhee Terrace, Gokhale Road, Kolkata, West Bengal - 700020, India</span>
              </div>
            </div>

            {/* Social media */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-brand-700 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold font-display text-white mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* WB Districts served */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Serving All Districts of West Bengal
          </h4>
          <div className="flex flex-wrap gap-2">
            {WB_DISTRICTS.map((d) => (
              <Link
                key={d}
                href={`/lab-locator?district=${encodeURIComponent(d)}`}
                className="rounded-lg bg-gray-900 px-2.5 py-1 text-xs text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
              >
                {d}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="section-container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} HMD Labs Pvt. Ltd. All rights reserved. | NABL Accreditation No. MC-XXXX</p>
            <div className="flex items-center gap-2">
              <div className="bg-white rounded p-0.5 max-h-5 object-contain flex items-center shrink-0">
                <img src="/nabl-logo.png" alt="NABL Accredited" className="h-4 w-auto mix-blend-multiply" />
              </div>
              <span className="badge-24x7 text-[10px]">
                <Clock className="h-2.5 w-2.5" />
                24×7
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
