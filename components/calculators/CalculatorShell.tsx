"use client";

import { useState, useCallback } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { formatNumber } from "@/lib/utils";

// ─── SIP ───────────────────��───────────────────────────────────────��─────────
export function SIPCalculator() {
  const [sip, setSip] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const months = years * 12;
  const r = rate / 100 / 12;
  const fv = r === 0 ? sip * months : sip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const invested = sip * months;
  const returns = Math.max(fv - invested, 0);

  const chartData = [
    { name: "Invested", value: Math.round(invested) },
    { name: "Est. Returns", value: Math.round(returns) },
  ];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout
      title="SIP Calculator"
      subtitle="Systematic Investment Plan"
      result={{ label: "Total Value", value: `₹${formatNumber(fv)}` }}
      chartData={chartData}
      chartColors={COLORS}
      metrics={[
        { label: "Invested Amount", value: `₹${formatNumber(invested)}` },
        { label: "Est. Returns", value: `₹${formatNumber(returns)}` },
        { label: "Total Value", value: `₹${formatNumber(fv)}`, highlight: true },
      ]}
    >
      <Slider label="Monthly SIP" value={sip} min={500} max={500000} step={500} format="₹" onChange={setSip} />
      <Slider label="Expected Return (p.a.)" value={rate} min={1} max={30} step={0.5} format="%" onChange={setRate} />
      <Slider label="Time Period" value={years} min={1} max={40} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── LUMPSUM ───────────────��──────────────────────���──────────────────────────
export function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const fv = principal * Math.pow(1 + rate / 100, years);
  const returns = Math.max(fv - principal, 0);
  const chartData = [{ name: "Invested", value: principal }, { name: "Est. Returns", value: Math.round(returns) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="Lumpsum Calculator" subtitle="One-time Investment"
      result={{ label: "Total Value", value: `₹${formatNumber(fv)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Invested Amount", value: `₹${formatNumber(principal)}` },
        { label: "Est. Returns", value: `₹${formatNumber(returns)}` },
        { label: "Total Value", value: `₹${formatNumber(fv)}`, highlight: true },
      ]}>
      <Slider label="Investment Amount" value={principal} min={10000} max={10000000} step={10000} format="₹" onChange={setPrincipal} />
      <Slider label="Expected Return (p.a.)" value={rate} min={1} max={30} step={0.5} format="%" onChange={setRate} />
      <Slider label="Time Period" value={years} min={1} max={40} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── SWP ───────────────────────���───────────────────────���─────────────────────
export function SWPCalculator() {
  const [corpus, setCorpus] = useState(1000000);
  const [withdrawal, setWithdrawal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const r = rate / 100 / 12;
  const n = years * 12;
  let balance = corpus;
  let totalWithdrawn = 0;
  for (let i = 0; i < n; i++) {
    balance = balance * (1 + r) - withdrawal;
    totalWithdrawn += withdrawal;
    if (balance < 0) { balance = 0; break; }
  }

  const chartData = [
    { name: "Remaining", value: Math.max(Math.round(balance), 0) },
    { name: "Withdrawn", value: totalWithdrawn },
  ];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="SWP Calculator" subtitle="Systematic Withdrawal Plan"
      result={{ label: "Remaining Corpus", value: `₹${formatNumber(balance)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Initial Corpus", value: `₹${formatNumber(corpus)}` },
        { label: "Total Withdrawn", value: `₹${formatNumber(totalWithdrawn)}` },
        { label: "Remaining Corpus", value: `₹${formatNumber(balance)}`, highlight: true },
      ]}>
      <Slider label="Initial Corpus" value={corpus} min={100000} max={50000000} step={100000} format="₹" onChange={setCorpus} />
      <Slider label="Monthly Withdrawal" value={withdrawal} min={1000} max={200000} step={1000} format="₹" onChange={setWithdrawal} />
      <Slider label="Expected Return (p.a.)" value={rate} min={1} max={20} step={0.5} format="%" onChange={setRate} />
      <Slider label="Withdrawal Period" value={years} min={1} max={30} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── STEP-UP SIP ────────────────────��──────────────────���─────────────────────
export function StepUpSIPCalculator() {
  const [sip, setSip] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);

  let fv = 0, invested = 0, currentSip = sip;
  const r = rate / 100 / 12;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      fv = fv * (1 + r) + currentSip;
      invested += currentSip;
    }
    currentSip = currentSip * (1 + stepUp / 100);
  }
  const returns = Math.max(fv - invested, 0);
  const chartData = [{ name: "Invested", value: Math.round(invested) }, { name: "Est. Returns", value: Math.round(returns) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="Step-Up SIP Calculator" subtitle="Increasing SIP annually"
      result={{ label: "Total Value", value: `₹${formatNumber(fv)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Total Invested", value: `₹${formatNumber(invested)}` },
        { label: "Est. Returns", value: `₹${formatNumber(returns)}` },
        { label: "Total Value", value: `₹${formatNumber(fv)}`, highlight: true },
      ]}>
      <Slider label="Initial Monthly SIP" value={sip} min={500} max={200000} step={500} format="₹" onChange={setSip} />
      <Slider label="Annual Step-Up %" value={stepUp} min={0} max={50} step={1} format="%" onChange={setStepUp} />
      <Slider label="Expected Return (p.a.)" value={rate} min={1} max={30} step={0.5} format="%" onChange={setRate} />
      <Slider label="Time Period" value={years} min={1} max={40} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── GOAL PLANNING ───────────────────────────��───────────────────────────────
export function GoalPlanningCalculator() {
  const [goal, setGoal] = useState(5000000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(6);

  const inflatedGoal = goal * Math.pow(1 + inflation / 100, years);
  const r = rate / 100 / 12;
  const n = years * 12;
  const sipRequired = r === 0 ? inflatedGoal / n : (inflatedGoal * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
  const lumpsumRequired = inflatedGoal / Math.pow(1 + rate / 100, years);

  const chartData = [
    { name: "Today's Goal", value: goal },
    { name: "Future Goal (inflation)", value: Math.round(inflatedGoal) },
  ];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="Goal Planning Calculator" subtitle="Future goal with inflation"
      result={{ label: "SIP Required", value: `₹${formatNumber(sipRequired)}/mo` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Goal Value Today", value: `₹${formatNumber(goal)}` },
        { label: "Inflation-adjusted Goal", value: `₹${formatNumber(inflatedGoal)}` },
        { label: "SIP Required/month", value: `₹${formatNumber(sipRequired)}`, highlight: true },
        { label: "Lumpsum Required", value: `₹${formatNumber(lumpsumRequired)}` },
      ]}>
      <Slider label="Target Goal Amount" value={goal} min={100000} max={100000000} step={100000} format="₹" onChange={setGoal} />
      <Slider label="Expected Return (p.a.)" value={rate} min={1} max={30} step={0.5} format="%" onChange={setRate} />
      <Slider label="Time to Goal" value={years} min={1} max={40} step={1} format="yr" onChange={setYears} />
      <Slider label="Inflation Rate" value={inflation} min={0} max={15} step={0.5} format="%" onChange={setInflation} />
    </CalcLayout>
  );
}

// ─── RETIREMENT ──────────────────────────────────────────────────────────────
export function RetirementCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthly, setMonthly] = useState(50000);
  const [rate, setRate] = useState(12);
  const [postRate, setPostRate] = useState(7);
  const [inflation, setInflation] = useState(6);
  const [lifeExp, setLifeExp] = useState(80);

  const yearsToRetire = retireAge - age;
  const yearsInRetirement = lifeExp - retireAge;
  const inflatedMonthly = monthly * Math.pow(1 + inflation / 100, yearsToRetire);
  const corpusNeeded = yearsInRetirement > 0
    ? (inflatedMonthly * 12 * (1 - Math.pow(1 + postRate / 100, -yearsInRetirement))) / (postRate / 100)
    : 0;
  const r = rate / 100 / 12;
  const n = yearsToRetire * 12;
  const sipRequired = r === 0 ? corpusNeeded / n : (corpusNeeded * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));

  const chartData = [{ name: "Corpus Needed", value: Math.round(corpusNeeded) }];
  const COLORS = ["#c9a84c"];

  return (
    <CalcLayout title="Retirement Calculator" subtitle="Plan your retirement corpus"
      result={{ label: "Corpus Required", value: `₹${formatNumber(corpusNeeded)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Monthly Expense (today)", value: `₹${formatNumber(monthly)}` },
        { label: "Monthly at Retirement", value: `₹${formatNumber(inflatedMonthly)}` },
        { label: "Corpus Required", value: `₹${formatNumber(corpusNeeded)}`, highlight: true },
        { label: "SIP Required/month", value: `₹${formatNumber(sipRequired)}` },
      ]}>
      <Slider label="Current Age" value={age} min={18} max={55} step={1} format="yr" onChange={setAge} />
      <Slider label="Retirement Age" value={retireAge} min={age + 1} max={70} step={1} format="yr" onChange={setRetireAge} />
      <Slider label="Monthly Expenses Today" value={monthly} min={5000} max={500000} step={5000} format="₹" onChange={setMonthly} />
      <Slider label="Pre-retirement Return" value={rate} min={1} max={20} step={0.5} format="%" onChange={setRate} />
      <Slider label="Inflation Rate" value={inflation} min={2} max={12} step={0.5} format="%" onChange={setInflation} />
    </CalcLayout>
  );
}

// ─── CHILD EDUCATION ─────────────────────────────────────────────────────────
export function ChildEducationCalculator() {
  const [amount, setAmount] = useState(2000000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);
  const [inflation, setInflation] = useState(8);

  const futureGoal = amount * Math.pow(1 + inflation / 100, years);
  const r = rate / 100 / 12;
  const n = years * 12;
  const sipRequired = r === 0 ? futureGoal / n : (futureGoal * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));

  const chartData = [{ name: "Today's Cost", value: amount }, { name: "Future Cost", value: Math.round(futureGoal) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="Child Education Calculator" subtitle="Plan for future education cost"
      result={{ label: "SIP Required", value: `₹${formatNumber(sipRequired)}/mo` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Education Cost Today", value: `₹${formatNumber(amount)}` },
        { label: "Education Cost in Future", value: `₹${formatNumber(futureGoal)}` },
        { label: "SIP Required/month", value: `₹${formatNumber(sipRequired)}`, highlight: true },
      ]}>
      <Slider label="Education Cost Today" value={amount} min={100000} max={20000000} step={100000} format="₹" onChange={setAmount} />
      <Slider label="Years to Goal" value={years} min={1} max={25} step={1} format="yr" onChange={setYears} />
      <Slider label="Expected Return (p.a.)" value={rate} min={1} max={25} step={0.5} format="%" onChange={setRate} />
      <Slider label="Education Inflation" value={inflation} min={3} max={15} step={0.5} format="%" onChange={setInflation} />
    </CalcLayout>
  );
}

// ─── MARRIAGE PLANNING ───────────────────────────────────────────────────────
export function MarriageCalculator() {
  const [amount, setAmount] = useState(3000000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [inflation, setInflation] = useState(6);

  const futureGoal = amount * Math.pow(1 + inflation / 100, years);
  const r = rate / 100 / 12;
  const n = years * 12;
  const sipRequired = r === 0 ? futureGoal / n : (futureGoal * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));

  const chartData = [{ name: "Today's Budget", value: amount }, { name: "Future Budget", value: Math.round(futureGoal) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="Marriage Planning Calculator" subtitle="Plan your child's wedding fund"
      result={{ label: "SIP Required", value: `₹${formatNumber(sipRequired)}/mo` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Marriage Budget Today", value: `₹${formatNumber(amount)}` },
        { label: "Future Budget", value: `₹${formatNumber(futureGoal)}` },
        { label: "SIP Required/month", value: `₹${formatNumber(sipRequired)}`, highlight: true },
      ]}>
      <Slider label="Marriage Budget Today" value={amount} min={100000} max={20000000} step={100000} format="₹" onChange={setAmount} />
      <Slider label="Years to Goal" value={years} min={1} max={25} step={1} format="yr" onChange={setYears} />
      <Slider label="Expected Return (p.a.)" value={rate} min={1} max={25} step={0.5} format="%" onChange={setRate} />
      <Slider label="Inflation Rate" value={inflation} min={2} max={12} step={0.5} format="%" onChange={setInflation} />
    </CalcLayout>
  );
}

// ─── EMI ───────────────────────────────────────────────────────���─────────────
export function EMICalculator() {
  const [loan, setLoan] = useState(2000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const r = rate / 100 / 12;
  const n = years * 12;
  const emi = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loan;

  const chartData = [{ name: "Principal", value: loan }, { name: "Total Interest", value: Math.round(totalInterest) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="EMI Calculator" subtitle="Home, Car, Personal Loan"
      result={{ label: "Monthly EMI", value: `₹${formatNumber(emi)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Monthly EMI", value: `₹${formatNumber(emi)}`, highlight: true },
        { label: "Total Payment", value: `₹${formatNumber(totalPayment)}` },
        { label: "Total Interest", value: `₹${formatNumber(totalInterest)}` },
      ]}>
      <Slider label="Loan Amount" value={loan} min={100000} max={100000000} step={100000} format="₹" onChange={setLoan} />
      <Slider label="Interest Rate (p.a.)" value={rate} min={1} max={25} step={0.1} format="%" onChange={setRate} />
      <Slider label="Loan Tenure" value={years} min={1} max={30} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── FD ──────────────────────────────────────────────────────────────────────
const FD_FREQ = [
  { label: "Monthly", n: 12 },
  { label: "Quarterly", n: 4 },
  { label: "Half-Yearly", n: 2 },
  { label: "Annually", n: 1 },
];

export function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [months, setMonths] = useState(36);
  const [fdType, setFdType] = useState<"cumulative" | "non-cumulative">("cumulative");
  const [freqIdx, setFreqIdx] = useState(1); // default quarterly

  const years = months / 12;
  const { n } = FD_FREQ[freqIdx];
  const r = rate / 100;

  // Cumulative: compound interest at maturity
  const maturity = principal * Math.pow(1 + r / n, n * years);
  const totalInterest = maturity - principal;

  // Non-Cumulative: simple interest paid out each period
  const periodicPayout = principal * r / n;
  const totalPayout = periodicPayout * n * years;
  const effectiveYield = fdType === "cumulative"
    ? ((maturity / principal - 1) / years) * 100
    : r * 100;

  const periodLabel = FD_FREQ[freqIdx].label.replace("ly", "").toLowerCase();
  const chartData = fdType === "cumulative"
    ? [{ name: "Principal", value: principal }, { name: "Interest", value: Math.round(totalInterest) }]
    : [{ name: "Principal", value: principal }, { name: "Total Payout", value: Math.round(totalPayout) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  // Year-by-year breakdown (max 10 rows)
  const tableRows: { yr: number; interest: number; balance: number }[] = [];
  const totalYears = Math.ceil(years);
  for (let y = 1; y <= Math.min(totalYears, 10); y++) {
    const t = Math.min(y, years);
    if (fdType === "cumulative") {
      const bal = principal * Math.pow(1 + r / n, n * t);
      tableRows.push({ yr: y, interest: Math.round(bal - principal), balance: Math.round(bal) });
    } else {
      tableRows.push({ yr: y, interest: Math.round(periodicPayout * n * Math.min(1, years - y + 1)), balance: principal });
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a3560] px-6 py-4">
        <h3 className="font-bold text-white text-lg">FD Calculator</h3>
        <p className="text-gray-400 text-xs mt-0.5">Fixed Deposit — Cumulative & Non-Cumulative</p>
      </div>
      <div className="p-6 space-y-6">
        {/* Type + Frequency toggles */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 flex-1">
            {(["cumulative", "non-cumulative"] as const).map((t) => (
              <button key={t} onClick={() => setFdType(t)}
                className={`flex-1 py-2 text-xs font-semibold transition-colors capitalize ${fdType === t ? "bg-[#0a1628] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                {t === "cumulative" ? "Cumulative" : "Non-Cumulative"}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 flex-1">
            {FD_FREQ.map((f, i) => (
              <button key={f.label} onClick={() => setFreqIdx(i)}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${freqIdx === i ? "bg-[#c9a84c] text-[#0a1628]" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sliders */}
          <div className="space-y-4">
            <Slider label="Deposit Amount" value={principal} min={10000} max={10000000} step={10000} format="₹" onChange={setPrincipal} />
            <Slider label="Interest Rate (p.a.)" value={rate} min={3} max={15} step={0.1} format="%" onChange={setRate} />
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm text-gray-600 font-medium">Tenure</label>
                <span className="text-sm font-bold text-[#0a1628]">{months >= 12 ? `${(months/12).toFixed(months % 12 === 0 ? 0 : 1)} yr` : `${months} mo`}</span>
              </div>
              <input type="range" min={1} max={120} step={1} value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#c9a84c]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>1 mo</span><span>5 yr</span><span>10 yr</span>
              </div>
            </div>

            {/* Key type info */}
            <div className={`p-3 rounded-xl text-xs ${fdType === "cumulative" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
              {fdType === "cumulative"
                ? "Interest compounds and is paid at maturity along with principal."
                : `Interest of ₹${formatNumber(periodicPayout)} is paid out every ${periodLabel}.`}
            </div>
          </div>

          {/* Chart + metrics */}
          <div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `₹${formatNumber(Number(v))}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {[
                { label: "Principal", value: `₹${formatNumber(principal)}` },
                fdType === "cumulative"
                  ? { label: "Total Interest", value: `₹${formatNumber(totalInterest)}` }
                  : { label: `Per-${periodLabel} Payout`, value: `₹${formatNumber(periodicPayout)}` },
                fdType === "cumulative"
                  ? { label: "Maturity Amount", value: `₹${formatNumber(maturity)}`, highlight: true }
                  : { label: "Total Interest Payout", value: `₹${formatNumber(totalPayout)}`, highlight: true },
                { label: "Effective Yield (p.a.)", value: `${effectiveYield.toFixed(2)}%` },
              ].map((m) => (
                <div key={m.label} className={`flex justify-between items-center py-2 border-b border-gray-50 last:border-0 ${m.highlight ? "bg-[#c9a84c]/5 px-2 rounded-lg" : ""}`}>
                  <span className="text-xs text-gray-500">{m.label}</span>
                  <span className={`text-sm font-bold ${m.highlight ? "text-[#c9a84c]" : "text-[#0a1628]"}`}>{m.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 italic">Results are illustrative. Actual returns may vary.</p>
          </div>
        </div>

        {/* Year-by-year breakdown */}
        <div>
          <h4 className="text-sm font-semibold text-[#0a1628] mb-2">Year-wise Breakdown</h4>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-gray-500 font-semibold">Year</th>
                  <th className="px-4 py-2 text-right text-gray-500 font-semibold">{fdType === "cumulative" ? "Cumulative Interest" : "Interest Paid"}</th>
                  <th className="px-4 py-2 text-right text-gray-500 font-semibold">{fdType === "cumulative" ? "Balance" : "Principal"}</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.yr} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-2 text-gray-700">Year {row.yr}</td>
                    <td className="px-4 py-2 text-right text-[#c9a84c] font-medium">₹{formatNumber(row.interest)}</td>
                    <td className="px-4 py-2 text-right text-[#0a1628] font-semibold">₹{formatNumber(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INFLATION ───────────────────────────────────────────────────────────────
export function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const futureValue = amount * Math.pow(1 + rate / 100, years);
  const loss = futureValue - amount;
  const realPurchasingPower = amount / Math.pow(1 + rate / 100, years);

  const chartData = [{ name: "Today", value: amount }, { name: "Inflated (nominal)", value: Math.round(futureValue) }];
  const COLORS = ["#c9a84c", "#e74c3c"];

  return (
    <CalcLayout title="Inflation Calculator" subtitle="Impact of inflation on money"
      result={{ label: "Purchasing Power", value: `₹${formatNumber(realPurchasingPower)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Amount Today", value: `₹${formatNumber(amount)}` },
        { label: "What it'll cost in future", value: `₹${formatNumber(futureValue)}` },
        { label: "Real Purchasing Power", value: `₹${formatNumber(realPurchasingPower)}`, highlight: true },
      ]}>
      <Slider label="Amount Today" value={amount} min={10000} max={10000000} step={10000} format="₹" onChange={setAmount} />
      <Slider label="Inflation Rate (p.a.)" value={rate} min={1} max={20} step={0.5} format="%" onChange={setRate} />
      <Slider label="Number of Years" value={years} min={1} max={40} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── CAGR ────────────────────────────────────────────────���────────────────────
export function CAGRCalculator() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(250000);
  const [years, setYears] = useState(5);

  const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
  const absoluteReturn = ((final - initial) / initial) * 100;

  const chartData = [{ name: "Initial", value: initial }, { name: "Final", value: final }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="CAGR Calculator" subtitle="Compound Annual Growth Rate"
      result={{ label: "CAGR", value: `${cagr.toFixed(2)}%` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Initial Value", value: `₹${formatNumber(initial)}` },
        { label: "Final Value", value: `₹${formatNumber(final)}` },
        { label: "CAGR", value: `${cagr.toFixed(2)}% p.a.`, highlight: true },
        { label: "Absolute Return", value: `${absoluteReturn.toFixed(2)}%` },
      ]}>
      <Slider label="Initial Investment" value={initial} min={10000} max={10000000} step={10000} format="₹" onChange={setInitial} />
      <Slider label="Final Value" value={final} min={initial} max={100000000} step={10000} format="₹" onChange={setFinal} />
      <Slider label="Number of Years" value={years} min={1} max={30} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── ELSS TAX SAVING ───────────────────────────────��─────────────────────────
export function ELSSCalculator() {
  const [invested, setInvested] = useState(150000);
  const [rate, setRate] = useState(14);
  const [years, setYears] = useState(10);
  const [taxSlab, setTaxSlab] = useState(30);

  const fv = invested * Math.pow(1 + rate / 100, years);
  const taxSaved = Math.min(invested, 150000) * taxSlab / 100;
  const returns = fv - invested;

  const chartData = [{ name: "Invested", value: invested }, { name: "Returns", value: Math.round(returns) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="ELSS / Tax Saving Calculator" subtitle="Section 80C tax savings"
      result={{ label: "Tax Saved", value: `₹${formatNumber(taxSaved)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Amount Invested", value: `₹${formatNumber(invested)}` },
        { label: "Tax Saved (80C)", value: `₹${formatNumber(taxSaved)}`, highlight: true },
        { label: "Est. Future Value", value: `₹${formatNumber(fv)}` },
        { label: "Est. Returns", value: `₹${formatNumber(returns)}` },
      ]}>
      <Slider label="Annual Investment" value={invested} min={5000} max={150000} step={5000} format="₹" onChange={setInvested} />
      <Slider label="Expected Return (p.a.)" value={rate} min={8} max={25} step={0.5} format="%" onChange={setRate} />
      <Slider label="Investment Horizon" value={years} min={3} max={30} step={1} format="yr" onChange={setYears} />
      <Slider label="Your Tax Slab" value={taxSlab} min={5} max={30} step={5} format="%" onChange={setTaxSlab} />
    </CalcLayout>
  );
}

// ─── FUTURE VALUE ─────────────────────────────────────────────────────────────
export function FutureValueCalculator() {
  const [pv, setPv] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);

  const fv = pv * Math.pow(1 + rate / 100, years);

  const chartData = [{ name: "Present Value", value: pv }, { name: "Future Value", value: Math.round(fv) }];
  const COLORS = ["#1a3560", "#c9a84c"];

  return (
    <CalcLayout title="Future Value Calculator" subtitle="What will your money be worth?"
      result={{ label: "Future Value", value: `₹${formatNumber(fv)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Present Value", value: `₹${formatNumber(pv)}` },
        { label: "Future Value", value: `₹${formatNumber(fv)}`, highlight: true },
        { label: "Growth Multiple", value: `${(fv / pv).toFixed(2)}x` },
      ]}>
      <Slider label="Present Value" value={pv} min={10000} max={10000000} step={10000} format="₹" onChange={setPv} />
      <Slider label="Rate of Return (p.a.)" value={rate} min={1} max={30} step={0.5} format="%" onChange={setRate} />
      <Slider label="Number of Years" value={years} min={1} max={40} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── PRESENT VALUE ───────────────────────────────────────────────────────────
export function PresentValueCalculator() {
  const [fv, setFv] = useState(1000000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);

  const pv = fv / Math.pow(1 + rate / 100, years);

  const chartData = [{ name: "Present Value", value: Math.round(pv) }, { name: "Future Value", value: fv }];
  const COLORS = ["#c9a84c", "#1a3560"];

  return (
    <CalcLayout title="Present Value Calculator" subtitle="What is a future amount worth today?"
      result={{ label: "Present Value", value: `₹${formatNumber(pv)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Future Value", value: `₹${formatNumber(fv)}` },
        { label: "Present Value Today", value: `₹${formatNumber(pv)}`, highlight: true },
        { label: "Discount", value: `₹${formatNumber(fv - pv)}` },
      ]}>
      <Slider label="Future Amount" value={fv} min={100000} max={100000000} step={100000} format="₹" onChange={setFv} />
      <Slider label="Discount Rate (p.a.)" value={rate} min={1} max={30} step={0.5} format="%" onChange={setRate} />
      <Slider label="Number of Years" value={years} min={1} max={40} step={1} format="yr" onChange={setYears} />
    </CalcLayout>
  );
}

// ─── STP ───────────────────────────���─────────────────────────────────────────
export function STPCalculator() {
  const [corpus, setCorpus] = useState(500000);
  const [monthlyTransfer, setMonthlyTransfer] = useState(50000);
  const [debtRate, setDebtRate] = useState(7);
  const [equityRate, setEquityRate] = useState(12);

  const months = Math.ceil(corpus / monthlyTransfer);
  const debtR = debtRate / 100 / 12;
  const equityR = equityRate / 100 / 12;

  let debtBalance = corpus;
  let equityBalance = 0;
  for (let m = 0; m < months; m++) {
    debtBalance = Math.max(debtBalance * (1 + debtR) - monthlyTransfer, 0);
    equityBalance = equityBalance * (1 + equityR) + Math.min(monthlyTransfer, corpus - (months - m - 1) * monthlyTransfer > 0 ? monthlyTransfer : 0);
  }

  const chartData = [
    { name: "Final Equity Value", value: Math.round(equityBalance) },
    { name: "Corpus", value: corpus },
  ];
  const COLORS = ["#c9a84c", "#1a3560"];

  return (
    <CalcLayout title="STP Calculator" subtitle="Systematic Transfer Plan"
      result={{ label: "Final Equity Value", value: `₹${formatNumber(equityBalance)}` }}
      chartData={chartData} chartColors={COLORS}
      metrics={[
        { label: "Initial Corpus (Debt)", value: `₹${formatNumber(corpus)}` },
        { label: "Transfer Period", value: `${months} months` },
        { label: "Final Equity Value", value: `₹${formatNumber(equityBalance)}`, highlight: true },
      ]}>
      <Slider label="Corpus in Debt Fund" value={corpus} min={50000} max={10000000} step={50000} format="₹" onChange={setCorpus} />
      <Slider label="Monthly Transfer" value={monthlyTransfer} min={5000} max={500000} step={5000} format="₹" onChange={setMonthlyTransfer} />
      <Slider label="Debt Fund Return" value={debtRate} min={3} max={12} step={0.5} format="%" onChange={setDebtRate} />
      <Slider label="Equity Fund Return" value={equityRate} min={6} max={25} step={0.5} format="%" onChange={setEquityRate} />
    </CalcLayout>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────���────────────────────────��───
function Slider({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number; format: string;
  onChange: (v: number) => void;
}) {
  const display = format === "₹" ? `₹${formatNumber(value)}` : `${value}${format}`;
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-sm text-gray-600 font-medium">{label}</label>
        <span className="text-sm font-bold text-[#0a1628]">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#c9a84c]"
      />
    </div>
  );
}

function CalcLayout({
  title, subtitle, result, chartData, chartColors, metrics, children
}: {
  title: string; subtitle: string;
  result: { label: string; value: string };
  chartData: { name: string; value: number }[];
  chartColors: string[];
  metrics: { label: string; value: string; highlight?: boolean }[];
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a3560] px-6 py-4">
        <h3 className="font-bold text-white text-lg">{title}</h3>
        <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">{children}</div>
        <div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                {chartData.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `₹${formatNumber(Number(v))}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {metrics.map((m) => (
              <div key={m.label} className={`flex justify-between items-center py-2 border-b border-gray-50 last:border-0 ${m.highlight ? "bg-[#c9a84c]/5 px-2 rounded-lg" : ""}`}>
                <span className="text-xs text-gray-500">{m.label}</span>
                <span className={`text-sm font-bold ${m.highlight ? "text-[#c9a84c]" : "text-[#0a1628]"}`}>{m.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 italic">Results are illustrative. Actual returns may vary.</p>
        </div>
      </div>
    </div>
  );
}
