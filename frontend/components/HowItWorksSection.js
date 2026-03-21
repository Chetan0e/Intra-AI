import { motion } from "framer-motion";
import { Upload, Brain, AlertCircle, Map, ArrowDown, Hexagon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Materials",
    description: "Provide your resume and the target job description. Supports PDF, DOCX, and plain text formats.",
    color: "indigo",
    detail: "Drag & drop or click to upload",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes Your Skills",
    description: "Our intelligence engine performs semantic extraction, mapping every competency in your profile against industry standards.",
    color: "purple",
    detail: "~2–5 seconds analysis time",
  },
  {
    number: "03",
    icon: AlertCircle,
    title: "Identify Skill Gaps",
    description: "Missing, weak, and moderate gaps are detected and ranked by their impact on your job readiness score.",
    color: "orange",
    detail: "Confidence-scored gap detection",
  },
  {
    number: "04",
    icon: Map,
    title: "Receive Your Roadmap",
    description: "A graph-optimized, personalized learning roadmap is generated — with resource recommendations and time estimates.",
    color: "emerald",
    detail: "Priority-ordered learning path",
  },
];

const colorMap = {
  indigo: {
    ring: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    connector: "from-emerald-500/50 to-purple-500/50",
  },
  purple: {
    ring: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    badge: "bg-purple-500/10 border-purple-500/20 text-purple-600",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    connector: "from-purple-500/50 to-orange-500/50",
  },
  orange: {
    ring: "border-orange-500/30",
    bg: "bg-orange-500/10",
    text: "text-orange-600",
    badge: "bg-orange-500/10 border-orange-500/30 text-orange-600",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.15)]",
    connector: "from-orange-500/50 to-emerald-500/50",
  },
  emerald: {
    ring: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
    glow: "",
    connector: "",
  },
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,92,246,0.04),transparent)]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            How <span className="gradient-text">Intra AI</span> Works
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
            Four intelligent steps from raw data to a career-accelerating learning plan — in under 10 seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const c = colorMap[step.color];
            return (
              <div key={step.number} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className={`group glass-card rounded-2xl p-6 flex gap-5 items-start transition-all duration-300 hover:border-slate-200 ${
                    index === 0 ? "" : ""
                  }`}
                >
                  {/* Number + Icon container */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.ring} flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${c.glow}`}>
                      <step.icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <span className={`text-[11px] font-black tracking-widest ${c.text} opacity-60`}>{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-slate-900 font-bold text-lg tracking-tight">{step.title}</h3>
                      <span className={`hidden sm:block text-[10px] font-semibold px-2.5 py-1 rounded-full border ${c.badge} shrink-0`}>
                        {step.detail}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>

                {/* Connector arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className="flex justify-center my-2"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <div className={`w-[1px] h-3 bg-gradient-to-b ${c.connector}`} />
                      <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
