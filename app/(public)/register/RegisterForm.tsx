"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { User, Globe, CheckCircle2, Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type ResidencyType = "indian" | "foreign";

const INDIAN_UPLOAD_DOCS = [
  { id: "pan_file",       label: "PAN Card",                           required: true,  note: "Clear scan or photo of your PAN card" },
  { id: "aadhar_file",    label: "Aadhaar Card",                       required: true,  note: "Front & back — linked mobile number required" },
  { id: "cheque_file",    label: "Cancelled Cheque",                   required: true,  note: "Savings account — name should be printed" },
  { id: "signature_file", label: "Photograph of Signature on White Paper", required: true,  note: "Sign on plain white paper, scan or photo" },
];

const FOREIGN_UPLOAD_DOCS = [
  { id: "pan_file",       label: "PAN Card",                                required: true,  note: "Mandatory for all investors in India" },
  { id: "passport_file",  label: "Passport",                                required: true,  note: "Valid international passport (all pages)" },
  { id: "overseas_file",  label: "Overseas Address Proof (Election Card / Driving License)", required: false, note: "As applicable in country of residence" },
  { id: "cheque_file",    label: "Cancelled Cheque (NRE / NRO Account)",     required: true,  note: "NRE/NRO bank account required" },
  { id: "signature_file", label: "Photograph of Signature on White Paper",   required: true,  note: "Sign on plain white paper, scan or photo" },
];

function FileUploadField({
  id, label, required, note,
  file, onChange,
}: {
  id: string; label: string; required: boolean; note: string;
  file: File | null; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={cn("flex gap-4 p-4 rounded-xl border transition-all", file ? "border-emerald-300 bg-emerald-50" : required ? "border-[#c9a84c]/30 bg-[#c9a84c]/5" : "border-gray-100 bg-gray-50")}>
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", file ? "bg-emerald-100" : required ? "bg-[#c9a84c]/20" : "bg-gray-200")}>
        {file ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <FileText className={cn("w-4 h-4", required ? "text-[#c9a84c]" : "text-gray-500")} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#0a1628] text-sm">{label}</span>
          {required && !file && <span className="text-xs text-red-500 font-medium">Required</span>}
          {file && <span className="text-xs text-emerald-600 font-medium">✓ Uploaded</span>}
        </div>
        {file
          ? <p className="text-emerald-700 text-xs mt-0.5 truncate">{file.name}</p>
          : <p className="text-gray-500 text-xs mt-0.5">{note}</p>
        }
      </div>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={cn("shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
          file ? "border-emerald-300 text-emerald-700 hover:bg-emerald-100" : "border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10")}
      >
        <Upload className="w-3.5 h-3.5" />
        {file ? "Change" : "Upload"}
      </button>
      <input ref={ref} id={id} type="file" accept="image/*,.pdf" className="hidden" onChange={onChange} />
    </div>
  );
}

export default function RegisterForm() {
  const [residency, setResidency] = useState<ResidencyType>("indian");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", dob: "", city: "", state: "",
    pan: "", aadhar: "", aadharMobile: "",
    country: "", nreAccountNo: "", ssnOrTaxId: "",
    investmentGoal: "", initialAmount: "", mode: "",
    consent: false, fatcaConsent: false,
  });
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleFile = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((p) => ({ ...p, [id]: e.target.files?.[0] ?? null }));
  };

  const uploadDocs = residency === "indian" ? INDIAN_UPLOAD_DOCS : FOREIGN_UPLOAD_DOCS;

  const submitForm = async () => {
    if (!form.consent) { toast.error("Please accept the consent to proceed."); return; }
    if (residency === "foreign" && !form.fatcaConsent) { toast.error("FATCA declaration is required for foreign residents."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, mobile: form.mobile, email: form.email,
          city: form.city, interestedIn: "Account Opening",
          investmentRange: form.initialAmount,
          message: `Residency: ${residency}. Goal: ${form.investmentGoal}. Mode: ${form.mode}. PAN: ${form.pan}`,
          source: "register",
        }),
      });
      if (res.ok) setSubmitted(true);
      else toast.error("Something went wrong. Please try again.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-all";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#0a1628] font-display mb-3">Thank You!</h2>
        <p className="text-gray-600 mb-2">Your registration request has been received.</p>
        <p className="text-gray-500 text-sm">Our team will contact you within 24 hours to guide you through the document verification and account activation process.</p>
        <p className="text-xs text-gray-400 mt-6">You can also reach us directly at <a href="mailto:hello@anvithbizcap.com" className="text-[#c9a84c]">hello@anvithbizcap.com</a></p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Step indicator */}
      <div className="bg-[#0a1628] px-8 py-6">
        <div className="flex items-center justify-between">
          {["Choose Type", "Your Details", "Documents", "Confirm"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                step > i + 1 ? "bg-[#c9a84c] text-[#0a1628]" :
                step === i + 1 ? "bg-white text-[#0a1628]" :
                "bg-white/20 text-gray-400")}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={cn("text-xs font-medium hidden sm:inline", step === i + 1 ? "text-white" : "text-gray-400")}>{s}</span>
              {i < 3 && <div className="w-8 sm:w-16 h-0.5 bg-white/20 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8">

        {/* ── Step 1: Residency ── */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-[#0a1628] font-display mb-2">Select Your Residency Status</h2>
            <p className="text-gray-500 text-sm mb-8">Document requirements differ based on whether you are an Indian resident or a foreign/NRI investor.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setResidency("indian")}
                className={cn("p-6 rounded-2xl border-2 text-left transition-all", residency === "indian" ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-200 hover:border-gray-300")}
              >
                <User className={cn("w-8 h-8 mb-3", residency === "indian" ? "text-[#c9a84c]" : "text-gray-400")} />
                <h3 className="font-bold text-[#0a1628] text-lg mb-1">Indian Resident</h3>
                <p className="text-gray-500 text-sm">Resident Indian citizen investing through a regular savings account.</p>
                <ul className="mt-3 space-y-1 text-xs text-gray-500">
                  <li>• PAN + Aadhaar required</li>
                  <li>• Cancelled cheque (savings account)</li>
                  <li>• Mobile linked with Aadhaar</li>
                </ul>
              </button>
              <button
                onClick={() => setResidency("foreign")}
                className={cn("p-6 rounded-2xl border-2 text-left transition-all", residency === "foreign" ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-gray-200 hover:border-gray-300")}
              >
                <Globe className={cn("w-8 h-8 mb-3", residency === "foreign" ? "text-[#c9a84c]" : "text-gray-400")} />
                <h3 className="font-bold text-[#0a1628] text-lg mb-1">NRI / Foreign Resident</h3>
                <p className="text-gray-500 text-sm">Non-Resident Indian or foreign national investing in Indian mutual funds.</p>
                <ul className="mt-3 space-y-1 text-xs text-gray-500">
                  <li>• PAN + Foreign Passport required</li>
                  <li>• NRE/NRO bank account</li>
                  <li>• FATCA declaration (US/Canada)</li>
                </ul>
              </button>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} className="px-8 py-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Personal Details ── */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-[#0a1628] font-display mb-2">Personal Details</h2>
            <p className="text-gray-500 text-sm mb-6">Please fill in your basic information.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handle} placeholder="Full Name (as per PAN) *" className={inputCls} required />
              <input name="mobile" value={form.mobile} onChange={handle} placeholder="Mobile Number *" className={inputCls} required />
              <input name="email" value={form.email} onChange={handle} type="email" placeholder="Email Address *" className={inputCls} required />

              {/* DOB with label */}
              <div className="relative">
                <label className="absolute -top-2 left-3 text-[10px] bg-white px-1 text-gray-400 z-10">Date of Birth *</label>
                <input name="dob" value={form.dob} onChange={handle} type="date" className={inputCls} required />
              </div>

              <input name="pan" value={form.pan} onChange={handle} placeholder="PAN Number *" className={`${inputCls} uppercase`} required />

              {residency === "indian" ? (
                <>
                  <input
                    name="aadhar" value={form.aadhar} onChange={handle}
                    placeholder="Aadhaar Number (12 digits) *"
                    maxLength={12}
                    inputMode="numeric"
                    className={inputCls}
                  />
                  <input
                    name="aadharMobile" value={form.aadharMobile} onChange={handle}
                    placeholder="Aadhaar-linked Mobile Number *"
                    inputMode="numeric"
                    className={inputCls}
                    required
                  />
                </>
              ) : (
                <>
                  <input name="country" value={form.country} onChange={handle} placeholder="Country of Residence *" className={inputCls} required />
                  <input name="nreAccountNo" value={form.nreAccountNo} onChange={handle} placeholder="NRE / NRO Account Number *" className={inputCls} />
                  <input name="email" value={form.email} onChange={handle} type="email" placeholder="Email Address *" className={inputCls} required />
                  <input name="mobile" value={form.mobile} onChange={handle} placeholder="Mobile Number *" className={inputCls} required />
                  <input name="ssnOrTaxId" value={form.ssnOrTaxId} onChange={handle} placeholder="Social Security Number / Taxpayer ID (US/Canada) *" className={inputCls} />
                </>
              )}

              <input name="city" value={form.city} onChange={handle} placeholder="City" className={inputCls} />
              <input name="state" value={form.state} onChange={handle} placeholder={residency === "indian" ? "State" : "State / Country"} className={inputCls} />
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select name="investmentGoal" value={form.investmentGoal} onChange={handle} className={inputCls}>
                <option value="">Primary Investment Goal...</option>
                <option>Wealth Creation (Long-term)</option>
                <option>Retirement Planning</option>
                <option>Child Education</option>
                <option>Marriage Planning</option>
                <option>Tax Saving (ELSS)</option>
                <option>Emergency Fund</option>
                <option>Regular Income (SWP)</option>
              </select>
              <select name="mode" value={form.mode} onChange={handle} className={inputCls}>
                <option value="">Investment Mode...</option>
                <option>SIP (Monthly)</option>
                <option>Lumpsum</option>
                <option>Both SIP + Lumpsum</option>
              </select>
              <select name="initialAmount" value={form.initialAmount} onChange={handle} className={inputCls}>
                <option value="">Initial Investment Range...</option>
                <option>Under ₹10,000/month SIP</option>
                <option>₹10,000 – ₹25,000/month SIP</option>
                <option>₹25,000 – ₹50,000/month SIP</option>
                <option>Above ₹50,000/month SIP</option>
                <option>Lumpsum ₹1L – ₹5L</option>
                <option>Lumpsum ₹5L – ₹25L</option>
                <option>Lumpsum above ₹25L</option>
              </select>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:border-gray-300">← Back</button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 3: Document Uploads ── */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-[#0a1628] font-display mb-2">Upload Documents</h2>
            <p className="text-gray-500 text-sm mb-6">
              Please upload clear scans or photos of the required documents. Accepted formats: JPG, PNG, PDF.
            </p>

            <div className="space-y-3 mb-6">
              {uploadDocs.map((doc) => (
                <FileUploadField
                  key={doc.id}
                  id={doc.id}
                  label={doc.label}
                  required={doc.required}
                  note={doc.note}
                  file={files[doc.id] ?? null}
                  onChange={handleFile(doc.id)}
                />
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-blue-700 text-sm">
                <strong>Security note:</strong> Documents are transmitted securely and used solely for KYC verification. They will not be shared with any third party except as required by SEBI/AMFI regulations.
              </p>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:border-gray-300">← Back</button>
              <button onClick={() => setStep(4)} className="px-8 py-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 4: Confirm ── */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-[#0a1628] font-display mb-2">Review & Submit</h2>
            <p className="text-gray-500 text-sm mb-6">Please review your details and accept the declarations below.</p>

            <div className="bg-[#f8fafc] rounded-xl p-4 border border-gray-100 mb-6 space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Name</span><span className="font-medium text-[#0a1628]">{form.name || "—"}</span>
                <span className="text-gray-400">Mobile</span><span className="font-medium text-[#0a1628]">{form.mobile || "—"}</span>
                <span className="text-gray-400">Email</span><span className="font-medium text-[#0a1628]">{form.email || "—"}</span>
                <span className="text-gray-400">PAN</span><span className="font-medium text-[#0a1628]">{form.pan || "—"}</span>
                <span className="text-gray-400">Residency</span><span className="font-medium text-[#0a1628] capitalize">{residency}</span>
                <span className="text-gray-400">Goal</span><span className="font-medium text-[#0a1628]">{form.investmentGoal || "—"}</span>
                <span className="text-gray-400">Documents</span>
                <span className="font-medium text-[#0a1628]">
                  {uploadDocs.filter((d) => files[d.id]).length} / {uploadDocs.length} uploaded
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="consent" checked={form.consent} onChange={handle} className="mt-1 accent-[#c9a84c]" />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I consent to AnvithBizCap collecting and processing my information and documents for investment account creation purposes. I understand that investments are subject to market risks and past performance is not indicative of future returns. I authorise AnvithBizCap to contact me regarding investment services.
                </span>
              </label>
              {residency === "foreign" && (
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="fatcaConsent" checked={form.fatcaConsent} onChange={handle} className="mt-1 accent-[#c9a84c]" />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    <strong>(FATCA Declaration)</strong> I declare that I am a tax resident of the country mentioned. I understand my investment details may be shared with the relevant tax authority as per FATCA/CRS guidelines.
                  </span>
                </label>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(3)} className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:border-gray-300">← Back</button>
              <button onClick={submitForm} disabled={loading} className="px-8 py-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90 disabled:opacity-60 flex items-center gap-2">
                {loading ? <><span className="w-4 h-4 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" />Submitting...</> : "Submit Application →"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
