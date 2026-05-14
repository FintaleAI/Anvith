"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Download, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

type Lead = {
  id: number; name: string; mobile: string; email: string;
  city: string | null; interestedIn: string | null; investmentRange: string | null;
  message: string | null; source: string; status: string; createdAt: Date;
};

const STATUSES = ["new", "contacted", "converted", "closed"];

export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState("all");

  const shown = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const updateStatus = async (id: number, status: string) => {
    const res = await fetch("/api/admin/leads", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setLeads((p) => p.map((l) => l.id === id ? { ...l, status } : l));
      toast.success("Status updated");
    }
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Delete this lead?")) return;
    const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setLeads((p) => p.filter((l) => l.id !== id));
      toast.success("Lead deleted");
    }
  };

  const exportCSV = () => {
    const headers = ["ID","Name","Mobile","Email","City","Interested In","Range","Message","Source","Status","Date"];
    const rows = shown.map((l) => [l.id, l.name, l.mobile, l.email, l.city||"", l.interestedIn||"", l.investmentRange||"", l.message||"", l.source, l.status, formatDate(l.createdAt)]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "leads.csv"; a.click();
  };

  const statusColor: Record<string, string> = {
    new:       "bg-blue-100 text-blue-700",
    contacted: "bg-amber-100 text-amber-700",
    converted: "bg-emerald-100 text-emerald-700",
    closed:    "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {["all", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={cn("px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all",
                filter === s ? "bg-[#0a1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
              {s} {s === "all" ? `(${leads.length})` : `(${leads.filter((l) => l.status === s).length})`}
            </button>
          ))}
        </div>
        <button onClick={exportCSV}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-semibold text-xs rounded-xl hover:opacity-90">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0a1628] text-white text-xs">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-3 py-3 text-left">Mobile</th>
                <th className="px-3 py-3 text-left hidden md:table-cell">Email</th>
                <th className="px-3 py-3 text-left hidden lg:table-cell">Interest</th>
                <th className="px-3 py-3 text-left hidden lg:table-cell">Source</th>
                <th className="px-3 py-3 text-center">Status</th>
                <th className="px-3 py-3 text-left hidden md:table-cell">Date</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {shown.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#0a1628]">{lead.name}</div>
                    <div className="text-gray-400 text-xs">{lead.city || "—"}</div>
                  </td>
                  <td className="px-3 py-3 text-gray-600">{lead.mobile}</td>
                  <td className="px-3 py-3 text-gray-500 text-xs hidden md:table-cell">{lead.email || "—"}</td>
                  <td className="px-3 py-3 text-gray-500 text-xs hidden lg:table-cell max-w-[140px] truncate">{lead.interestedIn || "—"}</td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{lead.source}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border-0 focus:outline-none cursor-pointer", statusColor[lead.status] || "bg-gray-100")}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-3 text-gray-400 text-xs hidden md:table-cell whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                  <td className="px-3 py-3 text-center">
                    <button onClick={() => deleteLead(lead.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-gray-400">No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
