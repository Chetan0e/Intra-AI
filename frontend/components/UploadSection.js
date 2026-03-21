import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, User, Hexagon, CheckCircle2, Type, Briefcase, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

// ─── Resume Upload Box ────────────────────────────────────────────────────────
function ResumeBox({ id, resume, setResume }) {
  const fileRef = useRef();

  return (
    <div
      id={id}
      onClick={() => fileRef.current?.click()}
      className="relative group border border-dashed border-slate-200 hover:border-emerald-500/50 transition-all duration-300 rounded-2xl p-8 text-center cursor-pointer bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] overflow-hidden h-full flex flex-col items-center justify-center gap-4"
    >
      <input
        ref={fileRef}
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
        className="hidden"
        accept=".pdf,.docx,.doc,.txt"
      />
      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
        resume ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/15"
      }`}>
        {resume ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <User className="w-6 h-6 text-emerald-600" />}
      </div>
      <div>
        <p className="font-semibold text-slate-900 text-sm mb-1">
          {resume ? resume.name : "Upload Your Resume"}
        </p>
        <p className="text-xs text-slate-500">{resume ? "File selected ✓" : "PDF or DOCX — your professional profile"}</p>
      </div>
      {!resume && (
        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
          <Upload className="w-3.5 h-3.5" />
          Click to upload
        </div>
      )}
      {resume && (
        <div className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3" />
          Ready for analysis
        </div>
      )}
    </div>
  );
}

// ─── JD Panel with 3 input modes ─────────────────────────────────────────────
const JOB_ROLES = {
  "💼 Corporate & Tech": [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "ML / AI Engineer",
    "DevOps / Cloud Engineer",
    "Cybersecurity Analyst",
    "Product Manager",
    "UX / UI Designer",
    "Data Analyst",
    "Mobile Developer",
    "QA / Test Engineer",
    "Technical Lead",
    "Engineering Manager",
  ],
  "🌍 Social Good & NGO": [
    "Community Outreach Coordinator",
    "NGO Program Manager",
    "Social Worker",
    "Non-Profit Project Lead",
    "Education & Training Specialist",
    "Public Health Analyst",
    "Policy & Advocacy Officer",
    "Impact & M&E Analyst",
    "Humanitarian Aid Worker",
    "Microfinance Advisor",
    "Sustainability Consultant",
    "Youth Development Officer",
    "Women Empowerment Coordinator",
    "Grant Writer / Fundraiser",
    "Digital Inclusion Specialist",
  ],
};

const ROLE_TEMPLATES = {
  "Software Engineer": "Software Engineer role requiring Python, JavaScript, SQL, Git, REST API design, data structures, algorithms, testing, and cloud deployment on AWS. Must build scalable backend services, optimize performance, collaborate cross-functionally, and ship production-grade features.",
  "Frontend Developer": "Frontend Developer role requiring React, JavaScript, TypeScript, HTML, CSS, responsive design, API integration, and testing with Jest. Must build reusable UI components, improve web performance, and collaborate with product and design teams.",
  "Backend Developer": "Backend Developer role requiring Python or Node.js, FastAPI or Express, SQL and PostgreSQL, API design, authentication, Docker, and cloud deployment. Must architect reliable services, improve latency, write tests, and maintain production systems.",
  "Full Stack Developer": "Full Stack Developer role requiring React, TypeScript, Node.js, API integration, SQL, cloud deployment, Docker, and CI/CD. Must deliver end-to-end features, optimize frontend and backend performance, and maintain code quality.",
  "Data Scientist": "Data Scientist role requiring Python, Pandas, NumPy, SQL, statistics, machine learning, model evaluation, data visualization, and communication skills. Must build predictive models, run experiments, and deliver business insights.",
  "ML / AI Engineer": "ML / AI Engineer role requiring Python, PyTorch or TensorFlow, NLP or CV pipelines, MLOps, Docker, cloud services, and model serving APIs. Must train, evaluate, and deploy production machine learning systems.",
  "DevOps / Cloud Engineer": "DevOps / Cloud Engineer role requiring AWS, Docker, Kubernetes, CI/CD, Terraform, Linux, monitoring, and incident response. Must automate deployments, maintain infrastructure reliability, and improve system observability.",
  "Data Analyst": "Data Analyst role requiring SQL, Excel, Python, dashboarding (Power BI/Tableau), data cleaning, stakeholder communication, and KPI tracking. Must produce reports, identify trends, and support data-driven decisions.",
};

function JDPanel({ jd, setJD }) {
  const [tab, setTab] = useState("upload"); // "upload" | "choose" | "type"
  const [typed, setTyped] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const fileRef = useRef();

  const tabs = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "choose", label: "Choose Role", icon: Briefcase },
    { id: "type", label: "Type / Paste", icon: Type },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setJD(file);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const jdTemplate = ROLE_TEMPLATES[role] || `${role} role with responsibilities, required skills, and team collaboration requirements.`;
    // Create a richer text blob so backend gets a full JD, not only the title.
    const blob = new Blob([jdTemplate], { type: "text/plain" });
    const file = new File([blob], `${role.replace(/\s+/g, "_")}.txt`, { type: "text/plain" });
    setJD(file);
  };

  const handleTypedChange = (e) => {
    const val = e.target.value;
    setTyped(val);
    if (val.trim().length > 0) {
      const blob = new Blob([val], { type: "text/plain" });
      const file = new File([blob], "job_description.txt", { type: "text/plain" });
      setJD(file);
    } else {
      setJD(null);
    }
  };

  const isReady = Boolean(jd);

  return (
    <div className="relative border border-dashed border-slate-200 hover:border-purple-500/40 transition-all duration-300 rounded-2xl bg-white overflow-hidden flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-slate-100 bg-slate-50/60">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
              tab === id
                ? "text-purple-600 border-b-2 border-purple-500 bg-white"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Panel body */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-3 min-h-[160px]">
        <AnimatePresence mode="wait">

          {/* ── Upload tab ── */}
          {tab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col items-center gap-3 text-center"
            >
              <input ref={fileRef} type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.docx,.doc,.txt" />
              <div
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${
                  isReady && tab === "upload" ? "bg-purple-500/10 border-purple-500/30" : "bg-purple-500/10 border-purple-500/20"
                }`}>
                  {isReady && tab === "upload" ? <CheckCircle2 className="w-6 h-6 text-purple-600" /> : <FileText className="w-6 h-6 text-purple-600" />}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {isReady && tab === "upload" ? jd?.name : "Upload Job Description"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{isReady && tab === "upload" ? "File selected ✓" : "PDF or DOCX — the role you're targeting"}</p>
                </div>
                <div className="flex items-center gap-1.5 text-purple-600 text-xs font-medium">
                  <Upload className="w-3.5 h-3.5" />
                  Click to upload
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Choose Role tab ── */}
          {tab === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col gap-2"
            >
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest text-center mb-1">Select a target role</p>
              <div className="relative">
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={(e) => handleRoleSelect(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 pr-9 cursor-pointer"
                >
                  <option value="">— Choose a role —</option>
                  {Object.entries(JOB_ROLES).map(([group, roles]) => (
                    <optgroup key={group} label={group}>
                      {roles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {selectedRole && (
                <div className="flex items-center gap-2 text-xs text-purple-600 font-medium mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>"{selectedRole}" selected as target role</span>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Type / Paste tab ── */}
          {tab === "type" && (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col gap-2"
            >
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest text-center mb-1">Paste job description text</p>
              <textarea
                id="jd-textarea"
                value={typed}
                onChange={handleTypedChange}
                rows={5}
                placeholder="Paste the full job description here — skills, requirements, responsibilities..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none leading-relaxed"
              />
              {typed.trim().length > 0 && (
                <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{typed.trim().split(/\s+/).length} words entered</span>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}


// ─── Main UploadSection ───────────────────────────────────────────────────────
export default function UploadSection({ resume, jd, setResume, setJD, onGenerate, loading }) {
  const ready = Boolean(resume) && Boolean(jd);

  return (
    <section id="upload" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.04),transparent)]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Initialize Your <span className="gradient-text">Intelligence Engine</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Provide your resume and target job description. Our AI engine analyzes the gap between where you are and where you need to be.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative min-h-[240px]">
            {/* Left: Resume upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-full"
            >
              <ResumeBox id="resume-upload" resume={resume} setResume={setResume} />
            </motion.div>

            {/* Right: JD with tabs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="h-full"
            >
              <JDPanel jd={jd} setJD={setJD} />
            </motion.div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className={`flex items-center gap-2 text-xs font-medium ${resume ? "text-emerald-600" : "text-slate-400"}`}>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold ${resume ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600" : "border-slate-200 text-slate-400"}`}>
                {resume ? "✓" : "1"}
              </div>
              Resume
            </div>
            <div className={`w-8 h-[1px] ${resume ? "bg-emerald-500/40" : "bg-slate-200"}`} />
            <div className={`flex items-center gap-2 text-xs font-medium ${jd ? "text-purple-600" : "text-slate-400"}`}>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold ${jd ? "bg-purple-500/20 border-purple-500/40 text-purple-600" : "border-slate-200 text-slate-400"}`}>
                {jd ? "✓" : "2"}
              </div>
              Job Description
            </div>
            <div className={`w-8 h-[1px] ${ready ? "bg-gradient-to-r from-emerald-500/40 to-purple-500/40" : "bg-slate-200"}`} />
            <div className={`flex items-center gap-2 text-xs font-medium ${ready ? "text-emerald-600" : "text-slate-400"}`}>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold ${ready ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600" : "border-slate-200 text-slate-400"}`}>
                3
              </div>
              Generate
            </div>
          </div>

          {/* Generate button */}
          <div className="flex justify-center">
            <button
              id="generate-roadmap-btn"
              onClick={onGenerate}
              disabled={loading || !ready}
              className={`relative flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 overflow-hidden ${
                loading
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : !ready
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white shadow-lg shadow-emerald-500/20"
              }`}
            >
              {loading && <div className="absolute inset-0 shimmer" />}
              {loading ? (
                <>
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-transparent border-t-emerald-400 animate-spin"></span>
                  </span>
                  <span>Generating Adaptive Roadmap...</span>
                </>
              ) : (
                <>
                  <Hexagon className="w-4 h-4" strokeWidth={2.5} />
                  Generate Adaptive Roadmap
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
