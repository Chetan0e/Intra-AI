import os
import json
from app.services.ai_engine import ai_engine

def get_known_skills():
    try:
        path = os.path.join(os.path.dirname(__file__), "../utils/skill_map.json")
        with open(path) as f:
            return list(json.load(f).keys())
    except Exception:
        return ["JavaScript", "Python", "Java", "C++", "React", "Node.js", "SQL", "Docker", "AWS", "Machine Learning", "HTML", "CSS"]

def parse_jd(text):
    """Parse job description using custom AI engine"""
    return ai_engine.parse_job_description(text)
