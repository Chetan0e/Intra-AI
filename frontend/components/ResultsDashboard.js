import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, BookOpen, Clock, Hexagon, LineChart, ArrowLeft, TrendingUp } from "lucide-react";
import SkillRadar from "./SkillRadar";

function CircleProgress({ percentage, size = 90, strokeWidth = 8, color = "#6366f1" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={`url(#scoreGrad)`} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-slate-900 font-bold text-lg leading-none">{percentage}%</span>
        <span className="text-slate-400 text-[9px] mt-0.5 font-medium">MATCH</span>
      </div>
    </div>
  );
}

export default function ResultsDashboard({ data, onReset }) {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 pb-24"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-xs font-semibold text-emerald-600 tracking-wide">Analysis Complete</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your Adaptive Intelligence Report</h2>
            </div>
            <button
              id="reset-btn"
              onClick={onReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-200 transition-all duration-200 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              New Analysis
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: Score + DNA + Gaps */}
            <div className="lg:col-span-1 space-y-5">

              {/* Score Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900">Skill Match Score</h3>
                </div>
                <div className="flex items-center gap-5">
                  <CircleProgress percentage={data.overall_score || 0} />
                  <div>
                    <p className="text-3xl font-bold text-slate-900">{data.overall_score || 0}<span className="text-lg text-slate-500">%</span></p>
                    <p className="text-xs text-slate-500 mt-1">Job Readiness Index</p>
                    {data.time_saved && (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600">
                        <Clock className="w-3 h-3" />
                        {data.time_saved}% est. time saved
                      </div>
                    )}
                  </div>
                </div>
                {data.skill_dna && (
                  <div className="mt-5">
                    <SkillRadar data={data.skill_dna} />
                  </div>
                )}
              </motion.div>

              {/* Gap Intelligence */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200">
                  <AlertCircle className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900">Gap Intelligence</h3>
                </div>
                <div className="space-y-2.5">
                  {data.gap.map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.2 }}
                      className="flex justify-between items-center p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-200 transition-colors"
                    >
                      <span className="font-medium text-sm text-slate-800">{g.skill}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        g.status === 'missing' ? 'bg-red-500/10 text-red-600 border-red-500/30' :
                        g.status === 'weak' ? 'bg-orange-500/10 text-orange-600 border-orange-500/30' :
                        g.status === 'moderate' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30' :
                        'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                      }`}>
                        {g.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Roadmap + Explainer */}
            <div className="lg:col-span-2 space-y-5">

              {/* Roadmap */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass-card rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-5 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <BookOpen className="w-4 h-4 text-slate-600" />
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">Adaptive Roadmap</h3>
                    </div>
                    <p className="text-slate-500 text-xs">Graph-optimized personalized learning path</p>
                  </div>
                  {data.time_saved && (
                    <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {data.time_saved}% Estimated Time Saved
                    </div>
                  )}
                </div>

                <div className="relative border-l border-slate-800 ml-4 space-y-7 pb-2">
                  {data.roadmap.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                      className="relative pl-8 group"
                    >
                      {/* Timeline node */}
                      <div className="absolute w-3 h-3 rounded-full -left-[6px] top-5 border-2 border-emerald-500/50 bg-slate-50 group-hover:border-emerald-400 group-hover:scale-125 transition-all duration-300" />

                      <div className="glass-panel rounded-2xl p-5 border border-slate-200 group-hover:border-slate-200 transition-all duration-300">
                        <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
                          <h4 className="text-base font-bold text-slate-900">{step.skill}</h4>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200 uppercase tracking-widest">
                            {step.level}
                          </span>
                        </div>
                        {step.course?.title && (
                          <div className="text-slate-700 font-semibold text-sm mb-3 flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                            {step.course.title}
                          </div>
                        )}
                        {step.course?.task && (
                          <div className="text-slate-600 text-xs flex items-start gap-2 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{step.course.task}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI Reasoning */}
              {data.reasoning && data.reasoning.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                    <Hexagon className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Explainable AI — Decision Trace</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {data.reasoning.slice(0, 4).map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 + 0.4 }}
                        className="bg-white border border-slate-200 p-4 rounded-xl hover:border-slate-200 transition-colors"
                      >
                        <p className="font-bold text-slate-900 text-sm mb-2">{r.skill}</p>
                        <p className="text-slate-500 text-xs leading-relaxed mb-3">{r.reason}</p>
                        <span className="text-slate-700 text-[11px] flex items-center gap-1.5 bg-white w-fit px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {r.action}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
