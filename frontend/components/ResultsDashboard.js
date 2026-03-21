import React from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  Hexagon, 
  ArrowLeft, 
  TrendingUp,
  Layout
} from "lucide-react";

// SSR-safe dynamic import for SkillRadar
const SkillRadar = dynamic(() => import("./SkillRadar"), { 
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse bg-slate-50 rounded-2xl" />
});

function CircleProgress({ percentage, size = 95, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle 
          cx={size / 2} cy={size / 2} r={radius} 
          fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth={strokeWidth} 
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="url(#scoreGradUnified)" strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        />
        <defs>
          <linearGradient id="scoreGradUnified" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-slate-900 font-extrabold text-xl tracking-tight">{Math.round(percentage)}%</span>
        <span className="text-slate-400 text-[8px] font-bold uppercase tracking-widest mt-0.5">Match</span>
      </div>
    </div>
  );
}

export default function ResultsDashboard({ data, onReset }) {
  if (!data) return null;

  const analysis = data.analysis || {};
  const readiness = analysis.job_readiness_label || "Analyzing...";
  const matchedCount = analysis.matched_skills?.length || 0;
  const missingCount = analysis.missing_skills?.length || 0;
  const weakCount = analysis.weak_skills?.length || 0;
  
  const getReadinessStyles = (label) => {
    if (label === "Highly Qualified") return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (label === "Good Fit")         return "text-indigo-600 bg-indigo-50 border-indigo-100";
    if (label === "Partially Qualified") return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-rose-600 bg-rose-50 border-rose-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 pb-24"
    >
      {/* Universal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Intelligence Report Live</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Adaptive Career Roadmap</h2>
        </div>
        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Analyze New Role
        </button>
      </div>

      {/* Snapshot Bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        <span className={`px-4 py-2 rounded-xl border text-[11px] font-black uppercase tracking-wider ${getReadinessStyles(readiness)}`}>
          {readiness}
        </span>
        <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-[11px] font-bold text-slate-600">
           <Hexagon className="w-3.5 h-3.5 text-indigo-500" />
           {analysis.resume_skills_count || 0} Domain Skills Detected
        </div>
        {analysis.years_experience > 0 && (
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            {analysis.years_experience}+ Years Professional Experience
          </div>
        )}
        {analysis.engine_mode && (
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <AlertCircle className="w-3.5 h-3.5 text-indigo-500" />
            Engine: {analysis.engine_mode}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">Matched Skills</p>
          <p className="text-2xl font-black text-emerald-600">{matchedCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">Missing Skills</p>
          <p className="text-2xl font-black text-rose-600">{missingCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">Weak Skills</p>
          <p className="text-2xl font-black text-amber-600">{weakCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Signal (Left) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-8 border border-white shadow-2xl shadow-slate-200/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-50 rounded-lg">
                 <TrendingUp className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 uppercase tracking-tight text-xs">Skill DNA Signature</h3>
            </div>
            
            <div className="flex items-center gap-8 mb-8">
              <CircleProgress percentage={data.overall_score} />
              <div>
                <div className="text-3xl font-black text-slate-900">{data.overall_score}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Aggregated Fit Score</div>
              </div>
            </div>

            <SkillRadar data={data.skill_dna} />
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100">
             <div className="flex items-center gap-3 mb-6">
                <Layout className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-slate-900 uppercase tracking-tight text-xs">Gap Intelligence</h3>
             </div>
             <div className="space-y-3">
                {data.gap?.slice(0, 10).map((g, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:border-indigo-100 transition-colors">
                     <span className="text-sm font-bold text-slate-700">{g.skill}</span>
                     <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg ${
                       g.status === 'missing' ? 'text-rose-600 bg-rose-50' : 
                       g.status === 'weak' ? 'text-orange-600 bg-orange-50' : 'text-emerald-600 bg-emerald-50'
                     }`}>
                       {g.status}
                     </span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Adaptive Roadmap (Right) */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-12">
                    <div>
                       <h3 className="text-2xl font-black mb-2 italic">Skill Weaver Roadmap 2.0</h3>
                       <p className="text-slate-400 text-sm font-medium">Graph-optimized adaptive learning sequence</p>
                    </div>
                    {data.time_saved > 0 && (
                      <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl">
                         <div className="text-emerald-400 text-lg font-black">{data.time_saved}%</div>
                         <div className="text-[8px] font-bold uppercase tracking-widest text-white/50">Time Optimization</div>
                      </div>
                    )}
                 </div>

                 <div className="space-y-6">
                    {data.roadmap?.map((step, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex gap-6 group"
                      >
                         <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-black group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all">
                               {i + 1}
                            </div>
                            <div className="w-[1px] h-full bg-white/10 mt-2" />
                         </div>
                         <div className="flex-1 pb-8">
                            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/[0.08] transition-all">
                               <div className="flex justify-between items-start mb-4">
                                  <h4 className="text-lg font-bold text-white tracking-tight">{step.skill}</h4>
                                  <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    {step.level}
                                  </span>
                               </div>
                               <div className="flex items-center gap-3 text-slate-400 text-xs mb-4">
                                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                                  {step.course?.title || "Specialized Lab"}
                               </div>
                               <div className="bg-black/20 rounded-2xl p-4 flex gap-3">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                    {step.course?.task}
                                  </p>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </div>

           {/* AI reasoning cards */}
           <div className="grid md:grid-cols-2 gap-6">
              {data.reasoning?.slice(0, 4).map((r, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                   <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">AI Logic Check</span>
                   </div>
                   <h4 className="font-black text-slate-900 mb-2">{r.skill}</h4>
                   <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{r.reason}</p>
                   <div className="text-[10px] font-bold text-indigo-600 bg-indigo-50 inline-block px-3 py-1.5 rounded-lg border border-indigo-100">
                      Strategy: {r.action}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
