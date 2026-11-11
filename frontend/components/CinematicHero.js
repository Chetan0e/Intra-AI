import { ArrowRight, ChevronDown, Sparkles, CheckCircle2, Zap, Shield, GitBranch, FileText, Target } from "lucide-react";

export default function CinematicHero({ onGetStarted }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-14 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* ── High-End Bright AI Background Image ── */}
      <div 
        className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat transition-transform duration-1000 scale-100 opacity-90"
        style={{ backgroundImage: `url('/assets/hero-intra-bright.jpg')` }}
      />

      {/* Luminous Bright Mode Overlays (Retaining pristine legibility and bright aesthetic) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent md:w-3/4 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center py-12 md:py-20">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-xs font-semibold tracking-wide text-teal-800 mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span>Free AI Skill Gap &amp; Career Roadmap Analyzer</span>
          </div>

          {/* Large Expressive Display Headline (Option C - Clear & Actionable) */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
            Upload Your Resume. <br className="hidden sm:inline" />
            Pick Your Target Role. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600">
              Get an Instant AI Roadmap to Get Hired.
            </span>
          </h1>

          {/* Plain-Language Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mb-6">
            Stop losing months to generic 200-hour courses. Intra AI compares your resume against real job requirements, shows you the exact missing skills holding you back, and skips what you already know so you can prepare faster.
          </p>

          {/* 3-Step Visual Process Strip */}
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 py-2 px-3.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-2xs mb-8 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
              <span className="font-semibold text-slate-900">Upload Resume</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
              <span className="font-semibold text-slate-900">Pick Target Job</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
              <span className="font-semibold text-slate-900">Get Custom Roadmap</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-10">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span>Build Your Roadmap Free</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="#preview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-slate-700 bg-white/90 hover:bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200"
            >
              <span>See Sample Roadmap</span>
            </a>
          </div>

          {/* Benefit-Driven Proof Badges Ticker */}
          <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-slate-900 leading-none">100%</span>
              <span className="text-xs text-slate-500 mt-1 font-medium">Personalized to You</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-teal-600 leading-none">Save 3+ Mo</span>
              <span className="text-xs text-slate-500 mt-1 font-medium">Skips Redundant Basics</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-blue-600 leading-none">&lt; 15s</span>
              <span className="text-xs text-slate-500 mt-1 font-medium">Instant AI Generation</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-slate-900 leading-none">Free &amp; Private</span>
              <span className="text-xs text-slate-500 mt-1 font-medium">No Data Stored or Sold</span>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-4 text-center">
        <a 
          href="#how-it-works"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors shadow-xs"
        >
          <span>Explore How It Works</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-slate-400" />
        </a>
      </div>

    </section>
  );
}
