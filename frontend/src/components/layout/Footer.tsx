import Link from 'next/link';
import { Briefcase, Globe, Mail, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
              <Briefcase className="w-6 h-6" />
              HireLoop
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Connecting top talent with the world's most innovative companies. Your next career move starts here.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Contact</span>
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Community</span>
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/jobs" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/companies" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Browse Companies</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Career Guides</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} HireLoop, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
