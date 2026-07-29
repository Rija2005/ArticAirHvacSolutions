
// // src/components/Modal.jsx
// import { useEffect } from "react";
// import { FiX } from "react-icons/fi";

// export default function Modal({ isOpen, onClose, title, children, footer }) {
//   // Close on Escape key
//   useEffect(() => {
//     const handleEsc = (e) => e.key === "Escape" && onClose();
//     if (isOpen) {
//       document.addEventListener("keydown", handleEsc);
//       document.body.style.overflow = "hidden"; // Prevent background body scroll when modal is open
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEsc);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      
//       {/* Backdrop with Backdrop Blur */}
//       <div
//         className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fadeIn"
//         onClick={onClose}
//         aria-hidden="true"
//       />

//       {/* Panel */}
//       <div className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl shadow-slate-900/20 w-full max-w-md max-h-[85vh] overflow-y-auto z-10 transition-colors duration-300 animate-scaleIn">
        
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
//           <h2 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
//             {title}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
//             aria-label="Close"
//           >
//             <FiX className="text-lg" />
//           </button>
//         </div>

//         {/* Body Content */}
//         <div className="px-6 py-5">
//           {children}
//         </div>

//         {/* Footer (Optional) */}
//         {footer && (
//           <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-3 sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
//             {footer}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
// src/components/Modal.jsx
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, title, children, footer }) {
  // ESC Key listener & Scroll Lock Manager
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card Panel */}
      <div className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl shadow-slate-900/20 w-full max-w-md max-h-[85vh] flex flex-col z-10 transition-colors duration-300 animate-scaleIn overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
          <h2 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-5 overflow-y-auto grow">
          {children}
        </div>

        {/* Footer (Optional) */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
            {footer}
          </div>
        )}

      </div>
    </div>
  );
}