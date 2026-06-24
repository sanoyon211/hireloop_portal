import axiosInstance from '@/lib/axiosInstance';

export const jobService = {
  getJobs: async (params?: Record<string, any>) => {
    const response = await axiosInstance.get('/jobs', { params });
    return response.data;
  },
  
  getJobById: async (id: string) => {
    const response = await axiosInstance.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (jobData: Record<string, any>) => {
    const response = await axiosInstance.post('/jobs', jobData);
    return response.data;
  },

  applyForJob: async (jobId: string, applicationData: Record<string, any>) => {
    const response = await axiosInstance.post(`/jobs/${jobId}/apply`, applicationData);
    return response.data;
  }
};
