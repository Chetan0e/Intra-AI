import { motion } from "framer-motion";
import { Hexagon, TrendingUp, AlertCircle, BookOpen, Clock, CheckCircle2, ChevronRight } from "lucide-react";

// Fake dashboard data
const skillDNA = [
  { skill: "Python", score: 90, color: "#6366f1" },
  { skill: "React", score: 72, color: "#8b5cf6" },
  { skill: "SQL", score: 65, color: "#a78bfa" },
  { skill: "System Design", score: 30, color: "#c084fc" },
  { skill: "Docker", score: 45, color: "#e879f9" },
];

const gaps = [
  { skill: "Kubernetes", status: "missing", priority: "High" },
  { skill: "System Design", status: "weak", priority: "High" },
  { skill: "GraphQL", status: "moderate", priority: "Medium" },
  { skill: "TypeScript", status: "moderate", priority: "Medium" },
  { skill: "AWS Lambda", status: "missing", priority: "High" },
];

const roadmap = [
  { skill: "Kubernetes Fundamentals", level: "Beginner → Intermediate", time: "2 weeks", done: false },
  { skill: "System Design Patterns", level: "Intermediate", time: "3 weeks", done: false },
  { skill: "GraphQL APIs", level: "Beginner", time: "1 week", done: false },
  { skill: "TypeScript Deep Dive", level: "Intermediate", time: "2 weeks", done: false },
];

// Minimal SVG-based skill bar
function SkillBar({ skill, score, color, delay = 0 }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-slate-600 font-medium">{skill}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

// Circular progress ring
function CircleProgress({ percentage, size = 80, strokeWidth = 7, color = "#6366f1" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-slate-900 font-bold text-sm">{percentage}%</span>
      </div>
    </div>
  );
}

export default function DashboardPreviewSection() {
  return (
    <section id="dashboard" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(99,102,241,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Your Intelligence <span className="gradient-text">Command Center</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            A real-time view of your skill profile, gap analysis, and adaptive roadmap — all in one unified dashboard.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-3xl overflow-hidden relative"
        >
          {/* Top gradient border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          {/* Dashboard header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-emerald-500 to-purple-600 flex items-center justify-center">
                  <Hexagon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-900">Intra AI — Intelligence Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-[11px] text-slate-500 font-medium">Analysis Complete</span>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left column: Match Score + DNA */}
            <div className="space-y-5">
              {/* Match card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900">Overall Match Score</h3>
                </div>
                <div className="flex items-center gap-5">
                  <CircleProgress percentage={78} size={80} color="#6366f1" />
                  <div>
                    <p className="text-2xl font-bold text-slate-900">78%</p>
                    <p className="text-xs text-slate-500 mt-0.5">Job Readiness</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] text-emerald-600 font-medium">+12% from avg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill DNA */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                  <Hexagon className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900">Skill DNA Profile</h3>
                </div>
                {skillDNA.map((item, i) => (
                  <SkillBar key={item.skill} {...item} delay={i * 0.1} />
                ))}
              </div>
            </div>

            {/* Middle column: Gap Analysis */}
            <div className="space-y-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 h-full">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                  <AlertCircle className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900">Gap Detection</h3>
                </div>

                <div className="space-y-2.5">
                  {gaps.map((gap, i) => (
                    <motion.div
                      key={gap.skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-200 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{gap.skill}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Priority: {gap.priority}</p>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                        gap.status === "missing"
                          ? "bg-red-500/10 text-red-600 border-red-500/30"
                          : gap.status === "weak"
                          ? "bg-orange-500/10 text-orange-600 border-orange-500/30"
                          : "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
                      }`}>
                        {gap.status}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-red-600 font-bold text-base">3</p>
                    <p className="text-[10px] text-slate-400">Missing</p>
                  </div>
                  <div>
                    <p className="text-orange-600 font-bold text-base">1</p>
                    <p className="text-[10px] text-slate-400">Weak</p>
                  </div>
                  <div>
                    <p className="text-yellow-600 font-bold text-base">2</p>
                    <p className="text-[10px] text-slate-400">Moderate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Roadmap */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900">Adaptive Roadmap</h3>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <Clock className="w-3 h-3" />
                  8 weeks
                </div>
              </div>

              <div className="relative pl-4 border-l border-slate-800 space-y-5">
                {roadmap.map((item, i) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="relative group"
                  >
                    {/* dot */}
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full border-2 border-emerald-500/50 bg-slate-50 group-hover:border-emerald-400 transition-colors" />

                    <div className="bg-white border border-slate-200 rounded-xl p-3 group-hover:border-slate-200 transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-xs font-semibold text-slate-900 leading-tight">{item.skill}</h4>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500">{item.level}</span>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-600/80">
                          <Clock className="w-2.5 h-2.5" />
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span>Overall Progress</span>
                  <span className="text-emerald-600 font-semibold">0 / 4</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
