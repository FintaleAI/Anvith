import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anvithbizcap.com"),
  title: {
    default: "AnvithBizCap | Trusted Wealth Advisory & Mutual Fund Distribution",
    template: "%s | AnvithBizCap",
  },
  description:
    "AnvithBizCap is a trusted wealth advisory and mutual fund distribution platform based in Gujarat, India. We help individuals and families plan smarter investments — SIP, Mutual Funds, NBFC FDs, Corporate Bonds, Gold ETFs, US Equity, and Capital Gain Bonds.",
  keywords: [
    "mutual fund distributor Gujarat",
    "mutual fund advisor Gujarat",
    "SIP investment Gujarat",
    "financial planning Gujarat",
    "NBFC FD investment",
    "corporate bonds India",
    "US equity investment India",
    "Gold ETF investment India",
    "capital gain bonds 54EC",
    "mutual fund calculator India",
    "best SIP calculator",
    "AnvithBizCap",
    "wealth advisory Vadodara",
  ],
  authors: [{ name: "CA Amay Jagdish Dhaneshwar" }],
  creator: "AnvithBizCap",
  publisher: "AnvithBizCap",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.anvithbizcap.com",
    siteName: "AnvithBizCap",
    title: "AnvithBizCap | Trusted Wealth Advisory & Mutual Fund Distribution",
    description:
      "Empowering Indian investors with awareness-driven, technology-enabled wealth planning.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AnvithBizCap" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-[#0a1628] font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0a1628",
              color: "#fff",
              borderLeft: "4px solid #c9a84c",
            },
          }}
        />
      </body>
    </html>
  );
}
