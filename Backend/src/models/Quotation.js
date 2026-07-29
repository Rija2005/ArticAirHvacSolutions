// src/models/Quotation.js
import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true, unique: true },
    laborCost: { type: Number, default: 0 },
    equipmentCost: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    approvalStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Virtual field — computed automatically, not stored in DB
quotationSchema.virtual("total").get(function () {
  return this.laborCost + this.equipmentCost + this.tax - this.discount;
});

quotationSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Quotation", quotationSchema);