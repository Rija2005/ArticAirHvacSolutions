
// // src/pages/Contact.jsx
// import { 
//   FiPhoneCall, 
//   FiMail, 
//   FiClock, 
//   FiSend, 
//   FiMessageSquare, 
//   FiShield 
// } from "react-icons/fi";
// import Card from "../components/Card";
// import Button from "../components/Button";

// export default function Contact() {
//   return (
//     <div className="relative min-h-[85vh] flex items-center justify-center py-16 px-6 bg-slate-50 overflow-hidden">
      
//       {/* Ambient background glows */}
//       <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-100 rounded-full opacity-60 pointer-events-none" />
//       <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100 rounded-full opacity-60 pointer-events-none" />

//       <div className="max-w-5xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
//         {/* Left Column: Brand & Communication Channels */}
//         <div className="lg:col-span-5 space-y-8">
//           <div className="space-y-3">
//             {/* Live Dispatch Indicator */}
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
//               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
//               24/7 Dispatch Ready
//             </div>

//             <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
//               Get in Touch <br />
//               <span className="text-primary-600">With Our Experts</span>
//             </h1>

//             <p className="text-slate-500 text-sm leading-relaxed">
//               Have a question or need emergency HVAC repair? Reach out and our certified technicians will respond immediately.
//             </p>
//           </div>

//           {/* Interactive Contact Cards */}
//           <div className="space-y-4">
            
//             {/* Phone */}
//             <a 
//               href="tel:5551234567" 
//               className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary-500 hover:shadow-md transition-all duration-200 group"
//             >
//               <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200 shrink-0">
//                 <FiPhoneCall className="text-xl" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Call Us Now</p>
//                 <p className="text-slate-800 font-bold group-hover:text-primary-600 transition-colors">(555) 123-4567</p>
//               </div>
//             </a>

//             {/* Email */}
//             <a 
//               href="mailto:support@arcticair.com" 
//               className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-accent-500 hover:shadow-md transition-all duration-200 group"
//             >
//               <div className="w-11 h-11 rounded-xl bg-orange-50 text-accent-600 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-colors duration-200 shrink-0">
//                 <FiMail className="text-xl" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Email Support</p>
//                 <p className="text-slate-800 font-bold group-hover:text-accent-600 transition-colors">support@arcticair.com</p>
//               </div>
//             </a>

//             {/* Hours */}
//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
//               <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
//                 <FiClock className="text-xl" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Business Hours</p>
//                 <p className="text-slate-800 font-bold">Mon–Sat, 8am–7pm</p>
//               </div>
//             </div>

//           </div>

//           {/* Guarantee Pill */}
// <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
//   <FiShield className="text-emerald-500 text-base" />
//   <span>Upfront Pricing Guarantee • Licensed & Insured Techs</span>
// </div>
//         </div>

//         {/* Right Column: Modern Interactive Form Card */}
//         <div className="lg:col-span-7">
//           <Card className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-xl space-y-6">
            
//             <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
//               <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
//                 <FiMessageSquare className="text-lg" />
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold text-slate-800">Send Us a Message</h2>
//                 <p className="text-xs text-slate-400">Fill out the form below for immediate service inquiries.</p>
//               </div>
//             </div>

//             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
//                   Full Name
//                 </label>
//                 <input 
//                   placeholder="John Doe" 
//                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-slate-50/50 transition-all duration-200 outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10" 
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
//                   Email Address
//                 </label>
//                 <input 
//                   placeholder="john@example.com" 
//                   type="email" 
//                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-slate-50/50 transition-all duration-200 outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10" 
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
//                   How Can We Help?
//                 </label>
//                 <textarea 
//                   placeholder="Describe your heating, cooling, or maintenance request..." 
//                   rows={4} 
//                   className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-slate-50/50 transition-all duration-200 outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 resize-none" 
//                 />
//               </div>
              
//               <Button 
//                 variant="primary" 
//                 className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-accent-500 hover:to-accent-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 group transform active:scale-95"
//               >
//                 <span>Send Message</span>
//                 <FiSend className="text-base group-hover:translate-x-1 transition-transform duration-200" />
//               </Button>
//             </form>

//           </Card>
//         </div>

//       </div>
//     </div>
//   );
// }

// src/pages/Contact.jsx
import { 
  FiPhoneCall, 
  FiMail, 
  FiClock, 
  FiSend, 
  FiMessageSquare, 
  FiShield 
} from "react-icons/fi";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Contact() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-16 px-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-100 dark:bg-sky-950/30 rounded-full opacity-60 pointer-events-none blur-xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100 dark:bg-orange-950/30 rounded-full opacity-60 pointer-events-none blur-xl" />

      <div className="max-w-5xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Brand & Communication Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            {/* Live Dispatch Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              24/7 Dispatch Ready
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              Get in Touch <br />
              <span className="text-primary-600 dark:text-primary-400">With Our Experts</span>
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Have a question or need emergency HVAC repair? Reach out and our certified technicians will respond immediately.
            </p>
          </div>

          {/* Interactive Contact Cards */}
          <div className="space-y-4">
            
            {/* Phone */}
            <a 
              href="tel:5551234567" 
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-500 transition-colors duration-200 shrink-0">
                <FiPhoneCall className="text-xl" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Call Us Now</p>
                <p className="text-slate-800 dark:text-slate-200 font-bold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">(555) 123-4567</p>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:support@arcticair.com" 
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-accent-500 dark:hover:border-accent-400 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-accent-600 dark:text-accent-400 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white dark:group-hover:bg-accent-500 transition-colors duration-200 shrink-0">
                <FiMail className="text-xl" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Email Support</p>
                <p className="text-slate-800 dark:text-slate-200 font-bold group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">support@arcticair.com</p>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                <FiClock className="text-xl" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Business Hours</p>
                <p className="text-slate-800 dark:text-slate-200 font-bold">Mon–Sat, 8am–7pm</p>
              </div>
            </div>

          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <FiShield className="text-emerald-500 text-base shrink-0" />
            <span>Upfront Pricing Guarantee • Licensed & Insured Techs</span>
          </div>
        </div>

        {/* Right Column: Modern Interactive Form Card */}
        <div className="lg:col-span-7">
          <Card className="p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">
            
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                <FiMessageSquare className="text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Send Us a Message</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">Fill out the form below for immediate service inquiries.</p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input 
                  placeholder="John Doe" 
                  className="w-full border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 dark:focus:ring-primary-400/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input 
                  placeholder="john@example.com" 
                  type="email" 
                  className="w-full border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 dark:focus:ring-primary-400/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  How Can We Help?
                </label>
                <textarea 
                  placeholder="Describe your heating, cooling, or maintenance request..." 
                  rows={4} 
                  className="w-full border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/50 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 dark:focus:ring-primary-400/20 resize-none" 
                />
              </div>
              
              <Button 
                variant="primary" 
                className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-accent-500 hover:to-accent-600 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group transform active:scale-95"
              >
                <span>Send Message</span>
                <FiSend className="text-base group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </form>

          </Card>
        </div>

      </div>
    </div>
  );
}