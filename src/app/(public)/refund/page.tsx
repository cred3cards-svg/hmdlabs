import { Metadata } from "next";
import { RotateCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | HMD Labs",
  description: "Our policy regarding refunds and cancellations for diagnostic services.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="section-container text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <RotateCcw className="h-6 w-6" />
          </div>
          <h1 className="section-title">Refund & Cancellation</h1>
          <p className="section-subtitle mx-auto">
            Transparent policies for your peace of mind.
          </p>
        </div>
      </section>

      <section className="section-py">
        <div className="section-container">
          <div className="prose prose-brand max-w-4xl mx-auto text-center lg:text-left">
            <h2>Cancellation Policy</h2>
            <p>Bookings can be cancelled up to 4 hours before the scheduled home collection time for a full refund.</p>
            
            <h2>Refund Processing</h2>
            <p>Approved refunds will be processed within 5-7 working days to the original payment method.</p>
            
            <h2>Non-refundable Cases</h2>
            <p>Refunds are not applicable once the sample has been collected or the test process has been initiated in the laboratory.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
