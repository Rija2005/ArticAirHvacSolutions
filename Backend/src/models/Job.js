
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true, unique: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
dispatcher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scheduledDate: { type: Date },
    reminderSent: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["assigned", "in_progress", "completed"],
      default: "assigned",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);