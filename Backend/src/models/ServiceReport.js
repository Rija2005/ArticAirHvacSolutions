// src/models/ServiceReport.js
import mongoose from "mongoose";

const serviceReportSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true, unique: true },
    notes: { type: String },
    beforeImages: [{ type: String }],
    afterImages: [{ type: String }],
    customerSignature: { type: String }, // stores signature image/base64
  },
  { timestamps: true }
);

export default mongoose.model("ServiceReport", serviceReportSchema);