// src/controllers/paymentController.js
import asyncHandler from "../utils/asyncHandler.js";
import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";

// @route POST /api/payments  (admin — record a payment)
export const createPayment = asyncHandler(async (req, res) => {
  const { invoice, amount, method } = req.body;
  const payment = await Payment.create({ invoice, amount, method });

  // Auto-update invoice status
  const inv = await Invoice.findById(invoice);
  const totalPaid = (await Payment.find({ invoice })).reduce((sum, p) => sum + p.amount, 0);
  inv.paymentStatus = totalPaid >= inv.amount ? "paid" : "partial";
  await inv.save();

  res.status(201).json(payment);
});

// @route GET /api/payments  (admin)
export const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate("invoice").sort({ paidAt: -1 });
  res.json(payments);
});