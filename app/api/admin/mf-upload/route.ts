import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const navDate = formData.get("navDate") as string | null;

    if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: "array" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws);

    if (rows.length === 0) return Response.json({ error: "Empty file" }, { status: 400 });

    // Map Excel columns to DB fields
    const schemes = rows.map((r) => ({
      schemeName:           String(r["SCHEMES"] ?? r["Scheme Name"] ?? r["SCHEME NAME"] ?? ""),
      expenseRatio:         toFloat(r["EXPENSE RATIO"] ?? r["Expense Ratio"]),
      category:             toStr(r["CATEGORY"] ?? r["Category"]),
      aumCr:                toFloat(r["AUM(CR)"] ?? r["AUM"] ?? r["AUM (CR)"]),
      return1Day:           toFloat(r["1 DAY"] ?? r["1Day"]),
      return7Day:           toFloat(r["7 DAY"] ?? r["7Day"]),
      return15Day:          toFloat(r["15 DAY"] ?? r["15Day"]),
      return30Day:          toFloat(r["30 DAY"] ?? r["30Day"]),
      return3Month:         toFloat(r["3 MONTH"] ?? r["3Month"]),
      return6Month:         toFloat(r["6 MONTH"] ?? r["6Month"]),
      return1Year:          toFloat(r["1 YEAR"] ?? r["1Year"]),
      return2Year:          toFloat(r["2 YEAR"] ?? r["2Year"]),
      return3Year:          toFloat(r["3 YEAR"] ?? r["3Year"]),
      return5Year:          toFloat(r["5 YEAR"] ?? r["5Year"]),
      return7Year:          toFloat(r["7 YEAR"] ?? r["7Year"]),
      return10Year:         toFloat(r["10 YEAR"] ?? r["10Year"]),
      return15Year:         toFloat(r["15 YEAR"] ?? r["15Year"]),
      return20Year:         toFloat(r["20 YEAR"] ?? r["20Year"]),
      return25Year:         toFloat(r["25 YEAR"] ?? r["25Year"]),
      returnSinceInception: toFloat(r["SINCE INCEPTION RETURN"] ?? r["Since Inception Return"]),
      fundRating:           toStr(r["FUND RATING"] ?? r["Fund Rating"]),
      alpha:                toFloat(r["ALPHA"] ?? r["Alpha"]),
      beta:                 toFloat(r["BETA"] ?? r["Beta"]),
      mean:                 toFloat(r["MEAN"] ?? r["Mean"]),
      standardDev:          toFloat(r["STANDARD DEV"] ?? r["Standard Dev"]),
      sharpeRatio:          toFloat(r["SHARPE RATIO"] ?? r["Sharpe Ratio"]),
      sortinoRatio:         toFloat(r["SORTINO RATIO"] ?? r["Sortino Ratio"]),
      avgMaturity:          toFloat(r["AVERAGE MATURITY"] ?? r["Average Maturity"]),
      modifiedDuration:     toFloat(r["MODIFIED DURATION"] ?? r["Modified Duration"]),
      yieldToMaturity:      toFloat(r["YIELD TO MATURITY"] ?? r["Yield To Maturity"]),
      launchDate:           toStr(r["LAUNCH DATE"] ?? r["Launch Date"]),
      benchmark:            toStr(r["SCHEME BENCHMARK"] ?? r["Scheme Benchmark"] ?? r["Benchmark"]),
      largecapRatio:        toFloat(r["LARGECAP RATIO"] ?? r["Largecap Ratio"]),
      midcapRatio:          toFloat(r["MIDCAP RATIO"] ?? r["Midcap Ratio"]),
      smallcapRatio:        toFloat(r["SMALLCAP RATIO"] ?? r["Smallcap Ratio"]),
      equityPercent:        toFloat(r["EQUITY PERCENT"] ?? r["Equity Percent"]),
      debtPercent:          toFloat(r["DEBT PERCENT"] ?? r["Debt Percent"]),
      goldPercent:          toFloat(r["GOLD PERCENT"] ?? r["Gold Percent"]),
      globalEquityPercent:  toFloat(r["GLOBAL EQUITY PERCENT"] ?? r["Global Equity Percent"]),
      otherPercent:         toFloat(r["OTHER PERCENT"] ?? r["Other Percent"]),
      currentNav:           toFloat(r["CURRENT NAV"] ?? r["Current Nav"] ?? r["NAV"]),
      isRecommended:        toBool(r["IS RECOMMENDED"] ?? r["Is Recommended"]),
    })).filter((s) => s.schemeName.length > 0);

    // Replace all schemes in a transaction
    await prisma.$transaction([
      prisma.mFScheme.deleteMany(),
      prisma.mFScheme.createMany({ data: schemes }),
      prisma.mFDataMeta.upsert({
        where: { id: 1 },
        update: { navDate: navDate || new Date().toLocaleDateString("en-IN"), fileName: file.name, updatedAt: new Date() },
        create: { id: 1, navDate: navDate || new Date().toLocaleDateString("en-IN"), fileName: file.name, updatedAt: new Date() },
      }),
    ]);

    revalidatePath("/mf-finder");
    return Response.json({ success: true, count: schemes.length });
  } catch (err) {
    console.error("MF upload error:", err);
    return Response.json({ error: "Failed to process file" }, { status: 500 });
  }
}

function toFloat(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = parseFloat(String(v));
  return isNaN(n) ? null : n;
}
function toStr(v: unknown): string | null {
  if (v === null || v === undefined || v === "") return null;
  return String(v).trim() || null;
}
function toBool(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  const s = String(v).trim().toLowerCase();
  return s === "yes" || s === "true" || s === "1" || s === "y";
}
