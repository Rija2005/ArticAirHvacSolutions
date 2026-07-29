// // src/layouts/AuthLayout.jsx
// import { Outlet, Link } from "react-router-dom";

// export default function AuthLayout() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
//       <div className="w-full max-w-sm">
//         <Link to="/" className="block text-center mb-6">
//           <span className="font-medium text-lg text-primary-700">
//             ArcticAir<span className="text-accent-500">HVAC</span>
//           </span>
//         </Link>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// src/layouts/AuthLayout.jsx
import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-6 relative transition-colors">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center mb-6">
          <span className="font-medium text-lg text-primary-700 dark:text-primary-400">
            ArcticAir<span className="text-accent-500">HVAC</span>
          </span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}