
// // src/pages/dispatcher/Scheduling.jsx

// import { useState, useEffect } from "react";
// import Card from "../../components/Card";
// import Badge from "../../components/Badge";
// import Loader from "../../components/Loader";
// import Button from "../../components/Button";
// import Modal from "../../components/Modal";

// import { getAllJobs } from "../../services/dispatcherService";
// import { getReportByJob } from "../../services/customerService";

// import { getErrorMessage } from "../../utils/helpers";

// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// export default function Scheduling() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [activeDay, setActiveDay] = useState(
//     days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
//   );

//   const [report, setReport] = useState(null);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportModal, setReportModal] = useState(false);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await getAllJobs();
//         setJobs(res.data);
//       } catch (err) {
//         setError(getErrorMessage(err));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleViewReport = async (requestId) => {
//     try {
//       setReportLoading(true);

//       const res = await getReportByJob(requestId);

//       setReport(res.data);
//       setReportModal(true);
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setReportLoading(false);
//     }
//   };

//   if (loading) return <Loader fullScreen />;

//   const jobsForDay = jobs.filter((j) => {
//     if (!j.scheduledDate) return false;

//     const jobDay =
//       days[
//         new Date(j.scheduledDate).getDay() === 0
//           ? 6
//           : new Date(j.scheduledDate).getDay() - 1
//       ];

//     return jobDay === activeDay;
//   });

//   return (
//     <div className="space-y-6">
//       <h1 className="text-xl md:text-2xl font-medium">
//         Weekly Calendar
//       </h1>

//       {error && (
//         <p className="text-sm text-red-600">{error}</p>
//       )}

//       <div className="flex gap-2 overflow-x-auto pb-1">
//         {days.map((d) => (
//           <button
//             key={d}
//             onClick={() => setActiveDay(d)}
//             className={`px-4 py-2 rounded-lg text-sm shrink-0 ${
//               activeDay === d
//                 ? "bg-primary-600 text-white"
//                 : "bg-gray-100 text-gray-600"
//             }`}
//           >
//             {d}
//           </button>
//         ))}
//       </div>

//       <Card>
//         <h2 className="font-medium mb-4 text-sm">
//           {activeDay} — Jobs
//         </h2>

//         {jobsForDay.length === 0 ? (
//           <p className="text-sm text-gray-400">
//             No jobs scheduled.
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {jobsForDay.map((j) => (
//               <div
//                 key={j._id}
//                 className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-3 last:border-0 gap-3"
//               >
//                 <div>
//                   <p className="text-sm font-medium">
//                     {j.request?.service?.name}
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     Technician: {j.technician?.name}
//                   </p>

//                   <p className="text-xs text-gray-400">
//                     Customer: {j.request?.customer?.name}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="secondary"
//                     onClick={() =>
//                       handleViewReport(j.request?._id)
//                     }
//                   >
//                     View Report
//                   </Button>

//                   <Badge status="scheduled">
//                     {j._id.slice(-6)}
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </Card>

//       <Modal
//         isOpen={reportModal}
//         onClose={() => {
//           setReportModal(false);
//           setReport(null);
//         }}
//         title="Service Report"
//       >
//         {reportLoading ? (
//           <p className="text-sm text-gray-500">
//             Loading report...
//           </p>
//         ) : report ? (
//           <div className="space-y-5">
//             {report.notes && (
//               <div>
//                 <h3 className="font-medium mb-1">
//                   Technician Notes
//                 </h3>

//                 <p className="text-sm text-gray-600">
//                   {report.notes}
//                 </p>
//               </div>
//             )}

//             {report.beforeImages?.length > 0 && (
//               <div>
//                 <h3 className="font-medium mb-2">
//                   Before Images
//                 </h3>

//                 <div className="grid grid-cols-2 gap-2">
//                   {report.beforeImages.map((img, index) => (
//                     <img
//                       key={index}
//                       src={`http://localhost:5000${img}`}
//                       alt="before"
//                       className="rounded-lg border"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {report.afterImages?.length > 0 && (
//               <div>
//                 <h3 className="font-medium mb-2">
//                   After Images
//                 </h3>

//                 <div className="grid grid-cols-2 gap-2">
//                   {report.afterImages.map((img, index) => (
//                     <img
//                       key={index}
//                       src={`http://localhost:5000${img}`}
//                       alt="after"
//                       className="rounded-lg border"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {report.customerSignature && (
//               <div>
//                 <h3 className="font-medium mb-2">
//                   Customer Signature
//                 </h3>

//                 <img
//                   src={report.customerSignature}
//                   alt="signature"
//                   className="border rounded-lg max-h-40"
//                 />
//               </div>
//             )}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500">
//             No report found.
//           </p>
//         )}
//       </Modal>
//     </div>
//   );
// }
// src/pages/dispatcher/Scheduling.jsx

import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

import { getAllJobs } from "../../services/dispatcherService";
import { getReportByJob } from "../../services/customerService";

import { getErrorMessage } from "../../utils/helpers";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Scheduling() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeDay, setActiveDay] = useState(
    days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
  );

  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewReport = async (requestId) => {
    try {
      setReportLoading(true);

      const res = await getReportByJob(requestId);

      setReport(res.data);
      setReportModal(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setReportLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  // 🔴 Robust Day Matching Logic
  const jobsForDay = jobs.filter((j) => {
    if (!j.scheduledDate) return false;

    const dateObj = new Date(j.scheduledDate);
    const dayIndex = dateObj.getDay(); // 0 is Sunday, 1 is Monday...
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    const jobDay = days[adjustedIndex];

    return jobDay === activeDay;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-medium">
        Weekly Calendar
      </h1>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`px-4 py-2 rounded-lg text-sm shrink-0 font-medium transition-colors ${
              activeDay === d
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <Card>
        <h2 className="font-medium mb-4 text-sm">
          {activeDay} — Jobs ({jobsForDay.length})
        </h2>

        {jobsForDay.length === 0 ? (
          <p className="text-sm text-gray-400">
            No jobs scheduled for this day.
          </p>
        ) : (
          <div className="space-y-3">
            {jobsForDay.map((j) => (
              <div
                key={j._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800 pb-3 last:border-0 gap-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    {j.request?.service?.name || "HVAC Service"}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Technician: <span className="font-medium text-slate-700 dark:text-slate-300">{j.technician?.name || "Unassigned"}</span>
                  </p>

                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    Customer: {j.request?.customer?.name} | Date: {new Date(j.scheduledDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleViewReport(j.request?._id)
                    }
                  >
                    View Report
                  </Button>

                  <Badge status="scheduled">
                    {j._id.slice(-6)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={reportModal}
        onClose={() => {
          setReportModal(false);
          setReport(null);
        }}
        title="Service Report"
      >
        {reportLoading ? (
          <p className="text-sm text-gray-500">
            Loading report...
          </p>
        ) : report ? (
          <div className="space-y-5">
            {report.notes && (
              <div>
                <h3 className="font-medium mb-1">
                  Technician Notes
                </h3>

                <p className="text-sm text-gray-600 dark:text-slate-300">
                  {report.notes}
                </p>
              </div>
            )}

            {report.beforeImages?.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">
                  Before Images
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {report.beforeImages.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${img}`}
                      alt="before"
                      className="rounded-lg border object-cover h-32 w-full"
                    />
                  ))}
                </div>
              </div>
            )}

            {report.afterImages?.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">
                  After Images
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {report.afterImages.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${img}`}
                      alt="after"
                      className="rounded-lg border object-cover h-32 w-full"
                    />
                  ))}
                </div>
              </div>
            )}

            {report.customerSignature && (
              <div>
                <h3 className="font-medium mb-2">
                  Customer Signature
                </h3>

                <img
                  src={report.customerSignature}
                  alt="signature"
                  className="border rounded-lg max-h-40 bg-white"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No report found.
          </p>
        )}
      </Modal>
    </div>
  );
}