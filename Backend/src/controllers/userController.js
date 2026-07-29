// // src/controllers/userController.js
// import crypto from "crypto";
// import User from "../models/User.js";
// import Job from "../models/Job.js";
// import asyncHandler from "../utils/asyncHandler.js";

// // @route GET /api/users?role=technician  (admin)
// export const getUsersByRole = asyncHandler(async (req, res) => {
//   const filter = req.query.role ? { role: req.query.role } : {};
//   const users = await User.find(filter).select("-password");
//   res.json(users);
// });

// // @route POST /api/users  (admin creates technician/dispatcher/admin accounts)
// export const createUserByAdmin = asyncHandler(async (req, res) => {
//   const { name, email, phone, role, area, specialization } = req.body;

//   if (!["technician", "dispatcher", "admin"].includes(role)) {
//     res.status(400);
//     throw new Error("Invalid role for employee account");
//   }

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("A user with this email already exists");
//   }

//   // Generate a readable temp password (e.g. "Kx9#mQ2p")
//   const tempPassword = crypto.randomBytes(6).toString("base64").slice(0, 8);

//   const user = await User.create({
//     name, email, phone, role, area, specialization,
//     password: tempPassword, // hashed automatically by the model
//     isFirstLogin: true,
//   });

//   res.status(201).json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     tempPassword, // plain text — shown to admin ONCE, never stored or returned again
//   });
// });

// // @route GET /api/users/technicians/available  (dispatcher/admin)
// export const getAvailableTechnicians = asyncHandler(async (req, res) => {
//   const technicians = await User.find({ role: "technician", availabilityStatus: "available" }).select("-password");
//   res.json(technicians);
// });

// // @route PATCH /api/users/:id/availability  (technician)
// export const updateAvailability = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   user.availabilityStatus = req.body.availabilityStatus;
//   await user.save();
//   res.json(user);
// });

// // @route DELETE /api/users/:id  (admin)
// export const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   await user.deleteOne();
//   res.json({ message: "User removed" });
// });

// // @route PATCH /api/users/:id  (admin — edit any employee's details)
// export const updateUserByAdmin = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   const { name, email, phone, area, specialization, availabilityStatus } = req.body;
//   user.name = name ?? user.name;
//   user.email = email ?? user.email;
//   user.phone = phone ?? user.phone;
//   user.area = area ?? user.area;
//   user.specialization = specialization ?? user.specialization;
//   if (availabilityStatus) user.availabilityStatus = availabilityStatus;

//   const updated = await user.save();
//   res.json({
//     _id: updated._id,
//     name: updated.name,
//     email: updated.email,
//     role: updated.role,
//     phone: updated.phone,
//     area: updated.area,
//     specialization: updated.specialization,
//     availabilityStatus: updated.availabilityStatus,
//   });
// });

// // @route GET /api/users/dispatchers  (admin — dispatcher list with assignment stats)
// export const getDispatchersWithStats = asyncHandler(async (req, res) => {
//   const dispatchers = await User.find({ role: "dispatcher" }).select("-password").lean();

//   const stats = await Job.aggregate([
//     { $match: { dispatcher: { $ne: null } } },
//     {
//       $group: {
//         _id: "$dispatcher",
//         requestsAssigned: { $sum: 1 },
//         jobsScheduled: { $sum: { $cond: [{ $ne: ["$status", "completed"] }, 1, 0] } },
//       },
//     },
//   ]);

//   const statsMap = {};
//   stats.forEach((s) => {
//     statsMap[String(s._id)] = s;
//   });

//   const result = dispatchers.map((d) => ({
//     ...d,
//     requestsAssigned: statsMap[String(d._id)]?.requestsAssigned || 0,
//     jobsScheduled: statsMap[String(d._id)]?.jobsScheduled || 0,
//   }));

//   res.json(result);
// });

// // src/controllers/userController.js — add this function
// export const updateMyProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const { name, phone, address, city } = req.body;

//   user.name = name ?? user.name;
//   user.phone = phone ?? user.phone;
//   user.address = address ?? user.address;
//   user.city = city ?? user.city;

//   const updated = await user.save();
//   res.json({
//     _id: updated._id, name: updated.name, email: updated.email,
//     role: updated.role, phone: updated.phone, address: updated.address, city: updated.city,
//   });
// });

// src/controllers/userController.js
import crypto from "crypto";
import User from "../models/User.js";
import Job from "../models/Job.js";
import ServiceRequest from "../models/ServiceRequest.js";
import asyncHandler from "../utils/asyncHandler.js";

// @route GET /api/users?role=technician  (admin)
export const getUsersByRole = asyncHandler(async (req, res) => {
  const filter = req.query.role ? { role: req.query.role } : {};
  const users = await User.find(filter).select("-password").lean();

  // Customer Management needs a per-customer service-request count. This was
  // previously missing entirely, so the "Requests" column always showed 0.
  if (req.query.role === "customer") {
    const counts = await ServiceRequest.aggregate([
      { $group: { _id: "$customer", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));
    const withRequests = users.map((u) => ({ ...u, requests: countMap.get(String(u._id)) || 0 }));
    return res.json(withRequests);
  }

  res.json(users);
});

// @route POST /api/users  (admin creates technician/dispatcher/admin accounts)
export const createUserByAdmin = asyncHandler(async (req, res) => {
  const { name, email, phone, role, area, specialization } = req.body;

  if (!["technician", "dispatcher", "admin"].includes(role)) {
    res.status(400);
    throw new Error("Invalid role for employee account");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user with this email already exists");
  }

  // Generate a readable temp password (e.g. "Kx9#mQ2p")
  const tempPassword = crypto.randomBytes(6).toString("base64").slice(0, 8);

  const user = await User.create({
    name, email, phone, role, area, specialization,
    password: tempPassword, // hashed automatically by the model
    isFirstLogin: true,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    tempPassword, // plain text — shown to admin ONCE, never stored or returned again
  });
});

// @route GET /api/users/technicians/available  (dispatcher/admin)
export const getAvailableTechnicians = asyncHandler(async (req, res) => {
  const technicians = await User.find({ role: "technician", availabilityStatus: "available" }).select("-password");
  res.json(technicians);
});

// @route PATCH /api/users/:id/availability  (technician)
export const updateAvailability = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.availabilityStatus = req.body.availabilityStatus;
  await user.save();
  res.json(user);
});

// @route DELETE /api/users/:id  (admin)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ message: "User removed" });
});

// @route PATCH /api/users/:id  (admin — edit any employee's details)
export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, email, phone, area, specialization, availabilityStatus } = req.body;
  user.name = name ?? user.name;
  user.email = email ?? user.email;
  user.phone = phone ?? user.phone;
  user.area = area ?? user.area;
  user.specialization = specialization ?? user.specialization;
  if (availabilityStatus) user.availabilityStatus = availabilityStatus;

  const updated = await user.save();
  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    phone: updated.phone,
    area: updated.area,
    specialization: updated.specialization,
    availabilityStatus: updated.availabilityStatus,
  });
});

// @route GET /api/users/dispatchers  (admin — dispatcher list with assignment stats)
export const getDispatchersWithStats = asyncHandler(async (req, res) => {
  const dispatchers = await User.find({ role: "dispatcher" }).select("-password").lean();

  const stats = await Job.aggregate([
    { $match: { dispatcher: { $ne: null } } },
    {
      $group: {
        _id: "$dispatcher",
        requestsAssigned: { $sum: 1 },
        jobsScheduled: { $sum: { $cond: [{ $ne: ["$status", "completed"] }, 1, 0] } },
      },
    },
  ]);

  const statsMap = {};
  stats.forEach((s) => {
    statsMap[String(s._id)] = s;
  });

  const result = dispatchers.map((d) => ({
    ...d,
    requestsAssigned: statsMap[String(d._id)]?.requestsAssigned || 0,
    jobsScheduled: statsMap[String(d._id)]?.jobsScheduled || 0,
  }));

  res.json(result);
});

// src/controllers/userController.js — add this function
export const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, phone, address, city } = req.body;

  user.name = name ?? user.name;
  user.phone = phone ?? user.phone;
  user.address = address ?? user.address;
  user.city = city ?? user.city;

  const updated = await user.save();
  res.json({
    _id: updated._id, name: updated.name, email: updated.email,
    role: updated.role, phone: updated.phone, address: updated.address, city: updated.city,
  });
});