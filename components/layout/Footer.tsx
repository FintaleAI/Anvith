import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050d1a] text-gray-400">
      {/* Disclaimer banner */}
      <div className="bg-[#0a1628] border-b border-[#c9a84c]/20 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-center text-gray-400 leading-relaxed">
            <span className="text-[#c9a84c] font-semibold">Disclaimer: </span>
            Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
            Returns shown in calculators are illustrative and not guaranteed. AnvithBizCap acts as a mutual fund distributor/intermediary.
            Product suitability depends on investor goals, risk profile, and time horizon.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="bg-white rounded-xl p-1 shadow-sm shrink-0 group-hover:opacity-90 transition-opacity">
                <Image
                  src="/logo-final.png"
                  alt="AnvithBizCap logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight leading-none">
                  Anvith<span className="text-[#c9a84c]">BizCap</span>
                </span>
                <p className="text-gray-500 text-[10px] leading-none mt-0.5 tracking-wide">
                  Uniting Paths to Financial Prosperity
                </p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Bridging the financial awareness gap in India. Empowering every individual and family to make informed, confident financial decisions.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:hello@anvithbizcap.com" className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors">
                <Mail className="w-4 h-4 text-[#c9a84c]" />
                hello@anvithbizcap.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors">
                <Phone className="w-4 h-4 text-[#c9a84c]" />
                +91 98765 43210
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
                Vadodara, Gujarat, India
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Products</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Mutual Funds", href: "/products/mutual-funds" },
                { label: "NBFC Fixed Deposits", href: "/products/nbfc-fd" },
                { label: "Corporate Bonds", href: "/products/corporate-bonds" },
                { label: "Gold & Silver ETFs", href: "/products/gold-silver-etf" },
                { label: "US Equity", href: "/products/us-equity" },
                { label: "Capital Gain Bonds", href: "/products/capital-gain-bonds" },
                { label: "SIFs", href: "/products/sif" },
              ].map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-[#c9a84c] transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Tools & Resources</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "SIP Calculator", href: "/calculators#sip" },
                { label: "Lumpsum Calculator", href: "/calculators#lumpsum" },
                { label: "Goal Planner", href: "/calculators#goal" },
                { label: "MF Scheme Finder", href: "/mf-finder" },
                { label: "Blog & Articles", href: "/blog" },
                { label: "Market News", href: "/news" },
                { label: "Open Account", href: "/register" },
              ].map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="hover:text-[#c9a84c] transition-colors">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Story", href: "/about#story" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Risk Disclosure", href: "/risk-disclosure" },
              ].map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="hover:text-[#c9a84c] transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="https://anvithbizcap.investwell.app/app/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity"
              >
                Client Login →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#c9a84c]/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AnvithBizCap. All rights reserved. Founded by CA Amay Jagdish Dhaneshwar.</p>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>AMFI Registered Mutual Fund Distributor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
