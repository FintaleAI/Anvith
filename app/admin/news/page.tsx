import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import NewsClient from "./NewsClient";

export default async function AdminNewsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1628] font-display">News & Updates</h1>
        <p className="text-gray-500 text-sm mt-1">Manage economy and market news shown on the website.</p>
      </div>
      <NewsClient initialNews={news} />
    </div>
  );
}
