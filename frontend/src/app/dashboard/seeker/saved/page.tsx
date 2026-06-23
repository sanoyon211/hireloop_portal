"use client";

import { Trash2, ExternalLink, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function SavedJobsPage() {
  const savedJobs = [
    { id: '1', title: 'Senior React Developer', company: 'TechFlow', location: 'Remote', salary: '$120k - $150k', savedAt: 'Oct 24, 2026' },
    { id: '2', title: 'Product Designer', company: 'CreativeWeb', location: 'New York, NY', salary: '$100k - $130k', savedAt: 'Oct 23, 2026' },
    { id: '3', title: 'Backend Engineer (Node.js)', company: 'DataCorp', location: 'Austin, TX', salary: '$110k - $140k', savedAt: 'Oct 20, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Saved Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">Review and apply to jobs you've bookmarked.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {savedJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company & Details</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Saved</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600 mb-1">{job.company}</div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{job.location}</span>
                        <span className="flex items-center"><DollarSign className="w-3 h-3 mr-0.5 text-green-600" />{job.salary}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                      {job.savedAt}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors" title="Remove">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <Link href={`/jobs/${job.id}`} className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-colors">
                          Apply Now
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            You haven't saved any jobs yet.
          </div>
        )}
      </div>
    </div>
  );
}
