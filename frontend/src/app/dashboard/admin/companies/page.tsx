"use client";

import React, { useState, useEffect } from "react";
import { Search, Building2, Check, X } from "lucide-react";
import { companyService } from "@/services/companyService";
import { toast } from "sonner";

export default function ManageCompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      const fetched = response.companies || response.data || response || [];
      setCompanies(Array.isArray(fetched) ? fetched : []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleApprove = async (companyId: string) => {
    try {
      await companyService.approveCompany(companyId);
      setCompanies(companies.map(c => (c._id || c.id) === companyId ? { ...c, status: 'Approved' } : c));
      toast.success("Company Approved Successfully");
    } catch (error) {
      console.error("Approval error", error);
      toast.error("Failed to approve company");
    }
  };

  const handleReject = async (companyId: string) => {
    try {
      await companyService.rejectCompany(companyId);
      setCompanies(companies.map(c => (c._id || c.id) === companyId ? { ...c, status: 'Rejected' } : c));
      toast.success("Company Rejected");
    } catch (error) {
      console.error("Rejection error", error);
      toast.error("Failed to reject company");
    }
  };

  const filteredCompanies = companies.filter(company => 
    company.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Company Registrations</h1>
          <p className="text-gray-500 mt-2">Review and verify new company profiles.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Company Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Industry / Location</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [1,2,3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4 flex gap-3 items-center">
                       <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                       <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                       <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                    <td className="px-6 py-4 flex justify-end gap-2"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : filteredCompanies.length === 0 ? (
                <tr>
                   <td colSpan={4} className="p-16 text-center text-gray-500">
                     <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                     No companies found.
                   </td>
                </tr>
              ) : (
                filteredCompanies.map((company) => (
                  <tr key={company._id || company.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xl font-bold text-indigo-600 shrink-0 overflow-hidden">
                           {company.logo ? <img src={company.logo} className="w-full h-full object-cover" /> : company.name?.charAt(0) || 'C'}
                        </div>
                        <div className="font-medium text-gray-900">{company.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{company.industry || 'General'}</div>
                      <div className="text-xs text-gray-500 mt-1">{company.location || 'Remote'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        company.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                        company.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {company.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       {company.status !== 'Approved' && (
                         <button 
                           onClick={() => handleApprove(company._id || company.id)}
                           className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg transition-colors border border-emerald-100"
                         >
                           <Check className="w-4 h-4 mr-1" /> Approve
                         </button>
                       )}
                       {company.status !== 'Rejected' && (
                         <button 
                           onClick={() => handleReject(company._id || company.id)}
                           className="inline-flex items-center text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors border border-red-100"
                         >
                           <X className="w-4 h-4 mr-1" /> Reject
                         </button>
                       )}
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
