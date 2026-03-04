import { StatsCard } from "@/components/molecules/StatsCard";
import { RevenueChart } from "@/components/organisms/RevenueChart";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-foreground/60 text-sm mt-1">
          Welcome back, here is your system overview.
        </p>
      </div>

      {/* Grid Stats Cards */}
      {/* 1 Kolom di Mobile, 2 di Tablet, 4 di Desktop */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value="$45,231.89"
          trend={20.1}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatsCard
          title="Active Users"
          value="+2,350"
          trend={10.5}
          icon={<Users className="w-5 h-5" />}
        />
        <StatsCard
          title="Sales"
          value="+12,234"
          trend={-4.2}
          icon={<CreditCard className="w-5 h-5" />}
        />
        <StatsCard
          title="Active Now"
          value="573"
          trend={8.2}
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Grid Area Bawah (Chart & List) */}
      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
        {/* Chart mengambil 2 kolom di desktop */}
        <div className="desktop:col-span-2">
          <RevenueChart />
        </div>

        {/* Dummy List mengambil 1 kolom di desktop */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-6 desktop:col-span-1 flex flex-col h-[350px]">
          <h3 className="font-semibold text-foreground mb-4">Recent Sales</h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {/* Dummy Data Mapping (Nanti datanya dari API/PostgreSQL) */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    U{item}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      User {item}
                    </span>
                    <span className="text-xs text-foreground/50">
                      user{item}@example.com
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  +$299.00
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
