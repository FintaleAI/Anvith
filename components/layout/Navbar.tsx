"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  { label: "Mutual Funds", href: "/products/mutual-funds" },
  { label: "NBFC Fixed Deposits", href: "/products/nbfc-fd" },
  { label: "Corporate Bonds", href: "/products/corporate-bonds" },
  { label: "Gold & Silver ETFs", href: "/products/gold-silver-etf" },
  { label: "US Equity", href: "/products/us-equity" },
  { label: "Capital Gain Bonds", href: "/products/capital-gain-bonds" },
  { label: "SIFs", href: "/products/sif" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products/mutual-funds", dropdown: PRODUCTS },
  { label: "Calculators", href: "/calculators" },
  { label: "MF Finder", href: "/mf-finder" },
  { label: "Blog", href: "/blog" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a1628]/95 backdrop-blur-md shadow-lg"
          : "bg-[#0a1628]"
      )}
    >
      {/* Top bar */}
      <div className="bg-[#c9a84c]/10 border-b border-[#c9a84c]/20 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-gray-300">
          <span>
            📍 Vadodara, Gujarat &nbsp;|&nbsp; 📞 Contact Us &nbsp;|&nbsp; 🕐 Mon–Sat 10am–6pm
          </span>
          <span className="text-[#c9a84c] font-medium">
            Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully.
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-white rounded-xl p-1 shadow-sm shrink-0 group-hover:opacity-90 transition-opacity">
            <Image
              src="/logo-final.png"
              alt="AnvithBizCap logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight leading-none">
              Anvith<span className="text-[#c9a84c]">BizCap</span>
            </span>
            <p className="text-gray-400 text-[10px] leading-none mt-0.5 tracking-wide">
              Uniting Paths to Financial Prosperity
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-[#c9a84c] transition-colors font-medium"
                >
                  {link.label}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", productsOpen && "rotate-180")} />
                </button>
                {productsOpen && (
                  <div
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                    className="absolute top-full left-0 mt-1 w-56 bg-[#0f2240] border border-[#c9a84c]/20 rounded-xl shadow-xl overflow-hidden"
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors"
                        onClick={() => setProductsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-[#c9a84c] transition-colors font-medium animated-underline"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-[#c9a84c] border border-[#c9a84c]/50 rounded-lg hover:bg-[#c9a84c]/10 transition-all"
          >
            Open Account
          </Link>
          <a
            href="https://anvithbizcap.investwell.app/app/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Login →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a1628] border-t border-[#c9a84c]/20 pb-6">
          <div className="max-w-7xl mx-auto px-6 pt-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-300 font-medium"
                    onClick={() => setProductsOpen(!productsOpen)}
                  >
                    {link.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", productsOpen && "rotate-180")} />
                  </button>
                  {productsOpen &&
                    link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block pl-6 pr-3 py-2 text-sm text-gray-400 hover:text-[#c9a84c]"
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-gray-300 hover:text-[#c9a84c] font-medium"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium text-[#c9a84c] border border-[#c9a84c]/50 rounded-lg"
              >
                Open Account
              </Link>
              <a
                href="https://anvithbizcap.investwell.app/app/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-sm font-semibold bg-[#c9a84c] text-[#0a1628] rounded-lg"
              >
                Login →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
