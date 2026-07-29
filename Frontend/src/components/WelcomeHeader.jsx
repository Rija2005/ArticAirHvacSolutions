// // src/components/WelcomeHeader.jsx

// const greeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good morning";
//   if (hour < 18) return "Good afternoon";
//   return "Good evening";
// };

// // Reusable enhanced dashboard header — glassmorphism + gradient, used across all 4 role dashboards
// export default function WelcomeHeader({ name, roleLabel, subtitle }) {
//   return (
//     <div className="relative overflow-hidden rounded-2xl mb-6">
//       {/* Gradient base */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600" />

//       {/* Soft blurred accent blobs for depth */}
//       <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
//       <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />

//       {/* Glass content layer */}
//       <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-8 md:px-8 md:py-10">
//         <p className="text-primary-100 text-sm font-medium">
//           {greeting()}{roleLabel ? ` · ${roleLabel}` : ""}
//         </p>
//         <h1 className="text-2xl md:text-3xl font-semibold text-white mt-1 tracking-tight">
//           Welcome back{name ? `, ${name}` : ""}
//         </h1>
//         {subtitle && <p className="text-primary-100/90 text-sm mt-2 max-w-lg">{subtitle}</p>}
//       </div>
//     </div>
//   );
// }
// src/components/WelcomeHeader.jsx

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Reusable enhanced dashboard header — glassmorphism + gradient, used across all 4 role dashboards
export default function WelcomeHeader({ name, roleLabel, subtitle }) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg transition-all duration-300">
      {/* Gradient base using your custom Primary & Accent CSS Theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600" />

      {/* Soft blurred accent blobs for depth */}
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glass content layer */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 px-6 py-8 md:px-8 md:py-10">
        
        {/* Greeting & Role Label */}
        <p className="text-white/90 text-xs md:text-sm font-medium tracking-wide uppercase">
          {greeting()}{roleLabel ? ` · ${roleLabel}` : ""}
        </p>

        {/* Welcome Back Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mt-1 tracking-tight drop-shadow-sm">
          Welcome back{name ? `, ${name}` : ""}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/80 text-sm md:text-base mt-2 max-w-xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}

      </div>
    </div>
  );
}