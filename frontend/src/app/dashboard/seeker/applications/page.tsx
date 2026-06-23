"use client";

import { ExternalLink, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function MyApplicationsPage() {
  const applications = [
    { id: '1', jobId: '101', title: 'Senior Software Engineer', company: 'Stripe', appliedAt: '2 days ago', status: 'Applied' },
    { id: '2', jobId: '102', title: 'Frontend Developer', company: 'Vercel', appliedAt: '1 week ago', status: 'Under Review' },
    { id: '3', jobId: '103', title: 'UX Designer', company: 'Airbnb', appliedAt: '2 weeks ago', status: 'Shortlisted' },
    { id: '4', jobId: '104', title: 'Data Analyst', company: 'Notion', appliedAt: '3 weeks ago', status: 'Rejected' },
    { id: '5', jobId: '105', title: 'Product Manager', company: 'Linear', appliedAt: '1 month ago', status: 'Offered' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" /> Applied</span>;
      case 'Under Review':
      case 'Shortlisted':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"><FileText className="w-3 h-3 mr-1" /> {status}</span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> Rejected</span>;
      case 'Offered':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Offered</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Track the status of your job applications.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role & Company</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Applied</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{app.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{app.company}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                    {app.appliedAt}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {getStatusBadge(app.status)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/jobs/${app.jobId}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-medium">
                      View Job <ExternalLink className="ml-1.5 w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
