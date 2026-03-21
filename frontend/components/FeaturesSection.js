import { motion } from "framer-motion";
import { Brain, Hexagon, AlertCircle, Lightbulb, Clock, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Skill Intelligence Analysis",
    description: "Our engine cross-references your skills with industry benchmarks, extracting deep competency signals from your resume using semantic parsing.",
    gradient: "from-emerald-500/10 to-blue-500/10",
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    iconColor: "text-emerald-600",
    tag: "Core AI",
  },
  {
    icon: Hexagon,
    title: "Adaptive Learning Path",
    description: "Dynamic roadmap generation that adapts to your learning velocity, adjusting priorities as you progress through each skill milestone.",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-600",
    tag: "Personalized",
  },
  {
    icon: AlertCircle,
    title: "Gap Detection Engine",
    description: "Pinpoints missing, weak, and moderate skill gaps between your current profile and the target role with granular confidence scoring.",
    gradient: "from-orange-500/10 to-red-500/10",
    iconBg: "bg-orange-500/10 border-orange-500/30",
    iconColor: "text-orange-600",
    tag: "Precision",
  },
  {
    icon: Lightbulb,
    title: "Explainable Decisions",
    description: "Every recommendation comes with transparent reasoning — know exactly why each skill was flagged and what action to take next.",
    gradient: "from-yellow-500/10 to-amber-500/10",
    iconBg: "bg-yellow-500/10 border-yellow-500/30",
    iconColor: "text-yellow-600",
    tag: "Transparent",
  },
  {
    icon: Clock,
    title: "Time Optimization",
    description: "Graph-based dependency resolution ensures you learn foundational skills first, cutting wasted effort and maximizing preparation efficiency.",
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    iconColor: "text-emerald-600",
    tag: "Efficient",
  },
  {
    icon: Globe,
    title: "Cross-Domain Support",
    description: "Works across any industry or role — from software engineering to data science, product management, and creative domains.",
    gradient: "from-sky-500/10 to-cyan-500/10",
    iconBg: "bg-sky-500/10 border-sky-500/20",
    iconColor: "text-sky-600",
    tag: "Universal",
  },
];

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative glass-card rounded-2xl p-6 overflow-hidden cursor-default`}
    >
      {/* Gradient BG */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl ${feature.iconBg} border flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
          <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
        </div>

        {/* Tag */}
        <div className="mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${feature.iconColor} px-2 py-0.5 rounded-full ${feature.iconBg} border`}>
            {feature.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-slate-900 font-semibold text-base mb-2 tracking-tight group-hover:text-slate-900 transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(99,102,241,0.04),transparent)]" />

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
            Built for <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Six core capabilities designed to transform raw data into an actionable, personalized career acceleration plan.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
