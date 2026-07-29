// // src/models/MaintenanceContract.js
// import mongoose from "mongoose";

// const maintenanceContractSchema = new mongoose.Schema(
//   {
//     customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     planType: { type: String, enum: ["basic", "standard", "premium"], required: true },
//     startDate: { type: Date, required: true },
//     renewalDate: { type: Date, required: true },
//     status: { type: String, enum: ["active", "expired"], default: "active" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("MaintenanceContract", maintenanceContractSchema);

// src/models/MaintenanceContract.js
import mongoose from "mongoose";

const maintenanceContractSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    planType: { type: String, enum: ["basic", "standard", "premium"], required: true },
    startDate: { type: Date, required: true },
    renewalDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
    reminderSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("MaintenanceContract", maintenanceContractSchema);