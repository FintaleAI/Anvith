import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

// Invalidate the public-facing routes that read from the Blog table.
// Defensive against any future ISR / cache layer being added on top.
function bustBlogCaches(slug?: string | null) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(blogs);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { title, excerpt, content, category, author, imageUrl, published } = body;
    if (!title || !content) return Response.json({ error: "Title and content required" }, { status: 400 });
    const slug = slugify(title) + "-" + Date.now();
    const blog = await prisma.blog.create({
      data: {
        title, slug, excerpt: excerpt || title, content, category: category || "General",
        author: author || "Team AnvithBizCap", imageUrl,
        published: !!published,
        publishedAt: published ? new Date() : null,
      },
    });
    bustBlogCaches(blog.slug);
    return Response.json(blog, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { id, title, excerpt, content, category, author, imageUrl, published } = body;
    const blog = await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        title, excerpt, content, category, author, imageUrl,
        published: !!published,
        publishedAt: published ? new Date() : null,
      },
    });
    bustBlogCaches(blog.slug);
    return Response.json(blog);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  const deleted = await prisma.blog.delete({ where: { id: Number(id) } });
  bustBlogCaches(deleted.slug);
  return Response.json({ success: true });
}
