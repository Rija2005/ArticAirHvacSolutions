// src/routes/requestRoutes.js
import express from "express";
import {
  createRequest, getMyRequests, getRequestById, getAllRequests, updateRequestStatus,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.post("/", protect, authorize("customer"), upload.array("images", 5), createRequest);
router.get("/my", protect, authorize("customer"), getMyRequests);
router.get("/", protect, authorize("dispatcher", "admin"), getAllRequests);
router.get("/:id", protect, getRequestById);
router.patch("/:id/status", protect, authorize("dispatcher", "admin"), updateRequestStatus);
export default router;