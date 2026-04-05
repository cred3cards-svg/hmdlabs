import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, Building2, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact HMD Labs – West Bengal | 24×7 Customer Support",
  description:
    "Get in touch with HMD Labs, West Bengal's NABL accredited diagnostic laboratory. Call, email or visit us 24×7. Corporate and media enquiries welcome.",
};

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    title: "Call Us (24×7)",
    value: "033-1234-5678",
    sub: "Toll-free · Available round the clock",
    action: "tel:03312345678",
    color: "bg-brand-50 text-brand-700",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+91 98765 43210",
    sub: "Quick response on WhatsApp",
    action: "https://wa.me/919876543210",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@hmdlabs.in",
    sub: "We respond within 2 hours",
    action: "mailto:support@hmdlabs.in",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: MapPin,
    title: "Corporate Office",
    value: "Salt Lake, Sector V, Kolkata – 700091",
    sub: "West Bengal, India",
    action: "https://maps.google.com",
    color: "bg-amber-50 text-amber-700",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-900 text-white py-12">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-6 w-6 text-amber-400" />
            <span className="badge-24x7 text-xs">24×7 Support</span>
          </div>
          <h1 className="text-3xl font-bold font-display sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-brand-200">
            Our team is available round the clock to assist patients, partners and corporates across West Bengal.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left – channels + form */}
          <div>
            <h2 className="text-xl font-bold font-display text-gray-900 mb-6">Get in Touch</h2>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              {CONTACT_CHANNELS.map((ch) => (
                <a
                  key={ch.title}
                  href={ch.action}
                  target={ch.action.startsWith("http") ? "_blank" : undefined}
                  rel={ch.action.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card p-4 flex items-start gap-3 hover:-translate-y-0.5 transition-transform"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ch.color} shrink-0`}>
                    <ch.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">{ch.title}</div>
                    <div className="text-sm font-semibold text-gray-900">{ch.value}</div>
                    <div className="text-xs text-gray-400">{ch.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact form */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4 font-display">Send a Message</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label">Full Name *</label>
                    <input type="text" className="input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label">Phone *</label>
                    <input type="tel" className="input" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="label">Subject</label>
                  <select className="input">
                    <option value="">Select enquiry type</option>
                    <option>General Enquiry</option>
                    <option>Test / Report Query</option>
                    <option>Corporate Tie-Up</option>
                    <option>Franchise Enquiry</option>
                    <option>Media / Press</option>
                    <option>Grievance / Complaint</option>
                  </select>
                </div>
                <div>
                  <label className="label">Message *</label>
                  <textarea className="input min-h-[100px] resize-none" placeholder="How can we help you?" />
                </div>
                <button className="btn-primary w-full">Send Message</button>
              </div>
            </div>
          </div>

          {/* Right – info panels */}
          <div className="space-y-6">
            {/* Operating hours */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 font-display">Operating Hours</h3>
                  <p className="text-xs text-gray-500">All locations, year-round</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Sample Collection", time: "24×7 (Home Collection)" },
                  { day: "Main Lab (Kolkata)", time: "24×7 · 365 days" },
                  { day: "Collection Centers", time: "6:00 AM – 10:00 PM" },
                  { day: "Customer Support", time: "24×7" },
                  { day: "Report Download", time: "24×7 (Online)" },
                ].map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{day}</span>
                    <span className="font-medium text-gray-900">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate enquiry */}
            <div className="card p-6 border-l-4 border-l-brand-700">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="h-5 w-5 text-brand-700" />
                <h3 className="font-semibold text-gray-900 font-display">Corporate Enquiries</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Looking to set up employee health programs or corporate diagnostics for your West Bengal offices?
              </p>
              <a href="mailto:corporate@hmdlabs.in" className="text-sm font-semibold text-brand-700 hover:underline">
                corporate@hmdlabs.in →
              </a>
            </div>

            {/* NABL notice */}
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 font-display mb-1">NABL Accredited Laboratory</h4>
                  <p className="text-sm text-amber-800">
                    HMD Labs holds NABL accreditation under ISO 15189:2022. All tests are conducted under 
                    strict quality protocols. For accreditation certificate enquiries, email{" "}
                    <a href="mailto:quality@hmdlabs.in" className="font-medium underline">
                      quality@hmdlabs.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
