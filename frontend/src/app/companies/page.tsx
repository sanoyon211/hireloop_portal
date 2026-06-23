import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Users, Briefcase, Search } from 'lucide-react';
import Link from 'next/link';

const companies = [
  { id: 1, name: 'Stripe', industry: 'Fintech', location: 'San Francisco, CA', employees: '5000+', jobs: 42, logo: 'S' },
  { id: 2, name: 'OpenAI', industry: 'AI & Machine Learning', location: 'San Francisco, CA', employees: '500 - 1000', jobs: 18, logo: 'O' },
  { id: 3, name: 'Vercel', industry: 'Developer Tools', location: 'Remote', employees: '200 - 500', jobs: 12, logo: 'V' },
  { id: 4, name: 'Airbnb', industry: 'Travel', location: 'San Francisco, CA', employees: '5000+', jobs: 35, logo: 'A' },
  { id: 5, name: 'Notion', industry: 'Productivity', location: 'New York, NY', employees: '500 - 1000', jobs: 8, logo: 'N' },
  { id: 6, name: 'Linear', industry: 'Developer Tools', location: 'Remote', employees: '50 - 200', jobs: 5, logo: 'L' },
];

export default function BrowseCompaniesPage() {
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
            <input type="text" className="w-full pl-11 pr-4 py-3 rounded-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" placeholder="Search by company name or industry..." />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
          {['All Industries', 'Fintech', 'AI & Machine Learning', 'Developer Tools', 'Travel', 'Productivity'].map((tab, i) => (
            <button key={tab} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl font-black text-indigo-600 shadow-inner">
                  {company.logo}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{company.name}</h2>
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{company.industry}</span>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" /> {company.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-3 text-gray-400" /> {company.employees} Employees
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  <Briefcase className="w-4 h-4 inline mr-1 text-indigo-500" /> {company.jobs} Open Jobs
                </span>
                <span className="text-sm font-medium text-indigo-600 group-hover:underline">View Profile &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
