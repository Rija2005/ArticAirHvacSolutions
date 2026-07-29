// // src/components/Footer.jsx
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";

// const quickLinks = [
//   { name: "About Us", path: "/about" },
//   { name: "Services", path: "/services" },
//   { name: "Maintenance Plans", path: "/maintenance-plans" },
//   { name: "Emergency Services", path: "/emergency-services" },
//   { name: "Service Areas", path: "/service-areas" },
// ];

// const support = [
//   { name: "Request a Quote", path: "/request-quote" },
//   { name: "Contact Us", path: "/contact" },
//   { name: "FAQ", path: "/faq" },
//   { name: "Testimonials", path: "/testimonials" },
// ];

// const socials = [
//   { name: "Facebook", icon: "ti-brand-facebook", url: "https://www.facebook.com/arcticairhvac" },
//   { name: "Instagram", icon: "ti-brand-instagram", url: "https://www.instagram.com/arcticairhvac" },
//   { name: "WhatsApp", icon: "ti-brand-whatsapp", url: "https://wa.me/15551234567" },
// ];

// export default function Footer() {
//   return (
//     <footer className="bg-primary-700 text-slate-300">
//       <div className="max-w-6xl mx-auto px-6 py-14">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {/* Brand + description */}
//           <div>
//             <Link to="/" className="flex items-center gap-3">
//               <img src={logo} alt="ArcticAir HVAC Solutions" className="h-10 w-auto" />
//               <span className="text-white font-medium text-lg tracking-tight">
//                 ArcticAir<span className="text-accent-500">HVAC</span>
//               </span>
//             </Link>
//             <p className="text-sm mt-3 text-slate-400 leading-relaxed">
//               Residential and commercial HVAC installation, repair, and
//               maintenance across multiple cities. Reliable comfort, on your schedule.
//             </p>
//             <div className="flex gap-3 mt-5">
//               {socials.map((s) => (
//                 <a
//                   key={s.name}
//                   href={s.url}
//                   aria-label={s.name}
//                   className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-600 hover:bg-accent-500 transition-colors text-white"
//                 >
//                   <i className={`ti ${s.icon} text-base`} aria-hidden="true"></i>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick links */}
//           <div>
//             <h3 className="text-white text-sm font-medium mb-4">Company</h3>
//             <ul className="space-y-2.5 text-sm">
//               {quickLinks.map((l) => (
//                 <li key={l.path}>
//                   <Link to={l.path} className="hover:text-white transition-colors">
//                     {l.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-white text-sm font-medium mb-4">Support</h3>
//             <ul className="space-y-2.5 text-sm">
//               {support.map((l) => (
//                 <li key={l.path}>
//                   <Link to={l.path} className="hover:text-white transition-colors">
//                     {l.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-white text-sm font-medium mb-4">Get in touch</h3>
//             <ul className="space-y-3 text-sm">
//               <li className="flex items-start gap-2">
//                 <i className="ti ti-phone mt-0.5 text-accent-500" aria-hidden="true"></i>
//                 (555) 123-4567
//               </li>
//               <li className="flex items-start gap-2">
//                 <i className="ti ti-mail mt-0.5 text-accent-500" aria-hidden="true"></i>
//                 support@arcticair.com
//               </li>
//               <li className="flex items-start gap-2">
//                 <i className="ti ti-clock mt-0.5 text-accent-500" aria-hidden="true"></i>
//                 Mon–Sat, 8am–7pm
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-primary-600 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
//           <p>© {new Date().getFullYear()} ArcticAir HVAC Solutions. All rights reserved.</p>
//           <div className="flex gap-5">
//             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import logo from "../assets/logo.png";

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Maintenance Plans", path: "/maintenance-plans" },
  { name: "Emergency Services", path: "/emergency-services" },
  { name: "Service Areas", path: "/service-areas" },
];

const support = [
  { name: "Request a Quote", path: "/request-quote" },
  { name: "Contact Us", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "Testimonials", path: "/testimonials" },
];

const socials = [
  { 
    name: "Facebook", 
    icon: FaFacebookF, 
    url: "https://www.facebook.com/arcticairhvac", 
    className: "bg-[#1877F2] hover:bg-[#0f5fcc]" 
  },
  { 
    name: "Instagram", 
    icon: FaInstagram, 
    url: "https://www.instagram.com/arcticairhvac", 
    className: "bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] hover:opacity-90" 
  },
  { 
    name: "WhatsApp", 
    icon: FaWhatsapp, 
    url: "https://wa.me/15551234567", 
    className: "bg-[#25D366] hover:bg-[#1DA851]" 
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-700 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand + description */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="ArcticAir HVAC Solutions" className="h-10 w-auto" />
              <span className="text-white font-medium text-lg tracking-tight">
                ArcticAir<span className="text-accent-500">HVAC</span>
              </span>
            </Link>
            <p className="text-sm mt-3 text-slate-400 leading-relaxed">
              Residential and commercial HVAC installation, repair, and
              maintenance across multiple cities. Reliable comfort, on your schedule.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s) => {
                const SocialIcon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 text-white ${s.className}`}
                  >
                    <SocialIcon className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm">
              {support.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4">Get in touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-accent-500 text-base shrink-0" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-accent-500 text-base shrink-0" />
                support@arcticair.com
              </li>
              <li className="flex items-center gap-2.5">
                <FiClock className="text-accent-500 text-base shrink-0" />
                Mon–Sat, 8am–7pm
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-600 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ArcticAir HVAC Solutions. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}