import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Star, AlertTriangle, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Corporate Bonds — Fixed Income with Higher Yields",
  description: "Invest in corporate bonds through AnvithBizCap. Understand coupon yields, credit ratings, and how bonds fit your portfolio.",
};

export default function CorporateBondsPage() {
  return (
    <>
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">Fixed Income</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            Corporate Bonds — <span className="text-gradient-gold">Predictable Returns from Top Companies</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Earn regular income by lending money to blue-chip and well-rated Indian companies through corporate bonds.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeader badge="Learn" title="What Are" highlight="Corporate Bonds?" center={false} />
              <div className="mt-8 space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>When a company needs to raise funds, it can issue bonds — essentially a loan from investors. In exchange, the company promises to pay a fixed interest rate (the coupon) and return the principal at maturity.</p>
                <p>Corporate bonds offer predictable income streams and are generally safer than equity, while offering higher yields than government bonds.</p>
                <p>Credit rating agencies (CRISIL, ICRA, CARE) assess the creditworthiness of bond issuers, giving investors clarity on risk.</p>
              </div>

              <div className="mt-8 space-y-3">
                <h3 className="font-bold text-[#0a1628]">Key Concepts</h3>
                {[
                  { term: "Coupon Rate", def: "The annual interest rate paid by the bond issuer on the face value" },
                  { term: "Yield to Maturity (YTM)", def: "The total return if the bond is held till maturity — includes coupon + price difference" },
                  { term: "Credit Rating", def: "AAA is highest safety. Lower ratings offer higher yields but more risk" },
                  { term: "Face Value", def: "The principal amount returned at maturity (typically ₹1,000)" },
                  { term: "Duration", def: "The effective time period of cash flows — helps measure interest rate sensitivity" },
                ].map((k) => (
                  <div key={k.term} className="p-4 bg-[#f8fafc] rounded-xl border border-gray-100">
                    <span className="font-semibold text-[#c9a84c] text-sm">{k.term}: </span>
                    <span className="text-gray-600 text-sm">{k.def}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#0a1628] mb-4">Benefits of Corporate Bonds</h3>
                {[
                  "Higher yield than government securities and savings accounts",
                  "Fixed, predictable income through regular coupon payments",
                  "Capital preservation if held to maturity (for quality bonds)",
                  "Portfolio diversification — not correlated with equity markets",
                  "Available in various tenures: 1 year to 10+ years",
                  "Suitable for HNI and retail investors alike",
                ].map((b) => (
                  <div key={b} className="flex gap-3 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{b}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#0a1628] mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#c9a84c]" />
                  Credit Rating Guide
                </h3>
                <div className="space-y-2">
                  {[
                    { rating: "AAA", safety: "Highest Safety", yield: "Lower", color: "emerald" },
                    { rating: "AA", safety: "High Safety", yield: "Moderate", color: "blue" },
                    { rating: "A", safety: "Good Safety", yield: "Moderate-High", color: "amber" },
                    { rating: "BBB", safety: "Adequate Safety", yield: "Higher", color: "orange" },
                  ].map((r) => (
                    <div key={r.rating} className="flex items-center gap-3 text-sm">
                      <span className={`w-12 px-2 py-1 rounded-md text-center font-bold text-xs bg-${r.color}-100 text-${r.color}-700`}>{r.rating}</span>
                      <span className="text-gray-600 flex-1">{r.safety}</span>
                      <span className="text-gray-400 text-xs">Yield: {r.yield}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <h3 className="font-bold text-amber-800">Risk Considerations</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-amber-700">
                  <li>• Credit risk: Issuer may default on payments</li>
                  <li>• Interest rate risk: Bond prices fall when rates rise</li>
                  <li>• Liquidity risk: Secondary market may be thin</li>
                  <li>• Always check credit rating and issuer financials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <BarChart3 className="w-12 h-12 text-[#c9a84c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white font-display mb-4">Explore Corporate Bond Opportunities</h2>
          <p className="text-gray-300 text-sm mb-6">We curate high-quality corporate bond offerings from rated issuers. Talk to our advisor to find the right bond for your portfolio.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
            Talk to an Advisor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
