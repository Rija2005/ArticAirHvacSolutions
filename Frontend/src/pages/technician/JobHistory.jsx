// // src/pages/technician/JobHistory.jsx
// import { useState, useEffect } from "react";
// import Card from "../../components/Card";
// import Badge from "../../components/Badge";
// import Loader from "../../components/Loader";
// import { getMyJobs } from "../../services/technicianService";
// import { getErrorMessage, formatDate, formatStatusLabel } from "../../utils/helpers";

// export default function JobHistory() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await getMyJobs();
//         setJobs(res.data.filter((j) => j.status === "completed"));
//       } catch (err) {
//         setError(getErrorMessage(err));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   if (loading) return <Loader fullScreen />;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-xl md:text-2xl font-medium">Job history</h1>
//       {error && <p className="text-sm text-red-600">{error}</p>}

//       <Card>
//         {jobs.length === 0 ? (
//           <p className="text-sm text-gray-400">No completed jobs yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-500 border-b border-gray-100">
//                   <th className="pb-2">Job</th><th className="pb-2">Customer</th>
//                   <th className="pb-2">Date</th><th className="pb-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {jobs.map((j) => (
//                   <tr key={j._id} className="border-b border-gray-50 last:border-0">
//                     <td className="py-3">{j.request?.service?.name} <span className="text-gray-400 text-xs">({j._id.slice(-6)})</span></td>
//                     <td className="py-3">{j.request?.customer?.name}</td>
//                     <td className="py-3">{formatDate(j.scheduledDate)}</td>
//                     <td className="py-3"><Badge status={j.status}>{formatStatusLabel(j.status)}</Badge></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }
// src/pages/technician/JobHistory.jsx
import { useState, useEffect } from "react";
import { 
  FiClock, 
  FiCheckCircle, 
  FiBriefcase, 
  FiUser, 
  FiCalendar, 
  FiAlertCircle, 
  FiMapPin 
} from "react-icons/fi";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import { getMyJobs } from "../../services/technicianService";
import { getErrorMessage, formatDate, formatStatusLabel } from "../../utils/helpers";

export default function JobHistory() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getMyJobs();
        setJobs(res.data.filter((j) => j.status === "completed"));
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="text-center sm:text-left space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Job History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Review all successfully completed dispatches and past service records.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-xs font-semibold text-danger-500 flex items-center gap-2">
          <FiAlertCircle className="text-base flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Card */}
      <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm transition-colors duration-300">
        
        {jobs.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto text-xl">
              <FiClock />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No completed jobs found
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Completed service requests will show up here once finalized.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Job Details</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Scheduled Date</th>
                    <th className="pb-3 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {jobs.map((j) => (
                    <tr 
                      key={j._id} 
                      className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Job Title & ID */}
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            <FiBriefcase />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100">
                              {j.request?.service?.name || "HVAC Service"}
                            </p>
                            <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                              #{j._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-4">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs sm:text-sm">
                            <FiUser className="text-slate-400 text-xs" />
                            {j.request?.customer?.name || "N/A"}
                          </p>
                          {j.request?.customer?.address && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 truncate max-w-xs">
                              <FiMapPin className="text-slate-400 text-xs flex-shrink-0" />
                              <span className="truncate">{j.request.customer.address}</span>
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                          <FiCalendar className="text-slate-400" />
                          {formatDate(j.scheduledDate)}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 pr-2 text-right">
                        <Badge status={j.status}>
                          {formatStatusLabel(j.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
              {jobs.map((j) => (
                <div 
                  key={j._id}
                  className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          #{j._id.slice(-6)}
                        </span>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {j.request?.service?.name || "HVAC Service"}
                        </p>
                      </div>
                    </div>
                    <Badge status={j.status}>{formatStatusLabel(j.status)}</Badge>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <FiUser className="text-slate-400" />
                      <span>{j.request?.customer?.name || "Customer N/A"}</span>
                    </div>
                    {j.request?.customer?.address && (
                      <div className="flex items-start gap-1.5 text-slate-400 dark:text-slate-500">
                        <FiMapPin className="text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{j.request.customer.address}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 pt-1 text-slate-400 dark:text-slate-500">
                      <FiCalendar className="text-slate-400" />
                      <span>{formatDate(j.scheduledDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </Card>

    </div>
  );
}