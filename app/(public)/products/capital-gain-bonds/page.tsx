import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Clock, IndianRupee, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Capital Gain Bonds (54EC) — Save Tax on Property Sale",
  description: "Invest in 54EC Capital Gain Bonds from NHAI, REC, PFC, and IRFC to save long-term capital gains tax on sale of land or property. Lock-in 5 years, up to ₹50 lakhs.",
};

export default function CapitalGainBondsPage() {
  return (
    <>
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Tax-Saving Bonds
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            Capital Gain Bonds (Section 54EC) —{" "}
            <span className="text-gradient-gold">Save Tax on Your Property Sale</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Sold land, a house, or commercial property? Reinvest your long-term capital gains into
            54EC bonds within 6 months and legally eliminate your entire LTCG tax liability.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader badge="What Are 54EC Bonds?" title="Capital Gain Bonds" highlight="Explained Simply" center={false} />
            <div className="mt-6 space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Under Section 54EC of the Income Tax Act, if you earn a Long-Term Capital Gain (LTCG) from
                the sale of land or a building, you can save the entire capital gains tax by investing that
                gain into specified bonds within <strong>6 months of the date of sale</strong>.
              </p>
              <p>
                These bonds are issued by government-backed infrastructure companies — NHAI (National Highways
                Authority of India), REC (Rural Electrification Corporation), PFC (Power Finance Corporation),
                and IRFC (Indian Railway Finance Corporation). All four carry the highest safety ratings.
              </p>
              <p>
                The bonds have a <strong>5-year lock-in period</strong> (increased from 3 years for bonds issued
                after April 2018). You cannot transfer, pledge, or redeem them before maturity. The interest
                earned is taxable as per your income tax slab.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="font-bold text-[#0a1628]">Key Benefits</h3>
              {[
                "Complete LTCG tax exemption — no capital gains tax payable",
                "Issued by NHAI, REC, PFC, IRFC — AAA rated, government-backed",
                "Interest rate ~5.00–5.25% per annum (paid annually)",
                "Maximum investment: ₹50 lakhs per financial year",
                "Applicable on sale of land, building, or both",
                "Safe fixed income for 5 years post property sale",
              ].map((b) => (
                <div key={b} className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Key parameters card */}
            <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3560] rounded-2xl p-6 text-white">
              <FileText className="w-8 h-8 text-[#c9a84c] mb-4" />
              <h3 className="font-bold text-xl mb-5">Key Parameters at a Glance</h3>
              <div className="space-y-3">
                {[
                  { label: "Eligible Gain",         value: "LTCG from land / building sale" },
                  { label: "Investment Window",      value: "Within 6 months of sale date" },
                  { label: "Issuers",                value: "NHAI · REC · PFC · IRFC" },
                  { label: "Lock-in Period",         value: "5 years (non-transferable)" },
                  { label: "Maximum Investment",     value: "₹50 lakhs per financial year" },
                  { label: "Interest Rate",          value: "~5.00–5.25% p.a. (taxable)" },
                  { label: "Interest Payment",       value: "Annually, to registered bank account" },
                  { label: "Minimum Investment",     value: "₹10,000 (face value)" },
                  { label: "Tax on Capital Gain",    value: "Nil (fully exempt u/s 54EC)" },
                  { label: "Tax on Interest",        value: "As per income tax slab" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between py-1.5 border-b border-white/10 last:border-0 text-sm">
                    <span className="text-gray-400">{r.label}</span>
                    <span className="text-white font-medium text-right max-w-[55%]">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Critical: 6-Month Deadline</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    You <strong>must invest within 6 months</strong> of the property sale date to claim the 54EC
                    exemption. If the return is due before the 6 months are up, you can still invest and claim
                    the exemption by declaring it as a capital gain deposit. Contact us immediately after your
                    sale is executed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader badge="Process" title="How to Invest" highlight="in 54EC Bonds" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1", icon: IndianRupee, title: "Sell the Property", desc: "Complete the sale of your land or building and note the date of sale and capital gain amount." },
              { step: "2", icon: Clock,       title: "Act Within 6 Months", desc: "Contact us immediately. The 6-month window starts from the date of sale transfer." },
              { step: "3", icon: FileText,    title: "Choose the Issuer", desc: "Select from NHAI, REC, PFC, or IRFC based on availability. We help you compare and apply." },
              { step: "4", icon: Shield,      title: "Tax Exemption Claimed", desc: "File your ITR with the 54EC investment details and claim full exemption on the capital gain." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#c9a84c] font-bold text-sm">{s.step}</span>
                </div>
                <s.icon className="w-5 h-5 text-[#c9a84c] mx-auto mb-2" />
                <h4 className="font-bold text-[#0a1628] text-sm mb-1">{s.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Issuer comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader badge="Issuers" title="Who Issues" highlight="54EC Bonds?" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "NHAI",  full: "National Highways Authority of India",  rating: "AAA / Sovereign",  note: "Backed by Ministry of Road Transport & Highways" },
              { name: "REC",   full: "Rural Electrification Corporation",      rating: "AAA (CRISIL)",     note: "Govt. of India enterprise under Ministry of Power" },
              { name: "PFC",   full: "Power Finance Corporation",              rating: "AAA (CRISIL)",     note: "Navratna PSU — finances power sector projects" },
              { name: "IRFC",  full: "Indian Railway Finance Corporation",     rating: "AAA (CRISIL)",     note: "Financing arm of Indian Railways, Govt. of India" },
            ].map((issuer) => (
              <div key={issuer.name} className="bg-[#f8fafc] rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-12 h-8 bg-[#0a1628] text-[#c9a84c] rounded font-bold text-xs flex items-center justify-center">{issuer.name}</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">{issuer.rating}</span>
                </div>
                <h4 className="font-semibold text-[#0a1628] text-sm">{issuer.full}</h4>
                <p className="text-gray-500 text-xs mt-1">{issuer.note}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Availability of bonds from each issuer varies. Contact us to check current open issues.
          </p>
        </div>
      </section>

      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white font-display mb-4">
            Just Sold a Property? Act Now.
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            The 6-month window moves fast. Our team will walk you through the entire process —
            from calculating your exact capital gain to completing the bond application.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90"
          >
            Get Expert Guidance <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
