export const dynamic = 'force-dynamic';

import { createHandler } from "@premieroctet/next-admin/appHandler";
import prisma from "@/lib/prisma";

const handler = async (req: Request, context: any) => {
  const { run } = createHandler({
    apiBasePath: "/api/admin",
    prisma,
  });
  return run(req, context);
};

export { handler as GET, handler as POST, handler as DELETE };
