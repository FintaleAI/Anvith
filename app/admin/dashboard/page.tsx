import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, FileText, Newspaper, BarChart3, Upload, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [leadsCount, blogsCount, newsCount, schemesCount, recentLeads, meta] = await Promise.all([
    prisma.lead.count(),
    prisma.blog.count(),
    prisma.news.count(),
    prisma.mFScheme.count(),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.mFDataMeta.findFirst({ orderBy: { updatedAt: "desc" } }),
  ]);

  const stats = [
    { label: "Total Leads",     value: leadsCount,   icon: Users,      href: "/admin/leads",    color: "blue" },
    { label: "Blog Articles",   value: blogsCount,   icon: FileText,   href: "/admin/blogs",    color: "purple" },
    { label: "News Items",      value: newsCount,    icon: Newspaper,  href: "/admin/news",     color: "amber" },
    { label: "MF Schemes",      value: schemesCount, icon: BarChart3,  href: "/admin/mf-upload", color: "emerald" },
  ];

  const colorMap: Record<string, string> = {
    blue:    "bg-blue-50 text-blue-600",
    purple:  "bg-purple-50 text-purple-600",
    amber:   "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1628] font-display">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back. Here&apos;s an overview of your platform.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/mf-upload"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-semibold text-sm rounded-xl hover:opacity-90">
            <Upload className="w-4 h-4" /> Upload MF Data
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#c9a84c]/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-gray-300 group-hover:text-[#c9a84c] transition-colors" />
            </div>
            <div className="text-3xl font-bold text-[#0a1628]">{value.toLocaleString("en-IN")}</div>
            <div className="text-gray-500 text-sm mt-1">{label}</div>
          </Link>
        ))}
      </div>

      {/* MF Data status */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#0a1628]">Mutual Fund Data Status</h2>
          <Link href="/admin/mf-upload" className="text-[#c9a84c] text-sm font-medium hover:underline">
            Update Data →
          </Link>
        </div>
        {meta ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#f8fafc] rounded-xl">
              <div className="text-xs text-gray-400 mb-1">Last File</div>
              <div className="font-semibold text-[#0a1628] text-sm truncate">{meta.fileName}</div>
            </div>
            <div className="p-4 bg-[#f8fafc] rounded-xl">
              <div className="text-xs text-gray-400 mb-1">NAV Date</div>
              <div className="font-semibold text-[#c9a84c] text-sm">{meta.navDate}</div>
            </div>
            <div className="p-4 bg-[#f8fafc] rounded-xl">
              <div className="text-xs text-gray-400 mb-1">Last Updated</div>
              <div className="font-semibold text-[#0a1628] text-sm">{formatDate(meta.updatedAt)}</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm">
            No MF data uploaded yet.{" "}
            <Link href="/admin/mf-upload" className="text-[#c9a84c] hover:underline">Upload now →</Link>
          </div>
        )}
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#0a1628]">Recent Leads</h2>
          <Link href="/admin/leads" className="text-[#c9a84c] text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">No leads yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#0a1628] text-sm">{lead.name}</div>
                  <div className="text-gray-400 text-xs">{lead.mobile} · {lead.city || "—"} · {lead.interestedIn || "—"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    lead.status === "new" ? "bg-blue-100 text-blue-700" :
                    lead.status === "contacted" ? "bg-amber-100 text-amber-700" :
                    "bg-emerald-100 text-emerald-700"
                  }`}>{lead.status}</span>
                  <span className="text-xs text-gray-400">{formatDate(lead.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
