// src/utils/reminderScheduler.js
import Job from "../models/Job.js";
import MaintenanceContract from "../models/MaintenanceContract.js";
import { notifyUser } from "../controllers/notificationController.js";

// Appointment Reminder — jobs scheduled within the next 24 hours that haven't
// been reminded about yet.
const sendAppointmentReminders = async () => {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const upcomingJobs = await Job.find({
    scheduledDate: { $gte: now, $lte: in24h },
    status: "assigned",
    reminderSent: false,
  }).populate("request", "customer");

  for (const job of upcomingJobs) {
    if (!job.request?.customer) continue;
    await notifyUser(
      job.request.customer,
      "appointment_reminder",
      `Reminder: your HVAC appointment is scheduled for ${job.scheduledDate.toLocaleString()}.`,
      job.request._id,
      job._id
    );
    job.reminderSent = true;
    await job.save();
  }
};

// Maintenance Due Reminder — contracts renewing within the next 7 days that
// haven't been reminded about yet.
const sendMaintenanceReminders = async () => {
  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const dueContracts = await MaintenanceContract.find({
    renewalDate: { $gte: now, $lte: in7Days },
    status: "active",
    reminderSent: false,
  });

  for (const contract of dueContracts) {
    await notifyUser(
      contract.customer,
      "maintenance_due_reminder",
      `Your ${contract.planType} maintenance plan renews on ${contract.renewalDate.toLocaleDateString()}.`
    );
    contract.reminderSent = true;
    await contract.save();
  }
};

// Runs both reminder checks once. Used by the Vercel cron endpoint (once/day)
// and by the local setInterval loop below (hourly, for traditional servers).
export const runReminderChecks = async () => {
  await sendAppointmentReminders();
  await sendMaintenanceReminders();
};

// Local/traditional-server mode only — NOT used on Vercel (serverless functions
// can't keep a setInterval alive between requests). On Vercel, runReminderChecks
// is instead called once/day via a Vercel Cron Job hitting /api/cron/reminders.
export const startReminderScheduler = () => {
  const run = async () => {
    try {
      await runReminderChecks();
    } catch (err) {
      console.error("[REMINDER SCHEDULER ERROR]", err.message);
    }
  };

  run(); // run once at startup
  setInterval(run, 60 * 60 * 1000); // then every hour
};
