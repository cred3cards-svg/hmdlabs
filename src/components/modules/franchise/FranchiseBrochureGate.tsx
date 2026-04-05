"use client";

import { useState } from "react";
import { Download, Phone, CheckCircle2, FileText, Award } from "lucide-react";
import toast from "react-hot-toast";

type Stage = "phone" | "otp" | "done";

export default function FranchiseBrochureGate() {
  const [stage, setStage] = useState<Stage>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Enter valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, purpose: "brochure" }),
      });
      if (res.ok) {
        setStage("otp");
        toast.success("OTP sent to your mobile");
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, purpose: "brochure" }),
      });
      if (res.ok) {
        setStage("done");
        toast.success("Verified! Your brochure is ready.");
      } else {
        toast.error("Invalid or expired OTP");
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="brochure" className="section-py bg-brand-950">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center text-white">
          <FileText className="h-10 w-10 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-display mb-3">Download Franchise Brochure</h2>
          <p className="text-brand-300 mb-3">
            Get detailed information about investment models, ROI projections, support systems, 
            and the full franchise agreement framework.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs">
            {["Investment & ROI Details", "Legal Framework", "Support Offered", "Territory Map", "Success Stories"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-brand-300">
                <CheckCircle2 className="h-3 w-3 text-amber-400" />
                {f}
              </span>
            ))}
          </div>

          <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-8 mx-auto max-w-md">
            {stage === "done" ? (
              <div className="text-center">
                <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-display mb-2">You're verified!</h3>
                <p className="text-brand-300 text-sm mb-5">
                  Click below to download the HMD Labs Franchise Brochure (PDF, ~4MB)
                </p>
                <a
                  href="/downloads/hmd-labs-franchise-brochure.pdf"
                  download
                  className="btn-accent w-full justify-center"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure PDF
                </a>
                <p className="text-xs text-brand-400 mt-3">
                  A copy has also been sent to your WhatsApp.
                </p>
              </div>
            ) : stage === "phone" ? (
              <div>
                <div className="flex items-center gap-2 text-sm text-brand-200 mb-5 justify-center">
                  <Award className="h-4 w-4 text-amber-400" />
                  OTP verification required for brochure access
                </div>
                <label className="label text-white text-left block">Mobile Number</label>
                <div className="flex gap-2 mt-1">
                  <div className="flex items-center rounded-xl border border-white/20 bg-white/5 px-3 text-sm text-white shrink-0">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="input bg-white/5 border-white/20 text-white placeholder-brand-400 flex-1"
                    placeholder="10-digit mobile"
                    maxLength={10}
                  />
                </div>
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="btn-accent w-full justify-center mt-4"
                >
                  <Phone className="h-4 w-4" />
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-brand-200 mb-5 text-center">
                  Enter the 6-digit OTP sent to +91 {phone}
                </p>
                <div className="flex justify-center gap-2 mb-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const newOtp = otp.split("");
                        newOtp[i] = val;
                        setOtp(newOtp.join(""));
                        if (val && i < 5) {
                          const next = document.getElementById(`otp-${i + 1}`);
                          next?.focus();
                        }
                      }}
                      id={`otp-${i}`}
                      className="w-11 h-12 rounded-xl border-2 border-white/20 bg-white/10 text-center text-lg font-bold text-white focus:border-amber-400 focus:outline-none"
                    />
                  ))}
                </div>
                <button
                  onClick={verifyOtp}
                  disabled={loading || otp.length < 6}
                  className="btn-accent w-full justify-center"
                >
                  {loading ? "Verifying..." : "Verify & Download"}
                </button>
                <button
                  onClick={() => { setOtp(""); setStage("phone"); }}
                  className="w-full text-xs text-brand-400 hover:text-brand-300 mt-3"
                >
                  Change number
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
