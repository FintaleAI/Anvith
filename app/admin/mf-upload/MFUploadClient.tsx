"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function MFUploadClient() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [navDate, setNavDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ count: number } | null>(null);
  const [drag, setDrag] = useState(false);

  const handleFile = (f: File) => {
    if (!f.name.match(/\.(xlsx|xls|csv)$/i)) { toast.error("Only .xlsx, .xls or .csv files are accepted."); return; }
    setFile(f); setResult(null);
  };

  const upload = async () => {
    if (!file) { toast.error("Please select a file first."); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("navDate", navDate || new Date().toLocaleDateString("en-IN"));
      const res = await fetch("/api/admin/mf-upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setResult({ count: data.count });
        toast.success(`${data.count.toLocaleString("en-IN")} schemes loaded successfully!`);
        router.refresh();
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
      <h2 className="font-bold text-[#0a1628] text-lg">Upload New Data</h2>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onClick={() => document.getElementById("mf-file-input")?.click()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all",
          drag ? "border-[#c9a84c] bg-[#c9a84c]/5" :
          file ? "border-emerald-400 bg-emerald-50" :
          "border-gray-200 hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/5"
        )}
      >
        <input id="mf-file-input" type="file" accept=".xlsx,.xls,.csv" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <div className="text-left">
              <div className="font-semibold text-[#0a1628]">{file.name}</div>
              <div className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-gray-600">Drop your Excel file here, or click to browse</p>
            <p className="text-gray-400 text-sm mt-1">Supports .xlsx, .xls, .csv — max 50MB</p>
          </>
        )}
      </div>

      {/* NAV date */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          NAV Date (shown on MF Finder page)
        </label>
        <input type="text" value={navDate} onChange={(e) => setNavDate(e.target.value)}
          placeholder="e.g. 03-May-2026"
          className="w-full sm:w-64 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c]"
        />
        <p className="text-xs text-gray-400 mt-1">Leave blank to use today&apos;s date.</p>
      </div>

      {/* Result */}
      {result && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-emerald-700 font-medium text-sm">
            ✅ {result.count.toLocaleString("en-IN")} schemes uploaded successfully!
          </span>
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button onClick={upload} disabled={loading || !file}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity">
          {loading ? <span className="w-4 h-4 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
          {loading ? "Processing…" : "Upload & Replace Data"}
        </button>
        {file && (
          <button onClick={() => { setFile(null); setResult(null); }} className="text-sm text-gray-400 hover:text-red-500 transition-colors">
            Clear
          </button>
        )}
      </div>

      <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <span>This will <strong>replace all existing scheme data</strong>. The MF Scheme Finder will immediately reflect the new data after upload.</span>
      </div>
    </div>
  );
}
