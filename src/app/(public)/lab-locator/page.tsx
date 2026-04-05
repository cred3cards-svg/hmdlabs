import type { Metadata } from "next";
import { MapPin, Phone, Clock, Award, Search } from "lucide-react";
import { WB_DISTRICTS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Lab Locator – Find HMD Labs Near You in West Bengal",
  description: "Find HMD Labs collection centers and diagnostic labs across all 23 districts of West Bengal. 200+ locations open 24×7.",
};

const LABS = [
  { name: "HMD Labs – Kolkata Central", address: "12A, Park Street, Kolkata – 700016", district: "Kolkata", phone: "033-1234-5678", hours: "24×7", type: "Main Lab", isNABL: true, is24x7: true },
  { name: "HMD Labs – Howrah Hub", address: "45, GT Road, Howrah – 711101", district: "Howrah", phone: "033-9876-5432", hours: "6AM–10PM", type: "Mini Lab", isNABL: true, is24x7: false },
  { name: "HMD Labs – Salt Lake", address: "BD-22, Sector I, Salt Lake, Kolkata – 700064", district: "Kolkata", phone: "033-1111-2222", hours: "24×7", type: "Collection Center", isNABL: false, is24x7: true },
  { name: "HMD Labs – Durgapur", address: "City Centre, Durgapur – 713216", district: "Paschim Bardhaman", phone: "0343-1234-567", hours: "7AM–9PM", type: "Mini Lab", isNABL: true, is24x7: false },
  { name: "HMD Labs – Siliguri", address: "Hill Cart Road, Siliguri – 734001", district: "Darjeeling", phone: "0353-1234-567", hours: "6AM–10PM", type: "Full Lab", isNABL: true, is24x7: false },
  { name: "HMD Labs – Asansol", address: "GT Road, Asansol – 713301", district: "Paschim Bardhaman", phone: "0341-1234-567", hours: "7AM–9PM", type: "Collection Center", isNABL: false, is24x7: false },
];

export default function LabLocatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-900 text-white py-12">
        <div className="section-container">
          <MapPin className="h-7 w-7 text-amber-400 mb-3" />
          <h1 className="text-3xl font-bold font-display sm:text-4xl">Find a Lab Near You</h1>
          <p className="mt-2 text-brand-200">200+ collection centers across all 23 districts of West Bengal.</p>

          <div className="mt-6 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search by district, city, or pincode..." className="w-full rounded-xl bg-white pl-10 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none" />
            </div>
            <button className="btn-accent shrink-0">Search</button>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          <button className="shrink-0 rounded-full bg-brand-700 px-4 py-1.5 text-sm font-medium text-white">All Districts</button>
          {WB_DISTRICTS.slice(0, 10).map((d) => (
            <button key={d} className="shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-brand-300 hover:text-brand-700 transition-colors">{d}</button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LABS.map((lab) => (
            <div key={lab.name} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {lab.isNABL && <span className="badge-nabl text-[10px]"><Award className="h-2.5 w-2.5" />NABL</span>}
                    {lab.is24x7 && <span className="badge-24x7 text-[10px]"><Clock className="h-2.5 w-2.5" />24×7</span>}
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">{lab.type}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm font-display">{lab.name}</h3>
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-gray-500">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>{lab.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-600 shrink-0" />
                  <a href={`tel:${lab.phone}`} className="hover:text-brand-700 transition-colors">{lab.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-600 shrink-0" />
                  <span>{lab.hours}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(lab.address)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 text-xs py-2 justify-center">
                  Get Directions
                </a>
                <a href={`tel:${lab.phone}`} className="btn-primary flex-1 text-xs py-2 justify-center">
                  Call Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
