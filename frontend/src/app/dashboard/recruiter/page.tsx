"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, CheckCircle2, Users, Search, BellRing, ArrowRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { jobService } from "@/services/jobService";
import { applicationService } from "@/services/applicationService";

export default function RecruiterDashboardPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [recentApplicants, setRecentApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobService.getMyJobs();
        const myJobs = response.jobs || response.data || response || [];
        const jobsArray = Array.isArray(myJobs) ? myJobs : [];
        setJobs(jobsArray);

        // Fetch recent applicants for the first active job as an example
        // (In a real scenario, the backend might have a dedicated endpoint for recent applicants across all jobs)
        if (jobsArray.length > 0) {
           const activeJob = jobsArray.find((j: any) => j.status === 'Active') || jobsArray[0];
           const applicantsResp = await applicationService.getJobApplicants(activeJob._id || activeJob.id);
           const applicantsData = applicantsResp.applications || applicantsResp.data || applicantsResp || [];
           setRecentApplicants(Array.isArray(applicantsData) ? applicantsData.slice(0, 5) : []);
        }
      } catch (error) {
        console.error("Error fetching recruiter dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.status === 'Active').length;
  const closedJobs = jobs.filter(j => j.status === 'Closed').length;
  const totalApplicants = jobs.reduce((sum, job) => sum + (job.applicantCount || job.applicants?.length || 0), 0);

  const chartData = jobs.map(job => ({
    name: job.title.length > 15 ? job.title.substring(0, 15) + '...' : job.title,
    applicants: job.applicantCount || job.applicants?.length || 0
  })).filter(j => j.applicants > 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Recruiter Dashboard</h1>
        <p className="text-gray-500 mt-2">Overview of your job postings and candidate pipeline.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
           {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Briefcase className="text-indigo-600" />} title="Total Job Posts" value={totalJobs.toString()} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} title="Active Jobs" value={activeJobs.toString()} />
          <StatCard icon={<Briefcase className="text-gray-500" />} title="Closed Jobs" value={closedJobs.toString()} />
          <StatCard icon={<Users className="text-blue-600" />} title="Total Applicants" value={totalApplicants.toString()} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Applicants per Job</h2>
          <div className="flex-1 min-h-[300px]">
             {loading ? (
                <div className="w-full h-full flex items-end justify-around pb-6 gap-2">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-12 bg-gray-200 rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 80 + 20}%`}}></div>)}
                </div>
             ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} dy={10} angle={-45} textAnchor="end" />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="applicants" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
             ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <BarChart className="w-8 h-8 mb-2" />
                  <p>No applicant data available</p>
                </div>
             )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
               <BellRing className="w-5 h-5 mr-2 text-amber-500" />
               Recent Applications
            </h2>
            <Link href="/dashboard/recruiter/jobs" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
               Manage Candidates
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
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
             ) : recentApplicants.length === 0 ? (
                <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                  <Users className="w-8 h-8 mb-2 text-gray-300" />
                  <p>No recent applicants found.</p>
                </div>
             ) : (
                recentApplicants.map((app) => (
                  <div key={app._id || app.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-sm">
                        {app.seeker?.name?.substring(0,2).toUpperCase() || 'US'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{app.seeker?.name || 'Applicant'}</div>
                        <div className="text-sm text-gray-500">{app.job?.title || 'Applied for role'}</div>
                      </div>
                    </div>
                    <Link href={`/dashboard/recruiter/jobs/${app.job?._id || app.jobId}/applicants`} className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                       <ArrowRight className="w-5 h-5" />
                    </Link>
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
