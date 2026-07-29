// src/routes/jobRoutes.js
import express from "express";
import { createJob, getMyJobs, getAllJobs, updateJobStatus } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("dispatcher"), createJob);
router.get("/my", protect, authorize("technician"), getMyJobs);
router.get("/", protect, authorize("dispatcher", "admin"), getAllJobs);
router.patch("/:id/status", protect, authorize("technician"), updateJobStatus);

export default router;