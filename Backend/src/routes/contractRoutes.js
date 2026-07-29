// src/routes/contractRoutes.js
import express from "express";
import { createContract, getAllContracts, getMyContracts, renewContract } from "../controllers/contractController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createContract);
router.get("/", protect, authorize("admin"), getAllContracts);
router.get("/my", protect, authorize("customer"), getMyContracts);
router.patch("/:id/renew", protect, authorize("customer"), renewContract);

export default router;