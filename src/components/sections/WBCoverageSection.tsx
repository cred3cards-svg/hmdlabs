// WBCoverageSection
import Link from "next/link";
import { MapPin } from "lucide-react";
import { WB_DISTRICTS } from "@/lib/utils";

export default function WBCoverageSection() {
  return (
    <section className="section-py bg-brand-950 text-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <MapPin className="h-8 w-8 text-amber-400 mx-auto mb-3" />
          <h2 className="text-3xl font-bold font-display sm:text-4xl">
            Covering All 23 Districts of West Bengal
          </h2>
          <p className="mt-4 text-brand-300 text-lg max-w-2xl mx-auto">
            From the hills of Darjeeling to the Sundarbans delta — HMD Labs is everywhere, always open.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {WB_DISTRICTS.map((district) => (
            <Link
              key={district}
              href={`/lab-locator?district=${encodeURIComponent(district)}`}
              className="flex items-center gap-1.5 rounded-full border border-brand-700 bg-brand-900 px-3 py-1.5 text-sm text-brand-300 hover:border-amber-400 hover:text-amber-300 transition-colors"
            >
              <MapPin className="h-3 w-3" />
              {district}
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/lab-locator" className="btn-accent">
            Find Your Nearest Lab
          </Link>
        </div>
      </div>
    </section>
  );
}
