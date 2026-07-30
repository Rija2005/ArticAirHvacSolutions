import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FiPlus, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFileText, 
  FiStar, 
  FiCalendar, 
  FiSend,
  FiImage,
  FiEdit3,
  FiInfo
} from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { getErrorMessage, formatDate, formatStatusLabel } from "../../utils/helpers";
import {
  getMyRequests,
  createReview,
  getMyReviews,
  getReportByJob,
} from "../../services/customerService";

const steps = ["pending", "scheduled", "in_progress", "completed"];

function StarInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`p-1 text-2xl transition-transform duration-200 hover:scale-115 focus:outline-none ${
            n <= value 
              ? "text-amber-400 dark:text-amber-400 drop-shadow-sm" 
              : "text-slate-300 dark:text-slate-700 hover:text-amber-300"
          }`}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <FaStar />
        </button>
      ))}
    </div>
  );
}

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [reviewedRequestIds, setReviewedRequestIds] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchData = async () => {
    try {
      const [reqRes, reviewRes] = await Promise.all([getMyRequests(), getMyReviews()]);
      setRequests(reqRes.data || []);
      setReviewedRequestIds((reviewRes.data || []).map((r) => String(r.request)));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleSelect = (request) => {
    setSelected(request);
    setRating(0);
    setComment("");
    setReport(null);
  };

  const handleCloseModal = () => {
    setSelected(null);
    setReport(null);
  };

  const handleViewReport = async (requestId) => {
    try {
      setReportLoading(true);
      const res = await getReportByJob(requestId);
      setReport(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setReportLoading(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    setSubmittingReview(true);
    try {
      await createReview({ request: selected._id, rating, comment });
      toast.success("Thanks for your feedback!");
      setReviewedRequestIds([...reviewedRequestIds, selected._id]);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  const currentStep = selected ? steps.indexOf(selected.status) : -1;
  const alreadyReviewed = selected && reviewedRequestIds.includes(selected._id);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Service Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track status, review completed jobs, and view service reports
          </p>
        </div>
        <Link to="/request-quote" className="self-start sm:self-auto">
          <Button 
            variant="primary"
            className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-primary-600/20 flex items-center gap-1.5 transition-all"
          >
            <FiPlus className="text-base" />
            <span>New Request</span>
          </Button>
        </Link>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-danger-500 flex items-center gap-2 backdrop-blur-md">
          <FiAlertCircle className="text-base flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main List Card */}
      <Card className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 sm:p-6 shadow-sm">
        {requests.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto text-xl">
              <FiClock />
            </div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              You haven't made any requests yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {requests.map((r) => (
              <button
                key={r._id}
                type="button"
                onClick={() => handleSelect(r)}
                className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/40 dark:hover:border-primary-500/40 hover:bg-white dark:hover:bg-slate-800 transition-all text-left group gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      #{r._id.slice(-6)}
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {r.service?.name || "Service Request"}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 pt-0.5">
                    <FiCalendar className="text-xs" />
                    <span>Created on {formatDate(r.createdAt)}</span>
                  </p>
                </div>

                <div className="self-start sm:self-auto flex items-center gap-2">
                  <Badge status={r.status}>
                    {formatStatusLabel(r.status)}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Request Details Modal */}
      <Modal 
        isOpen={!!selected} 
        onClose={handleCloseModal} 
        title={selected?.service?.name || "Request Details"}
      >
        {selected && (
          <div className="space-y-6 pt-2">
            
            {/* Status Tracker Stepper */}
            {selected.status !== "rejected" && (
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Progress Tracker
                </p>

                <div className="flex items-center">
                  {steps.map((s, i) => {
                    const isPassed = i <= currentStep;
                    return (
                      <div key={s} className="flex items-center flex-1 last:flex-none relative">
                        <div 
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                            isPassed 
                              ? "bg-primary-600 dark:bg-primary-500 text-white shadow-sm ring-2 ring-primary-500/20" 
                              : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        >
                          {isPassed && <FiCheckCircle className="text-[10px]" />}
                        </div>
                        {i < steps.length - 1 && (
                          <div 
                            className={`flex-1 h-1 mx-1 rounded-full transition-colors ${
                              i < currentStep 
                                ? "bg-primary-600 dark:bg-primary-500" 
                                : "bg-slate-200 dark:bg-slate-700"
                            }`} 
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
                  <span className={currentStep >= 0 ? "text-primary-600 dark:text-primary-400" : ""}>Pending</span>
                  <span className={currentStep >= 1 ? "text-primary-600 dark:text-primary-400" : ""}>Scheduled</span>
                  <span className={currentStep >= 2 ? "text-primary-600 dark:text-primary-400" : ""}>In Progress</span>
                  <span className={currentStep >= 3 ? "text-emerald-600 dark:text-emerald-400" : ""}>Completed</span>
                </div>
              </div>
            )}

            {/* Request Info */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <FiInfo className="text-primary-500 flex-shrink-0 mt-0.5 text-base" />
                <p><span className="font-bold text-slate-900 dark:text-slate-100">Description:</span> {selected.description || "N/A"}</p>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 pt-1">
                <FiCalendar className="text-amber-500 flex-shrink-0 text-base" />
                <p><span className="font-bold text-slate-900 dark:text-slate-100">Preferred Date:</span> {formatDate(selected.preferredDate)}</p>
              </div>
            </div>

            {/* Completed Job Section */}
            {selected.status === "completed" && (
              <div className="border-t border-slate-200/60 dark:border-slate-800/80 pt-5 space-y-5">
                
                {/* Review Form / Status */}
                {alreadyReviewed ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <FiCheckCircle className="text-base" />
                    <span>You've already reviewed this service. Thank you for your feedback!</span>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <FiStar className="text-amber-400" /> How was your service?
                    </p>
                    
                    <StarInput value={rating} onChange={setRating} />
                    
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us about your experience (optional)"
                      rows={3}
                      className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    />

                    <Button 
                      variant="primary" 
                      onClick={handleReviewSubmit} 
                      disabled={submittingReview}
                      className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl flex items-center justify-center gap-2"
                    >
                      {submittingReview ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <FiSend className="text-xs" />
                          <span>Submit Review</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Service Report Action */}
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleViewReport(selected._id)}
                    className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                  >
                    <FiFileText className="text-primary-500 text-base" />
                    <span>View Official Service Report</span>
                  </Button>
                </div>

                {reportLoading && (
                  <p className="text-xs font-semibold text-slate-400 animate-pulse text-center py-2">
                    Fetching technician report...
                  </p>
                )}

                {/* Report Details Drawer / View */}
                {report && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <FiFileText className="text-primary-500" /> Technician Service Report
                    </h3>

                    {report.notes && (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Technician Notes</p>
                        <p className="text-xs text-slate-800 dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          {report.notes}
                        </p>
                      </div>
                    )}

                    {/* Before Images */}
                    {report.beforeImages?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <FiImage /> Before Service Images
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {report.beforeImages.map((img, index) => (
                            <img
                              key={index}
                              src={`http://localhost:5000${img}`}
                              alt="before"
                              className="rounded-xl border border-slate-200 dark:border-slate-800 object-cover w-full h-28"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* After Images */}
                    {report.afterImages?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <FiImage /> After Service Images
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {report.afterImages.map((img, index) => (
                            <img
                              key={index}
                              src={`http://localhost:5000${img}`}
                              alt="after"
                              className="rounded-xl border border-slate-200 dark:border-slate-800 object-cover w-full h-28"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Customer Signature */}
                    {report.customerSignature && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <FiEdit3 /> Signed Customer Authorization
                        </p>
                        <img
                          src={report.customerSignature}
                          alt="signature"
                          className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-2 max-h-36 object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>
        )}
      </Modal>

    </div>
  );
}