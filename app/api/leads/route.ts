import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mobile, email, city, interestedIn, investmentRange, message, source } = body;

    if (!name || !mobile) {
      return Response.json({ error: "Name and mobile are required" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { name, mobile, email: email || "", city, interestedIn, investmentRange, message, source: source || "website" },
    });

    return Response.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("Lead error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
