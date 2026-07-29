// // src/models/User.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true },
//     phone: { type: String },
//     role: {
//       type: String,
//       enum: ["customer", "technician", "dispatcher", "admin"],
//       required: true,
//     },
//     profileImage: { type: String, default: "" },
//     address: { type: String },
//     city: { type: String },
//     isVerified: { type: Boolean, default: false },

//     // Technician-only fields, unused/empty on other roles
//     specialization: { type: String },
//     area: { type: String },
//     availabilityStatus: {
//       type: String,
//       enum: ["available", "busy", "off_duty"],
//       default: "available",
//     },

//     // First-login flow (replaces the earlier invite-token approach)
//     isFirstLogin: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", userSchema);

// src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["customer", "technician", "dispatcher", "admin"],
      required: true,
    },
    profileImage: { type: String, default: "" },
    address: { type: String },
    city: { type: String },
    isVerified: { type: Boolean, default: false },

    // Technician-only fields, unused/empty on other roles
    specialization: { type: String },
    area: { type: String },
    availabilityStatus: {
      type: String,
      enum: ["available", "busy", "off_duty"],
      default: "available",
    },

    // First-login flow (replaces the earlier invite-token approach)
    isFirstLogin: { type: Boolean, default: false },

    // Forgot/reset password flow — token is stored as a SHA-256 hash, never in plain text
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);