import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiCheck, 
  FiShield, 
  FiZap, 
  FiStar, 
  FiArrowRight, 
  FiClock, 
  FiAward 
} from "react-icons/fi";
import Card from "../components/Card";
import Button from "../components/Button";

const plans = [
  {
    id: "basic",
    name: "Basic Care",
    badge: "Essential",
    desc: "Ideal for newer systems needing routine annual maintenance.",
    priceMonthly: 12,
    priceAnnual: 99,
    icon: FiShield,
    features: [
      "1 comprehensive annual inspection",
      "Priority scheduling window",
      "10% discount on all repairs",
      "Safety and leak check included"
    ],
    highlight: false,
  },
  {
    id: "standard",
    name: "Standard Comfort",
    badge: "Most Popular",
    desc: "Complete year-round coverage designed for total peace of mind.",
    priceMonthly: 19,
    priceAnnual: 179,
    icon: FiZap,
    features: [
      "2 comprehensive annual inspections",
      "Priority emergency dispatch",
      "15% discount on all repairs",
      "Free seasonal air filter replacement",
      "System efficiency optimization"
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium Shield",
    badge: "Ultimate Care",
    desc: "Maximum protection and top-tier response for high-use systems.",
    priceMonthly: 29,
    priceAnnual: 299,
    icon: FiStar,
    features: [
      "4 seasonal tune-ups & inspections",
      "24/7 priority emergency response",
      "20% discount on all repairs",
      "Free high-efficiency filter changes",
      "Free annual duct airflow check",
      "Zero diagnostic charges"
    ],
    highlight: false,
  },
];

export default function MaintenancePlans() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Dynamic Title Layout */}
        <div className="text-center space-y-4 max-w-2xl mx-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider">
            <FiShield className="text-primary-500" /> Preventive Protection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            HVAC Maintenance Plans
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Prevent costly breakdowns, lower energy bills, and prolong your system’s lifespan with a customized protection plan.
          </p>

          {/* Modern Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!isAnnual ? "text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-500"}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-slate-900 dark:bg-slate-800 p-1 transition-colors duration-300 focus:outline-none border border-slate-700/50 dark:border-slate-700"
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  isAnnual ? "translate-x-6 bg-accent-500" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? "text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-500"}`}>
              Annual
              <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Save 15%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((p) => {
            const Icon = p.icon;
            const price = isAnnual ? `$${p.priceAnnual}` : `$${p.priceMonthly}`;
            const cycle = isAnnual ? "/year" : "/month";

            return (
              <div 
                key={p.name} 
                className={`relative flex flex-col transition-all duration-300 ${
                  p.highlight ? "md:-translate-y-2 z-10" : ""
                }`}
              >
                {/* Highlight Glow Effect */}
                {p.highlight && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-orange-500 rounded-3xl blur opacity-30 dark:opacity-40 group-hover:opacity-100 transition duration-300" />
                )}

                <Card 
                  className={`relative flex flex-col justify-between h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                    p.highlight 
                      ? "border-accent-500/80 dark:border-accent-500/80 shadow-2xl shadow-accent-500/10" 
                      : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl"
                  }`}
                >
                  <div>
                    {/* Header Badge & Title */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${
                        p.highlight 
                          ? "bg-accent-500 text-white shadow-lg shadow-accent-500/30" 
                          : "bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
                      }`}>
                        <Icon />
                      </div>
                      <span className={`text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full ${
                        p.highlight 
                          ? "bg-accent-500 text-white shadow-sm" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      }`}>
                        {p.badge}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{p.name}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px] leading-relaxed">{p.desc}</p>

                    {/* Dynamic Pricing Display */}
                    <div className="my-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{price}</span>
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{cycle}</span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            p.highlight 
                              ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400" 
                              : "bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
                          }`}>
                            <FiCheck className="text-xs stroke-[3]" />
                          </div>
                          <span className="leading-tight text-slate-700 dark:text-slate-300">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-8 mt-auto">
                    <Link to={`/request-quote?service=maintenance&plan=${p.id}`}>
                      <Button 
                        variant={p.highlight ? "primary" : "secondary"} 
                        className={`w-full py-3.5 px-6 font-bold text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group transform active:scale-95 ${
                          p.highlight 
                            ? "bg-gradient-to-r from-accent-500 to-orange-500 hover:from-orange-500 hover:to-accent-600 text-white shadow-lg shadow-accent-500/20" 
                            : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border-transparent"
                        }`}
                      >
                        <span>Select Plan</span>
                        <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Guarantees Trust Banner */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center text-lg">
              <FiClock />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Long-Term Lock-in</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cancel or upgrade your maintenance plan anytime without hassle.</p>
          </div>

          <div className="flex flex-col items-center gap-2 border-y md:border-y-0 md:border-x border-slate-100 dark:border-slate-800 py-4 md:py-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
              <FiAward />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">100% Workmanship Guarantee</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">All maintenance tune-ups come with a 30-day performance warranty.</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/60 text-accent-600 dark:text-accent-400 flex items-center justify-center text-lg">
              <FiShield />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Certified Local Techs</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Background-checked, NATE-certified technicians assigned to your home.</p>
          </div>
        </div>

      </div>
    </div>
  );
}