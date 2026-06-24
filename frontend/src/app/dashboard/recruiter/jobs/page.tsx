"use client";

import Link from "next/link";

const jobs = [
  { id: 1, title: "Senior Frontend Developer", status: "Active", applicants: 45, date: "2026-06-20" },
  { id: 2, title: "Backend Systems Engineer", status: "Active", applicants: 32, date: "2026-06-18" },
  { id: 3, title: "Product Designer", status: "Closed", applicants: 120, date: "2026-05-10" },
  { id: 4, title: "Marketing Manager", status: "Draft", applicants: 0, date: "2026-06-24" },
];

export default function ManageJobsPage() {
  const activeJobs = 7;
  const maxJobs = 10;
  const progressPercent = (activeJobs / maxJobs) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Plan Indicator */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Jobs</h1>
          <p className="mt-2 text-sm text-gray-500">View and manage your job listings and applicants.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Plan Usage Indicator */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full sm:w-64">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Active Jobs</span>
              <span className="text-sm font-medium text-gray-500">{activeJobs} / {maxJobs} used</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <Link 
            href="/dashboard/recruiter/jobs/new"
            className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors whitespace-nowrap"
          >
            <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Post New Job
          </Link>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicants</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Posted</th>
                <th scope="col" className="py-4 pl-3 pr-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      job.status === 'Active' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                      job.status === 'Draft' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                      'bg-gray-50 text-gray-600 ring-gray-500/10'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{job.applicants}</span>
                      <span className="text-gray-400">total</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {job.date}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-indigo-600 hover:text-indigo-900 transition-colors">Edit</button>
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">Applicants</button>
                      {job.status === 'Active' ? (
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">Close</button>
                      ) : job.status === 'Closed' ? (
                        <button className="text-green-600 hover:text-green-900 transition-colors">Reopen</button>
                      ) : null}
                      <button className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No jobs posted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
