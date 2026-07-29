// // src/routes/notificationRoutes.js
// import express from "express";
// import { getMyNotifications, markAsRead, getAllNotifications } from "../controllers/notificationController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { authorize } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// router.get("/my", protect, getMyNotifications);
// router.get("/", protect, authorize("admin"), getAllNotifications);
// router.patch("/:id/read", protect, markAsRead);

// export default router;
// src/routes/notificationRoutes.js
import express from "express";
import { 
  getMyNotifications, 
  markAsRead, 
  getAllNotifications 
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🔒 Step 1: Har Route par Logged-in hona zaroori hai
router.use(protect);

// 📌 Route 1: Direct `/api/notifications` se har user apni notifications fetch kar sakega
// Isme humne `authorize("admin")` hata diya hai
router.get("/", getMyNotifications);

// 📌 Route 2: `/api/notifications/my` ko alternate fallback ke roop me rakha hai
router.get("/my", getMyNotifications);

// 📌 Route 3: System Wide All Notifications (Sirf Admin Access kar sakta hai)
router.get("/admin/all", authorize("admin"), getAllNotifications);

// 📌 Route 4: Mark as Read (PATCH & PUT dono support ke sath)
router.patch("/:id/read", markAsRead);
router.put("/:id/read", markAsRead);

export default router;