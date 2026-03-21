import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-50/80 backdrop-blur-xl border-b border-slate-200 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-emerald-500/30 transition-shadow duration-300">
            <Hexagon className="w-5 h-5 text-white" fill="currentColor" strokeWidth={1.5} />
          </div>
          <span className="text-slate-900 font-bold text-xl tracking-tight group-hover:text-slate-700 transition-colors duration-200">
            Intra <span className="gradient-text">AI</span>
          </span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Dashboard", "Impact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          id="nav-get-started"
          onClick={onGetStarted}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all duration-300 shadow-sm"
        >
          Get Started
        </button>
      </div>
    </motion.header>
  );
}
