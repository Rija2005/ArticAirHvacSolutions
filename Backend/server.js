// // server.js
// import dotenv from "dotenv";
// dotenv.config();
// import { seedAdmin } from "./src/utils/seedAdmin.js";
// import { seedServices } from "./src/utils/seedServices.js";
// import app from "./src/app.js";
// import connectDB from "./src/config/db.js";

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     await seedAdmin();
//     await seedServices();

//     app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//   } catch (err) {
//     console.error("[STARTUP ERROR] Failed to start server:", err.message);
//     console.error(err.stack);
//     process.exit(1);
//   }
// };

// startServer();

// // Catch errors that happen outside Express's request cycle (e.g. bad DB queries
// // fired without await, broken event listeners) — without this, these fail silently.
// process.on("unhandledRejection", (reason) => {
//   console.error("[UNHANDLED REJECTION]", reason);
// });

// process.on("uncaughtException", (err) => {
//   console.error("[UNCAUGHT EXCEPTION]", err);
// });

// server.js
import dotenv from "dotenv";
dotenv.config();
import { seedAdmin } from "./src/utils/seedAdmin.js";
import { seedServices } from "./src/utils/seedServices.js";
import { startReminderScheduler } from "./src/utils/reminderScheduler.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();
    await seedServices();

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    startReminderScheduler();
  } catch (err) {
    console.error("[STARTUP ERROR] Failed to start server:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

startServer();

// Catch errors that happen outside Express's request cycle (e.g. bad DB queries
// fired without await, broken event listeners) — without this, these fail silently.
process.on("unhandledRejection", (reason) => {
  console.error("[UNHANDLED REJECTION]", reason);
});

process.on("uncaughtException", (err) => {
  console.error("[UNCAUGHT EXCEPTION]", err);
});

