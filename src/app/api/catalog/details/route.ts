import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }

  try {
    if (type === "test") {
      const test = await prisma.test.findUnique({
        where: { slug: slug },
        include: { category: true }
      });
      if (!test) return NextResponse.json({ message: "Test not found" }, { status: 404 });
      return NextResponse.json(test);
    } else {
      const pkg = await prisma.package.findUnique({
        where: { slug: slug },
        include: { tests: { include: { test: true } } }
      });
      if (!pkg) return NextResponse.json({ message: "Package not found" }, { status: 404 });
      return NextResponse.json(pkg);
    }
  } catch (error) {
    return NextResponse.json({ message: "Error fetching details" }, { status: 500 });
  }
}
