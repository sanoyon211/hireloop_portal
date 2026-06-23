"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [isRecruiter, setIsRecruiter] = useState(false);

  const seekerPlans = [
    { name: 'Free', price: '$0', limit: '3 applications/month', features: ['Basic Profile', 'Search Jobs', 'Save Jobs', 'Email Support'] },
    { name: 'Pro', price: '$19', limit: '30 applications/month', features: ['Priority Placement', 'Salary Insights', 'Who viewed your profile', 'Priority Support'], popular: true },
    { name: 'Premium', price: '$39', limit: 'Unlimited applications', features: ['AI Resume Review', 'Direct Messaging to Recruiters', 'Top of list for applications', '24/7 Phone Support'] },
  ];

  const recruiterPlans = [
    { name: 'Free', price: '$0', limit: '3 active job posts', features: ['Company Profile', 'Receive Applications', 'Basic Dashboard'] },
    { name: 'Growth', price: '$49', limit: '10 active job posts', features: ['Candidate Filtering', 'Export to CSV', 'Featured Company Badge'], popular: true },
    { name: 'Enterprise', price: '$149', limit: '50 active job posts', features: ['Custom Integrations', 'Dedicated Account Manager', 'Advanced Analytics', 'Unlimited Team Members'] },
  ];

  const activePlans = isRecruiter ? recruiterPlans : seekerPlans;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Simple, transparent pricing</h1>
          <p className="mt-4 text-xl text-gray-500">No hidden fees. No surprise charges. Choose the plan that best fits your needs.</p>
          
          <div className="mt-10 flex justify-center">
            <div className="relative flex rounded-full p-1 bg-gray-100 border border-gray-200">
              <button
                onClick={() => setIsRecruiter(false)}
                className={`relative w-1/2 rounded-full py-2 px-8 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none z-10 ${!isRecruiter ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setIsRecruiter(true)}
                className={`relative w-1/2 rounded-full py-2 px-8 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none z-10 ${isRecruiter ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                For Recruiters
              </button>
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${isRecruiter ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`} 
              />
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activePlans.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col bg-white rounded-3xl p-8 shadow-sm border transition-all ${plan.popular ? 'border-indigo-600 ring-1 ring-indigo-600 scale-105 z-10 shadow-xl' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4 flex items-baseline text-5xl font-extrabold text-gray-900">
                  {plan.price}
                  <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
                </p>
                <p className="mt-4 text-sm text-indigo-600 font-medium">{plan.limit}</p>
              </div>
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="flex-shrink-0 w-5 h-5 text-indigo-500" />
                    <span className="ml-3 text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/signup" 
                className={`w-full py-4 px-4 text-center rounded-xl font-bold text-sm transition-colors ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="text-lg font-bold text-gray-900">Can I cancel my subscription at any time?</h4>
              <p className="mt-2 text-gray-600">Yes, you can cancel your subscription at any time from your billing dashboard. You will retain access to your plan's features until the end of your current billing cycle.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="text-lg font-bold text-gray-900">What payment methods do you accept?</h4>
              <p className="mt-2 text-gray-600">We accept all major credit cards including Visa, Mastercard, and American Express. Payments are securely processed via Stripe.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
