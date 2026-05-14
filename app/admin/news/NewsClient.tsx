"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import RichEditor from "@/components/admin/RichEditor";

type NewsItem = {
  id: number; title: string; excerpt: string; content: string | null;
  source: string | null; sourceUrl: string | null; category: string;
  imageUrl: string | null; published: boolean; publishedAt: Date | null;
  createdAt: Date; updatedAt: Date;
};

const CATS = [
  "Indian Economy","Global Economy","Mutual Funds","Markets","Interest Rates",
  "Inflation","Government Policy","RBI Updates","Tax & Investment","Insurance","Gold",
];
const BLANK: Partial<NewsItem> = {
  title: "", excerpt: "", content: "", source: "", sourceUrl: "",
  category: "Indian Economy", imageUrl: "", published: false,
};

const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/20 transition-all";

export default function NewsClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [items, setItems] = useState(initialNews);
  const [editing, setEditing] = useState<Partial<NewsItem> | null>(null);
  const [loading, setLoading] = useState(false);

  const open = (item?: NewsItem) => setEditing(item ? { ...item } : { ...BLANK });
  const close = () => setEditing(null);

  const save = async () => {
    if (!editing?.title?.trim()) { toast.error("Title is required"); return; }
    if (!editing?.excerpt?.trim()) { toast.error("Excerpt is required"); return; }
    setLoading(true);
    try {
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/news", {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (res.ok) {
        if (editing.id) setItems((p) => p.map((i) => i.id === data.id ? data : i));
        else setItems((p) => [data, ...p]);
        toast.success(editing.id ? "News updated!" : "News published!");
        close();
      } else toast.error(data.error || "Save failed");
    } catch { toast.error("Network error"); }
    finally { setLoading(false); }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Delete this news item?")) return;
    const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
    if (res.ok) { setItems((p) => p.filter((i) => i.id !== id)); toast.success("Deleted"); }
    else toast.error("Delete failed");
  };

  const togglePublish = async (item: NewsItem) => {
    const res = await fetch("/api/admin/news", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, published: !item.published }),
    });
    const data = await res.json();
    if (res.ok) {
      setItems((p) => p.map((i) => i.id === data.id ? data : i));
      toast.success(data.published ? "Published!" : "Moved to draft");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        <button onClick={() => open()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add News
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0a1628] text-white text-xs">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-3 py-3 text-left hidden md:table-cell">Category</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="px-3 py-3 text-left hidden lg:table-cell">Date</th>
              <th className="px-3 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-[#0a1628] text-sm line-clamp-1">{item.title}</div>
                  {item.source && <div className="text-gray-400 text-xs mt-0.5">Source: {item.source}</div>}
                </td>
                <td className="px-3 py-3 hidden md:table-cell">
                  <span className="px-2 py-0.5 bg-[#c9a84c]/10 text-[#c9a84c] rounded-full text-xs font-medium">{item.category}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <button onClick={() => togglePublish(item)} title={item.published ? "Click to unpublish" : "Click to publish"}
                    className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                      item.published
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200")}>
                    {item.published ? <><Eye className="w-3 h-3" /> Live</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                  </button>
                </td>
                <td className="px-3 py-3 text-gray-400 text-xs hidden lg:table-cell">{formatDate(item.createdAt)}</td>
                <td className="px-3 py-3">
                  <div className="flex justify-center gap-1">
                    <button onClick={() => open(item)}
                      className="p-1.5 text-gray-400 hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 rounded-lg transition-all" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteItem(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="text-4xl mb-3">📰</div>
                  <div className="text-gray-500 font-medium">No news items yet</div>
                  <div className="text-gray-400 text-sm mt-1">Click "Add News" to post your first update</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-[#0a1628] text-lg">{editing.id ? "Edit News" : "Add News"}</h2>
              <button onClick={close} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">News Title *</label>
                <input value={editing.title || ""} onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Enter news headline…" className={inp} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Category</label>
                  <select value={editing.category || "Indian Economy"} onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))} className={inp}>
                    {CATS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Source</label>
                  <input value={editing.source || ""} onChange={(e) => setEditing((p) => ({ ...p, source: e.target.value }))}
                    placeholder="e.g. Economic Times" className={inp} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Source URL <span className="text-gray-300">(optional)</span></label>
                <input value={editing.sourceUrl || ""} onChange={(e) => setEditing((p) => ({ ...p, sourceUrl: e.target.value }))}
                  placeholder="https://..." className={inp} />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Excerpt * <span className="text-gray-300">(shown in news listing)</span></label>
                <textarea value={editing.excerpt || ""} onChange={(e) => setEditing((p) => ({ ...p, excerpt: e.target.value }))}
                  placeholder="Brief summary of the news…" rows={2} className={`${inp} resize-none`} />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Full Content <span className="text-gray-300">(optional — for detailed news articles)</span></label>
                <RichEditor
                  value={editing.content || ""}
                  onChange={(v) => setEditing((p) => ({ ...p, content: v }))}
                  placeholder="Add more details about this news item…"
                  minHeight="200px"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Cover Image URL <span className="text-gray-300">(optional)</span></label>
                <input value={editing.imageUrl || ""} onChange={(e) => setEditing((p) => ({ ...p, imageUrl: e.target.value }))}
                  placeholder="https://..." className={inp} />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setEditing((p) => ({ ...p, published: !p?.published }))}
                  className={`relative inline-flex w-10 h-6 rounded-full transition-colors cursor-pointer ${editing.published ? "bg-[#c9a84c]" : "bg-gray-200"}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${editing.published ? "translate-x-5" : "translate-x-1"}`} />
                </div>
                <span className="text-sm text-gray-600">Publish immediately</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={close} className="px-5 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={save} disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold text-sm rounded-xl hover:opacity-90 disabled:opacity-60">
                {loading ? "Saving…" : editing.id ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
