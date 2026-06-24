"use client";

import React, { useState } from "react";
import { Search, Filter, Trash2, Eye, Briefcase } from "lucide-react";
import Link from "next/link";

const initialJobs = [
  { id: "J-101", title: "Senior Software Engineer", company: "TechFlow Inc.", category: "Engineering", type: "Full-time", datePosted: "2026-06-15", status: "Active" },
  { id: "J-102", title: "Product Manager", company: "InnovateSpace", category: "Product", type: "Full-time", datePosted: "2026-06-20", status: "Active" },
  { id: "J-103", title: "Frontend Developer", company: "CreativeWeb", category: "Engineering", type: "Contract", datePosted: "2026-05-10", status: "Closed" },
  { id: "J-104", title: "Data Scientist", company: "DataCorp", category: "Data", type: "Full-time", datePosted: "2026-06-22", status: "Active" },
  { id: "J-105", title: "Marketing Director", company: "GrowthX", category: "Marketing", type: "Full-time", datePosted: "2026-06-01", status: "Closed" },
];

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || job.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const removeJob = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this job post?")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Jobs</h1>
        <p className="text-gray-500 mt-2">Oversee all active and closed job postings across the platform.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            placeholder="Search titles or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
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

          <div className="relative w-full sm:w-48">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer transition-colors appearance-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Data">Data</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[950px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Job Details</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category & Type</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date Posted</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{job.category}</div>
                    <div className="text-xs text-gray-500 mt-1">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(job.datePosted).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="inline-flex items-center text-xs font-medium text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors border border-indigo-100"
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View
                    </Link>
                    <button
                      onClick={() => removeJob(job.id)}
                      className="inline-flex items-center text-xs font-medium text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors border border-red-100"
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredJobs.length === 0 && (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
