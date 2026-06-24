"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Trash2, Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import { jobService } from "@/services/jobService";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

export default function AdminManageJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchJobs = async () => {
    try {
      const response = await jobService.getJobs();
      const fetched = response.jobs || response.data || response || [];
      setJobs(Array.isArray(fetched) ? fetched : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this job post?")) return;
    
    try {
      await adminService.deleteJob(jobId);
      setJobs(jobs.filter(j => (j._id || j.id) !== jobId));
      toast.success("Job successfully deleted");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || job.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Jobs</h1>
          <p className="text-gray-500 mt-2">Monitor and manage all job postings on HireLoop.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer appearance-none"
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
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Job Title / Company</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date Posted</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [1,2,3,4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                       <div className="h-5 bg-gray-200 rounded w-48 mb-1"></div>
                       <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                    <td className="px-6 py-4 flex justify-end gap-2"><div className="h-8 bg-gray-200 rounded w-16"></div></td>
                  </tr>
                ))
              ) : filteredJobs.length === 0 ? (
                <tr>
                   <td colSpan={5} className="p-16 text-center text-gray-500">
                     <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                     No jobs found.
                   </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job._id || job.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-indigo-600 mt-0.5">{job.companyName || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.category || 'Uncategorized'}
                      <div className="text-xs text-gray-400 mt-1">{job.jobType || 'Full-time'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.createdAt 
                         ? `${format(new Date(job.createdAt), 'MMM d, yyyy')}`
                         : 'Unknown Date'}
                      <div className="text-xs text-gray-400 mt-1">
                         {job.createdAt ? `${formatDistanceToNow(new Date(job.createdAt))} ago` : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {job.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                       <Link 
                         href={`/jobs/${job._id || job.id}`}
                         target="_blank"
                         className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50"
                       >
                         <ExternalLink className="w-4 h-4 mr-1.5" /> View
                       </Link>
                       <button 
                         onClick={() => handleDelete(job._id || job.id)}
                         className="inline-flex items-center text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors border border-red-100"
                       >
                         <Trash2 className="w-4 h-4 mr-1.5" /> Remove
                       </button>
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
