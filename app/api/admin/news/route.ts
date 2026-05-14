import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(news);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { title, excerpt, content, source, sourceUrl, category, imageUrl, published } = body;
    if (!title || !excerpt) return Response.json({ error: "Title and excerpt required" }, { status: 400 });
    const item = await prisma.news.create({
      data: {
        title, excerpt, content, source, sourceUrl,
        category: category || "General", imageUrl,
        published: !!published,
        publishedAt: published ? new Date() : null,
      },
    });
    return Response.json(item, { status: 201 });
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
    const { id, title, excerpt, content, source, sourceUrl, category, imageUrl, published } = body;
    const item = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title, excerpt, content, source, sourceUrl, category, imageUrl,
        published: !!published,
        publishedAt: published ? new Date() : null,
      },
    });
    return Response.json(item);
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
  await prisma.news.delete({ where: { id: Number(id) } });
  return Response.json({ success: true });
}
