"use client";

import React, { useState, useEffect } from "react";
import { Building2, Search, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { applicationService } from "@/services/applicationService";

function getRelativeDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export default function ApplicationsPage() {
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

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Applications</h1>
        <p className="text-gray-500 mt-2">Track the status of all the jobs you have applied for.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Role / Company</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date Applied</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Resume Used</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [1,2,3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4 flex justify-end"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
                  </tr>
                ))
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No applications yet</h3>
                    <p className="text-gray-500 mb-4">You haven't submitted any job applications.</p>
                    <Link href="/jobs" className="text-indigo-600 font-medium hover:text-indigo-700">Browse Jobs</Link>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id || app.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-400 overflow-hidden">
                          {app.job?.companyLogo ? (
                            <img src={app.job.companyLogo} alt={app.job.companyName} className="w-full h-full object-cover" />
                          ) : (
                            app.job?.companyName?.substring(0, 2).toUpperCase() || <Building2 className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <Link href={`/jobs/${app.job?._id || app.job?.id}`} className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {app.job?.title || 'Unknown Job'}
                          </Link>
                          <div className="text-sm text-gray-500">{app.job?.companyName || 'Unknown Company'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(app.appliedAt || app.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 ml-6">{getRelativeDate(app.appliedAt || app.createdAt || Date.now().toString())}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 flex items-center">
                        <FileText className="w-4 h-4 mr-1.5 text-gray-400" />
                        {app.resumeName || 'Profile Resume'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Offered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                        app.status === 'Shortlisted' || app.status === 'Interview Scheduled' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {app.status || 'Applied'}
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
