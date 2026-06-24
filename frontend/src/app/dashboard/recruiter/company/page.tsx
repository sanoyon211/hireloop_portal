"use client";

import { useState } from "react";

export default function MyCompanyPage() {
  // Simulate having a company or not. Change to true to see the edit form.
  const [hasCompany, setHasCompany] = useState(false);
  const [status] = useState("Pending"); // Pending, Approved, Rejected

  if (!hasCompany) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="h-24 w-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
          <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">No Company Registered</h2>
        <p className="mt-3 text-gray-500 max-w-md">
          You need to register your company profile before you can start posting jobs and reviewing applicants.
        </p>
        <button 
          onClick={() => setHasCompany(true)}
          className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
        >
          Register Company Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Company Profile</h1>
          <p className="mt-2 text-sm text-gray-500">Manage your company details and verification status.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-sm font-medium text-gray-700">Verification Status:</span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
            status === 'Approved' ? 'bg-green-50 text-green-700 ring-green-600/20' :
            status === 'Pending' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
            'bg-red-50 text-red-700 ring-red-600/20'
          }`}>
            {status}
          </span>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <form className="p-6 sm:p-8 space-y-8">
          {/* Logo Section */}
          <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
            <div className="h-24 w-24 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden relative group cursor-pointer hover:border-indigo-500 transition-colors">
              <span className="text-gray-400 text-sm font-medium group-hover:text-indigo-500">Upload</span>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Company Logo</h3>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB. Recommended size 400x400px.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Company Name</label>
              <div className="mt-2">
                <input type="text" id="name" defaultValue="TechCorp Solutions" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
              </div>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium leading-6 text-gray-900">Industry / Category</label>
              <div className="mt-2">
                <select id="industry" defaultValue="it" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow">
                  <option value="it">Information Technology</option>
                  <option value="finance">Finance</option>
                  <option value="health">Healthcare</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="employees" className="block text-sm font-medium leading-6 text-gray-900">Employee Count</label>
              <div className="mt-2">
                <select id="employees" defaultValue="51-200" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow">
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">Website URL</label>
              <div className="mt-2">
                <input type="url" id="website" defaultValue="https://techcorp.example.com" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Headquarters Location</label>
              <div className="mt-2">
                <input type="text" id="location" defaultValue="San Francisco, CA" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Short Description</label>
              <div className="mt-2">
                <textarea id="description" rows={4} defaultValue="TechCorp Solutions is a leading provider of innovative software products and services..." className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow resize-y" />
              </div>
              <p className="mt-2 text-sm text-gray-500">Briefly describe what your company does. This will be visible on your job posts.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
