import { useState } from "react";
import axios from "axios";
import Head from "next/head";

import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import SimpleHowItWorks from "@/components/SimpleHowItWorks";
import InteractivePreview from "@/components/InteractivePreview";
import FeaturesGridSection from "@/components/FeaturesGridSection";
import ComparisonSection from "@/components/ComparisonSection";
import ClosingJourneySection from "@/components/ClosingJourneySection";
import WorkspaceApp from "@/components/WorkspaceApp";
import ResultsDashboard from "@/components/ResultsDashboard";

export default function Home() {
  const [view, setView] = useState("landing"); // "landing" | "workspace" | "results"
  const [resume, setResume] = useState(null);
  const [jd, setJD] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const startWorkspace = () => {
    setView("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToHome = () => {
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUploadAndAnalyze = async () => {
    if (!resume || !jd) {
      alert("Please provide both your Resume and Target Job Description!");
      return;
    }
    setLoading(true);
    setData(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // Step 1 — Upload files
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

      // Step 2 — Unified analysis
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

      setView("results");
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
        <title>Intra AI — Personalized AI Career Roadmap &amp; Skill Gap Analyzer</title>
        <meta
          name="description"
          content="Upload your resume and target role to get an instant, personalized learning roadmap. Find out what skills you're missing and get hired faster."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        
        {/* Navigation is active across landing */}
        {view === "landing" && (
          <Navbar onGetStarted={startWorkspace} />
        )}

        <main>
          {view === "landing" && (
            <>
              {/* SECTION 01: HERO (Modern bright mode with generated high-end image) */}
              <CinematicHero onGetStarted={startWorkspace} />

              {/* SECTION 02: METHODOLOGY / HOW IT WORKS (Clean 3-step architecture) */}
              <SimpleHowItWorks onGetStarted={startWorkspace} />

              {/* SECTION 03: INTERACTIVE DEMO / LIVE PREVIEW (Hands-on exploration) */}
              <InteractivePreview onGetStarted={startWorkspace} />

              {/* SECTION 04: CORE ARCHITECTURE & FEATURES (Bento Grid) */}
              <FeaturesGridSection onGetStarted={startWorkspace} />

              {/* SECTION 05: WHY INTRA AI / COMPARISON MATRIX */}
              <ComparisonSection onGetStarted={startWorkspace} />

              {/* SECTION 06: CLOSING CHAPTER & FOOTER (Keeps footer image) */}
              <ClosingJourneySection onGetStarted={startWorkspace} />
            </>
          )}

          {view === "workspace" && (
            <WorkspaceApp
              resume={resume}
              jd={jd}
              setResume={setResume}
              setJD={setJD}
              onGenerate={handleUploadAndAnalyze}
              loading={loading}
              onBackToHome={backToHome}
            />
          )}

          {view === "results" && (
            <ResultsDashboard
              data={data}
              onBackToHome={backToHome}
              onReset={() => {
                setData(null);
                setResume(null);
                setJD(null);
                setView("workspace");
              }}
            />
          )}
        </main>

      </div>
    </>
  );
}
