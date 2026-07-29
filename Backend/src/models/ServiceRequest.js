// src/models/ServiceRequest.js
import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    description: { type: String },
    preferredDate: { type: Date },
    images: [{ type: String }], // stores file paths/URLs
    status: {
      type: String,
      enum: ["pending", "scheduled", "in_progress", "completed", "rejected"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["normal", "emergency"],
      default: "normal",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);