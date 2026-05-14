import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import BlogEditorPage from "@/components/admin/BlogEditor";

export const metadata = { title: "Edit Article — Admin" };

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });
  if (!blog) notFound();
  return <BlogEditorPage blog={blog} />;
}
