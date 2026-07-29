// src/routes/reportRoutes.js
import express from "express";
import { createReport, getAllReports, getReportByJob } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("technician"),
  upload.fields([
    { name: "beforeImages", maxCount: 5 },
    { name: "afterImages", maxCount: 5 },
  ]),
  createReport
);
router.get("/", protect, authorize("admin"), getAllReports);
router.get("/:jobId", protect, getReportByJob);

export default router;