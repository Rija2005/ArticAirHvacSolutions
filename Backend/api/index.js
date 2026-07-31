// api/index.js — Vercel serverless entry point.
// This file is NOT used for local development (use `npm run dev` / server.js
// for that, unchanged). Vercel routes all incoming requests here instead.
import dotenv from "dotenv";
dotenv.config();

import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import { seedAdmin } from "../src/utils/seedAdmin.js";
import { seedServices } from "../src/utils/seedServices.js";

// Cached across warm invocations of the same instance — only truly runs
// once per cold start, not on every request.
let readyPromise;
const ready = () => {
  if (!readyPromise) {
    readyPromise = (async () => {
      await connectDB();
      await seedAdmin();
      await seedServices();
    })();
  }
  return readyPromise;
};

export default async function handler(req, res) {
  try {
    await ready();
  } catch (err) {
    console.error("[VERCEL INIT ERROR]", err.message);
    res.status(500).json({ message: "Server failed to initialize" });
    return;
  }
  return app(req, res);
}
