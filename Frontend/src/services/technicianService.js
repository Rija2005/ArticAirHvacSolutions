import api from "./api";
export const getMyJobs = () => api.get("/jobs/my");
export const updateJobStatus = (id, status) => api.patch(`/jobs/${id}/status`, { status });
export const submitServiceReport = (formData) =>
  api.post("/reports", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const getReportByJob = (jobId) => api.get(`/reports/${jobId}`);
export const updateAvailability = (id, status) =>
  api.patch(`/users/${id}/availability`, { availabilityStatus: status });