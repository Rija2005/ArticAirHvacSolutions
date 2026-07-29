// src/routes/invoiceRoutes.js
import express from "express";
import { createInvoice, getAllInvoices, getMyInvoices, markInvoicePaid } from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createInvoice);
router.get("/", protect, authorize("admin"), getAllInvoices);
router.get("/my", protect, authorize("customer"), getMyInvoices);
router.patch("/:id/pay", protect, authorize("admin"), markInvoicePaid);

export default router;