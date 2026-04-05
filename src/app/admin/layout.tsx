export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // ---------------------------------------------------------------------------------
  // IMPORTANT: 
  // Once your NextAuth configuration is fully wired up, uncomment the lines below
  // to properly protect this route so only ADMIN and SUPER_ADMIN users can access it.
  // ---------------------------------------------------------------------------------
  
  /*
  import { getServerSession } from "next-auth";
  import { redirect } from "next/navigation";
  import { authOptions } from "@/lib/auth"; // or wherever your auth options live
  
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/");
  }
  */

  return <>{children}</>;
}
