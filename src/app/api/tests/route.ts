import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  // TODO: Query Prisma:
  // const tests = await prisma.test.findMany({
  //   where: {
  //     isActive: true,
  //     ...(query ? {
  //       OR: [
  //         { name: { contains: query, mode: "insensitive" } },
  //         { code: { contains: query, mode: "insensitive" } },
  //         { tags: { has: query } },
  //       ]
  //     } : {}),
  //     ...(category ? { category: { slug: category } } : {}),
  //   },
  //   include: { category: true },
  //   orderBy: [{ isPopular: "desc" }, { name: "asc" }],
  //   skip: (page - 1) * limit,
  //   take: limit,
  // });

  // Demo data
  return NextResponse.json({
    tests: [],
    total: 0,
    page,
    limit,
    query,
    category,
  });
}
