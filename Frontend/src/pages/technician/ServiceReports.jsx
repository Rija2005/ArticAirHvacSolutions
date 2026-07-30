
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { 
  FiFileText, 
  FiBriefcase, 
  FiCamera, 
  FiPenTool, 
  FiCheckCircle, 
  FiUploadCloud, 
  FiSend,
  FiX
} from "react-icons/fi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { getErrorMessage } from "../../utils/helpers";
import { getMyJobs, submitServiceReport } from "../../services/technicianService";

export default function ServiceReports() {
  const [activeJobs, setActiveJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [notes, setNotes] = useState("");
  const [signed, setSigned] = useState(false);
  const [signatureData, setSignatureData] = useState("");
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await getMyJobs();
        setActiveJobs(res.data || []);
        if (res.data && res.data.length > 0) {
          setJobId(res.data[0]._id);
        }
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    loadJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("job", jobId);
      formData.append("notes", notes);
      formData.append("customerSignature", signatureData);
      beforeImages.forEach((file) => formData.append("beforeImages", file));
      afterImages.forEach((file) => formData.append("afterImages", file));

      await submitServiceReport(formData);

      toast.success("Service report submitted");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="text-center sm:text-left space-y-2">
      
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Service Report
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Document completed work, upload site photos, and collect customer signature.
        </p>
      </div>

      <Card className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden transition-colors duration-300">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Select Assigned Job */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FiBriefcase className="text-primary-500" /> Select Job
            </label>
            <div className="relative">
              <select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200"
              >
                {activeJobs.length === 0 ? (
                  <option value="" className="dark:bg-slate-900">No active jobs available</option>
                ) : (
                  activeJobs.map((j) => (
                    <option key={j._id} value={j._id} className="dark:bg-slate-900">
                      {j.request?.service?.name || "HVAC Service"} — {j.request?.customer?.name || "Customer"}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Service Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FiFileText className="text-primary-500" /> Work Summary & Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Describe diagnostic steps, replaced parts, and system performance details..."
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 resize-none"
            />
          </div>

          {/* Image Uploads Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Before Images Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FiCamera className="text-primary-500" /> Before Images
              </label>
              <label className="relative flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 rounded-2xl cursor-pointer transition-all duration-200 group">
                <FiUploadCloud className="text-2xl text-slate-400 dark:text-slate-500 group-hover:text-primary-500 group-hover:scale-110 transition-all" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2 text-center">
                  {beforeImages.length > 0 ? `${beforeImages.length} File(s) Selected` : "Upload Initial Photos"}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">PNG, JPG up to 10MB</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setBeforeImages(Array.from(e.target.files))}
                  className="hidden"
                />
              </label>
            </div>

            {/* After Images Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FiCamera className="text-accent-500" /> After Images
              </label>
              <label className="relative flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-accent-500 dark:hover:border-accent-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 rounded-2xl cursor-pointer transition-all duration-200 group">
                <FiUploadCloud className="text-2xl text-slate-400 dark:text-slate-500 group-hover:text-accent-500 group-hover:scale-110 transition-all" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2 text-center">
                  {afterImages.length > 0 ? `${afterImages.length} File(s) Selected` : "Upload Completed Photos"}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">PNG, JPG up to 10MB</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setAfterImages(Array.from(e.target.files))}
                  className="hidden"
                />
              </label>
            </div>

          </div>

          {/* Customer Signature Pad UI */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FiPenTool className="text-accent-500" /> Customer Signature
              </label>
              {signed && (
                <button
                  type="button"
                  onClick={() => { setSigned(false); setSignatureData(""); }}
                  className="text-[11px] font-semibold text-slate-400 hover:text-danger-500 flex items-center gap-1 transition-colors"
                >
                  <FiX /> Reset
                </button>
              )}
            </div>

            <div
              onClick={() => { setSigned(true); setSignatureData("signed-placeholder-base64"); }}
              className={`h-28 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                signed
                  ? "border-success-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-success-500 shadow-sm"
                  : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 text-slate-400 dark:text-slate-500"
              }`}
            >
              {signed ? (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-success-500 animate-fadeIn">
                  <FiCheckCircle className="text-lg stroke-[2.5]" />
                  <span>Customer Signature Captured ✓</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <FiPenTool className="text-xl text-slate-400 dark:text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Tap here to sign on screen</span>
                </div>
              )}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-800/50 text-xs font-medium text-danger-500 animate-fadeIn">
              {error}
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto py-3 px-6 font-bold text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                submitted 
                  ? "bg-success-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" 
                  : "bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/20"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Report...</span>
                </>
              ) : submitted ? (
                <>
                  <FiCheckCircle className="text-sm stroke-[2.5]" />
                  <span>Report Submitted!</span>
                </>
              ) : (
                <>
                  <FiSend className="text-sm" />
                  <span>Submit Report</span>
                </>
              )}
            </Button>

            {/* Success Micro Badge */}
            {submitted && (
              <span className="text-xs font-semibold text-success-500 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-1.5 animate-fadeIn">
                <FiCheckCircle /> Synced to admin & customer logs
              </span>
            )}
          </div>

        </form>
      </Card>
    </div>
  );
}