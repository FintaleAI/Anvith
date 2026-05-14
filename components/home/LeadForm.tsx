"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

const PRODUCTS = [
  "Mutual Funds (SIP / Lumpsum)",
  "NBFC Fixed Deposits",
  "Corporate Bonds",
  "Gold & Silver ETFs",
  "US Equity",
  "Capital Gain Bonds (54EC)",
  "SIFs",
  "Financial Planning",
  "Not sure – need guidance",
];

const RANGES = [
  "Under ₹10,000/month",
  "₹10,000 – ₹25,000/month",
  "₹25,000 – ₹50,000/month",
  "Above ₹50,000/month",
  "Lumpsum under ₹1 Lakh",
  "Lumpsum ₹1–5 Lakh",
  "Lumpsum above ₹5 Lakh",
];

export default function LeadForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    interestedIn: "",
    investmentRange: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) { toast.error("Please accept the consent checkbox."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "homepage" }),
      });
      if (res.ok) {
        toast.success("Thank you! Our advisor will contact you shortly.");
        setForm({ name: "", mobile: "", email: "", city: "", interestedIn: "", investmentRange: "", message: "", consent: false });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = dark
    ? "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white/15 transition-all"
    : "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-all";

  const selectCls = dark
    ? "w-full px-4 py-3 rounded-xl bg-[#0f2240] border border-white/20 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-all"
    : "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-all";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handle} required placeholder="Full Name *" className={inputCls} />
        <input name="mobile" value={form.mobile} onChange={handle} required placeholder="Mobile Number *" className={inputCls} pattern="[6-9][0-9]{9}" title="Valid 10-digit Indian mobile" />
        <input name="email" value={form.email} onChange={handle} type="email" placeholder="Email Address" className={inputCls} />
        <input name="city" value={form.city} onChange={handle} placeholder="City" className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="interestedIn" value={form.interestedIn} onChange={handle} className={selectCls}>
          <option value="">Interested In...</option>
          {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select name="investmentRange" value={form.investmentRange} onChange={handle} className={selectCls}>
          <option value="">Investment Range...</option>
          {RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <textarea name="message" value={form.message} onChange={handle} placeholder="Message (optional)" rows={3} className={inputCls} />
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" name="consent" checked={form.consent} onChange={handle} className="mt-1 accent-[#c9a84c]" />
        <span className={`text-xs leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
          I consent to AnvithBizCap contacting me regarding investment guidance. I understand that investments are subject to market risks and this is not guaranteed advice.
        </span>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeLinecap="round" />
          </svg>
        ) : (
          <Send className="w-4 h-4" />
        )}
        {loading ? "Sending..." : "Book a Free Consultation"}
      </button>
    </form>
  );
}
