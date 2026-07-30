
export default function Badge({ children, status = "pending", className = "" }) {
  const normalizedStatus = String(status).toLowerCase().replace(/\s+/g, "_");

  const styles = {
    pending:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

    scheduled:
      "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300",

    in_progress:
      "bg-accent-500/10 text-accent-600 dark:bg-accent-500/20 dark:text-accent-400",

    completed:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",

    accepted:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",

    rejected:
      "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
  };

  const activeStyle = styles[normalizedStatus] || styles.pending;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${activeStyle} ${className}`}
    >
      {children}
    </span>
  );
}