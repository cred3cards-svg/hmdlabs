import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Debabrata Saha",
    district: "Burdwan District",
    format: "Collection Center",
    revenue: "₹2.8 Lakh/month",
    quote: "আমি Burdwan-এ একটি Collection Center খুলেছি ৮ মাস আগে। এখন প্রতি মাসে ₹২.৮ লক্ষ আয় হচ্ছে। HMD-এর NABL logo রোগীদের বিশ্বাস দেয়।",
  },
  {
    name: "Dr. Anirban Ghosh",
    district: "Hooghly District",
    format: "Mini Lab",
    revenue: "₹5.5 Lakh/month",
    quote: "Setting up a Mini Lab with HMD was seamless. Their IT systems are top-notch and the reporting quality is something doctors in my area trust completely.",
  },
  {
    name: "Sanjay Chatterjee",
    district: "North 24 Parganas",
    format: "Collection Center",
    revenue: "₹3.2 Lakh/month",
    quote: "The brand recognition of HMD Labs helped me break even in just 4 months. The support team is always available.",
  }
];

export default function FranchiseTestimonials() {
  return (
    <section className="section-py bg-brand-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Partner Stories</h2>
          <p className="section-subtitle mx-auto max-w-xl">
            Hear from our successful franchise partners across West Bengal.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card p-6 flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
              <div>
                <Quote className="h-8 w-8 text-amber-400 mb-4 opacity-50" />
                <p className="text-gray-700 italic text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <p className="font-semibold text-brand-900">{t.name}</p>
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-xs text-gray-500">{t.district} • {t.format}</p>
                  <p className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded w-fit mt-1">
                    Revenue: {t.revenue}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
