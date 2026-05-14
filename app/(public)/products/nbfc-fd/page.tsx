import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "NBFC Fixed Deposits — Higher Returns, Smarter Parking",
  description: "Learn about NBFC Fixed Deposits — what they are, how they differ from bank FDs, benefits, risks, and suitability.",
};

export default function NBFCFDPage() {
  return (
    <>
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">Fixed Income</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            NBFC Fixed Deposits — <span className="text-gradient-gold">More Than a Bank FD</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Earn better interest rates than traditional bank FDs by investing in NBFC (Non-Banking Financial Company) Fixed Deposits.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader badge="What Are NBFCs?" title="Understanding" highlight="NBFC Fixed Deposits" center={false} />
              <div className="mt-8 space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>A Non-Banking Financial Company (NBFC) is a financial institution registered under the Companies Act that provides banking services without holding a banking licence. Examples include Bajaj Finance, Mahindra Finance, Shriram Finance, and more.</p>
                <p>NBFC Fixed Deposits are term deposits offered by these companies — similar to bank FDs but typically offering higher interest rates due to their risk premium.</p>
                <p>They are regulated by the Reserve Bank of India (RBI) and the Ministry of Corporate Affairs, providing a layer of regulatory oversight.</p>
              </div>
              <div className="mt-8 space-y-3">
                <h3 className="font-bold text-[#0a1628]">Key Benefits</h3>
                {[
                  "Higher interest rates compared to bank FDs (typically 1–3% more)",
                  "Fixed, predictable returns — ideal for conservative investors",
                  "Flexible tenures from 12 months to 5+ years",
                  "Monthly, quarterly, or cumulative payout options",
                  "Regulated by RBI — offering a degree of safety",
                ].map((b) => (
                  <div key={b} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Bank FD vs NBFC FD comparison */}
              <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#0a1628] mb-4">Bank FD vs NBFC FD</h3>
                <div className="space-y-3">
                  {[
                    { feature: "Interest Rate", bank: "5.5–7%", nbfc: "7.5–9.5%", better: "nbfc" },
                    { feature: "Safety", bank: "DICGC insured up to ₹5L", nbfc: "No DICGC, regulated by RBI", better: "bank" },
                    { feature: "Credit Rating", bank: "Govt. backed", nbfc: "AAA to A rated", better: "bank" },
                    { feature: "Returns", bank: "Lower", nbfc: "Higher", better: "nbfc" },
                    { feature: "Liquidity", bank: "Good", nbfc: "Moderate", better: "bank" },
                  ].map((r) => (
                    <div key={r.feature} className="grid grid-cols-3 gap-2 text-xs py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-500 font-medium">{r.feature}</span>
                      <span className={r.better === "bank" ? "text-emerald-600 font-semibold" : "text-gray-600"}>{r.bank}</span>
                      <span className={r.better === "nbfc" ? "text-emerald-600 font-semibold" : "text-gray-600"}>{r.nbfc}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                    <span></span>
                    <span className="text-[#0a1628] font-bold text-center">Bank FD</span>
                    <span className="text-[#0a1628] font-bold text-center">NBFC FD</span>
                  </div>
                </div>
              </div>

              {/* Risk */}
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <h3 className="font-bold text-amber-800">Important Risk Considerations</h3>
                </div>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li>• NBFC FDs are not insured by DICGC (unlike bank FDs up to ₹5 lakh)</li>
                  <li>• Credit risk depends on the financial health of the NBFC</li>
                  <li>• Always check the credit rating (AAA is safest)</li>
                  <li>• Invest only in well-known, RBI-regulated NBFCs</li>
                  <li>• Suitability depends on your risk tolerance and goals</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex gap-3 mb-3">
                  <Info className="w-5 h-5 text-blue-600 shrink-0" />
                  <h3 className="font-bold text-blue-800">Who Is It Suitable For?</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Investors seeking better than FD returns with predictability</li>
                  <li>• Those comfortable with slightly higher risk for higher returns</li>
                  <li>• Senior citizens looking for regular income with good yields</li>
                  <li>• Portfolio diversification alongside bank FDs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Shield className="w-12 h-12 text-[#c9a84c] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white font-display mb-4">Want to Explore NBFC FDs?</h2>
          <p className="text-gray-300 text-sm mb-6">We help you identify the right NBFC FDs based on your risk profile, tenure, and return expectations.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
            Talk to an Advisor <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-500 text-xs mt-4">Investments subject to risk. Please consult your advisor before investing.</p>
        </div>
      </section>
    </>
  );
}
