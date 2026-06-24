"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, TrendingUp, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await adminService.getAllPayments();
        const data = response.payments || response.data || response || [];
        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast.error("Failed to load payments history");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const totalRevenue = payments.filter(p => p.status === 'Success').reduce((sum, p) => sum + (p.amount || 0), 0);
  const activeSubs = payments.filter(p => p.status === 'Success').length; // Simplification for dashboard purposes
  
  // Calculate this month's revenue
  const thisMonth = new Date().getMonth();
  const monthlyRevenue = payments.filter(p => p.status === 'Success' && new Date(p.createdAt || Date.now()).getMonth() === thisMonth)
                                 .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payments & Subscriptions</h1>
        <p className="text-gray-500 mt-2">Monitor platform revenue and recent transactions.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
           {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={<CreditCard className="text-indigo-600" />} 
            title="Total Revenue" 
            value={`$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
          />
          <StatCard 
            icon={<TrendingUp className="text-emerald-600" />} 
            title="Revenue This Month" 
            value={`$${monthlyRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
          />
          <StatCard 
            icon={<CheckCircle2 className="text-blue-600" />} 
            title="Active Subscriptions" 
            value={activeSubs.toString()} 
          />
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
           <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Transaction ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">User / Plan</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [1,2,3,4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4">
                       <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                       <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4 flex justify-end"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                  </tr>
                ))
              ) : payments.length === 0 ? (
                <tr>
                   <td colSpan={5} className="p-16 text-center text-gray-500">
                     <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                     No transactions found.
                   </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment._id || payment.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                      {payment.transactionId || payment.id || `txn_${Math.random().toString(36).substr(2, 9)}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{payment.userEmail || payment.userId || 'User Account'}</div>
                      <div className="text-sm text-indigo-600">{payment.planName || 'Subscription'}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ${(payment.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {payment.createdAt 
                          ? `${format(new Date(payment.createdAt), 'MMM d, yyyy')} · ${formatDistanceToNow(new Date(payment.createdAt))} ago`
                          : 'Unknown Date'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        payment.status === 'Failed' ? 'bg-red-50 text-red-700 border border-red-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {payment.status || 'Success'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className="p-3 bg-gray-50 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
