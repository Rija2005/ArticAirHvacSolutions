// src/controllers/notificationController.js
import asyncHandler from "../utils/asyncHandler.js";
import Notification from "../models/Notification.js";

// @route GET /api/notifications/my
export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
});

// @route GET /api/notifications  (admin — all notifications, for the log view)
export const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(100);
  res.json(notifications);
});

// @route PATCH /api/notifications/:id/read
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  notification.isRead = true;
  await notification.save();
  res.json(notification);
});

// Internal helper — call this from OTHER controllers to create notifications
export const notifyUser = async (
  userId,
  type,
  message,
  request = null,
  job = null
) => {
  await Notification.create({
    user: userId,
    type,
    message,
    request,
    job,
  });
};
