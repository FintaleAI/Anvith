import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { BookOpen, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

// Server-render on every request so admin-published posts appear immediately.
// Without this, the route is prerendered at build time with an empty DB.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Investor Awareness, Mutual Funds, Financial Planning",
  description: "Read articles on mutual funds, SIP planning, tax saving, market updates, and more from the AnvithBizCap team.",
};

const CATEGORIES = ["All", "Mutual Funds", "Financial Planning", "Tax Planning", "Economy", "Investor Awareness", "Fixed Income", "Insurance", "Gold Investment", "Market Updates"];

async function getBlogs() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { id: true, title: true, slug: true, excerpt: true, category: true, author: true, publishedAt: true, createdAt: true, imageUrl: true },
  });
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
            Insights & <span className="text-gradient-gold">Investor Awareness</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Articles on mutual funds, financial planning, tax, economy, and more — written to help you invest smarter.</p>
        </div>
      </section>

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-400 mb-2">No articles published yet</h2>
              <p className="text-gray-400 text-sm">Check back soon — we&apos;re working on fresh content for you.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link key={blog.slug} href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-[#c9a84c]/40 hover:shadow-xl transition-all overflow-hidden">
                  {blog.imageUrl ? (
                    <div className="h-48 bg-gradient-to-br from-[#0a1628] to-[#1a3560] overflow-hidden">
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#0a1628] to-[#1a3560] flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-[#c9a84c]/40" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block px-2.5 py-0.5 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-semibold rounded-full mb-3">{blog.category}</span>
                    <h2 className="font-bold text-[#0a1628] text-lg mb-2 group-hover:text-[#c9a84c] transition-colors leading-snug">{blog.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{blog.author}</span>
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[#c9a84c] text-xs font-semibold">
                      Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
