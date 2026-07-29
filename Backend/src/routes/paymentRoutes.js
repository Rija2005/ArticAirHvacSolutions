import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createPayment, getAllPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createPayment);
router.get("/", protect, authorize("admin"), getAllPayments);

export default router;
