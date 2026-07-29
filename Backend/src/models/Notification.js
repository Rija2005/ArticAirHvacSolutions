import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    isRead: { type: Boolean, default: false },

  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
