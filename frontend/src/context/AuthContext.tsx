"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface MongoUser {
  _id: string;
  name: string;
  email: string;
  role: 'Seeker' | 'Recruiter' | 'Admin';
  avatar: string;
  currentPlan: string;
  isActive: boolean;
  activeJobsCount?: number;
  planApplicationsUsed?: number;
}

interface AuthContextProps {
  user: FirebaseUser | null;
  mongoUser: MongoUser | null;
  loading: boolean;
  syncUserWithBackend: (fbUser: FirebaseUser, additionalData?: { role?: string, name?: string }) => Promise<MongoUser | null>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  mongoUser: null,
  loading: true,
  syncUserWithBackend: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [mongoUser, setMongoUser] = useState<MongoUser | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUserWithBackend = async (fbUser: FirebaseUser, additionalData?: { role?: string, name?: string }): Promise<MongoUser | null> => {
    try {
      // Get the fresh Firebase JWT
      const token = await fbUser.getIdToken();
      
      // Call our robust backend sync endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(additionalData || {})
      });

      if (!response.ok) {
        throw new Error('Failed to sync user with backend');
      }

      const data = await response.json();
      setMongoUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Error syncing user:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // If they just logged in, sync them to fetch their MongoDB profile & role
        await syncUserWithBackend(currentUser);
      } else {
        setMongoUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, mongoUser, loading, syncUserWithBackend }}>
      {children}
    </AuthContext.Provider>
  );
};
