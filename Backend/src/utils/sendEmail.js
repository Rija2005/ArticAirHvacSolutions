// src/utils/sendEmail.js
import nodemailer from "nodemailer";

// Reuses one transporter across calls. Configure via env vars:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME, SMTP_FROM_EMAIL
let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  return transporter;
};

// @param {{ to: string, subject: string, html: string }} options
const sendEmail = async ({ to, subject, html }) => {
  const fromName = process.env.SMTP_FROM_NAME || "ArcticAir HVAC Solutions";
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "no-reply@arcticair-hvac.com";

  await getTransporter().sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
