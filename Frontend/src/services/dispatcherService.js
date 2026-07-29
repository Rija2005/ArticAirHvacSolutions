import api from "./api";
// Service Requests (view all, to decide assignments)
export const getAllRequests = () => api.get("/requests");
export const updateRequestStatus = (id, status) => api.patch(`/requests/${id}/status`, { status });
// Jobs (assign technician to a request)
export const createJob = (data) => api.post("/jobs", data);
export const getAllJobs = () => api.get("/jobs");
// Technician
export const getAvailableTechnicians = () => api.get("/users/technicians/available");
export const getAllTechnicians = () => api.get("/users?role=technician");
export const getReportByJob = (jobId) => api.get(`/reports/${jobId}`);