import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Newspaper, ExternalLink } from "lucide-react";

// Server-render on every request so admin-published news items appear immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Market News & Economy Updates",
  description: "Stay updated with the latest news on Indian economy, mutual funds, RBI policy, interest rates, and financial markets.",
};

async function getNews() {
  return prisma.news.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">Updates</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
            Market News & <span className="text-gradient-gold">Economy Updates</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Stay informed on Indian economy, RBI policy, mutual fund news, market movements, and financial planning updates.</p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-400 mb-2">No news published yet</h2>
              <p className="text-gray-400 text-sm">Check back soon for the latest market and economy updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow p-6">
                  <span className="inline-block px-2.5 py-0.5 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-semibold rounded-full mb-3">{item.category}</span>
                  <h2 className="font-bold text-[#0a1628] text-base mb-2 leading-snug">{item.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{formatDate(item.publishedAt || item.createdAt)}</span>
                    {item.source && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span>{item.source}</span>
                        {item.sourceUrl && <ExternalLink className="w-3 h-3" />}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
