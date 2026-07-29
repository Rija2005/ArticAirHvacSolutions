// src/models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    request: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true, unique: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    isPublic: { type: Boolean, default: false }, // admin approves before it shows on Testimonials page
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);