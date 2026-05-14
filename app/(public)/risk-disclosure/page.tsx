import type { Metadata } from "next";

export const metadata: Metadata = { title: "Risk Disclosure", description: "Risk disclosure for mutual funds, NBFC FDs, corporate bonds, Gold ETFs, US Equity, and Capital Gain Bonds." };

const PRODUCTS = [
  { name: "Equity Mutual Funds", risks: ["Market risk: NAV can fall significantly in bear markets","Concentration risk for sectoral funds","Currency risk for international funds","Liquidity risk for small-cap funds"] },
  { name: "Debt Mutual Funds", risks: ["Credit risk: Issuer may default","Interest rate risk: Rising rates reduce NAV","Liquidity risk in credit risk funds","Reinvestment risk for short-duration funds"] },
  { name: "NBFC Fixed Deposits", risks: ["Credit risk: NBFC may default (no DICGC insurance)","Liquidity risk: Premature withdrawal may carry penalty","Regulatory risk: Changes in RBI norms","Inflation risk: Returns may not beat inflation"] },
  { name: "Corporate Bonds", risks: ["Default risk: Issuer may fail to pay coupons/principal","Interest rate risk: Market value falls when rates rise","Liquidity risk: Limited secondary market","Rating downgrade risk"] },
  { name: "Gold & Silver ETFs", risks: ["Market price risk: ETF value falls if gold/silver prices decline","Liquidity risk during exchange trading halts","Expense ratio reduces net returns over time","No additional interest income unlike discontinued SGBs","Currency risk for internationally priced commodities"] },
  { name: "Capital Gain Bonds (54EC)", risks: ["Interest rate risk: Locked at ~5% for 5 years — opportunity cost if rates rise","Liquidity risk: Non-transferable, no early redemption before 5 years","Inflation risk: Interest rate may not beat inflation","Credit risk: Minimal — issuers are government-backed, but not sovereign guarantee","Interest income is fully taxable as per investor's slab"] },
  { name: "US Equity (Funds, ETFs & Direct)", risks: ["Currency risk: INR appreciation reduces USD-denominated returns","Regulatory risk: SEBI overseas investment limits can restrict fund subscriptions","Country/geopolitical risk: US Fed policy and macro events affect valuations","Withholding tax on US stock dividends (typically 25%, reducible under DTAA)","TCS of 20% applies on LRS remittances above ₹7L (claimable in ITR)","Liquidity risk for thematic funds with concentrated US sector exposure"] },
];

export default function RiskDisclosurePage() {
  return (
    <>
      <section className="gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white font-display">Risk Disclosure</h1>
          <p className="text-gray-300 mt-3">Understanding the risks associated with different investment products.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm leading-relaxed">
              <strong>All investments carry risk.</strong> The value of investments may go up or down. You may receive less than you invested. Please read this risk disclosure carefully and consult a qualified financial advisor before investing.
            </p>
          </div>
          {PRODUCTS.map((p) => (
            <div key={p.name} className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#0a1628] text-lg mb-4">{p.name}</h3>
              <ul className="space-y-2">
                {p.risks.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-gray-600">
                    <span className="text-red-400 shrink-0 mt-0.5">⚠</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-xs text-gray-400 leading-relaxed">
            This risk disclosure is not exhaustive. Investors are advised to read all scheme information documents, product brochures, and terms carefully before investing. For personalized risk assessment, please contact our advisor.
          </p>
        </div>
      </section>
    </>
  );
}
