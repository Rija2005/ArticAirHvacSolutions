
// // src/app.js — full updated version
// import express from "express";
// import cors from "cors";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import requestRoutes from "./routes/requestRoutes.js";
// import quotationRoutes from "./routes/quotationRoutes.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// import invoiceRoutes from "./routes/invoiceRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import contractRoutes from "./routes/contractRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";
//  import reviewRoutes from "./routes/reviewRoutes.js";
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => res.send("Backend API is running"));

// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/requests", requestRoutes);
// app.use("/api/quotations", quotationRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/invoices", invoiceRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/contracts", contractRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use(notFound);
// app.use(errorHandler);

// export default app;


// src/app.js — full updated version
import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
 import reviewRoutes from "./routes/reviewRoutes.js";
import cronRoutes from "./routes/cronRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend API is running"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cron", cronRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;