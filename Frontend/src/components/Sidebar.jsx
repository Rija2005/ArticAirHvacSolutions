// // src/components/Sidebar.jsx

// import { useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import ThemeToggle from "./ThemeToggle";
// import NotificationBell from "./NotificationBell"; // 👈 1. NotificationBell import kiya

// import {
//   MdDashboard,
//   MdAssignment,
//   MdDescription,
//   MdReceipt,
//   MdCalendarMonth,
//   MdNotifications,
//   MdPerson,
//   MdBuild,
//   MdHistory,
//   MdPersonAdd,
//   MdPeople,
//   MdCreditCard,
//   MdBarChart,
//   MdStar,
//   MdWarning,
//   MdLogout,
//   MdMenu,
//   MdClose,
//   MdPersonSearch,
// } from "react-icons/md";

// const navConfig = {
//   customer: [
//     { name: "Dashboard", path: "/customer/dashboard", icon: MdDashboard },
//     { name: "Service Requests", path: "/customer/requests", icon: MdAssignment },
//     { name: "Quotations", path: "/customer/quotations", icon: MdDescription },
//     { name: "Invoices", path: "/customer/invoices", icon: MdReceipt },
//     { name: "Maintenance Contracts", path: "/customer/contracts", icon: MdCalendarMonth },
//     { name: "Notifications", path: "/customer/notifications", icon: MdNotifications },
//     { name: "Profile", path: "/customer/profile", icon: MdPerson },
//   ],

//   technician: [
//     { name: "Dashboard", path: "/technician/dashboard", icon: MdDashboard },
//     { name: "Assigned Jobs", path: "/technician/jobs", icon: MdBuild },
//     { name: "Service Reports", path: "/technician/reports", icon: MdDescription },
//     { name: "Job History", path: "/technician/history", icon: MdHistory },
//   ],

//   dispatcher: [
//     { name: "Dashboard", path: "/dispatcher/dashboard", icon: MdDashboard },
//     { name: "Assign Technician", path: "/dispatcher/assign", icon: MdPersonSearch },
//     { name: "Scheduling", path: "/dispatcher/scheduling", icon: MdCalendarMonth },
//     { name: "Emergency Requests", path: "/dispatcher/emergency", icon: MdWarning },
//     { name: "Technician Availability", path: "/dispatcher/availability", icon: MdPeople },
//   ],

//   admin: [
//     { name: "Dashboard", path: "/admin/dashboard", icon: MdDashboard },
//     { name: "Customers", path: "/admin/customers", icon: MdPeople },
//     { name: "Technicians", path: "/admin/technicians", icon: MdBuild },
//     { name: "Dispatchers", path: "/admin/dispatchers", icon: MdPeople },
//     { name: "Quotations", path: "/admin/quotations", icon: MdDescription },
//     { name: "Invoices", path: "/admin/invoices", icon: MdReceipt },
//     { name: "Payments", path: "/admin/payments", icon: MdCreditCard },
//     { name: "Maintenance Plans", path: "/admin/maintenance-plans", icon: MdCalendarMonth },
//     { name: "Reports", path: "/admin/reports", icon: MdBarChart },
//     { name: "Notifications", path: "/admin/notifications", icon: MdNotifications },
//     { name: "Reviews", path: "/admin/reviews", icon: MdStar },
//     { name: "Add Employee", path: "/admin/add-employee", icon: MdPersonAdd },
//   ],
// };

// export default function Sidebar({ role = "customer" }) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const links = navConfig[role] || [];
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const getDashboardHomePath = (userRole) => {
//     switch (userRole) {
//       case "customer":
//         return "/customer/dashboard";
//       case "technician":
//         return "/technician/dashboard";
//       case "dispatcher":
//         return "/dispatcher/dashboard";
//       case "admin":
//         return "/admin/dashboard";
//       default:
//         return "/";
//     }
//   };

//   const getInitials = (name = "") => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/";
//   };

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
//       isActive
//         ? "bg-primary-700 text-white shadow-md"
//         : "text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:text-primary-700 dark:hover:text-primary-400"
//     }`;

//   const currentRole = user?.role || role;
//   const dashboardHome = getDashboardHomePath(currentRole);

//   return (
//     <>
//       {/* Mobile Header */}
//       <div className="lg:hidden flex items-center justify-between bg-white dark:bg-slate-900 border-b dark:border-slate-800 px-5 py-4">
//         <div>
//           <p className="font-display font-semibold text-primary-700 dark:text-primary-400">ArcticAir HVAC</p>
//           <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{currentRole} panel</p>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* 👈 2. Mobile Header me Notification Bell & ThemeToggle */}
//           <NotificationBell />
//           <ThemeToggle />
//           <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800">
//             {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Overlay */}
//       {mobileOpen && (
//         <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:sticky top-0 left-0 z-50 w-72 h-screen flex-shrink-0 overflow-y-auto bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col transition-transform duration-300 ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         {/* Logo + Notification Bell + Theme toggle */}
//         <div className="flex items-center justify-between mb-7">
//           <Link to={dashboardHome} onClick={() => setMobileOpen(false)}>
//             <p className="font-display font-bold text-xl text-primary-700 dark:text-primary-400">
//               ArcticAir <span className="text-accent-500">HVAC</span>
//             </p>
//             <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-1">
//               {currentRole} dashboard
//             </p>
//           </Link>

//           {/* 👈 3. Desktop Sidebar Top Right me NotificationBell + ThemeToggle */}
//           <div className="flex items-center gap-1">
//             <NotificationBell />
//             <ThemeToggle />
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-2 overflow-y-auto">
//           {links.map((link) => {
//             const Icon = link.icon;

//             return (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setMobileOpen(false)}
//                 className={linkClass}
//               >
//                 <Icon size={20} />
//                 <span>{link.name}</span>
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* User Profile Footer */}
//         <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-11 h-11 rounded-full bg-primary-700 text-white flex items-center justify-center font-semibold">
//               {getInitials(user?.name || user?.email || "User")}
//             </div>

//             <div>
//               <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
//                 {user?.name || "User"}
//               </p>

//               <p className="text-xs text-slate-500 dark:text-slate-400">
//                 {user?.email || "No email"}
//               </p>

//               <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 capitalize">
//                 {currentRole}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
//           >
//             <MdLogout size={20} />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// src/components/Sidebar.jsx

import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";

import {
  MdDashboard,
  MdAssignment,
  MdDescription,
  MdReceipt,
  MdCalendarMonth,
  MdNotifications,
  MdPerson,
  MdBuild,
  MdHistory,
  MdPersonAdd,
  MdPeople,
  MdCreditCard,
  MdBarChart,
  MdStar,
  MdWarning,
  MdLogout,
  MdMenu,
  MdClose,
  MdPersonSearch,
} from "react-icons/md";

const navConfig = {
  customer: [
    { name: "Dashboard", path: "/customer/dashboard", icon: MdDashboard },
    { name: "Service Requests", path: "/customer/requests", icon: MdAssignment },
    { name: "Quotations", path: "/customer/quotations", icon: MdDescription },
    { name: "Invoices", path: "/customer/invoices", icon: MdReceipt },
    { name: "Maintenance Contracts", path: "/customer/contracts", icon: MdCalendarMonth },
    { name: "Notifications", path: "/customer/notifications", icon: MdNotifications },
    { name: "Profile", path: "/customer/profile", icon: MdPerson },
  ],

  technician: [
    { name: "Dashboard", path: "/technician/dashboard", icon: MdDashboard },
    { name: "Assigned Jobs", path: "/technician/jobs", icon: MdBuild },
    { name: "Service Reports", path: "/technician/reports", icon: MdDescription },
    { name: "Job History", path: "/technician/history", icon: MdHistory },
  ],

  dispatcher: [
    { name: "Dashboard", path: "/dispatcher/dashboard", icon: MdDashboard },
    { name: "Assign Technician", path: "/dispatcher/assign", icon: MdPersonSearch },
    { name: "Scheduling", path: "/dispatcher/scheduling", icon: MdCalendarMonth },
    { name: "Emergency Requests", path: "/dispatcher/emergency", icon: MdWarning },
    { name: "Technician Availability", path: "/dispatcher/availability", icon: MdPeople },
  ],

  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: MdDashboard },
    { name: "Customers", path: "/admin/customers", icon: MdPeople },
    { name: "Technicians", path: "/admin/technicians", icon: MdBuild },
    { name: "Dispatchers", path: "/admin/dispatchers", icon: MdPeople },
    { name: "Quotations", path: "/admin/quotations", icon: MdDescription },
    { name: "Invoices", path: "/admin/invoices", icon: MdReceipt },
    { name: "Payments", path: "/admin/payments", icon: MdCreditCard },
    { name: "Maintenance Plans", path: "/admin/maintenance-plans", icon: MdCalendarMonth },
    { name: "Reports", path: "/admin/reports", icon: MdBarChart },
    { name: "Notifications", path: "/admin/notifications", icon: MdNotifications },
    { name: "Reviews", path: "/admin/reviews", icon: MdStar },
    { name: "Add Employee", path: "/admin/add-employee", icon: MdPersonAdd },
  ],
};

export default function Sidebar({ role = "customer" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = navConfig[role] || [];
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardHomePath = (userRole) => {
    switch (userRole) {
      case "customer":
        return "/customer/dashboard";
      case "technician":
        return "/technician/dashboard";
      case "dispatcher":
        return "/dispatcher/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
      isActive
        ? "bg-primary-700 text-white shadow-md"
        : "text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:text-primary-700 dark:hover:text-primary-400"
    }`;

  const currentRole = user?.role || role;
  const dashboardHome = getDashboardHomePath(currentRole);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-white dark:bg-slate-900 border-b dark:border-slate-800 px-5 py-4">
        <div>
          <p className="font-display font-semibold text-primary-700 dark:text-primary-400">ArcticAir HVAC</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{currentRole} panel</p>
        </div>

        <div className="flex items-center gap-2">
          <NotificationBell />
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800">
            {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* 🔴 FIXED: Removed outer overflow-y-auto and boosted z-index to z-[999] */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-[999] w-72 h-screen flex-shrink-0 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo + Notification Bell + Theme toggle */}
        <div className="flex items-center justify-between mb-7">
          <Link to={dashboardHome} onClick={() => setMobileOpen(false)}>
            <p className="font-display font-bold text-xl text-primary-700 dark:text-primary-400">
              ArcticAir <span className="text-accent-500">HVAC</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-1">
              {currentRole} dashboard
            </p>
          </Link>

          <div className="flex items-center gap-1">
            <NotificationBell />
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={linkClass}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-primary-700 text-white flex items-center justify-center font-semibold">
              {getInitials(user?.name || user?.email || "User")}
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email || "No email"}
              </p>

              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 capitalize">
                {currentRole}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}