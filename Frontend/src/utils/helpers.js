// Format a date string/object into "Jul 20, 2026"
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
};

// Format a number as currency: 420 -> "$420.00"
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return "$0.00";
  return `$${Number(amount).toFixed(2)}`;
};

// Calculate quotation total (labor + equipment + tax - discount)
export const calculateQuotationTotal = (quotation) => {
  const { laborCost = 0, equipmentCost = 0, tax = 0, discount = 0 } = quotation;
  return laborCost + equipmentCost + tax - discount;
};

// Turn "in_progress" into "In Progress" for display
export const formatStatusLabel = (status) => {
  if (!status) return "";
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Get initials from a name for avatar fallback: "Rehan Malik" -> "RM"
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Truncate long text with ellipsis
export const truncateText = (text, maxLength = 60) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

// Extract a friendly error message from an axios error
export const getErrorMessage = (error) => {
  return error?.response?.data?.message || "Something went wrong. Please try again.";
};