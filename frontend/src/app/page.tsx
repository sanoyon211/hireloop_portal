import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Search, MapPin, Briefcase, TrendingUp, Building, User, Star, ArrowRight, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-36 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="z-10 relative">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 mb-6">
                <Star className="w-4 h-4 mr-2" /> Top-rated Job Portal 2026
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Find Your Dream Job with <span className="text-indigo-600">HireLoop</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 leading-relaxed max-w-2xl">
                Connect with the world's leading companies and discover opportunities that match your unique skills. AI-powered matching, seamless applications, and unparalleled transparency.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/jobs" className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all">
                  Search Jobs
                </Link>
                <Link href="/signup" className="inline-flex justify-center items-center px-8 py-3.5 border-2 border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all">
                  Post a Job
                </Link>
              </div>
            </div>
            {/* Abstract Decorative Element */}
            <div className="hidden lg:block relative z-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-white rounded-full blur-3xl opacity-50 transform -translate-x-10 translate-y-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaborating" 
                className="relative rounded-2xl shadow-2xl z-10 border border-gray-100"
              />
            </div>
          </div>
        </section>

        {/* Live Stats Section */}
        <section className="bg-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-indigo-500/50">
              <div className="px-4">
                <p className="text-4xl font-extrabold text-white tracking-tight">15k+</p>
                <p className="mt-2 text-sm font-medium text-indigo-100 uppercase tracking-wide">Active Jobs</p>
              </div>
              <div className="px-4">
                <p className="text-4xl font-extrabold text-white tracking-tight">3,200</p>
                <p className="mt-2 text-sm font-medium text-indigo-100 uppercase tracking-wide">Companies</p>
              </div>
              <div className="px-4">
                <p className="text-4xl font-extrabold text-white tracking-tight">250k</p>
                <p className="mt-2 text-sm font-medium text-indigo-100 uppercase tracking-wide">Job Seekers</p>
              </div>
              <div className="px-4">
                <p className="text-4xl font-extrabold text-white tracking-tight">98%</p>
                <p className="mt-2 text-sm font-medium text-indigo-100 uppercase tracking-wide">Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Everything you need to succeed</h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Our platform is engineered to remove the friction from hiring and job hunting.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <Search className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Search</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our algorithm matches your unique skills with the perfect roles instantly.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Salary Insights</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Total transparency. See exact salary ranges before you even apply.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <Building className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Top Companies</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Gain exclusive access to roles at Fortune 500s and hyper-growth startups.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Saved Jobs</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Bookmark opportunities and apply securely when you are ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section (Mock Data for presentation) */}
        <section className="py-24 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Featured Opportunities</h2>
                <p className="mt-3 text-gray-500">Hand-picked roles from top employers.</p>
              </div>
              <Link href="/jobs" className="hidden sm:flex items-center text-indigo-600 font-medium hover:text-indigo-700">
                View all jobs <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                      Co
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Senior Software Engineer</h3>
                  <p className="text-sm text-gray-500 mt-1">TechFlow Inc.</p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      <MapPin className="w-3 h-3 mr-1" /> Remote
                    </span>
                    <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      <Briefcase className="w-3 h-3 mr-1" /> Full-time
                    </span>
                    <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      $120k - $160k
                    </span>
                  </div>
                  <Link href={`/jobs/${i}`} className="mt-6 block w-full text-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="mt-10 sm:hidden">
              <Link href="/jobs" className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                View all jobs
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
