import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Open Investment Account — Indian & NRI Investors",
  description: "Start your investment journey with AnvithBizCap. Open your mutual fund account online — for Indian residents and NRIs.",
};

export default function RegisterPage() {
  return (
    <>
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">Get Started</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
            Open Your <span className="text-gradient-gold">Investment Account</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Start your mutual fund investment journey. Submit your details below and our team will guide you through the onboarding process.</p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-6">
          <RegisterForm />
        </div>
      </section>

      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs text-center text-gray-400 leading-relaxed">
            Your information is secure and will only be used for investment account creation purposes. We do not share your personal data with third parties. By submitting this form, you consent to being contacted by AnvithBizCap for investment-related services. Mutual fund investments are subject to market risks.
          </p>
        </div>
      </section>
    </>
  );
}
