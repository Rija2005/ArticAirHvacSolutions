// src/models/Invoice.js
import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true, unique: true },
    quotation: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation", required: true },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);