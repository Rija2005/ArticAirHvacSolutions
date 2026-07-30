
import asyncHandler from "../utils/asyncHandler.js";
import Invoice from "../models/Invoice.js";
import Job from "../models/Job.js";
import Quotation from "../models/Quotation.js";
import Payment from "../models/Payment.js";
import { notifyUser } from "./notificationController.js";


// @route POST /api/invoices  (admin — generate from an accepted quotation)
export const createInvoice = asyncHandler(async (req, res) => {
  const { quotation, amount } = req.body;

  const quotationDoc = await Quotation.findById(quotation);
  if (!quotationDoc) {
    res.status(404);
    throw new Error("Quotation not found");
  }

  // Derive the job server-side from the quotation's linked request — the frontend
  // has no reliable way to know the job id (ServiceRequest has no `job` field),
  // so trusting a client-supplied `job` id here previously stored the wrong
  // document reference on every invoice.
  const job = await Job.findOne({ request: quotationDoc.request });
  if (!job) {
    res.status(400);
    throw new Error("No job found for this quotation's request yet");
  }

  const existingInvoice = await Invoice.findOne({ job: job._id });
  if (existingInvoice) {
    res.status(400);
    throw new Error("An invoice already exists for this job");
  }

  const invoice = await Invoice.create({ job: job._id, quotation, amount });

  const populatedJob = await Job.findById(job._id).populate("request", "customer");
  if (populatedJob?.request?.customer) {
    await notifyUser(
      populatedJob.request.customer,
      "invoice_generated",
      `An invoice for $${amount} has been generated for your service.`
    );
  }

  res.status(201).json(invoice);
});

// @route GET /api/invoices  (admin — all)
export const getAllInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find()
    .populate({ path: "job", populate: { path: "request", populate: ["service", "customer"] } });
  res.json(invoices);
});

export const getMyInvoices = asyncHandler(async (req, res) => {
  const myJobs = await Job.find().populate({ path: "request", match: { customer: req.user._id } });
  const jobIds = myJobs.filter((j) => j.request).map((j) => j._id);
  const invoices = await Invoice.find({ job: { $in: jobIds } }).populate("job");
  res.json(invoices);
});

// @route PATCH /api/invoices/:id/pay  (admin — quick "mark fully paid" shortcut)
export const markInvoicePaid = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }

  if (invoice.paymentStatus === "paid") {
    res.status(400);
    throw new Error("Invoice is already fully paid");
  }

  const totalPaid = (await Payment.find({ invoice: invoice._id })).reduce((sum, p) => sum + p.amount, 0);
  const remaining = invoice.amount - totalPaid;

  // Previously this shortcut only flipped `paymentStatus` with no Payment record,
  // so it never showed up in the Payments page/history. Now it books the
  // outstanding balance as a real payment so both paths stay consistent.
  if (remaining > 0) {
    await Payment.create({ invoice: invoice._id, amount: remaining, method: "cash" });
  }

  invoice.paymentStatus = "paid";
  await invoice.save();
  res.json(invoice);
});