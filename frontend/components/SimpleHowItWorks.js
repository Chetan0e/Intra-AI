import { FileText, Target, GitBranch, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function SimpleHowItWorks({ onGetStarted }) {
  const steps = [
    {
      step: "01",
      badge: "Smart Resume Parsing",
      title: "Upload Your Resume",
      desc: "Upload your resume in PDF, Word, or plain text. Intra AI analyzes your real-world projects, toolchains, and experience — eliminating keyword bias.",
      icon: FileText,
      accent: "teal",
      highlights: [
        "In-memory text & structure extraction",
        "Evaluates real projects over keyword stuffing",
        "Assesses practical seniority & toolchains",
      ],
    },
    {
      step: "02",
      badge: "Skill Gap Analysis",
      title: "Identify What's Missing",
      desc: "Select a target role or paste any Job Description. Our engine pinpoints the exact screening dealbreakers and gaps required to pass interviews.",
      icon: Target,
      accent: "blue",
      highlights: [
        "Identifies 1st-round screening dealbreakers",
        "Ranks missing vs underdeveloped skills",
        "Benchmarked against live tech & modern job roles",
      ],
    },
    {
      step: "03",
      badge: "Personalized Roadmap",
      title: "Follow Your Custom Path",
      desc: "Get an optimized, step-by-step learning roadmap. It automatically skips skills you already have, saving up to 45% of unnecessary study time.",
      icon: GitBranch,
      accent: "indigo",
      highlights: [
        "Sequences prerequisite concepts first",
        "Skips validated skills to eliminate redundant study",
        "Step-by-step milestone timeline with curated resources",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-3">
            <span>01 / The Methodology</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
            Three Steps. Zero Redundant Learning.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Intra AI replaces generic 200-hour course bundles with a mathematically sequenced learning path calibrated exclusively for your target role.
          </p>
        </div>

        {/* 3-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-display font-bold text-lg border border-slate-200">
                      {item.step}
                    </div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon className="w-5 h-5 text-teal-600 shrink-0" />
                    <h3 className="font-display text-xl font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-5 border-t border-slate-100 space-y-2.5">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Action Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">100% In-Memory & Private</h4>
              <p className="text-xs text-slate-500">Your documents are processed volatilely in memory and never stored or shared.</p>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-xs"
          >
            <span>Analyze Your Resume Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
