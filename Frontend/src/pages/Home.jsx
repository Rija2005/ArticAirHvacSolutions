import { useState } from "react";
import { Link } from "react-router-dom";
import { BsCalculator } from "react-icons/bs";
import {
  FiClock,
  FiShield,
  FiArrowRight,
  FiPhoneCall,
  FiAward,
  FiDollarSign,
  FiThumbsUp
} from "react-icons/fi";
import Button from "../components/Button";
import Card from "../components/Card";
import EstimateModal from "../components/EstimateModal";

// Value Pillars for the Homepage Trust Section
const valuePillars = [
  {
    title: "Upfront, Flat-Rate Pricing",
    desc: "No hidden diagnostic charges or unexpected overtime fees. You know the exact cost before work begins.",
    icon: FiDollarSign,
    highlight: "Zero Surprises"
  },
  {
    title: "Licensed & NATE-Certified",
    desc: "Every technician undergoes rigorous background checks, continuous training, and full insurance coverage.",
    icon: FiAward,
    highlight: "Expert Techs"
  },
  {
    title: "Rapid Dispatch System",
    desc: "GPS-optimized dispatch routing ensures our technicians arrive on-time with fully equipped service trucks.",
    icon: FiClock,
    highlight: "On-Time Arrival"
  },
  {
    title: "100% Satisfaction Guarantee",
    desc: "We back all parts and labor with a dedicated 1-year warranty. If it's not right, we make it right.",
    icon: FiThumbsUp,
    highlight: "Warranted Care"
  }
];

export default function Home() {
  const [showEstimate, setShowEstimate] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">

      {/* Hero Section — full-bleed background video */}
      <section className="relative overflow-hidden min-h-[620px] md:min-h-[700px] flex items-center text-white">

        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30" />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10 w-full">

          <div className="max-w-2xl space-y-8 animate-fadeIn">

            {/* Live Dispatch Indicator Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-xs md:text-sm font-semibold tracking-wide text-primary-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Trusted HVAC Service Across the Region
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Reliable Climate Control, <br />
                <span className="bg-gradient-to-r from-white via-slate-100 to-accent-400 bg-clip-text text-transparent">
                  On Your Schedule.
                </span>
              </h1>

              <p className="max-w-xl text-primary-100/90 text-base md:text-lg leading-relaxed font-normal">
                Residential and commercial AC installation, emergency repairs, and preventive maintenance delivered by certified local technicians.
              </p>
            </div>

            {/* Cohesive CTA Action Group */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
              <Link to="/request-quote" className="grow sm:grow-0">
                <Button
                  variant="primary"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-accent-500 to-orange-500 hover:from-orange-500 hover:to-accent-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-accent-500/20 transition-all duration-300 flex items-center justify-center gap-2 group transform active:scale-95"
                >
                  <span>Request a Quote</span>
                  <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>

              <Link to="/emergency-services" className="grow sm:grow-0">
                <Button
                  variant="secondary"
                  className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <FiPhoneCall className="text-base text-accent-400" />
                  <span>Emergency Service</span>
                </Button>
              </Link>

              <Button
                variant="secondary"
                onClick={() => setShowEstimate(true)}
                className="w-full sm:w-auto py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
              >
                <BsCalculator className="text-base text-sky-300" />
                <span>Instant Estimate</span>
              </Button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-primary-200 font-medium border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <FiShield className="text-emerald-400 text-sm" /> Licensed & Insured
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock className="text-accent-400 text-sm" /> 24/7 Response
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Estimate Modal */}
      <EstimateModal isOpen={showEstimate} onClose={() => setShowEstimate(false)} />

      {/* Trust & Differentiation Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wider">
            The Arctic Air Standard
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Why Homeowners Trust Us</h2>
          <div className="h-1 w-12 bg-accent-500 mx-auto rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            We deliver reliable, honest climate solutions engineered to keep your home comfortable year-round.
          </p>
        </div>

        {/* Value Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {valuePillars.map((item) => {
            const PillarIcon = item.icon;
            return (
              <Card
                key={item.title}
                className="group relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary-500/40 dark:hover:border-primary-500/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <PillarIcon className="text-xl" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800 rounded-full">
                      {item.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Social Proof Stats Bar & Services Teaser */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-3 gap-6 w-full lg:w-auto text-center lg:text-left divide-x divide-slate-100 dark:divide-slate-800">
            <div className="pr-2">
              <p className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-400">10k+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Repairs Completed</p>
            </div>
            <div className="px-2">
              <p className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-400">4.9★</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Google Rating</p>
            </div>
            <div className="pl-2">
              <p className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-400">100%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Guaranteed Care</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left font-medium">
              Looking for full service details, maintenance plans, or installations?
            </span>
            <Link to="/services" className="shrink-0 w-full sm:w-auto">
              <Button
                variant="secondary"
                className="w-full sm:w-auto py-2.5 px-5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>View All Services</span>
                <FiArrowRight className="text-xs" />
              </Button>
            </Link>
          </div>
        </div>

      </section>

      {/* High-Converting CTA Banner */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 rounded-3xl p-10 md:p-14 text-center border border-slate-800 shadow-2xl text-white">

          {/* Ambient Glow Pill */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-32 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Need HVAC Service Today?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Skip the long hold times. Get a customized, transparent service quote online in under two minutes.
            </p>

            <div className="pt-4 inline-block">
              <Link to="/request-quote">
                <Button
                  variant="primary"
                  className="py-4 px-8 bg-gradient-to-r from-accent-500 to-orange-500 hover:from-orange-500 hover:to-accent-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-accent-500/25 transition-all duration-300 flex items-center gap-3 transform hover:scale-105 active:scale-95"
                >
                  <span>Get Started Now</span>
                  <FiArrowRight className="text-lg" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}