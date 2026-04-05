export const dynamic = 'force-dynamic';

export async function GET(req: Request, context: any) { return handleRequest(req, context); }
export async function POST(req: Request, context: any) { return handleRequest(req, context); }
export async function DELETE(req: Request, context: any) { return handleRequest(req, context); }

async function handleRequest(req: Request, context: any) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return new Response(null, { status: 200 });
  }
  
  const { createHandler } = await import("@premieroctet/next-admin/appHandler");
  const prismaModule = await import("@/lib/prisma");
  const prisma = prismaModule.default || prismaModule.prisma;
  const { options } = await import("@/lib/next-admin-options");

  const { run } = createHandler({
    apiBasePath: "/api/admin",
    prisma,
    options,
  });
  return run(req, context);
}
