"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard, FileText, Newspaper, Users, Upload,
  LogOut, Menu, X, ChevronRight, BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const NAV = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/mf-upload",  icon: Upload,          label: "MF Data Upload" },
  { href: "/admin/blogs",      icon: FileText,         label: "Blogs" },
  { href: "/admin/news",       icon: Newspaper,        label: "News" },
  { href: "/admin/leads",      icon: Users,            label: "Leads" },
  { href: "/admin/guide",      icon: BookOpen,         label: "How to Use" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [sideOpen, setSideOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <>{children}</>;

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[#0a1628] flex flex-col transition-transform duration-300",
        sideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="bg-white rounded-xl p-1 shadow-sm shrink-0">
              <Image src="/logo-final.png" alt="AnvithBizCap" width={32} height={32} className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Anvith<span className="text-[#c9a84c]">BizCap</span></div>
              <div className="text-gray-500 text-[10px] tracking-wider">ADMIN PANEL</div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                onClick={() => setSideOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-[#c9a84c]/20 text-[#c9a84c]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <div className="mt-3 px-4">
            <Link href="/" target="_blank"
              className="text-xs text-gray-600 hover:text-[#c9a84c] transition-colors">
              ← View Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sideOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSideOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden text-gray-500" onClick={() => setSideOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-[#0a1628]">
              {NAV.find((n) => pathname.startsWith(n.href))?.label ?? "Admin"}
            </h1>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
