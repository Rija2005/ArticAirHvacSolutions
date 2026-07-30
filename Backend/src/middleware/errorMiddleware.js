// src/middleware/errorMiddleware.js
export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err?.message || "Internal Server Error";

  // Log full error details server-side so failures are visible in the terminal,
  // not just as a JSON response to the client.
  console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${statusCode}: ${message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err?.stack || err);
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err?.stack,
  });
};