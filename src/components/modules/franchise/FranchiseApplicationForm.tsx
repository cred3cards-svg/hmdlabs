"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, ChevronLeft, CheckCircle2, User, MapPin, Briefcase, FileText, Send } from "lucide-react";
import { cn, WB_DISTRICTS } from "@/lib/utils";
import toast from "react-hot-toast";

// ── Zod schema ──────────────────────────────────────────────────────────────

const step1Schema = z.object({
  applicantName: z.string().min(3, "Full name required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Valid email required"),
  alternatePhone: z.string().optional(),
});

const step2Schema = z.object({
  franchiseType: z.enum(["COLLECTION_CENTER", "MINI_LAB", "FULL_LAB", "MOBILE_UNIT"], {
    required_error: "Please select a franchise type",
  }),
  preferredDistrict: z.string().min(1, "Select preferred district"),
  preferredCity: z.string().min(2, "Enter preferred city/town"),
  investmentCapacity: z.number({ required_error: "Enter investment capacity" }).min(100000, "Minimum ₹1 lakh"),
  existingSpace: z.boolean(),
  spaceArea: z.number().optional(),
});

const step3Schema = z.object({
  currentOccupation: z.string().min(2, "Enter your current occupation"),
  businessExperience: z.number().min(0).max(50),
  addressLine1: z.string().min(5, "Enter address"),
  city: z.string().min(2, "Enter city"),
  district: z.string().min(1, "Select district"),
  pincode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit pincode"),
});

const step4Schema = z.object({
  termsAccepted: z.literal(true, { errorMap: () => ({ message: "You must accept terms" }) }),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;
type Step4 = z.infer<typeof step4Schema>;
type AllFormData = Step1 & Step2 & Step3 & Step4;

// ── Steps config ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Business Intent", icon: Briefcase },
  { id: 3, label: "Background", icon: MapPin },
  { id: 4, label: "Declaration", icon: FileText },
];

const FRANCHISE_TYPES = [
  { value: "COLLECTION_CENTER", label: "Collection Center", invest: "₹3–8L" },
  { value: "MINI_LAB", label: "Mini Lab", invest: "₹15–30L" },
  { value: "FULL_LAB", label: "Full Lab", invest: "₹40–80L" },
  { value: "MOBILE_UNIT", label: "Mobile Unit", invest: "₹8–15L" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FranchiseApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AllFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getSchemaForStep = (step: number) => {
    switch (step) {
      case 1: return step1Schema;
      case 2: return step2Schema;
      case 3: return step3Schema;
      case 4: return step4Schema;
      default: return step1Schema;
    }
  };

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<AllFormData>({
    resolver: zodResolver(getSchemaForStep(currentStep) as any),
    defaultValues: formData as AllFormData,
  });

  const existingSpace = watch("existingSpace");

  const onStepSubmit = async (data: Partial<AllFormData>) => {
    const updated = { ...formData, ...data };
    setFormData(updated);

    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
      reset({ ...updated } as AllFormData);
    } else {
      // Final submission
      setSubmitting(true);
      try {
        const res = await fetch("/api/franchise/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        if (res.ok) {
          setSubmitted(true);
          toast.success("Application submitted! We'll contact you within 24 hours.");
        } else {
          toast.error("Submission failed. Please try again.");
        }
      } catch {
        toast.error("Network error. Please try again.");
      } finally {
        setSubmitting(false);
      }
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
            <h2 className="text-2xl font-bold font-display text-gray-900">Application Received!</h2>
            <p className="mt-3 text-gray-500">
              Thank you for applying to the HMD Labs franchise program. Our team will review your application 
              and contact you within <span className="font-semibold text-gray-700">24 working hours</span>.
            </p>
            <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-green-800">
              <p>Reference: <span className="font-mono font-semibold">HMD-FR-{Date.now().toString(36).toUpperCase()}</span></p>
              <p className="mt-1 text-xs text-green-600">Save this for future reference</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section-py bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Apply for Franchise</h2>
          <p className="section-subtitle mx-auto max-w-xl">
            Complete the application below. Our franchise team will respond within 24 hours.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Step indicator */}
          <div className="flex items-center mb-10">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center flex-1">
                  <div className={cn(
                    "step-dot",
                    currentStep > step.id ? "step-dot-done" : currentStep === step.id ? "step-dot-active" : "step-dot-pending",
                  )}>
                    {currentStep > step.id ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                  </div>
                  <span className={cn(
                    "text-xs mt-1.5 font-medium",
                    currentStep >= step.id ? "text-gray-700" : "text-gray-400",
                  )}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("h-0.5 flex-1 mb-5 mx-1 transition-colors", currentStep > step.id ? "bg-green-500" : "bg-gray-200")} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onStepSubmit as any)} className="card p-7 space-y-5">
            {/* Step 1 – Personal Info */}
            {currentStep === 1 && (
              <>
                <h3 className="text-lg font-semibold font-display text-gray-900">Personal Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
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
                    <label className="label">Alternate Number</label>
                    <input {...register("alternatePhone")} className="input" placeholder="Optional" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Email Address *</label>
                    <input {...register("email")} type="email" className="input" placeholder="your@email.com" />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Step 2 – Business Intent */}
            {currentStep === 2 && (
              <>
                <h3 className="text-lg font-semibold font-display text-gray-900">Business Intent</h3>

                <div>
                  <label className="label">Franchise Type *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FRANCHISE_TYPES.map((ft) => (
                      <label key={ft.value} className="relative cursor-pointer">
                        <input type="radio" value={ft.value} {...register("franchiseType")} className="sr-only peer" />
                        <div className="rounded-xl border-2 border-gray-200 p-3 peer-checked:border-brand-600 peer-checked:bg-brand-50 transition-colors">
                          <div className="text-sm font-semibold text-gray-900">{ft.label}</div>
                          <div className="text-xs text-gray-500">{ft.invest}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.franchiseType && <p className="form-error">{(errors.franchiseType as any).message}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label">Preferred District *</label>
                    <select {...register("preferredDistrict")} className="input">
                      <option value="">Select district</option>
                      {WB_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.preferredDistrict && <p className="form-error">{errors.preferredDistrict.message}</p>}
                  </div>
                  <div>
                    <label className="label">Preferred City/Town *</label>
                    <input {...register("preferredCity")} className="input" placeholder="City or town" />
                    {errors.preferredCity && <p className="form-error">{errors.preferredCity.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Total Investment Capacity (₹) *</label>
                    <input
                      {...register("investmentCapacity", { valueAsNumber: true })}
                      type="number"
                      className="input"
                      placeholder="e.g. 500000"
                      min={100000}
                    />
                    {errors.investmentCapacity && <p className="form-error">{errors.investmentCapacity.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register("existingSpace")} className="rounded border-gray-300 text-brand-700 focus:ring-brand-500" />
                    <span className="text-sm text-gray-700">I already have a suitable space/premises</span>
                  </label>
                </div>

                {existingSpace && (
                  <div>
                    <label className="label">Space Area (sq.ft)</label>
                    <input {...register("spaceArea", { valueAsNumber: true })} type="number" className="input" placeholder="e.g. 400" />
                  </div>
                )}
              </>
            )}

            {/* Step 3 – Background */}
            {currentStep === 3 && (
              <>
                <h3 className="text-lg font-semibold font-display text-gray-900">Background & Address</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label">Current Occupation *</label>
                    <input {...register("currentOccupation")} className="input" placeholder="e.g. Pharmacist, Doctor, Businessman" />
                    {errors.currentOccupation && <p className="form-error">{errors.currentOccupation.message}</p>}
                  </div>
                  <div>
                    <label className="label">Business Experience (years) *</label>
                    <input {...register("businessExperience", { valueAsNumber: true })} type="number" className="input" min={0} max={50} />
                    {errors.businessExperience && <p className="form-error">{errors.businessExperience.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Current Address *</label>
                    <input {...register("addressLine1")} className="input" placeholder="House no., Street, Area" />
                    {errors.addressLine1 && <p className="form-error">{errors.addressLine1.message}</p>}
                  </div>
                  <div>
                    <label className="label">City *</label>
                    <input {...register("city")} className="input" placeholder="City" />
                    {errors.city && <p className="form-error">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="label">Pincode *</label>
                    <input {...register("pincode")} className="input" placeholder="6-digit pincode" maxLength={6} />
                    {errors.pincode && <p className="form-error">{errors.pincode.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">District *</label>
                    <select {...register("district")} className="input">
                      <option value="">Select district</option>
                      {WB_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.district && <p className="form-error">{errors.district.message}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Step 4 – Declaration */}
            {currentStep === 4 && (
              <>
                <h3 className="text-lg font-semibold font-display text-gray-900">Declaration & Submit</h3>
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 text-xs text-gray-600 leading-relaxed space-y-2">
                  <p><strong>Data Privacy:</strong> Information provided will be used only for franchise evaluation and will not be shared with third parties.</p>
                  <p><strong>No Commitment:</strong> This application does not guarantee a franchise agreement. HMD Labs reserves the right to accept or reject applications.</p>
                  <p><strong>Accuracy:</strong> You confirm that all information provided is accurate and complete to the best of your knowledge.</p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register("termsAccepted")} className="mt-0.5 rounded border-gray-300 text-brand-700 focus:ring-brand-500" />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the above terms and conditions. I consent to HMD Labs contacting me regarding this franchise application.
                  </span>
                </label>
                {errors.termsAccepted && <p className="form-error">{errors.termsAccepted.message}</p>}

                {/* Summary */}
                <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-sm">
                  <p className="font-semibold text-brand-900 mb-2">Application Summary</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                    <span className="font-medium text-gray-700">Name:</span><span>{formData.applicantName}</span>
                    <span className="font-medium text-gray-700">Type:</span><span>{formData.franchiseType}</span>
                    <span className="font-medium text-gray-700">District:</span><span>{formData.preferredDistrict}</span>
                    <span className="font-medium text-gray-700">Investment:</span><span>₹{formData.investmentCapacity?.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="btn-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={submitting}
                className={currentStep === 4 ? "btn-accent" : "btn-primary"}
              >
                {submitting ? "Submitting..." : currentStep === 4 ? (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Application
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
