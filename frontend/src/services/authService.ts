import axiosInstance from '@/lib/axiosInstance';

export const authService = {
  syncUser: async (additionalData?: { role?: string, name?: string }) => {
    const response = await axiosInstance.post('/auth/sync', additionalData || {});
    return response.data;
  }
};
