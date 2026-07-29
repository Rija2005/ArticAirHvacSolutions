

// // src/routes/analyticsRoutes.js
// import express from "express";
// import {
//   getOverview,
//   getRevenueByMonth,
//   getMostRequestedServices,
//   getTechnicianPerformance,
//   getCustomerGrowth,
//   getReportsSummary,
//   getJobStatusDistribution,
//   getRecentActivity,
// } from "../controllers/analyticsController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { authorize } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// router.get("/overview", protect, authorize("admin"), getOverview);
// router.get("/revenue", protect, authorize("admin"), getRevenueByMonth);
// router.get("/services", protect, authorize("admin"), getMostRequestedServices);
// router.get("/technician-performance", protect, authorize("admin"), getTechnicianPerformance);
// router.get("/customer-growth", protect, authorize("admin"), getCustomerGrowth);
// router.get("/reports-summary", protect, authorize("admin"), getReportsSummary);
// router.get("/job-status-distribution", protect, authorize("admin"), getJobStatusDistribution);
// router.get("/recent-activity", protect, authorize("admin"), getRecentActivity);

// export default router;

// src/routes/analyticsRoutes.js
import express from "express";
import {
  getOverview,
  getRevenueByMonth,
  getMostRequestedServices,
  getTechnicianPerformance,
  getCustomerGrowth,
  getReportsSummary,
  getJobStatusDistribution,
  getRecentActivity,
  getDailyRevenue,
  getMaintenanceStats,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/overview", protect, authorize("admin"), getOverview);
router.get("/revenue", protect, authorize("admin"), getRevenueByMonth);
router.get("/services", protect, authorize("admin"), getMostRequestedServices);
router.get("/technician-performance", protect, authorize("admin"), getTechnicianPerformance);
router.get("/customer-growth", protect, authorize("admin"), getCustomerGrowth);
router.get("/reports-summary", protect, authorize("admin"), getReportsSummary);
router.get("/job-status-distribution", protect, authorize("admin"), getJobStatusDistribution);
router.get("/recent-activity", protect, authorize("admin"), getRecentActivity);
router.get("/daily-revenue", protect, authorize("admin"), getDailyRevenue);
router.get("/maintenance-stats", protect, authorize("admin"), getMaintenanceStats);

export default router;