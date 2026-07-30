
// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    // 1. Lock screen height on desktop (lg:h-screen lg:overflow-hidden)
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-white dark:bg-slate-950 transition-colors overflow-x-hidden">
      
      {/* Sidebar container */}
      <Sidebar role={user?.role} />

      {/* 2. Main content area handles its own scroll now */}
      <main className="flex-1 w-full min-w-0 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}