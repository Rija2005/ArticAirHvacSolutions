import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FiNavigation, 
  FiUser, 
  FiPlay, 
  FiCheckCircle, 
  FiFileText, 
  FiBriefcase, 
  FiMapPin, 
  FiPhone, 
  FiClock, 
  FiInfo,
  FiX,
  FiCalendar 
} from "react-icons/fi";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getMyJobs, updateJobStatus } from "../../services/technicianService";
import { getErrorMessage, formatStatusLabel } from "../../utils/helpers";

const nextStatus = { assigned: "in_progress", in_progress: "completed" };
const nextLabel = { assigned: "Start Job", in_progress: "Mark Complete" };

const isFutureDate = (dateString) => {
  if (!dateString) return false;

  const targetDate = new Date(dateString);
  if (Number.isNaN(targetDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  return targetDate > today;
};

const formatDisplayDate = (dateString) => {
  if (!dateString) return "Not scheduled";

  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) return "Not scheduled";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AssignedJobs() {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

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

  useEffect(() => { 
    fetchJobs(); 
  }, []);

  const handleStatusUpdate = async (id, current) => {
    const newStatus = nextStatus[current];
    if (!newStatus) return;
    setUpdatingId(id);
    try {
      await updateJobStatus(id, newStatus);
      toast.success(`Job marked as ${formatStatusLabel(newStatus)}`);
      fetchJobs();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Assigned Jobs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage route dispatches, site locations, and service status updates.
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 self-start sm:self-auto flex items-center gap-2">
          <FiClock className="text-blue-500" /> Total Jobs: <span className="text-blue-600 dark:text-blue-400 font-bold">{jobs.length}</span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-xs font-semibold text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 ? (
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-500 flex items-center justify-center mx-auto text-xl">
            <FiCheckCircle />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No active dispatches</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
            You currently have no pending or in-progress jobs assigned. Check back later for new dispatches.
          </p>
        </Card>
      ) : (
        /* Jobs List */
        <div className="space-y-4">
          {jobs.map((j) => {
            const address = j.request?.customer?.address || "Address not provided";
            const scheduledDate = j.scheduledDate;
            const isFutureScheduledDate = j.status === "assigned" && isFutureDate(scheduledDate);
            const isUpdating = updatingId === j._id;

            return (
              <Card 
                key={j._id}
                className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-md shadow-slate-100 dark:shadow-none hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Status Bar Accent */}
                <div 
                  className={`absolute top-0 left-0 bottom-0 w-1.5 transition-colors ${
                    j.status === "completed" 
                      ? "bg-emerald-500" 
                      : j.status === "in_progress" 
                      ? "bg-blue-500" 
                      : "bg-amber-500"
                  }`} 
                />

                <div className="pl-2 space-y-4">
                  {/* Job Header Info */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          #{j._id.slice(-6)}
                        </span>
                        <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                          {j.request?.service?.name || "Service Request"}
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <FiUser className="text-blue-500" /> {j.request?.customer?.name || "Customer"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 max-w-md truncate">
                          <FiMapPin className="text-slate-400" /> {address}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <FiCalendar className="text-amber-500" /> {formatDisplayDate(scheduledDate)}
                        </span>
                      </div>
                    </div>

                    <div className="self-start">
                      <Badge status={j.status}>{formatStatusLabel(j.status)}</Badge>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    
                    {/* Navigation Maps Button */}
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial"
                    >
                      <Button 
                        variant="secondary"
                        className="w-full sm:w-auto py-2.5 px-4 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-1.5"
                      >
                        <FiNavigation className="text-blue-500" /> Navigate
                      </Button>
                    </a>

                    {/* Customer Info Modal Trigger */}
                    <Button 
                      variant="outline" 
                      onClick={() => setSelected(j)}
                      className="flex-1 sm:flex-initial py-2.5 px-4 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1.5"
                    >
                      <FiInfo className="text-slate-400" /> Customer Info
                    </Button>

                {/* Status Action Button */}
{j.status !== "completed" && (
  <Button
    variant={isFutureScheduledDate ? "secondary" : "primary"}
    disabled={isUpdating || isFutureScheduledDate}
    onClick={() => handleStatusUpdate(j._id, j.status)}
    title={
      isFutureScheduledDate
        ? `Cannot start job before scheduled date (${formatDisplayDate(scheduledDate)})`
        : undefined
    }
    className={`flex-1 sm:flex-initial py-2.5 px-5 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
      isFutureScheduledDate
        ? "!bg-amber-500/10 dark:!bg-amber-500/20 !text-amber-700 dark:!text-amber-300 !border-amber-300/70 dark:!border-amber-700/50 cursor-not-allowed opacity-100"
        : j.status === "in_progress"
        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
        : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
    }`}
  >
    {isUpdating ? (
      <>
        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span>Updating...</span>
      </>
    ) : isFutureScheduledDate ? (
      <>
        <FiClock className="text-xs text-amber-600 dark:text-amber-400" />
        <span>Scheduled for {formatDisplayDate(scheduledDate)}</span>
      </>
    ) : j.status === "assigned" ? (
      <>
        <FiPlay className="text-xs fill-current" />
        <span>{nextLabel[j.status]}</span>
      </>
    ) : (
      <>
        <FiCheckCircle className="text-xs stroke-[2.5]" />
        <span>{nextLabel[j.status]}</span>
      </>
    )
    }
  </Button>
)}
                    
                    {/* Upload Report Link */}
{j.status === "in_progress" && (
  <Link to="/technician/reports" className="flex-1 sm:flex-initial">
    <Button 
      variant="accent"
      className="w-full sm:w-auto py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
    >
      <FiFileText className="text-sm" />
      <span>Upload Report</span>
    </Button>
  </Link>
)}

                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Customer Info Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Customer Information">
        {selected && (
          <div className="space-y-4 pt-1">
            
            {/* Customer Header */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-base shadow-md shadow-blue-600/20">
                {selected.request?.customer?.name?.charAt(0) || "C"}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                  {selected.request?.customer?.name || "N/A"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Registered Customer</p>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-2.5 text-xs">
              
              <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                  <FiPhone /> Phone Number:
                </span>
                {selected.request?.customer?.phone ? (
                  <a 
                    href={`tel:${selected.request.customer.phone}`}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {selected.request.customer.phone}
                  </a>
                ) : (
                  <span className="text-slate-500 font-medium">Not provided</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                  <FiMapPin /> Service Address:
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-medium pl-5">
                  {selected.request?.customer?.address || "No address specified."}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                  <FiFileText /> Issue / Instructions:
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-medium pl-5 leading-relaxed">
                  {selected.request?.description || "No specific instructions provided."}
                </p>
              </div>

            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}