import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.knowledgeHubArticle.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("[KNOWLEDGE_LIST_ERROR]", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
