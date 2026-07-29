
// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FiMail, FiCheckCircle, FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { forgotPassword } from "../../services/authService";
import { getErrorMessage } from "../../utils/helpers";

const forgotSchema = yup.object({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError("");

    try {
      await forgotSchema.validate({ email });
    } catch (validationErr) {
      setFieldError(validationErr.message);
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      toast.error(getErrorMessage(err), {
        icon: <FiAlertCircle className="text-xl text-red-500" />,
        className: "border border-red-100 dark:border-red-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 transition-all duration-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-accent-500 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-50 dark:focus:ring-primary-950/50";
  const inputClass = `${inputBase} ${
    fieldError 
      ? "border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-950/50" 
      : "border-slate-200 dark:border-slate-800"
  }`;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <Card className="relative z-10 w-full max-w-md p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/30 mb-3">
            <FiMail className="text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Forgot your password?
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Enter your account email and we'll send you a reset link.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 mb-1">
              <FiCheckCircle className="text-2xl" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              If an account exists for <span className="font-semibold text-slate-800 dark:text-slate-100">{email}</span>, a
              password reset link is on its way. Check your inbox (and spam folder).
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <FiArrowLeft /> Back to login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldError) setFieldError("");
                  }}
                  className={inputClass}
                />
              </div>
              {fieldError && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1.5 flex items-center gap-1">
                  <FiAlertCircle /> {fieldError}
                </p>
              )}
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium rounded-xl shadow-md shadow-primary-500/20 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                Back to login
              </Link>
            </p>
          </form>
        )}
      </Card>
    </div>
  );
}