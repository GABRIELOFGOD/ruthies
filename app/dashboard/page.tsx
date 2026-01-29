
import DashboardCards from "@/components/layouts/dashboard/dashboard-cards";

export default function Page() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardCards />
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
