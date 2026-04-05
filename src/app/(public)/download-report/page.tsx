"use client";

import { useState } from "react";
import { Download, Phone, FileText, Lock, CheckCircle2, Award } from "lucide-react";
import toast from "react-hot-toast";
import type { Metadata } from "next";

type Stage = "input" | "otp" | "done";

export default function DownloadReportPage() {
  const [stage, setStage] = useState<Stage>("input");
  const [identifier, setIdentifier] = useState(""); // phone or order id
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportInfo, setReportInfo] = useState<{ name: string; date: string; reportNumber: string } | null>(null);

  const requestOtp = async () => {
    if (!identifier.trim()) { toast.error("Enter mobile number or order ID"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/reports/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      if (res.ok) {
        setStage("otp");
        toast.success("OTP sent to your registered mobile number");
      } else {
        const data = await res.json();
        toast.error(data.message || "Could not find records. Check your details.");
      }
    } catch {
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndFetch = async () => {
    if (otp.length !== 6) { toast.error("Enter 6-digit OTP"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/reports/verify-and-fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp }),
      });
      if (res.ok) {
        const data = await res.json();
        setReportInfo(data);
        setStage("done");
      } else {
        toast.error("Invalid or expired OTP. Try again.");
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 text-white py-12">
        <div className="section-container">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-5 w-5 text-amber-400" />
            <span className="text-sm text-brand-200">Secure OTP-protected access</span>
          </div>
          <h1 className="text-3xl font-bold font-display sm:text-4xl">Download Your Report</h1>
          <p className="mt-2 text-brand-200">
            NABL-certified diagnostic reports. Verify your identity via OTP to access your results.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="mx-auto max-w-md">
          {stage === "input" && (
            <div className="card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 mx-auto mb-5">
                <FileText className="h-7 w-7 text-brand-700" />
              </div>
              <h2 className="text-xl font-bold font-display text-center mb-2">Access Your Report</h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Enter your registered mobile number or order ID to receive an OTP.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="label">Mobile Number or Order ID</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="input"
                    placeholder="e.g. 9876543210 or HMD-ABC123"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">Use the mobile number registered at time of booking</p>
                </div>
                <button onClick={requestOtp} disabled={loading} className="btn-primary w-full justify-center">
                  <Phone className="h-4 w-4" />
                  {loading ? "Please wait..." : "Send OTP"}
                </button>
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-amber-50 p-3.5 text-xs text-amber-800">
                <Award className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p>All HMD Labs reports are NABL-accredited. Your data is fully secure and accessible only by you via OTP.</p>
              </div>
            </div>
          )}

          {stage === "otp" && (
            <div className="card p-8">
              <h2 className="text-xl font-bold font-display text-center mb-2">Enter OTP</h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                We sent a 6-digit OTP to <strong>{identifier}</strong>. Valid for 10 minutes.
              </p>

              <div className="flex justify-center gap-2 mb-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    id={`rotp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      const arr = otp.split("");
                      arr[i] = val;
                      setOtp(arr.join(""));
                      if (val && i < 5) document.getElementById(`rotp-${i + 1}`)?.focus();
                    }}
                    className="w-11 h-12 rounded-xl border-2 border-gray-200 text-center text-xl font-bold focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                ))}
              </div>

              <button onClick={verifyAndFetch} disabled={loading || otp.length < 6} className="btn-primary w-full justify-center mb-3">
                {loading ? "Verifying..." : "Verify & Access Reports"}
              </button>
              <button onClick={() => { setOtp(""); setStage("input"); }} className="w-full text-sm text-gray-500 hover:text-gray-700">
                ← Change identifier
              </button>
            </div>
          )}

          {stage === "done" && (
            <div className="card p-8 text-center">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold font-display mb-2">Reports Ready!</h2>
              {reportInfo && (
                <div className="rounded-xl bg-gray-50 p-4 mb-6 text-left text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Patient</span>
                    <span className="font-medium text-gray-900">{reportInfo.name}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Report #</span>
                    <span className="font-mono text-xs text-gray-700">{reportInfo.reportNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="text-gray-700">{reportInfo.date}</span>
                  </div>
                </div>
              )}
              <a href="/api/reports/download" download className="btn-primary w-full justify-center mb-3">
                <Download className="h-4 w-4" />
                Download PDF Report
              </a>
              <p className="text-xs text-gray-400 mt-3">
                NABL certified · Reports valid for medical use · Download link expires in 24h
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
