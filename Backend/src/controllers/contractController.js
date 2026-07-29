// src/controllers/contractController.js
import asyncHandler from "../utils/asyncHandler.js";
import MaintenanceContract from "../models/MaintenanceContract.js";

export const createContract = asyncHandler(async (req, res) => {
  const { customer, planType, startDate, renewalDate } = req.body;
  const contract = await MaintenanceContract.create({ customer, planType, startDate, renewalDate });
  res.status(201).json(contract);
});

export const getAllContracts = asyncHandler(async (req, res) => {
  const contracts = await MaintenanceContract.find().populate("customer", "name email");
  res.json(contracts);
});

export const getMyContracts = asyncHandler(async (req, res) => {
  const contracts = await MaintenanceContract.find({ customer: req.user._id });
  res.json(contracts);
});

export const renewContract = asyncHandler(async (req, res) => {
  const contract = await MaintenanceContract.findById(req.params.id);
  const oneYearLater = new Date(contract.renewalDate);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  contract.renewalDate = oneYearLater;
  contract.status = "active";
  await contract.save();
  res.json(contract);
});