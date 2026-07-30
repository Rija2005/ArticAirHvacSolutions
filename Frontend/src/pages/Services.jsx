import { Link } from "react-router-dom";
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiShield, 
  FiClock, 
  FiZap 
} from "react-icons/fi";
import Card from "../components/Card";
import Button from "../components/Button";

// Import local images so Vite/Webpack bundles and caches them properly
import installImg from "../assets/images/install.jpg";
import repairImg from "../assets/images/repair.webp";
import maintImg from "../assets/images/mainataince.jpg";
import ductImg from "../assets/images/Duct-clean.jpg";
import thermoImg from "../assets/images/Thermostat.jpg";
import emergencyImg from "../assets/images/emergency.jpg";

const services = [
  { 
    name: "Installation", 
    desc: "New AC and heating system installation for residential and commercial properties.", 
    price: "From $450", 
    slug: "installation",
    image: installImg,
    badge: "Popular"
  },
  { 
    name: "Repair", 
    desc: "Fast, accurate diagnosis and lasting repair for any HVAC unit breakdown.", 
    price: "From $90", 
    slug: "repair",
    image: repairImg,
    badge: "Fast Dispatch"
  },
  { 
    name: "Preventive Maintenance", 
    desc: "Comprehensive seasonal tune-ups to boost energy efficiency and system lifespan.", 
    price: "From $60", 
    slug: "maintenance",
    image: maintImg,
    badge: "Best Value"
  },
  { 
    name: "Duct Cleaning", 
    desc: "Deep vent and duct restoration to improve indoor air quality and reduce utility costs.", 
    price: "From $150", 
    slug: "duct-cleaning",
    image: ductImg,
    badge: "Clean Air"
  },
  { 
    name: "Thermostat Installation", 
    desc: "Smart and programmable thermostat integration for total mobile climate control.", 
    price: "From $75", 
    slug: "installation",
    image: thermoImg,
    badge: "Smart Home"
  },
  { 
    name: "Emergency Repair", 
    desc: "24/7 priority response for critical heating and air conditioning failures.", 
    price: "From $120", 
    slug: "repair",
    image: emergencyImg,
    badge: "24/7 Urgent"
  },
];

export default function Services() {
  return (
    <div className="relative min-h-screen py-16 px-6 bg-gradient-to-br from-slate-50 via-sky-50/20 to-orange-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 -left-20 w-80 h-80 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <FiZap className="text-accent-500" />
            Professional HVAC Solutions
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Our Climate Control <span className="bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Services</span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Full-service HVAC support for residential and commercial clients. Backed by certified technicians and our 100% satisfaction guarantee.
          </p>
        </div>

        {/* Services Grid with Visual Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Card 
              key={s.name}
              className="group flex flex-col justify-between overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-100/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-2 p-0"
            >
              <div>
                {/* Service Image Header with Tag Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={s.image} 
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                    {s.badge}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-primary-700 dark:text-primary-300 font-bold text-xs px-3 py-1.5 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
                    {s.price}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {s.name}
                  </h3>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
              
              {/* Card Footer with Enhanced Interactive Button */}
              <div className="px-6 pb-6 pt-2">
                <Link to={`/request-quote?service=${s.slug}`} className="block w-full">
                  <Button 
                    variant="primary" 
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-accent-500 hover:to-accent-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-primary-500/10 transition-all duration-300 flex items-center justify-center gap-2 group/btn transform active:scale-95"
                  >
                    <span>Request This Service</span>
                    <FiArrowRight className="text-base group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Guarantee Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <FiShield className="text-primary-500 text-base" /> Licensed & Insured
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheckCircle className="text-emerald-500 text-base" /> Upfront Pricing
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock className="text-accent-500 text-base" /> 24/7 Emergency Response
          </span>
        </div>

      </div>
    </div>
  );
}