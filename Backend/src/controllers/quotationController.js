

// src/controllers/quotationController.js
import asyncHandler from "../utils/asyncHandler.js";
import Quotation from "../models/Quotation.js";
import User from "../models/User.js";
import { notifyUser } from "./notificationController.js";


// @route POST /api/quotations  (admin — generate)
export const createQuotation = asyncHandler(async (req, res) => {
  const { request, laborCost, equipmentCost, tax, discount } = req.body;
  const quotation = await Quotation.create({ request, laborCost, equipmentCost, tax, discount });
  res.status(201).json(quotation);
});

// @route GET /api/quotations  (admin — all)
export const getAllQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find().populate({
    path: "request",
    populate: ["service", "customer"],
  });
  res.json(quotations);
});

export const getMyQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find()
    .populate({ path: "request", match: { customer: req.user._id }, populate: "service" });
  res.json(quotations.filter((q) => q.request));
});
// @route PATCH /api/quotations/:id  (customer accepts/rejects)
export const respondToQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);
  if (!quotation) {
    res.status(404);
    throw new Error("Quotation not found");
  }
  quotation.approvalStatus = req.body.status; // "accepted" | "rejected"
  await quotation.save();

  const admins = await User.find({ role: "admin" });
  for (const admin of admins) {
    await notifyUser(
      admin._id,
      "quotation_approval",
      `A customer has ${req.body.status} a quotation.`
    );
  }

  res.json(quotation);
});