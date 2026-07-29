// src/routes/quotationRoutes.js
import express from "express";
import {
  createQuotation, getAllQuotations, getMyQuotations, respondToQuotation,
} from "../controllers/quotationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createQuotation);
router.get("/", protect, authorize("admin"), getAllQuotations);
router.get("/my", protect, authorize("customer"), getMyQuotations);
router.patch("/:id", protect, authorize("customer"), respondToQuotation);

export default router;