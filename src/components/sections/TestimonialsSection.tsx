import { Star, MapPin } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    take: 6
  });

  return (
    <section className="section-py bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Trusted by Patients Across West Bengal</h2>
          <p className="section-subtitle">5 lakh+ satisfied patients. Real stories, real results.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-6">
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
