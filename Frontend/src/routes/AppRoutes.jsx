
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import RequestQuote from "../pages/RequestQuote";
import About from "../pages/About";
import MaintenancePlans from "../pages/MaintenancePlans";
import EmergencyServices from "../pages/EmergencyServices";
import Testimonials from "../pages/Testimonials";
import ServiceAreas from "../pages/ServiceAreas";
import FAQ from "../pages/FAQ";
import Reviews from "../pages/admin/Reviews";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ChangePassword from "../pages/auth/ChangePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import Profile from "../pages/customer/Profile";
import ServiceRequests from "../pages/customer/ServicesRequest";
import Quotations from "../pages/customer/Quotations";
import Invoices from "../pages/customer/Invoices";
import MaintenanceContracts from "../pages/customer/MaintenanceContracts";
import Notifications from "../pages/customer/Notification";

import TechnicianDashboard from "../pages/technician/TechnicianDashboard";
import AssignedJobs from "../pages/technician/AssignedJobs";
import ServiceReports from "../pages/technician/ServiceReports";
import JobHistory from "../pages/technician/JobHistory";


import DispatcherDashboard from "../pages/dispatcher/DispatcherDashboard";
import AssignTechnician from "../pages/dispatcher/AssignTechnician";
import Scheduling from "../pages/dispatcher/Scheduling";
import EmergencyRequests from "../pages/dispatcher/EmergencyRequests";
import TechnicianAvailability from "../pages/dispatcher/TechnicianAvailability";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageCustomers from "../pages/admin/Customers";
import ManageTechnicians from "../pages/admin/Technicians";
import ManageDispatchers from "../pages/admin/Dispatchers";
import ManageQuotations from "../pages/admin/Quotations";
import ManageInvoices from "../pages/admin/Invoices";
import ManagePayments from "../pages/admin/Payments";
import ManageMaintenancePlans from "../pages/admin/MaintenancePlans";
import Reports from "../pages/admin/Reports";
import ManageNotifications from "../pages/admin/Notifications";
import AddEmployee from "../pages/admin/AddEmployee";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-quote" element={<RequestQuote />} />
        <Route path="/about" element={<About />} />
        <Route path="/maintenance-plans" element={<MaintenancePlans />} />
        <Route path="/emergency-services" element={<EmergencyServices />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin/reviews" element={<Reviews />} />
      </Route>

      {/* Auth pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Change password — any logged-in role can land here */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute allowedRoles={["customer", "technician", "dispatcher", "admin"]}>
            <AuthLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ChangePassword />} />
      </Route>

      {/* Customer */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/requests" element={<ServiceRequests />} />
        <Route path="/customer/quotations" element={<Quotations />} />
        <Route path="/customer/invoices" element={<Invoices />} />
        <Route path="/customer/contracts" element={<MaintenanceContracts />} />
        <Route path="/customer/notifications" element={<Notifications />} />
      </Route>

      {/* Technician */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["technician"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
        <Route path="/technician/jobs" element={<AssignedJobs />} />
        <Route path="/technician/reports" element={<ServiceReports />} />
        <Route path="/technician/history" element={<JobHistory />} />
        
      </Route>

      {/* Dispatcher */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["dispatcher"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dispatcher/dashboard" element={<DispatcherDashboard />} />
        <Route path="/dispatcher/assign" element={<AssignTechnician />} />
        <Route path="/dispatcher/scheduling" element={<Scheduling />} />
        <Route path="/dispatcher/emergency" element={<EmergencyRequests />} />
        <Route path="/dispatcher/availability" element={<TechnicianAvailability />} />
      </Route>

      {/* Admin */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<ManageCustomers />} />
        <Route path="/admin/technicians" element={<ManageTechnicians />} />
        <Route path="/admin/dispatchers" element={<ManageDispatchers />} />
        <Route path="/admin/quotations" element={<ManageQuotations />} />
        <Route path="/admin/invoices" element={<ManageInvoices />} />
        <Route path="/admin/payments" element={<ManagePayments />} />
        <Route path="/admin/maintenance-plans" element={<ManageMaintenancePlans />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/notifications" element={<ManageNotifications />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Route>
    </Routes>
  );
}