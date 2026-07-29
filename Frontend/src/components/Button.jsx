//  //src/components/Button.jsx

// export default function Button({
//   children,
//   variant = "primary",
//   className = "",
//   ...props
// }) {
//   const base =
//     "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed";

//   const variants = {
//     primary:
//       "bg-primary-700 text-white hover:bg-primary-600",

//     secondary:
//       "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100",

//     accent:
//       "bg-accent-500 text-white hover:bg-accent-600",

//     outline:
//       "border border-primary-700 text-primary-700 hover:bg-primary-50",
//   };

//   return (
//     <button
//       className={`${base} ${variants[variant]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//    );
// }

// src/components/Button.jsx

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white shadow-sm",

    secondary:
      "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700",

    accent:
      "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/80 dark:hover:bg-blue-900/60",

    outline:
      "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800",
  };

  return (
    <button
      className={`${base} ${variants[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}