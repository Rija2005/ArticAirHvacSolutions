import api from "./api";
// Service Requests
export const createServiceRequest = (formData) =>
  api.post("/requests", formData);
export const getMyRequests = () => api.get("/requests/my");
export const getRequestById = (id) => api.get(`/requests/${id}`);
// Quotations
export const getMyQuotations = () => api.get("/quotations/my");
export const respondToQuotation = (id, status) => api.patch(`/quotations/${id}`, { status });
// Invoices
export const getMyInvoices = () => api.get("/invoices/my");
// Maintenance Contracts
export const getMyContracts = () => api.get("/contracts/my");
export const renewContract = (id) => api.patch(`/contracts/${id}/renew`);
// Notifications
export const getMyNotifications = () => api.get("/notifications/my");
export const markNotificationRead = (id) => api.patch(`/notifications/${id}/read`);
// Profile
export const updateProfile = (data) => api.patch("/users/me", data);
//reviews
export const createReview = (data) => api.post("/reviews", data);
export const getMyReviews = () => api.get("/reviews/my");
export const getReportByJob = (jobId) => api.get(`/reports/${jobId}`);