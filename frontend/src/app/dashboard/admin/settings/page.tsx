"use client";

import React, { useState } from "react";
import { Save, User, Shield, Camera } from "lucide-react";

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Using browser alert for simplicity per dummy requirements
      alert("Admin profile updated successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Settings</h1>
        <p className="text-gray-500 mt-2">Manage your super admin profile and security preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center">
          <Shield className="w-5 h-5 text-indigo-600 mr-2.5" />
          <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        </div>
        
        <form onSubmit={handleUpdate} className="p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border-4 border-white shadow-md overflow-hidden">
                <User className="w-12 h-12" />
              </div>
              <button type="button" className="absolute bottom-0 right-0 p-2.5 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-indigo-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 w-full">
               <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-2">Avatar URL (Optional)</label>
               <input
                  type="text"
                  id="avatarUrl"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm bg-gray-50 focus:bg-white"
                />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                defaultValue="Super Admin"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                defaultValue="admin@hireloop.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="pt-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-gray-400 font-normal ml-1">(Leave blank to keep current)</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
             <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all focus:ring-4 focus:ring-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm active:scale-[0.98]"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Saving Changes...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </span>
                )}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
