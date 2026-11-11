import React from "react";

export default function BrandLogo({ className = "", size = "md" }) {
  const isLarge = size === "lg";
  const iconSize = isLarge ? "w-7 h-7" : "w-6 h-6";
  const fontSize = isLarge ? "text-xl" : "text-base";

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Clean, authentic geometric arrow/nexus mark */}
      <div className={`${iconSize} shrink-0 bg-slate-900 text-white rounded-md flex items-center justify-center shadow-xs`}>
        <svg 
          viewBox="0 0 20 20" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-3.5 h-3.5 text-white"
        >
          <path d="M4 10h12" />
          <path d="M10 4l6 6-6 6" />
        </svg>
      </div>

      {/* Clean, human typographic wordmark */}
      <div className="flex items-baseline gap-0.5 leading-none">
        <span className={`font-bold tracking-tight text-slate-900 ${fontSize}`}>
          Intra
        </span>
        <span className="text-xs font-semibold text-slate-400">
          .ai
        </span>
      </div>
    </div>
  );
}
