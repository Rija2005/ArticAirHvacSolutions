// import { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { 
//   FiUploadCloud, 
//   FiX, 
//   FiAlertTriangle, 
//   FiCalendar, 
//   FiTool, 
//   FiFileText, 
//   FiUser, 
//   FiMail, 
//   FiPhone, 
//   FiCheckCircle,
//   FiArrowRight,
//   FiClock
// } from "react-icons/fi";
// import Card from "../components/Card";
// import Button from "../components/Button";
// import useAuth from "../hooks/useAuth";
// import { createServiceRequest } from "../services/customerService";
// import { getErrorMessage } from "../utils/helpers";
// import api from "../services/api";

// const PENDING_QUOTE_STORAGE_KEY = "pendingQuoteRequest";

// export default function RequestQuote() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const fileInputRef = useRef(null);

//   const serviceSlug = searchParams.get("service") || "";
//   const priorityQuery = searchParams.get("priority") || "normal";

//   const [form, setForm] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     serviceType: "",
//     date: "",
//     description: "",
//     priority: priorityQuery,
//   });

//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [draftRestored, setDraftRestored] = useState(false);
//   const [services, setServices] = useState([]);
//   const [servicesLoading, setServicesLoading] = useState(true);
//   const [isDragging, setIsDragging] = useState(false);

//   // Keep contact info in sync if user logs in mid-session
//   useEffect(() => {
//     if (user) {
//       setForm((prev) => ({
//         ...prev,
//         name: prev.name || user.name || "",
//         email: prev.email || user.email || "",
//         phone: prev.phone || user.phone || "",
//       }));
//     }
//   }, [user]);

//   // Restore Draft logic
//   useEffect(() => {
//     const savedDraft = sessionStorage.getItem(PENDING_QUOTE_STORAGE_KEY);
//     if (!savedDraft) {
//       setForm((prev) => ({
//         ...prev,
//         priority: priorityQuery,
//       }));
//       return;
//     }

//     try {
//       const savedForm = JSON.parse(savedDraft);
//       if (savedForm && typeof savedForm === "object") {
//         setForm((prev) => ({
//           ...prev,
//           ...savedForm,
//           serviceType: prev.serviceType || savedForm.serviceType || serviceSlug,
//           priority: savedForm.priority || priorityQuery,
//         }));
//         setDraftRestored(true);
//       }
//     } catch (restoreError) {
//       console.warn("Unable to restore saved quote draft:", restoreError);
//       setForm((prev) => ({
//         ...prev,
//         priority: priorityQuery,
//       }));
//     }
//   }, [serviceSlug, priorityQuery]);

//   // Fetch Services Catalog
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await api.get("/services");
//         setServices(res.data);
//       } catch (err) {
//         console.error("Failed to load services:", err);
//         setError("Could not load services. Please refresh the page.");
//       } finally {
//         setServicesLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   // Preselect service based on slug URL param
//   useEffect(() => {
//     if (!serviceSlug || form.serviceType || services.length === 0) return;

//     const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, "");
//     const match = services.find((s) => normalize(s.name) === normalize(serviceSlug));

//     if (match) {
//       setForm((prev) => ({ ...prev, serviceType: match._id }));
//     }
//   }, [serviceSlug, services, form.serviceType]);

//   const saveDraft = (nextForm) => {
//     const draft = {
//       name: nextForm.name,
//       email: nextForm.email,
//       phone: nextForm.phone,
//       serviceType: nextForm.serviceType,
//       date: nextForm.date,
//       description: nextForm.description,
//       priority: nextForm.priority,
//     };
//     sessionStorage.setItem(PENDING_QUOTE_STORAGE_KEY, JSON.stringify(draft));
//   };

//   const handleChange = (e) => {
//     const nextForm = { ...form, [e.target.name]: e.target.value };
//     setForm(nextForm);
//     saveDraft(nextForm);
//   };

//   const toggleEmergencyPriority = () => {
//     const nextPriority = form.priority === "emergency" ? "normal" : "emergency";
//     const nextForm = { ...form, priority: nextPriority };
//     setForm(nextForm);
//     saveDraft(nextForm);
//   };

//   // Image Upload Handling & Previews
//   const handleFileSelect = (files) => {
//     const validFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
//     const updatedImages = [...images, ...validFiles];
//     setImages(updatedImages);

//     const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
//     setPreviews((prev) => [...prev, ...newPreviews]);
//   };

//   const removeImage = (index) => {
//     URL.revokeObjectURL(previews[index]);
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files) {
//       handleFileSelect(e.dataTransfer.files);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       saveDraft(form);
//       navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
//       return;
//     }

//     setError("");
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("service", form.serviceType);
//       formData.append("description", form.description);
//       formData.append("preferredDate", form.date);
//       formData.append("priority", form.priority);
//       images.forEach((file) => formData.append("images", file));

//       await createServiceRequest(formData);
//       sessionStorage.removeItem(PENDING_QUOTE_STORAGE_KEY);
//       toast.success("Request submitted — we'll send a formal quotation shortly.");
//       navigate("/customer/requests");
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50/50 text-slate-800 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 placeholder:text-slate-400";
//   const labelClass = "block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5";

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
//       {/* Background Glow Accents */}
//       <div className="max-w-3xl mx-auto relative">
//         <div className="absolute -top-12 -left-12 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

//         {/* Form Header */}
//         <div className="text-center space-y-3 mb-8 animate-fadeIn">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider">
//             <FiClock className="text-primary-500" /> Fast Response Guaranteed
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
//             Request an Estimate
//           </h1>
//           <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
//             Fill out the details below and our certified dispatch team will assemble a tailored quotation for your HVAC system.
//           </p>
//         </div>

//         {/* Main Glassmorphism Form Card */}
//         <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-xl rounded-3xl p-6 sm:p-10 transition-all">
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Draft Restored Banner */}
//             {draftRestored && (
//               <div className="animate-fadeIn rounded-2xl border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm px-4 py-3 text-xs sm:text-sm text-emerald-800 flex items-center gap-2.5 shadow-sm">
//                 <FiCheckCircle className="text-emerald-600 text-lg shrink-0" />
//                 <span>Your previously saved details were automatically restored.</span>
//               </div>
//             )}

//             {/* Contact Information Group */}
//             <div className="space-y-4 pt-1">
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
//                 1. Contact Details
//               </p>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelClass}>
//                     <FiUser className="text-slate-400" /> Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     className={inputClass}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     <FiMail className="text-slate-400" /> Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="john@example.com"
//                     className={inputClass}
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClass}>
//                   <FiPhone className="text-slate-400" /> Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="(555) 000-0000"
//                   className={inputClass}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Service & Schedule Group */}
//             <div className="space-y-4 pt-2">
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
//                 2. Service & Scheduling
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelClass}>
//                     <FiTool className="text-slate-400" /> Service Type
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="serviceType"
//                       value={form.serviceType}
//                       onChange={handleChange}
//                       className={`${inputClass} appearance-none cursor-pointer pr-8`}
//                       required
//                       disabled={servicesLoading}
//                     >
//                       <option value="">
//                         {servicesLoading ? "Loading catalog..." : "Select a service"}
//                       </option>
//                       {services.map((s) => (
//                         <option key={s._id} value={s._id}>
//                           {s.name}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
//                       ▼
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     <FiCalendar className="text-slate-400" /> Preferred Date
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={form.date}
//                     onChange={handleChange}
//                     className={`${inputClass} cursor-pointer`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelClass}>
//                   <FiFileText className="text-slate-400" /> Issue Details
//                 </label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   rows={4}
//                   placeholder="Tell us what you're experiencing (e.g. strange noises, airflow issues, leakages)..."
//                   className={`${inputClass} resize-none`}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Drag & Drop Photo Upload */}
//             <div className="space-y-2 pt-2">
//               <label className={labelClass}>
//                 <FiUploadCloud className="text-slate-400" /> Attach Photos (Optional)
//               </label>
              
//               <div
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//                 onClick={() => fileInputRef.current?.click()}
//                 className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
//                   isDragging
//                     ? "border-primary-500 bg-primary-50/50 scale-[1.01]"
//                     : "border-slate-200 hover:border-primary-400 hover:bg-slate-50/50"
//                 }`}
//               >
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   multiple
//                   accept="image/*"
//                   onChange={(e) => handleFileSelect(e.target.files)}
//                   className="hidden"
//                 />
//                 <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-lg">
//                   <FiUploadCloud />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold text-slate-700">
//                     Click to upload <span className="text-slate-400 font-normal">or drag & drop</span>
//                   </p>
//                   <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, or WEBP up to 10MB each</p>
//                 </div>
//               </div>

//               {/* Image Previews */}
//               {previews.length > 0 && (
//                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-3">
//                   {previews.map((src, index) => (
//                     <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm">
//                       <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           removeImage(index);
//                         }}
//                         className="absolute top-1 right-1 bg-slate-900/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
//                       >
//                         <FiX />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Interactive Emergency Dispatch Card */}
//             <div
//               onClick={toggleEmergencyPriority}
//               className={`rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
//                 form.priority === "emergency"
//                   ? "border-red-500/80 bg-gradient-to-r from-red-50 via-red-50/50 to-orange-50 shadow-md shadow-red-500/10"
//                   : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
//               }`}
//             >
//               <div className="flex items-start gap-4 relative z-10">
//                 <div
//                   className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
//                     form.priority === "emergency"
//                       ? "bg-red-500 text-white shadow-md shadow-red-500/30 animate-pulse"
//                       : "bg-slate-200 text-slate-500"
//                   }`}
//                 >
//                   <FiAlertTriangle className="text-lg" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <span className="font-bold text-sm text-slate-900">
//                       Flag as Emergency Request
//                     </span>
//                     <span
//                       className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
//                         form.priority === "emergency"
//                           ? "bg-red-600 text-white"
//                           : "bg-slate-200 text-slate-600"
//                       }`}
//                     >
//                       {form.priority === "emergency" ? "Active" : "Optional"}
//                     </span>
//                   </div>
//                   <p className="text-xs text-slate-500 mt-1 leading-relaxed">
//                     Instantly flags your ticket in our dispatch portal for immediate priority response within 60 minutes.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2 animate-fadeIn">
//                 <FiAlertTriangle className="shrink-0 text-sm" />
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Unauthenticated User Warning */}
//             {!user && (
//               <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium flex items-center gap-2">
//                 <FiClock className="shrink-0 text-sm text-amber-600" />
//                 <span>
//                   You will be prompted to log in or create an account when submitting. Your entries are saved automatically!
//                 </span>
//               </div>
//             )}

//             {/* Submit CTA Button */}
//             <Button
//               variant="primary"
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 px-6 bg-gradient-to-r from-accent-500 to-orange-500 hover:from-orange-500 hover:to-accent-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-accent-500/20 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   <span>Submitting Request...</span>
//                 </div>
//               ) : (
//                 <>
//                   <span>Submit Estimate Request</span>
//                   <FiArrowRight className="text-base" />
//                 </>
//               )}
//             </Button>

//           </form>
//         </Card>
//       </div>

//     </div>
//   );
// }


// src/pages/RequestQuote.jsx
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FiUploadCloud, 
  FiX, 
  FiAlertTriangle, 
  FiCalendar, 
  FiTool, 
  FiFileText, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCheckCircle,
  FiArrowRight,
  FiClock
} from "react-icons/fi";
import Card from "../components/Card";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { createServiceRequest } from "../services/customerService";
import { getErrorMessage } from "../utils/helpers";
import api from "../services/api";

const PENDING_QUOTE_STORAGE_KEY = "pendingQuoteRequest";

export default function RequestQuote() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);

  const serviceSlug = searchParams.get("service") || "";
  const priorityQuery = searchParams.get("priority") || "normal";

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    serviceType: "",
    date: "",
    description: "",
    priority: priorityQuery,
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Keep contact info in sync if user logs in mid-session
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  // Restore Draft logic
  useEffect(() => {
    const savedDraft = sessionStorage.getItem(PENDING_QUOTE_STORAGE_KEY);
    if (!savedDraft) {
      setForm((prev) => ({
        ...prev,
        priority: priorityQuery,
      }));
      return;
    }

    try {
      const savedForm = JSON.parse(savedDraft);
      if (savedForm && typeof savedForm === "object") {
        setForm((prev) => ({
          ...prev,
          ...savedForm,
          serviceType: prev.serviceType || savedForm.serviceType || serviceSlug,
          priority: savedForm.priority || priorityQuery,
        }));
        setDraftRestored(true);
      }
    } catch (restoreError) {
      console.warn("Unable to restore saved quote draft:", restoreError);
      setForm((prev) => ({
        ...prev,
        priority: priorityQuery,
      }));
    }
  }, [serviceSlug, priorityQuery]);

  // Fetch Services Catalog
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to load services:", err);
        setError("Could not load services. Please refresh the page.");
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Preselect service based on slug URL param
  useEffect(() => {
    if (!serviceSlug || form.serviceType || services.length === 0) return;

    const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, "");
    const match = services.find((s) => normalize(s.name) === normalize(serviceSlug));

    if (match) {
      setForm((prev) => ({ ...prev, serviceType: match._id }));
    }
  }, [serviceSlug, services, form.serviceType]);

  const saveDraft = (nextForm) => {
    const draft = {
      name: nextForm.name,
      email: nextForm.email,
      phone: nextForm.phone,
      serviceType: nextForm.serviceType,
      date: nextForm.date,
      description: nextForm.description,
      priority: nextForm.priority,
    };
    sessionStorage.setItem(PENDING_QUOTE_STORAGE_KEY, JSON.stringify(draft));
  };

  const handleChange = (e) => {
    const nextForm = { ...form, [e.target.name]: e.target.value };
    setForm(nextForm);
    saveDraft(nextForm);
  };

  const toggleEmergencyPriority = () => {
    const nextPriority = form.priority === "emergency" ? "normal" : "emergency";
    const nextForm = { ...form, priority: nextPriority };
    setForm(nextForm);
    saveDraft(nextForm);
  };

  // Image Upload Handling & Previews
  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    const updatedImages = [...images, ...validFiles];
    setImages(updatedImages);

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      saveDraft(form);
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("service", form.serviceType);
      formData.append("description", form.description);
      formData.append("preferredDate", form.date);
      formData.append("priority", form.priority);
      images.forEach((file) => formData.append("images", file));

      await createServiceRequest(formData);
      sessionStorage.removeItem(PENDING_QUOTE_STORAGE_KEY);
      toast.success("Request submitted — we'll send a formal quotation shortly.");
      navigate("/customer/requests");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 
    "w-full border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm bg-slate-50/50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 transition-all duration-200 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 placeholder:text-slate-400 dark:placeholder:text-slate-500";
  
  const labelClass = 
    "block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Background Glow Accents */}
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute -top-12 -left-12 w-72 h-72 bg-primary-400/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Form Header */}
        <div className="text-center space-y-3 mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900/50 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider">
            <FiClock className="text-primary-500 dark:text-primary-400" /> Fast Response Guaranteed
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Request an Estimate
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Fill out the details below and our certified dispatch team will assemble a tailored quotation for your HVAC system.
          </p>
        </div>

        {/* Main Glassmorphism Form Card */}
        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-3xl p-6 sm:p-10 transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Draft Restored Banner */}
            {draftRestored && (
              <div className="animate-fadeIn rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/80 dark:bg-emerald-950/40 backdrop-blur-sm px-4 py-3 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5 shadow-sm">
                <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 text-lg shrink-0" />
                <span>Your previously saved details were automatically restored.</span>
              </div>
            )}

            {/* Contact Information Group */}
            <div className="space-y-4 pt-1">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Contact Details
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <FiUser className="text-slate-400 dark:text-slate-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <FiMail className="text-slate-400 dark:text-slate-500" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <FiPhone className="text-slate-400 dark:text-slate-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Service & Schedule Group */}
            <div className="space-y-4 pt-2">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Service & Scheduling
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <FiTool className="text-slate-400 dark:text-slate-500" /> Service Type
                  </label>
                  <div className="relative">
                    <select
                      name="serviceType"
                      value={form.serviceType}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer pr-8`}
                      required
                      disabled={servicesLoading}
                    >
                      <option value="" className="dark:bg-slate-900">
                        {servicesLoading ? "Loading catalog..." : "Select a service"}
                      </option>
                      {services.map((s) => (
                        <option key={s._id} value={s._id} className="dark:bg-slate-900">
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <FiCalendar className="text-slate-400 dark:text-slate-500" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <FiFileText className="text-slate-400 dark:text-slate-500" /> Issue Details
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us what you're experiencing (e.g. strange noises, airflow issues, leakages)..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>
            </div>

            {/* Drag & Drop Photo Upload */}
            <div className="space-y-2 pt-2">
              <label className={labelClass}>
                <FiUploadCloud className="text-slate-400 dark:text-slate-500" /> Attach Photos (Optional)
              </label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                  isDragging
                    ? "border-primary-500 bg-primary-50/50 dark:bg-primary-950/30 scale-[1.01]"
                    : "border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center text-lg">
                  <FiUploadCloud />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Click to upload <span className="text-slate-400 dark:text-slate-500 font-normal">or drag & drop</span>
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">PNG, JPG, or WEBP up to 10MB each</p>
                </div>
              </div>

              {/* Image Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-3">
                  {previews.map((src, index) => (
                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                      <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-1 right-1 bg-slate-900/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Emergency Dispatch Card */}
            <div
              onClick={toggleEmergencyPriority}
              className={`rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                form.priority === "emergency"
                  ? "border-rose-500/80 dark:border-rose-500/60 bg-gradient-to-r from-rose-50 via-rose-50/50 to-orange-50 dark:from-rose-950/40 dark:via-rose-950/20 dark:to-orange-950/30 shadow-md shadow-rose-500/10"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40"
              }`}
            >
              <div className="flex items-start gap-4 relative z-10">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    form.priority === "emergency"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 animate-pulse"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <FiAlertTriangle className="text-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      Flag as Emergency Request
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                        form.priority === "emergency"
                          ? "bg-rose-600 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {form.priority === "emergency" ? "Active" : "Optional"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Instantly flags your ticket in our dispatch portal for immediate priority response within 60 minutes.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <FiAlertTriangle className="shrink-0 text-sm" />
                <span>{error}</span>
              </div>
            )}

            {/* Unauthenticated User Warning */}
            {!user && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-medium flex items-center gap-2">
                <FiClock className="shrink-0 text-sm text-amber-600 dark:text-amber-400" />
                <span>
                  You will be prompted to log in or create an account when submitting. Your entries are saved automatically!
                </span>
              </div>
            )}

            {/* Submit CTA Button */}
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-accent-500 to-orange-500 hover:from-orange-500 hover:to-accent-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-accent-500/20 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Request...</span>
                </div>
              ) : (
                <>
                  <span>Submit Estimate Request</span>
                  <FiArrowRight className="text-base" />
                </>
              )}
            </Button>

          </form>
        </Card>
      </div>

    </div>
  );
}