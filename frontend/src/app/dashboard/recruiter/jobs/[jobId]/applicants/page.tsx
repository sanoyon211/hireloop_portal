"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, UserCircle, BellRing } from "lucide-react";
import { useParams } from "next/navigation";
import { applicationService } from "@/services/applicationService";

const statuses = ["Applied", "Under Review", "Shortlisted", "Interview Scheduled", "Rejected", "Offered"];

export default function JobApplicantsPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await applicationService.getJobApplicants(jobId);
        const data = response.applications || response.data || response || [];
        setApplicants(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    // Optimistic UI update
    setApplicants(applicants.map(app => (app._id || app.id) === appId ? { ...app, status: newStatus } : app));
    const applicantName = applicants.find(app => (app._id || app.id) === appId)?.seeker?.name || 'Applicant';
    
    try {
      await applicationService.updateApplicationStatus(appId, newStatus);
      
      // Show success toast
      setToastMessage(`Status for ${applicantName} updated to "${newStatus}". They will be notified via email.`);
      setTimeout(() => setToastMessage(null), 4000);
    } catch (error) {
      console.error("Error updating status:", error);
      setToastMessage("Failed to update status. Please try again.");
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-indigo-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-opacity duration-300 z-50 animate-in fade-in slide-in-from-top-4">
          <BellRing className="w-5 h-5 text-indigo-200" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="flex items-center space-x-4 mb-8">
        <Link 
          href="/dashboard/recruiter/jobs" 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Applicants</h1>
          <p className="text-gray-500 mt-1">Reviewing candidates for job posting</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Applicant</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date Applied</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Resume/CV</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [1,2,3,4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded-md w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded-lg w-full max-w-[200px]"></div></td>
                  </tr>
                ))
              ) : applicants.length === 0 ? (
                <tr>
                   <td colSpan={4} className="p-16 text-center text-gray-500">
                     <UserCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                     <p>No applicants found for this position yet.</p>
                   </td>
                </tr>
              ) : (
                applicants.map((applicant) => (
                  <tr key={applicant._id || applicant.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-sm">
                          {applicant.seeker?.name?.substring(0, 2).toUpperCase() || <UserCircle className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {applicant.seeker?.name || 'Unknown Applicant'}
                          </div>
                          <div className="text-sm text-gray-500">{applicant.seeker?.email || 'No email provided'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(applicant.appliedAt || applicant.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 w-56">
                      <div className="relative">
                        <select
                          value={applicant.status || 'Applied'}
                          onChange={(e) => handleStatusChange(applicant._id || applicant.id, e.target.value)}
                          className="block w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium transition-all hover:border-gray-300 cursor-pointer shadow-sm"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
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
