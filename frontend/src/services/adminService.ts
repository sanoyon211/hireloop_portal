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
  },

  updateUserRole: async (userId: string, role: string) => {
    const response = await axiosInstance.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  toggleUserStatus: async (userId: string, isActive: boolean) => {
    const response = await axiosInstance.patch(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  },

  deleteJob: async (jobId: string) => {
    const response = await axiosInstance.delete(`/admin/jobs/${jobId}`);
    return response.data;
  }
};
