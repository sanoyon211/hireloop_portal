"use client";

import { useAuth } from '@/context/AuthContext';
import { Bookmark, FileText, Calendar, Award, Bell, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Link from 'next/link';

export default function SeekerDashboard() {
  const { mongoUser } = useAuth();

  // Mock Data for the Dashboard
  const stats = [
    { name: 'Saved Jobs', value: 12, icon: Bookmark, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Applications', value: 24, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Interviews', value: 3, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Offers', value: 1, icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const applicationData = [
    { name: 'Applied', value: 15, color: '#3b82f6' }, // blue-500
    { name: 'Under Review', value: 5, color: '#eab308' }, // yellow-500
    { name: 'Shortlisted', value: 3, color: '#f97316' }, // orange-500
    { name: 'Rejected', value: 1, color: '#ef4444' }, // red-500
    { name: 'Offered', value: 1, color: '#10b981' }, // emerald-500
  ];

  const recentActivity = [
    { id: 1, text: 'Your application for "Frontend Developer" at Stripe was viewed.', time: '2 hours ago', type: 'view' },
    { id: 2, text: 'New job alert: "React Engineer" in San Francisco.', time: '5 hours ago', type: 'alert' },
    { id: 3, text: 'You were shortlisted for "UX Designer" at Airbnb!', time: '1 day ago', type: 'success' },
    { id: 4, text: 'Saved a new job: "Full Stack Developer" at Vercel.', time: '2 days ago', type: 'action' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center mb-4">
            {mongoUser?.avatar ? (
              <img src={mongoUser.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-indigo-600">{mongoUser?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{mongoUser?.name || 'Loading...'}</h2>
          <p className="text-gray-500 text-sm mt-1">{mongoUser?.email}</p>
          <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {mongoUser?.role}
          </span>
          <Link href="/dashboard/seeker/settings" className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Edit Profile
          </Link>
        </div>

        {/* Application Status Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Application Pipeline</h2>
          <div className="flex-grow w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {applicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View all</button>
        </div>
        <div className="space-y-6">
          {recentActivity.map((activity, index) => (
            <div key={activity.id} className={`flex gap-4 ${index !== recentActivity.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bell className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
