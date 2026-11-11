import { Check, X, ArrowRight, Sparkles } from "lucide-react";

export default function ComparisonSection({ onGetStarted }) {
  const comparisons = [
    {
      metric: "Personalization",
      traditional: "Generic, one-size-fits-all 200+ hour video courses",
      intra: "Topologically customized to your exact resume & target role",
    },
    {
      metric: "Prior Knowledge",
      traditional: "Forces you to relearn skills you've commanded for years",
      intra: "Automatically detects and skips 100% of validated skills",
    },
    {
      metric: "Prerequisites",
      traditional: "Linear playlists with zero concept dependency awareness",
      intra: "Directed Acyclic Graph (DAG) sequences prerequisites first",
    },
    {
      metric: "Screening Focus",
      traditional: "Ignores recruiter screening filters and core dealbreakers",
      intra: "Isolates mandatory 1st-round hiring filters with High priority",
    },
    {
      metric: "Transparency",
      traditional: "Black box or subjective score without explanation",
      intra: "Explainable AI (XAI) traces detail exactly why each step is required",
    },
    {
      metric: "Preparation Time",
      traditional: "6–12 months of redundant video consumption",
      intra: "Average 3.5 months saved through targeted gap closure",
    },
  ];

  return (
    <section id="comparison" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 uppercase tracking-wider mb-3">
            <span>04 / The Comparison</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
            Why Modern Professionals Choose Intra AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            See the difference between brute-force course consumption and mathematical competency pathfinding.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-50 border-b border-slate-200 text-xs font-mono font-semibold uppercase tracking-wider">
            <div className="md:col-span-3 p-4 text-slate-500">Evaluation Dimension</div>
            <div className="md:col-span-4 p-4 text-rose-700 bg-rose-50/50 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-rose-600" />
              <span>Traditional LMS / Courses</span>
            </div>
            <div className="md:col-span-5 p-4 text-teal-800 bg-teal-50 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-teal-600" />
              <span>Intra AI Adaptive Engine</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {comparisons.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 text-xs sm:text-sm">
                <div className="md:col-span-3 p-4 sm:p-5 font-semibold text-slate-900 bg-slate-50/40 flex items-center">
                  {item.metric}
                </div>
                <div className="md:col-span-4 p-4 sm:p-5 text-slate-500 bg-white flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
                <div className="md:col-span-5 p-4 sm:p-5 font-medium text-slate-800 bg-teal-50/20 flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item.intra}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action trigger */}
        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow transition-all duration-150 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Experience The Difference — Build Your Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
