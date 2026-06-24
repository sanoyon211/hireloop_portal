"use client";

import React, { useState, useEffect } from "react";
import { Users, Building, Briefcase, CreditCard, BellRing, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import Link from "next/link";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecruiters: 0,
    totalCompanies: 0,
    totalJobs: 0,
    platformRevenue: 0,
    jobCategories: [],
    newUsers: [],
    recentPayments: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        // Assuming response structure contains these fields directly or in a `data` object
        const data = response.data || response;
        
        setStats({
          totalUsers: data.totalUsers || 0,
          totalRecruiters: data.totalRecruiters || 0,
          totalCompanies: data.totalCompanies || 0,
          totalJobs: data.totalJobs || 0,
          platformRevenue: data.platformRevenue || 0,
          jobCategories: data.jobCategories || [],
          newUsers: data.newUsers || [],
          recentPayments: data.recentPayments || []
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        toast.error("Failed to load dashboard statistics. Backend might be unreachable.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Command Center</h1>
        <p className="text-gray-500 mt-2">Platform-wide analytics and quick actions.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 animate-pulse">
           {[1,2,3,4,5].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <StatCard icon={<Users className="text-blue-600" />} title="Total Users" value={stats.totalUsers.toLocaleString()} />
          <StatCard icon={<Briefcase className="text-indigo-600" />} title="Recruiters" value={stats.totalRecruiters.toLocaleString()} />
          <StatCard icon={<Building className="text-emerald-600" />} title="Companies" value={stats.totalCompanies.toLocaleString()} />
          <StatCard icon={<Briefcase className="text-purple-600" />} title="Total Jobs" value={stats.totalJobs.toLocaleString()} />
          <StatCard icon={<CreditCard className="text-amber-600" />} title="Revenue" value={`$${stats.platformRevenue.toLocaleString()}`} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Job Posts per Category</h2>
          <div className="flex-1 min-h-[300px]">
            {loading ? (
               <div className="w-full h-full flex items-end justify-around pb-6 gap-2">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-12 bg-gray-200 rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 80 + 20}%`}}></div>)}
               </div>
            ) : stats.jobCategories.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.jobCategories} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <RechartsTooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <BarChart className="w-8 h-8 mb-2" />
                <p>No category data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">New Users (30 Days)</h2>
          <div className="flex-1 min-h-[300px]">
            {loading ? (
               <div className="w-full h-full bg-gray-50 rounded-xl animate-pulse"></div>
            ) : stats.newUsers.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.newUsers} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <LineChart className="w-8 h-8 mb-2" />
                <p>No user data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
             <CreditCard className="w-5 h-5 mr-2 text-indigo-500" />
             Recent Payments
          </h2>
          <Link href="/dashboard/admin/payments" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
             View All &rarr;
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
           {loading ? (
              [1,2,3].map(i => (
                <div key={i} className="p-6 flex items-center justify-between animate-pulse">
                   <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                         <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                         <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                      </div>
                   </div>
                </div>
              ))
           ) : stats.recentPayments.length === 0 ? (
              <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                <CreditCard className="w-8 h-8 mb-2 text-gray-300" />
                <p>No recent payments found.</p>
              </div>
           ) : (
              stats.recentPayments.map((payment: any) => (
                <div key={payment._id || payment.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">${payment.amount} - {payment.planName || 'Plan'}</div>
                      <div className="text-sm text-gray-500">{payment.userEmail || payment.userId || 'Unknown User'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                     <div className="text-sm font-medium text-gray-900">
                        {payment.createdAt 
                           ? `${format(new Date(payment.createdAt), 'MMM d, yyyy')} · ${formatDistanceToNow(new Date(payment.createdAt))} ago`
                           : 'Unknown Date'}
                     </div>
                     <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium ${
                      payment.status === 'Success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {payment.status || 'Success'}
                    </span>
                  </div>
                </div>
              ))
           )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2.5 bg-gray-50 rounded-xl">
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
      <div>
        <p className="text-3xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
