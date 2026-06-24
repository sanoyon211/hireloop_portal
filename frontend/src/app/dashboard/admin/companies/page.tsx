"use client";

import React, { useState } from "react";
import { Building2, Check, X, Clock } from "lucide-react";

// Mock Data
const initialCompanies = [
  { id: "C-1", name: "TechFlow Inc.", recruiterEmail: "bob@techflow.com", industry: "Software", status: "Approved", dateSubmitted: "2026-06-10" },
  { id: "C-2", name: "DataCorp", recruiterEmail: "sarah@datacorp.io", industry: "Data Analytics", status: "Pending", dateSubmitted: "2026-06-22" },
  { id: "C-3", name: "GreenEnergy", recruiterEmail: "mike@greenenergy.com", industry: "Renewables", status: "Pending", dateSubmitted: "2026-06-23" },
  { id: "C-4", name: "SpammyJobs", recruiterEmail: "spammer@fake.com", industry: "Unknown", status: "Rejected", dateSubmitted: "2026-06-20" },
];

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(initialCompanies);

  const updateStatus = (id: string, newStatus: string) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "Approved": return <Check className="w-4 h-4 mr-1.5 text-emerald-500" />;
      case "Rejected": return <X className="w-4 h-4 mr-1.5 text-red-500" />;
      case "Pending": return <Clock className="w-4 h-4 mr-1.5 text-amber-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Companies</h1>
          <p className="text-gray-500 mt-2">Review and approve company registrations submitted by recruiters.</p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 flex space-x-6 text-sm font-medium">
          <div className="flex items-center text-gray-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-2.5"></span> 
            Pending ({companies.filter(c => c.status === 'Pending').length})
          </div>
          <div className="flex items-center text-gray-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2.5"></span> 
            Approved
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Company</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Recruiter Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Industry</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date Submitted</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-400">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="font-medium text-gray-900">{company.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {company.recruiterEmail}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {company.industry}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                      company.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      company.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <StatusIcon status={company.status} />
                      {company.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(company.dateSubmitted).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    {(company.status === 'Pending' || company.status === 'Rejected') && (
                      <button
                        onClick={() => updateStatus(company.id, 'Approved')}
                        className="text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors border border-emerald-200"
                      >
                        Approve
                      </button>
                    )}
                    {(company.status === 'Pending' || company.status === 'Approved') && (
                      <button
                        onClick={() => updateStatus(company.id, 'Rejected')}
                        className="text-xs font-medium text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors border border-red-200"
                      >
                        Reject
                      </button>
                    )}
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
