from fastapi import APIRouter, HTTPException
from app.services.resume_parser import parse_resume
from app.services.jd_parser import parse_jd
from app.services.skill_extractor import extract_skill_dna
from app.services.gap_analyzer import advanced_gap_analysis
from pydantic import BaseModel

router = APIRouter()

class AnalysisRequest(BaseModel):
    resume: str
    jd: str

@router.post("/analyze")
def analyze(data: AnalysisRequest):
    """Analyze resume against job description"""
    # Validate input
    if not data.resume.strip():
        raise HTTPException(status_code=400, detail="Resume cannot be empty")
    
    if not data.jd.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty")
    
    try:
        # Extract skills and analyze
        skill_dna = extract_skill_dna(data.resume)
        jd_skills = parse_jd(data.jd)

        analysis_result = advanced_gap_analysis(skill_dna, jd_skills)

        return {
            "gap": analysis_result["gap"], 
            "skill_dna": skill_dna,
            "overall_score": analysis_result["overall_score"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
