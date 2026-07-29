
// // src/pages/About.jsx
// import Card from "../components/Card";
// import { FiAward, FiUsers, FiCheckCircle, FiShield } from "react-icons/fi";
// import { TbCertificate } from "react-icons/tb";

// const values = [
//   { 
//     title: "Certified Technicians", 
//     desc: "Every technician is NATE & EPA certified, fully licensed, and background-checked.",
//     icon: TbCertificate 
//   },
//   { 
//     title: "35+ Team Members", 
//     desc: "Serving multiple regions with dedicated local rapid-response crews.",
//     icon: FiUsers 
//   },
//   { 
//     title: "10+ Years Experience", 
//     desc: "Delivering top-tier residential and commercial HVAC solutions since day one.",
//     icon: FiAward 
//   },
// ];

// const trustBadges = [
//   "24/7 Live Emergency Support",
//   "Upfront Pricing Guarantee",
//   "Licensed & Insured",
//   "EPA & NATE Certified"
// ];

// export default function About() {
//   return (
//     <div className="relative min-h-[85vh] flex items-center justify-center px-6 py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/20 to-orange-50/10">
      
//       {/* Dynamic Background Mesh Blobs */}
//       <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
//       <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

//       <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-12 animate-fadeIn">
        
//         {/* Top Header Section */}
//         <div className="space-y-4 max-w-2xl mx-auto">
//           {/* Tagline Badge */}
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold tracking-wide uppercase shadow-sm">
//             <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping"></span>
//             About ArcticAir HVAC
//           </div>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
//             Reliable Climate Control, <br />
//             <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
//               Engineered for Comfort
//             </span>
//           </h1>
          
//           <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
//             We provide residential and commercial HVAC installation, emergency repairs,
//             preventive maintenance, and annual service contracts across multiple cities.
//             Our goal is dependable comfort, delivered on time, every time.
//           </p>
//         </div>

//         {/* Interactive Stats & Values Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
//           {values.map((v, index) => {
//             const IconComponent = v.icon;
//             return (
//               <Card 
//                 key={v.title}
//                 className="group relative overflow-hidden bg-white/80 backdrop-blur-md border border-slate-100 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary-500/30"
//                 style={{ animationDelay: `${index * 150}ms` }}
//               >
//                 {/* Top Accent Line on Hover */}
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                 <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
//                   <IconComponent className="text-xl" />
//                 </div>

//                 <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary-600 transition-colors duration-200">
//                   {v.title}
//                 </h3>
                
//                 <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
//                   {v.desc}
//                 </p>
//               </Card>
//             );
//           })}
//         </div>

//         {/* US HVAC Trust Badges Footer */}
//         <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-400 text-xs font-semibold uppercase tracking-wider">
//           {trustBadges.map((badge) => (
//             <span key={badge} className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-100 shadow-2xs">
//               <FiCheckCircle className="text-emerald-500 text-sm" />
//               {badge}
//             </span>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }
// src/pages/About.jsx
import Card from "../components/Card";
import { FiAward, FiUsers, FiCheckCircle, FiShield } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";

const values = [
  { 
    title: "Certified Technicians", 
    desc: "Every technician is NATE & EPA certified, fully licensed, and background-checked.",
    icon: TbCertificate 
  },
  { 
    title: "35+ Team Members", 
    desc: "Serving multiple regions with dedicated local rapid-response crews.",
    icon: FiUsers 
  },
  { 
    title: "10+ Years Experience", 
    desc: "Delivering top-tier residential and commercial HVAC solutions since day one.",
    icon: FiAward 
  },
];

const trustBadges = [
  "24/7 Live Emergency Support",
  "Upfront Pricing Guarantee",
  "Licensed & Insured",
  "EPA & NATE Certified"
];

export default function About() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-6 py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/20 to-orange-50/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      
      {/* Dynamic Background Mesh Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-12 animate-fadeIn">
        
        {/* Top Header Section */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-800/50 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping"></span>
            About ArcticAir HVAC
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Reliable Climate Control, <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              Engineered for Comfort
            </span>
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            We provide residential and commercial HVAC installation, emergency repairs,
            preventive maintenance, and annual service contracts across multiple cities.
            Our goal is dependable comfort, delivered on time, every time.
          </p>
        </div>

        {/* Interactive Stats & Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {values.map((v, index) => {
            const IconComponent = v.icon;
            return (
              <Card 
                key={v.title}
                className="group relative overflow-hidden bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-100 dark:border-slate-800 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary-500/30 dark:hover:border-primary-500/40"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Top Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:bg-primary-500 dark:group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <IconComponent className="text-xl" />
                </div>

                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {v.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {v.desc}
                </p>
              </Card>
            );
          })}
        </div>

        {/* US HVAC Trust Badges Footer */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-400 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
          {trustBadges.map((badge) => (
            <span key={badge} className="flex items-center gap-1.5 bg-white/60 dark:bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 shadow-2xs">
              <FiCheckCircle className="text-emerald-500 dark:text-emerald-400 text-sm" />
              {badge}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}