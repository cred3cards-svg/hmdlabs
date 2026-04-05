export const dynamic = 'force-dynamic';

import { createHandler } from "@premieroctet/next-admin/appHandler";
import prisma from "@/lib/prisma";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
});

export { run as GET, run as POST, run as DELETE };
