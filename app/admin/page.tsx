import { DollarSign, ShoppingBag, Users, Activity } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import AnalyticsChart from '@/components/admin/AnalyticsChart';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Platform Overview</h2>
        <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="₹45,231.89"
          icon={DollarSign}
          trend="+20.1%"
          trendUp={true}
        />
        <StatsCard
          title="Active Orders"
          value="+573"
          icon={ShoppingBag}
          trend="+201"
          trendUp={true}
        />
        <StatsCard
          title="New Users"
          value="2,345"
          icon={Users}
          trend="+180.1%"
          trendUp={true}
        />
        <StatsCard
          title="Activity"
          value="+573"
          icon={Activity}
          trend="+201"
          trendUp={true}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#111] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-white">Revenue Analytics</h3>
          <AnalyticsChart />
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-white">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                   <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                     <Users className="h-5 w-5 text-gray-400" />
                   </div>
                   <div>
                     <p className="text-sm font-medium text-white">New user registered</p>
                     <p className="text-xs text-gray-500">2 minutes ago</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
