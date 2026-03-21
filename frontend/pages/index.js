import { useState, useRef } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DashboardPreviewSection from "@/components/DashboardPreviewSection";
import SocialImpactSection from "@/components/SocialImpactSection";
import ResultsDashboard from "@/components/ResultsDashboard";

export default function Home() {
  const [resume, setResume] = useState(null);
  const [jd, setJD] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadRef = useRef(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleUpload = async () => {
    if (!resume || !jd) {
      alert("Please upload both your Resume and Job Description!");
      return;
    }
    setLoading(true);
    setData(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // Step 1 — Upload (handles PDF, DOCX, TXT)
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jd", jd);
      const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { resume: resumeText, jd: jdText } = uploadRes.data;

      if (!resumeText || !jdText) {
        alert("Could not extract text from uploaded files. Please ensure files contain readable text.");
        setLoading(false);
        return;
      }

      // Step 2 — Unified analysis (skills + gap + roadmap + reasoning)
      const analysisRes = await axios.post(`${API_URL}/analyze`, {
        resume: resumeText,
        jd: jdText,
      });

      const d = analysisRes.data;

      setData({
        gap:           d.gap           || [],
        skill_dna:     d.skill_dna     || {},
        overall_score: d.overall_score || 0,
        roadmap:       d.roadmap       || [],
        time_saved:    d.time_saved    || 0,
        reasoning:     d.reasoning     || [],
        analysis:      d.analysis      || {},
      });

      // Scroll to top to show results
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[Upload/Analyze Error]", err);
      const detail = err?.response?.data?.detail || "Unknown error";
      alert(`Analysis failed: ${detail}\n\nEnsure the backend is running on port 8000.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Intra AI — Adaptive Workforce Intelligence</title>
        <meta
          name="description"
          content="Intra AI analyzes your resume and job description to generate a personalized adaptive learning roadmap. Bridge the gap between where you are and where you need to be."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Intra AI — From Within to Workforce" />
        <meta property="og:description" content="Your personalized adaptive learning roadmap, powered by skill intelligence." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/30 selection:text-white relative">

        {/* Soft gradient background blobs */}
        <div className="blob-tl" />
        <div className="blob-br" />
        <div className="blob-center" />

        {/* Sticky Navbar */}
        <Navbar onGetStarted={scrollToUpload} />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {!data ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* 1. Hero Section */}
                <HeroSection onGetStarted={scrollToUpload} />

                {/* 2. Upload Section */}
                <div ref={uploadRef}>
                  <UploadSection
                    resume={resume}
                    jd={jd}
                    setResume={setResume}
                    setJD={setJD}
                    onGenerate={handleUpload}
                    loading={loading}
                  />
                </div>

                {/* 3. Features Section */}
                <FeaturesSection />

                {/* 4. How It Works */}
                <HowItWorksSection />

                {/* 5. Dashboard Preview */}
                <DashboardPreviewSection />

                {/* 6. Social Impact */}
                <SocialImpactSection />


              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-28"
              >
                <ResultsDashboard data={data} onReset={() => { setData(null); setResume(null); setJD(null); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
