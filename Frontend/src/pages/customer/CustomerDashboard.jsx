
// // src/pages/customer/CustomerDashboard.jsx
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Card from "../../components/Card";
// import Badge from "../../components/Badge";
// import Loader from "../../components/Loader";
// import WelcomeHeader from "../../components/WelcomeHeader";
// import useAuth from "../../hooks/useAuth";
// import { getMyRequests } from "../../services/customerService";
// import { getErrorMessage, formatStatusLabel } from "../../utils/helpers";

// export default function CustomerDashboard() {
//   const { user } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getMyRequests();
//         setRequests(res.data);
//       } catch (err) {
//         setError(getErrorMessage(err));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <Loader fullScreen />;

//   const stats = [
//     { label: "Active requests", value: requests.filter((r) => r.status !== "completed" && r.status !== "rejected").length },
//     { label: "Pending quotations", value: requests.filter((r) => r.status === "pending").length },
//     { label: "Completed", value: requests.filter((r) => r.status === "completed").length },
//   ];

//   return (
//     <div className="space-y-6">
//       <WelcomeHeader
//         name={user?.name}
//         roleLabel="Customer"
//         subtitle="Here's a quick look at your service requests and where things stand."
//       />

//       {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {stats.map((s) => (
//           <Card key={s.label} className="hover:shadow-md transition-shadow">
//             <p className="text-xs text-gray-500 dark:text-slate-400">{s.label}</p>
//             <p className="text-xl md:text-2xl font-medium mt-1">{s.value}</p>
//           </Card>
//         ))}
//       </div>

//       <Card>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-medium">Recent service requests</h2>
//           <Link to="/customer/requests" className="text-sm text-primary-600 dark:text-primary-400">View all</Link>
//         </div>
//         {requests.length === 0 ? (
//           <p className="text-sm text-gray-400 dark:text-slate-500">No requests yet.</p>
//         ) : (
//           <div className="space-y-3">
//             {requests.slice(0, 5).map((r) => (
//               <div key={r._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800 pb-3 last:border-0 gap-2">
//                 <div>
//                   <p className="text-sm font-medium">{r.service?.name}</p>
//                   <p className="text-xs text-gray-500 dark:text-slate-400">{r._id.slice(-6)} · {formatStatusLabel(r.status)}</p>
//                 </div>
//                 <Badge status={r.status}>{formatStatusLabel(r.status)}</Badge>
//               </div>
//             ))}
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// }
// src/pages/customer/CustomerDashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiClock, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiArrowRight, 
  FiInbox,
  FiCalendar,
  FiTool,
} from "react-icons/fi";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import WelcomeHeader from "../../components/WelcomeHeader";
import useAuth from "../../hooks/useAuth";
import { getMyRequests } from "../../services/customerService";
import { getErrorMessage, formatStatusLabel, formatDate } from "../../utils/helpers";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyRequests();
        setRequests(res.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader fullScreen />;

  const activeRequests = requests.filter((r) => r.status !== "completed" && r.status !== "rejected");
  const pendingRequests = requests.filter((r) => r.status === "pending");
  const completedRequests = requests.filter((r) => r.status === "completed");

  const stats = [
    { 
      label: "Active Requests", 
      value: activeRequests.length,
      icon: FiClock,
      iconBg: "bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20"
    },
    { 
      label: "Pending Quotations", 
      value: pendingRequests.length,
      icon: FiInbox,
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    },
    { 
      label: "Completed Jobs", 
      value: completedRequests.length,
      icon: FiCheckCircle,
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Welcome Header */}
      <WelcomeHeader
        name={user?.name}
        roleLabel="Customer"
        subtitle="Here's a quick look at your HVAC service requests and where things stand."
      />

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-danger-500 flex items-center gap-2 backdrop-blur-md">
          <FiAlertCircle className="text-base flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => {
          const IconComponent = s.icon;
          return (
            <Card 
              key={s.label} 
              className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {s.label}
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                    {s.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${s.iconBg}`}>
                  <IconComponent />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Requests Section */}
      <Card className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-sm transition-colors">
        
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Recent Service Requests
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tracking your latest appointments and maintenance updates
            </p>
          </div>
          <Link 
            to="/customer/requests" 
            className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
          >
            <span>View all</span> <FiArrowRight />
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto text-xl">
              <FiTool />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No requests found
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                You haven't booked any HVAC services yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.slice(0, 5).map((r) => (
              <div 
                key={r._id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      #{r._id.slice(-6)}
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {r.service?.name || "HVAC Service"}
                    </p>
                  </div>

                  {r.createdAt && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 pt-0.5">
                      <FiCalendar className="text-slate-400 text-xs" />
                      <span>{formatDate(r.createdAt)}</span>
                    </p>
                  )}
                </div>

                <div className="self-start sm:self-auto flex items-center gap-2">
                  <Badge status={r.status}>
                    {formatStatusLabel(r.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

      </Card>

    </div>
  );
}