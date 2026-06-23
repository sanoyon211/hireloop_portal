"use client";

import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function RootDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated users back to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show a full-screen loading spinner while verifying authentication state
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
          <p className="text-sm text-gray-500 font-medium animate-pulse">Loading workspace...</p>
        </div>
      </div>
    );
  }

  // Once authenticated, wrap all nested dashboard pages inside the robust layout
  return <DashboardLayout>{children}</DashboardLayout>;
}
