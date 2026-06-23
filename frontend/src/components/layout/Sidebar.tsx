"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  LayoutDashboard, Search, Heart, FileText, CreditCard, Settings, 
  Building, Briefcase, Users, DollarSign, LogOut, X, Globe
} from 'lucide-react';

const roleLinks = {
  Seeker: [
    { name: 'Dashboard', href: '/dashboard/seeker', icon: LayoutDashboard },
    { name: 'Browse Jobs', href: '/jobs', icon: Search },
    { name: 'Saved Jobs', href: '/dashboard/seeker/saved', icon: Heart },
    { name: 'My Applications', href: '/dashboard/seeker/applications', icon: FileText },
    { name: 'Billing', href: '/dashboard/seeker/billing', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/seeker/settings', icon: Settings },
  ],
  Recruiter: [
    { name: 'Dashboard', href: '/dashboard/recruiter', icon: LayoutDashboard },
    { name: 'My Company', href: '/dashboard/recruiter/company', icon: Building },
    { name: 'Manage Jobs', href: '/dashboard/recruiter/jobs', icon: Briefcase },
    { name: 'Billing', href: '/dashboard/recruiter/billing', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/recruiter/settings', icon: Settings },
  ],
  Admin: [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Manage Companies', href: '/dashboard/admin/companies', icon: Building },
    { name: 'Manage Jobs', href: '/dashboard/admin/jobs', icon: Briefcase },
    { name: 'Payments', href: '/dashboard/admin/payments', icon: DollarSign },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ]
};

const publicLinks = [
  { name: 'Home', href: '/' },
  { name: 'Browse Jobs', href: '/jobs' },
  { name: 'Companies', href: '/companies' },
  { name: 'Pricing', href: '/pricing' },
];

export const Sidebar = ({ onClose }: { onClose: () => void }) => {
  const { mongoUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Wait a moment for Firebase auth state to clear before navigating
      setTimeout(() => {
        router.push('/');
      }, 100);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const links = mongoUser ? roleLinks[mongoUser.role] : [];
  
  // Extract initial for avatar fallback if image is missing
  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-600" />
          HireLoop
        </Link>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info Section */}
      {mongoUser && (
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-100 border-2 border-indigo-200 flex-shrink-0 flex items-center justify-center shadow-sm">
            {mongoUser.avatar ? (
              <img src={mongoUser.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-indigo-700">{getInitial(mongoUser.name)}</span>
            )}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-gray-900 truncate" title={mongoUser.name}>
              {mongoUser.name}
            </span>
            <span className="text-xs text-gray-500 truncate" title={mongoUser.email}>
              {mongoUser.email}
            </span>
            <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 w-max border border-indigo-100 shadow-sm">
              {mongoUser.role}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        
        {/* Dynamic Role Links */}
        {links.length > 0 && (
          <div>
            <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Dashboard
            </h3>
            <div className="space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href + '/') && link.href !== '/');
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setTimeout(onClose, 150)}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600 border border-transparent'
                    }`}
                  >
                    <Icon className={`flex-shrink-0 mr-3 h-5 w-5 transition-colors duration-200 ${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'
                    }`} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Public Links */}
        <div>
          <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Public
          </h3>
          <div className="space-y-1">
            {publicLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setTimeout(onClose, 150)}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                  }`}
                >
                  <Globe className="flex-shrink-0 mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-100"
        >
          <LogOut className="flex-shrink-0 mr-3 h-5 w-5 text-red-500 transition-colors group-hover:text-red-600" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
