

// src/pages/dispatcher/DispatcherDashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiInbox, 
  FiClock, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiArrowRight, 
  FiAlertCircle,
  FiUser,
  FiSend
} from "react-icons/fi";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import WelcomeHeader from "../../components/WelcomeHeader";
import useAuth from "../../hooks/useAuth";
import { getAllRequests } from "../../services/dispatcherService";
import { getErrorMessage } from "../../utils/helpers";

export default function DispatcherDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllRequests();
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

  const unassigned = requests.filter((r) => r.status === "pending");
  const emergencies = requests.filter((r) => r.priority === "emergency" && r.status !== "completed");
  const completed = requests.filter((r) => r.status === "completed");

  const stats = [
    { 
      label: "Total Requests", 
      value: requests.length,
      icon: FiInbox,
      iconBg: "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-500 border-primary-200 dark:border-primary-800/50"
    },
    { 
      label: "Unassigned", 
      value: unassigned.length,
      icon: FiClock,
      iconBg: "bg-amber-50 dark:bg-amber-950/40 text-accent-500 dark:text-accent-500 border-amber-200 dark:border-amber-800/50"
    },
    { 
      label: "Emergencies", 
      value: emergencies.length,
      icon: FiAlertTriangle,
      iconBg: "bg-red-50 dark:bg-red-950/40 text-danger-500 border-red-200 dark:border-red-800/50"
    },
    { 
      label: "Completed", 
      value: completed.length,
      icon: FiCheckCircle,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-success-500 border-emerald-200 dark:border-emerald-800/50"
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Welcome Header */}
      <WelcomeHeader
        name={user?.name}
        roleLabel="Dispatcher"
        subtitle="Here's what needs your attention across today's requests."
      />

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-xs font-semibold text-danger-500 flex items-center gap-2">
          <FiAlertCircle className="text-base flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const IconComponent = s.icon;
          return (
            <Card 
              key={s.label} 
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {s.label}
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2 tracking-tight">
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

      {/* Dispatch Action Banner */}
      <Link 
        to="/dispatcher/assign"
        className="p-5 sm:p-6 rounded-3xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20 transition-all duration-300 flex items-center justify-between group border border-primary-500/20"
      >
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-50 flex items-center gap-1.5">
            <FiSend /> Fast Dispatch Console
          </span>
          <h3 className="text-base sm:text-lg font-bold">Assign Technicians to Pending Requests</h3>
          <p className="text-xs text-primary-100 hidden sm:block">
            {unassigned.length} request(s) waiting for route allocation and technician assignment.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform flex-shrink-0">
          <FiArrowRight className="text-xl" />
        </div>
      </Link>

      {/* Unassigned Requests List */}
      <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm transition-colors">
        
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              Requests Needing Assignment
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              High priority and unassigned dispatches requiring action
            </p>
          </div>
          <Link 
            to="/dispatcher/assign" 
            className="text-xs font-bold text-primary-600 dark:text-primary-500 hover:underline flex items-center gap-1"
          >
            <span>Assign now</span> <FiArrowRight />
          </Link>
        </div>

        {unassigned.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto text-lg">
              <FiCheckCircle />
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              All requests are currently assigned!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {unassigned.slice(0, 5).map((r) => (
              <div 
                key={r._id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      #{r._id.slice(-6)}
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {r.service?.name || "HVAC Service"}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <FiUser className="text-slate-400 text-xs" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {r.customer?.name || "Customer"}
                    </span>
                  </p>
                </div>

                <div className="self-start sm:self-auto">
                  <Badge status={r.priority === "emergency" ? "rejected" : "pending"}>
                    {r.priority === "emergency" ? "Emergency" : "Pending Assignment"}
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