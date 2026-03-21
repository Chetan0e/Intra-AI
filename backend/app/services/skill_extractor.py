from app.services.resume_parser import _extract_skill_dna

def extract_skill_dna(resume_text: str) -> dict:
    """
    Extract skill DNA from resume text.
    Returns { skill: { conceptual, practical, real_world } }
    """
    return _extract_skill_dna(resume_text)
