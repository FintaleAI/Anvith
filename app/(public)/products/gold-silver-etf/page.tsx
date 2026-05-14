import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Zap, CheckCircle2, BarChart3, AlertCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Gold ETF & Silver ETF — Smart Precious Metal Investing",
  description: "Invest in Gold ETFs and Silver ETFs — the modern, cost-efficient way to participate in precious metal price movements without storage risk.",
};

export default function GoldSilverETFPage() {
  return (
    <>
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Precious Metal ETFs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            Gold ETF & Silver ETF —{" "}
            <span className="text-gradient-gold">The Smartest Way to Own Precious Metals</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Now that the Government has discontinued Sovereign Gold Bonds, Gold ETFs and Silver ETFs
            have become the most efficient route to invest in precious metals — with real-time pricing,
            high liquidity, and zero storage hassle.
          </p>
        </div>
      </section>

      {/* SGB Discontinued Notice */}
      <section className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Important update:</strong> The Government of India has discontinued the Sovereign Gold Bond (SGB) scheme.
            No new tranches are being issued. Existing SGBs remain valid till maturity, but for fresh investments in gold,
            <strong> Gold ETFs and Gold Mutual Funds are now the recommended route.</strong>
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gold ETF */}
          <div>
            <SectionHeader badge="Gold ETF" title="Invest in Gold" highlight="the Smart Way" center={false} />
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              A Gold ETF (Exchange Traded Fund) is a unit representing physical gold in dematerialised form,
              traded on stock exchanges like a share. Each unit typically represents 1 gram of 99.5% pure gold.
              Your investment tracks live gold prices, giving you full price exposure without owning physical gold.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Tracks live gold price — buy/sell any time markets are open",
                "No making charges, storage fees, or purity risk",
                "Held in your demat account — fully secure",
                "Can invest as little as 1 unit (≈ ₹80–100 range typically)",
                "Long-term capital gains (36 months+) taxed at 12.5% without indexation",
                "Can be used as collateral for loans",
                "Ideal for portfolio diversification and inflation hedge",
              ].map((b) => (
                <div key={b} className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Silver ETF */}
          <div>
            <SectionHeader badge="Silver ETF" title="Add Silver to Your" highlight="Portfolio" center={false} />
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Silver ETFs, introduced by SEBI in 2021, allow Indian investors to participate in silver price
              movements without holding physical silver. Each unit represents a defined quantity of 99.9% pure silver
              (typically 1 gram or 100 grams depending on the fund). Silver has both industrial and investment demand,
              making it a high-beta precious metal with strong upside potential.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Exposure to silver prices with high liquidity",
                "Industrial demand from EVs, solar panels, and electronics supports long-term value",
                "Traded on NSE/BSE — buy or sell in real time",
                "Stored and managed by the fund house — zero storage cost for you",
                "Long-term capital gains (36 months+) taxed at 12.5% without indexation",
                "Lower entry barrier than physical silver bars",
                "Ideal complement to a gold position in a precious metals allocation",
              ].map((b) => (
                <div key={b} className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeader
            badge="Comparison"
            title="Gold ETF vs Physical Gold"
            highlight="vs SGB (discontinued)"
          />
          <div className="mt-10 bg-gradient-to-br from-[#0a1628] to-[#1a3560] rounded-2xl p-6 text-white overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4 text-left text-gray-400 font-medium text-xs w-1/4">Feature</th>
                  <th className="py-2 px-3 text-center text-[#c9a84c] font-semibold text-xs">Gold ETF ✓</th>
                  <th className="py-2 px-3 text-center text-gray-300 font-semibold text-xs">Physical Gold</th>
                  <th className="py-2 px-3 text-center text-gray-500 font-semibold text-xs">SGB (Discontinued)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Availability",    etf: "Always open",      physical: "Anytime",        sgb: "❌ Discontinued" },
                  { feature: "Making Charges",  etf: "None",             physical: "8–12%",          sgb: "None" },
                  { feature: "Storage Risk",    etf: "None",             physical: "Theft/damage",   sgb: "None" },
                  { feature: "Liquidity",       etf: "High (exchange)",  physical: "Low",            sgb: "Limited" },
                  { feature: "Extra Interest",  etf: "None",             physical: "None",           sgb: "2.5% p.a." },
                  { feature: "Purity Risk",     etf: "None (99.5%)",     physical: "Yes",            sgb: "None" },
                  { feature: "Tax (36m+)",      etf: "12.5% LTCG",       physical: "12.5% LTCG",     sgb: "Exempt at maturity" },
                  { feature: "Min Investment",  etf: "~1 unit",          physical: "1g+",            sgb: "1g" },
                ].map((r) => (
                  <tr key={r.feature} className="border-b border-white/5 last:border-0">
                    <td className="py-2.5 pr-4 text-gray-400 text-xs">{r.feature}</td>
                    <td className="py-2.5 px-3 text-center text-[#c9a84c] text-xs font-medium">{r.etf}</td>
                    <td className="py-2.5 px-3 text-center text-gray-300 text-xs">{r.physical}</td>
                    <td className="py-2.5 px-3 text-center text-gray-500 text-xs">{r.sgb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why invest now */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Why Now?" title="Precious Metals in" highlight="Your Portfolio" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Inflation Hedge",
                desc: "Gold has preserved purchasing power for centuries. As INR inflation persists, a 5–10% allocation in gold protects your real wealth.",
              },
              {
                icon: Zap,
                title: "Silver's Industrial Demand",
                desc: "Unlike gold, silver has growing industrial use — in EV batteries, solar panels, and semiconductors — giving it a dual demand driver.",
              },
              {
                icon: BarChart3,
                title: "Low Correlation",
                desc: "Precious metals often move independently of equities, making them a powerful portfolio diversifier during market downturns.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <item.icon className="w-6 h-6 text-[#c9a84c] mb-3" />
                <h3 className="font-bold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <TrendingUp className="w-10 h-10 text-[#c9a84c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white font-display mb-4">
            Start Investing in Gold & Silver ETFs
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            Our advisors will help you determine the right precious metal allocation for your portfolio —
            whether through Gold ETFs, Silver ETFs, or Gold Mutual Funds.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90"
          >
            Talk to an Advisor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
