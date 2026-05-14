import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, BarChart3, Target, CheckCircle2, Info } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Mutual Funds — SIP, Lumpsum, ELSS, Debt & More",
  description:
    "Explore all types of mutual funds with AnvithBizCap — equity, debt, hybrid, ELSS, liquid, SIP, SWP, and goal-based planning.",
};

const FUND_TYPES = [
  {
    title: "Equity Mutual Funds",
    icon: TrendingUp,
    color: "blue",
    desc: "Invest in stocks for long-term wealth creation. Best for 5+ year horizon.",
    examples: ["Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "ELSS"],
    risk: "High",
    returns: "12–18% (historical)",
    horizon: "5+ years",
  },
  {
    title: "Debt Mutual Funds",
    icon: Shield,
    color: "emerald",
    desc: "Invest in bonds and fixed-income securities. Safer and more rewarding than FDs in many cases.",
    examples: ["Liquid Funds", "Short Duration", "Corporate Bond", "Gilt Funds"],
    risk: "Low to Medium",
    returns: "6–9% (historical)",
    horizon: "1 day – 3 years",
  },
  {
    title: "Hybrid Funds",
    icon: BarChart3,
    color: "purple",
    desc: "A balanced mix of equity and debt — the best of both worlds.",
    examples: ["Aggressive Hybrid", "Conservative Hybrid", "Balanced Advantage", "Arbitrage"],
    risk: "Medium",
    returns: "9–13% (historical)",
    horizon: "3–5 years",
  },
  {
    title: "Liquid Funds",
    icon: Shield,
    color: "teal",
    desc: "Park your emergency corpus or short-term surplus here instead of a savings account.",
    examples: ["Overnight Funds", "Liquid Funds", "Ultra Short Duration"],
    risk: "Very Low",
    returns: "5–7% (historical)",
    horizon: "1 day – 90 days",
  },
  {
    title: "ELSS (Tax Saving)",
    icon: Target,
    color: "amber",
    desc: "Save up to ₹1.5 lakh tax under Section 80C while building equity wealth. 3-year lock-in.",
    examples: ["ELSS / Tax Saver Funds"],
    risk: "High",
    returns: "12–18% (historical)",
    horizon: "3+ years",
  },
  {
    title: "Index Funds & ETFs",
    icon: BarChart3,
    color: "indigo",
    desc: "Low-cost funds that mirror market indices like Nifty 50, Sensex, and more.",
    examples: ["Nifty 50 Index", "Sensex Index", "Nifty Next 50"],
    risk: "Medium to High",
    returns: "10–14% (historical)",
    horizon: "5+ years",
  },
];

const SIP_MODES = [
  { name: "SIP", full: "Systematic Investment Plan", desc: "Invest a fixed amount every month. Builds discipline and leverages rupee cost averaging." },
  { name: "STP", full: "Systematic Transfer Plan", desc: "Automatically move money from one fund to another — ideal for deploying lumpsum gradually." },
  { name: "SWP", full: "Systematic Withdrawal Plan", desc: "Generate a regular income stream from your mutual fund corpus — ideal for retirees." },
  { name: "Lumpsum", full: "One-time Investment", desc: "Invest a large sum at once when valuations are attractive." },
];

const colorMap: Record<string, string> = {
  blue: "text-blue-600 bg-blue-50",
  emerald: "text-emerald-600 bg-emerald-50",
  purple: "text-purple-600 bg-purple-50",
  teal: "text-teal-600 bg-teal-50",
  amber: "text-amber-600 bg-amber-50",
  indigo: "text-indigo-600 bg-indigo-50",
};

export default function MutualFundsPage() {
  return (
    <>
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Investment Product
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            Mutual Funds — <span className="text-gradient-gold">Much More Than Equity</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
            Most people think mutual funds are risky equity products. The truth? Mutual funds offer everything from ultra-safe overnight debt funds to high-growth equity options — there&apos;s a fund for every goal and risk appetite.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calculators#sip" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
              SIP Calculator <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/mf-finder" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10">
              Find Your Fund
            </Link>
          </div>
        </div>
      </section>

      {/* Awareness box */}
      <section className="py-8 bg-[#c9a84c]/5 border-y border-[#c9a84c]/20">
        <div className="max-w-4xl mx-auto px-6 flex gap-4">
          <Info className="w-6 h-6 text-[#c9a84c] shrink-0 mt-0.5" />
          <p className="text-[#0a1628] text-sm leading-relaxed">
            <strong>Investor Awareness:</strong> Mutual funds are not only equity products. Debt mutual funds invest in government securities, corporate bonds, and money market instruments. Liquid funds can earn better returns than savings accounts, and are equally accessible. Understanding the full spectrum helps you choose wisely.
          </p>
        </div>
      </section>

      {/* Fund Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Fund Categories" title="Types of Mutual Funds" highlight="We Offer" subtitle="From capital preservation to aggressive wealth creation — find the category that matches your goal." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUND_TYPES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-lg transition-all p-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colorMap[f.color]}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0a1628] text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{f.desc}</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-gray-400">Risk Level</span><span className="font-semibold text-[#0a1628]">{f.risk}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Historical Returns</span><span className="font-semibold text-[#0a1628]">{f.returns}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Ideal Horizon</span><span className="font-semibold text-[#0a1628]">{f.horizon}</span></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {f.examples.map((e) => (
                    <span key={e} className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-xs">{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Modes */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Investment Modes" title="How to Invest in" highlight="Mutual Funds" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIP_MODES.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#d4b86a] flex items-center justify-center text-[#0a1628] font-bold text-sm mx-auto mb-4">
                  {m.name}
                </div>
                <h3 className="font-bold text-[#0a1628] mb-1">{m.full}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goal-based section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Goal-Based Planning" title="Match Your Investment to" highlight="Your Life Goals" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { goal: "Child's Education", years: "10–15 years", fund: "Equity + Hybrid Funds" },
              { goal: "Retirement Corpus", years: "20–30 years", fund: "Equity Funds + SIP" },
              { goal: "Marriage Planning", years: "5–10 years", fund: "Hybrid / Balanced Funds" },
              { goal: "Emergency Fund", years: "Immediate", fund: "Liquid / Overnight Funds" },
              { goal: "Tax Saving (80C)", years: "3+ years", fund: "ELSS Funds" },
              { goal: "Wealth Creation", years: "7–10 years", fund: "Multi-Cap / Flexi-Cap" },
            ].map((g) => (
              <div key={g.goal} className="flex gap-4 p-5 rounded-xl bg-[#f8fafc] border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0a1628] text-sm">{g.goal}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{g.years} · {g.fund}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white font-display mb-4">Start Your SIP Today</h2>
          <p className="text-gray-300 mb-8">Even ₹500/month can create significant wealth over time. Let us help you find the right fund for your goals.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
              Book Free Consultation
            </Link>
            <Link href="/mf-finder" className="px-8 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10">
              Find Schemes
            </Link>
          </div>
          <p className="text-gray-500 text-xs mt-6">Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully.</p>
        </div>
      </section>
    </>
  );
}
