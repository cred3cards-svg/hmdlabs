import { Star, MapPin } from "lucide-react";

const TESTIMONIALS = [
  { name: "Subrata Chakraborty", city: "Howrah", rating: 5, text: "Got my cardiac panel done at HMD Labs Howrah. Results were ready in 6 hours. Doctors at SSKM appreciated the quality of the report. Truly world-class!" },
  { name: "Priyanka Mondal", city: "Nadia", rating: 5, text: "Home collection at 6am, report by afternoon. The phlebotomist was professional and the WhatsApp OTP download was seamless. Highly recommended." },
  { name: "Dr. Arun Ghosh", city: "Kolkata (Medical)", rating: 5, text: "As a physician, I insist on NABL-certified results. HMD Labs' accuracy and turnaround time are exceptional. I refer all my patients here." },
  { name: "Mahua Banerjee", city: "Durgapur", rating: 5, text: "Diabetes care package covered everything my diabetologist asked for. The printed report was beautifully formatted and the interpretation guide was helpful." },
  { name: "Rajib Das", city: "Siliguri", rating: 5, text: "Even in Siliguri, HMD Labs has great coverage. The franchise center here is well-equipped. I'm glad WB finally has a truly pan-state lab brand." },
  { name: "Sumitra Roy", city: "Midnapore", rating: 5, text: "My elderly mother needed senior citizen panel done at home. The team was so gentle and caring. Reports came on time. Five stars without hesitation." },
];

export default function TestimonialsSection() {
  return (
    <section className="section-py bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Trusted by Patients Across West Bengal</h2>
          <p className="section-subtitle">5 lakh+ satisfied patients. Real stories, real results.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-1.5 text-sm">
                <div className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
                  {t.name[0]}
                </div>
                <span className="font-medium text-gray-900">{t.name}</span>
                <span className="text-gray-400">·</span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />{t.city}, WB
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
