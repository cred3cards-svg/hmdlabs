import type { Metadata } from "next";
import { Award, Clock, MapPin, Users, Microscope, Heart, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "About HMD Labs – NABL Accredited Diagnostic Lab, West Bengal",
  description: "HMD Labs is West Bengal's premier NABL-accredited diagnostic laboratory founded in 2005. Learn about our mission, leadership, and 24×7 commitment.",
};

export default function CompanyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-brand-950 text-white py-16">
        <div className="section-container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge-nabl"><Award className="h-3 w-3" />NABL Accredited</span>
            <span className="badge-24x7"><Clock className="h-3 w-3" />24×7 Operations</span>
            <span className="badge-wb"><MapPin className="h-3 w-3" />West Bengal</span>
          </div>
          <h1 className="text-4xl font-bold font-display sm:text-5xl">About HMD Labs</h1>
          <p className="mt-4 text-xl text-brand-200 leading-relaxed">
            West Bengal's most trusted NABL-accredited diagnostic laboratory, delivering precision 
            diagnostics with compassion since 2005.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="section-container section-py">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="section-title mb-5">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              HMD Labs was founded with a singular mission: to make world-class diagnostic services 
              accessible to every person in West Bengal — from the crowded lanes of Kolkata to the 
              remote corners of Sundarbans and the tea gardens of Darjeeling.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are a fully NABL-accredited (National Accreditation Board for Testing and Calibration 
              Laboratories) diagnostic facility operating 24 hours a day, 365 days a year. Our ISO 
              15189 certification guarantees that every result we deliver meets international quality standards.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With over 200 collection centers across all 23 districts of West Bengal, we have served 
              more than 5 lakh patients and continue to grow — building West Bengal's most comprehensive 
              diagnostic network.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FlaskConical, value: "800+", label: "Tests Available", color: "bg-brand-50 text-brand-700" },
              { icon: MapPin, value: "23 Districts", label: "WB Coverage", color: "bg-green-50 text-green-700" },
              { icon: Users, value: "5L+", label: "Patients Served", color: "bg-amber-50 text-amber-700" },
              { icon: Award, value: "NABL", label: "Accredited Lab", color: "bg-purple-50 text-purple-700" },
              { icon: Clock, value: "24×7", label: "Always Open", color: "bg-blue-50 text-blue-700" },
              { icon: Microscope, value: "99.9%", label: "Accuracy Rate", color: "bg-rose-50 text-rose-700" },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="card p-5 text-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl mx-auto mb-3 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold font-display text-gray-900">{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NABL Section */}
      <div id="nabl" className="bg-amber-50 border-y border-amber-100 section-py">
        <div className="section-container text-center max-w-3xl">
          <Award className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h2 className="section-title">Fully NABL Accredited</h2>
          <p className="section-subtitle">
            NABL (National Accreditation Board for Testing and Calibration Laboratories) is the 
            highest accreditation a diagnostic laboratory can achieve in India. Our accreditation 
            ensures that every test result you receive has been produced under internationally 
            validated conditions, with full traceability and quality assurance.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white border border-amber-200 px-6 py-4 shadow-sm">
            <Award className="h-8 w-8 text-amber-600" />
            <div className="text-left">
              <div className="font-bold text-gray-900 font-display">NABL Accreditation No. MC-XXXX</div>
              <div className="text-sm text-gray-500">ISO 15189 · Valid until December 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-container section-py">
        <h2 className="section-title text-center mb-10">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Microscope, title: "Scientific Precision", desc: "Every test is performed with the highest analytical rigour. We use internationally validated reagents and maintain strict quality control protocols." },
            { icon: Heart, title: "Patient Compassion", desc: "Diagnostics is not just science — it's care. Our trained staff treat every patient with dignity, empathy, and respect." },
            { icon: MapPin, title: "West Bengal First", desc: "We are built for Bengal. Our service area, pricing, infrastructure, and support are designed for the unique needs of West Bengal's population." },
            { icon: Clock, title: "24×7 Commitment", desc: "Illness doesn't follow business hours. Neither do we. Our operations — collection, processing, and reporting — run around the clock." },
            { icon: Award, title: "Quality Without Compromise", desc: "Our NABL accreditation is not a badge — it's a daily practice. We undergo regular audits to maintain the highest standards." },
            { icon: Users, title: "Community Health", desc: "We invest in health camps, affordable screening programs, and community outreach across rural and semi-urban West Bengal." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 mb-4">
                <Icon className="h-5 w-5 text-brand-700" />
              </div>
              <h3 className="text-base font-bold font-display text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
