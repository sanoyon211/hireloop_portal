"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Building2, Save, Upload } from "lucide-react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 mt-2">Manage your personal profile and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left column: Navigation/Tabs */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center space-x-3 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg font-medium transition-colors">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors">
            <Lock className="w-5 h-5" />
            <span>Security</span>
          </button>
        </div>

        {/* Right column: Form */}
        <div className="col-span-1 md:col-span-3 space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <p className="text-sm text-gray-500 mt-1">Update your basic profile details and avatar.</p>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-8">
              
              {/* Avatar upload */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 border-2 border-white shadow-sm">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  <div className="flex items-center space-x-3">
                    <button type="button" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New
                    </button>
                    <button type="button" className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue="Sarah Jenkins"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="sarah@techcorp.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-100 disabled:opacity-70 shadow-sm"
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Company Settings Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-900 mb-1">
                <Building2 className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Company Settings</h3>
              </div>
              <p className="text-sm text-indigo-700/80">
                Manage your employer brand, company logo, and bio.
              </p>
            </div>
            <Link 
              href="/dashboard/recruiter/company"
              className="inline-flex justify-center items-center px-5 py-2.5 bg-white text-indigo-600 border border-indigo-200 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-sm whitespace-nowrap"
            >
              Manage Company
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
