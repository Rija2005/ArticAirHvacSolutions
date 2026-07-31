// src/routes/cronRoutes.js
import express from "express";
import { runReminderChecks } from "../utils/reminderScheduler.js";

const router = express.Router();

// @route GET /api/cron/reminders?secret=...
// Can be triggered two ways:
//  1. Vercel Cron (if you set it up in vercel.json + a CRON_SECRET env var) —
//     Vercel sends `Authorization: Bearer <CRON_SECRET>` automatically.
//  2. An external scheduler like cron-job.org — hits the URL with
//     `?secret=<CRON_SECRET>` appended, since free external schedulers don't
//     always support custom headers.
router.get("/reminders", async (req, res) => {
  const expected = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  const querySecret = req.query.secret;

  const authorized =
    !expected || authHeader === `Bearer ${expected}` || querySecret === expected;

  if (!authorized) {
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
