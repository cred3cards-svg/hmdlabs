import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, CheckCircle2, TrendingUp, Phone, Mail, Award, Users, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Doctors & Clinics – Partner with HMD Labs West Bengal",
  description: "Refer patients to HMD Labs and earn referral benefits. NABL-accredited results, 24×7 pick-up from your clinic across West Bengal.",
};

const BENEFITS = [
  "Free pick-up from your clinic — 24×7",
  "Priority reporting for referred patients",
  "NABL-certified reports in your format",
  "Direct WhatsApp/SMS report delivery",
  "Monthly performance summary",
  "Dedicated relationship manager",
  "Panel rate with zero minimum commitment",
  "CME workshops access",
];

export default function DoctorsClinicsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-14">
        <div className="section-container">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-6 w-6 text-amber-400" />
            <span className="badge-nabl text-xs"><Award className="h-3 w-3" />NABL Certified Partner Lab</span>
          </div>
          <h1 className="text-4xl font-bold font-display sm:text-5xl max-w-2xl">
            Partner with HMD Labs for Your Patients
          </h1>
          <p className="mt-4 text-brand-200 max-w-xl text-lg">
            Join 1,000+ doctors and clinics across West Bengal who trust HMD Labs for diagnostic excellence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#enroll" className="btn-accent">Enroll Your Clinic</a>
            <a href="tel:03312345678" className="btn-ghost border border-white/20 text-white hover:bg-white/10 flex items-center gap-2">
              <Phone className="h-4 w-4" /> Talk to Our Team
            </a>
          </div>
        </div>
      </div>

      <div className="section-container section-py">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title mb-5">Why Doctors Choose HMD Labs</h2>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="enroll" className="card p-7 space-y-5">
            <h3 className="text-xl font-bold font-display text-gray-900">Enroll Your Practice</h3>
            <div className="grid gap-4">
              <div>
                <label className="label">Doctor / Clinic Name *</label>
                <input type="text" className="input" placeholder="Dr. / Clinic name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Mobile *</label>
                  <input type="tel" className="input" placeholder="10-digit" maxLength={10} />
                </div>
                <div>
                  <label className="label">Specialisation</label>
                  <input type="text" className="input" placeholder="e.g. General" />
                </div>
              </div>
              <div>
                <label className="label">Clinic Address *</label>
                <input type="text" className="input" placeholder="Full address" />
              </div>
              <div>
                <label className="label">District *</label>
                <select className="input">
                  <option value="">Select WB district</option>
                  {["Kolkata","Howrah","Hooghly","North 24 Parganas","Nadia","Murshidabad"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <button className="btn-primary w-full justify-center">
                Submit Enrollment Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
