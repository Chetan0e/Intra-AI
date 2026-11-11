import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  BookOpen, 
  Clock, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ArrowRight,
  Printer,
  ArrowLeft,
  Map,
  AlertTriangle,
  Activity,
  Lightbulb,
  ShieldCheck,
  Menu,
  X,
  Briefcase
} from "lucide-react";
import BrandLogo from "./BrandLogo";

// SSR-safe dynamic import for SkillRadar
const SkillRadar = dynamic(() => import("./SkillRadar"), { 
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse bg-slate-100 rounded-xl border border-slate-200" />
});

function CompactScoreRing({ percentage }) {
  const size = 64;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle 
          cx={size / 2} cy={size / 2} r={radius} 
          fill="none" 
          stroke="#F1F5F9" 
          strokeWidth={strokeWidth} 
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius} 
          fill="none" 
          stroke="#0F172A" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-sm font-bold text-slate-900 leading-none">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}

export default function ResultsDashboard({ data, onReset, onBackToHome }) {
  const [activeTab, setActiveTab] = useState("roadmap"); // "roadmap" | "gaps" | "skills" | "reasoning"
  const [gapFilter, setGapFilter] = useState("all");
  const [completedSteps, setCompletedSteps] = useState({});
  const [expandedMilestones, setExpandedMilestones] = useState({ 0: true });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!data) return null;

  const analysis = data.analysis || {};
  const readiness = analysis.job_readiness_label || "Analyzing...";
  const missingCount = analysis.missing_skills?.length || 0;
  const weakCount = analysis.weak_skills?.length || 0;
  const totalGaps = data.gap?.length || 0;
  const detectedSkills = analysis.resume_skills_count || Object.keys(data.skill_dna || {}).length;
  const timeSavedText = data.time_saved && data.time_saved > 0 ? `+${data.time_saved}% Faster` : "~35% Saved";

  const guidance = missingCount > 0
    ? "Priority focus: Close the critical screening dealbreakers first before progressing to specialized modules."
    : weakCount > 0
    ? "You are close to role-ready. Focus on strengthening weak competencies with targeted practical deliverables."
    : "Strong profile fit. Focus on advanced architecture projects and technical interview preparation.";

  const toggleStepCompleted = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleMilestoneExpand = (idx) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const filteredGaps = (data.gap || []).filter(g => {
    if (gapFilter === "all") return true;
    return g.status?.toLowerCase() === gapFilter;
  });

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalMilestones = data.roadmap?.length || 0;
  const progressPercent = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

  const navItems = [
    {
      id: "roadmap",
      label: "Learning Roadmap",
      icon: Map,
      count: totalMilestones,
    },
    {
      id: "gaps",
      label: "Skill Gap Diagnostics",
      icon: AlertTriangle,
      count: totalGaps,
    },
    {
      id: "skills",
      label: "Competency Radar",
      icon: Activity,
      count: "DNA",
    },
    {
      id: "reasoning",
      label: "Decision Rationale",
      icon: Lightbulb,
      count: data.reasoning?.length || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      
      {/* ── MOBILE NAVBAR TOGGLE (Small Screens Only) ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 z-50 px-4 flex items-center justify-between shadow-xs">
        <BrandLogo size="sm" />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── BACKDROP OVERLAY FOR MOBILE SIDEBAR ── */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
        />
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── LEFT SIDEBAR (Standard Professional App Layout) ──         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <aside className={`fixed lg:sticky top-0 bottom-0 left-0 w-72 bg-white border-r border-slate-200 z-50 flex flex-col justify-between shrink-0 h-screen transition-transform duration-200 ease-in-out print:hidden ${
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <BrandLogo size="md" />
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Dossier
            </span>
          </div>

          {/* Role Fit Summary Card in Sidebar */}
          <div className="p-4 m-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
            <div className="flex items-center gap-3.5">
              <CompactScoreRing percentage={data.overall_score} />
              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Overall Match
                </span>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {readiness} Fit
                </p>
                <p className="text-xs text-slate-500">
                  {Math.round(data.overall_score)}% Role Readiness
                </p>
              </div>
            </div>

            {/* Quick Micro-Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-xs">
              <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block">Skills</span>
                <span className="font-bold text-slate-900">{detectedSkills} detected</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 block">Gaps</span>
                <span className="font-bold text-rose-600">{totalGaps} to close</span>
              </div>
            </div>
          </div>

          {/* Sidebar Nav Items */}
          <div className="px-3 space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Dossier Views
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-slate-800 text-slate-200"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom Sidebar Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2 bg-white">
          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Export / Print Plan</span>
          </button>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>Start New Analysis</span>
          </button>

          <button
            onClick={onBackToHome}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Home</span>
          </button>
        </div>

      </aside>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── MAIN CONTENT AREA (Full-Width Responsive Layout) ──         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <main className="flex-1 flex flex-col min-w-0 pt-14 lg:pt-0 overflow-y-auto">
        
        {/* Top Strategy Header Bar */}
        <div className="bg-white border-b border-slate-200 px-6 sm:px-8 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>Dossier</span>
                <span>/</span>
                <span className="text-slate-900 font-semibold capitalize">
                  {activeTab === "roadmap" && "Sequenced Learning Roadmap"}
                  {activeTab === "gaps" && "Requirement Gap Diagnostics"}
                  {activeTab === "skills" && "Competency DNA Radar"}
                  {activeTab === "reasoning" && "Decision Rationale Log"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {activeTab === "roadmap" && "Sequenced Learning Milestones"}
                {activeTab === "gaps" && "Identified Skill Gaps"}
                {activeTab === "skills" && "Skill Proficiency Radar"}
                {activeTab === "reasoning" && "Decision Trace & Rationale"}
              </h1>
            </div>

            {/* Strategy Pill */}
            <div className="max-w-md p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {guidance}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body - Expanded across full available width */}
        <div className="p-6 sm:p-8 lg:p-10 w-full flex-1">
          
          {/* ══════════════════════════════════════════════════════════ */}
          {/* TAB 1: ROADMAP (2-Column Balanced Master-Detail Layout)   */}
          {/* ══════════════════════════════════════════════════════════ */}
          {activeTab === "roadmap" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (8 cols): Progress Tracker & Milestones List */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Progress Summary Strip */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {completedCount} of {totalMilestones} Milestones Completed
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        ({progressPercent}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Check off milestones as you build project deliverables.
                    </p>
                  </div>

                  <div className="w-full sm:w-56">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className="h-full bg-slate-900 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Milestones List */}
                <div className="space-y-3">
                  {data.roadmap?.map((step, idx) => {
                    const isCompleted = Boolean(completedSteps[idx]);
                    const isExpanded = Boolean(expandedMilestones[idx]);

                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border transition-all duration-150 overflow-hidden ${
                          isCompleted
                            ? "bg-slate-50/70 border-slate-200 opacity-80"
                            : "bg-white border-slate-200 shadow-xs hover:border-slate-300"
                        }`}
                      >
                        {/* Milestone Header */}
                        <div 
                          onClick={() => toggleMilestoneExpand(idx)}
                          className="p-4 sm:p-4.5 flex items-center justify-between gap-4 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Completion Checkbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStepCompleted(idx);
                              }}
                              className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${
                                isCompleted
                                  ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                                  : "bg-white border-slate-300 text-transparent hover:border-slate-500"
                              }`}
                              aria-label="Mark milestone complete"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </button>

                            {/* Step Index */}
                            <span className={`w-6 h-6 rounded font-mono text-[11px] font-bold flex items-center justify-center shrink-0 ${
                              isCompleted
                                ? "bg-slate-200 text-slate-500"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}>
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </span>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`text-sm font-semibold truncate ${
                                  isCompleted ? "line-through text-slate-400" : "text-slate-900"
                                }`}>
                                  {step.skill}
                                </h3>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {step.level || "Prerequisite"}
                                </span>
                              </div>

                              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{step.course?.title || "Specialized Module"}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {step.course?.duration || (step.course?.time ? `${step.course.time} Weeks` : "1–2 Weeks")}
                            </span>
                            
                            <div className="text-slate-400 p-1">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3">
                            <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                                Hands-On Practical Deliverable
                              </span>
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                                {step.course?.task || "Build a focused project deliverable validating this technical competency."}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                              <span>Prerequisites sequenced first</span>
                              <span>•</span>
                              <span>Directly targets screening dealbreakers</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Right Column (4 cols): Role Benchmark, Telemetry & Guidelines */}
              <div className="lg:col-span-4 space-y-5">
                
                {/* Target Role Benchmark Card */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Target Role Benchmark
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {readiness}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm font-bold text-slate-900">
                        {analysis.target_role || "Target Role Benchmark"}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Roadmap mathematically sequenced to satisfy core screening dealbreakers and job requirements.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Screening Dealbreakers:</span>
                      <span className="font-semibold text-rose-600">{missingCount} missing</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Skills to Strengthen:</span>
                      <span className="font-semibold text-amber-600">{weakCount} weak</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Total Milestones:</span>
                      <span className="font-semibold text-slate-900">{totalMilestones} modules</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Time Optimization:</span>
                      <span className="font-semibold text-emerald-600">{timeSavedText}</span>
                    </div>
                  </div>
                </div>

                {/* Sequencing Methodology Card */}
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Sequencing Methodology
                  </span>
                  <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                      <span><strong>Prerequisites First:</strong> Foundational concepts are completed before advanced tools.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                      <span><strong>Practical Deliverables:</strong> Each milestone requires building a verifiable project.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                      <span><strong>Zero Fluff:</strong> Automatically skips competencies you have already validated.</span>
                    </div>
                  </div>
                </div>

                {/* Quick Offline Export Card */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                  <p className="text-xs font-semibold text-slate-900">
                    Offline Tracking
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Print or save your custom roadmap to track your milestone progress offline.
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════════ */}
          {/* TAB 2: GAP ANALYSIS (Full-Width Responsive 3-Col Grid)    */}
          {/* ══════════════════════════════════════════════════════════ */}
          {activeTab === "gaps" && (
            <div className="space-y-6">
              
              {/* Filter Tabs */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredGaps.length} of {totalGaps} Identified Gaps
                </span>

                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-xs">
                  {["all", "missing", "weak"].map(f => (
                    <button
                      key={f}
                      onClick={() => setGapFilter(f)}
                      className={`px-3 py-1 rounded-md text-xs capitalize font-medium transition-colors ${
                        gapFilter === f ? "bg-slate-900 text-white font-semibold" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gaps Grid across full width */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredGaps.map((g, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{g.skill}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        g.status?.toLowerCase() === "missing"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {g.status?.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {g.status?.toLowerCase() === "missing"
                        ? "Not detected in your resume. High-impact screening dealbreaker for target role."
                        : "Partially demonstrated. Additional practical evidence recommended."}
                    </p>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Priority: <strong>{g.priority || "High"}</strong></span>
                      <span className="text-slate-900 font-medium">Included in Roadmap →</span>
                    </div>
                  </div>
                ))}

                {filteredGaps.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-slate-400 text-xs">
                    No gaps matching the selected filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════ */}
          {/* TAB 3: RADAR & DNA (Spacious Multi-Column Layout)         */}
          {/* ══════════════════════════════════════════════════════════ */}
          {activeTab === "skills" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h2 className="text-base font-bold text-slate-900">
                  Proficiency Radar
                </h2>
                <p className="text-xs text-slate-500">
                  Multi-axial evaluation of technical depth across core competencies.
                </p>
                <SkillRadar data={data.skill_dna} />
              </div>

              <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Extracted Competencies
                    </h3>
                    <p className="text-xs text-slate-500">
                      Breakdown of concept, practical, and real-world execution.
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {Object.keys(data.skill_dna || {}).length} Total Skills
                  </span>
                </div>

                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
                  {Object.entries(data.skill_dna || {}).map(([skill, dna]) => {
                    const avg = Math.round((dna.conceptual + dna.practical + dna.real_world) / 3);
                    return (
                      <div key={skill} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-900">{skill}</span>
                          <span className="font-semibold text-slate-900">{avg}%</span>
                        </div>
                        
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-slate-900 rounded-full" 
                            style={{ width: `${avg}%` }} 
                          />
                        </div>

                        <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                          <span>Concept: {dna.conceptual}%</span>
                          <span>Practical: {dna.practical}%</span>
                          <span>Real-world: {dna.real_world}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════════ */}
          {/* TAB 4: DECISION RATIONALE (Full-Width Responsive 2-Col)   */}
          {/* ══════════════════════════════════════════════════════════ */}
          {activeTab === "reasoning" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.reasoning || []).map((r, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{r.skill}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {r.priority} Priority
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {r.reason}
                    </p>

                    <div className="text-xs pt-2 border-t border-slate-100 text-slate-700">
                      <span className="text-slate-400 mr-1.5">Action:</span>
                      <span>{r.action}</span>
                    </div>
                  </div>
                ))}

                {(!data.reasoning || data.reasoning.length === 0) && (
                  <div className="col-span-2 text-center py-12 text-slate-400 text-xs">
                    Standard prerequisite sequencing applied.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
