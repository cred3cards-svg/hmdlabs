"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { WB_DISTRICTS } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  applicantName: z.string().min(3, "Full name required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  district: z.string().min(1, "Select district"),
  partnerType: z.enum(["Lab", "Doctor", "Hospital", "Nursing Home"], {
    required_error: "Please select partner type",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function FranchiseApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/franchise/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Request received! We'll call you shortly.");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="apply" className="section-py bg-green-50">
        <div className="section-container">
          <div className="mx-auto max-w-lg rounded-3xl bg-white border border-green-100 p-10 text-center shadow-card">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-5">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold font-display text-gray-900">Request Received!</h2>
            <p className="mt-3 text-gray-500">
              Thank you for your interest. Our sales team will call you shortly to discuss the opportunity.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section-py bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Request a free callback</h2>
          <p className="section-subtitle mx-auto max-w-xl">
            Fill out this quick form and our team will get in touch with you to discuss partnership opportunities.
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="card p-7 space-y-5 shadow-lg border border-gray-100">
            <div>
              <label className="label">Full Name *</label>
              <input {...register("applicantName")} className="input" placeholder="Your full name" />
              {errors.applicantName && <p className="form-error">{errors.applicantName.message}</p>}
            </div>
            
            <div>
              <label className="label">Mobile Number *</label>
              <input {...register("phone")} className="input" placeholder="10-digit mobile" maxLength={10} />
              {errors.phone && <p className="form-error">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="label">District *</label>
              <select {...register("district")} className="input">
                <option value="">Select district</option>
                {WB_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.district && <p className="form-error">{errors.district.message}</p>}
            </div>

            <div>
              <label className="label">Type of partner *</label>
              <select {...register("partnerType")} className="input">
                <option value="">Select type</option>
                <option value="Lab">Lab</option>
                <option value="Doctor">Doctor</option>
                <option value="Hospital">Hospital</option>
                <option value="Nursing Home">Nursing Home</option>
              </select>
              {errors.partnerType && <p className="form-error">{errors.partnerType.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-accent w-full justify-center mt-2"
            >
              {submitting ? "Submitting..." : (
                <>
                  <Send className="h-4 w-4" />
                  Request Callback
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
