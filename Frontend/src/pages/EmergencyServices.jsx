// // src/pages/EmergencyServices.jsx
// import { Link } from "react-router-dom";
// import Button from "../components/Button";
// import Card from "../components/Card";

// export default function EmergencyServices() {
//   return (
//     <div>
//       <section className="bg-accent-500 text-white px-6 py-16 text-center">
//         <h1 className="text-2xl md:text-4xl font-medium">24/7 emergency HVAC service</h1>
//         <p className="mt-3 text-white/90 max-w-xl mx-auto">
//           System failure doesn't wait for business hours. Neither do we.
//         </p>
//         <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
//           <a href="tel:+15551234567">
//             <Button variant="secondary">Call (555) 123-4567</Button>
//           </a>
//           <Link to="/request-quote?service=emergency-repair&priority=emergency">
//             <Button variant="primary">Request emergency service online</Button>
//           </Link>
//         </div>
//       </section>

//       <section className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
//         <Card>
//           <h3 className="font-medium">Rapid response</h3>
//           <p className="text-sm text-gray-500 mt-2">Technicians dispatched within the hour in most service areas.</p>
//         </Card>
//         <Card>
//           <h3 className="font-medium">Any time, any day</h3>
//           <p className="text-sm text-gray-500 mt-2">Emergency requests are handled 24/7, including holidays.</p>
//         </Card>
//         <Card>
//           <h3 className="font-medium">Transparent pricing</h3>
//           <p className="text-sm text-gray-500 mt-2">You'll see the quote before any work begins.</p>
//         </Card>
//       </section>
//     </div>
//   );
// }
// src/pages/EmergencyServices.jsx
import { Link } from "react-router-dom";
import { FiPhoneCall, FiAlertTriangle, FiZap, FiClock, FiShield } from "react-icons/fi";
import Button from "../components/Button";
import Card from "../components/Card";

export default function EmergencyServices() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Emergency Alert Banner / Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent-500 to-accent-600 dark:from-amber-600 dark:to-orange-700 text-white px-6 py-16 text-center shadow-lg">
        
        {/* Glow Effects */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 dark:bg-black/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 dark:bg-black/25 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            <FiAlertTriangle className="text-amber-200 animate-pulse text-sm" /> 
            Priority Dispatch Active
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
            24/7 Emergency HVAC Service
          </h1>

          <p className="text-white/90 dark:text-slate-100 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            System failure doesn't wait for business hours. Neither do we. Certified technicians are standing by.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Call Now Button */}
            <a href="tel:+15551234567" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-accent-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-amber-400 dark:hover:bg-slate-800 font-bold px-6 py-3.5 rounded-xl shadow-md transition-all duration-200"
              >
                <FiPhoneCall className="text-lg" />
                <span>Call (555) 123-4567</span>
              </Button>
            </a>

            {/* Theme-Matched Primary Blue Button */}
            <Link to="/request-quote?service=emergency-repair&priority=emergency" className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white dark:bg-primary-600 dark:hover:bg-primary-500 dark:text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all duration-200"
              >
                <span>Request Emergency Service Online</span>
              </Button>
            </Link>

          </div>

        </div>
      </section>

      {/* Value Pillars / Feature Grid */}
      <section className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <Card className="p-6 bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center text-xl mb-4">
            <FiZap />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-display">Rapid Response</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Technicians dispatched within the hour in most service areas to restore your system immediately.
          </p>
        </Card>

        {/* Card 2 */}
        <Card className="p-6 bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-200 flex items-center justify-center text-xl mb-4">
            <FiClock />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-display">Any Time, Any Day</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Emergency requests are handled 24 hours a day, 7 days a week, including nights and holidays.
          </p>
        </Card>

        {/* Card 3 */}
        <Card className="p-6 bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-4">
            <FiShield />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base font-display">Transparent Pricing</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            No hidden fees or surprise costs. You'll receive and approve an exact quote before any work begins.
          </p>
        </Card>

      </section>

    </div>
  );
}