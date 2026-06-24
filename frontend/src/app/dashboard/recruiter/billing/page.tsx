import React from "react";
import Link from "next/link";
import { Zap, Receipt } from "lucide-react";

export default function BillingPage() {
  const currentPlan = "Growth";
  const usedPosts = 7;
  const totalPosts = 10;
  const progressPercentage = (usedPosts / totalPosts) * 100;

  const paymentHistory = [
    { id: "TXN-9821", date: "2026-06-01", plan: "Growth Plan (Monthly)", amount: "$99.00" },
    { id: "TXN-8742", date: "2026-05-01", plan: "Growth Plan (Monthly)", amount: "$99.00" },
    { id: "TXN-7653", date: "2026-04-01", plan: "Free Tier", amount: "$0.00" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Billing & Subscription</h1>
        <p className="text-gray-500 mt-2">Manage your current plan, usage limits, and billing history.</p>
      </div>

      {/* Plan Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 rounded-full bg-indigo-50 opacity-50 blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentPlan} Plan
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            
            <p className="text-gray-600 max-w-md">
              You are currently on the Growth plan. This gives you access to advanced applicant tracking and up to 10 active job postings.
            </p>

            <div className="mt-6 pt-4 border-t border-gray-50">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-700">Active Job Posts</span>
                <span className="text-indigo-600">{usedPosts} / {totalPosts} used</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3 min-w-[200px]">
            <Link 
              href="/pricing"
              className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-100 shadow-sm"
            >
              Upgrade Plan
            </Link>
            <Link 
              href="/pricing"
              className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:ring-4 focus:ring-gray-100 shadow-sm"
            >
              Downgrade
            </Link>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Plan</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Transaction ID</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paymentHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.plan}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{item.id}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
                      Download PDF
                    </button>
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
