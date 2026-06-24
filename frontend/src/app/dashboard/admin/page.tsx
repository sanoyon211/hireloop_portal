"use client";

import React from "react";
import { Users, UserPlus, Building, Briefcase, DollarSign, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const categoryData = [
  { name: "Engineering", jobs: 120 },
  { name: "Design", jobs: 45 },
  { name: "Product", jobs: 30 },
  { name: "Marketing", jobs: 25 },
  { name: "Sales", jobs: 40 },
];

const registrationData = [
  { day: "1", users: 12 }, { day: "5", users: 19 }, { day: "10", users: 15 },
  { day: "15", users: 25 }, { day: "20", users: 22 }, { day: "25", users: 30 },
  { day: "30", users: 45 },
];

const recentPayments = [
  { id: "PAY-1001", company: "TechFlow Inc.", amount: "$99.00", date: "2 mins ago", plan: "Growth Plan" },
  { id: "PAY-1002", company: "DataCorp", amount: "$299.00", date: "15 mins ago", plan: "Enterprise Plan" },
  { id: "PAY-1003", company: "InnovateSpace", amount: "$99.00", date: "1 hour ago", plan: "Growth Plan" },
  { id: "PAY-1004", company: "CreativeWeb", amount: "$99.00", date: "3 hours ago", plan: "Growth Plan" },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Command Center</h1>
        <p className="text-gray-500 mt-2">Overview of platform metrics, user growth, and revenue.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard icon={<Users className="text-blue-600" />} title="Total Users" value="12,450" />
        <StatCard icon={<UserPlus className="text-indigo-600" />} title="Total Recruiters" value="842" />
        <StatCard icon={<Building className="text-purple-600" />} title="Total Companies" value="610" />
        <StatCard icon={<Briefcase className="text-pink-600" />} title="Total Jobs Posted" value="4,215" />
        <StatCard icon={<DollarSign className="text-emerald-600" />} title="Platform Revenue" value="$42,500" trend="+12%" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-500" />
            Job Posts by Category
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="jobs" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500" />
            New Registrations (30 Days)
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Subscription Payments</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentPayments.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{payment.company}</div>
                  <div className="text-sm text-gray-500">{payment.plan} • {payment.id}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{payment.amount}</div>
                <div className="text-xs text-gray-500">{payment.date}</div>
              </div>
            </div>
          ))}
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
