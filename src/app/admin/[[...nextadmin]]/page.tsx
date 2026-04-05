import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import prisma from "@/lib/prisma";
import "@premieroctet/next-admin/theme";

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: { nextadmin?: string[] };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const props = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    options: {
      title: "HMD Labs Admin",
    },
  });

  return (
    <div className="min-h-screen">
      <NextAdmin {...props} />
    </div>
  );
}
