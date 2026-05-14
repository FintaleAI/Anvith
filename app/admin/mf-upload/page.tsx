import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import MFUploadClient from "./MFUploadClient";

export default async function MFUploadPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [count, meta] = await Promise.all([
    prisma.mFScheme.count(),
    prisma.mFDataMeta.findFirst({ orderBy: { updatedAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1628] font-display">Mutual Fund Data Upload</h1>
        <p className="text-gray-500 text-sm mt-1">
          Upload the Excel file to refresh the MF Scheme Finder. All existing data will be replaced.
        </p>
      </div>

      {/* Current status */}
      {meta && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-1">Current File</div>
              <div className="font-bold text-[#0a1628] truncate">{meta.fileName}</div>
            </div>
            <div>
              <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-1">NAV Date</div>
              <div className="font-bold text-[#c9a84c]">{meta.navDate}</div>
            </div>
            <div>
              <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-1">Schemes Loaded</div>
              <div className="font-bold text-[#0a1628]">{count.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
      )}

      <MFUploadClient />

      {/* Instructions */}
      <div className="bg-[#f8fafc] rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-[#0a1628] mb-3">Expected Excel Columns</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs text-gray-500">
          {["SCHEMES","EXPENSE RATIO","CATEGORY","AUM(CR)","1 DAY","7 DAY","15 DAY","30 DAY","3 MONTH","6 MONTH","1 YEAR","2 YEAR","3 YEAR","5 YEAR","7 YEAR","10 YEAR","15 YEAR","20 YEAR","25 YEAR","SINCE INCEPTION RETURN","FUND RATING","ALPHA","BETA","MEAN","STANDARD DEV","SHARPE RATIO","SORTINO RATIO","AVERAGE MATURITY","MODIFIED DURATION","YIELD TO MATURITY","LAUNCH DATE","SCHEME BENCHMARK","CURRENT NAV","IS RECOMMENDED"].map((c) => (
            <span key={c} className="px-2 py-1 bg-white border border-gray-200 rounded-md font-mono">{c}</span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          The IS RECOMMENDED column should contain <strong>Yes/No</strong>. Set it to &quot;Yes&quot; for schemes you want highlighted in the finder. Scanned copies will work for all image fields.
        </p>
      </div>
    </div>
  );
}
