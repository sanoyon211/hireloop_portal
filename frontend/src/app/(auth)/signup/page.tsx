"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Briefcase, User as UserIcon, Mail, Lock, UserCircle } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Seeker' | 'Recruiter'>('Seeker');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { syncUserWithBackend } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase profile name natively
      await updateProfile(userCredential.user, { displayName: name });

      // Sync with our backend, pushing the explicit role and name
      const mongoUser = await syncUserWithBackend(userCredential.user, { role, name });
      
      if (mongoUser) {
        if (mongoUser.role === 'Admin') router.push('/dashboard/admin');
        else if (mongoUser.role === 'Recruiter') router.push('/dashboard/recruiter');
        else router.push('/dashboard/seeker');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please sign in instead.');
      } else {
        setError(err.message || 'Failed to create an account. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSignup}>
            
            {/* Role Selection UI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am looking to...
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  onClick={() => setRole('Seeker')}
                  className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none transition-all ${
                    role === 'Seeker' ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="flex items-center gap-2 block text-sm font-medium text-gray-900">
                        <UserIcon className={`w-5 h-5 ${role === 'Seeker' ? 'text-indigo-600' : 'text-gray-400'}`} />
                        Find a Job
                      </span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">
                        Create a profile and apply.
                      </span>
                    </span>
                  </span>
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${role === 'Seeker' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                    {role === 'Seeker' && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                  </div>
                </div>

                <div
                  onClick={() => setRole('Recruiter')}
                  className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none transition-all ${
                    role === 'Recruiter' ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="flex items-center gap-2 block text-sm font-medium text-gray-900">
                        <Briefcase className={`w-5 h-5 ${role === 'Recruiter' ? 'text-indigo-600' : 'text-gray-400'}`} />
                        Hire Talent
                      </span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">
                        Post jobs and find candidates.
                      </span>
                    </span>
                  </span>
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${role === 'Recruiter' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                    {role === 'Recruiter' && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border outline-none transition-shadow"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border outline-none transition-shadow"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border outline-none transition-shadow"
                  placeholder="•••••••• (min 6 characters)"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
