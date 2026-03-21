from fastapi import APIRouter
from app.services.ai_engine import ai_engine
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class TrainingRequest(BaseModel):
    resume_file: Optional[str] = None
    jd_file: Optional[str] = None
    use_sample_data: bool = True

class TrainingStatus(BaseModel):
    status: str
    message: str

@router.get("/training/status")
def get_training_status():
    """Get current training status and model information"""
    return ai_engine.get_model_info()

@router.post("/training/train")
def train_model(request: TrainingRequest):
    """Train a new custom model"""
    try:
        metadata = ai_engine.train_new_model(
            resume_file=request.resume_file,
            jd_file=request.jd_file,
            use_sample_data=request.use_sample_data
        )
        return {
            "status": "success",
            "message": "Model training completed successfully",
            "metadata": metadata
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Training failed: {str(e)}"
        }

@router.post("/training/test")
def test_model(test_text: Optional[str] = None):
    """Test the current model"""
    if not test_text:
        test_text = """
        Senior Software Engineer with 5+ years of experience in Python development. 
        Expert in Django and Flask frameworks. Built REST APIs and microservices. 
        Deployed applications on AWS and Docker. Experience with PostgreSQL and Redis databases.
        """
    
    try:
        # Test skill DNA extraction
        skill_dna = ai_engine.extract_skill_dna(test_text)
        
        # Test JD parsing
        jd_skills = ai_engine.parse_job_description(test_text)
        
        # Extract skills list from DNA
        skills = list(skill_dna.keys()) if skill_dna else []
        
        return {
            "status": "success",
            "test_input": test_text[:200] + "..." if len(test_text) > 200 else test_text,
            "skills": skills,
            "skill_dna": skill_dna,
            "jd_skills": jd_skills,
            "skills_count": len(skills),
            "ai_engine_status": ai_engine.get_model_info()
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Testing failed: {str(e)}",
            "test_input": test_text[:200] + "..." if test_text and len(test_text) > 200 else test_text
        }
