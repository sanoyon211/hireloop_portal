import axiosInstance from '@/lib/axiosInstance';

export const adminService = {
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/stats');
    return response.data;
  },

  getAllUsers: async (params?: Record<string, any>) => {
    const response = await axiosInstance.get('/admin/users', { params });
    return response.data;
  },

  getAllPayments: async () => {
    const response = await axiosInstance.get('/admin/payments');
    return response.data;
  }
};
