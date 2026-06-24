import React from "react";
import { DollarSign, TrendingUp, Users, Crown, CreditCard } from "lucide-react";

// Helper function for relative date
function getRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date("2026-06-24"); // Mock current date for consistency based on mock data
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

const mockPayments = [
  { id: "TXN-9021", email: "bob@techflow.com", plan: "Growth", amount: "$99.00", date: "2026-06-23", status: "Succeeded" },
  { id: "TXN-8742", email: "diana@amazon.com", plan: "Enterprise", amount: "$299.00", date: "2026-06-20", status: "Succeeded" },
  { id: "TXN-7653", email: "evan.w@startup.io", plan: "Pro (Seeker)", amount: "$15.00", date: "2026-06-15", status: "Succeeded" },
  { id: "TXN-6544", email: "spammer@fake.com", plan: "Growth", amount: "$99.00", date: "2026-06-14", status: "Failed" },
  { id: "TXN-5435", email: "charlie.d@gmail.com", plan: "Premium (Seeker)", amount: "$29.00", date: "2026-06-05", status: "Succeeded" },
];

export default function AdminPaymentsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payments & Subscriptions</h1>
        <p className="text-gray-500 mt-2">Monitor platform revenue, active plans, and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign className="text-emerald-600" />} title="Total Revenue" value="$142,500" />
        <StatCard icon={<TrendingUp className="text-blue-600" />} title="Monthly Revenue" value="$18,450" trend="+8%" />
        <StatCard icon={<Users className="text-indigo-600" />} title="Active Seeker Subs" value="1,240" />
        <StatCard icon={<Crown className="text-purple-600" />} title="Active Recruiter Subs" value="485" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">User Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Plan</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Transaction ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{payment.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                      {payment.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{getRelativeDate(payment.date)}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Succeeded' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend?: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          {icon}
        </div>
        {trend && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
