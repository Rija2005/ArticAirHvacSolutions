import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff, FiLock, FiMail, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const dashboardByRole = {
  customer: "/customer/dashboard",
  technician: "/technician/dashboard",
  dispatcher: "/dispatcher/dashboard",
  admin: "/admin/dashboard",
};

const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      await loginSchema.validate(form, { abortEarly: false });
    } catch (validationErr) {
      const errors = {};
      validationErr.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setFieldErrors(errors);
      
      toast.error("Please fill in all required fields correctly.", {
        icon: <FiAlertCircle className="text-xl text-red-500" />,
      });
      return;
    }

    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      
      toast.success(`Welcome back, ${user.name}!`, {
        icon: <FiCheckCircle className="text-xl text-emerald-500" />,
        className: "border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg",
      });

      if (user?.isFirstLogin) {
        navigate("/change-password");
      } else if (redirect) {
        navigate(redirect);
      } else {
        navigate(dashboardByRole[user.role] || "/");
      }
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Cannot reach the server. Is the backend running?"
          : "Invalid credentials. Please try again.");

      toast.error(message, {
        icon: <FiAlertCircle className="text-xl text-red-500" />,
        className: "border border-red-100 dark:border-red-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 transition-all duration-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-accent-500 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-50 dark:focus:ring-primary-950/50";
  
  const inputClass = (field) =>
    `${inputBase} ${
      fieldErrors[field]
        ? "border-red-400 dark:border-red-500 focus:ring-red-100 dark:focus:ring-red-950/50"
        : "border-slate-200 dark:border-slate-800"
    }`;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Main Glassmorphism Login Card */}
      <Card className="relative z-10 w-full max-w-md p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-300">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/30 mb-3">
            <FiLock className="text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-display">
            Welcome back
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Log in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          
          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1.5 flex items-center gap-1">
                <FiAlertCircle /> {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <Link 
                to="/forgot-password" 
                className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={`${inputClass("password")} !pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1.5 flex items-center gap-1">
                <FiAlertCircle /> {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium rounded-xl shadow-md shadow-primary-500/20 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
          Don't have an account?{" "}
          <Link 
            to={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} 
            className="font-semibold text-primary-600 dark:text-primary-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}