// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import { 
  FiEye, 
  FiEyeOff, 
  FiLock, 
  FiMail, 
  FiUser, 
  FiPhone, 
  FiUserPlus, 
  FiCheckCircle, 
  FiAlertCircle 
} from "react-icons/fi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

const registerSchema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Enter a valid email address").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9()+\s-]{7,20}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const dashboardByRole = {
  customer: "/customer/dashboard",
  technician: "/technician/dashboard",
  dispatcher: "/dispatcher/dashboard",
  admin: "/admin/dashboard",
};

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { register } = useAuth();

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
      await registerSchema.validate(form, { abortEarly: false });
    } catch (validationErr) {
      const errors = {};
      validationErr.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setFieldErrors(errors);

      toast.error("Please resolve the errors before proceeding.", {
        icon: <FiAlertCircle className="text-xl text-red-500" />,
      });
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      toast.success("Account created successfully! Redirecting...", {
        icon: <FiCheckCircle className="text-xl text-emerald-500" />,
        className: "border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg",
      });

      setTimeout(() => {
        if (redirect) {
          navigate(redirect);
        } else {
          navigate(dashboardByRole[user.role] || "/");
        }
      }, 1200);
    } catch (err) {
      console.error("Registration error:", err);
      const message =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Cannot reach the server. Is the backend running?"
          : "Registration failed. Please try again.");

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
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Dynamic Animated Ambient Background Lights */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Main Glassmorphism Register Card */}
      <Card className="relative z-10 w-full max-w-md p-8 border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-primary-500/10">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/30 mb-3">
            <FiUserPlus className="text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-display">
            Create an Account
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Register to request services and track jobs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name Input Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className={inputClass("name")}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1 flex items-center gap-1">
                <FiAlertCircle /> {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email Address Field */}
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
              <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1 flex items-center gap-1">
                <FiAlertCircle /> {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type="text"
                name="phone"
                placeholder="(555) 019-2834"
                value={form.phone}
                onChange={handleChange}
                className={inputClass("phone")}
              />
            </div>
            {fieldErrors.phone && (
              <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1 flex items-center gap-1">
                <FiAlertCircle /> {fieldErrors.phone}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Password
            </label>
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
              <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1 flex items-center gap-1">
                <FiAlertCircle /> {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`${inputClass("confirmPassword")} !pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                tabIndex={-1}
              >
                {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1 flex items-center gap-1">
                <FiAlertCircle /> {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium rounded-xl shadow-md shadow-primary-500/20 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="font-semibold text-primary-600 dark:text-primary-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
          >
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}