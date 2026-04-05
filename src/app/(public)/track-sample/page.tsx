"use client";

import { useState } from "react";
import { Activity, CheckCircle2, Clock, Package, FlaskConical, FileText, Truck } from "lucide-react";
import toast from "react-hot-toast";

const STATUS_TIMELINE = [
  { status: "BOOKED", label: "Order Booked", icon: Package },
  { status: "PHLEBOTOMIST_ASSIGNED", label: "Phlebotomist Assigned", icon: Activity },
  { status: "SAMPLE_COLLECTED", label: "Sample Collected", icon: FlaskConical },
  { status: "RECEIVED_AT_LAB", label: "Received at Lab", icon: Truck },
  { status: "PROCESSING_STARTED", label: "Processing Started", icon: Clock },
  { status: "REPORT_GENERATED", label: "Report Ready", icon: FileText },
];

const DEMO_TRACKING = {
  orderNumber: "HMD-K7B2X-A1Z",
  patientName: "Subrata C.",
  status: "PROCESSING_STARTED",
  events: [
    { status: "BOOKED", label: "Order Booked", time: "06 Mar 2026, 8:00 AM", done: true, staffName: "System", note: "Order confirmed. CBC + LFT" },
    { status: "PHLEBOTOMIST_ASSIGNED", label: "Phlebotomist Assigned", time: "06 Mar 2026, 8:15 AM", done: true, staffName: "Ratan Das", note: "ETA: 9:30 AM" },
    { status: "SAMPLE_COLLECTED", label: "Sample Collected", time: "06 Mar 2026, 9:32 AM", done: true, staffName: "Ratan Das", note: "2 tubes collected. Cold chain maintained." },
    { status: "RECEIVED_AT_LAB", label: "Received at Lab", time: "06 Mar 2026, 10:45 AM", done: true, staffName: "Lab Reception – Kolkata", note: "Sample integrity verified." },
    { status: "PROCESSING_STARTED", label: "Processing in Progress", time: "06 Mar 2026, 11:00 AM", done: true, staffName: "Lab Team", note: "Analysis underway." },
    { status: "REPORT_GENERATED", label: "Report Ready", time: "—", done: false, staffName: "", note: "Expected by 5:00 PM today" },
  ],
};

export default function TrackSamplePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof DEMO_TRACKING | null>(null);
  const [loading, setLoading] = useState(false);

  const track = async () => {
    if (!query.trim()) { toast.error("Enter order ID or mobile number"); return; }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setResult(DEMO_TRACKING);
    setLoading(false);
  };

  const currentStepIndex = DEMO_TRACKING.events.findLastIndex((e) => e.done);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 text-white py-12">
        <div className="section-container">
          <Activity className="h-7 w-7 text-amber-400 mb-3" />
          <h1 className="text-3xl font-bold font-display sm:text-4xl">Track Your Sample</h1>
          <p className="mt-2 text-brand-200">Live status updates from collection to report delivery across West Bengal.</p>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="mx-auto max-w-xl">
          {/* Search */}
          <div className="card p-6 mb-8">
            <label className="label text-gray-700">Order ID or Mobile Number</label>
            <div className="flex gap-2 mt-1.5">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && track()}
                className="input flex-1"
                placeholder="e.g. HMD-K7B2X-A1Z or 9876543210"
              />
              <button onClick={track} disabled={loading} className="btn-primary shrink-0">
                {loading ? "..." : "Track"}
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Order</p>
                  <p className="font-mono font-semibold text-gray-900">{result.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Patient</p>
                  <p className="font-semibold text-gray-900">{result.patientName}</p>
                </div>
              </div>

              <div className="space-y-0">
                {result.events.map((event, i) => {
                  const isActive = i === currentStepIndex;
                  const isDone = event.done;
                  const StepIcon = STATUS_TIMELINE[i]?.icon || Activity;

                  return (
                    <div key={event.status} className="flex gap-4">
                      {/* Icon column */}
                      <div className="flex flex-col items-center">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full z-10 ${
                          isDone ? (isActive ? "bg-brand-700 text-white ring-4 ring-brand-100" : "bg-green-600 text-white") : "bg-gray-100 text-gray-400"
                        }`}>
                          {isDone && !isActive ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                        </div>
                        {i < result.events.length - 1 && (
                          <div className={`w-0.5 flex-1 my-1 ${isDone ? "bg-green-400" : "bg-gray-200"}`} style={{ minHeight: 20 }} />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`pb-5 flex-1 ${i === result.events.length - 1 ? "pb-0" : ""}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`text-sm font-semibold ${isDone ? "text-gray-900" : "text-gray-400"} font-display`}>
                              {event.label}
                              {isActive && <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-medium text-brand-700">In Progress</span>}
                            </p>
                            {event.note && <p className="text-xs text-gray-500 mt-0.5">{event.note}</p>}
                            {event.staffName && <p className="text-xs text-gray-400 mt-0.5">By: {event.staffName}</p>}
                          </div>
                          <p className="text-xs text-gray-400 shrink-0 ml-3">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">
                  Expected report: <strong>Today by 5:00 PM</strong> · 24×7 support: 033-1234-5678
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
