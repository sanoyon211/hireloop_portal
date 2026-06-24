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

  getAllCompanies: async () => {
    const response = await axiosInstance.get('/companies');
    return response.data;
  },

  approveCompany: async (id: string) => {
    const response = await axiosInstance.patch(`/companies/${id}/status`, { status: 'Approved' });
    return response.data;
  },

  rejectCompany: async (id: string) => {
    const response = await axiosInstance.patch(`/companies/${id}/status`, { status: 'Rejected' });
    return response.data;
  }
};
