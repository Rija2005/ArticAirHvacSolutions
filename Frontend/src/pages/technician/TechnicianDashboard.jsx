import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiBriefcase, 
  FiArrowRight, 
  FiMapPin, 
  FiFileText, 
  FiAlertCircle 
} from "react-icons/fi";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import WelcomeHeader from "../../components/WelcomeHeader";
import useAuth from "../../hooks/useAuth";
import { getMyJobs } from "../../services/technicianService";
import { getErrorMessage, formatStatusLabel } from "../../utils/helpers";

export default function TechnicianDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getMyJobs();
        setJobs(res.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <Loader fullScreen />;

  const today = new Date().toDateString();
  const todayJobs = jobs.filter((j) => new Date(j.scheduledDate).toDateString() === today);

  const stats = [
    { 
      label: "Today's Jobs", 
      value: todayJobs.length,
      icon: FiCalendar,
      iconBg: "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-500 border-primary-200 dark:border-primary-800/50"
    },
    { 
      label: "In Progress", 
      value: jobs.filter((j) => j.status === "in_progress").length,
      icon: FiClock,
      iconBg: "bg-amber-50 dark:bg-amber-950/40 text-accent-500 dark:text-accent-500 border-amber-200 dark:border-amber-800/50"
    },
    { 
      label: "Completed", 
      value: jobs.filter((j) => j.status === "completed").length,
      icon: FiCheckCircle,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-success-500 border-emerald-200 dark:border-emerald-800/50"
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Welcome Header */}
      <WelcomeHeader
        name={user?.name}
        roleLabel="Technician"
        subtitle="Here's what's on your schedule today."
      />

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-xs font-semibold text-danger-500 flex items-center gap-2">
          <FiAlertCircle className="text-base flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {/* Quick Action Banners (Strict Primary & Accent Mapping) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Blue Theme Button (Primary) */}
        <Link 
          to="/technician/jobs"
          className="p-5 rounded-3xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/20 transition-all duration-300 flex items-center justify-between group border border-primary-500/20"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-50 flex items-center gap-1.5">
              <FiBriefcase /> Route & Dispatches
            </span>
            <h3 className="text-base font-bold">View All Assigned Jobs</h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <FiArrowRight className="text-lg" />
          </div>
        </Link>

        {/* Orange Theme Button (Accent) */}
        <Link 
          to="/technician/reports"
          className="p-5 rounded-3xl bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/20 transition-all duration-300 flex items-center justify-between group border border-accent-500/30"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-50 flex items-center gap-1.5">
              <FiFileText /> Field Operations
            </span>
            <h3 className="text-base font-bold">Submit Service Report</h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <FiArrowRight className="text-lg" />
          </div>
        </Link>
      </div>

      {/* Assigned Jobs List */}
      <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm transition-colors">
        
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              Assigned Jobs Today
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Jobs scheduled for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <Link 
            to="/technician/jobs" 
            className="text-xs font-bold text-primary-600 dark:text-primary-500 hover:underline flex items-center gap-1"
          >
            <span>View all</span> <FiArrowRight />
          </Link>
        </div>

        {todayJobs.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto text-lg">
              <FiCalendar />
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              No jobs scheduled for today.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayJobs.map((j) => (
              <div 
                key={j._id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      #{j._id.slice(-6)}
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {j.request?.service?.name || "HVAC Service"}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {j.request?.customer?.name || "Customer"}
                    </span>
                    {j.request?.customer?.address && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 truncate max-w-xs">
                          <FiMapPin className="text-slate-400" /> {j.request.customer.address}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="self-start sm:self-auto">
                  <Badge status={j.status}>{formatStatusLabel(j.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}

      </Card>

    </div>
  );
}