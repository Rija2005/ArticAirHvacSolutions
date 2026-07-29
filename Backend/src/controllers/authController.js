// // src/controllers/authController.js
// import asyncHandler from "../utils/asyncHandler.js";
// import generateToken from "../utils/generateToken.js";
// import User from "../models/User.js";

// // @route POST /api/auth/register  (public — customers only)
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, phone, address, city } = req.body;
//   // role is intentionally NOT read from req.body — always forced to "customer"

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   const user = await User.create({
//     name, email, password, phone, address, city,
//     role: "customer",
//   });

//   res.status(201).json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     isFirstLogin: user.isFirstLogin,
//     token: generateToken(user._id, user.role),
//   });
// });

// // @route POST /api/auth/login
// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       isFirstLogin: user.isFirstLogin,
//       token: generateToken(user._id, user.role),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// // @route GET /api/auth/me
// export const getMe = asyncHandler(async (req, res) => {
//   res.json(req.user);
// });

// // @route POST /api/auth/change-password  (protected — used for first-login flow)
// export const changePassword = asyncHandler(async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   const user = await User.findById(req.user._id);

//   const isMatch = await user.matchPassword(currentPassword);
//   if (!isMatch) {
//     res.status(401);
//     throw new Error("Current password is incorrect");
//   }

//   user.password = newPassword; // hashed automatically by pre("save")
//   user.isFirstLogin = false;
//   await user.save();

//   res.json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     isFirstLogin: user.isFirstLogin,
//     token: generateToken(user._id, user.role),
//   });
// });


// src/controllers/authController.js
import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import { passwordResetTemplate } from "../utils/emailTemplates.js";
import User from "../models/User.js";

// @route POST /api/auth/register  (public — customers only)
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, city } = req.body;
  // role is intentionally NOT read from req.body — always forced to "customer"

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name, email, password, phone, address, city,
    role: "customer",
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isFirstLogin: user.isFirstLogin,
    token: generateToken(user._id, user.role),
  });
});

// @route POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isFirstLogin: user.isFirstLogin,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @route POST /api/auth/change-password  (protected — used for first-login flow)
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    res.status(401);
    throw new Error("Current password is incorrect");
  }

  user.password = newPassword; // hashed automatically by pre("save")
  user.isFirstLogin = false;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isFirstLogin: user.isFirstLogin,
    token: generateToken(user._id, user.role),
  });
});

// @route POST /api/auth/forgot-password  (public — customer/technician/dispatcher/admin)
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const genericMessage = "If an account exists for this email, a password reset link has been sent.";
  const user = await User.findOne({ email });

  // Always respond with the same message whether or not the account exists —
  // prevents this endpoint from being used to enumerate registered emails.
  if (!user) {
    return res.json({ message: genericMessage });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresInMinutes = 30;

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + expiresInMinutes * 60 * 1000;
  await user.save();

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resetUrl = `${clientUrl}/reset-password/${rawToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Reset your ArcticAir HVAC Solutions password",
      html: passwordResetTemplate({ name: user.name, resetUrl, expiresInMinutes }),
    });
  } catch (err) {
    // Don't leave a valid token dangling if the email failed to send
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    console.error("[EMAIL ERROR] Failed to send password reset email:", err.message);
    res.status(500);
    throw new Error("Could not send the password reset email. Please try again later.");
  }

  res.json({ message: genericMessage });
});

// @route POST /api/auth/reset-password/:token  (public)
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("This reset link is invalid or has expired");
  }

  user.password = password; // hashed automatically by pre("save")
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: "Password has been reset successfully. You can now log in." });
});