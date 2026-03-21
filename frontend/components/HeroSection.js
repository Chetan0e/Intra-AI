import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Brain, Target, TrendingUp, Hexagon, CheckCircle2, XCircle, Lock, ChevronDown, BarChart2, BookOpen, Layers } from "lucide-react";

// ============================================================
// WIDE MULTI-PANEL DASHBOARD MOCK (ref: second image)
// ============================================================
function DashboardMock() {
  const badgeColor = (s) =>
    s >= 80
      ? "bg-emerald-100 text-emerald-700"
      : s >= 60
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-600";

  const skillRows = [
    { label: "Content", score: 90, bar: "emerald" },
    { label: "Format", score: 74, bar: "purple" },
    { label: "Style", score: 40, bar: "rose" },
    { label: "Sections", score: 40, bar: "rose" },
    { label: "Skills", score: 68, bar: "amber" },
  ];

  const gapItems = [
    { label: "System Design", tag: "missing", tagClass: "bg-rose-100 text-rose-600" },
    { label: "Kubernetes", tag: "weak", tagClass: "bg-orange-100 text-orange-600" },
    { label: "GraphQL", tag: "moderate", tagClass: "bg-amber-100 text-amber-600" },
  ];

  const roadmapItems = [
    { step: 1, label: "Master System Design", pct: 100, color: "emerald" },
    { step: 2, label: "Kubernetes Mastery", pct: 45, color: "purple" },
    { step: 3, label: "Build GraphQL APIs", pct: 0, color: "slate" },
  ];

  const barColor = {
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
    rose: "bg-rose-400",
    amber: "bg-amber-400",
    slate: "bg-slate-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full lg:col-span-1"
    >
      {/* Browser chrome frame */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-xl shadow-2xl shadow-purple-200/30 border border-white/80 overflow-hidden">
        
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/70 border-b border-slate-100">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-emerald-500 to-purple-600 flex items-center justify-center">
              <Hexagon className="w-2.5 h-2.5 text-white" fill="currentColor" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide">Intra AI Dashboard</span>
          </div>
          {/* Right side nav items */}
          <div className="ml-auto flex items-center gap-3">
            <div className="w-14 h-1.5 rounded-full bg-slate-200" />
            <div className="w-10 h-1.5 rounded-full bg-slate-200" />
            <div className="w-10 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>

        {/* Three-column dashboard */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 min-h-[330px]">

          {/* ── Column 1: Score + Skill Breakdown ── */}
          <div className="bg-white/80 p-4 flex flex-col gap-4">
            {/* Donut score */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="9" />
                  <motion.circle
                    cx="40" cy="40" r="32"
                    fill="none"
                    stroke="url(#donutGrad)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray="201"
                    initial={{ strokeDashoffset: 201 }}
                    animate={{ strokeDashoffset: 201 - 201 * 0.78 }}
                    transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-slate-900 leading-none">78%</span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Match Score</p>
              <p className="text-[9px] text-slate-400 mt-0.5">24 issues found</p>
            </div>

            {/* Skill bars */}
            <div className="space-y-2.5">
              {skillRows.map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{row.label}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${badgeColor(row.score)}`}>{row.score}%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.score}%` }}
                      transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                      className={`h-full ${barColor[row.bar]} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Column 2: Skill Gaps ── */}
          <div className="bg-slate-50/60 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Skill Gaps</span>
            </div>

            {/* Gap rows */}
            <div className="space-y-2">
              {gapItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 border border-slate-100 shadow-sm">
                  <span className="text-[11px] font-semibold text-slate-700">{item.label}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.tagClass}`}>{item.tag}</span>
                </div>
              ))}
            </div>

            {/* ATS bar */}
            <div className="mt-auto pt-3 border-t border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] text-slate-500 font-semibold">ATS Match</span>
                <span className="text-[10px] font-black text-emerald-600">78%</span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.8, delay: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full"
                />
                {/* Tracker dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-full shadow-md"
                  initial={{ left: "0%" }}
                  animate={{ left: "76%" }}
                  transition={{ duration: 1.8, delay: 1, ease: "easeOut" }}
                  style={{ transform: "translate(-50%, -50%)" }}
                />
              </div>
              {/* Skeleton lines */}
              <div className="space-y-1.5 mt-2.5">
                {[90, 75, 55].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Column 3: Adaptive Roadmap ── */}
          <div className="bg-white/80 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Roadmap</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-[9px] text-slate-400 font-medium">Auto-generated</span>
              </div>
            </div>

            <div className="space-y-3">
              {roadmapItems.map((item) => (
                <div key={item.step} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
                    item.pct === 100 ? "bg-emerald-100 text-emerald-700" :
                    item.pct > 0 ? "bg-purple-100 text-purple-700" :
                    "bg-slate-100 text-slate-400"
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className={`text-[11px] font-bold mb-1 ${item.pct === 0 ? "text-slate-400" : "text-slate-700"}`}>
                      {item.label}
                    </p>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      {item.pct > 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
                          className={`h-full ${barColor[item.color]} rounded-full`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom time save card */}
            <div className="mt-auto pt-3 border-t border-slate-100">
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-purple-50 border border-emerald-100/50 p-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <Layers className="w-3 h-3 text-purple-500" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Estimated Savings</span>
                </div>
                <p className="text-lg font-extrabold gradient-text leading-none">~3 Months</p>
                <p className="text-[9px] text-slate-400 mt-0.5">Compared to self-guided learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// STAT BADGE
// ============================================================
function StatBadge({ icon: Icon, value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-sm"
    >
      <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-emerald-600" />
      </div>
      <div>
        <div className="text-slate-900 font-extrabold text-sm leading-none">{value}</div>
        <div className="text-slate-400 text-[10px] mt-0.5 font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-16 pb-0 overflow-hidden">
      {/* Subtle top radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(139,92,246,0.07),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex-1 flex flex-col justify-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 items-center">
          {/* ——— Left: Copy ——— */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] tracking-tight text-slate-900 mb-1">
                From Within
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] tracking-tight gradient-text mb-6">
                to Workforce
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-500 text-base leading-relaxed mb-8 max-w-md"
            >
              Intra AI analyzes your resume and target job description to generate a personalized, adaptive learning roadmap — powered by a skill intelligence engine that identifies gaps and prioritizes your growth path.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                id="hero-cta-primary"
                onClick={onGetStarted}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-purple-600 text-white font-bold hover:from-emerald-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-emerald-500/20 text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Generate Your Path
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-700 hover:border-slate-300 hover:bg-white transition-all duration-300 text-sm font-semibold"
              >
                How It Works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2.5"
            >
              <StatBadge icon={Brain} value="98%" label="Skill Accuracy" delay={0.4} />
              <StatBadge icon={Target} value="4 Steps" label="To Your Roadmap" delay={0.5} />
              <StatBadge icon={TrendingUp} value="40%" label="Faster Learning" delay={0.6} />
            </motion.div>
          </div>

          {/* ——— Right: Wide Dashboard ——— */}
          <DashboardMock />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 text-center pb-5 pt-3">
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="inline-flex flex-col items-center gap-1.5"
        >
          <p className="text-slate-300 text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</p>
          <div className="w-6 h-9 rounded-full border-2 border-slate-200 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-purple-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
