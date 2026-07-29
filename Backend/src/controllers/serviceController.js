// src/controllers/serviceController.js
import asyncHandler from "../utils/asyncHandler.js";
import Service from "../models/Service.js";

// @route GET /api/services  (public — guests need to see services too)
export const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json(services);
  } catch (err) {
    console.error("[getAllServices] Failed to fetch services:", err.message);
    throw err; // re-throw so asyncHandler still forwards it to errorHandler
  }
});

// @route GET /api/services/:id
export const getServiceById = asyncHandler(async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }
    res.json(service);
  } catch (err) {
    console.error(`[getServiceById] Failed to fetch service ${req.params.id}:`, err.message);
    throw err;
  }
});

// @route POST /api/services  (admin — add a new service to the catalog)
export const createService = asyncHandler(async (req, res) => {
  try {
    const { name, description, basePrice } = req.body;
    const service = await Service.create({ name, description, basePrice });
    res.status(201).json(service);
  } catch (err) {
    console.error("[createService] Failed to create service:", err.message);
    throw err;
  }
});
