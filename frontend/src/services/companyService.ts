import axiosInstance from '@/lib/axiosInstance';

export const companyService = {
  registerCompany: async (companyData: Record<string, any>) => {
    const response = await axiosInstance.post('/companies/register', companyData);
    return response.data;
  },

  getApprovedCompanies: async () => {
    const response = await axiosInstance.get('/companies');
    return response.data;
  },

  approveCompany: async (id: string) => {
    const response = await axiosInstance.patch(`/admin/companies/${id}/approve`);
    return response.data;
  },

  rejectCompany: async (id: string) => {
    const response = await axiosInstance.patch(`/admin/companies/${id}/reject`);
    return response.data;
  }
};
