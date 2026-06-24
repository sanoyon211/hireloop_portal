import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Search, MapPin, Briefcase, Filter, Heart } from 'lucide-react';
import Link from 'next/link';

const mockJobs = [
  { id: '1', title: 'Senior Software Engineer', company: 'TechFlow Inc.', location: 'San Francisco, CA (Remote)', type: 'Full-time', salary: '$130k - $160k', logo: 'T' },
  { id: '2', title: 'Product Manager', company: 'InnovateSpace', location: 'New York, NY', type: 'Full-time', salary: '$110k - $140k', logo: 'I' },
  { id: '3', title: 'Frontend Developer', company: 'CreativeWeb', location: 'Remote', type: 'Contract', salary: '$80/hr', logo: 'C' },
  { id: '4', title: 'Data Scientist', company: 'DataCorp', location: 'Austin, TX', type: 'Full-time', salary: '$125k - $150k', logo: 'D' },
];

export default function BrowseJobsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header & Search */}
        <div className="bg-indigo-600 rounded-2xl p-8 mb-10 shadow-lg text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Find your next opportunity</h1>
          <p className="text-indigo-100 mb-8 max-w-2xl text-lg">Search through thousands of job listings across top companies and disruptive startups.</p>
          
          <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 shadow-sm">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="w-full pl-10 pr-3 py-3 border-none focus:ring-0 text-gray-900 rounded-md" placeholder="Job title, keywords, or company" />
            </div>
            <div className="w-full md:w-1/3 relative border-t md:border-t-0 md:border-l border-gray-200">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="w-full pl-10 pr-3 py-3 border-none focus:ring-0 text-gray-900 rounded-md" placeholder="City, state, or Remote" />
            </div>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
              Search Jobs
            </button>
          </div>
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
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Location</h3>
                  <div className="space-y-2">
                    {['Remote', 'On-site', 'Hybrid'].map(loc => (
                      <label key={loc} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                        <span className="ml-2 text-sm text-gray-600">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Salary Range</h3>
                  <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700">
                    <option>Any Salary</option>
                    <option>$50k - $80k</option>
                    <option>$80k - $120k</option>
                    <option>$120k+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="w-full lg:w-3/4 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500 font-medium">Showing {mockJobs.length} jobs</p>
              <select className="border-gray-300 rounded-md text-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Most Relevant</option>
                <option>Most Recent</option>
                <option>Highest Paid</option>
              </select>
            </div>

            {mockJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group relative">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-xl font-bold text-gray-400 border border-gray-200">
                    {job.logo}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/jobs/${job.id}`}>
                          <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors after:absolute after:inset-0">
                            {job.title}
                          </h2>
                        </Link>
                        <p className="text-sm text-indigo-600 font-medium mt-1">{job.company}</p>
                      </div>
                      <button className="relative z-10 p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-50">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> {job.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1.5 text-gray-400" /> {job.type}
                      </span>
                      <span className="flex items-center text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
