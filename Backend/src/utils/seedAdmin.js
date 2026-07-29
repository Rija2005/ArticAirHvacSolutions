// src/utils/seedAdmin.js
import User from "../models/User.js";

export const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) return;

  await User.create({
    name: "System Admin",
    email: "admin@arcticair.com",
    password: "Admin@123", // change after first login in production
    role: "admin",
    isFirstLogin: false,
  });

  console.log("Default admin created: admin@arcticair.com / Admin@123");
};