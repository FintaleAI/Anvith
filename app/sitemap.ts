import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.anvithbizcap.com";

  const staticRoutes = [
    "", "/about", "/contact", "/calculators", "/mf-finder", "/blog", "/news", "/register",
    "/products/mutual-funds", "/products/nbfc-fd", "/products/corporate-bonds",
    "/products/gold-silver-etf", "/products/capital-gain-bonds", "/products/us-equity", "/products/sif",
    "/privacy-policy", "/terms", "/disclaimer", "/risk-disclosure",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await prisma.blog.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
    blogRoutes = blogs.map((b) => ({
      url: `${base}/blog/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch { /* db might not be ready during build */ }

  return [...staticRoutes, ...blogRoutes];
}
