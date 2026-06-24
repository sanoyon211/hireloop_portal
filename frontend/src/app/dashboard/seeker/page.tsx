"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Clock, CheckCircle2, XCircle, Search } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { applicationService } from "@/services/applicationService";

export default function SeekerDashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await applicationService.getMyApplications();
        const data = response.applications || response.data || response || [];
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const totalApps = applications.length;
  const interviewingApps = applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length;
  const offeredApps = applications.filter(a => a.status === 'Offered').length;

  const getStatusCount = (status: string) => applications.filter(a => a.status === status).length;

  const chartData = [
    { name: "Applied", value: getStatusCount('Applied'), color: "#3B82F6" },
    { name: "Under Review", value: getStatusCount('Under Review'), color: "#F59E0B" },
    { name: "Shortlisted", value: getStatusCount('Shortlisted'), color: "#8B5CF6" },
    { name: "Offered", value: getStatusCount('Offered'), color: "#10B981" },
    { name: "Rejected", value: getStatusCount('Rejected'), color: "#EF4444" },
  ].filter(item => item.value > 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back!</h1>
        <p className="text-gray-500 mt-2">Here is a summary of your job hunt progress.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Briefcase className="text-blue-600" />} title="Total Applications" value={totalApps.toString()} />
          <StatCard icon={<Clock className="text-purple-600" />} title="Interviews / Shortlisted" value={interviewingApps.toString()} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} title="Offers Received" value={offeredApps.toString()} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Status Distribution</h2>
          <div className="h-72 w-full">
            {loading ? (
               <div className="w-full h-full bg-gray-100 rounded-full animate-pulse max-w-xs mx-auto"></div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Search className="w-8 h-8 mb-2" />
                <p>No applications to display</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="p-6 flex items-center space-x-4 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : applications.length === 0 ? (
               <div className="p-12 text-center text-gray-500">
                 You haven't applied to any jobs yet.
               </div>
            ) : (
              applications.slice(0, 4).map((app) => (
                <div key={app._id || app.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 overflow-hidden">
                      {app.job?.companyLogo ? (
                        <img src={app.job.companyLogo} alt={app.job.companyName} className="w-full h-full object-cover" />
                      ) : (
                        app.job?.companyName?.substring(0,2).toUpperCase() || <Briefcase className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{app.job?.title || 'Unknown Job'}</div>
                      <div className="text-sm text-gray-500">{app.job?.companyName || 'Unknown Company'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      app.status === 'Offered' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {app.status || 'Applied'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
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
