
// // src/pages/ServiceAreas.jsx
// import { useState, useMemo } from "react";
// import { 
//   FiMapPin, 
//   FiNavigation, 
//   FiCheckCircle, 
//   FiClock, 
//   FiSearch, 
//   FiShield 
// } from "react-icons/fi";
// import Card from "../components/Card";

// const areas = [
//   { 
//     name: "Downtown", 
//     tagline: "Same-Day Priority Service", 
//     zipCodes: "10001, 10002, 10003", 
//     accent: "from-emerald-500 to-teal-600",
//     hoverBorder: "hover:border-emerald-500/50" 
//   },
//   { 
//     name: "North District", 
//     tagline: "24/7 Rapid Response Unit", 
//     zipCodes: "10010, 10011, 10012", 
//     accent: "from-sky-500 to-blue-600",
//     hoverBorder: "hover:border-sky-500/50" 
//   },
//   { 
//     name: "West Hills", 
//     tagline: "Residential & Commercial Crew", 
//     zipCodes: "10020, 10021, 10022", 
//     accent: "from-indigo-500 to-violet-600",
//     hoverBorder: "hover:border-indigo-500/50" 
//   },
//   { 
//     name: "Eastside", 
//     tagline: "Full HVAC Maintenance Team", 
//     zipCodes: "10030, 10031, 10032", 
//     accent: "from-rose-500 to-orange-500",
//     hoverBorder: "hover:border-rose-500/50" 
//   },
//   { 
//     name: "Riverside", 
//     tagline: "Emergency Repair Specialist", 
//     zipCodes: "10040, 10041, 10042", 
//     accent: "from-amber-500 to-yellow-600",
//     hoverBorder: "hover:border-amber-500/50" 
//   },
//   { 
//     name: "South Bay", 
//     tagline: "Local Dedicated Techs", 
//     zipCodes: "10050, 10051, 10052", 
//     accent: "from-fuchsia-500 to-pink-600",
//     hoverBorder: "hover:border-fuchsia-500/50" 
//   },
// ];

// export default function ServiceAreas() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Memoize search calculations to stop CPU/GPU re-render drops
//   const filteredAreas = useMemo(() => {
//     const query = searchTerm.toLowerCase().trim();
//     if (!query) return areas;
//     return areas.filter(
//       (a) =>
//         a.name.toLowerCase().includes(query) ||
//         a.zipCodes.includes(query)
//     );
//   }, [searchTerm]);

//   return (
//     <div className="relative min-h-[85vh] flex items-center justify-center py-16 px-6 bg-slate-50 overflow-hidden">
      
//       {/* Lightweight background glows (Removed blur-3xl GPU load) */}
//       <div className="absolute top-10 left-10 w-72 h-72 bg-sky-100 rounded-full opacity-50 pointer-events-none" />
//       <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100 rounded-full opacity-50 pointer-events-none" />

//       <div className="max-w-5xl w-full mx-auto relative z-10 text-center space-y-10">
        
//         {/* Header Section */}
//         <div className="space-y-4 max-w-2xl mx-auto">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold tracking-wide uppercase">
//             <FiNavigation className="text-accent-500" />
//             Coverage Radius
//           </div>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
//             Cities & Regions <br />
//             <span className="text-primary-600">We Proudly Serve</span>
//           </h1>

//           <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
//             Local crews stationed across major metro areas to guarantee fast response times and 24/7 availability.
//           </p>

//           {/* Search Bar */}
//           <div className="pt-2 max-w-md mx-auto">
//             <div className="relative flex items-center">
//               <FiSearch className="absolute left-4 text-slate-400 text-lg" />
//               <input 
//                 type="text" 
//                 placeholder="Search city or ZIP code..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:border-primary-500 transition-colors duration-150"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Region Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
//           {filteredAreas.length > 0 ? (
//             filteredAreas.map((a) => (
//               <Card
//                 key={a.name}
//                 className={`group relative overflow-hidden bg-white border border-slate-200 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${a.hoverBorder}`}
//               >
//                 {/* Accent Header Line */}
//                 <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${a.accent}`} />

//                 <div className="flex items-start justify-between">
//                   <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.accent} text-white flex items-center justify-center shadow-sm`}>
//                     <FiMapPin className="text-xl" />
//                   </div>

//                   <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
//                     <FiCheckCircle className="text-xs" /> Active Crew
//                   </span>
//                 </div>

//                 <div className="mt-4 space-y-1">
//                   <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary-600 transition-colors duration-150">
//                     {a.name}
//                   </h3>
//                   <p className="text-xs text-slate-500 font-medium">
//                     {a.tagline}
//                   </p>
//                 </div>

//                 <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
//                   <span>Zip Codes:</span>
//                   <span className="font-semibold text-slate-600">{a.zipCodes}</span>
//                 </div>
//               </Card>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-8 text-slate-500 text-sm">
//               No matching service region found.
//             </div>
//           )}
//         </div>

//         {/* Bottom Trust Indicators */}
//         <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs font-semibold uppercase tracking-wider">
//           <span className="flex items-center gap-1.5">
//             <FiClock className="text-accent-500 text-sm" /> 60-Min Emergency Arrival
//           </span>
//           <span className="flex items-center gap-1.5">
//             <FiShield className="text-emerald-500 text-sm" /> No Out-Of-Zone Fees
//           </span>
//         </div>

//       </div>
//     </div>
//   );
// }

// src/pages/ServiceAreas.jsx
import { useState, useMemo } from "react";
import { 
  FiMapPin, 
  FiNavigation, 
  FiCheckCircle, 
  FiClock, 
  FiSearch, 
  FiShield 
} from "react-icons/fi";
import Card from "../components/Card";

const areas = [
  { 
    name: "Downtown", 
    tagline: "Same-Day Priority Service", 
    zipCodes: "10001, 10002, 10003", 
    accent: "from-emerald-500 to-teal-600",
    hoverBorder: "hover:border-emerald-500/50" 
  },
  { 
    name: "North District", 
    tagline: "24/7 Rapid Response Unit", 
    zipCodes: "10010, 10011, 10012", 
    accent: "from-sky-500 to-blue-600",
    hoverBorder: "hover:border-sky-500/50" 
  },
  { 
    name: "West Hills", 
    tagline: "Residential & Commercial Crew", 
    zipCodes: "10020, 10021, 10022", 
    accent: "from-indigo-500 to-violet-600",
    hoverBorder: "hover:border-indigo-500/50" 
  },
  { 
    name: "Eastside", 
    tagline: "Full HVAC Maintenance Team", 
    zipCodes: "10030, 10031, 10032", 
    accent: "from-rose-500 to-orange-500",
    hoverBorder: "hover:border-rose-500/50" 
  },
  { 
    name: "Riverside", 
    tagline: "Emergency Repair Specialist", 
    zipCodes: "10040, 10041, 10042", 
    accent: "from-amber-500 to-yellow-600",
    hoverBorder: "hover:border-amber-500/50" 
  },
  { 
    name: "South Bay", 
    tagline: "Local Dedicated Techs", 
    zipCodes: "10050, 10051, 10052", 
    accent: "from-fuchsia-500 to-pink-600",
    hoverBorder: "hover:border-fuchsia-500/50" 
  },
];

export default function ServiceAreas() {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize search calculations to stop CPU/GPU re-render drops
  const filteredAreas = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return areas;
    return areas.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.zipCodes.includes(query)
    );
  }, [searchTerm]);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-16 px-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      
      {/* Background Glows (Adjusted for Dark Mode opacity) */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky-100 dark:bg-sky-950/30 rounded-full opacity-50 pointer-events-none blur-xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100 dark:bg-orange-950/30 rounded-full opacity-50 pointer-events-none blur-xl" />

      <div className="max-w-5xl w-full mx-auto relative z-10 text-center space-y-10">
        
        {/* Header Section */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase">
            <FiNavigation className="text-accent-500" />
            Coverage Radius
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Cities & Regions <br />
            <span className="text-primary-600 dark:text-primary-400">We Proudly Serve</span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Local crews stationed across major metro areas to guarantee fast response times and 24/7 availability.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-4 text-slate-400 dark:text-slate-500 text-lg" />
              <input 
                type="text" 
                placeholder="Search city or ZIP code..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 transition-colors duration-150"
              />
            </div>
          </div>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredAreas.length > 0 ? (
            filteredAreas.map((a) => (
              <Card
                key={a.name}
                className={`group relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:hover:border-slate-700 ${a.hoverBorder}`}
              >
                {/* Accent Header Line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${a.accent}`} />

                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.accent} text-white flex items-center justify-center shadow-sm`}>
                    <FiMapPin className="text-xl" />
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                    <FiCheckCircle className="text-xs" /> Active Crew
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-150">
                    {a.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {a.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-mono">
                  <span>Zip Codes:</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{a.zipCodes}</span>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
              No matching service region found.
            </div>
          )}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <FiClock className="text-accent-500 text-sm" /> 60-Min Emergency Arrival
          </span>
          <span className="flex items-center gap-1.5">
            <FiShield className="text-emerald-500 text-sm" /> No Out-Of-Zone Fees
          </span>
        </div>

      </div>
    </div>
  );
}