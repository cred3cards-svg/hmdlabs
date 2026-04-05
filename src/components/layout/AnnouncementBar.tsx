"use client";

import { Award, Clock, Phone, MapPin } from "lucide-react";

const tickers = [
  { icon: Award, text: "Fully NABL Accredited Laboratory" },
  { icon: Clock, text: "24×7 Operations – Never Closed" },
  { icon: MapPin, text: "Serving All 23 Districts of West Bengal" },
  { icon: Phone, text: "Helpline: 033-1234-5678" },
  { icon: Award, text: "ISO 15189 Certified Quality Management" },
  { icon: Clock, text: "Home Sample Collection Available Round the Clock" },
  { icon: MapPin, text: "200+ Collection Centers Across West Bengal" },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-900 text-white py-2 overflow-hidden relative">
      <div className="ticker-wrap">
        <div className="ticker-inner gap-12">
          {[...tickers, ...tickers].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mr-12 text-xs font-medium tracking-wide">
              <item.icon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="text-gray-100">{item.text}</span>
              <span className="mx-4 text-brand-600">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
