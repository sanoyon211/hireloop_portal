"use client";

import Link from "next/link";

export default function PostNewJobPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Post a New Job</h1>
          <p className="mt-2 text-sm text-gray-500">Create a detailed listing to attract the best talent.</p>
        </div>
        <Link 
          href="/dashboard/recruiter/jobs"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          &larr; Back to Jobs
        </Link>
      </div>

      {/* Informational Alert */}
      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">
              <strong>Reminder:</strong> Your job will only go live if your company profile is <strong>Approved</strong> and you are within your active job limit (currently 7/10 used).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
        <form className="p-6 sm:p-8 space-y-10">
          
          {/* Section 1: Job Info */}
          <div>
            <h2 className="text-lg font-semibold leading-7 text-gray-900 border-b border-gray-100 pb-3 mb-6">Job Information</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Job Title</label>
                <div className="mt-2">
                  <input type="text" id="title" placeholder="e.g. Senior Frontend Developer" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                <div className="mt-2">
                  <select id="category" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow">
                    <option>Software Engineering</option>
                    <option>Design</option>
                    <option>Product Management</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Job Type</label>
                <div className="mt-2">
                  <select id="type" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Remote</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Salary Range</label>
                <div className="mt-2 flex gap-2">
                  <input type="number" placeholder="Min" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
                  <span className="flex items-center text-gray-500">-</span>
                  <input type="number" placeholder="Max" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
                </div>
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">Currency</label>
                <div className="mt-2">
                  <select id="currency" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>CAD ($)</option>
                    <option>AUD ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                <div className="mt-2">
                  <input type="text" id="location" placeholder="e.g. New York, NY or Remote" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium leading-6 text-gray-900">Application Deadline</label>
                <div className="mt-2">
                  <input type="date" id="deadline" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Job Description */}
          <div>
            <h2 className="text-lg font-semibold leading-7 text-gray-900 border-b border-gray-100 pb-3 mb-6">Job Description</h2>
            <div className="space-y-6">
              
              <div>
                <label htmlFor="responsibilities" className="block text-sm font-medium leading-6 text-gray-900">Responsibilities</label>
                <div className="mt-2">
                  <textarea id="responsibilities" rows={5} placeholder="- List key responsibilities here..." className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow resize-y" />
                </div>
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium leading-6 text-gray-900">Requirements & Qualifications</label>
                <div className="mt-2">
                  <textarea id="requirements" rows={5} placeholder="- List requirements, skills, and qualifications..." className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow resize-y" />
                </div>
              </div>

              <div>
                <label htmlFor="benefits" className="block text-sm font-medium leading-6 text-gray-900">Benefits & Perks</label>
                <div className="mt-2">
                  <textarea id="benefits" rows={4} placeholder="- Health insurance&#10;- 401(k) matching&#10;- Unlimited PTO" className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow resize-y" />
                </div>
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-x-4">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors">
              Save as Draft
            </button>
            <button type="submit" className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
