from fastapi import APIRouter, HTTPException
from app.services.path_generator import generate_advanced_path
from app.services.reasoning_engine import advanced_reasoning
from app.services.gap_analyzer import advanced_gap_analysis
from app.services.skill_extractor import extract_skill_dna
from app.services.jd_parser import parse_jd
from typing import List, Dict, Any
from pydantic import BaseModel

router = APIRouter()

class RoadmapRequest(BaseModel):
    gap: List[Dict[str, Any]]

class RoadmapFromText(BaseModel):
    resume: str
    jd: str

@router.post("/roadmap")
def roadmap_from_text(data: RoadmapFromText):
    """Generate roadmap from resume and JD text"""
    try:
        # Validate input
        if not data.resume.strip() or not data.jd.strip():
            raise HTTPException(status_code=400, detail="Resume and JD cannot be empty")
        
        # Extract skills and analyze gap
        skill_dna = extract_skill_dna(data.resume)
        jd_skills = parse_jd(data.jd)
        gap_analysis = advanced_gap_analysis(skill_dna, jd_skills)
        
        # Generate roadmap
        path_data = generate_advanced_path(gap_analysis["gap"])
        path = path_data["roadmap"]
        time_saved = path_data["time_saved"]
        
        reasoning = advanced_reasoning(gap_analysis["gap"], path)

        return {
            "roadmap": path,
            "time_saved": time_saved,
            "reasoning": reasoning,
            "gap_analysis": gap_analysis
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating roadmap: {str(e)}")

@router.post("/roadmap/from-gap")
def roadmap_from_gap(data: RoadmapRequest):
    """Generate roadmap from existing gap analysis"""
    try:
        path_data = generate_advanced_path(data.gap)
        path = path_data["roadmap"]
        time_saved = path_data["time_saved"]
        
        reasoning = advanced_reasoning(data.gap, path)

        return {
            "roadmap": path,
            "time_saved": time_saved,
            "reasoning": reasoning
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating roadmap: {str(e)}")
