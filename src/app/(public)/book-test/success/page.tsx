"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, Phone, Home, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="card p-8 text-center sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <h1 className="mt-6 text-3xl font-bold font-display text-gray-900 sm:text-4xl">Booking Received!</h1>
        <p className="mt-4 text-gray-500">
          Your booking <span className="font-bold text-gray-900">#{orderNumber}</span> has been successfully placed.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 text-left">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm mb-3">
              <Phone className="h-4 w-4 text-brand-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Confirmation Call</h3>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Our support team will call you within <span className="font-bold">15-30 minutes</span> to confirm the appointment.
            </p>
          </div>
          
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm mb-3">
              <Home className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Ready for Collection</h3>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              A phlebotomist will arrive at your address during the selected time slot for sample collection.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary w-full sm:w-auto px-8">
            Back to Home
          </Link>
          <Link href="/track-sample" className="btn-secondary w-full sm:w-auto px-8">
            Track Sample
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <p className="mt-8 text-xs text-gray-400">
          Need help? Call our helpline at <a href="tel:+917980701285" className="font-bold text-brand-600 hover:underline">+91 79807 01285</a>
        </p>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
