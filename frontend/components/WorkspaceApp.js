import { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  FileText, 
  Trash2, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown, 
  Check,
  Briefcase
} from "lucide-react";
import BrandLogo from "./BrandLogo";

const JOB_ROLES = {
  "Corporate & Technology": [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "ML / AI Engineer",
    "DevOps / Cloud Engineer",
    "Cybersecurity Analyst",
    "Product Manager",
    "Data Analyst",
    "Engineering Manager",
  ],
  "Social Sector & Non-Profit": [
    "Community Outreach Coordinator",
    "NGO Program Manager",
    "Social Worker",
    "Non-Profit Project Lead",
    "Education & Training Specialist",
    "Public Health Analyst",
    "Policy & Advocacy Officer",
    "Impact & M&E Analyst",
    "Grant Writer / Fundraiser",
  ],
};

const POPULAR_ROLES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "Data Scientist",
  "ML / AI Engineer",
  "DevOps / Cloud Engineer",
  "Product Manager",
];

const ROLE_TEMPLATES = {
  "Software Engineer": {
    desc: "Software Engineer role requiring Python, JavaScript, SQL, Git, REST API design, data structures, algorithms, automated testing, and cloud deployment on AWS.",
    tags: ["Python", "JavaScript", "SQL", "REST APIs", "AWS", "Data Structures", "Testing"]
  },
  "Frontend Developer": {
    desc: "Frontend Developer role requiring React, TypeScript, modern JavaScript, responsive CSS, state management, API integration, and unit testing with Jest.",
    tags: ["React", "TypeScript", "Next.js", "TailwindCSS", "REST APIs", "Testing"]
  },
  "Backend Developer": {
    desc: "Backend Developer role requiring Python FastAPI or Node.js Express, PostgreSQL, Redis, authentication, Docker containerization, and microservices.",
    tags: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Docker", "Redis", "Security"]
  },
  "Full Stack Developer": {
    desc: "Full Stack Developer role requiring React, TypeScript, Node.js, relational databases, Docker, CI/CD pipelines, and cloud hosting.",
    tags: ["React", "TypeScript", "Node.js", "SQL", "Docker", "CI/CD", "AWS"]
  },
  "Data Scientist": {
    desc: "Data Scientist role requiring Python, Pandas, NumPy, Scikit-learn, SQL, statistical modeling, machine learning pipelines, and executive dashboards.",
    tags: ["Python", "Pandas", "Scikit-Learn", "SQL", "Statistics", "Machine Learning"]
  },
  "ML / AI Engineer": {
    desc: "ML / AI Engineer role requiring PyTorch/TensorFlow, vector embeddings, NLP/LLM pipelines, model serving APIs, Docker, and MLOps monitoring.",
    tags: ["PyTorch", "NLP", "Vector Embeddings", "FastAPI", "Docker", "MLOps"]
  },
  "DevOps / Cloud Engineer": {
    desc: "DevOps / Cloud Engineer role requiring AWS/GCP, Docker, Kubernetes, Terraform IaC, GitHub Actions CI/CD, Linux administration, and monitoring.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "Prometheus"]
  },
  "Cybersecurity Analyst": {
    desc: "Cybersecurity Analyst role requiring threat modeling, SIEM log analysis, network protocol security, incident handling, and vulnerability scanning.",
    tags: ["SIEM", "Network Security", "Threat Modeling", "Vulnerability Assessment", "Linux"]
  },
  "Product Manager": {
    desc: "Product Manager role requiring user research, feature prioritization, roadmap definition, stakeholder alignment, data analytics, and agile delivery.",
    tags: ["Product Strategy", "User Research", "Agile/Scrum", "Data Analytics", "Roadmapping"]
  },
  "Data Analyst": {
    desc: "Data Analyst role requiring SQL, Python, Excel, dashboard design (Power BI/Tableau), cohort analysis, data hygiene, and stakeholder presentations.",
    tags: ["SQL", "Excel", "Tableau", "Power BI", "Python", "Data Cleaning"]
  },
  "Engineering Manager": {
    desc: "Engineering Manager role requiring technical systems architecture, sprint management, hiring, team mentorship, and cross-functional leadership.",
    tags: ["Team Leadership", "System Architecture", "Sprint Planning", "Hiring", "Mentorship"]
  },
  "Community Outreach Coordinator": {
    desc: "Outreach Coordinator role requiring community engagement, stakeholder communication, event planning, volunteer coordination, and partnership development.",
    tags: ["Community Engagement", "Stakeholder Communication", "Event Planning", "Partnerships"]
  },
  "NGO Program Manager": {
    desc: "Program Manager role requiring grant tracking, donor reporting, program lifecycle management, team coordination, and impact metrics evaluation.",
    tags: ["Program Management", "Grant Tracking", "Donor Reporting", "Impact Metrics"]
  },
  "Social Worker": {
    desc: "Social Worker role requiring case management, psychosocial assessments, crisis intervention, community resource navigation, and client advocacy.",
    tags: ["Case Management", "Psychosocial Assessment", "Crisis Intervention", "Advocacy"]
  },
  "Non-Profit Project Lead": {
    desc: "Project Lead role requiring budget management, field operations, monitoring & evaluation, stakeholder briefings, and cross-functional leadership.",
    tags: ["Field Operations", "Budget Management", "M&E", "Leadership"]
  },
  "Education & Training Specialist": {
    desc: "Education Specialist role requiring curriculum design, adult learning methodologies, workshop facilitation, pedagogical assessments, and LMS administration.",
    tags: ["Curriculum Design", "Facilitation", "Adult Learning", "LMS Administration"]
  },
  "Public Health Analyst": {
    desc: "Public Health Analyst role requiring epidemiological data analysis, health policy evaluation, biostatistics with R/Python, and community health reports.",
    tags: ["Epidemiology", "Biostatistics", "Health Policy", "Data Analysis"]
  },
  "Policy & Advocacy Officer": {
    desc: "Policy Officer role requiring legislative analysis, policy brief drafting, stakeholder coalition building, media relations, and campaign strategizing.",
    tags: ["Policy Briefs", "Coalition Building", "Advocacy Campaigns", "Legislative Analysis"]
  },
  "Impact & M&E Analyst": {
    desc: "M&E Analyst role requiring quantitative survey design, impact assessment frameworks, theory of change modeling, and indicator tracking.",
    tags: ["Theory of Change", "Survey Design", "Impact Evaluation", "Indicator Tracking"]
  },
  "Grant Writer / Fundraiser": {
    desc: "Grant Writer role requiring grant proposal writing, foundation prospecting, donor stewardship, budget narratives, and compliance reporting.",
    tags: ["Grant Writing", "Foundation Prospecting", "Donor Stewardship", "Budget Narratives"]
  },
};

const SAMPLE_RESUMES = {
  fullstack: {
    label: "Senior Full-Stack Engineer",
    roleMatch: "Full Stack Developer",
    filename: "Alex_Rivera_FullStack_Resume.txt",
    content: `Alex Rivera — Senior Software Engineer
Email: alex.rivera@example.com | Portfolio: github.com/alexrivera

SUMMARY
Full-Stack Software Engineer with 4+ years building high-traffic web applications. Proficient in React, TypeScript, Node.js, Python, PostgreSQL, and AWS. Experienced in microservice architecture, API design, and automated testing.

CORE SKILLS
- Languages: JavaScript, TypeScript, Python, SQL, HTML5, CSS3
- Frontend: React, Next.js, Redux Toolkit, TailwindCSS, Jest
- Backend: Node.js, Express, Python FastAPI, RESTful APIs, GraphQL
- Databases: PostgreSQL, MongoDB, Redis
- Infrastructure: Docker, AWS (S3, EC2, Lambda), Git, GitHub Actions CI/CD

EXPERIENCE
Senior Software Engineer — CloudScale Labs (2022 - Present)
- Architected and delivered React & Next.js frontend with 99.9% uptime for 250k monthly active users.
- Designed FastAPI microservices reducing payload transfer latency by 35%.
- Implemented automated CI/CD deployment pipelines using GitHub Actions and Docker.

Software Engineer — NovaTech Solutions (2020 - 2022)
- Built interactive customer dashboards using React and TypeScript.
- Integrated PostgreSQL database with index optimizations reducing query response time by 40%.`
  },
  datascientist: {
    label: "Data Scientist & ML",
    roleMatch: "Data Scientist",
    filename: "Morgan_Chen_DataScientist_Resume.txt",
    content: `Morgan Chen — Data Scientist & Machine Learning Specialist
Email: morgan.chen@example.com | Kaggle: kaggle.com/morganchen

SUMMARY
Data Scientist with 3+ years experience transforming structured and unstructured data into predictive intelligence. Strong mathematical foundations in statistical modeling, Scikit-Learn pipelines, SQL, and exploratory data analysis.

CORE SKILLS
- Languages: Python, SQL, R
- ML & Analytics: Scikit-learn, Pandas, NumPy, Statsmodels, SciPy
- Visualization: Tableau, Seaborn, Matplotlib, Power BI
- Data Engineering: PostgreSQL, SQLite, Apache Spark basics
- Tooling: Jupyter, Git, Docker fundamentals

EXPERIENCE
Data Scientist — InsightIQ Analytics (2022 - Present)
- Built churn prediction models achieving 88% ROC-AUC using Random Forests and Gradient Boosting.
- Automated data extraction and transformation pipelines handling 10M+ daily database rows.
- Created executive Tableau dashboards tracking revenue forecasting and customer cohorts.

Junior Data Analyst — Apex Metrics (2021 - 2022)
- Cleaned and prepared large survey datasets using Python Pandas.
- Formulated SQL stored procedures and queries for recurring weekly KPIs.`
  }
};

export default function WorkspaceApp({
  resume,
  jd,
  setResume,
  setJD,
  onGenerate,
  loading,
  onBackToHome,
}) {
  const [activeStep, setActiveStep] = useState(1);
  const [jdMode, setJdMode] = useState("choose"); // "choose" | "type" | "upload"
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [typedJD, setTypedJD] = useState("");
  const [isDraggingResume, setIsDraggingResume] = useState(false);
  const [isDraggingJD, setIsDraggingJD] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("Analyzing resume...");

  const resumeInputRef = useRef(null);
  const jdInputRef = useRef(null);

  // Initialize default role if not set
  useEffect(() => {
    if (!jd) {
      const template = ROLE_TEMPLATES["Software Engineer"]?.desc || "Software Engineer role requiring Python, JavaScript, and SQL.";
      const blob = new Blob([template], { type: "text/plain" });
      const file = new File([blob], "Software_Engineer.txt", { type: "text/plain" });
      setJD(file);
    }
  }, []);

  // Loading animation phases
  useEffect(() => {
    if (!loading) return;
    const phases = [
      "Analyzing resume experience...",
      "Extracting technical competencies...",
      "Benchmarking against target role...",
      "Identifying skill gaps...",
      "Generating learning roadmap...",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setLoadingPhase(phases[idx]);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (!role) {
      setJD(null);
      return;
    }
    const template = ROLE_TEMPLATES[role]?.desc || `${role} role requirements.`;
    const blob = new Blob([template], { type: "text/plain" });
    const file = new File([blob], `${role.replace(/\s+/g, "_")}.txt`, { type: "text/plain" });
    setJD(file);
  };

  const handleTypedChange = (e) => {
    const val = e.target.value;
    setTypedJD(val);
    if (val.trim().length > 15) {
      const blob = new Blob([val], { type: "text/plain" });
      const file = new File([blob], "job_description.txt", { type: "text/plain" });
      setJD(file);
    } else {
      setJD(null);
    }
  };

  const loadSampleResume = (key) => {
    const sample = SAMPLE_RESUMES[key];
    if (!sample) return;
    const blob = new Blob([sample.content], { type: "text/plain" });
    const file = new File([blob], sample.filename, { type: "text/plain" });
    setResume(file);
    if (sample.roleMatch) {
      handleRoleSelect(sample.roleMatch);
    }
  };

  const isReady = Boolean(resume) && Boolean(jd);
  const step1Complete = Boolean(resume);
  const step2Complete = Boolean(jd);

  const currentRoleData = ROLE_TEMPLATES[selectedRole] || {
    desc: `${selectedRole} core competencies and requirements.`,
    tags: ["Core Competencies", "Domain Skills"]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-200">
      
      {/* ── TOP MINIMALIST NAVBAR ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="focus:outline-none"
            aria-label="Back to Homepage"
          >
            <BrandLogo size="md" />
          </button>

          <button
            onClick={onBackToHome}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-6">
          
          {/* ── SLEEK STRIPE-STYLE STEPPER ── */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              
              {/* Step 1 Pill */}
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="flex items-center gap-2.5 text-left group focus:outline-none"
              >
                <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                  step1Complete && activeStep !== 1
                    ? "bg-slate-900 text-white"
                    : activeStep === 1
                    ? "bg-slate-900 text-white ring-4 ring-slate-200"
                    : "bg-slate-200 text-slate-600"
                }`}>
                  {step1Complete && activeStep !== 1 ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : "1"}
                </span>
                <span className={`text-sm font-medium ${
                  activeStep === 1 ? "text-slate-900 font-semibold" : "text-slate-500 group-hover:text-slate-900"
                }`}>
                  Resume
                </span>
              </button>

              <div className={`flex-1 h-px mx-4 transition-colors ${step1Complete ? "bg-slate-900" : "bg-slate-200"}`} />

              {/* Step 2 Pill */}
              <button
                type="button"
                onClick={() => { if (step1Complete) setActiveStep(2); }}
                disabled={!step1Complete}
                className={`flex items-center gap-2.5 text-left group focus:outline-none ${
                  !step1Complete ? "cursor-not-allowed opacity-40" : ""
                }`}
              >
                <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                  step2Complete && activeStep !== 2
                    ? "bg-slate-900 text-white"
                    : activeStep === 2
                    ? "bg-slate-900 text-white ring-4 ring-slate-200"
                    : "bg-slate-200 text-slate-600"
                }`}>
                  {step2Complete && activeStep !== 2 ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : "2"}
                </span>
                <span className={`text-sm font-medium ${
                  activeStep === 2 ? "text-slate-900 font-semibold" : "text-slate-500 group-hover:text-slate-900"
                }`}>
                  Target Role
                </span>
              </button>

              <div className={`flex-1 h-px mx-4 transition-colors ${step1Complete && step2Complete ? "bg-slate-900" : "bg-slate-200"}`} />

              {/* Step 3 Pill */}
              <button
                type="button"
                onClick={() => { if (step1Complete && step2Complete) setActiveStep(3); }}
                disabled={!step1Complete || !step2Complete}
                className={`flex items-center gap-2.5 text-left group focus:outline-none ${
                  (!step1Complete || !step2Complete) ? "cursor-not-allowed opacity-40" : ""
                }`}
              >
                <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                  activeStep === 3
                    ? "bg-slate-900 text-white ring-4 ring-slate-200"
                    : "bg-slate-200 text-slate-600"
                }`}>
                  3
                </span>
                <span className={`text-sm font-medium ${
                  activeStep === 3 ? "text-slate-900 font-semibold" : "text-slate-500 group-hover:text-slate-900"
                }`}>
                  Review
                </span>
              </button>

            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════ */}
          {/* STEP 1: UPLOAD RESUME                                      */}
          {/* ══════════════════════════════════════════════════════════ */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Upload your resume
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Upload your resume in PDF, Word, or text format to get started.
                </p>
              </div>

              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={(e) => e.target.files[0] && setResume(e.target.files[0])}
                className="hidden"
              />

              {!resume ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingResume(true); }}
                  onDragLeave={() => setIsDraggingResume(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingResume(false);
                    if (e.dataTransfer.files[0]) setResume(e.dataTransfer.files[0]);
                  }}
                  onClick={() => resumeInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                    isDraggingResume
                      ? "border-slate-900 bg-slate-100"
                      : "border-slate-300 hover:border-slate-400 bg-white"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-600">
                    <Upload className="w-5 h-5 text-slate-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-900">
                    <span className="text-slate-900 font-semibold underline underline-offset-2">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF, DOCX, or TXT up to 10 MB
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                        <FileText className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-sm">
                          {resume.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {(resume.size / 1024).toFixed(1)} KB · Ready to analyze
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => resumeInputRef.current?.click()}
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => setResume(null)}
                        className="text-xs font-medium text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded-md hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sample Profiles Quick Picker */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
                <span>Don't have a resume ready?</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => loadSampleResume("fullstack")}
                    className="font-medium text-slate-800 hover:text-slate-950 underline underline-offset-2"
                  >
                    Use Full-Stack sample
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => loadSampleResume("datascientist")}
                    className="font-medium text-slate-800 hover:text-slate-950 underline underline-offset-2"
                  >
                    Use Data Scientist sample
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  disabled={!resume}
                  className={`inline-flex items-center gap-2 h-11 px-6 rounded-lg text-sm font-medium transition-all ${
                    resume
                      ? "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span>Continue to Target Role</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════ */}
          {/* STEP 2: CHOOSE TARGET ROLE                                 */}
          {/* ══════════════════════════════════════════════════════════ */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Choose your target role
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Select the position or paste the job description you want to prepare for.
                </p>
              </div>

              {/* Clean Segmented Tab Control */}
              <div className="flex border-b border-slate-200 gap-6 text-sm">
                <button
                  type="button"
                  onClick={() => setJdMode("choose")}
                  className={`pb-3 font-medium transition-colors border-b-2 -mb-px ${
                    jdMode === "choose"
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Select Role
                </button>
                <button
                  type="button"
                  onClick={() => setJdMode("type")}
                  className={`pb-3 font-medium transition-colors border-b-2 -mb-px ${
                    jdMode === "type"
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Paste Job Description
                </button>
                <button
                  type="button"
                  onClick={() => setJdMode("upload")}
                  className={`pb-3 font-medium transition-colors border-b-2 -mb-px ${
                    jdMode === "upload"
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Upload JD File
                </button>
              </div>

              {/* Mode 1: Select Role */}
              {jdMode === "choose" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">
                      Popular Roles
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_ROLES.map((role) => {
                        const isSelected = selectedRole === role;
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => handleRoleSelect(role)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                              isSelected
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {role}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">
                      All Roles
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRole}
                        onChange={(e) => handleRoleSelect(e.target.value)}
                        className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-900 cursor-pointer pr-10"
                      >
                        {Object.entries(JOB_ROLES).map(([group, roles]) => (
                          <optgroup key={group} label={group}>
                            {roles.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Role Details Preview */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-semibold text-slate-900">{selectedRole}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentRoleData.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentRoleData.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Paste Job Description */}
              {jdMode === "type" && (
                <div className="space-y-3">
                  <textarea
                    value={typedJD}
                    onChange={handleTypedChange}
                    rows={8}
                    placeholder="Paste the target job description or requirements here..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 resize-none leading-relaxed"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{typedJD.trim().split(/\s+/).filter(Boolean).length} words</span>
                    <span>{typedJD.trim().length > 15 ? "Ready" : "Minimum 15 characters"}</span>
                  </div>
                </div>
              )}

              {/* Mode 3: Upload JD File */}
              {jdMode === "upload" && (
                <div>
                  <input
                    ref={jdInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={(e) => e.target.files[0] && setJD(e.target.files[0])}
                    className="hidden"
                  />

                  {!jd || jdMode !== "upload" ? (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingJD(true); }}
                      onDragLeave={() => setIsDraggingJD(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingJD(false);
                        if (e.dataTransfer.files[0]) setJD(e.dataTransfer.files[0]);
                      }}
                      onClick={() => jdInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                        isDraggingJD
                          ? "border-slate-900 bg-slate-100"
                          : "border-slate-300 hover:border-slate-400 bg-white"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-600">
                        <Upload className="w-5 h-5 text-slate-600" />
                      </div>
                      <p className="text-sm font-medium text-slate-900">
                        <span className="text-slate-900 font-semibold underline underline-offset-2">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        PDF, DOCX, or TXT
                      </p>
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                            <FileText className="w-5 h-5 text-slate-700" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-sm">
                              {jd.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {(jd.size / 1024).toFixed(1)} KB · Ready
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => jdInputRef.current?.click()}
                            className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => setJD(null)}
                            className="text-xs font-medium text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded-md hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  disabled={!jd}
                  className={`inline-flex items-center gap-2 h-11 px-6 rounded-lg text-sm font-medium transition-all ${
                    jd
                      ? "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span>Continue to Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════ */}
          {/* STEP 3: REVIEW & GENERATE                                  */}
          {/* ══════════════════════════════════════════════════════════ */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Review and generate
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Confirm your details below to generate your personalized learning roadmap.
                </p>
              </div>

              {/* Clean Summary Card */}
              <div className="border border-slate-200 rounded-xl bg-white divide-y divide-slate-100 overflow-hidden shadow-xs">
                
                {/* Row 1: Resume */}
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium block">Resume</span>
                      <p className="text-sm font-semibold text-slate-900">
                        {resume ? resume.name : "No resume uploaded"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    Change
                  </button>
                </div>

                {/* Row 2: Target Role */}
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                      <Briefcase className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium block">Target Role</span>
                      <p className="text-sm font-semibold text-slate-900">
                        {jd ? (jdMode === "choose" ? selectedRole : jd.name) : "No role selected"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    Change
                  </button>
                </div>

              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Private in-memory analysis · No data saved</span>
                <span>Takes ~15 seconds</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  disabled={loading}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  id="generate-roadmap-btn"
                  onClick={onGenerate}
                  disabled={loading || !isReady}
                  className={`inline-flex items-center gap-2 h-11 px-7 rounded-lg text-sm font-medium transition-all ${
                    loading
                      ? "bg-slate-800 text-white cursor-wait"
                      : !isReady
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{loadingPhase}</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Roadmap</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
