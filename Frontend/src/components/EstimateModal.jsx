// src/components/EstimateModal.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";
import api from "../services/api";
import { formatCurrency } from "../utils/helpers";

const additionalOptions = [
  { id: "ductwork", label: "Ductwork inspection" },
  { id: "thermostat", label: "Smart thermostat" },
  { id: "filters", label: "Filter replacement" },
];

export default function EstimateModal({ isOpen, onClose }) {
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [sqft, setSqft] = useState(1500);
  const [urgent, setUrgent] = useState(false);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    // Cache services to avoid redundant API hits if already loaded
    if (services.length > 0) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    api
      .get("/services")
      .then((res) => {
        if (!isMounted) return;
        const data = res.data || [];
        setServices(data);
        if (data.length > 0) {
          setSelectedId(data[0]._id);
        }
      })
      .catch((err) => {
        console.error("Failed to load services:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, services.length]);

  const toggleAddon = (id) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const selected = services.find((s) => s._id === selectedId);
  const sizeFactor = sqft > 2500 ? 1.3 : sqft > 1500 ? 1.1 : 1;
  const urgentFactor = urgent ? 1.25 : 1;
  const addonFlat = addons.length * 45;
  const base = selected?.basePrice || 0;
  const low = Math.round(base * sizeFactor * urgentFactor * 0.9) + addonFlat;
  const high = Math.round(base * sizeFactor * urgentFactor * 1.4) + addonFlat;

  // Safe service slug for link navigation
  const serviceSlug = selected?.name
    ? selected.name.toLowerCase().replace(/\s+/g, "-")
    : "general";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Get Instant Estimate">
      {loading ? (
        <div className="h-48 flex items-center justify-center text-sm text-slate-400 dark:text-slate-500 animate-pulse">
          Loading estimation engine...
        </div>
      ) : (
        <div className="space-y-5">
          {/* Service Selection */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
              Service Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {services.map((s) => {
                const isSelected = selectedId === s._id;
                return (
                  <button
                    key={s._id}
                    type="button"
                    onClick={() => setSelectedId(s._id)}
                    className={`text-sm px-3 py-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-primary-600 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-semibold shadow-sm"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property Size */}
          <div>
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
              <span>Property Size</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {sqft.toLocaleString()} sq ft
              </span>
            </div>
            <input
              type="range"
              min="600"
              max="4000"
              step="100"
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="w-full accent-primary-600 cursor-pointer"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
              Urgency
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUrgent(false)}
                className={`flex-1 text-sm px-3 py-2.5 rounded-xl border transition-all ${
                  !urgent
                    ? "border-primary-600 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-semibold"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setUrgent(true)}
                className={`flex-1 text-sm px-3 py-2.5 rounded-xl border transition-all ${
                  urgent
                    ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                Emergency
              </button>
            </div>
          </div>

          {/* Addons */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
              Additional Services
            </label>
            <div className="space-y-2.5">
              {additionalOptions.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={addons.includes(opt.id)}
                    onChange={() => toggleAddon(opt.id)}
                    className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary-600 focus:ring-primary-500 dark:bg-slate-800"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Estimate Display Box */}
          <div className="rounded-2xl bg-primary-700 dark:bg-primary-800 text-white p-5 text-center shadow-lg shadow-primary-700/20">
            <p className="text-xs text-primary-200 uppercase tracking-wider font-medium">
              Estimated Range
            </p>
            <p className="text-3xl font-bold mt-1 tracking-tight">
              {formatCurrency(low)} – {formatCurrency(high)}
            </p>
            <p className="text-xs text-primary-100/80 mt-2">
              Final quote confirmed after a technician reviews your request
            </p>
          </div>

          {/* CTA Button Link */}
          <Link
            to={`/request-quote?service=${serviceSlug}`}
            onClick={onClose}
            className="block"
          >
            <Button variant="accent" className="w-full py-3 text-base">
              Get My Exact Quote
            </Button>
          </Link>
        </div>
      )}
    </Modal>
  );
}