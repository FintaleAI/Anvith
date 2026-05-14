import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug }, select: { title: true, excerpt: true } });
  if (!blog) return { title: "Article Not Found" };
  return { title: blog.title, description: blog.excerpt };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug, published: true } });
  if (!blog) notFound();

  return (
    <>
      <section className="gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c9a84c] text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-semibold rounded-full mb-4">{blog.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display leading-tight mb-6">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2"><User className="w-4 h-4" />{blog.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(blog.publishedAt || blog.createdAt)}</span>
            <span className="flex items-center gap-2"><Tag className="w-4 h-4" />{blog.category}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose-blog" dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 italic">
              Disclaimer: This article is for educational purposes only and does not constitute investment advice. Mutual fund investments are subject to market risks. Please consult a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
