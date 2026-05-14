"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Eye, EyeOff, Loader2 } from "lucide-react";
import RichEditor from "./RichEditor";

type Blog = {
  id: number; title: string; slug: string; excerpt: string; content: string;
  category: string; author: string; imageUrl: string | null; published: boolean;
};

const CATS = [
  "Mutual Funds","Financial Planning","Tax Planning","Economy",
  "Investor Awareness","Fixed Income","Insurance","Gold Investment","Market Updates",
];

function toSlug(t: string) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/20 transition-all bg-white";

export default function BlogEditorPage({ blog }: { blog: Blog | null }) {
  const router = useRouter();
  const isNew = !blog;
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const [form, setForm] = useState({
    title: blog?.title ?? "",
    slug: blog?.slug ?? "",
    excerpt: blog?.excerpt ?? "",
    content: blog?.content ?? "",
    category: blog?.category ?? "Mutual Funds",
    author: blog?.author ?? "Team AnvithBizCap",
    imageUrl: blog?.imageUrl ?? "",
    published: blog?.published ?? false,
  });

  // Auto-generate slug from title on new posts
  useEffect(() => {
    if (isNew && form.title) {
      setForm((p) => ({ ...p, slug: toSlug(form.title) }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const save = async (publish?: boolean) => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.content || form.content === "<p></p>") { toast.error("Content cannot be empty"); return; }
    if (!form.excerpt.trim()) { toast.error("Excerpt is required"); return; }

    setLoading(true);
    const payload = { ...form, ...(blog?.id ? { id: blog.id } : {}), published: publish ?? form.published };
    try {
      const res = await fetch("/api/admin/blogs", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(isNew ? "Article created!" : "Article updated!");
        router.push("/admin/blogs");
        router.refresh();
      } else {
        toast.error(data.error || "Save failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <Link href="/admin/blogs"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0a1628] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-600">
            {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {preview ? "Hide Preview" : "Preview"}
          </button>
          <button onClick={() => save(false)} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-600 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </button>
          <button onClick={() => save(true)} disabled={loading}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {form.published || blog?.published ? "Update & Publish" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Article Title *"
              className="w-full text-2xl font-bold text-[#0a1628] placeholder-gray-300 border-0 border-b border-gray-100 pb-3 focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 shrink-0">/blog/</span>
                <input
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className={`${inp} text-xs`}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Content *</label>
              <RichEditor
                value={form.content}
                onChange={(v) => set("content", v)}
                placeholder="Write your article here. Use the toolbar to format text, add headings, lists, and more…"
                minHeight="420px"
              />
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#0a1628] mb-4">Publish Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-600">Publish immediately</span>
                <div onClick={() => set("published", !form.published)}
                  className={`relative inline-flex w-10 h-6 rounded-full transition-colors cursor-pointer ${form.published ? "bg-[#c9a84c]" : "bg-gray-200"}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-1"}`} />
                </div>
              </label>
              <p className="text-xs text-gray-400">
                {form.published ? "✅ Will be visible on the website" : "📝 Saved as draft — not visible to visitors"}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-[#0a1628]">Article Details</h3>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inp}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Author</label>
              <input value={form.author} onChange={(e) => set("author", e.target.value)} className={inp} placeholder="Author name" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Excerpt <span className="text-gray-300">(shown in listing)</span></label>
              <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3}
                className={`${inp} resize-none`} placeholder="Short description of the article…" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Cover Image URL <span className="text-gray-300">(optional)</span></label>
              <input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} className={inp} placeholder="https://..." />
              {form.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.imageUrl} alt="cover" className="mt-2 w-full h-32 object-cover rounded-xl border border-gray-100" onError={(e) => (e.currentTarget.style.display = "none")} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live preview */}
      {preview && (
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs text-[#c9a84c] font-semibold uppercase tracking-wider mb-2">{form.category}</div>
            <h1 className="text-3xl font-bold text-[#0a1628] font-display mb-3">{form.title || "Untitled"}</h1>
            <p className="text-gray-500 mb-6 border-b border-gray-100 pb-6">{form.excerpt}</p>
            {form.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.imageUrl} alt="cover" className="w-full h-64 object-cover rounded-2xl mb-6" />
            )}
            <div
              className="prose prose-lg max-w-none prose-headings:text-[#0a1628] prose-a:text-[#1a3560]"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
