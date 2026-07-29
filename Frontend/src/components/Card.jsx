

// // src/components/Card.jsx

// export default function Card({
//   children,
//   className = ""
// }) {
//   return (
//     <div
//       className={`
//         bg-slate-50
//         dark:bg-slate-900
//         rounded-xl
//         border
//         border-slate-200
//         dark:border-slate-800
//         shadow-sm
//         text-slate-900
//         dark:text-slate-100
//         p-6
//         transition-colors
//         ${className}
//       `}
//     >
//       {children}
//     </div>
//   );
// }
// src/components/Card.jsx

export default function Card({
  children,
  className = ""
}) {
  return (
    <div
      className={`
        bg-white
        dark:bg-slate-900
        rounded-xl
        border
        border-slate-200/80
        dark:border-slate-800
        shadow-sm
        text-slate-900
        dark:text-slate-100
        p-6
        transition-colors
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}