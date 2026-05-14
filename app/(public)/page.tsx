import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, TrendingUp, Shield, Users, BarChart3, BookOpen, Target,
  Star, ChevronRight, Calculator, Lightbulb, Award, Globe
} from "lucide-react";
import LeadForm from "@/components/home/LeadForm";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "AnvithBizCap | Trusted Wealth Advisory & Mutual Fund Distribution",
  description: "Start your investment journey with AnvithBizCap — mutual fund distribution, SIP planning, NBFC FDs, corporate bonds, Gold ETFs, US Equity, and Capital Gain Bonds. Based in Gujarat, serving India.",
};

const STATS = [
  { label: "Investors Served", value: "500+", icon: Users },
  { label: "AUM Managed", value: "₹15 Cr+", icon: TrendingUp },
  { label: "Fund Schemes", value: "1,700+", icon: BarChart3 },
  { label: "Years of Trust", value: "3+", icon: Award },
];

const PRODUCTS = [
  {
    icon: TrendingUp,
    title: "Mutual Funds",
    subtitle: "Equity, Debt, Hybrid & more",
    desc: "Grow wealth systematically through SIP or lumpsum. From aggressive equity to safe debt funds — every need covered.",
    href: "/products/mutual-funds",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Shield,
    title: "NBFC Fixed Deposits",
    subtitle: "Higher returns than bank FDs",
    desc: "Earn better interest rates with NBFC FDs — a smarter alternative to traditional bank deposits.",
    href: "/products/nbfc-fd",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Corporate Bonds",
    subtitle: "Fixed income opportunity",
    desc: "Invest in high-quality corporate bonds for predictable returns and portfolio diversification.",
    href: "/products/corporate-bonds",
    color: "from-purple-500/10 to-purple-600/5",
    iconColor: "text-purple-600",
  },
  {
    icon: Globe,
    title: "US Equity",
    subtitle: "Invest in S&P 500, Nasdaq & more",
    desc: "Own Apple, Google, Amazon and the world's best companies. We guide you through every step — platform, taxation, forex, and portfolio building.",
    href: "/products/us-equity",
    color: "from-sky-500/10 to-sky-600/5",
    iconColor: "text-sky-600",
  },
  {
    icon: Globe,
    title: "Gold & Silver ETFs",
    subtitle: "Precious metal investing, reinvented",
    desc: "SGBs are discontinued. Gold ETFs and Silver ETFs are now the smartest way to invest in precious metals — liquid, low-cost, and demat-held.",
    href: "/products/gold-silver-etf",
    color: "from-yellow-500/10 to-yellow-600/5",
    iconColor: "text-yellow-600",
  },
  {
    icon: Shield,
    title: "Capital Gain Bonds",
    subtitle: "54EC — Save tax on property sale",
    desc: "Sold land or a building? Reinvest your LTCG into NHAI/REC/PFC bonds within 6 months and save 100% of your capital gains tax.",
    href: "/products/capital-gain-bonds",
    color: "from-teal-500/10 to-teal-600/5",
    iconColor: "text-teal-600",
  },
  {
    icon: Lightbulb,
    title: "SIFs",
    subtitle: "Specialised Investment Funds",
    desc: "Access specialised investment opportunities designed for informed investors seeking diversification.",
    href: "/products/sif",
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-600",
  },
];

const WHY = [
  {
    icon: Shield,
    title: "Trusted & Transparent",
    desc: "CA-founded, AMFI-registered, and committed to honest, unbiased guidance.",
  },
  {
    icon: Lightbulb,
    title: "Awareness First",
    desc: "We educate before we advise — empowering you to make confident decisions.",
  },
  {
    icon: Target,
    title: "Goal-Based Planning",
    desc: "Every investment is mapped to your specific life goals — retirement, education, marriage.",
  },
  {
    icon: Calculator,
    title: "Powerful Tools",
    desc: "Free calculators, MF scheme finder, and portfolio insights at your fingertips.",
  },
  {
    icon: Users,
    title: "Personal Attention",
    desc: "You're not a number. Each client gets dedicated advisor support.",
  },
  {
    icon: BookOpen,
    title: "Continuous Education",
    desc: "Blogs, news, and updates to keep you informed on market and policy changes.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Patel",
    location: "Vadodara",
    rating: 5,
    text: "AnvithBizCap transformed how I look at investing. I never knew debt mutual funds could beat FD returns!",
    product: "Mutual Funds",
  },
  {
    name: "Priya Shah",
    location: "Surat",
    rating: 5,
    text: "CA Amay explained SIPs so simply. I started with ₹5,000/month and now I feel in control of my future.",
    product: "SIP",
  },
  {
    name: "Manish Joshi",
    location: "Ahmedabad",
    rating: 5,
    text: "The MF Scheme Finder is brilliant. I found the right fund for my goals in minutes.",
    product: "MF Finder",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full bg-[#c9a84c]/5 blur-3xl" />
        <div className="absolute bottom-[-50px] left-[-100px] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: headline */}
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
              AMFI Registered Mutual Fund Distributor
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-display mb-6">
              Invest Smarter.
              <br />
              <span className="text-gradient-gold">Build Wealth</span>
              <br />
              With Awareness.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Most Indians have surplus money but lack the awareness to grow it. AnvithBizCap bridges that gap — making wealth planning simple, trustworthy, and accessible for every Indian family.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg animate-pulse-gold"
              >
                <Calculator className="w-4 h-4" />
                Explore Calculators
              </Link>
              <a
                href="https://anvithbizcap.investwell.app/app/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Client Login
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map(({ label, value, icon: Icon }) => (
                <div key={label} className="glass-card rounded-xl p-4 text-center">
                  <Icon className="w-5 h-5 text-[#c9a84c] mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: lead form */}
          <div className="glass-card rounded-2xl p-8 shadow-2xl border border-white/10">
            <h2 className="text-white font-bold text-xl mb-2 font-display">
              Start Your Investment Journey
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Book a free consultation with our expert. No commitment, just clarity.
            </p>
            <LeadForm dark />
          </div>
        </div>
      </section>

      {/* ─── AWARENESS STRIP ─── */}
      <section className="bg-[#c9a84c] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[#0a1628] text-sm font-semibold">
            💡 Did you know? In the US, nearly 50% of households invest in equities. In India, it&apos;s still under 5%. The opportunity is enormous — and it starts with awareness.
          </p>
        </div>
      </section>

      {/* ─── OUR STORY TEASER ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] leading-tight font-display mb-6">
              From Collecting Forms by Hand <br />
              <span className="text-gradient-gold">to Building a Digital Platform</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Before founding AnvithBizCap, CA Amay Jagdish Dhaneshwar was doing ground-level work in the industry — physically collecting forms and submitting them to the RTA. No app, no platform, no team. Just paperwork, persistence, and an unshakeable belief that something bigger was possible.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              On 1st December 2022, AnvithBizCap was officially launched. What started as a one-person mission has today grown into a team of dedicated associates, backed by its own technology platform — built to make wealth planning accessible to every Indian.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#c9a84c] font-semibold hover:gap-3 transition-all"
            >
              Read our full story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 gradient-navy rounded-3xl opacity-5" />
            <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3560] rounded-3xl p-10 text-white">
              <blockquote className="text-lg md:text-xl font-display italic text-gray-200 leading-relaxed mb-6">
                &ldquo;The reason most Indians don&apos;t invest isn&apos;t lack of money. It&apos;s lack of awareness. That&apos;s exactly the problem AnvithBizCap was built to solve.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e2cc96] flex items-center justify-center text-[#0a1628] font-bold text-lg">A</div>
                <div>
                  <div className="font-semibold text-white">CA Amay Jagdish Dhaneshwar</div>
                  <div className="text-gray-400 text-sm">Founder, AnvithBizCap</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="What We Offer"
            title="Investment Products for"
            highlight="Every Goal"
            subtitle="Whether you're starting with ₹500 a month or planning a ₹1 Cr corpus, we have a solution tailored for you."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <p.icon className={`w-6 h-6 ${p.iconColor}`} />
                </div>
                <h3 className="font-bold text-[#0a1628] text-lg mb-1">{p.title}</h3>
                <p className="text-[#c9a84c] text-xs font-semibold mb-2">{p.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[#c9a84c] text-sm font-semibold">
                  Learn more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALCULATOR CTA ─── */}
      <section className="py-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Free Investment Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
            Plan Your Wealth with <span className="text-gradient-gold">Powerful Calculators</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            SIP, Lumpsum, SWP, Goal Planner, Retirement Calculator, and 11 more — all free, visual, and built for Indian investors.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["SIP Calculator", "Goal Planner", "Retirement Calc", "ELSS / Tax Saver", "SWP Calculator", "Step-Up SIP"].map((c) => (
              <span key={c} className="px-4 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20">
                {c}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg text-base"
            >
              <Calculator className="w-5 h-5" />
              Open All Calculators
            </Link>
            <Link
              href="/mf-finder"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              <BarChart3 className="w-5 h-5" />
              MF Scheme Finder
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY ANVITHBIZCAP ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Why Choose Us"
            title="More Than Just a Distributor —"
            highlight="A Wealth Partner"
            subtitle="We believe every Indian deserves honest, accessible financial guidance — not just the wealthy few."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0a1628] mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Client Stories" title="Trusted by" highlight="Hundreds of Investors" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0a1628] to-[#1a3560] flex items-center justify-center text-white text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a1628] text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.location} · {t.product}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AWARENESS MESSAGE ─── */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] to-[#1a3560]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Lightbulb className="w-12 h-12 text-[#c9a84c] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-6">
            Mutual Funds Are Not Just About the Stock Market
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Most people think mutual funds are only about equity and market risk. What they don&apos;t know is that mutual funds also offer <strong className="text-[#c9a84c]">debt-based and liquid options</strong> — safer, smarter, and far more rewarding than a traditional FD in suitable cases.
          </p>
          <Link
            href="/products/mutual-funds"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90 transition-opacity text-base"
          >
            Explore All Fund Types <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ─── CONSULTATION FORM ─── */}
      <section id="consult" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              badge="Free Consultation"
              title="Ready to Start"
              highlight="Your Journey?"
              subtitle="Fill in the form and our advisor will reach out within 24 hours. No spam, no pressure — just honest guidance."
              center={false}
            />
            <div className="mt-8 space-y-4">
              {[
                "Understand which investment suits your goals",
                "Get a personalised SIP plan",
                "Compare mutual funds vs FDs vs bonds",
                "Understand tax-saving options under 80C",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#c9a84c]/20 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-3 h-3 text-[#c9a84c]" />
                  </div>
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-100 shadow-sm">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section className="py-6 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
            Returns shown in calculators are illustrative and not guaranteed returns. AnvithBizCap acts as a mutual fund distributor/intermediary.
            Product suitability depends on individual investor goals, risk profile, and time horizon. Registered with AMFI.
          </p>
        </div>
      </section>
    </>
  );
}
