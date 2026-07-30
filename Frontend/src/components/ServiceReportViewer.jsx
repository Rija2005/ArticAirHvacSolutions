import React from "react";
import { FiFileText, FiImage, FiEdit3 } from "react-icons/fi";

export default function ServiceReportViewer({ report }) {
  if (!report) return null;

  // Helper function to handle Cloudinary vs Local Image URLs safely
  const getImageUrl = (img) => {
    if (!img) return "";
    return img.startsWith("http") ? img : `http://localhost:5000${img}`;
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        <FiFileText className="text-primary-500" /> Technician Service Report
      </h3>

      {/* Technician Notes */}
      {report.notes && (
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Technician Notes</p>
          <p className="text-xs text-slate-800 dark:text-slate-200 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            {report.notes}
          </p>
        </div>
      )}

      {/* Before Images */}
      {report.beforeImages?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <FiImage /> Before Service Images
          </p>
          <div className="grid grid-cols-2 gap-2">
            {report.beforeImages.map((img, index) => {
              const src = getImageUrl(img);
              return (
                <a key={index} href={src} target="_blank" rel="noreferrer">
                  <img
                    src={src}
                    alt={`before-${index}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 object-cover w-full h-28 hover:opacity-90 transition-opacity"
                  />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* After Images */}
      {report.afterImages?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <FiImage /> After Service Images
          </p>
          <div className="grid grid-cols-2 gap-2">
            {report.afterImages.map((img, index) => {
              const src = getImageUrl(img);
              return (
                <a key={index} href={src} target="_blank" rel="noreferrer">
                  <img
                    src={src}
                    alt={`after-${index}`}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 object-cover w-full h-28 hover:opacity-90 transition-opacity"
                  />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Customer Signature */}
      {report.customerSignature && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <FiEdit3 /> Signed Customer Authorization
          </p>
          <img
            src={report.customerSignature}
            alt="signature"
            className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-2 max-h-36 object-contain"
          />
        </div>
      )}
    </div>
  );
}