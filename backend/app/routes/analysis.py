from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.resume_parser import parse_resume
from app.services.jd_parser import parse_jd
from app.services.gap_analyzer import advanced_gap_analysis
from app.services.path_generator import generate_advanced_path
from app.services.reasoning_engine import advanced_reasoning
from app.services.ai_engine import ai_engine

router = APIRouter()

class AnalysisRequest(BaseModel):
    resume: str
    jd: str

@router.post("/analyze")
def full_analyze(data: AnalysisRequest):
    if not data.resume.strip() or not data.jd.strip():
        raise HTTPException(status_code=400, detail="Resume and JD text cannot be empty.")

    try:
        parsed_resume = parse_resume(data.resume)
        skill_dna = parsed_resume["skill_dna"]
        jd_skills = parse_jd(data.jd)

        # Fallback to AI engine when rule-based extraction is too sparse.
        # This keeps responses different across distinct resumes/JDs.
        if len(skill_dna) < 3:
            ai_skill_dna = ai_engine.extract_skill_dna(data.resume)
            if ai_skill_dna:
                skill_dna = ai_skill_dna

        if len(jd_skills) < 2:
            ai_jd_skills = ai_engine.parse_job_description(data.jd)
            if ai_jd_skills:
                jd_skills = ai_jd_skills

        if not skill_dna and not jd_skills:
            raise HTTPException(
                status_code=422,
                detail="Could not extract any skills. Please ensure the documents contain clear technical content."
            )

        gap_result    = advanced_gap_analysis(skill_dna, jd_skills)
        path_data     = generate_advanced_path(gap_result["gap"])
        reasoning     = advanced_reasoning(gap_result["gap"], path_data["roadmap"])

        return {
            "overall_score":  gap_result["overall_score"],
            "skill_dna":      skill_dna,
            "gap":            gap_result["gap"],
            "roadmap":        path_data["roadmap"],
            "time_saved":     path_data["time_saved"],
            "reasoning":      reasoning,
            "analysis": {
                "years_experience":     parsed_resume["years_experience"],
                "resume_skills_count":  len(skill_dna),
                "jd_skills_count":      len(jd_skills),
                "matched_skills":       gap_result["matched"],
                "missing_skills":       gap_result["missing"],
                "weak_skills":          gap_result["weak"],
                "strong_count":         gap_result["strong_count"],
                "job_readiness_label":  _readiness_label(gap_result["overall_score"]),
                "engine_mode":          _engine_mode(skill_dna, jd_skills),
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def _readiness_label(score: int) -> str:
    if score >= 80: return "Highly Qualified"
    if score >= 60: return "Good Fit"
    if score >= 40: return "Partially Qualified"
    return "Significant Gap"

def _engine_mode(skill_dna: dict, jd_skills: dict) -> str:
    if not skill_dna and not jd_skills:
        return "empty"
    if ai_engine.is_initialized:
        return "custom_model_or_hybrid"
    if ai_engine.openai_available:
        return "openai_or_rule_hybrid"
    return "rule_based"
