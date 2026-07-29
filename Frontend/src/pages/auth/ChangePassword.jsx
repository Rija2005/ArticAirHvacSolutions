// src/pages/auth/ChangePassword.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiKey, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const dashboardByRole = {
  customer: "/customer/dashboard",
  technician: "/technician/dashboard",
  dispatcher: "/dispatcher/dashboard",
  admin: "/admin/dashboard",
};

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { completeFirstLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password updated successfully!", {
        icon: <FiCheckCircle className="text-xl text-emerald-500" />,
        className: "border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg",
      });

      completeFirstLogin(res.data);
      navigate(dashboardByRole[res.data.role] || "/");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password. Please try again.";
      setError(msg);
      toast.error(msg, {
        icon: <FiAlertCircle className="text-xl text-red-500" />,
        className: "border border-red-100 dark:border-red-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 transition-all duration-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-accent-500 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-50 dark:focus:ring-primary-950/50";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background Lights */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <Card className="relative z-10 w-full max-w-md p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-300">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/30 mb-3">
            <FiKey className="text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Set a new password
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            This is your first login. Please update your temporary password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Temporary Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Temporary Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Temporary password"
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                className={inputBase}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                aria-label={showCurrent ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showCurrent ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              New Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type={showNew ? "text" : "password"}
                placeholder="New password (min 8 chars)"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className={inputBase}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                aria-label={showNew ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showNew ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className={inputBase}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* General Error Display */}
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400 font-medium flex items-center gap-1.5 pt-1">
              <FiAlertCircle className="shrink-0" /> {error}
            </p>
          )}

          {/* Submit Action */}
          <Button
            variant="primary"
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium rounded-xl shadow-md shadow-primary-500/20 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}