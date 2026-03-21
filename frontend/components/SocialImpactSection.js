import { motion } from "framer-motion";
import { Building2, Heart, CheckCircle2, Users, TrendingUp } from "lucide-react";

const corporateFeatures = [
  "Bulk team skill gap analysis",
  "Role-specific roadmap generation",
  "Hiring funnel optimization",
  "L&D integration ready",
  "Custom skill taxonomy support",
  "Enterprise-grade reporting",
];

const socialFeatures = [
  "Free access for underserved communities",
  "Career switcher-optimized paths",
  "Multilingual support roadmap",
  "NGO & non-profit partnerships",
  "Micro-credential recognition",
  "Minimal resource, max impact",
];

export default function SocialImpactSection() {
  return (
    <section id="impact" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(139,92,246,0.05),transparent)]" />

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
            Intelligence for <span className="gradient-text">Everyone</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Intra AI serves two distinct missions — enterprise workforce development and community-driven social impact.
          </p>
        </motion.div>

        {/* Cards — always both visible, no toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Corporate Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-600/8 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full mb-4">
                <TrendingUp className="w-3 h-3" />
                Corporate
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Enterprise Workforce Intelligence</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Equip HR and L&D teams with a turnkey skill intelligence platform. Rapidly upskill talent, reduce mismatch costs, and build a future-ready workforce at scale.
              </p>

              <div className="space-y-2.5">
                {corporateFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-pink-600/8 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-5">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-pink-500 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-full mb-4">
                <Users className="w-3 h-3" />
                Social Impact
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Human-Centered Career Transformation</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Break down barriers to opportunity. Intra AI empowers career switchers, displaced workers, and underserved communities with the same intelligence used by enterprise teams — completely free.
              </p>

              <div className="space-y-2.5">
                {socialFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
