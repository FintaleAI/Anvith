import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, Eye, Heart, TrendingUp, Users, Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About Us — AnvithBizCap",
  description:
    "Learn about AnvithBizCap, founded by CA Amay Jagdish Dhaneshwar on 1 December 2022. Our story, mission, vision, and values.",
};

const VALUES = [
  { icon: Heart, title: "Honesty", desc: "We recommend only what is right for you — not what earns us the most." },
  { icon: Target, title: "Awareness First", desc: "Education before transaction. We explain before we advise." },
  { icon: Users, title: "Accessibility", desc: "Wealth planning isn't just for the elite. It's for every Indian family." },
  { icon: Star, title: "Excellence", desc: "CA-level financial rigour applied to every client interaction." },
  { icon: CheckCircle2, title: "Transparency", desc: "Clear fees, clear products, no hidden agenda." },
  { icon: TrendingUp, title: "Long-Term Focus", desc: "We think in decades, not quarters." },
];

const TIMELINE = [
  { year: "Early Days", title: "Ground-Level Work", desc: "CA Amay began by physically collecting investment forms and submitting them to the RTA — learning the industry from the ground up." },
  { year: "CA Cleared", title: "Knowledge + Perspective", desc: "Clearing CA brought deep financial knowledge. The ground-level days brought real perspective on how wide the awareness gap truly is." },
  { year: "Dec 2022", title: "AnvithBizCap Founded", desc: "On 1st December 2022, AnvithBizCap was officially launched — a one-person mission to bridge India's financial awareness gap." },
  { year: "2023", title: "Growing Team & Platform", desc: "A team of dedicated associates joined. Technology was built to serve clients digitally through the InvestWell platform." },
  { year: "2024–25", title: "Digital Ecosystem", desc: "Launched online tools, MF scheme finder, investment calculators, and expanded to serve clients across Gujarat and India." },
  { year: "Today", title: "500+ Investors Served", desc: "AnvithBizCap continues to grow — driven by awareness, trust, and a genuine desire to improve India's investment culture." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
            Built on Awareness. <br />
            <span className="text-gradient-gold">Driven by Purpose.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            AnvithBizCap wasn&apos;t founded to be just another mutual fund distributor. It was founded to change how India thinks about wealth — one investor at a time.
          </p>
        </div>
      </section>

      {/* Full Story */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader badge="The Journey" title="A Story of" highlight="Persistence & Purpose" />
          <div className="mt-12 prose-blog space-y-6 text-gray-600 text-base leading-relaxed">
            <p>
              India is one of the fastest growing economies in the world. Yet when it comes to wealth creation, most Indians are still on the sidelines.
            </p>
            <p>
              The reason is not lack of money. <strong className="text-[#0a1628]">The reason is lack of awareness.</strong>
            </p>
            <p>
              As a Chartered Accountant, CA Amay Jagdish Dhaneshwar has sat across hundreds of hardworking individuals and families who had surplus money sitting idle in savings accounts and fixed deposits — not because they did not want to grow it, but because nobody ever showed them a better way.
            </p>
            <p>
              In the United States, nearly 50% of households actively invest in equities. In India, that number is still under 5%. The opportunity is enormous, especially in Tier 1 and Tier 2 cities where incomes are rising but financial guidance is still missing.
            </p>
            <blockquote className="border-l-4 border-[#c9a84c] pl-6 italic text-[#0a1628] text-lg my-8">
              Most people believe mutual funds are only about equity and market risk. What they do not know is that mutual funds also offer debt-based and liquid options — safer, smarter, and far more rewarding than a traditional FD in suitable cases.
            </blockquote>
            <p>
              This awareness gap is exactly the problem AnvithBizCap was built to solve.
            </p>
            <p>
              Before founding AnvithBizCap, CA Amay Jagdish Dhaneshwar was doing ground-level work in the industry — physically collecting forms and submitting them to the RTA. No app, no platform, no team. Just paperwork, persistence, and an unshakeable belief that something bigger was possible.
            </p>
            <p>
              Clearing CA brought knowledge. But those early ground-level days brought perspective — a real understanding of how the industry works and how wide the awareness gap truly is.
            </p>
            <p>
              On <strong className="text-[#0a1628]">1st December 2022</strong>, AnvithBizCap was officially launched by CA Amay Jagdish Dhaneshwar. What started as a one-person mission has today grown into a team of dedicated associates, backed by its own technology platform and app, built to make wealth planning accessible to every Indian.
            </p>
            <p className="font-semibold text-[#0a1628]">
              From collecting forms by hand to building a digital ecosystem — this journey is real, purposeful, and deeply personal.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3560] rounded-3xl p-10 text-white">
            <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-[#c9a84c]" />
            </div>
            <h2 className="text-2xl font-bold font-display mb-4 text-[#c9a84c]">Our Vision</h2>
            <p className="text-gray-200 leading-relaxed text-lg italic">
              &ldquo;To become India&apos;s most trusted wealth awareness platform — empowering every individual and family across Tier 1 and Tier 2 cities to make informed, confident financial decisions and build lasting wealth.&rdquo;
            </p>
          </div>
          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#c9a84c]" />
            </div>
            <h2 className="text-2xl font-bold font-display text-[#0a1628] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-base italic">
              &ldquo;To bridge the financial awareness gap in India by offering honest, simple, and personalised mutual fund distribution services — making wealth planning accessible not just for the elite, but for every hardworking Indian who deserves a better financial future.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="What We Stand For" title="Our Core" highlight="Values" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl bg-[#f8fafc] border border-gray-100">
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

      {/* Timeline */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader badge="Our Journey" title="The" highlight="AnvithBizCap Timeline" />
          <div className="mt-12 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a84c] to-[#e2cc96]" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}>
                  <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    {i % 2 === 0 && (
                      <div className="pr-8">
                        <span className="inline-block px-3 py-1 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold rounded-full mb-2">{item.year}</span>
                        <h3 className="font-bold text-[#0a1628] mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#c9a84c] border-4 border-white shadow-md transform -translate-x-1/2 mt-1" />
                  <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${i % 2 !== 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="md:hidden">
                      <span className="inline-block px-3 py-1 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold rounded-full mb-2">{item.year}</span>
                    </div>
                    {i % 2 !== 0 && (
                      <div>
                        <span className="hidden md:inline-block px-3 py-1 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-bold rounded-full mb-2">{item.year}</span>
                        <h3 className="font-bold text-[#0a1628] mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    )}
                    <div className="md:hidden">
                      <h3 className="font-bold text-[#0a1628] mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white font-display mb-4">Ready to Start Your Wealth Journey?</h2>
          <p className="text-gray-300 mb-8">Join hundreds of investors across India who trust AnvithBizCap for honest, awareness-driven wealth planning.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#d4b86a] text-[#0a1628] font-bold rounded-xl hover:opacity-90 transition-opacity">
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculators" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Try Calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
