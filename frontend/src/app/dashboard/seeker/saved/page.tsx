"use client";

import React, { useState, useEffect } from "react";
import { Building2, Heart, MapPin, Briefcase, Search } from "lucide-react";
import Link from "next/link";
import { jobService } from "@/services/jobService";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await jobService.getSavedJobs();
        const data = response.jobs || response.data || response || [];
        setSavedJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Saved Jobs</h1>
        <p className="text-gray-500 mt-2">Opportunities you have bookmarked to review later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => (
             <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
               <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
               <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
               <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
             </div>
          ))
        ) : savedJobs.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No saved jobs</h3>
            <p className="text-gray-500 mt-2">You haven't bookmarked any jobs yet.</p>
            <Link href="/jobs" className="mt-6 inline-block text-indigo-600 font-medium hover:text-indigo-700">Explore Jobs</Link>
          </div>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id || job._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-xl font-bold text-gray-400 border border-gray-100 overflow-hidden">
                    {job.companyLogo ? (
                        <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
                    ) : (
                        job.companyName?.substring(0, 2).toUpperCase() || 'CO'
                    )}
                  </div>
                  <button className="relative z-10 p-1.5 text-red-500 hover:bg-gray-50 rounded-full transition-colors">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                
                <Link href={`/jobs/${job.id || job._id}`}>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {job.title}
                  </h2>
                </Link>
                <p className="text-sm text-indigo-600 font-medium mt-1">{job.companyName}</p>
                
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500">
                  <span className="flex items-center bg-gray-50 px-2 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" /> {job.location || 'Remote'}
                  </span>
                  <span className="flex items-center bg-gray-50 px-2 py-1 rounded">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-gray-400" /> {job.jobType || 'Full-time'}
                  </span>
                </div>
              </div>
              <Link href={`/jobs/${job.id || job._id}`} className="mt-6 block w-full text-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Apply Now
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
