// // src/controllers/reportController.js
// import asyncHandler from "../utils/asyncHandler.js";
// import ServiceReport from "../models/ServiceReport.js";
// import Job from "../models/Job.js";
// export const createReport = asyncHandler(async (req, res) => {
//   const { job, notes, customerSignature } = req.body;

//   const beforeImages = req.files?.beforeImages?.map((f) => `/uploads/${f.filename}`) || [];
//   const afterImages = req.files?.afterImages?.map((f) => `/uploads/${f.filename}`) || [];


// const existingReport = await ServiceReport.findOne({ job });

// if (existingReport) {
//   existingReport.notes = notes;
//   existingReport.beforeImages = beforeImages;
//   existingReport.afterImages = afterImages;
//   existingReport.customerSignature = customerSignature;

//   await existingReport.save();

//   return res.json(existingReport);
// }

// const report = await ServiceReport.create({
//   job,
//   notes,
//   beforeImages,
//   afterImages,
//   customerSignature,
// });

// res.status(201).json(report);

// });




// export const getReportByJob = asyncHandler(async (req, res) => {
//   let jobId = req.params.jobId;

//   // Agar request id pass hui ho
//   const job = await Job.findOne({ request: jobId });

//   if (job) {
//     jobId = job._id;
//   }

//   const report = await ServiceReport.findOne({ job: jobId });

//   if (!report) {
//     res.status(404);
//     throw new Error("Service report not found");
//   }

//   res.json(report);
// });

// src/controllers/reportController.js
import asyncHandler from "../utils/asyncHandler.js";
import ServiceReport from "../models/ServiceReport.js";
import Job from "../models/Job.js";
export const createReport = asyncHandler(async (req, res) => {
  const { job, notes, customerSignature } = req.body;

  const beforeImages = req.files?.beforeImages?.map((f) => `/uploads/${f.filename}`) || [];
  const afterImages = req.files?.afterImages?.map((f) => `/uploads/${f.filename}`) || [];


const existingReport = await ServiceReport.findOne({ job });

if (existingReport) {
  existingReport.notes = notes;
  existingReport.beforeImages = beforeImages;
  existingReport.afterImages = afterImages;
  existingReport.customerSignature = customerSignature;

  await existingReport.save();

  return res.json(existingReport);
}

const report = await ServiceReport.create({
  job,
  notes,
  beforeImages,
  afterImages,
  customerSignature,
});

res.status(201).json(report);

});




// @route GET /api/reports  (admin — all service reports with full detail for Reports page)
export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await ServiceReport.find()
    .populate({
      path: "job",
      populate: [
        { path: "technician", select: "name email" },
        { path: "dispatcher", select: "name email" },
        {
          path: "request",
          populate: [
            { path: "service", select: "name" },
            { path: "customer", select: "name email" },
          ],
        },
      ],
    })
    .sort({ createdAt: -1 });

  res.json(reports);
});

export const getReportByJob = asyncHandler(async (req, res) => {
  let jobId = req.params.jobId;

  // Agar request id pass hui ho
  const job = await Job.findOne({ request: jobId });

  if (job) {
    jobId = job._id;
  }

  const report = await ServiceReport.findOne({ job: jobId });

  if (!report) {
    res.status(404);
    throw new Error("Service report not found");
  }

  res.json(report);
});