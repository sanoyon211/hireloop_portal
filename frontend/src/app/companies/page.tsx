"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Users, Briefcase, Search, Building2 } from 'lucide-react';
import Link from 'next/link';
import { companyService } from '@/services/companyService';

export default function BrowseCompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Industries');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyService.getApprovedCompanies();
        const fetchedData = response.companies || response.data || response || [];
        setCompanies(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Derive unique industries for tabs, plus "All Industries"
  const industries = ['All Industries', ...Array.from(new Set(companies.map(c => c.industry).filter(Boolean)))];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name?.toLowerCase().includes(searchQuery.toLowerCase()) || company.industry?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = activeTab === 'All Industries' || company.industry === activeTab;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Discover Top Companies</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">Explore workplaces that align with your career goals and values.</p>
          
          <div className="mt-8 max-w-xl mx-auto relative shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" 
              placeholder="Search by company name or industry..." 
            />
          </div>
        </div>

        {/* Filter Tabs */}
        {!loading && industries.length > 1 && (
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
            {industries.map((tab, i) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             // Loading Skeleton
             [1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse">
                 <div className="flex items-center gap-4 mb-5">
                   <div className="w-16 h-16 rounded-xl bg-indigo-50"></div>
                   <div>
                     <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
                     <div className="h-4 w-20 bg-indigo-100 rounded"></div>
                   </div>
                 </div>
                 <div className="space-y-3 mt-6">
                   <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                   <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                 </div>
                 <div className="mt-6 pt-5 border-t border-gray-50 flex justify-between items-center">
                   <div className="h-4 w-24 bg-gray-100 rounded"></div>
                   <div className="h-4 w-20 bg-gray-100 rounded"></div>
                 </div>
               </div>
             ))
          ) : filteredCompanies.length === 0 ? (
             // Empty State
             <div className="col-span-full bg-white rounded-2xl border border-gray-200 p-16 text-center">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
                 <Building2 className="w-8 h-8 text-indigo-400" />
               </div>
               <h3 className="text-lg font-semibold text-gray-900">No companies found</h3>
               <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any companies matching "{searchQuery}". Try a different keyword or industry.</p>
               <button 
                 onClick={() => { setSearchQuery(''); setActiveTab('All Industries'); }}
                 className="mt-6 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
               >
                 Clear search
               </button>
             </div>
          ) : (
            filteredCompanies.map((company) => (
              <Link key={company.id || company._id} href={`/companies/${company.id || company._id}`} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl font-black text-indigo-600 shadow-inner overflow-hidden">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                    ) : (
                      company.name?.substring(0, 1).toUpperCase() || 'C'
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{company.name}</h2>
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mt-1 inline-block">{company.industry || 'Tech'}</span>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400" /> {company.location || 'Global (Remote)'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-3 text-gray-400" /> {company.employeeCount || company.employees || 'Growing Team'}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">
                    <Briefcase className="w-4 h-4 inline mr-1 text-indigo-500" /> {company.openJobsCount || company.jobs || 0} Open Jobs
                  </span>
                  <span className="text-sm font-medium text-indigo-600 group-hover:underline">View Profile &rarr;</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
