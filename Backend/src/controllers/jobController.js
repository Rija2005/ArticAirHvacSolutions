
// src/controllers/jobController.js
import asyncHandler from "../utils/asyncHandler.js";
import Job from "../models/Job.js";
import ServiceRequest from "../models/ServiceRequest.js";
import User from "../models/User.js";
import { notifyUser } from "./notificationController.js";

export const createJob = asyncHandler(async (req, res) => {
  const { request, technician, scheduledDate } = req.body;

  // 1. Job create karein
  const job = await Job.create({
    request,
    technician,
    dispatcher: req.user._id,
    scheduledDate: scheduledDate || new Date(),
  });

  // 2. Service Request ka status scheduled karein
  const serviceRequest = await ServiceRequest.findByIdAndUpdate(request, {
    status: "scheduled",
  });

  // 🔴 FIX: Date format karke notification me bhejein
  const formattedDate = new Date(job.scheduledDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  // 3. Technician Assignment notifications (with Date)
  if (technician) {
    await notifyUser(
      technician,
      "technician_assignment",
      `You've been assigned a new job scheduled for ${formattedDate}. Check your schedule for details.`,
      request,
      job._id
    );
  }

  // 4. Customer notification
  if (serviceRequest) {
    await notifyUser(
      serviceRequest.customer,
      "technician_assignment",
      `A technician has been assigned to your service request for ${formattedDate}.`,
      request,
      job._id
    );
  }

  res.status(201).json(job);
});

export const getMyJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ technician: req.user._id })
    .populate({ 
      path: "request", 
      populate: ["service", { path: "customer", select: "name email phone address" }] 
    })
    .sort({ scheduledDate: 1 }); // 👈 Exact chronological order
    
  res.json(jobs);
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find()
    .populate("technician", "name email")
    .populate({ 
      path: "request", 
      populate: [{ path: "service" }, { path: "customer", select: "name email phone address" }] 
    });
    
  res.json(jobs);
});

export const updateJobStatus = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("request");

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  job.status = req.body.status;
  await job.save();

  // Update service request status
  await ServiceRequest.findByIdAndUpdate(job.request._id, {
    status: req.body.status,
  });

  // When technician starts work
  if (req.body.status === "in_progress") {
    await User.findByIdAndUpdate(job.technician, {
      availabilityStatus: "busy",
    });
  }

  // When technician finishes work
  if (req.body.status === "completed") {
    // Technician available again
    await User.findByIdAndUpdate(job.technician, {
      availabilityStatus: "available",
    });

    // Customer notification
    await notifyUser(
      job.request.customer,
      "review_request",
      "Your HVAC service has been completed. Please leave a review."
    );

    // Dispatcher notification
    await notifyUser(
      job.dispatcher,
      "job_completed",
      "A technician has completed an assigned job."
    );

    // Admin notification
    const admins = await User.find({ role: "admin" });

    for (const admin of admins) {
      await notifyUser(
        admin._id,
        "job_completed",
        "A service job has been completed."
      );
    }
  }

  res.json(job);
});