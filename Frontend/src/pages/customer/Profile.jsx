// src/pages/customer/Profile.jsx
import { useState, useEffect } from "react";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiLock, 
  FiCheckCircle, 
  FiSave, 
  FiShield
} from "react-icons/fi";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { getMe } from "../../services/authService";
import { updateProfile } from "../../services/customerService";
import { getErrorMessage, getInitials } from "../../utils/helpers";
import { toast } from "react-toastify";

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        setForm({
          name: res.data.name || "", 
          email: res.data.email || "",
          phone: res.data.phone || "", 
          address: res.data.address || "",
        });
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateProfile({ name: form.name, phone: form.phone, address: form.address });
      toast.success("Profile updated");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6 px-2 sm:px-4">
      
      {/* Header Badge & Page Title */}
      <div className="text-center sm:text-left space-y-2">
      
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-200">
          My Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 transition-colors duration-200">
          Manage your personal information and service location details.
        </p>
      </div>

      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden transition-colors duration-200">
        
        {/* Top Profile Summary Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white text-xl font-bold flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/25">
            {getInitials(form.name) || <FiUser />}
          </div>
          <div className="text-center sm:text-left min-w-0">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate transition-colors duration-200">
              {form.name || "Customer Account"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate transition-colors duration-200">{form.email}</p>
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/60 transition-colors duration-200">
              <FiCheckCircle className="text-xs" /> Verified Customer
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-5 pt-6">
          
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200">
              <FiUser className="text-primary-500" /> Full Name
            </label>
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email Field (Disabled) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200">
                <FiMail className="text-primary-500" /> Email Address
              </label>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 transition-colors duration-200">
                <FiLock className="text-xs" /> Cannot be changed
              </span>
            </div>
            <div className="relative">
              <input
                name="email"
                value={form.email}
                disabled
                className="w-full bg-slate-100/80 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed transition-colors duration-200"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200">
              <FiPhone className="text-primary-500" /> Phone Number
            </label>
            <div className="relative">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Service Address Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200">
              <FiMapPin className="text-primary-500" /> Primary Service Address
            </label>
            <div className="relative">
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street Address, City, ZIP Code"
                className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-800/60 text-xs font-medium text-red-600 dark:text-red-400 animate-fadeIn transition-colors duration-200">
              {error}
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              type="submit"
              disabled={saving}
              className={`w-full sm:w-auto py-3 px-6 font-bold text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                saved 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20" 
                  : "bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-700 text-white shadow-md"
              }`}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : saved ? (
                <>
                  <FiCheckCircle className="text-sm stroke-[2.5]" />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <>
                  <FiSave className="text-sm" />
                  <span>Save Profile</span>
                </>
              )}
            </Button>

            {/* Success Micro Toast Bar */}
            {saved && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800/60 flex items-center gap-1.5 animate-fadeIn transition-colors duration-200">
                <FiCheckCircle /> Changes synced to account
              </span>
            )}
          </div>

        </form>
      </Card>
    </div>
  );
}