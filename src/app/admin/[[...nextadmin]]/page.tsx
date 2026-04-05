export const dynamic = 'force-dynamic';

import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import "@premieroctet/next-admin/theme";

import CustomDashboard from "@/components/admin/CustomDashboard";

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: { nextadmin?: string[] };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const { getNextAdminProps } = await import("@premieroctet/next-admin/appRouter");
  const prismaModule = await import("@/lib/prisma");
  const prisma = prismaModule.default || prismaModule.prisma;
  const { options } = await import("@/lib/next-admin-options");

  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    options,
  });

  return (
    <div className="min-h-screen">
      <NextAdmin {...props} dashboard={<CustomDashboard />} />
    </div>
  );
}
