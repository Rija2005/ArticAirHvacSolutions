// // src/pages/dispatcher/AssignTechnician.jsx
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { 
//   FiUser, 
//   FiMapPin, 
//   FiAlertCircle, 
//   FiCheckCircle, 
//   FiSend 
// } from "react-icons/fi";
// import Card from "../../components/Card";
// import Button from "../../components/Button";
// import Loader from "../../components/Loader";
// import { getAllRequests, getAllTechnicians, createJob } from "../../services/dispatcherService";
// import { getErrorMessage } from "../../utils/helpers";

// export default function AssignTechnician() {
//   const [requests, setRequests] = useState([]);
//   const [technicians, setTechnicians] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [assigningId, setAssigningId] = useState(null);

//   const fetchData = async () => {
//     try {
//       const [reqRes, techRes] = await Promise.all([getAllRequests(), getAllTechnicians()]);
//       setRequests((reqRes.data || []).filter((r) => r.status === "pending"));
//       setTechnicians(techRes.data || []);
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchData(); 
//   }, []);

//   const assign = async (requestId, technicianId) => {
//     setAssigningId(requestId);
//     try {
//       await createJob({ 
//         request: requestId, 
//         technician: technicianId, 
//         scheduledDate: new Date() 
//       });
//       toast.success("Technician assigned successfully");
//       fetchData();
//     } catch (err) {
//       toast.error(getErrorMessage(err));
//     } finally {
//       setAssigningId(null);
//     }
//   };

//   if (loading) return <Loader fullScreen />;

//   return (
//     <div className="w-full max-w-5xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
//       {/* Header Section */}
//       <div className="text-center sm:text-left space-y-1">
//         <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
//           Assign Technicians
//         </h1>
//         <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
//           Direct 1-click dispatch assignment for incoming service requests.
//         </p>
//       </div>

//       {/* Error Alert */}
//       {error && (
//         <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-danger-500 flex items-center gap-2 backdrop-blur-md">
//           <FiAlertCircle className="text-base flex-shrink-0" />
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Empty State */}
//       {requests.length === 0 ? (
//         <Card className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 rounded-3xl p-8 sm:p-12 text-center space-y-3 shadow-lg shadow-black/5">
//           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto text-xl backdrop-blur-md">
//             <FiCheckCircle />
//           </div>
//           <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
//             No unassigned requests right now.
//           </p>
//         </Card>
//       ) : (
//         /* Glassmorphic Cards Stack */
//         <div className="space-y-4">
//           {requests.map((r) => (
//             <Card 
//               key={r._id}
//               className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-md shadow-slate-900/5 dark:shadow-black/30 hover:border-primary-500/40 transition-all duration-300 relative overflow-hidden"
//             >
//               {/* Card Header */}
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 relative z-10">
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80">
//                       #{r._id.slice(-6)}
//                     </span>
//                     <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
//                       {r.service?.name || "Service Request"}
//                     </h3>
//                   </div>

//                   <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
//                     <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
//                       <FiUser className="text-primary-500" /> {r.customer?.name || "Customer N/A"}
//                     </span>
//                     {r.customer?.address && (
//                       <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
//                         <FiMapPin className="text-slate-400" />
//                         <span className="truncate max-w-xs">{r.customer.address}</span>
//                       </span>
//                     )}
//                   </p>
//                 </div>

//                 {/* Theme Orange Unassigned Badge */}
//                 <div className="self-start sm:self-auto">
//                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide">
//                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
//                     Unassigned
//                   </span>
//                 </div>
//               </div>

//               {/* Technician Solid Blue Buttons Grid */}
//               <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 relative z-10">
//                 <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
//                   Available Technicians (Click to assign):
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   {technicians.map((t) => {
//                     const isBusy = t.availabilityStatus === "busy";

//                     return (
//                       <Button
//                         key={t._id}
//                         disabled={isBusy || assigningId === r._id}
//                         onClick={() => assign(r._id, t._id)}
//                         className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
//                           isBusy
//                             ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-400"
//                             : "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white shadow-md shadow-primary-600/15 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
//                         }`}
//                       >
//                         <span className={`w-2 h-2 rounded-full ${isBusy ? "bg-red-400" : "bg-emerald-400"}`} />
                        
//                         <span>
//                           {assigningId === r._id ? "Assigning..." : t.name}
//                           {isBusy ? " (busy)" : ""}
//                         </span>

//                         {!isBusy && assigningId !== r._id && (
//                           <FiSend className="text-[11px] opacity-80" />
//                         )}
//                       </Button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }
// src/pages/dispatcher/AssignTechnician.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  FiUser, 
  FiMapPin, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiSend,
  FiCalendar
} from "react-icons/fi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { getAllRequests, getAllTechnicians, createJob } from "../../services/dispatcherService";
import { getErrorMessage } from "../../utils/helpers";

export default function AssignTechnician() {
  const [requests, setRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assigningId, setAssigningId] = useState(null);

  const fetchData = async () => {
    try {
      const [reqRes, techRes] = await Promise.all([getAllRequests(), getAllTechnicians()]);
      setRequests((reqRes.data || []).filter((r) => r.status === "pending"));
      setTechnicians(techRes.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const assign = async (requestObj, technicianId) => {
    setAssigningId(requestObj._id);
    try {
      await createJob({ 
        request: requestObj._id, 
        technician: technicianId, 
        // 🔴 FIX: Use customer's requested date, fallback to today if missing
        scheduledDate: requestObj.preferredDate || new Date() 
      });
      toast.success("Technician assigned successfully for requested date");
      fetchData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setAssigningId(null);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="text-center sm:text-left space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Assign Technicians
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Direct dispatch assignment based on customer requested service dates.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-danger-500 flex items-center gap-2 backdrop-blur-md">
          <FiAlertCircle className="text-base flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {requests.length === 0 ? (
        <Card className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 rounded-3xl p-8 sm:p-12 text-center space-y-3 shadow-lg shadow-black/5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto text-xl backdrop-blur-md">
            <FiCheckCircle />
          </div>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No unassigned requests right now.
          </p>
        </Card>
      ) : (
        /* Glassmorphic Cards Stack */
        <div className="space-y-4">
          {requests.map((r) => (
            <Card 
              key={r._id}
              className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-md shadow-slate-900/5 dark:shadow-black/30 hover:border-primary-500/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80">
                      #{r._id.slice(-6)}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                      {r.service?.name || "Service Request"}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <FiUser className="text-primary-500" /> {r.customer?.name || "Customer N/A"}
                    </span>
                    {r.customer?.address && (
                      <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                        <FiMapPin className="text-slate-400" />
                        <span className="truncate max-w-xs">{r.customer.address}</span>
                      </span>
                    )}
                  </p>
                </div>

                {/* Theme Orange Unassigned Badge */}
                <div className="self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Unassigned
                  </span>
                </div>
              </div>

              {/* 🔴 Customer Requested Date Highlight Section */}
              <div className="mt-4 p-3 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-sm font-bold">
                  <FiCalendar />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    Customer Required Date:
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                    {r.preferredDate 
                      ? new Date(r.preferredDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) 
                      : "As soon as possible"}
                  </p>
                </div>
              </div>

              {/* Technician Solid Blue Buttons Grid */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 relative z-10">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  Available Technicians (Click to assign for requested date):
                </p>

                <div className="flex flex-wrap gap-2">
                  {technicians.map((t) => {
                    const isBusy = t.availabilityStatus === "busy";

                    return (
                      <Button
                        key={t._id}
                        disabled={isBusy || assigningId === r._id}
                        onClick={() => assign(r, t._id)}
                        className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                          isBusy
                            ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-400"
                            : "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white shadow-md shadow-primary-600/15 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${isBusy ? "bg-red-400" : "bg-emerald-400"}`} />
                        
                        <span>
                          {assigningId === r._id ? "Assigning..." : t.name}
                          {isBusy ? " (busy)" : ""}
                        </span>

                        {!isBusy && assigningId !== r._id && (
                          <FiSend className="text-[11px] opacity-80" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}