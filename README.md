# ArcticAir HVAC Solutions — Service Management System

A full-stack HVAC service management platform built for ArcticAir HVAC Solutions, covering the
complete workflow from customer service requests through quotations, technician dispatch,
invoicing, payments, and maintenance contracts — with role-based dashboards for Customers,
Technicians, Dispatchers, and Administrators.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS v4, Recharts, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens), bcrypt password hashing |
| Email | Nodemailer (password reset flow) |
| File uploads | Multer (service request photos, before/after job photos) |

## Project Structure

```
├── Backend/
│   ├── server.js               # entry point — connects DB, seeds data, starts server
│   └── src/
│       ├── app.js              # Express app + route mounting
│       ├── config/db.js        # MongoDB connection
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
        ├── hooks/                # useAuth, useTheme
        ├── services/             # API call wrappers, grouped by role
        ├── layouts/              # PublicLayout, AuthLayout, DashboardLayout
        └── routes/AppRoutes.jsx  # all route definitions
```

## User Roles & What They Can Do

- **Guest** — browse services, request a quote, book inspections, view service areas, register
- **Customer** — request services, accept/reject quotations, view invoices, track technician
  visits, view maintenance history, renew maintenance contracts
- **Technician** — view assigned jobs, update job status, upload service reports (before/after
  photos, notes, customer signature), mark jobs complete
- **Dispatcher** — assign technicians, schedule appointments, track availability, manage
  emergency requests
- **Administrator** — manage customers/technicians/dispatchers, manage quotations, generate
  invoices, configure maintenance plans, view analytics & reports

## Core Modules

1. **Corporate website** — Home, About, Services, Maintenance Plans, Emergency Services,
   Testimonials, Service Areas, Request Quote, Contact, FAQ
2. **Service Request Management** — installation/repair/inspection requests, preferred date,
   photo uploads, status tracking
3. **Quotation Management** — labor/equipment costs, tax, discount, customer accept/reject
4. **Technician Dashboard** — daily schedule, job status updates, service reports
5. **Dispatcher Dashboard** — technician assignment, scheduling, emergency request handling
6. **Maintenance Contract Management** — annual plans (basic/standard/premium), renewals
7. **Invoice & Payment** — invoice generation, payment tracking, payment history
8. **Analytics Dashboard** — revenue (daily & monthly), job status, technician/dispatcher
   performance, customer growth, most-requested services, maintenance contract statistics
9. **Notifications** — service request confirmation, technician assignment, appointment
   reminders, quotation approval, invoice generated, maintenance due reminders

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local or Atlas)

### Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000

# Password reset emails (see Backend/src/utils/sendEmail.js)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM_NAME=ArcticAir HVAC Solutions
SMTP_FROM_EMAIL=no-reply@arcticair-hvac.com

# Used to build the password-reset link sent by email
CLIENT_URL=http://localhost:5173
```

Run it:

```bash
npm run dev
```

On first boot, the server seeds a default admin account and the base service catalog
(see `Backend/src/utils/seedAdmin.js` and `seedServices.js`).

### Frontend setup

```bash
cd Frontend
npm install
```

Optionally set the API base URL in `Frontend/.env` (defaults to `http://localhost:5000/api`):

```
VITE_API_URL=http://localhost:5000/api
```

Run it:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Key Features Beyond the Base Spec

- **Forgot/reset password** for all four roles, with hashed reset tokens and expiry
- **Light/dark mode** toggle, persisted per user
- **Automated reminder system** — checks hourly for upcoming appointments (24h out) and
  maintenance renewals (7 days out) and notifies customers automatically
- **Consistent notification triggers** across the request → quotation → job → invoice lifecycle

## Known Gaps / Next Steps

- Contact page form is currently UI-only (doesn't send anywhere yet)
- Maintenance contracts don't yet auto-flip to `"expired"` status once the renewal date passes
- Dark mode currently covers the dashboard/sidebar side of the app, not yet the public
  marketing pages
- No live deployment configured yet (see `Bonus Features` in the project brief for optional
  hosting on Vercel / Hostinger)

## Documentation

- ER Diagram — see project documentation folder
- System Flow Diagram — see project documentation folder
