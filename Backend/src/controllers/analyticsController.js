
// src/controllers/analyticsController.js
import asyncHandler from "../utils/asyncHandler.js";
import ServiceRequest from "../models/ServiceRequest.js";
import Job from "../models/Job.js";
import Invoice from "../models/Invoice.js";
import MaintenanceContract from "../models/MaintenanceContract.js";
import User from "../models/User.js";
import Quotation from "../models/Quotation.js";
import Review from "../models/Review.js";

// @route GET /api/analytics/overview  (admin dashboard stat cards)
export const getOverview = asyncHandler(async (req, res) => {
  const [pendingJobs, completedJobs, activeCustomers, activeTechs] = await Promise.all([
    Job.countDocuments({ status: { $ne: "completed" } }),
    Job.countDocuments({ status: "completed" }),
    User.countDocuments({ role: "customer" }),
    MaintenanceContract.countDocuments({ status: "active" }),
  ]);

  const invoices = await Invoice.find({ paymentStatus: "paid" });
  const monthlyRevenue = invoices.reduce((sum, i) => sum + i.amount, 0);

  res.json({ pendingJobs, completedJobs, activeCustomers, activeTechs, monthlyRevenue });
});

// @route GET /api/analytics/revenue  (line chart)
export const getRevenueByMonth = asyncHandler(async (req, res) => {
  const data = await Invoice.aggregate([
    { $match: { paymentStatus: "paid" } },
    { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$amount" } } },
    { $sort: { _id: 1 } },
  ]);
  res.json(data);
});

// @route GET /api/analytics/services  (bar chart — most requested)
export const getMostRequestedServices = asyncHandler(async (req, res) => {
  const data = await ServiceRequest.aggregate([
    { $group: { _id: "$service", count: { $sum: 1 } } },
    { $lookup: { from: "services", localField: "_id", foreignField: "_id", as: "service" } },
    { $unwind: "$service" },
    { $project: { name: "$service.name", count: 1 } },
  ]);
  res.json(data);
});

// @route GET /api/analytics/technician-performance  (bar chart — jobs completed per technician)
export const getTechnicianPerformance = asyncHandler(async (req, res) => {
  const data = await Job.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$technician", jobs: { $sum: 1 } } },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "technician" } },
    { $unwind: "$technician" },
    { $project: { name: "$technician.name", jobs: 1 } },
    { $sort: { jobs: -1 } },
  ]);
  res.json(data);
});

// @route GET /api/analytics/customer-growth  (line/area chart — new customers per month)
export const getCustomerGrowth = asyncHandler(async (req, res) => {
  const data = await User.aggregate([
    { $match: { role: "customer" } },
    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  res.json(data);
});

// @route GET /api/analytics/daily-revenue  (bar/line chart — revenue for the last 14 days)
export const getDailyRevenue = asyncHandler(async (req, res) => {
  const since = new Date();
  since.setDate(since.getDate() - 13); // last 14 days including today
  since.setHours(0, 0, 0, 0);

  const data = await Invoice.aggregate([
    { $match: { paymentStatus: "paid", updatedAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json(data);
});

// @route GET /api/analytics/maintenance-stats  (Maintenance Contract Statistics)
export const getMaintenanceStats = asyncHandler(async (req, res) => {
  const in30Days = new Date();
  in30Days.setDate(in30Days.getDate() + 30);

  const [byPlan, activeCount, expiredCount, renewingSoon] = await Promise.all([
    MaintenanceContract.aggregate([
      { $group: { _id: "$planType", count: { $sum: 1 } } },
    ]),
    MaintenanceContract.countDocuments({ status: "active" }),
    MaintenanceContract.countDocuments({ status: "expired" }),
    MaintenanceContract.countDocuments({
      status: "active",
      renewalDate: { $lte: in30Days, $gte: new Date() },
    }),
  ]);

  res.json({
    byPlan: byPlan.map((p) => ({ plan: p._id, count: p.count })),
    activeCount,
    expiredCount,
    renewingSoon,
  });
});

// @route GET /api/analytics/reports-summary  (Reports page top stat cards)
export const getReportsSummary = asyncHandler(async (req, res) => {
  const [
    totalCustomers,
    totalTechnicians,
    totalDispatchers,
    totalJobs,
    pendingJobs,
    scheduledJobs,
    inProgressJobs,
    completedJobs,
  ] = await Promise.all([
    User.countDocuments({ role: "customer" }),
    User.countDocuments({ role: "technician" }),
    User.countDocuments({ role: "dispatcher" }),
    ServiceRequest.countDocuments(),
    ServiceRequest.countDocuments({ status: "pending" }),
    ServiceRequest.countDocuments({ status: "scheduled" }),
    ServiceRequest.countDocuments({ status: "in_progress" }),
    ServiceRequest.countDocuments({ status: "completed" }),
  ]);

  res.json({
    totalCustomers,
    totalTechnicians,
    totalDispatchers,
    totalJobs,
    pendingJobs,
    scheduledJobs,
    inProgressJobs,
    completedJobs,
  });
});

// @route GET /api/analytics/job-status-distribution  (pie/donut chart)
export const getJobStatusDistribution = asyncHandler(async (req, res) => {
  const data = await ServiceRequest.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  res.json(data);
});

// @route GET /api/analytics/recent-activity  (timeline widget)
export const getRecentActivity = asyncHandler(async (req, res) => {
  const [customers, quotations, invoices, completedJobs, reviews] = await Promise.all([
    User.find({ role: "customer" }).sort({ createdAt: -1 }).limit(5).select("name createdAt"),
    Quotation.find().sort({ createdAt: -1 }).limit(5),
    Invoice.find().sort({ createdAt: -1 }).limit(5),
    Job.find({ status: "completed" })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate({ path: "request", populate: [{ path: "service", select: "name" }, { path: "customer", select: "name" }] }),
    Review.find().sort({ createdAt: -1 }).limit(5).populate("customer", "name"),
  ]);

  const activity = [
    ...customers.map((c) => ({
      type: "new_customer",
      message: `${c.name} registered as a new customer`,
      date: c.createdAt,
    })),
    ...quotations.map((q) => ({
      type: "new_quotation",
      message: `New quotation created (#${String(q._id).slice(-6)})`,
      date: q.createdAt,
    })),
    ...invoices.map((i) => ({
      type: "new_invoice",
      message: `New invoice generated (#${String(i._id).slice(-6)})`,
      date: i.createdAt,
    })),
    ...completedJobs.map((j) => ({
      type: "job_completed",
      message: `${j.request?.service?.name || "Service"} job completed for ${j.request?.customer?.name || "a customer"}`,
      date: j.updatedAt,
    })),
    ...reviews.map((r) => ({
      type: "review_submitted",
      message: `${r.customer?.name || "A customer"} submitted a ${r.rating}-star review`,
      date: r.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  res.json(activity);
});