import { Metadata } from "next";
import { FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | HMD Labs",
  description: "Terms and conditions for using HMD Labs diagnostic services and website.",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4 text-brand-600">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-wider">Legal Framework</span>
          </div>
          <h1 className="section-title">Terms of Service</h1>
          <p className="section-subtitle max-w-2xl">
            Please read these terms carefully before using our diagnostic services.
          </p>
        </div>
      </section>

      <section className="section-py">
        <div className="section-container">
          <div className="prose prose-brand max-w-4xl">
            <h2>1. Agreement to Terms</h2>
            <p>By accessing our website and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            
            <h2>2. Service Provision</h2>
            <p>HMD Labs provides diagnostic testing services. We reserve the right to refuse service or cancel bookings at our discretion, particularly if safety protocols cannot be met.</p>
            
            <h2>3. Accuracy of Information</h2>
            <p>Users are responsible for providing accurate personal and medical information. Inaccurate information may lead to incorrect diagnostic interpretations for which HMD Labs cannot be held liable.</p>

            <h2>4. Payments and Cancellations</h2>
            <p>Payments for tests must be made through authorized channels. Cancellation policies vary by test type and timing of sample collection.</p>
            
            <h2>5. Intellectual Property</h2>
            <p>All content on this website, including logos, text, and graphics, is the property of Health Max Diagnostic Pvt. Ltd. and protected by copyright laws.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
