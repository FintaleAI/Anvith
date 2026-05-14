import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions", description: "AnvithBizCap Terms and Conditions of use." };

export default function TermsPage() {
  return (
    <>
      <section className="gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white font-display">Terms & Conditions</h1>
          <p className="text-gray-300 mt-3">Last updated: May 2026</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose-blog space-y-6 text-gray-600 text-sm leading-relaxed">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the AnvithBizCap website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of our services.</p>
          <h2>2. Nature of Services</h2>
          <p>AnvithBizCap is a registered mutual fund distributor (AMFI). We facilitate investment transactions in mutual funds and provide related financial information. We are not a portfolio manager, investment advisor, or guaranteed return provider.</p>
          <h2>3. Investment Disclaimer</h2>
          <p>All investment products carry risk. Mutual fund investments are subject to market risks. Past performance is not indicative of future returns. Calculators on this website are illustrative tools only and do not guarantee actual returns.</p>
          <h2>4. User Obligations</h2>
          <p>You agree to provide accurate information, not misuse our platform, comply with applicable laws, and not attempt to gain unauthorized access to our systems.</p>
          <h2>5. Intellectual Property</h2>
          <p>All content on this website including text, graphics, logos, and data is the property of AnvithBizCap. Unauthorized reproduction or distribution is prohibited.</p>
          <h2>6. Limitation of Liability</h2>
          <p>AnvithBizCap shall not be liable for investment losses, indirect damages, or losses arising from reliance on information provided on this website. All investment decisions are the user&apos;s own responsibility.</p>
          <h2>7. Governing Law</h2>
          <p>These terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts in Vadodara, Gujarat.</p>
          <h2>8. Changes to Terms</h2>
          <p>We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
        </div>
      </section>
    </>
  );
}
