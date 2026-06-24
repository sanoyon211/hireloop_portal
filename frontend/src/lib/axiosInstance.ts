import axios from 'axios';
import { auth } from '@/lib/firebase';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to attach Firebase ID Token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Wait for auth to initialize and get currentUser
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error getting Firebase ID token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for unified error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error("API Error:", customError);
    return Promise.reject(new Error(customError));
  }
);

export default axiosInstance;
