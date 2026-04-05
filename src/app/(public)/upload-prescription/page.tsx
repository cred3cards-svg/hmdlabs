"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle2, X, Camera } from "lucide-react";
import toast from "react-hot-toast";

export default function UploadPrescriptionPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const valid = Array.from(newFiles).filter((f) => {
      if (!["image/jpeg", "image/png", "application/pdf"].includes(f.type)) {
        toast.error(`${f.name}: Only JPG, PNG, PDF allowed`);
        return false;
      }
      if (f.size > 10 * 1024 * 1024) {
        toast.error(`${f.name}: Max size is 10MB`);
        return false;
      }
      return true;
    });
    setFiles((prev) => [...prev, ...valid].slice(0, 5));
  };

  const handleSubmit = async () => {
    if (files.length === 0) { toast.error("Please upload at least one prescription"); return; }
    if (!/^[6-9]\d{9}$/.test(phone)) { toast.error("Enter valid 10-digit mobile number"); return; }

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    formData.append("phone", phone);

    try {
      const res = await fetch("/api/prescriptions/upload", { method: "POST", body: formData });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Prescription uploaded! We'll call you within 2 hours.");
      } else {
        toast.error("Upload failed. Try again.");
      }
    } catch {
      toast.error("Network error");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="mx-auto max-w-md rounded-3xl bg-white border border-green-100 p-10 text-center shadow-card">
          <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-display">Prescription Received!</h2>
          <p className="mt-3 text-gray-500 text-sm">
            Our team will review your prescription and call <strong>+91 {phone}</strong> within 2 hours 
            to confirm tests and schedule home collection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-900 text-white py-10">
        <div className="section-container">
          <h1 className="text-3xl font-bold font-display">Upload Prescription</h1>
          <p className="mt-2 text-brand-200">Upload your doctor's prescription and we'll arrange home collection across West Bengal.</p>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Upload zone */}
          <div
            className={`rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
              dragging ? "border-brand-500 bg-brand-50" : "border-gray-300 bg-white hover:border-brand-400"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 font-display">Drop prescription here</h3>
            <p className="text-sm text-gray-500 mt-2">JPG, PNG or PDF · Max 10MB each · Up to 5 files</p>
            <div className="mt-5 flex justify-center gap-3">
              <label className="btn-primary cursor-pointer text-sm">
                <FileText className="h-4 w-4" />
                Choose Files
                <input type="file" className="sr-only" multiple accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => addFiles(e.target.files)} />
              </label>
              <label className="btn-secondary cursor-pointer text-sm">
                <Camera className="h-4 w-4" />
                Camera
                <input type="file" className="sr-only" accept="image/*" capture="environment" onChange={(e) => addFiles(e.target.files)} />
              </label>
            </div>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="card p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Uploaded Files ({files.length}/5)</h3>
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-brand-700 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-48">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Phone & submit */}
          <div className="card p-6 space-y-4">
            <h3 className="text-base font-semibold font-display text-gray-900">Your Contact Details</h3>
            <div>
              <label className="label">Mobile Number *</label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 shrink-0">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="input flex-1"
                  placeholder="10-digit mobile"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">We'll call you on this number to confirm the tests and schedule collection.</p>
            </div>
            <button onClick={handleSubmit} className="btn-primary w-full justify-center">
              <Upload className="h-4 w-4" />
              Submit Prescription
            </button>
            <p className="text-xs text-gray-400 text-center">
              West Bengal patients only · Home collection 24×7 · NABL certified reports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
