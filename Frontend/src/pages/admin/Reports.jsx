
// // src/pages/admin/Reports.jsx
// import { useState, useEffect } from "react";
// import {
//   BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
//   XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
// } from "recharts";
// import {
//   MdPeople, MdBuild, MdSupportAgent, MdWork, MdHourglassEmpty,
//   MdEventAvailable, MdAutorenew, MdCheckCircle, MdPersonAdd,
//   MdDescription, MdReceiptLong, MdTaskAlt, MdStar,
// } from "react-icons/md";
// import Card from "../../components/Card";
// import Badge from "../../components/Badge";
// import Modal from "../../components/Modal";
// import Loader from "../../components/Loader";
// import Button from "../../components/Button";
// import {
//   getTechnicianPerformance,
//   getCustomerGrowth,
//   getDispatchers,
//   getMostRequestedServices,
//   getReportsSummary,
//   getJobStatusDistribution,
//   getRecentActivity,
//   getAllServiceReports,
// } from "../../services/adminService";
// import { getErrorMessage, formatDate, formatStatusLabel } from "../../utils/helpers";

// const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// // Derive the file-server origin from the configured API base (strips trailing /api)
// const UPLOADS_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
// const uploadUrl = (path) => `${UPLOADS_ORIGIN}${path}`;

// const PIE_COLORS = ["#185FA5", "#EF9F27", "#22c55e", "#ef4444", "#378ADD", "#BA7517", "#8b5cf6"];

// const ACTIVITY_ICONS = {
//   new_customer: MdPersonAdd,
//   new_quotation: MdDescription,
//   new_invoice: MdReceiptLong,
//   job_completed: MdTaskAlt,
//   review_submitted: MdStar,
// };

// function StatCard({ icon: Icon, label, value, subtitle }) {
//   return (
//     <Card className="flex items-start gap-3">
//       <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
//         <Icon size={20} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-xl md:text-2xl font-medium leading-tight">{value ?? 0}</p>
//         <p className="text-xs text-gray-500 truncate">{label}</p>
//         {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
//       </div>
//     </Card>
//   );
// }

// export default function Reports() {
//   const [summary, setSummary] = useState(null);
//   const [techData, setTechData] = useState([]);
//   const [dispatcherData, setDispatcherData] = useState([]);
//   const [growthData, setGrowthData] = useState([]);
//   const [serviceData, setServiceData] = useState([]);
//   const [statusData, setStatusData] = useState([]);
//   const [activity, setActivity] = useState([]);
//   const [serviceReports, setServiceReports] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [report, setReport] = useState(null);
//   const [reportModalOpen, setReportModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [
//           summaryRes, techRes, dispatcherRes, growthRes,
//           serviceRes, statusRes, activityRes, reportsRes,
//         ] = await Promise.all([
//           getReportsSummary(),
//           getTechnicianPerformance(),
//           getDispatchers(),
//           getCustomerGrowth(),
//           getMostRequestedServices(),
//           getJobStatusDistribution(),
//           getRecentActivity(),
//           getAllServiceReports(),
//         ]);

//         setSummary(summaryRes.data);
//         setTechData(techRes.data);
//         setDispatcherData(
//           dispatcherRes.data.map((d) => ({
//             name: d.name,
//             "Requests Assigned": d.requestsAssigned,
//             "Jobs Scheduled": d.jobsScheduled,
//           }))
//         );
//         setGrowthData(growthRes.data.map((g) => ({ month: monthNames[g._id - 1], customers: g.count })));
//         setServiceData(serviceRes.data);
//         setStatusData(
//           statusRes.data.map((s) => ({ name: formatStatusLabel(s._id), value: s.count }))
//         );
//         setActivity(activityRes.data);
//         setServiceReports(reportsRes.data);
//       } catch (err) {
//         setError(getErrorMessage(err));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, []);

//   const handleViewReport = (r) => {
//     setReport(r);
//     setReportModalOpen(true);
//   };

//   if (loading) return <Loader fullScreen />;

//   const cards = [
//     { icon: MdPeople, label: "Total Customers", value: summary?.totalCustomers, subtitle: "All registered customers" },
//     { icon: MdBuild, label: "Total Technicians", value: summary?.totalTechnicians, subtitle: "All registered technicians" },
//     { icon: MdSupportAgent, label: "Total Dispatchers", value: summary?.totalDispatchers, subtitle: "All registered dispatchers" },
//     { icon: MdWork, label: "Total Jobs", value: summary?.totalJobs, subtitle: "All service requests" },
//     { icon: MdHourglassEmpty, label: "Pending Jobs", value: summary?.pendingJobs, subtitle: "Awaiting scheduling" },
//     { icon: MdEventAvailable, label: "Scheduled Jobs", value: summary?.scheduledJobs, subtitle: "Assigned to technicians" },
//     { icon: MdAutorenew, label: "In Progress Jobs", value: summary?.inProgressJobs, subtitle: "Currently being worked" },
//     { icon: MdCheckCircle, label: "Completed Jobs", value: summary?.completedJobs, subtitle: "Finished successfully" },
//   ];

//   return (
//     <div className="space-y-6">
//       <h1 className="text-xl md:text-2xl font-medium">Reports & analytics</h1>
//       {error && <p className="text-sm text-red-600">{error}</p>}

//       {/* Top stat cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {cards.map((c) => (
//           <StatCard key={c.label} {...c} />
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <Card>
//           <h2 className="font-medium mb-4 text-sm">Technician performance (jobs completed)</h2>
//           {techData.length === 0 ? (
//             <p className="text-sm text-gray-400">No completed jobs yet.</p>
//           ) : (
//             <ResponsiveContainer width="100%" height={240}>
//               <BarChart data={techData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="name" tick={{ fontSize: 11 }} />
//                 <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="jobs" name="Completed Jobs" fill="#185FA5" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </Card>

//         <Card>
//           <h2 className="font-medium mb-4 text-sm">Dispatcher performance</h2>
//           {dispatcherData.length === 0 ? (
//             <p className="text-sm text-gray-400">No dispatcher activity yet.</p>
//           ) : (
//             <ResponsiveContainer width="100%" height={240}>
//               <BarChart data={dispatcherData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="name" tick={{ fontSize: 11 }} />
//                 <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
//                 <Tooltip />
//                 <Legend wrapperStyle={{ fontSize: 12 }} />
//                 <Bar dataKey="Requests Assigned" fill="#378ADD" radius={[4, 4, 0, 0]} />
//                 <Bar dataKey="Jobs Scheduled" fill="#EF9F27" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </Card>

//         <Card>
//           <h2 className="font-medium mb-4 text-sm">Customer growth</h2>
//           {growthData.length === 0 ? (
//             <p className="text-sm text-gray-400">Not enough data yet.</p>
//           ) : (
//             <ResponsiveContainer width="100%" height={240}>
//               <AreaChart data={growthData}>
//                 <defs>
//                   <linearGradient id="customerGrowth" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#185FA5" stopOpacity={0.35} />
//                     <stop offset="95%" stopColor="#185FA5" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
//                 <Tooltip />
//                 <Area type="monotone" dataKey="customers" stroke="#185FA5" strokeWidth={2} fill="url(#customerGrowth)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           )}
//         </Card>

//         <Card>
//           <h2 className="font-medium mb-4 text-sm">Service category distribution</h2>
//           {serviceData.length === 0 ? (
//             <p className="text-sm text-gray-400">No service requests yet.</p>
//           ) : (
//             <ResponsiveContainer width="100%" height={240}>
//               <PieChart>
//                 <Pie data={serviceData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={{ fontSize: 11 }}>
//                   {serviceData.map((_, i) => (
//                     <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend wrapperStyle={{ fontSize: 11 }} />
//               </PieChart>
//             </ResponsiveContainer>
//           )}
//         </Card>

//         <Card>
//           <h2 className="font-medium mb-4 text-sm">Job status distribution</h2>
//           {statusData.length === 0 ? (
//             <p className="text-sm text-gray-400">No jobs yet.</p>
//           ) : (
//             <ResponsiveContainer width="100%" height={240}>
//               <PieChart>
//                 <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} label={{ fontSize: 11 }}>
//                   {statusData.map((_, i) => (
//                     <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend wrapperStyle={{ fontSize: 11 }} />
//               </PieChart>
//             </ResponsiveContainer>
//           )}
//         </Card>

//         <Card>
//           <h2 className="font-medium mb-4 text-sm">Recent activity</h2>
//           {activity.length === 0 ? (
//             <p className="text-sm text-gray-400">No recent activity.</p>
//           ) : (
//             <ul className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
//               {activity.map((a, i) => {
//                 const Icon = ACTIVITY_ICONS[a.type] || MdDescription;
//                 return (
//                   <li key={i} className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
//                       <Icon size={16} />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm text-gray-700">{a.message}</p>
//                       <p className="text-[11px] text-gray-400">{formatDate(a.date)}</p>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </Card>
//       </div>

//       {/* Recent Service Reports */}
//       <Card>
//         <h2 className="font-medium mb-4 text-sm">Recent service reports</h2>
//         {serviceReports.length === 0 ? (
//           <p className="text-sm text-gray-400">No service reports submitted yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-500 border-b border-gray-100">
//                   <th className="pb-2">Customer</th>
//                   <th className="pb-2">Technician</th>
//                   <th className="pb-2">Dispatcher</th>
//                   <th className="pb-2">Service</th>
//                   <th className="pb-2">Date</th>
//                   <th className="pb-2">Status</th>
//                   <th className="pb-2"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {serviceReports.map((r) => (
//                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
//                     <td className="py-3">{r.job?.request?.customer?.name || "—"}</td>
//                     <td className="py-3">{r.job?.technician?.name || "—"}</td>
//                     <td className="py-3">{r.job?.dispatcher?.name || "—"}</td>
//                     <td className="py-3">{r.job?.request?.service?.name || "—"}</td>
//                     <td className="py-3">{formatDate(r.createdAt)}</td>
//                     <td className="py-3">
//                       <Badge status={r.job?.status}>{formatStatusLabel(r.job?.status)}</Badge>
//                     </td>
//                     <td className="py-3 text-right">
//                       <Button variant="secondary" onClick={() => handleViewReport(r)}>
//                         View Report
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Card>

//       <Modal
//         isOpen={reportModalOpen}
//         onClose={() => { setReportModalOpen(false); setReport(null); }}
//         title="Service Report"
//       >
//         {report && (
//           <div className="space-y-5">
//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div>
//                 <p className="text-xs text-gray-400">Customer</p>
//                 <p className="font-medium">{report.job?.request?.customer?.name || "—"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Technician</p>
//                 <p className="font-medium">{report.job?.technician?.name || "—"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Service</p>
//                 <p className="font-medium">{report.job?.request?.service?.name || "—"}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Job completion date</p>
//                 <p className="font-medium">
//                   {report.job?.status === "completed" ? formatDate(report.job?.updatedAt) : "In progress"}
//                 </p>
//               </div>
//             </div>

//             {report.notes && (
//               <div>
//                 <h3 className="font-medium mb-1">Technician Notes</h3>
//                 <p className="text-sm text-gray-600">{report.notes}</p>
//               </div>
//             )}

//             {report.beforeImages?.length > 0 && (
//               <div>
//                 <h3 className="font-medium mb-2">Before Images</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {report.beforeImages.map((img, index) => (
//                     <img key={index} src={uploadUrl(img)} alt="before" className="rounded-lg border" />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {report.afterImages?.length > 0 && (
//               <div>
//                 <h3 className="font-medium mb-2">After Images</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {report.afterImages.map((img, index) => (
//                     <img key={index} src={uploadUrl(img)} alt="after" className="rounded-lg border" />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {report.customerSignature && (
//               <div>
//                 <h3 className="font-medium mb-2">Customer Signature</h3>
//                 <img src={report.customerSignature} alt="signature" className="border rounded-lg max-h-40" />
//               </div>
//             )}
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }
// src/pages/admin/Reports.jsx
import { useState, useEffect } from "react";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";
import {
  MdPeople, MdBuild, MdSupportAgent, MdWork, MdHourglassEmpty,
  MdEventAvailable, MdAutorenew, MdCheckCircle, MdPersonAdd,
  MdDescription, MdReceiptLong, MdTaskAlt, MdStar,
} from "react-icons/md";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import {
  getTechnicianPerformance,
  getCustomerGrowth,
  getDispatchers,
  getMostRequestedServices,
  getReportsSummary,
  getJobStatusDistribution,
  getRecentActivity,
  getAllServiceReports,
  getDailyRevenue,
  getMaintenanceStats,
} from "../../services/adminService";
import { getErrorMessage, formatDate, formatStatusLabel, formatCurrency } from "../../utils/helpers";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Derive the file-server origin from the configured API base (strips trailing /api)
const UPLOADS_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
const uploadUrl = (path) => `${UPLOADS_ORIGIN}${path}`;

const PIE_COLORS = ["#185FA5", "#EF9F27", "#22c55e", "#ef4444", "#378ADD", "#BA7517", "#8b5cf6"];

const ACTIVITY_ICONS = {
  new_customer: MdPersonAdd,
  new_quotation: MdDescription,
  new_invoice: MdReceiptLong,
  job_completed: MdTaskAlt,
  review_submitted: MdStar,
};

function StatCard({ icon: Icon, label, value, subtitle }) {
  return (
    <Card className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xl md:text-2xl font-medium leading-tight">{value ?? 0}</p>
        <p className="text-xs text-gray-500 truncate">{label}</p>
        {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </Card>
  );
}

export default function Reports() {
  const [summary, setSummary] = useState(null);
  const [techData, setTechData] = useState([]);
  const [dispatcherData, setDispatcherData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [activity, setActivity] = useState([]);
  const [serviceReports, setServiceReports] = useState([]);
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [maintenanceStats, setMaintenanceStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [report, setReport] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          summaryRes, techRes, dispatcherRes, growthRes,
          serviceRes, statusRes, activityRes, reportsRes,
          dailyRevenueRes, maintenanceStatsRes,
        ] = await Promise.all([
          getReportsSummary(),
          getTechnicianPerformance(),
          getDispatchers(),
          getCustomerGrowth(),
          getMostRequestedServices(),
          getJobStatusDistribution(),
          getRecentActivity(),
          getAllServiceReports(),
          getDailyRevenue(),
          getMaintenanceStats(),
        ]);

        setSummary(summaryRes.data);
        setTechData(techRes.data);
        setDispatcherData(
          dispatcherRes.data.map((d) => ({
            name: d.name,
            "Requests Assigned": d.requestsAssigned,
            "Jobs Scheduled": d.jobsScheduled,
          }))
        );
        setGrowthData(growthRes.data.map((g) => ({ month: monthNames[g._id - 1], customers: g.count })));
        setServiceData(serviceRes.data);
        setStatusData(
          statusRes.data.map((s) => ({ name: formatStatusLabel(s._id), value: s.count }))
        );
        setActivity(activityRes.data);
        setServiceReports(reportsRes.data);
        setDailyRevenueData(
          dailyRevenueRes.data.map((d) => ({
            day: new Date(d._id).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
            revenue: d.total,
          }))
        );
        setMaintenanceStats(maintenanceStatsRes.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleViewReport = (r) => {
    setReport(r);
    setReportModalOpen(true);
  };

  if (loading) return <Loader fullScreen />;

  const cards = [
    { icon: MdPeople, label: "Total Customers", value: summary?.totalCustomers, subtitle: "All registered customers" },
    { icon: MdBuild, label: "Total Technicians", value: summary?.totalTechnicians, subtitle: "All registered technicians" },
    { icon: MdSupportAgent, label: "Total Dispatchers", value: summary?.totalDispatchers, subtitle: "All registered dispatchers" },
    { icon: MdWork, label: "Total Jobs", value: summary?.totalJobs, subtitle: "All service requests" },
    { icon: MdHourglassEmpty, label: "Pending Jobs", value: summary?.pendingJobs, subtitle: "Awaiting scheduling" },
    { icon: MdEventAvailable, label: "Scheduled Jobs", value: summary?.scheduledJobs, subtitle: "Assigned to technicians" },
    { icon: MdAutorenew, label: "In Progress Jobs", value: summary?.inProgressJobs, subtitle: "Currently being worked" },
    { icon: MdCheckCircle, label: "Completed Jobs", value: summary?.completedJobs, subtitle: "Finished successfully" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">Reports & analytics</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Top stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-medium mb-4 text-sm">Technician performance (jobs completed)</h2>
          {techData.length === 0 ? (
            <p className="text-sm text-gray-400">No completed jobs yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={techData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="jobs" name="Completed Jobs" fill="#185FA5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Dispatcher performance</h2>
          {dispatcherData.length === 0 ? (
            <p className="text-sm text-gray-400">No dispatcher activity yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dispatcherData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Requests Assigned" fill="#378ADD" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Jobs Scheduled" fill="#EF9F27" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Customer growth</h2>
          {growthData.length === 0 ? (
            <p className="text-sm text-gray-400">Not enough data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="customerGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#185FA5" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#185FA5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="customers" stroke="#185FA5" strokeWidth={2} fill="url(#customerGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Daily revenue (last 14 days)</h2>
          {dailyRevenueData.length === 0 ? (
            <p className="text-sm text-gray-400">No paid invoices in this period.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Service category distribution</h2>
          {serviceData.length === 0 ? (
            <p className="text-sm text-gray-400">No service requests yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={serviceData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={{ fontSize: 11 }}>
                  {serviceData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Job status distribution</h2>
          {statusData.length === 0 ? (
            <p className="text-sm text-gray-400">No jobs yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} label={{ fontSize: 11 }}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Maintenance contract statistics</h2>
          {!maintenanceStats || maintenanceStats.byPlan.length === 0 ? (
            <p className="text-sm text-gray-400">No maintenance contracts yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="rounded-lg bg-primary-50 py-2">
                  <p className="text-lg font-medium text-primary-700">{maintenanceStats.activeCount}</p>
                  <p className="text-[11px] text-gray-500">Active</p>
                </div>
                <div className="rounded-lg bg-gray-100 py-2">
                  <p className="text-lg font-medium text-gray-600">{maintenanceStats.expiredCount}</p>
                  <p className="text-[11px] text-gray-500">Expired</p>
                </div>
                <div className="rounded-lg bg-accent-500/10 py-2">
                  <p className="text-lg font-medium text-accent-600">{maintenanceStats.renewingSoon}</p>
                  <p className="text-[11px] text-gray-500">Renewing in 30d</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={maintenanceStats.byPlan} dataKey="count" nameKey="plan" cx="50%" cy="50%" outerRadius={65} label={{ fontSize: 11 }}>
                    {maintenanceStats.byPlan.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
        </Card>

        <Card>
          <h2 className="font-medium mb-4 text-sm">Recent activity</h2>
          {activity.length === 0 ? (
            <p className="text-sm text-gray-400">No recent activity.</p>
          ) : (
            <ul className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
              {activity.map((a, i) => {
                const Icon = ACTIVITY_ICONS[a.type] || MdDescription;
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-700">{a.message}</p>
                      <p className="text-[11px] text-gray-400">{formatDate(a.date)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      {/* Recent Service Reports */}
      <Card>
        <h2 className="font-medium mb-4 text-sm">Recent service reports</h2>
        {serviceReports.length === 0 ? (
          <p className="text-sm text-gray-400">No service reports submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Technician</th>
                  <th className="pb-2">Dispatcher</th>
                  <th className="pb-2">Service</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {serviceReports.map((r) => (
                  <tr key={r._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">{r.job?.request?.customer?.name || "—"}</td>
                    <td className="py-3">{r.job?.technician?.name || "—"}</td>
                    <td className="py-3">{r.job?.dispatcher?.name || "—"}</td>
                    <td className="py-3">{r.job?.request?.service?.name || "—"}</td>
                    <td className="py-3">{formatDate(r.createdAt)}</td>
                    <td className="py-3">
                      <Badge status={r.job?.status}>{formatStatusLabel(r.job?.status)}</Badge>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="secondary" onClick={() => handleViewReport(r)}>
                        View Report
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={reportModalOpen}
        onClose={() => { setReportModalOpen(false); setReport(null); }}
        title="Service Report"
      >
        {report && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Customer</p>
                <p className="font-medium">{report.job?.request?.customer?.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Technician</p>
                <p className="font-medium">{report.job?.technician?.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Service</p>
                <p className="font-medium">{report.job?.request?.service?.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Job completion date</p>
                <p className="font-medium">
                  {report.job?.status === "completed" ? formatDate(report.job?.updatedAt) : "In progress"}
                </p>
              </div>
            </div>

            {report.notes && (
              <div>
                <h3 className="font-medium mb-1">Technician Notes</h3>
                <p className="text-sm text-gray-600">{report.notes}</p>
              </div>
            )}

            {report.beforeImages?.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Before Images</h3>
                <div className="grid grid-cols-2 gap-2">
                  {report.beforeImages.map((img, index) => (
                    <img key={index} src={uploadUrl(img)} alt="before" className="rounded-lg border" />
                  ))}
                </div>
              </div>
            )}

            {report.afterImages?.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">After Images</h3>
                <div className="grid grid-cols-2 gap-2">
                  {report.afterImages.map((img, index) => (
                    <img key={index} src={uploadUrl(img)} alt="after" className="rounded-lg border" />
                  ))}
                </div>
              </div>
            )}

            {report.customerSignature && (
              <div>
                <h3 className="font-medium mb-2">Customer Signature</h3>
                <img src={report.customerSignature} alt="signature" className="border rounded-lg max-h-40" />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
