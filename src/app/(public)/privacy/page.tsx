import { Metadata } from "next";
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | HMD Labs",
  description: "Learn how HMD Labs collects, uses, and protects your personal and health information. We are committed to your privacy and data security.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 12, 2026";

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-950 py-20 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(51,142,247,0.15),transparent)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>
        
        <div className="section-container relative z-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700/30 ring-1 ring-brand-400/30">
            <Shield className="h-8 w-8 text-brand-400" />
          </div>
          <h1 className="section-title text-white">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100/80">
            Your trust is our most valuable asset. Learn how we handle your data with the highest standards of security and transparency.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-py">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Sidebar Navigation (Sticky) */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-24 space-y-1">
                {[
                  { id: "introduction", label: "Introduction", icon: FileText },
                  { id: "collection", label: "Information We Collect", icon: Eye },
                  { id: "usage", label: "How We Use Information", icon: Lock },
                  { id: "security", label: "Data Security", icon: Shield },
                  { id: "sharing", label: "Third-Party Sharing", icon: MapPin },
                  { id: "contact", label: "Contact Us", icon: Mail },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-brand-700"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-brand">
                <section id="introduction">
                  <h2>1. Introduction</h2>
                  <p>
                    Health Max Diagnostic Pvt. Ltd. ("HMD Labs", "we", "us", or "our") operates the HMD Labs website and mobile applications. This Privacy Policy describes how we collect, use, and protect your personal information when you use our services.
                  </p>
                  <p>
                    By using HMD Labs' services, you agree to the collection and use of information in accordance with this policy. As an NABL accredited laboratory, we adhere to stringent data privacy and security standards mandated for healthcare providers in India.
                  </p>
                </section>

                <hr className="my-12" />

                <section id="collection">
                  <h2>2. Information We Collect</h2>
                  <p>We collect several types of information for various purposes to provide and improve our service to you:</p>
                  
                  <h3>Personal Data</h3>
                  <p>While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including:</p>
                  <ul>
                    <li>Name, Age, and Gender</li>
                    <li>Email address and Phone number</li>
                    <li>Residential address for home collection services</li>
                    <li>Identity proof (where required by law or specific tests)</li>
                  </ul>

                  <h3>Health Information</h3>
                  <p>As a diagnostic service provider, we collect health-related data, including:</p>
                  <ul>
                    <li>Doctor's prescriptions and clinical history</li>
                    <li>Biological samples (Blood, Urine, etc.)</li>
                    <li>Test results and diagnostic reports</li>
                  </ul>
                </section>

                <hr className="my-12" />

                <section id="usage">
                  <h2>3. How We Use Your Information</h2>
                  <p>HMD Labs uses the collected data for various purposes:</p>
                  <ul>
                    <li>To provide diagnostic testing and laboratory services.</li>
                    <li>To process and deliver your diagnostic reports via physical copy, email, or our portal.</li>
                    <li>To schedule home collection visits and manage logistics.</li>
                    <li>To notify you about your sample status and report availability.</li>
                    <li>To provide customer support and respond to inquiries.</li>
                    <li>To comply with regulatory and legal requirements (e.g., NABL guidelines, health department reporting).</li>
                  </ul>
                </section>

                <hr className="my-12" />

                <section id="security">
                  <h2>4. Data Security</h2>
                  <p>
                    The security of your data is important to us. We implement industry-standard security measures to protect your personal and health information. All diagnostic reports are stored in encrypted environments and access is restricted to authorized personnel only.
                  </p>
                  <p>
                    While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. However, our systems are regularly audited as part of our NABL accreditation process.
                  </p>
                </section>

                <hr className="my-12" />

                <section id="sharing">
                  <h2>5. Third-Party Sharing</h2>
                  <p>We do not sell or rent your personal information. We may share your data in the following circumstances:</p>
                  <ul>
                    <li><strong>Service Providers:</strong> With third-party companies that facilitate our services (e.g., logistics partners for sample transport).</li>
                    <li><strong>Legal Requirements:</strong> When required by law or public health authorities (e.g., reporting of certain infectious diseases to the government).</li>
                    <li><strong>With Your Consent:</strong> With your referring physician or healthcare provider as indicated in your booking.</li>
                  </ul>
                </section>

                <hr className="my-12" />

                <section id="contact">
                  <h2>6. Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer:</p>
                  
                  <div className="not-prose mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Mail className="h-5 w-5 text-brand-600" />
                        <a href="mailto:privacy@hmdlabs.in" className="hover:text-brand-700">privacy@hmdlabs.in</a>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="h-5 w-5 text-brand-600" />
                        <span>+91 79807 01285</span>
                      </div>
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                        <span>Health Max Diagnostic Pvt. Ltd., 3, Chowringhee Terrace, Gokhale Road, Kolkata - 700020</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
