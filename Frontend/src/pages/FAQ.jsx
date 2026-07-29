
// // src/pages/FAQ.jsx
// import { useState } from "react";
// import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

// const faqs = [
//   { q: "How fast can a technician arrive?", a: "Standard requests are scheduled within 24-48 hours. Emergency requests get priority same-day response." },
//   { q: "Do you offer free quotes?", a: "Yes, quotations are free and sent within 1 business day of your request." },
//   { q: "What areas do you serve?", a: "See our Service Areas page for the full list of covered locations." },
//   { q: "Can I reschedule an appointment?", a: "Yes, from your Customer Dashboard under 'My Requests'." },
// ];

// export default function FAQ() {
//   const [open, setOpen] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto relative">
        
//         {/* Background Glassmorphic Glow Accents */}
//         <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

//         {/* Glassmorphism Title Header */}
//         <div className="text-center space-y-3 mb-10 animate-fadeIn">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-primary-700 text-xs font-bold uppercase tracking-wider shadow-sm">
//             <FiHelpCircle className="text-primary-500" /> Help & Support
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
//             Frequently Asked Questions
//           </h1>
//           <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-orange-500 mx-auto rounded-full" />
//         </div>

//         {/* FAQ Cards */}
//         <div className="space-y-4 relative z-10">
//           {faqs.map((f, i) => {
//             const isOpen = open === i;
//             return (
//               <div 
//                 key={f.q} 
//                 className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-white/90 backdrop-blur-xl ${
//                   isOpen 
//                     ? "border-primary-500/80 shadow-lg shadow-primary-500/10 ring-1 ring-primary-500/20" 
//                     : "border-slate-200/80 hover:border-slate-300 hover:shadow-md"
//                 }`}
//               >
//                 <button
//                   type="button"
//                   onClick={() => setOpen(isOpen ? null : i)}
//                   className="w-full flex justify-between items-center px-6 py-5 text-left text-sm md:text-base font-semibold text-slate-800 transition-colors duration-200 hover:text-primary-600 group"
//                 >
//                   <span>{f.q}</span>
                  
//                   {/* Animated Chevron Indicator */}
//                   <div 
//                     className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
//                       isOpen 
//                         ? "bg-primary-600 text-white rotate-180 shadow-md shadow-primary-600/30" 
//                         : "bg-slate-100 text-slate-500 group-hover:bg-accent-500 group-hover:text-white"
//                     }`}
//                   >
//                     <FiChevronDown className="text-base" />
//                   </div>
//                 </button>

//                 {/* Smooth Grid Accordion Animation */}
//                 <div 
//                   className={`grid transition-all duration-300 ease-in-out ${
//                     isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
//                   }`}
//                 >
//                   <div className="overflow-hidden">
//                     <p className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
//                       {f.a}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }

// src/pages/FAQ.jsx
import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const faqs = [
  { q: "How fast can a technician arrive?", a: "Standard requests are scheduled within 24-48 hours. Emergency requests get priority same-day response." },
  { q: "Do you offer free quotes?", a: "Yes, quotations are free and sent within 1 business day of your request." },
  { q: "What areas do you serve?", a: "See our Service Areas page for the full list of covered locations." },
  { q: "Can I reschedule an appointment?", a: "Yes, from your Customer Dashboard under 'My Requests'." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto relative">
        
        {/* Background Glassmorphic Glow Accents */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent-500/10 dark:bg-accent-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Glassmorphism Title Header */}
        <div className="text-center space-y-3 mb-10 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <FiHelpCircle className="text-primary-500 dark:text-primary-400" /> Help & Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Frequently Asked Questions
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-orange-500 mx-auto rounded-full" />
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4 relative z-10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div 
                key={f.q} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl ${
                  isOpen 
                    ? "border-primary-500/80 dark:border-primary-400/80 shadow-lg shadow-primary-500/10 dark:shadow-primary-400/5 ring-1 ring-primary-500/20 dark:ring-primary-400/20" 
                    : "border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 group"
                >
                  <span>{f.q}</span>
                  
                  {/* Animated Chevron Indicator */}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? "bg-primary-600 dark:bg-primary-500 text-white rotate-180 shadow-md shadow-primary-600/30 dark:shadow-primary-500/20" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-accent-500 group-hover:text-white"
                    }`}
                  >
                    <FiChevronDown className="text-base" />
                  </div>
                </button>

                {/* Smooth Grid Accordion Animation */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}