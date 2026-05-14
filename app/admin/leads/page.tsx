import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import LeadsClient from "./LeadsClient";

export default async function LeadsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1628] font-display">Leads</h1>
        <p className="text-gray-500 text-sm mt-1">{leads.length} total enquiries received.</p>
      </div>
      <LeadsClient initialLeads={leads} />
    </div>
  );
}
