export const ROLES = {
  CUSTOMER: "customer",
  TECHNICIAN: "technician",
  DISPATCHER: "dispatcher",
  ADMIN: "admin",
};
export const DASHBOARD_ROUTES = {
  customer: "/customer/dashboard",
  technician: "/technician/dashboard",
  dispatcher: "/dispatcher/dashboard",
  admin: "/admin/dashboard",
};

export const REQUEST_STATUS = {
  PENDING: "pending",
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  REJECTED: "rejected",
};

export const QUOTATION_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export const PAYMENT_STATUS = {
  UNPAID: "unpaid",
  PARTIAL: "partial",
  PAID: "paid",
};

export const SERVICE_TYPES = [
  { value: "installation", label: "Installation" },
  { value: "repair", label: "Repair" },
  { value: "emergency-repair", label: "Emergency Repair" },
  { value: "maintenance", label: "Maintenance" },
  { value: "duct-cleaning", label: "Duct Cleaning" },
];

export const MAINTENANCE_PLANS = [
  { name: "Basic", price: 99, visits: 1 },
  { name: "Standard", price: 179, visits: 2 },
  { name: "Premium", price: 299, visits: 4 },
];