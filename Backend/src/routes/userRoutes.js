// src/routes/userRoutes.js
import express from "express";
import {
  getUsersByRole, getAvailableTechnicians, updateAvailability,
  createUserByAdmin, deleteUser, updateMyProfile, updateUserByAdmin, getDispatchersWithStats
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/dispatchers", protect, authorize("admin"), getDispatchersWithStats);
router.get("/technicians/available", protect, authorize("dispatcher", "admin"), getAvailableTechnicians);
router.get("/", protect, authorize("admin", "dispatcher"), getUsersByRole);
router.post("/", protect, authorize("admin"), createUserByAdmin);
router.patch("/me", protect, updateMyProfile);
router.patch("/:id/availability", protect, authorize("technician"), updateAvailability);
router.patch("/:id", protect, authorize("admin"), updateUserByAdmin);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
