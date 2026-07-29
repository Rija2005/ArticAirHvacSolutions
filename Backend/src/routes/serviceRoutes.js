// src/routes/serviceRoutes.js
import express from "express";
import { getAllServices, getServiceById, createService } from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllServices); // public — guests need this for Request Quote
router.get("/:id", getServiceById);
router.post("/", protect, authorize("admin"), createService);

export default router;
