"use client";

import { useAuth } from '@/context/AuthContext';
import { CreditCard, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  const { mongoUser } = useAuth();
  
  // Safely extract usage data with fallbacks
  const currentPlan = mongoUser?.currentPlan || 'Free';
  const applicationsUsed = mongoUser?.planApplicationsUsed || 0;
  
  // Determine limits based on plan
  let maxLimit = 3; // Free
  if (currentPlan === 'Pro') maxLimit = 30;
  if (currentPlan === 'Premium') maxLimit = 9999; // Represents Unlimited

  const usagePercentage = currentPlan === 'Premium' ? 0 : Math.min((applicationsUsed / maxLimit) * 100, 100);

  const paymentHistory = [
    { id: 'tx_12345', date: 'Oct 01, 2026', plan: 'Pro', amount: '$19.00', status: 'Paid' },
    { id: 'tx_12344', date: 'Sep 01, 2026', plan: 'Pro', amount: '$19.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Subscription & Billing</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your plan, limits, and payment history.</p>
      </div>

      {/* Plan Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-600 to-blue-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-indigo-100 text-sm font-medium uppercase tracking-wide">Current Plan</p>
            <h2 className="text-4xl font-extrabold mt-1">{currentPlan}</h2>
            <p className="text-indigo-100 text-sm mt-3 flex items-center">
              <Zap className="w-4 h-4 mr-1.5" /> 
              {currentPlan === 'Premium' ? 'Unlimited applications enabled.' : 'Unlock your full potential by upgrading.'}
            </p>
          </div>
          <div>
            <Link href="/pricing" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white transition-colors shadow-sm">
              Upgrade Plan
            </Link>
          </div>
        </div>
        
        {/* Usage Section */}
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-lg font-bold text-gray-900">Application Usage (This Month)</h3>
            <span className="text-sm font-medium text-gray-600">
              {currentPlan === 'Premium' ? `${applicationsUsed} Used` : `${applicationsUsed} / ${maxLimit} Used`}
            </span>
          </div>
          
          {currentPlan !== 'Premium' && (
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${usagePercentage > 85 ? 'bg-red-500' : 'bg-indigo-600'}`} 
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
          )}
          
          <p className="text-sm text-gray-500">
            {currentPlan === 'Premium' 
              ? "You have unlimited applications. Apply to your heart's content!" 
              : "Your limit resets at the beginning of each billing cycle."}
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-indigo-600" /> Payment History
          </h3>
        </div>
        
        {paymentHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.plan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">{tx.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            No payment history found.
          </div>
        )}
      </div>
    </div>
  );
}
