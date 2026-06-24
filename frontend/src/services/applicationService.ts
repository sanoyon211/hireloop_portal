import axiosInstance from '@/lib/axiosInstance';

export const applicationService = {
  getMyApplications: async () => {
    const response = await axiosInstance.get('/applications/me');
    return response.data;
  },
  
  getJobApplicants: async (jobId: string) => {
    const response = await axiosInstance.get(`/jobs/${jobId}/applicants`);
    return response.data;
  },

  updateApplicationStatus: async (id: string, status: string) => {
    const response = await axiosInstance.patch(`/applications/${id}/status`, { status });
    return response.data;
  }
};
