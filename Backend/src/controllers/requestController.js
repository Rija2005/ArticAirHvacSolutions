
// src/controllers/requestController.js
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import ServiceRequest from "../models/ServiceRequest.js";
import Service from "../models/Service.js";
import { notifyUser } from "./notificationController.js";


export const createRequest = asyncHandler(async (req, res) => {
  let { service, description, preferredDate, priority = "normal" } = req.body;
  const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

  if (!service) {
    res.status(400);
    throw new Error("Service is required");
  }

  let serviceId = service;
  if (!mongoose.Types.ObjectId.isValid(service)) {
    const normalizedService = String(service).replace(/-/g, " ").trim();
    const serviceDoc = await Service.findOne({ name: { $regex: new RegExp(`^${normalizedService}$`, "i") } });
    if (!serviceDoc) {
      res.status(400);
      throw new Error("Requested service is not available");
    }
    serviceId = serviceDoc._id;
  }

  const request = await ServiceRequest.create({
    customer: req.user._id,
    service: serviceId,
    description,
    preferredDate,
    images,
    priority,
  });

  await notifyUser(
    req.user._id,
    "request_confirmation",
    "We've received your service request and will be in touch shortly.",
    request._id
  );

  res.status(201).json(request);
});
export const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await ServiceRequest.find({ customer: req.user._id })
    .populate("service")
    .sort({ createdAt: -1 });
  res.json(requests);
});

export const getRequestById = asyncHandler(async (req, res) => {
  const request = await ServiceRequest.findById(req.params.id).populate("service customer");
  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }
  res.json(request);
});

export const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await ServiceRequest.find()
    .populate("service")
    .populate("customer", "name email phone")
    .sort({ createdAt: -1 });
  res.json(requests);
});

export const updateRequestStatus = asyncHandler(async (req, res) => {
  const request = await ServiceRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }
  request.status = req.body.status;
  await request.save();
  res.json(request);
});