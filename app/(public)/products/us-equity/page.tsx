import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, TrendingUp, Shield, CheckCircle2, Lightbulb, BarChart3, DollarSign } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "US Equity Investment — Invest in US Markets from India",
  description: "Invest in US stocks, ETFs, and global funds from India. AnvithBizCap guides you through every step — platform selection, taxation, forex, and portfolio building.",
};

const ROUTES = [
  {
    title: "US-Focused Mutual Funds (India)",
    badge: "Easiest Route",
    badgeColor: "bg-emerald-100 text-emerald-700",
    desc: "Invest in Indian mutual fund schemes that hold US stocks — no US account needed, rupee-denominated, regulated by SEBI.",
    examples: ["Motilal Oswal Nasdaq 100 FOF", "Franklin India Feeder – Franklin US Opportunities", "ICICI Pru US Bluechip Equity", "Mirae Asset NYSE FANG+ ETF FOF"],
    pros: ["No overseas account required", "Invest via SIP or lumpsum", "SEBI-regulated, INR denominated", "Familiar KYC process"],
    color: "border-emerald-200 bg-emerald-50/30",
    iconColor: "text-emerald-600",
  },
  {
    title: "International ETFs (NSE/BSE Listed)",
    badge: "Flexible",
    badgeColor: "bg-blue-100 text-blue-700",
    desc: "Buy US-focused ETFs listed on Indian exchanges — trade like stocks, real-time pricing, low expense ratios.",
    examples: ["Mirae Asset S&P 500 Top 50 ETF", "Motilal Oswal Nasdaq 100 ETF", "HDFC Developed World Indexes ETF"],
    pros: ["Listed on NSE/BSE — trade anytime", "Low expense ratios", "No forex conversion hassle", "Demat-held, easy to track"],
    color: "border-blue-200 bg-blue-50/30",
    iconColor: "text-blue-600",
  },
  {
    title: "Direct US Stocks via LRS",
    badge: "Full Access",
    badgeColor: "bg-purple-100 text-purple-700",
    desc: "Use the RBI Liberalised Remittance Scheme (LRS) to send up to USD 2,50,000/year overseas and invest directly in US stocks and ETFs.",
    examples: ["Buy Apple, Google, Amazon, Tesla directly", "Invest in S&P 500 ETFs on NYSE", "Access any US-listed security"],
    pros: ["Own actual US securities", "Fractional shares available", "Full dividend + capital gain exposure", "USD 2.5L/year per person limit"],
    color: "border-purple-200 bg-purple-50/30",
    iconColor: "text-purple-600",
  },
];

const STEPS = [
  { step: "01", title: "Goals & Risk Assessment", desc: "We understand your investment objective — wealth creation, USD diversification, or specific sector exposure like tech." },
  { step: "02", title: "Choose the Right Route", desc: "Based on your ticket size, tax bracket, and convenience, we recommend the best route — MF FOF, Indian ETF, or direct LRS." },
  { step: "03", title: "Platform & Account Setup", desc: "We guide you through the platform or AMC selection, account opening, and KYC/LRS paperwork if needed." },
  { step: "04", title: "Portfolio Construction", desc: "We help you allocate across S&P 500, Nasdaq 100, and theme-based funds for a balanced US exposure." },
  { step: "05", title: "Tax & Forex Guidance", desc: "US equity taxation in India differs from domestic — we explain DTAA, capital gains, TCS on LRS, and FEMA rules." },
  { step: "06", title: "Ongoing Review", desc: "Annual portfolio review, rebalancing, and updates on US market conditions and regulatory changes." },
];

const TAX = [
  { label: "Via Indian MF / ETF (FOF)", stcg: "Taxed at slab rate (held < 24 months)", ltcg: "20% with indexation (held ≥ 24 months)", note: "Treated as debt fund for taxation" },
  { label: "Direct US Stocks via LRS", stcg: "Taxed at slab rate (held < 24 months)", ltcg: "12.5% without indexation (held ≥ 24 months)", note: "DTAA with USA — avoid double taxation" },
];

export default function USEquityPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Global Investing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            Invest in <span className="text-gradient-gold">US Markets</span> from India
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Own a piece of Apple, Google, Amazon, and the S&amp;P 500 — without leaving India. We provide complete, step-by-step guidance to build your US equity portfolio the right way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
              Start Investing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculators" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white rounded-xl hover:bg-white/5">
              Use Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Why US Equity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Why US Markets?" title="The World's Largest" highlight="Equity Market" subtitle="The US market accounts for over 60% of global market capitalisation — home to the world's most innovative companies." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "USD Diversification", desc: "Hedge against INR depreciation. USD has appreciated ~3–4% vs INR annually over long periods." },
              { icon: TrendingUp, title: "Superior Growth", desc: "S&P 500 has delivered ~10–12% CAGR in USD over the last 30 years — outpacing most global indices." },
              { icon: Lightbulb, title: "Access to Innovation", desc: "Own stakes in Apple, Microsoft, NVIDIA, Tesla — companies that power the global digital economy." },
              { icon: BarChart3, title: "Portfolio Diversification", desc: "Low correlation with Indian markets reduces overall portfolio volatility and improves risk-adjusted returns." },
            ].map((item) => (
              <div key={item.title} className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <h3 className="font-bold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Routes */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Investment Routes" title="3 Ways to Invest" highlight="in US Equity" subtitle="Choose the route that fits your comfort level, ticket size, and tax preference." />
          <div className="mt-12 space-y-6">
            {ROUTES.map((r) => (
              <div key={r.title} className={`rounded-2xl border p-6 ${r.color}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-bold text-[#0a1628] text-xl">{r.title}</h3>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${r.badgeColor}`}>{r.badge}</span>
                </div>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">{r.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Examples</p>
                    <ul className="space-y-1.5">
                      {r.examples.map((e) => (
                        <li key={e} className="flex gap-2 text-sm text-gray-700">
                          <DollarSign className={`w-4 h-4 shrink-0 mt-0.5 ${r.iconColor}`} />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Advantages</p>
                    <ul className="space-y-1.5">
                      {r.pros.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-gray-700">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${r.iconColor}`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step guidance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Our Process" title="Complete Guidance" highlight="at Every Step" subtitle="From first question to first trade — we hold your hand through the entire journey." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <span className="text-3xl font-black text-[#c9a84c]/30">{s.step}</span>
                <h3 className="font-bold text-[#0a1628] mt-2 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taxation */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader badge="Taxation" title="Tax Treatment" highlight="for US Investments" subtitle="US equity is taxed differently than Indian equity — understanding this saves money." />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0a1628] text-white">
                  <th className="px-5 py-3.5 text-left font-semibold">Route</th>
                  <th className="px-5 py-3.5 text-left font-semibold">Short-Term Capital Gain</th>
                  <th className="px-5 py-3.5 text-left font-semibold">Long-Term Capital Gain</th>
                  <th className="px-5 py-3.5 text-left font-semibold">Note</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {TAX.map((t) => (
                  <tr key={t.label} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4 font-medium text-[#0a1628]">{t.label}</td>
                    <td className="px-5 py-4 text-gray-600">{t.stcg}</td>
                    <td className="px-5 py-4 text-gray-600">{t.ltcg}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Tax rules are subject to change. Consult a tax advisor for personal advice. TCS of 20% applies on LRS remittances above ₹7L/year (can be claimed as credit in ITR).</p>
        </div>
      </section>

      {/* Important note */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>⚠ Important:</strong> SEBI has temporarily paused fresh subscriptions in overseas mutual fund schemes under the industry-wide limit of USD 7 billion. Indian ETFs and index funds with US exposure may still be available — check fund house websites or contact us for the latest status.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Globe className="w-12 h-12 text-[#c9a84c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white font-display mb-4">Ready to Go Global?</h2>
          <p className="text-gray-300 text-sm mb-6">Book a free consultation and we&apos;ll walk you through the best route to start your US equity journey — tailored to your goals and tax situation.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
            Book Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
