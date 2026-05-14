import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "AnvithBizCap Privacy Policy — how we collect, use, and protect your personal information." };

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white font-display">Privacy Policy</h1>
          <p className="text-gray-300 mt-3">Last updated: May 2026</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose-blog space-y-6 text-gray-600 text-sm leading-relaxed">
          <h2>1. Information We Collect</h2>
          <p>When you submit a consultation request or open an account, we collect your name, mobile number, email address, city, PAN number, and investment preferences. We also collect basic analytics data (page visits, browser type) to improve our website.</p>
          <h2>2. How We Use Your Information</h2>
          <p>We use your personal information to: contact you regarding investment services, create your investment account, send relevant updates and alerts, comply with regulatory requirements (AMFI, SEBI, KYC norms), and improve our services.</p>
          <h2>3. Data Sharing</h2>
          <p>We do not sell your personal data. We may share information with: mutual fund AMCs and RTAs for transaction processing, KYC registration agencies for verification, and regulatory authorities as required by law.</p>
          <h2>4. Data Security</h2>
          <p>We implement reasonable security measures to protect your data. However, no internet transmission is 100% secure. We encourage you to protect your login credentials and contact us immediately if you suspect unauthorized access.</p>
          <h2>5. Cookies</h2>
          <p>Our website uses basic cookies for session management and analytics. You can disable cookies in your browser settings, though this may affect website functionality.</p>
          <h2>6. Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data by contacting us at hello@anvithbizcap.com.</p>
          <h2>7. Contact</h2>
          <p>For privacy-related queries, contact us at: hello@anvithbizcap.com or AnvithBizCap, Vadodara, Gujarat, India.</p>
        </div>
      </section>
    </>
  );
}
