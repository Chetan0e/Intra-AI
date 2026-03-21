from app.services.dependency_resolver import resolve_dependencies, load_graph
import json
import os

def load_courses():
    path = os.path.join(os.path.dirname(__file__), "../utils/course_catalog.json")
    try:
        with open(path) as f:
            return json.load(f)
    except Exception:
        return {}

def estimate_time(roadmap):
    time_map = {
        "foundation": 5,
        "beginner": 7,
        "intermediate": 10,
        "advanced": 14
    }
    total = sum(time_map.get(step.get("level", "beginner"), 5) for step in roadmap)
    return total

def generate_advanced_path(gap):
    graph = load_graph()
    courses = load_courses()
    roadmap = []
    added_skills = set()
    
    # Let's track a theoretical "worst case" roadmap length for estimating time saved
    max_roadmap = []

    for item in gap:
        skill = item["skill"]
        status = item["status"]
        
        # Add to max roadmap
        max_roadmap.append({"level": "beginner"})
        deps_all = resolve_dependencies(skill, graph)
        for d in deps_all:
             max_roadmap.append({"level": "foundation"})

        if status == "strong":
            continue

        # Resolve dependencies first
        deps = resolve_dependencies(skill, graph)

        for dep in deps:
            if dep not in added_skills:
                # Provide foundational course info if available
                course_info = courses.get(dep, {}).get("beginner", {"title": f"{dep} Fundamentals", "time": 5, "task": f"Learn basics of {dep}"})
                roadmap.append({
                    "skill": dep,
                    "level": "foundation",
                    "course": course_info
                })
                added_skills.add(dep)

        # Add main skill
        if skill not in added_skills:
            level = "advanced"
            if status == "missing":
                level = "beginner"
            elif status == "weak":
                level = "intermediate"
            
            course_info = courses.get(skill, {}).get(level, {"title": f"{level.title()} {skill}", "time": 10, "task": f"Project with {skill}"})

            roadmap.append({
                "skill": skill,
                "level": level,
                "course": course_info
            })
            added_skills.add(skill)

    actual_time = estimate_time(roadmap)
    max_time = estimate_time(max_roadmap)
    time_saved = round((max_time - actual_time) / max_time * 100) if max_time > actual_time else 0

    return {
        "roadmap": roadmap,
        "time_saved": time_saved
    }
