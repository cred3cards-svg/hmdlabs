import { Users, FileText, Package, CreditCard, Activity, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CustomDashboard() {
  const [
    totalUsers,
    totalTests,
    totalPackages,
    totalOrders,
    recentOrders
  ] = await Promise.all([
    prisma.user.count({ where: { role: "PATIENT" } }),
    prisma.test.count(),
    prisma.package.count(),
    prisma.order.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })
  ]);

  const stats = [
    { name: "Total Patients", value: totalUsers, icon: Users, color: "bg-blue-500", href: "/admin/User" },
    { name: "Tests in Catalog", value: totalTests, icon: Activity, color: "bg-brand-500", href: "/admin/Test" },
    { name: "Active Packages", value: totalPackages, icon: Package, color: "bg-amber-500", href: "/admin/Package" },
    { name: "Total Orders", value: totalOrders, icon: CreditCard, color: "bg-emerald-500", href: "/admin/Order" }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-display">Welcome to HMD Labs OS</h1>
        <p className="text-gray-500 mt-1">Here is a top-down view of your laboratory operations today.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.name} className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-2xl font-bold text-gray-900 font-display">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
          <Link href="/admin/Order" className="text-sm font-medium text-brand-600 hover:text-brand-500 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.user.name || order.user.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${order.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">No orders placed yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
