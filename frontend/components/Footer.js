import { motion } from "framer-motion";
import { Hexagon, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 py-14">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-purple-600 flex items-center justify-center glow-emerald">
                <Hexagon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-slate-900 font-bold text-lg tracking-tight">
                Intra <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Adaptive workforce intelligence — bridging the gap between potential and opportunity.
            </p>
            <p className="text-[11px] text-emerald-600/60 font-medium tracking-wide">
              From Within to Workforce ✦
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-slate-500"
          >
            {["Features", "How It Works", "Dashboard", "Impact", "Privacy"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-slate-700 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {[
              { Icon: Github, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-xl border border-white/8 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-200 hover:bg-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-700">
          <p>© 2025 Intra AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="text-red-500">♥</span> for the workforce of tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
