"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Search, MapPin, Briefcase, Filter, Heart, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { jobService } from '@/services/jobService';

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State
  const [searchKeyword, setSearchKeyword] = useState('');
  const [locationKeyword, setLocationKeyword] = useState('');
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState('Any Salary');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {};
      if (searchKeyword) params.search = searchKeyword;
      if (locationKeyword) params.location = locationKeyword;
      if (jobTypes.length > 0) params.type = jobTypes.join(',');
      if (locationTypes.length > 0) params.workModel = locationTypes.join(',');
      if (salaryRange !== 'Any Salary') params.salary = salaryRange;

      const response = await jobService.getJobs(params);
      const fetchedJobs = response.jobs || response.data || response || [];
      setJobs(Array.isArray(fetchedJobs) ? fetchedJobs : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      // Fail gracefully
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobTypes, locationTypes, salaryRange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header & Search */}
        <div className="bg-indigo-600 rounded-2xl p-8 mb-10 shadow-lg text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Find your next opportunity</h1>
          <p className="text-indigo-100 mb-8 max-w-2xl text-lg">Search through thousands of job listings across top companies and disruptive startups.</p>
          
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 shadow-sm">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border-none focus:ring-0 text-gray-900 rounded-md" 
                placeholder="Job title, keywords, or company" 
              />
            </div>
            <div className="w-full md:w-1/3 relative border-t md:border-t-0 md:border-l border-gray-200">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={locationKeyword}
                onChange={(e) => setLocationKeyword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border-none focus:ring-0 text-gray-900 rounded-md" 
                placeholder="City, state, or Remote" 
              />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
              Search Jobs
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-2 font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                <Filter className="w-5 h-5" /> Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(type => (
                      <label key={type} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={jobTypes.includes(type)}
                          onChange={() => handleCheckboxChange(setJobTypes, type)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" 
                        />
                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Work Model</h3>
                  <div className="space-y-2">
                    {['Remote', 'On-site', 'Hybrid'].map(loc => (
                      <label key={loc} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={locationTypes.includes(loc)}
                          onChange={() => handleCheckboxChange(setLocationTypes, loc)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" 
                        />
                        <span className="ml-2 text-sm text-gray-600">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Salary Range</h3>
                  <select 
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700 bg-white"
                  >
                    <option value="Any Salary">Any Salary</option>
                    <option value="$50k - $80k">$50k - $80k</option>
                    <option value="$80k - $120k">$80k - $120k</option>
                    <option value="$120k+">$120k+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="w-full lg:w-3/4 space-y-4">
            <div className="flex justify-between items-center mb-4">
              {loading ? (
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-sm text-gray-500 font-medium">Showing {jobs.length} jobs</p>
              )}
              <select className="border-gray-300 rounded-md text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option>Most Relevant</option>
                <option>Most Recent</option>
                <option>Highest Paid</option>
              </select>
            </div>

            {loading ? (
               // Loading Skeleton
               [1, 2, 3, 4].map(i => (
                 <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                   <div className="flex gap-4">
                     <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0"></div>
                     <div className="flex-grow">
                        <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-1/4 bg-gray-100 rounded mb-4"></div>
                        <div className="flex gap-2">
                           <div className="h-6 w-20 bg-gray-100 rounded"></div>
                           <div className="h-6 w-20 bg-gray-100 rounded"></div>
                        </div>
                     </div>
                   </div>
                 </div>
               ))
            ) : jobs.length === 0 ? (
               // Empty State
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
                   <AlertCircle className="w-8 h-8 text-indigo-400" />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900">No jobs found</h3>
                 <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any opportunities matching your current criteria. Try adjusting your filters or search terms.</p>
                 <button 
                   onClick={() => { setSearchKeyword(''); setLocationKeyword(''); setJobTypes([]); setLocationTypes([]); setSalaryRange('Any Salary'); }}
                   className="mt-6 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                 >
                   Clear all filters
                 </button>
               </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id || job._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group relative">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-xl font-bold text-gray-400 border border-gray-100 overflow-hidden">
                      {job.companyLogo ? (
                         <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
                      ) : (
                         job.companyName?.substring(0, 2).toUpperCase() || 'CO'
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/jobs/${job.id || job._id}`}>
                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors after:absolute after:inset-0">
                              {job.title}
                            </h2>
                          </Link>
                          <p className="text-sm text-indigo-600 font-medium mt-1">{job.companyName}</p>
                        </div>
                        <button className="relative z-10 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-50 focus:outline-none">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> {job.location || 'Remote'}
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1.5 text-gray-400" /> {job.jobType || 'Full-time'}
                        </span>
                        {job.salaryRange && (
                          <span className="flex items-center text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">
                            {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
