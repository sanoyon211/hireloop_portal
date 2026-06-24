"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Users, Eye, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { jobService } from "@/services/jobService";

export default function ManageJobsPage() {
  const { mongoUser } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getMyJobs();
        const data = response.jobs || response.data || response || [];
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching recruiter jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const activeJobsCount = jobs.filter(j => j.status === 'Active').length;
  const planLimit = mongoUser?.currentPlan === 'Enterprise' ? 50 : mongoUser?.currentPlan === 'Growth' ? 10 : 3;
  const progressPercentage = Math.min((activeJobsCount / planLimit) * 100, 100);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Jobs</h1>
          <p className="text-gray-500 mt-2">Create, edit, and monitor your job postings.</p>
        </div>
        <Link 
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm focus:ring-4 focus:ring-indigo-100"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post New Job
        </Link>
      </div>

      {/* Dynamic Plan Indicator */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 flex items-center justify-between">
        <div>
           <h3 className="text-indigo-900 font-semibold flex items-center">
             <Zap className="w-4 h-4 mr-1.5 text-indigo-500" />
             Plan Usage ({mongoUser?.currentPlan || 'Free'})
           </h3>
           <p className="text-sm text-indigo-700 mt-1">You have used {activeJobsCount} of {planLimit} active job posts.</p>
        </div>
        <div className="w-1/3">
           <div className="w-full bg-indigo-200/50 rounded-full h-2.5">
             <div 
               className={`h-2.5 rounded-full transition-all duration-500 ${progressPercentage > 80 ? 'bg-red-500' : 'bg-indigo-600'}`} 
               style={{ width: `${progressPercentage}%` }}
             ></div>
           </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            placeholder="Search your jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer transition-colors appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Job Title</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Applicants</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [1,2,3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                    <td className="px-6 py-4 flex justify-end gap-2"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : filteredJobs.length === 0 ? (
                <tr>
                   <td colSpan={5} className="p-16 text-center text-gray-500">
                     No jobs found. Click "Post New Job" to create your first listing.
                   </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id || job._id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{job.jobType || 'Full-time'} • {job.location || 'Remote'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.category || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {job.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/dashboard/recruiter/jobs/${job.id || job._id}/applicants`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors border border-blue-100"
                      >
                        <Users className="w-4 h-4 mr-1.5" />
                        {job.applicantCount || job.applicants?.length || 0}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                       <button className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
                        <Edit className="w-4 h-4 mr-1.5" />
                        Edit
                      </button>
                      <Link 
                        href={`/dashboard/recruiter/jobs/${job.id || job._id}/applicants`}
                        className="inline-flex items-center text-xs font-medium text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors border border-indigo-100"
                      >
                        Manage
                      </Link>
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
