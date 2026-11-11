import { useState } from "react";
import { CheckCircle2, Clock, ArrowRight, Sparkles, Check, AlertTriangle, Layers, BookOpen } from "lucide-react";

const DEMO_PREVIEWS = {
  "ai-engineer": {
    role: "Full-Stack AI Engineer",
    company: "Tier-1 Tech / Modern AI SaaS",
    fitScore: 82,
    timeSaved: "3.5 Months",
    redundantCut: "42 Hours Skipped",
    strengths: [
      { name: "React & Next.js", level: "Production", verified: true },
      { name: "Python Core & OOP", level: "Advanced", verified: true },
      { name: "RESTful API Architecture", level: "Mastered", verified: true },
      { name: "PostgreSQL & Prisma", level: "Proficient", verified: true },
    ],
    dealbreakerGaps: [
      { name: "PyTorch & Vector Embeddings", urgency: "Critical Screening Dealbreaker", priority: "High" },
      { name: "LangChain / RAG Pipeline Design", urgency: "Role Deliverable Requirement", priority: "High" },
      { name: "Docker Containerization & MLOps", urgency: "Deployment Benchmark", priority: "Medium" },
    ],
    roadmap: [
      {
        week: "Phase 01 • Days 1-10",
        title: "Vector Search & Retrieval Augmented Generation (RAG)",
        status: "High Priority",
        desc: "Construct high-throughput vector similarity pipelines using Pinecone, ChromaDB, and OpenAI embedding models.",
        skipped: "Skipped: 'Python Basics' and 'Intro to APIs' (Already Verified)",
      },
      {
        week: "Phase 02 • Days 11-20",
        title: "Model Serving & Real-Time Streaming Endpoints",
        status: "Prerequisite Met",
        desc: "Build asynchronous FastAPI streaming endpoints with server-sent events (SSE) for low-latency AI responses.",
        skipped: "Skipped: 'Basic Frontend Integration' (Already Verified)",
      },
      {
        week: "Phase 03 • Days 21-30",
        title: "MLOps, Evaluation Harnesses & Guardrails",
        status: "Final Capstone",
        desc: "Deploy Dockerized container clusters with latency monitoring, rate-limiting, and automated LLM output validation.",
        skipped: "Ready for Day-One Role Readiness",
      },
    ],
  },
  "data-science": {
    role: "Data Scientist & ML Specialist",
    company: "Fintech & Enterprise Analytics",
    fitScore: 76,
    timeSaved: "4.0 Months",
    redundantCut: "55 Hours Skipped",
    strengths: [
      { name: "SQL & Query Optimization", level: "Advanced", verified: true },
      { name: "Pandas & Data Wrangling", level: "Mastered", verified: true },
      { name: "Hypothesis Testing & Stats", level: "Proficient", verified: true },
      { name: "Tableau & Storytelling", level: "Proficient", verified: true },
    ],
    dealbreakerGaps: [
      { name: "Scikit-Learn Production Pipelines", urgency: "Model Evaluation Dealbreaker", priority: "High" },
      { name: "Feature Engineering at Scale", urgency: "Core Data Quality Requirement", priority: "High" },
      { name: "Model Explainability (SHAP/LIME)", urgency: "Compliance & Governance", priority: "Medium" },
    ],
    roadmap: [
      {
        week: "Phase 01 • Days 1-12",
        title: "Production Machine Learning & Cross-Validation",
        status: "High Priority",
        desc: "Implement leak-free feature pipelines with custom transformers, hyperparameter tuning, and ROC-AUC evaluation.",
        skipped: "Skipped: 'Intro to Python' & 'Basic SQL' (Verified in Resume)",
      },
      {
        week: "Phase 02 • Days 13-24",
        title: "Explainable AI (XAI) & Interpretability Traces",
        status: "Prerequisite Met",
        desc: "Integrate SHAP tree-explainer algorithms to unpack model feature attributions for risk committees.",
        skipped: "Skipped: 'Descriptive Statistics' (Already Mastered)",
      },
      {
        week: "Phase 03 • Days 25-35",
        title: "Automated Batch Inference & Model Drift Monitoring",
        status: "Final Capstone",
        desc: "Build scheduled cron jobs detecting feature drift, distribution shifts, and automated alerting.",
        skipped: "Ready for Day-One Role Readiness",
      },
    ],
  },
  "cloud-devops": {
    role: "Cloud DevOps & Platform Engineer",
    company: "Modern Cloud Infrastructure",
    fitScore: 71,
    timeSaved: "3.2 Months",
    redundantCut: "48 Hours Skipped",
    strengths: [
      { name: "Linux Administration & Bash", level: "Mastered", verified: true },
      { name: "Git Workflow & Branching", level: "Advanced", verified: true },
      { name: "Basic Docker & Containers", level: "Proficient", verified: true },
      { name: "Networking Fundamentals", level: "Proficient", verified: true },
    ],
    dealbreakerGaps: [
      { name: "Kubernetes Cluster Management", urgency: "Mandatory Production Filter", priority: "High" },
      { name: "Terraform Infrastructure as Code", urgency: "Automation Benchmark", priority: "High" },
      { name: "CI/CD Pipeline Security (GitHub Actions)", urgency: "Release Governance", priority: "Medium" },
    ],
    roadmap: [
      {
        week: "Phase 01 • Days 1-10",
        title: "Terraform Multi-Cloud Declarative State",
        status: "High Priority",
        desc: "Architect modular reusable Terraform infrastructure with remote state locking and least-privilege IAM roles.",
        skipped: "Skipped: 'Basic Linux Setup' (Already Mastered)",
      },
      {
        week: "Phase 02 • Days 11-22",
        title: "Kubernetes Orchestration & Helm Packaging",
        status: "Prerequisite Met",
        desc: "Deploy production ingress controllers, persistent volume claims, horizontal pod autoscalers (HPA), and Helm charts.",
        skipped: "Skipped: 'Docker 101' (Verified in Resume)",
      },
      {
        week: "Phase 03 • Days 23-32",
        title: "GitOps, Observability & Secret Governance",
        status: "Final Capstone",
        desc: "Set up ArgoCD GitOps reconciliation, Prometheus metrics scrapers, Grafana dashboards, and automated rollback triggers.",
        skipped: "Ready for Day-One Role Readiness",
      },
    ],
  },
};

export default function InteractivePreview({ onGetStarted }) {
  const [activeRoleKey, setActiveRoleKey] = useState("ai-engineer");
  const data = DEMO_PREVIEWS[activeRoleKey];

  return (
    <section id="preview" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 uppercase tracking-wider mb-3">
              <span>02 / Live Demonstration</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
              Interactive Intelligence In Action.
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Explore how Intra AI dynamically analyzes resumes, identifies screened dealbreakers, and builds topological DAG roadmaps.
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveRoleKey("ai-engineer")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRoleKey === "ai-engineer"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Full-Stack AI Engineer
            </button>
            <button
              onClick={() => setActiveRoleKey("data-science")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRoleKey === "data-science"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Data Scientist
            </button>
            <button
              onClick={() => setActiveRoleKey("cloud-devops")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRoleKey === "cloud-devops"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cloud DevOps
            </button>
          </div>
        </div>

        {/* Product Workspace Mockup / Output View */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
          
          {/* Top Bar */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-slate-900">{data.role}</span>
                <span className="text-xs text-slate-500 ml-2 font-mono">[{data.company}]</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200 font-mono">
                {data.timeSaved} Accelerated
              </span>
              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                {data.redundantCut}
              </span>
            </div>
          </div>

          {/* Main Dashboard Preview Grid */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Diagnostics (Fit Score, Strengths & Gaps) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Fit Score & Time Saved Box */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    BENCHMARK FIT SCORE
                  </div>
                  <div className="font-display text-4xl font-extrabold text-slate-900 mt-1">
                    {data.fitScore}%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Calibrated against hiring requirements
                  </div>
                </div>

                <div className="w-16 h-16 rounded-full border-4 border-teal-600 flex items-center justify-center bg-white shadow-xs">
                  <span className="text-sm font-bold text-teal-700">{data.fitScore}%</span>
                </div>
              </div>

              {/* Verified Strengths */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Verified Competencies (Skipped in Training)</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.strengths.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50/70 text-teal-800 text-xs font-medium border border-teal-200/80"
                    >
                      <Check className="w-3 h-3 text-teal-600" />
                      <span>{s.name}</span>
                      <span className="text-[10px] text-teal-600 font-mono">({s.level})</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Identified Dealbreaker Gaps */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Screening Dealbreaker Gaps (Prioritized)</span>
                </h4>
                <div className="space-y-2.5">
                  {data.dealbreakerGaps.map((g, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{g.name}</div>
                        <div className="text-[11px] text-amber-700">{g.urgency}</div>
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                        {g.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sequenced DAG Roadmap */}
            <div className="lg:col-span-7">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Topologically Sequenced Roadmap (3 Milestones)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">DAG Dependency Solved</span>
              </h4>

              <div className="space-y-4">
                {data.roadmap.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold text-blue-600 uppercase tracking-wider">
                        {m.week}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {m.status}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-900 mb-1.5">{m.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{m.desc}</p>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-teal-700 font-medium font-mono">{m.skipped}</span>
                      <span className="text-slate-400 font-mono">100% Focused</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Banner */}
              <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold">Generate This For Your Own Profile</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Instant upload • No registration required • Free</div>
                </div>

                <button
                  onClick={onGetStarted}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <span>Build Free Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
