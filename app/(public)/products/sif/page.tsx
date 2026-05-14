import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, CheckCircle2, Info } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "SIFs — Specialised Investment Funds",
  description: "Learn about Specialised Investment Funds (SIFs) — a new category of investment products for informed investors.",
};

export default function SIFPage() {
  return (
    <>
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">New Category</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            Specialised Investment Funds <span className="text-gradient-gold">(SIFs)</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">A new bridge between traditional mutual funds and Portfolio Management Services — offering flexibility, diversification, and access to specialised strategies.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader badge="What Are SIFs?" title="Understanding" highlight="Specialised Investment Funds" center={false} />
            <div className="mt-8 space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>Specialised Investment Funds (SIFs) are a relatively new product category introduced by SEBI, designed to sit between regular mutual funds and Portfolio Management Services (PMS).</p>
              <p>SIFs offer access to more flexible investment strategies, including long-short equity, special situations, and thematic concentrated portfolios — strategies not available in conventional mutual funds.</p>
              <p>They are designed for investors who are more informed and want access to differentiated strategies beyond what standard mutual funds offer, typically with a minimum investment threshold.</p>
            </div>

            <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex gap-3 mb-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <h3 className="font-bold text-blue-800">Evolving Product Category</h3>
              </div>
              <p className="text-blue-700 text-sm leading-relaxed">
                SIFs are an evolving product category. SEBI guidelines and operational details are being refined. We will update this section with complete details as the product matures. Please contact us for the latest information on SIF availability and suitability.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
              <Lightbulb className="w-6 h-6 text-[#c9a84c] mb-3" />
              <h3 className="font-bold text-[#0a1628] mb-4">Key Characteristics</h3>
              {[
                "More flexible investment mandate than traditional mutual funds",
                "Access to specialised strategies: long-short, event-driven, thematic",
                "Higher minimum investment than regular mutual funds",
                "Managed by SEBI-registered fund managers",
                "Designed for financially savvy, informed investors",
                "Transparent, regulated structure with periodic disclosures",
              ].map((c) => (
                <div key={c} className="flex gap-3 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{c}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3560] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">SIF vs Mutual Fund vs PMS</h3>
              <div className="space-y-2 text-xs">
                {[
                  { feature: "Min. Investment", mf: "₹500+", sif: "₹10L+", pms: "₹50L+" },
                  { feature: "Flexibility", mf: "Standard", sif: "High", pms: "Very High" },
                  { feature: "Strategy Types", mf: "Long-only", sif: "Long-short+", pms: "Bespoke" },
                  { feature: "Regulation", mf: "SEBI", sif: "SEBI", pms: "SEBI" },
                ].map((r) => (
                  <div key={r.feature} className="grid grid-cols-4 gap-2 py-1.5 border-b border-white/10 last:border-0">
                    <span className="text-gray-400">{r.feature}</span>
                    <span className="text-gray-200">{r.mf}</span>
                    <span className="text-[#c9a84c] font-semibold">{r.sif}</span>
                    <span className="text-gray-200">{r.pms}</span>
                  </div>
                ))}
                <div className="grid grid-cols-4 gap-2 pt-2 font-bold">
                  <span></span>
                  <span className="text-gray-400">MF</span>
                  <span className="text-[#c9a84c]">SIF</span>
                  <span className="text-gray-400">PMS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white font-display mb-4">Interested in SIFs?</h2>
          <p className="text-gray-300 text-sm mb-6">Connect with our advisor to understand if SIFs are suitable for your investment profile and goals. We&apos;ll keep you updated as this product category develops.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90">
            Learn More <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-500 text-xs mt-4">SIFs are subject to SEBI regulations and are suitable only for informed investors. Consult your advisor before investing.</p>
        </div>
      </section>
    </>
  );
}
