import { ArrowRight, Sparkles } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function ClosingJourneySection({ onGetStarted }) {
  return (
    <div className="bg-white border-t border-slate-200 overflow-hidden">
      
      {/* ── CINEMATIC FOOTER HORIZON SECTION (Kept as requested) ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Panoramic Sunrise Visual */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
          style={{ backgroundImage: `url('/assets/closing-sunrise-horizon.jpg')` }}
        />
        
        {/* Luminous Atmospheric Overlay for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/50 to-slate-900/60 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-wider uppercase text-white/90 mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>05 / THE HORIZON</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-md">
            Your Next Chapter Starts <br className="hidden sm:inline" />
            With Understanding.
          </h2>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal max-w-xl mx-auto mb-10 drop-shadow-sm">
            Isolate true screening dealbreakers. Eliminate wasted training churn. Accelerate toward your target role with mathematical certainty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-150 hover:-translate-y-0.5 group"
            >
              <span>Build Your Adaptive Roadmap</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER: CLEAN MODERN SAAS COLOPHON ── */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-200">
            
            {/* Brand Logo & Mission */}
            <div className="space-y-3 max-w-sm">
              <a href="/" className="inline-block focus:outline-none" aria-label="Intra AI Home">
                <BrandLogo size="lg" />
              </a>
              <p className="text-xs text-slate-500 leading-relaxed">
                Adaptive Workforce Intelligence Engine connecting candidate potential to live market requirements through topological graph optimization.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SYSTEMS OPERATIONAL • TOPOLOGICAL ENGINE v2.4</span>
              </div>
            </div>

            {/* Navigation Anchors */}
            <div className="flex flex-wrap gap-6 sm:gap-8 text-xs font-medium text-slate-600">
              <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
              <a href="#preview" className="hover:text-slate-900 transition-colors">Live Demo</a>
              <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
              <a href="#comparison" className="hover:text-slate-900 transition-colors">Why Intra AI</a>
              <button 
                onClick={onGetStarted} 
                className="hover:text-teal-700 transition-colors font-semibold text-teal-600"
              >
                Launch Workspace →
              </button>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
            <p>© {new Date().getFullYear()} Intra AI Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-600 transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-600 transition-colors cursor-pointer">Security & Compliance</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
