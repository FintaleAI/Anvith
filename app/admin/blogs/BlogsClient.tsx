"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

type Blog = {
  id: number; title: string; slug: string; excerpt: string; content: string;
  category: string; author: string; imageUrl: string | null; published: boolean;
  publishedAt: Date | null; createdAt: Date; updatedAt: Date;
};

export default function BlogsClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);

  const deleteBlog = async (id: number) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlogs((p) => p.filter((b) => b.id !== id));
      toast.success("Article deleted");
      router.refresh();
    } else {
      toast.error("Delete failed");
    }
  };

  const togglePublish = async (blog: Blog) => {
    const res = await fetch("/api/admin/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...blog, published: !blog.published }),
    });
    const data = await res.json();
    if (res.ok) {
      setBlogs((p) => p.map((b) => b.id === data.id ? data : b));
      toast.success(data.published ? "Published!" : "Moved to draft");
    } else {
      toast.error("Failed to update");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{blogs.length} article{blogs.length !== 1 ? "s" : ""}</p>
        <Link href="/admin/blogs/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0a1628] text-white text-xs">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-3 py-3 text-left hidden md:table-cell">Category</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="px-3 py-3 text-left hidden lg:table-cell">Last Updated</th>
              <th className="px-3 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-[#0a1628] text-sm line-clamp-1">{b.title}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{b.author} · /blog/{b.slug}</div>
                </td>
                <td className="px-3 py-3 hidden md:table-cell">
                  <span className="px-2 py-0.5 bg-[#c9a84c]/10 text-[#c9a84c] rounded-full text-xs font-medium">{b.category}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <button onClick={() => togglePublish(b)} title={b.published ? "Click to unpublish" : "Click to publish"}
                    className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                      b.published
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200")}>
                    {b.published ? <><Eye className="w-3 h-3" /> Live</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                  </button>
                </td>
                <td className="px-3 py-3 text-gray-400 text-xs hidden lg:table-cell">{formatDate(b.updatedAt)}</td>
                <td className="px-3 py-3">
                  <div className="flex justify-center gap-1">
                    {b.published && (
                      <Link href={`/blog/${b.slug}`} target="_blank"
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View on site">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    <Link href={`/admin/blogs/${b.id}/edit`}
                      className="p-1.5 text-gray-400 hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 rounded-lg transition-all" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={() => deleteBlog(b.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <div className="text-gray-500 font-medium">No articles yet</div>
                  <div className="text-gray-400 text-sm mt-1">Click "New Article" to write your first post</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
