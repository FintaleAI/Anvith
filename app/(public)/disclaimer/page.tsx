import type { Metadata } from "next";

export const metadata: Metadata = { title: "Disclaimer", description: "AnvithBizCap website disclaimer and regulatory disclosures." };

export default function DisclaimerPage() {
  return (
    <>
      <section className="gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white font-display">Disclaimer</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose-blog space-y-5 text-gray-600 text-sm leading-relaxed">
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="font-bold text-amber-800 mb-2">Important Notice</p>
            <p className="text-amber-700">Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future results.</p>
          </div>
          <h2>About AnvithBizCap</h2>
          <p>AnvithBizCap is a mutual fund distributor registered with AMFI (Association of Mutual Funds in India). We distribute mutual fund products of various AMCs and receive commission/distribution fees from AMCs for distribution services rendered.</p>
          <h2>Not Investment Advice</h2>
          <p>The information provided on this website is for general educational purposes only and does not constitute investment advice, financial advice, or a recommendation to buy or sell any specific investment product. Investment decisions should be made based on your individual financial situation, goals, and risk tolerance.</p>
          <h2>Calculator Disclaimer</h2>
          <p>All calculators on this website use assumed rates of return for illustrative purposes only. Actual returns may be higher or lower than illustrated. Calculators do not account for taxes, transaction costs, or fund-specific expenses unless explicitly stated.</p>
          <h2>Third-Party Links</h2>
          <p>Links to third-party websites are provided for convenience only. AnvithBizCap does not endorse or take responsibility for the content of external websites.</p>
          <h2>SEBI/AMFI Registration</h2>
          <p>AnvithBizCap is registered as a mutual fund distributor with AMFI. Our ARN number is displayed on all transaction documents. We comply with SEBI guidelines on distributor conduct, disclosure, and investor grievance redressal.</p>
          <h2>Product Suitability</h2>
          <p>Product suitability depends on individual investor goals, risk profile, investment horizon, and financial position. We recommend consulting with our advisor before making any investment decision.</p>
        </div>
      </section>
    </>
  );
}
