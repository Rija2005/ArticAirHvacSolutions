// src/pages/admin/AddEmployee.jsx

import { useState } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { createEmployee } from "../../services/adminService";
import {
  MdPersonAdd,
  MdPerson,
  MdEmail,
  MdPhone,
  MdWork,
  MdLocationOn,
  MdBuild,
  MdCheckCircle,
  MdContentCopy,
  MdKey,
  MdErrorOutline,
} from "react-icons/md";

export default function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "technician",
    area: "",
    specialization: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputClass =
    "w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await createEmployee(form);
      setResult(res.data);
      toast.success("Employee account created successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "technician",
        area: "",
        specialization: "",
      });
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to create employee";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.info("Temporary password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-2xl shadow-sm">
          <MdPersonAdd size={28} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Add New Employee
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Create employee accounts for technicians, dispatchers, or admins.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <MdPerson size={20} />
            </span>
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <MdEmail size={20} />
            </span>
            <input
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <MdPhone size={20} />
            </span>
            <input
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <MdWork size={20} />
            </span>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={inputClass}
            >
              <option value="technician">Technician</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Conditional Technician Fields */}
          {form.role === "technician" && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <MdLocationOn size={20} />
                </span>
                <input
                  placeholder="Service area (e.g. North Zone)"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <MdBuild size={20} />
                </span>
                <input
                  placeholder="Specialization (e.g. AC Installation)"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-900/50 animate-pulse">
              <MdErrorOutline size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-medium shadow-md transition-all duration-200 flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Employee...
              </span>
            ) : (
              "Create Employee Account"
            )}
          </Button>
        </form>
      </Card>

      {/* Generated Result Card */}
      {result && (
        <div className="animate-bounce-in">
          <Card className="bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/20 border-2 border-emerald-500/50 shadow-2xl rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-base">
                <MdCheckCircle size={22} />
                <span>Employee Account Generated</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 capitalize">
                {result.role}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-xs block">Full Name</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{result.name}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-xs block">Email Address</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{result.email}</span>
              </div>
            </div>

            {/* Temporary Password Box */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-lg">
                  <MdKey size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Temporary Password</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base">
                    {result.tempPassword}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(result.tempPassword)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition active:scale-95"
              >
                {copied ? <MdCheckCircle size={16} className="text-emerald-500" /> : <MdContentCopy size={16} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span>⚠️ Share this password directly with the employee. They must change it upon initial login.</span>
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}