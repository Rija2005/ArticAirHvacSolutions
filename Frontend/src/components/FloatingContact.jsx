
// import { FiPhone, FiMail } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa6";

// const options = [
//   {
//     label: "Call Us",
//     icon: FiPhone,
//     href: "tel:+15551234567",
//     className: "bg-primary-600 hover:bg-primary-700",
//   },
//   {
//     label: "WhatsApp",
//     icon: FaWhatsapp,
//     href: "https://wa.me/15551234567",
//     target: "_blank",
//     className: "bg-[#25D366] hover:bg-[#1DA851]",
//   },
//   {
//     label: "Email",
//     icon: FiMail,
//     href: "mailto:support@arcticair.com",
//     className: "bg-accent-500 hover:bg-accent-600",
//   },
// ];

// export default function FloatingContact() {
//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 rounded-full bg-white border border-slate-200/80 shadow-lg">
//       {options.map((opt) => {
//         const IconComponent = opt.icon;
//         return (
//           <a
//             key={opt.label}
//             href={opt.href}
//             target={opt.target}
//             rel={opt.target ? "noreferrer" : undefined}
//             aria-label={opt.label}
//             title={opt.label}
//             className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95 ${opt.className}`}
//           >
//             <IconComponent className="text-lg" />
//           </a>
//         );
//       })}
//     </div>
//   );
// }

// src/components/FloatingContact.jsx
import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const options = [
  {
    label: "Call Us",
    icon: FiPhone,
    href: "tel:+15551234567",
    className: "bg-primary-600 hover:bg-primary-700",
  },
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/15551234567",
    target: "_blank",
    className: "bg-[#25D366] hover:bg-[#1DA851]",
  },
  {
    label: "Email",
    icon: FiMail,
    href: "mailto:support@arcticair.com",
    className: "bg-accent-500 hover:bg-accent-600",
  },
];

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 backdrop-blur-md">
      {options.map((opt) => {
        const IconComponent = opt.icon;
        return (
          <a
            key={opt.label}
            href={opt.href}
            target={opt.target}
            rel={opt.target ? "noopener noreferrer" : undefined}
            aria-label={opt.label}
            title={opt.label}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95 ${opt.className}`}
          >
            <IconComponent className="text-lg" />
          </a>
        );
      })}
    </div>
  );
}