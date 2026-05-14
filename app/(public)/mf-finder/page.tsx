import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import MFFinderClient from "./MFFinderClient";

export const metadata: Metadata = {
  title: "Mutual Fund Scheme Finder — Filter 1,700+ Schemes",
  description: "Filter and compare 1,700+ mutual fund schemes by category, returns, expense ratio, NAV, AUM, risk level and more.",
};

async function getMFData() {
  const [schemes, meta] = await Promise.all([
    prisma.mFScheme.findMany({
      select: {
        id: true, schemeName: true, category: true, expenseRatio: true,
        aumCr: true, return1Year: true, return3Year: true, return5Year: true,
        return10Year: true, currentNav: true, fundRating: true, isRecommended: true,
        launchDate: true, benchmark: true, alpha: true, beta: true,
        sharpeRatio: true, standardDev: true, returnSinceInception: true,
      },
      orderBy: { schemeName: "asc" },
    }),
    prisma.mFDataMeta.findFirst({ orderBy: { updatedAt: "desc" } }),
  ]);
  return { schemes, navDate: meta?.navDate || null };
}

export default async function MFFinderPage() {
  const { schemes, navDate } = await getMFData();
  const categories = [...new Set(schemes.map((s) => s.category).filter(Boolean) as string[])].sort();

  return (
    <>
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Powerful Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
            Mutual Fund <span className="text-gradient-gold">Scheme Finder</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
            Filter and compare {schemes.length > 0 ? schemes.length.toLocaleString("en-IN") : "1,700+"} mutual fund schemes across categories, returns, expense ratios, and more.
          </p>
          {navDate && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
              NAV as on: <strong className="text-[#c9a84c]">{navDate}</strong>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-[#f8fafc] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          {schemes.length > 0 ? (
            <MFFinderClient schemes={schemes} categories={categories} navDate={navDate} />
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#0a1628] mb-2">No Data Available Yet</h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                The mutual fund data hasn&apos;t been uploaded yet. Please ask the admin to upload the latest Excel file from the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs text-center text-gray-400">
            Data sourced from uploaded Excel file. NAV and returns data as on the date shown above. Past performance is not indicative of future results. Mutual fund investments are subject to market risks.
          </p>
        </div>
      </section>
    </>
  );
}
