
import api from "./api";

// Employee Management
export const createEmployee = (data) => api.post("/users", data);
export const getUsersByRole = (role) => api.get(`/users?role=${role}`);
export const updateEmployee = (id, data) => api.patch(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getDispatchers = () => api.get("/users/dispatchers");

// Service Requests (admin oversight)
export const getAllRequests = () => api.get("/requests");

// Quotations
export const createQuotation = (data) => api.post("/quotations", data);
export const getAllQuotations = () => api.get("/quotations");

// Invoices
export const createInvoice = (data) => api.post("/invoices", data);
export const getAllInvoices = () => api.get("/invoices");
export const markInvoicePaid = (id) => api.patch(`/invoices/${id}/pay`);

// Payments
export const createPayment = (data) => api.post("/payments", data);
export const getAllPayments = () => api.get("/payments");

// Maintenance Contracts
export const createContract = (data) => api.post("/contracts", data);
export const getAllContracts = () => api.get("/contracts");

// Analytics
export const getOverview = () => api.get("/analytics/overview");
export const getRevenueByMonth = () => api.get("/analytics/revenue");
export const getMostRequestedServices = () => api.get("/analytics/services");
export const getTechnicianPerformance = () => api.get("/analytics/technician-performance");
export const getCustomerGrowth = () => api.get("/analytics/customer-growth");
export const getReportsSummary = () => api.get("/analytics/reports-summary");
export const getJobStatusDistribution = () => api.get("/analytics/job-status-distribution");
export const getRecentActivity = () => api.get("/analytics/recent-activity");
export const getDailyRevenue = () => api.get("/analytics/daily-revenue");
export const getMaintenanceStats = () => api.get("/analytics/maintenance-stats");

// Service Reports (admin — Recent Service Reports section on Reports page)
export const getAllServiceReports = () => api.get("/reports");

// Notifications
export const getAllNotifications = () => api.get("/notifications");


export const getAllReviews = () => api.get("/reviews");
export const toggleReviewVisibility = (id, isPublic) => api.patch(`/reviews/${id}/visibility`, { isPublic });