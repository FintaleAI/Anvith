"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Download, Star, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Scheme = {
  id: number; schemeName: string; category: string | null; expenseRatio: number | null;
  aumCr: number | null; return1Year: number | null; return3Year: number | null;
  return5Year: number | null; return10Year: number | null; currentNav: number | null;
  fundRating: string | null; isRecommended: boolean; launchDate: string | null;
  benchmark: string | null; alpha: number | null; beta: number | null;
  sharpeRatio: number | null; standardDev: number | null; returnSinceInception: number | null;
};

interface Props { schemes: Scheme[]; categories: string[]; navDate: string | null; }

function ReturnBadge({ value }: { value: number | null }) {
  if (value === null || value === undefined) return <span className="text-gray-300">—</span>;
  const color = value >= 15 ? "text-emerald-600" : value >= 8 ? "text-blue-600" : value >= 0 ? "text-amber-600" : "text-red-500";
  return <span className={cn("font-semibold text-sm", color)}>{value.toFixed(1)}%</span>;
}

function RatingBadge({ rating, size = "sm" }: { rating: string | null; size?: "sm" | "xs" }) {
  if (!rating) return null;
  const stars = parseInt(rating) || 0;
  const cls = size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(cls, i < stars ? "fill-[#c9a84c] text-[#c9a84c]" : "text-gray-200")} />
      ))}
    </div>
  );
}

const NAV_BUCKETS = [
  { label: "Any NAV", value: "" },
  { label: "< ₹50", value: "lt50" },
  { label: "₹50 – ₹100", value: "50_100" },
  { label: "₹100 – ₹500", value: "100_500" },
  { label: "₹500+", value: "gt500" },
];

const EXPENSE_BUCKETS = [
  { label: "Any Expense Ratio", value: "" },
  { label: "< 0.5%", value: "lt05" },
  { label: "0.5% – 1%", value: "05_1" },
  { label: "1% – 1.5%", value: "1_15" },
  { label: "1.5% – 2%", value: "15_2" },
  { label: "> 2%", value: "gt2" },
];

const AUM_PRESETS = [
  { label: "Any AUM", value: "" },
  { label: "₹100 Cr+", value: "100" },
  { label: "₹500 Cr+", value: "500" },
  { label: "₹1,000 Cr+", value: "1000" },
  { label: "₹5,000 Cr+", value: "5000" },
  { label: "₹10,000 Cr+", value: "10000" },
];

export default function MFFinderClient({ schemes, categories, navDate }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [expectedReturn, setExpectedReturn] = useState<number | "">("");
  const [returnPeriod, setReturnPeriod] = useState<"return1Year" | "return3Year" | "return5Year" | "return10Year">("return5Year");
  const [expenseBucket, setExpenseBucket] = useState("");
  const [navBucket, setNavBucket] = useState("");
  const [minAum, setMinAum] = useState("");
  const [minRating, setMinRating] = useState<number | "">("");
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [sortBy, setSortBy] = useState<"return1Year" | "return3Year" | "return5Year" | "aumCr" | "expenseRatio">("return5Year");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const PER_PAGE = 50;

  const activeFilterCount = [
    search.trim(), selectedCat, expectedReturn !== "", expenseBucket,
    navBucket, minAum, minRating !== "", onlyRecommended,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearch(""); setSelectedCat(""); setExpectedReturn(""); setExpenseBucket("");
    setNavBucket(""); setMinAum(""); setMinRating(""); setOnlyRecommended(false);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = schemes;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.schemeName.toLowerCase().includes(q) || (s.category || "").toLowerCase().includes(q));
    }
    if (selectedCat) result = result.filter((s) => s.category === selectedCat);

    if (expectedReturn !== "") {
      const min = Number(expectedReturn);
      result = result.filter((s) => {
        const v = s[returnPeriod];
        return v !== null && v >= min;
      });
    }

    if (expenseBucket) {
      result = result.filter((s) => {
        const er = s.expenseRatio;
        if (er === null) return false;
        if (expenseBucket === "lt05")  return er < 0.5;
        if (expenseBucket === "05_1")  return er >= 0.5 && er < 1;
        if (expenseBucket === "1_15")  return er >= 1 && er < 1.5;
        if (expenseBucket === "15_2")  return er >= 1.5 && er < 2;
        if (expenseBucket === "gt2")   return er >= 2;
        return true;
      });
    }

    if (navBucket) {
      result = result.filter((s) => {
        const nav = s.currentNav;
        if (nav === null) return false;
        if (navBucket === "lt50")    return nav < 50;
        if (navBucket === "50_100")  return nav >= 50 && nav < 100;
        if (navBucket === "100_500") return nav >= 100 && nav < 500;
        if (navBucket === "gt500")   return nav >= 500;
        return true;
      });
    }

    if (minAum) {
      const threshold = Number(minAum);
      result = result.filter((s) => s.aumCr !== null && s.aumCr >= threshold);
    }

    if (minRating !== "") {
      const min = Number(minRating);
      result = result.filter((s) => {
        const r = parseInt(s.fundRating || "0");
        return r >= min;
      });
    }

    if (onlyRecommended) result = result.filter((s) => s.isRecommended);

    return [...result].sort((a, b) => {
      const av = a[sortBy] ?? (sortDir === "desc" ? -Infinity : Infinity);
      const bv = b[sortBy] ?? (sortDir === "desc" ? -Infinity : Infinity);
      return sortDir === "desc" ? Number(bv) - Number(av) : Number(av) - Number(bv);
    });
  }, [schemes, search, selectedCat, expectedReturn, returnPeriod, expenseBucket, navBucket, minAum, minRating, onlyRecommended, sortBy, sortDir]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const downloadCSV = () => {
    const headers = ["Scheme Name", "Category", "NAV", "1Y Return%", "3Y Return%", "5Y Return%", "Expense Ratio%", "AUM (Cr)", "Rating"];
    const rows = filtered.map((s) => [s.schemeName, s.category || "", s.currentNav || "", s.return1Year || "", s.return3Year || "", s.return5Year || "", s.expenseRatio || "", s.aumCr || "", s.fundRating || ""]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "mf_schemes.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 bg-white";
  const selectCls = inputCls + " bg-white text-gray-700";

  return (
    <div>
      {/* ── Filter Panel ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#c9a84c]" />
            <h2 className="font-bold text-[#0a1628]">Filter Schemes</h2>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-[#c9a84c] text-[#0a1628] text-xs font-bold rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
                <X className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={cn("flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all",
                showAdvanced ? "bg-[#0a1628] text-white border-[#0a1628]" : "border-gray-200 text-gray-500 hover:border-[#c9a84c]/50")}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showAdvanced ? "Hide" : "More"} Filters
            </button>
          </div>
        </div>

        {/* Row 1: Search + Category + Expected Return + Return Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <div className="relative lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search scheme name..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30"
            />
          </div>
          <div>
            <select value={selectedCat} onChange={(e) => { setSelectedCat(e.target.value); setPage(1); }} className={selectCls}>
              <option value="">All Categories</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => { setExpectedReturn(e.target.value ? Number(e.target.value) : ""); setPage(1); }}
              placeholder="Expected Return (%)"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c]"
            />
          </div>
          <div>
            <select value={returnPeriod} onChange={(e) => { setReturnPeriod(e.target.value as typeof returnPeriod); setPage(1); }} className={selectCls}>
              <option value="return1Year">Based on 1Y Return</option>
              <option value="return3Year">Based on 3Y Return</option>
              <option value="return5Year">Based on 5Y Return</option>
              <option value="return10Year">Based on 10Y Return</option>
            </select>
          </div>
        </div>

        {/* Row 2: Expense + AUM + NAV (always visible) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div>
            <select value={expenseBucket} onChange={(e) => { setExpenseBucket(e.target.value); setPage(1); }} className={selectCls}>
              {EXPENSE_BUCKETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <div>
            <select value={minAum} onChange={(e) => { setMinAum(e.target.value); setPage(1); }} className={selectCls}>
              {AUM_PRESETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <div>
            <select value={navBucket} onChange={(e) => { setNavBucket(e.target.value); setPage(1); }} className={selectCls}>
              {NAV_BUCKETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
        </div>

        {/* Advanced filters (collapsible) */}
        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3 pt-3 border-t border-gray-100">
            {/* Min Star Rating */}
            <div>
              <select value={minRating} onChange={(e) => { setMinRating(e.target.value ? Number(e.target.value) : ""); setPage(1); }} className={selectCls}>
                <option value="">Any Rating</option>
                <option value="3">3★ and above</option>
                <option value="4">4★ and above</option>
                <option value="5">5★ only</option>
              </select>
            </div>
            {/* Custom AUM input */}
            <div>
              <input
                type="number"
                value={minAum && !AUM_PRESETS.find(p => p.value === minAum && p.value !== "") ? minAum : ""}
                onChange={(e) => { setMinAum(e.target.value); setPage(1); }}
                placeholder="Custom Min AUM (Cr)"
                className={inputCls}
              />
            </div>
            {/* Recommended toggle as text */}
            <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl">
              <input
                type="checkbox" id="recOnly" checked={onlyRecommended}
                onChange={(e) => { setOnlyRecommended(e.target.checked); setPage(1); }}
                className="accent-[#c9a84c] w-4 h-4"
              />
              <label htmlFor="recOnly" className="text-sm text-gray-600 cursor-pointer select-none">AnvithBizCap Recommended only</label>
            </div>
          </div>
        )}

        {/* Bottom bar: recommended + sort */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100">
          {!showAdvanced && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={onlyRecommended} onChange={(e) => { setOnlyRecommended(e.target.checked); setPage(1); }} className="accent-[#c9a84c]" />
              <span className="text-sm text-gray-600">Show only recommended</span>
            </label>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-400">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#c9a84c]">
              <option value="return1Year">1Y Return</option>
              <option value="return3Year">3Y Return</option>
              <option value="return5Year">5Y Return</option>
              <option value="aumCr">AUM</option>
              <option value="expenseRatio">Expense Ratio</option>
            </select>
            <button onClick={() => setSortDir((d) => d === "desc" ? "asc" : "desc")} className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg hover:border-[#c9a84c]/50">
              {sortDir === "desc" ? "↓ High–Low" : "↑ Low–High"}
            </button>
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing <strong className="text-[#0a1628]">{filtered.length.toLocaleString("en-IN")}</strong> schemes
          {navDate && <span className="ml-2 text-[#c9a84c]">· NAV as on {navDate}</span>}
        </p>
        <button onClick={downloadCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c9a84c] border border-[#c9a84c]/40 rounded-lg hover:bg-[#c9a84c]/5 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0a1628] text-white">
                <th className="px-4 py-3 text-left font-semibold text-xs">Scheme Name</th>
                <th className="px-3 py-3 text-left font-semibold text-xs">Category</th>
                <th className="px-3 py-3 text-right font-semibold text-xs">NAV</th>
                <th className="px-3 py-3 text-right font-semibold text-xs">1Y%</th>
                <th className="px-3 py-3 text-right font-semibold text-xs">3Y%</th>
                <th className="px-3 py-3 text-right font-semibold text-xs">5Y%</th>
                <th className="px-3 py-3 text-right font-semibold text-xs">Expense%</th>
                <th className="px-3 py-3 text-right font-semibold text-xs">AUM (Cr)</th>
                <th className="px-3 py-3 text-center font-semibold text-xs">Rating</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((s, i) => (
                <tr key={s.id} className={cn("hover:bg-[#f8fafc] transition-colors border-b border-gray-50", i % 2 === 0 ? "bg-white" : "bg-gray-50/30", s.isRecommended && "border-l-2 border-l-[#c9a84c]")}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {s.isRecommended && <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0" title="Recommended" />}
                      <span className="font-medium text-[#0a1628] text-xs leading-tight">{s.schemeName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">{s.category || "—"}</span></td>
                  <td className="px-3 py-3 text-right text-xs text-gray-600">{s.currentNav ? `₹${s.currentNav.toFixed(2)}` : "—"}</td>
                  <td className="px-3 py-3 text-right"><ReturnBadge value={s.return1Year} /></td>
                  <td className="px-3 py-3 text-right"><ReturnBadge value={s.return3Year} /></td>
                  <td className="px-3 py-3 text-right"><ReturnBadge value={s.return5Year} /></td>
                  <td className="px-3 py-3 text-right text-xs text-gray-600">{s.expenseRatio ? `${s.expenseRatio.toFixed(2)}%` : "—"}</td>
                  <td className="px-3 py-3 text-right text-xs text-gray-600">
                    {s.aumCr ? (s.aumCr >= 1000 ? `₹${(s.aumCr / 1000).toFixed(1)}K Cr` : `₹${s.aumCr.toLocaleString("en-IN")} Cr`) : "—"}
                  </td>
                  <td className="px-3 py-3"><div className="flex justify-center"><RatingBadge rating={s.fundRating} /></div></td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="text-gray-400 text-sm">No schemes match your filters.</div>
                    <button onClick={resetFilters} className="mt-2 text-xs text-[#c9a84c] hover:underline">Clear all filters</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Page {page} of {pages} · {filtered.length.toLocaleString("en-IN")} schemes</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(1)} disabled={page === 1} className="px-2 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:border-[#c9a84c]/50">«</button>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:border-[#c9a84c]/50">← Prev</button>
              <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:border-[#c9a84c]/50">Next →</button>
              <button onClick={() => setPage(pages)} disabled={page === pages} className="px-2 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40 hover:border-[#c9a84c]/50">»</button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        ⭐ Gold left border = Recommended by AnvithBizCap · Past returns are not indicative of future performance.
      </p>
    </div>
  );
}
