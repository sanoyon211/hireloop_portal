"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Frontend Dev", applicants: 45 },
  { name: "Backend Eng", applicants: 32 },
  { name: "UI/UX Designer", applicants: 28 },
  { name: "Product Mgr", applicants: 15 },
  { name: "QA Tester", applicants: 10 },
];

const recentApplications = [
  { id: 1, name: "Alice Smith", role: "Frontend Developer", date: "2 hours ago", status: "Under Review" },
  { id: 2, name: "Bob Johnson", role: "Backend Engineer", date: "4 hours ago", status: "New" },
  { id: 3, name: "Charlie Davis", role: "UI/UX Designer", date: "1 day ago", status: "Interviewed" },
  { id: 4, name: "Diana Prince", role: "Product Manager", date: "2 days ago", status: "Rejected" },
];

export default function RecruiterDashboardHome() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Recruiter Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">Overview of your jobs, applicants, and company profile.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Job Posts", value: "12", color: "bg-indigo-50 text-indigo-700" },
          { label: "Total Applicants", value: "130", color: "bg-blue-50 text-blue-700" },
          { label: "Active Jobs", value: "4", color: "bg-green-50 text-green-700" },
          { label: "Jobs Closed", value: "8", color: "bg-gray-50 text-gray-700" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <dt className="truncate text-sm font-medium text-gray-500">{stat.label}</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
            <div className={`mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${stat.color}`}>
              Updated today
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Company Profile Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold mb-4 shadow-inner">
            TC
          </div>
          <h2 className="text-xl font-bold text-gray-900">TechCorp Solutions</h2>
          <p className="text-sm text-gray-500 mt-1">Information Technology</p>
          <div className="mt-6 w-full pt-6 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Status</span>
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Approved
              </span>
            </div>
            <div className="flex justify-between text-sm mb-6">
              <span className="text-gray-500">Location</span>
              <span className="font-medium text-gray-900">San Francisco, CA</span>
            </div>
            <Link 
              href="/dashboard/recruiter/company" 
              className="w-full inline-flex justify-center rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit Company Profile
            </Link>
          </div>
        </div>

        {/* Right: Recharts Bar Chart */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 lg:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Applicant Trends (Last 30 Days)</h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="applicants" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom: Recent Applications */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          <Link href="/dashboard/recruiter/applications" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-gray-100">
          {recentApplications.map((app) => (
            <li key={app.id} className="px-6 py-5 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {app.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{app.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Applied for <span className="font-medium text-gray-700">{app.role}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="hidden sm:inline-block text-sm text-gray-500">{app.date}</span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                  app.status === 'New' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                  app.status === 'Under Review' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                  app.status === 'Interviewed' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                  'bg-gray-50 text-gray-600 ring-gray-500/10'
                }`}>
                  {app.status}
                </span>
                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium ml-2">
                  Review
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
