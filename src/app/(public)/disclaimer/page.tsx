import { Metadata } from "next";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | HMD Labs",
  description: "Important medical disclaimer regarding diagnostic test results and information provided.",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4 text-amber-600">
            <AlertCircle className="h-6 w-6" />
            <span className="text-sm font-bold uppercase tracking-wider">Important Notice</span>
          </div>
          <h1 className="section-title">Medical Disclaimer</h1>
        </div>
      </section>

      <section className="section-py">
        <div className="section-container">
          <div className="prose prose-brand max-w-4xl">
            <p className="lead">
              The information provided on this website and in our diagnostic reports is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            
            <h2>Not Medical Advice</h2>
            <p>Diagnostic test results should always be interpreted by a qualified medical practitioner in the context of the patient's clinical history and symptoms.</p>
            
            <h2>Limitations of Testing</h2>
            <p>While HMD Labs maintains the highest standards of accuracy (NABL Accredited), no diagnostic test is 100% conclusive. Biological variations and technical limitations may occasionally affect results.</p>
            
            <h2>Emergency Situations</h2>
            <p>Our services are for routine diagnostics. In case of a medical emergency, please contact your nearest hospital or emergency services immediately.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
