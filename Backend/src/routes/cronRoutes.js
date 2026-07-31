// src/routes/cronRoutes.js
import express from "express";
import { runReminderChecks } from "../utils/reminderScheduler.js";

const router = express.Router();

// @route GET /api/cron/reminders
// Called once/day by Vercel Cron (see vercel.json). Vercel automatically sends
// an `Authorization: Bearer <CRON_SECRET>` header — we verify it so this
// endpoint can't be triggered by anyone who just finds the URL.
router.get("/reminders", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await runReminderChecks();
    res.json({ ok: true, ranAt: new Date().toISOString() });
  } catch (err) {
    console.error("[CRON REMINDER ERROR]", err.message);
    res.status(500).json({ ok: false, message: err.message });
  }
});

export default router;
