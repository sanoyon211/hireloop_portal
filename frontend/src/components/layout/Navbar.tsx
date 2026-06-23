import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
            <Briefcase className="w-7 h-7" />
            HireLoop
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/jobs" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Find Jobs</Link>
            <Link href="/companies" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Companies</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
