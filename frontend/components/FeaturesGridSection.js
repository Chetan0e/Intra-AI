import { Dna, GitBranch, Search, Zap, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function FeaturesGridSection({ onGetStarted }) {
  const features = [
    {
      icon: Dna,
      title: "Skill DNA Profiling",
      desc: "Extracts not just whether a keyword exists, but evaluates its depth — classifying capabilities into theoretical understanding vs. real-world production execution.",
      badge: "Deep Extraction",
      color: "teal",
    },
    {
      icon: GitBranch,
      title: "Topological Graph Engine",
      desc: "Uses Directed Acyclic Graphs (DAGs) to resolve prerequisite dependencies. You will never be assigned advanced modules without mastering foundational concepts first.",
      badge: "Graph Theory",
      color: "blue",
    },
    {
      icon: Search,
      title: "Explainable AI (XAI)",
      desc: "No black boxes. Intra AI provides an explicit reasoning trace for every single skill, explaining exactly why it was assigned, prioritized, or skipped.",
      badge: "100% Transparent",
      color: "indigo",
    },
    {
      icon: Zap,
      title: "Dual-Engine Architecture",
      desc: "Combines an in-house trained predictive machine learning pipeline with automated LLM fallback engines. Guaranteed high availability and zero latency spikes.",
      badge: "Zero Downtime",
      color: "amber",
    },
    {
      icon: Clock,
      title: "45% Reduction in Study Time",
      desc: "By automatically skipping redundant training on capabilities you have already demonstrated, total time required to reach job-readiness is cut nearly in half.",
      badge: "Validated ROI",
      color: "emerald",
    },
    {
      icon: ShieldCheck,
      title: "Private In-Memory Analysis",
      desc: "Your resume and job descriptions are processed volatilely in server memory during your session. Nothing is ever saved to persistent disk or used to train external models.",
      badge: "Enterprise Grade",
      color: "slate",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50/60 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-3">
            <span>03 / Core Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
            Architected for Precision Workforce Intelligence.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Every layer of Intra AI is built to turn complex unstructured career data into verifiable, executable steps.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-800">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight mb-2.5">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
