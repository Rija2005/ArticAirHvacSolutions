
// // src/controllers/reportController.js
// import mongoose from "mongoose";
// import asyncHandler from "../utils/asyncHandler.js";
// import ServiceReport from "../models/ServiceReport.js";
// import Job from "../models/Job.js";

// const resolveJobId = async (value) => {
//   if (!value) return null;

//   if (mongoose.Types.ObjectId.isValid(value)) {
//     const jobById = await Job.findById(value);
//     if (jobById) return jobById._id;

//     const jobByRequest = await Job.findOne({ request: value });
//     if (jobByRequest) return jobByRequest._id;

//     return value;
//   }

//   const jobByRequest = await Job.findOne({ request: value });
//   if (jobByRequest) return jobByRequest._id;

//   return value;
// };

// export const createReport = asyncHandler(async (req, res) => {
//   const { job, notes, customerSignature } = req.body;

//   const beforeImages = req.files?.beforeImages?.map((f) => f.path) || [];
//   const afterImages = req.files?.afterImages?.map((f) => f.path) || [];
//   const resolvedJobId = await resolveJobId(job);
// console.log("BODY:", req.body);
// console.log("FILES:", req.files);

// if (req.files) {
//   console.log("Before:", req.files.beforeImages);
//   console.log("After:", req.files.afterImages);
// }
//   const existingReport = await ServiceReport.findOne({ job: resolvedJobId });

//   if (existingReport) {
//     existingReport.notes = notes;
//     existingReport.beforeImages = beforeImages;
//     existingReport.afterImages = afterImages;
//     existingReport.customerSignature = customerSignature;

//     await existingReport.save();

//     return res.json(existingReport);
//   }

//   const report = await ServiceReport.create({
//     job: resolvedJobId,
//     notes,
//     beforeImages,
//     afterImages,
//     customerSignature,
//   });

//   return res.status(201).json(report);
// });




// // @route GET /api/reports  (admin — all service reports with full detail for Reports page)
// export const getAllReports = asyncHandler(async (req, res) => {
//   const reports = await ServiceReport.find()
//     .populate({
//       path: "job",
//       populate: [
//         { path: "technician", select: "name email" },
//         { path: "dispatcher", select: "name email" },
//         {
//           path: "request",
//           populate: [
//             { path: "service", select: "name" },
//             { path: "customer", select: "name email" },
//           ],
//         },
//       ],
//     })
//     .sort({ createdAt: -1 });

//   res.json(reports);
// });

// export const getReportByJob = asyncHandler(async (req, res) => {
//   const incomingId = req.params.jobId;

//   if (mongoose.Types.ObjectId.isValid(incomingId)) {
//     const reportById = await ServiceReport.findById(incomingId);
//     if (reportById) {
//       return res.json(reportById);
//     }
//   }

//   let resolvedJobId = null;

//   // Support Request ID and Job ID.
//   const jobByRequest = await Job.findOne({ request: incomingId });
//   if (jobByRequest) {
//     resolvedJobId = jobByRequest._id;
//   } else if (mongoose.Types.ObjectId.isValid(incomingId)) {
//     const jobById = await Job.findById(incomingId);
//     if (jobById) {
//       resolvedJobId = jobById._id;
//     }
//   }

//   if (!resolvedJobId) {
//     return res.status(200).json(null);
//   }

//   const report = await ServiceReport.findOne({ job: resolvedJobId });

//   if (!report) {
//     return res.status(200).json(null);
//   }

//   return res.json(report);
// });
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ServiceReport from "../models/ServiceReport.js";
import Job from "../models/Job.js";

const resolveJobId = async (value) => {
  if (!value) return null;

  if (mongoose.Types.ObjectId.isValid(value)) {
    const jobById = await Job.findById(value);
    if (jobById) return jobById._id;

    const jobByRequest = await Job.findOne({ request: value });
    if (jobByRequest) return jobByRequest._id;

    return value;
  }

  const jobByRequest = await Job.findOne({ request: value });
  if (jobByRequest) return jobByRequest._id;

  return value;
};

// 1️⃣ Create or Update Report
export const createReport = asyncHandler(async (req, res) => {
  const { job, notes, customerSignature } = req.body;

  const newBeforeImages = req.files?.beforeImages?.map((f) => f.path || f.secure_url || f.url) || [];
  const newAfterImages = req.files?.afterImages?.map((f) => f.path || f.secure_url || f.url) || [];

  const resolvedJobId = await resolveJobId(job);

  let existingReport = await ServiceReport.findOne({ job: resolvedJobId });

  if (existingReport) {
    existingReport.notes = notes !== undefined ? notes : existingReport.notes;
    existingReport.customerSignature = customerSignature || existingReport.customerSignature;

    if (newBeforeImages.length > 0) {
      existingReport.beforeImages = newBeforeImages;
    }
    if (newAfterImages.length > 0) {
      existingReport.afterImages = newAfterImages;
    }

    await existingReport.save();
    return res.json(existingReport);
  }

  const report = await ServiceReport.create({
    job: resolvedJobId,
    notes,
    beforeImages: newBeforeImages,
    afterImages: newAfterImages,
    customerSignature,
  });

  return res.status(201).json(report);
});

// 2️⃣ Get All Service Reports (Missing Function Added)
export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await ServiceReport.find()
    .populate({
      path: "job",
      populate: [
        { path: "request", populate: [{ path: "customer" }, { path: "service" }] },
        { path: "technician" },
        { path: "dispatcher" },
      ],
    })
    .sort({ createdAt: -1 });

  res.json(reports);
});

// 3️⃣ Get Report By Job / Request ID (Missing Function Added)
export const getReportByJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const resolvedJobId = await resolveJobId(jobId);

  const report = await ServiceReport.findOne({ job: resolvedJobId }).populate({
    path: "job",
    populate: [
      { path: "request", populate: [{ path: "customer" }, { path: "service" }] },
      { path: "technician" },
    ],
  });

  if (!report) {
    return res.status(404).json({ message: "Service report not found for this job." });
  }

  res.json(report);
});