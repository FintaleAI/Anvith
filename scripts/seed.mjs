import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import * as XLSX from "xlsx";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, "../dev.db");
const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Seed admin ──────────────────────────────────────────────────────────────
  const existing = await prisma.admin.findUnique({ where: { email: "admin@anvithbizcap.com" } });
  if (!existing) {
    const hash = await bcrypt.hash("Admin@2024!", 12);
    await prisma.admin.create({ data: { email: "admin@anvithbizcap.com", password: hash, name: "CA Amay Dhaneshwar" } });
    console.log("✅ Admin created: admin@anvithbizcap.com / Admin@2024!");
  } else {
    console.log("ℹ️  Admin already exists.");
  }

  // ── Import Excel MF data ─────────────────────────────────────────────────────
  const xlsxPath = resolve(__dirname, "../../Top Schemes-03-05-2026-04_31_25.xlsx");
  if (!existsSync(xlsxPath)) {
    console.log("⚠️  Excel file not found — skipping MF import.");
    return;
  }

  const buf = readFileSync(xlsxPath);
  const wb = XLSX.read(buf, { type: "buffer" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws);
  console.log(`📊 Importing ${rows.length} MF schemes…`);

  const toFloat = (v) => { if (v === null || v === undefined || v === "") return null; const n = parseFloat(String(v)); return isNaN(n) ? null : n; };
  const toStr   = (v) => { if (v === null || v === undefined || v === "") return null; return String(v).trim() || null; };
  const toBool  = (v) => { const s = String(v ?? "").trim().toLowerCase(); return s === "yes" || s === "true" || s === "1"; };

  const schemes = rows
    .map((r) => ({
      schemeName:           String(r["SCHEMES"] ?? ""),
      expenseRatio:         toFloat(r["EXPENSE RATIO"]),
      category:             toStr(r["CATEGORY"]),
      aumCr:                toFloat(r["AUM(CR)"]),
      return1Day:           toFloat(r["1 DAY"]),
      return7Day:           toFloat(r["7 DAY"]),
      return15Day:          toFloat(r["15 DAY"]),
      return30Day:          toFloat(r["30 DAY"]),
      return3Month:         toFloat(r["3 MONTH"]),
      return6Month:         toFloat(r["6 MONTH"]),
      return1Year:          toFloat(r["1 YEAR"]),
      return2Year:          toFloat(r["2 YEAR"]),
      return3Year:          toFloat(r["3 YEAR"]),
      return5Year:          toFloat(r["5 YEAR"]),
      return7Year:          toFloat(r["7 YEAR"]),
      return10Year:         toFloat(r["10 YEAR"]),
      return15Year:         toFloat(r["15 YEAR"]),
      return20Year:         toFloat(r["20 YEAR"]),
      return25Year:         toFloat(r["25 YEAR"]),
      returnSinceInception: toFloat(r["SINCE INCEPTION RETURN"]),
      fundRating:           toStr(r["FUND RATING"]),
      alpha:                toFloat(r["ALPHA"]),
      beta:                 toFloat(r["BETA"]),
      mean:                 toFloat(r["MEAN"]),
      standardDev:          toFloat(r["STANDARD DEV"]),
      sharpeRatio:          toFloat(r["SHARPE RATIO"]),
      sortinoRatio:         toFloat(r["SORTINO RATIO"]),
      avgMaturity:          toFloat(r["AVERAGE MATURITY"]),
      modifiedDuration:     toFloat(r["MODIFIED DURATION"]),
      yieldToMaturity:      toFloat(r["YIELD TO MATURITY"]),
      launchDate:           toStr(r["LAUNCH DATE"]),
      benchmark:            toStr(r["SCHEME BENCHMARK"]),
      largecapRatio:        toFloat(r["LARGECAP RATIO"]),
      midcapRatio:          toFloat(r["MIDCAP RATIO"]),
      smallcapRatio:        toFloat(r["SMALLCAP RATIO"]),
      equityPercent:        toFloat(r["EQUITY PERCENT"]),
      debtPercent:          toFloat(r["DEBT PERCENT"]),
      goldPercent:          toFloat(r["GOLD PERCENT"]),
      globalEquityPercent:  toFloat(r["GLOBAL EQUITY PERCENT"]),
      otherPercent:         toFloat(r["OTHER PERCENT"]),
      currentNav:           toFloat(r["CURRENT NAV"]),
      isRecommended:        toBool(r["IS RECOMMENDED"]),
    }))
    .filter((s) => s.schemeName.trim().length > 0);

  await prisma.$transaction([
    prisma.mFScheme.deleteMany(),
    prisma.mFScheme.createMany({ data: schemes }),
    prisma.mFDataMeta.upsert({
      where: { id: 1 },
      update: { navDate: "03-May-2026", fileName: "Top Schemes-03-05-2026-04_31_25.xlsx", updatedAt: new Date() },
      create: { id: 1, navDate: "03-May-2026", fileName: "Top Schemes-03-05-2026-04_31_25.xlsx", updatedAt: new Date() },
    }),
  ]);
  console.log(`✅ ${schemes.length} MF schemes imported. NAV date: 03-May-2026`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
