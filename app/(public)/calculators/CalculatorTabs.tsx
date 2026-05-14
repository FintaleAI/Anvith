"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const TABS = [
  { id: "sip", label: "SIP" },
  { id: "lumpsum", label: "Lumpsum" },
  { id: "swp", label: "SWP" },
  { id: "stp", label: "STP" },
  { id: "stepup", label: "Step-Up SIP" },
  { id: "goal", label: "Goal Planner" },
  { id: "retirement", label: "Retirement" },
  { id: "education", label: "Child Education" },
  { id: "marriage", label: "Marriage" },
  { id: "emi", label: "EMI" },
  { id: "fd", label: "FD" },
  { id: "inflation", label: "Inflation" },
  { id: "cagr", label: "CAGR" },
  { id: "elss", label: "ELSS / Tax" },
  { id: "fv", label: "Future Value" },
  { id: "pv", label: "Present Value" },
] as const;

type TabId = typeof TABS[number]["id"];

// Lazy-load the heavy calculator components
const Calcs = dynamic(
  () => import("@/components/calculators/CalculatorShell").then((m) => ({ default: m.SIPCalculator })),
  { ssr: false }
);

import {
  SIPCalculator, LumpsumCalculator, SWPCalculator, STPCalculator, StepUpSIPCalculator,
  GoalPlanningCalculator, RetirementCalculator, ChildEducationCalculator, MarriageCalculator,
  EMICalculator, FDCalculator, InflationCalculator, CAGRCalculator, ELSSCalculator,
  FutureValueCalculator, PresentValueCalculator
} from "@/components/calculators/CalculatorShell";

const CALCULATOR_MAP: Record<TabId, React.ComponentType> = {
  sip: SIPCalculator,
  lumpsum: LumpsumCalculator,
  swp: SWPCalculator,
  stp: STPCalculator,
  stepup: StepUpSIPCalculator,
  goal: GoalPlanningCalculator,
  retirement: RetirementCalculator,
  education: ChildEducationCalculator,
  marriage: MarriageCalculator,
  emi: EMICalculator,
  fd: FDCalculator,
  inflation: InflationCalculator,
  cagr: CAGRCalculator,
  elss: ELSSCalculator,
  fv: FutureValueCalculator,
  pv: PresentValueCalculator,
};

export default function CalculatorTabs() {
  const [active, setActive] = useState<TabId>("sip");
  const ActiveCalc = CALCULATOR_MAP[active];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              active === t.id
                ? "bg-[#0a1628] text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active calculator */}
      <ActiveCalc />
    </div>
  );
}
