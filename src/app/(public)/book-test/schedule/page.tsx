"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  User, 
  MapPin, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  ChevronLeft,
  Home,
  Check,
  CreditCard,
  Clock,
  Award
} from "lucide-react";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const STEPS = [
  { id: 1, name: "Patient Info", icon: User },
  { id: 2, name: "Collection Address", icon: MapPin },
  { id: 3, name: "Time Slot", icon: CalendarIcon },
  { id: 4, name: "Confirm", icon: CheckCircle2 },
];

const TIME_SLOTS = [
  "6:00 AM - 8:00 AM",
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "4:00 PM - 6:00 PM",
];

const DISTRICTS = [
  { label: "Alipurduar", value: "ALIPURDUAR" },
  { label: "Bankura", value: "BANKURA" },
  { label: "Birbhum", value: "BIRBHUM" },
  { label: "Cooch Behar", value: "COOCH_BEHAR" },
  { label: "Dakshin Dinajpur", value: "DAKSHIN_DINAJPUR" },
  { label: "Darjeeling", value: "DARJEELING" },
  { label: "Hooghly", value: "HOOGHLY" },
  { label: "Howrah", value: "HOWRAH" },
  { label: "Jalpaiguri", value: "JALPAIGURI" },
  { label: "Jhargram", value: "JHARGRAM" },
  { label: "Kalimpong", value: "KALIMPONG" },
  { label: "Kolkata", value: "KOLKATA" },
  { label: "Malda", value: "MALDA" },
  { label: "Murshidabad", value: "MURSHIDABAD" },
  { label: "Nadia", value: "NADIA" },
  { label: "North 24 Parganas", value: "NORTH_24_PARGANAS" },
  { label: "Paschim Bardhaman", value: "PASCHIM_BARDHAMAN" },
  { label: "Paschim Medinipur", value: "PASCHIM_MEDINIPUR" },
  { label: "Purba Bardhaman", value: "PURBA_BARDHAMAN" },
  { label: "Purba Medinipur", value: "PURBA_MEDINIPUR" },
  { label: "Purulia", value: "PURULIA" },
  { label: "South 24 Parganas", value: "SOUTH_24_PARGANAS" },
  { label: "Uttar Dinajpur", value: "UTTAR_DINAJPUR" }
];

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const testSlug = searchParams.get("test");
  const packageSlug = searchParams.get("package");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "MALE",
    address: "",
    city: "",
    district: "KOLKATA",
    pincode: "",
    scheduledDate: "",
    scheduledSlot: TIME_SLOTS[0],
  });

  // Fetch test/package details
  useEffect(() => {
    async function fetchData() {
      const type = testSlug ? "test" : "package";
      const slug = testSlug || packageSlug;
      if (!slug) return;

      try {
        const res = await fetch(`/api/catalog/details?type=${type}&slug=${slug}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch details", err);
      }
    }
    fetchData();
  }, [testSlug, packageSlug]);

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.phone)) {
      toast.error("Please fill Name and Phone");
      return;
    }
    if (step === 2 && (!formData.address || !formData.city || !formData.pincode)) {
      toast.error("Please complete address details");
      return;
    }
    if (step === 3 && !formData.scheduledDate) {
      toast.error("Please select a date");
      return;
    }
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        testId: testSlug ? data?.id : null,
        packageId: packageSlug ? data?.id : null,
        testName: testSlug ? data?.name : null,
        packageName: packageSlug ? data?.name : null,
        subtotal: data?.discountedPrice || 0,
        totalAmount: data?.discountedPrice || 0,
        homeFee: 0,
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const order = await res.json();
        toast.success("Order placed successfully!");
        router.push(`/book-test/success?order=${order.orderNumber}`);
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error("Booking Error:", errData);
        toast.error(errData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!testSlug && !packageSlug) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">No test selected</h2>
        <Link href="/book-test" className="btn-primary mt-4 inline-flex">Go to Test List</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3 items-start">
      {/* Form Area */}
      <div className="lg:col-span-2 space-y-6">
        <div className="card p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="mb-10 flex items-center justify-between">
            {STEPS.map((s, idx) => (
              <div key={s.id} className="flex flex-col items-center gap-2 relative z-10 flex-1">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  step > s.id ? "bg-brand-600 border-brand-600 text-white" : 
                  step === s.id ? "border-brand-600 text-brand-600 bg-white" : 
                  "border-gray-200 text-gray-400 bg-white"
                }`}>
                  {step > s.id ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  step >= s.id ? "text-brand-700" : "text-gray-400"
                }`}>
                  {s.name}
                </span>
                {idx < STEPS.length - 1 && (
                  <div className={`absolute left-1/2 top-5 -z-10 h-0.5 w-full -translate-y-1/2 ${
                    step > s.id + 0.5 ? "bg-brand-600" : "bg-gray-100"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Patient Details */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold font-display">Who is this test for?</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Full Name *</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="Enter patient name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="label">Mobile Number *</label>
                  <div className="flex">
                    <span className="flex items-center px-3 border border-r-0 rounded-l-xl bg-gray-50 text-gray-500 text-sm font-bold">+91</span>
                    <input 
                      type="tel" 
                      className="input rounded-l-none" 
                      placeholder="10-digit mobile"
                      maxLength={10}
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, "")})}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Email (Optional)</label>
                  <input 
                    type="email" 
                    className="input" 
                    placeholder="Results will be sent here"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Age</label>
                    <input 
                      type="number" 
                      className="input" 
                      placeholder="e.g. 35"
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Gender</label>
                    <select 
                      className="input"
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold font-display">Home Collection Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Full Address *</label>
                  <textarea 
                    className="input min-h-[100px]" 
                    placeholder="House No, Building, Area, Landmark"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">City *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="City/Village"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="label">Pincode *</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="6-digit PIN"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={e => setFormData({...formData, pincode: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">District *</label>
                  <input
                    list="district-list"
                    className="input"
                    placeholder="Enter district name"
                    value={formData.district}
                    onChange={e => setFormData({...formData, district: e.target.value})}
                  />
                  <datalist id="district-list">
                    {DISTRICTS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </datalist>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold font-display">Select Collection Slot</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label">Preferred Date *</label>
                  <input 
                    type="date" 
                    className="input" 
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.scheduledDate}
                    onChange={e => setFormData({...formData, scheduledDate: e.target.value})}
                  />
                  <p className="text-[10px] text-gray-400 mt-2">Home collection available Monday to Sunday.</p>
                </div>
                <div>
                  <label className="label">Preferred Time Slot *</label>
                  <div className="space-y-2">
                    {TIME_SLOTS.map(slot => (
                      <label key={slot} className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.scheduledSlot === slot ? "border-brand-600 bg-brand-50" : "border-gray-100 hover:border-gray-200 bg-white"
                      }`}>
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="time-slot" 
                            className="text-brand-600" 
                            checked={formData.scheduledSlot === slot}
                            onChange={() => setFormData({...formData, scheduledSlot: slot})}
                          />
                          <span className="text-sm font-medium">{slot}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-2xl bg-brand-900 p-6 text-white overflow-hidden relative">
                <CheckCircle2 className="absolute -bottom-6 -right-6 h-32 w-32 text-white/5" />
                <h2 className="text-xl font-bold font-display">Confirm Your Booking</h2>
                <p className="text-brand-200 text-sm mt-1">Review your details before final submission.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card p-4 bg-gray-50/50">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Patient Details</p>
                  <p className="text-sm font-bold">{formData.name}</p>
                  <p className="text-xs text-gray-500">+91 {formData.phone}</p>
                  <p className="text-xs text-gray-500">{formData.gender}, {formData.age} yrs</p>
                </div>
                <div className="card p-4 bg-gray-50/50">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Collection Address</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{formData.address}, {formData.city} - {formData.pincode}</p>
                  <p className="text-xs font-bold mt-1">
                    {DISTRICTS.find(d => d.value === formData.district)?.label || formData.district}
                  </p>
                </div>
                <div className="card p-4 bg-gray-50/50 sm:col-span-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Appointment</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-brand-600" />
                      <span className="text-xs font-bold">{formData.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-brand-600" />
                      <span className="text-xs font-bold">{formData.scheduledSlot}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50 flex gap-3">
                <CreditCard className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800">
                  <p className="font-bold">Payment Method: Cash on Collection</p>
                  <p className="mt-0.5 opacity-80 underline">You don't need to pay anything now. Just pay the phlebotomist during home collection.</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="btn-secondary px-6"
                disabled={loading}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button 
                onClick={nextStep}
                className="btn-primary px-8"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="btn-primary px-10"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <CheckCircle2 className="h-5 w-5 mr-2" />}
                Place Booking
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar: Summary */}
      <div className="lg:col-span-1 space-y-4">
        <div className="card p-5 bg-gray-50/50 border-dashed">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Booking Summary</h3>
          {!data ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-brand-700">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">{data.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-tight">
                    {testSlug ? (data.category?.name || "Diagnostic Test") : "Health Package"}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200/60 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(data.discountedPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Home Collection</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-1.5 py-0.5 rounded">FREE</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-900/10">
                  <span className="font-bold">Total Amount</span>
                  <span className="text-lg font-bold text-brand-700">{formatCurrency(data.discountedPrice)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card p-5 bg-white space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
             Trust Badges
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50">
               <Award className="h-6 w-6 text-brand-600 mb-1" />
               <span className="text-[9px] font-bold">NABL Certified</span>
             </div>
             <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50">
               <CheckCircle2 className="h-6 w-6 text-green-600 mb-1" />
               <span className="text-[9px] font-bold">Verified Reports</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-900 text-white py-10">
        <div className="section-container">
          <h1 className="text-2xl font-bold font-display sm:text-3xl">Complete Your Booking</h1>
          <p className="mt-1 text-brand-200 text-sm">Follow 4 simple steps to arrange your home collection.</p>
        </div>
      </div>

      <div className="section-container py-8 sm:py-12">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-brand-600" /></div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
