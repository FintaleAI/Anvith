import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import CalculatorTabs from "./CalculatorTabs";

export const metadata: Metadata = {
  title: "Investment Calculators — SIP, Lumpsum, Retirement, Goal Planner & More",
  description: "Free investment calculators: SIP, Lumpsum, SWP, STP, Goal Planner, Retirement, Child Education, ELSS, FD, EMI, CAGR, Step-Up SIP, and more.",
};

export default function CalculatorsPage() {
  return (
    <>
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Free Tools
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
            Investment <span className="text-gradient-gold">Calculators</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            16 powerful calculators to plan every aspect of your financial life — from SIP to retirement.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <CalculatorTabs />
        </div>
      </section>

      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs text-center text-gray-400 leading-relaxed">
            <strong>Disclaimer:</strong> All calculations are illustrative only and based on assumed rates of return. Actual returns may vary based on market conditions, fund performance, and other factors. These tools are for educational purposes and do not constitute investment advice. Mutual fund investments are subject to market risks. Please consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </section>
    </>
  );
}
