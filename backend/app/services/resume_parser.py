import re
import os
import json


# ─── Master skill registry ────────────────────────────────────────────────────
SKILL_REGISTRY = {
    # Languages
    "Python", "JavaScript", "TypeScript", "Java", "C", "C++", "C#", "Go", "Rust",
    "Ruby", "Swift", "Kotlin", "PHP", "Scala", "R", "MATLAB", "Perl", "Dart",
    "Objective-C", "Assembly", "Bash", "Shell", "PowerShell", "Groovy", "Lua",
    # Web Frontend
    "HTML", "HTML5", "CSS", "CSS3", "SCSS", "Sass", "Less",
    "React", "ReactJS", "React.js", "Next.js", "Vue", "Vue.js", "Angular",
    "Svelte", "jQuery", "Bootstrap", "TailwindCSS", "Tailwind", "Material UI",
    "Chakra UI", "Ant Design", "Webpack", "Vite", "Babel", "PostCSS",
    "Framer Motion", "Redux", "Zustand", "MobX", "GraphQL", "Apollo",
    # Backend
    "Node.js", "Express", "Express.js", "NestJS", "FastAPI", "Django", "Flask",
    "Spring", "Spring Boot", "Laravel", "Ruby on Rails", "ASP.NET", ".NET",
    "Gin", "Fiber", "Hapi", "Koa", "Fastify", "Deno", "gRPC", "REST API",
    "RESTful", "REST", "API", "Microservices", "Serverless",
    # Databases
    "SQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis", "Cassandra",
    "DynamoDB", "Firebase", "Firestore", "Elasticsearch", "Neo4j", "CouchDB",
    "MariaDB", "Oracle", "MS SQL", "SQL Server", "Supabase", "PlanetScale",
    "NoSQL", "ORM", "Prisma", "Sequelize", "SQLAlchemy", "Hibernate",
    # Cloud & DevOps
    "AWS", "Azure", "GCP", "Google Cloud", "Heroku", "Vercel", "Netlify",
    "DigitalOcean", "Cloudflare", "Docker", "Kubernetes", "K8s", "Terraform",
    "Ansible", "Jenkins", "GitHub Actions", "GitLab CI", "CircleCI", "Travis CI",
    "CI/CD", "DevOps", "SRE", "Linux", "Unix", "Nginx", "Apache", "Caddy",
    "Prometheus", "Grafana", "ELK Stack", "Kibana", "Logstash", "Datadog",
    # Data & ML/AI
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "AI",
    "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Scikit", "Pandas",
    "NumPy", "Matplotlib", "Seaborn", "Plotly", "SciPy", "Hugging Face",
    "Transformers", "LangChain", "OpenAI", "LLM", "Data Science", "Data Analysis",
    "Data Engineering", "Data Pipeline", "ETL", "Spark", "Hadoop", "Kafka",
    "Airflow", "dbt", "Tableau", "Power BI", "Looker", "Snowflake", "BigQuery",
    "Databricks", "MLflow", "Jupyter", "Colab",
    # Mobile
    "React Native", "Flutter", "Android", "iOS", "SwiftUI", "Jetpack Compose",
    "Ionic", "Xamarin", "Expo",
    # Tools & Practices
    "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", "Trello",
    "Agile", "Scrum", "Kanban", "TDD", "BDD", "Unit Testing", "Jest",
    "Pytest", "Mocha", "Cypress", "Selenium", "Playwright", "Testing Library",
    "Postman", "Swagger", "OpenAPI", "Figma", "Adobe XD", "Sketch",
    "UI/UX", "UX Design", "UI Design", "System Design", "Architecture",
    "Microservices", "Event-Driven", "Event-driven Architecture",
    "WebSockets", "Socket.io", "OAuth", "JWT", "Authentication", "Authorization",
    "RBAC", "Security", "OWASP", "Penetration Testing",
    # Soft / Methodology
    "Leadership", "Communication", "Problem Solving", "Team Management",
    "Project Management", "Product Management", "Mentoring", "Cross-functional",
}

# Aliases → canonical name
ALIASES = {
    "reactjs": "React", "react.js": "React", "react js": "React",
    "nextjs": "Next.js", "next js": "Next.js",
    "nodejs": "Node.js", "node js": "Node.js",
    "vuejs": "Vue", "vue.js": "Vue", "vue js": "Vue",
    "expressjs": "Express", "express.js": "Express",
    "tailwindcss": "TailwindCSS", "tailwind css": "TailwindCSS",
    "sklearn": "Scikit-learn", "scikit learn": "Scikit-learn",
    "html5": "HTML", "css3": "CSS",
    "k8s": "Kubernetes",
    "gcp": "GCP", "google cloud platform": "GCP", "google cloud": "GCP",
    "aws": "AWS", "amazon web services": "AWS",
    "ms sql": "SQL Server", "mssql": "SQL Server",
    "llms": "LLM", "large language model": "LLM",
    "ci/cd": "CI/CD", "cicd": "CI/CD",
    "rest api": "REST API", "restful api": "REST API", "restful": "REST API",
    "postgresql": "PostgreSQL", "postgres": "PostgreSQL",
    ".net": ".NET", "asp.net": "ASP.NET",
    "mongodb": "MongoDB", "mongo": "MongoDB",
    "springboot": "Spring Boot", "spring boot": "Spring Boot",
}

# Context signals
_PRACTICAL_KW  = ["built", "developed", "created", "implemented", "engineered",
                   "designed", "architected", "wrote", "deployed", "shipped",
                   "launched", "maintained", "optimized", "refactored", "automated"]
_REAL_WORLD_KW = ["production", "users", "customers", "team", "led", "managed",
                   "scaled", "revenue", "impact", "startup", "enterprise",
                   "client", "stakeholder", "cross-functional", "delivered"]
_YEARS_KW      = ["years", "year", "yrs", "months", "+"]


def _load_skill_map():
    try:
        path = os.path.join(os.path.dirname(__file__), "../utils/skill_map.json")
        with open(path) as f:
            return set(json.load(f).keys())
    except Exception:
        return set()


def _normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip().lower()


def extract_years_of_experience(text: str) -> float:
    """Try to extract overall YoE from resume text."""
    matches = re.findall(r"(\d+\.?\d*)\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp)?", text, re.IGNORECASE)
    if matches:
        return max(float(m) for m in matches)
    return 0.0


def parse_resume(text: str) -> dict:
    """
    Full resume parser.
    Returns:
        {
          "skills": list[str],
          "skill_dna": { skill: { conceptual, practical, real_world } },
          "years_experience": float,
          "summary": str
        }
    """
    skill_dna = _extract_skill_dna(text)
    years_exp = extract_years_of_experience(text)

    return {
        "skills": list(skill_dna.keys()),
        "skill_dna": skill_dna,
        "years_experience": years_exp,
        "summary": _build_summary(text, skill_dna, years_exp),
    }


def _extract_skill_dna(text: str) -> dict:
    """
    Rule-based Skill DNA extractor.
    Returns { skill_name: { conceptual, practical, real_world } }
    """
    text_lower = text.lower()
    skill_dna = {}

    # Merge SKILL_REGISTRY + skill_map.json keys
    all_skills = SKILL_REGISTRY | _load_skill_map()

    for skill in sorted(all_skills, key=len, reverse=True):  # longest first to avoid partial matches
        skill_l = skill.lower()
        alias_l = ALIASES.get(skill_l, skill_l)
        # Build pattern – allow word boundary, handle special chars
        safe = re.escape(skill_l)
        # Use word boundaries, but allow trailing dot for versions like "Node.js"
        pattern = rf"(?<![a-zA-Z]){safe}(?![a-zA-Z])"
        matches = list(re.finditer(pattern, text_lower, re.IGNORECASE))

        if not matches:
            # Try aliases
            for alias, canonical in ALIASES.items():
                if canonical.lower() == skill_l or canonical == skill:
                    ap = rf"(?<![a-zA-Z]){re.escape(alias)}(?![a-zA-Z])"
                    alias_matches = list(re.finditer(ap, text_lower, re.IGNORECASE))
                    if alias_matches:
                        matches = alias_matches
                        break

        if not matches:
            continue

        # Base scores
        conceptual  = min(100, 55 + len(matches) * 5)
        practical   = 35
        real_world  = 20

        for m in matches:
            start = max(0, m.start() - 100)
            end   = min(len(text_lower), m.end() + 100)
            ctx   = text_lower[start:end]

            if any(kw in ctx for kw in _PRACTICAL_KW):
                practical = min(100, practical + 20)
            if any(kw in ctx for kw in _REAL_WORLD_KW):
                real_world = min(100, real_world + 25)
            if any(kw in ctx for kw in _YEARS_KW):
                conceptual = min(100, conceptual + 10)
                practical  = min(100, practical  + 10)

        canonical_name = ALIASES.get(skill.lower(), skill)
        # Use title-cased canonical if no specific alias
        if canonical_name.lower() == skill.lower():
            canonical_name = skill  # keep original casing from registry

        if canonical_name not in skill_dna:
            skill_dna[canonical_name] = {
                "conceptual":  conceptual,
                "practical":   practical,
                "real_world":  real_world,
            }

    return skill_dna


def _build_summary(text: str, skill_dna: dict, years: float) -> str:
    top_skills = sorted(skill_dna.keys(), key=lambda s: sum(skill_dna[s].values()), reverse=True)[:5]
    yoe_str = f"{int(years)}+ years" if years >= 1 else "entry-level"
    return (
        f"{yoe_str} professional with expertise in: {', '.join(top_skills)}. "
        f"Total detected skills: {len(skill_dna)}."
    )
