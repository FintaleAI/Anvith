import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import BlogsClient from "./BlogsClient";

export default async function AdminBlogsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1628] font-display">Blog Articles</h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage blog posts visible on the website.</p>
      </div>
      <BlogsClient initialBlogs={blogs} />
    </div>
  );
}
