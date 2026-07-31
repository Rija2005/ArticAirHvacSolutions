# ArcticAir HVAC Solutions — Service Management System

A full-stack HVAC service management platform built for ArcticAir HVAC Solutions, covering the
complete workflow from customer service requests through quotations, technician dispatch,
invoicing, payments, and maintenance contracts — with role-based dashboards for Customers,
Technicians, Dispatchers, and Administrators.

## Tech Stack

| Layer        | Technology                                                        |
| ------------ | ------------------------------------------------------------------ |
| Frontend     | React (Vite), Tailwind CSS v4, Recharts, React Router              |
| Backend      | Node.js, Express.js                                                |
| Database     | MongoDB, Mongoose                                                  |
| Auth         | JWT (JSON Web Tokens), bcrypt password hashing                     |
| Email        | Nodemailer (password reset flow)                                   |
| File uploads | Multer (handles incoming multipart requests) + Cloudinary (stores request photos, before/after job photos, and signatures in the cloud) |

## Project Structure

```
├── Backend/
│   ├── server.js               # entry point — connects DB, seeds data, starts server
│   └── src/
│       ├── app.js              # Express app + route mounting
│       ├── config/db.js        # MongoDB connection
│       ├── config/cloudinary.js # Cloudinary SDK configuration
│       ├── models/             # Mongoose schemas
│       ├── controllers/        # business logic
│       ├── routes/             # API route definitions
│       ├── middleware/         # auth, role checks, file upload, error handling
│       └── utils/              # helpers (email, tokens, reminder scheduler, seeding)
│
└── Frontend/
    └── src/
        ├── pages/               # route-level pages, grouped by role
        │   ├── admin/
        │   ├── customer/
        │   ├── technician/
        │   ├── dispatcher/
        │   └── auth/
        ├── components/          # shared UI components
        ├── context/             # AuthContext, ThemeContext
        ├── hooks/               # useAuth, useTheme
        ├── services/            # API call wrappers, grouped by role
        ├── layouts/             # PublicLayout, AuthLayout, DashboardLayout
        └── routes/AppRoutes.jsx # all route definitions
```

## User Roles & What They Can Do

- **Guest** — browse services, request a quote, book inspections, view service areas, register
- **Customer** — request services, accept/reject quotations, view invoices, track technician
  visits, view maintenance history, renew maintenance contracts, leave a review
- **Technician** — view assigned jobs, update job status, upload service reports (before/after
  photos, notes, customer signature), mark jobs complete
- **Dispatcher** — assign technicians, schedule appointments, track availability, manage
  emergency requests
- **Administrator** — manage customers/technicians/dispatchers, manage quotations, generate
  invoices, configure maintenance plans, moderate reviews, view analytics & reports

## Core Modules

1. **Corporate website** — Home, About, Services, Maintenance Plans, Emergency Services,
   Testimonials, Service Areas, Request Quote, Contact, FAQ
2. **Service Request Management** — installation/repair/inspection requests, preferred date,
   photo uploads, status tracking, emergency priority flag
3. **Quotation Management** — labor/equipment costs, tax, discount, customer accept/reject
4. **Technician Dashboard** — daily schedule, job status updates, service reports
5. **Dispatcher Dashboard** — technician assignment, scheduling, emergency request handling
6. **Maintenance Contract Management** — annual plans (basic/standard/premium), renewals
7. **Invoice & Payment** — invoice generation, payment tracking, payment history
8. **Analytics Dashboard** — revenue (daily & monthly), job status, technician/dispatcher
   performance, customer growth, most-requested services, maintenance contract statistics
9. **Notifications** — service request confirmation, technician assignment, appointment
   reminders, quotation approval, invoice generated, maintenance due reminders
10. **Reviews** — post-completion customer ratings, admin-moderated before appearing on the
    public Testimonials page

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB connection string (local or Atlas)
- A Cloudinary account (free tier is enough) — for image uploads

### Backend setup

```
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000

# Password reset emails
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM_NAME=ArcticAir HVAC Solutions
SMTP_FROM_EMAIL=no-reply@arcticair-hvac.com

# Used to build the password-reset link sent by email
CLIENT_URL=http://localhost:5173

# Cloudinary — image storage for service request photos, before/after job
# photos, and customer signatures (find these in your Cloudinary dashboard)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Run it:

```
npm run dev
```

On first boot, the server seeds a default admin account and the base service catalog.

### Frontend setup

```
cd Frontend
npm install
```

Optionally set the API base URL in `Frontend/.env` (defaults to `http://localhost:5000/api`):

```
VITE_API_URL=http://localhost:5000/api
```

Run it:

```
npm run dev
```

The app runs at `http://localhost:5173`.

## Key Features Beyond the Base Spec

- Forgot/reset password for all four roles, with hashed reset tokens and expiry
- Light/dark mode toggle, persisted per user
- Automated reminder system — hourly checks for upcoming appointments and maintenance renewals
- Instant estimate calculator on the homepage
- Customer review/testimonial system with admin moderation
- Cloud-based image storage via Cloudinary — images aren't tied to local server disk, which
  also means the backend can be deployed to platforms without persistent storage (Render,
  Railway, Hugging Face Spaces, etc.) without losing uploaded photos on restart

## Future Scope

The following are not part of the current build but are natural next steps — this also
reflects the optional bonus features from the original project brief that haven't been
implemented yet:

- Online payment integration (Stripe / PayPal) — invoices/payments are currently manual/UI-based only
- Technician live location tracking (real-time GPS)
- SMS notifications — current notification system covers in-app and email (password reset) only
- Full email automation — Nodemailer currently covers password reset only; other events
  (invoice generated, appointment reminders, quotation approval) are not yet emailed
- Production-grade customer signature capture — service reports currently use a tap-to-confirm
  placeholder, not a real canvas-based freehand signature
- AI service recommendation assistant
- AI quotation generator
- Contact page form connected to a live email/notification endpoint
- Automatic maintenance contract expiry once the renewal date passes (currently manual)

## Documentation

- ER Diagram — see `/docs` folder
- System Flow Diagram — see `/docs` folder
- Full Project Documentation — see `ArcticAir_Project_Documentation.docx`