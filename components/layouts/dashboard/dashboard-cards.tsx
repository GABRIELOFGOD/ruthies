"use client";

import { useDashboardContext } from "@/provider/dashboard-provider";
import { ShoppingBagIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

const DashboardCards = () => {
  const { dashboardData } = useDashboardContext();

  const data = [
    {
      title: "Total Products",
      value: dashboardData.products,
      icon: ShoppingBagIcon,
      description: "This is the total number of products in the system.",
      bg: "bg-blue-500/30",
    },
    {
      title: "Total Orders",
      value: dashboardData.orders,
      icon: ShoppingCartIcon,
      description: "This is the total number of orders placed.",
      bg: "bg-green-500/30",
    },
    {
      title: "Total Customers",
      value: dashboardData.customers,
      icon: UserIcon,
      description: "This is the total number of customers registered.",
      bg: "bg-purple-500/30",
    },
  ];

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      {data.map((item) => (
        <div
          key={item.title}
          className={`bg-muted/50 aspect-video rounded-xl p-4 flex flex-col justify-between`}
        >
          <div className="bg-muted/50 aspect-video rounded-xl p-4 flex flex-col justify-between">
            <div className="flex justify-between gap-3">
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-sm font-medium">
                  {item.title}
                </p>
                <p className="text-2xl font-extrabold">{item.value}</p>
              </div>

              <div className={`p-3 rounded-lg ${item.bg} my-auto`}>
                <item.icon />
              </div>
            </div>
            <div>
              <p className="">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
      {/* <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" /> */}
    </div>
  );
};
export default DashboardCards;
