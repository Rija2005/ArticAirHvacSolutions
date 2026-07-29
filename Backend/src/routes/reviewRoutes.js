// src/routes/reviewRoutes.js
import express from "express";
import {
  createReview, getPublicReviews, getAllReviews, toggleReviewVisibility, getMyReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/public", getPublicReviews); // public, no auth — Testimonials page needs this
router.post("/", protect, authorize("customer"), createReview);
router.get("/my", protect, authorize("customer"), getMyReviews);
router.get("/", protect, authorize("admin"), getAllReviews);
router.patch("/:id/visibility", protect, authorize("admin"), toggleReviewVisibility);

export default router;