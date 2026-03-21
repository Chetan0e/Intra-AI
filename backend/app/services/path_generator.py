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

def estimate_time_saved(gap, roadmap):
    """
    Estimate time saved by skipping 'strong' skills.
    Base time: 15 hours per major skill.
    """
    strong_skills = [g for g in gap if g["status"] == "strong"]
    total_potential_time = (len(gap) * 15) or 1
    saved_time = len(strong_skills) * 15
    
    # Cap at 95% to stay realistic
    percentage = min(95, round((saved_time / total_potential_time) * 100))
    return max(0, percentage)

def generate_training_instruction(skill, level, course_info):
    """Generate best-in-class training instructions based on skill and level."""
    if level == "foundation":
        return (
            f"Master the core principles of {skill}. Focus on syntax, basic architecture, "
            f"and setting up a development environment. Objective: Build a 'Hello World' "
            f"plus basic CRUD functionality."
        )
    elif level == "beginner":
        return (
            f"Establish a solid command of {skill}. Implement standard design patterns and "
            f"integrate {skill} into a multi-component system. Objective: Complete a fully "
            f"functional standalone module."
        )
    elif level == "intermediate":
        return (
            f"Bridge the gap to senior-level {skill}. Optimize performance, implement error "
            f"handling, and follow enterprise coding standards. Objective: Refactor a "
            f"prototype into a scalable, tested solution."
        )
    else: # advanced
        return (
            f"Achieve mastery in {skill}. Focus on system-wide architecture, security hardening, "
            f"and dev-ops integration for {skill} based microservices. Objective: Design and "
            f"deploy a production-ready system."
        )

def generate_advanced_path(gap):
    """
    Generate the 'Best' adaptive training roadmap.
    1. Resolves graph-based dependencies.
    2. Maps gaps to specific training levels.
    3. Generates detailed training instructions.
    """
    graph = load_graph()
    courses = load_courses()
    roadmap = []
    added_skills = set()
    
    # Sort gap by priority (High first) to ensure dependencies for important skills are handled first
    priority_map = {"High": 0, "Medium": 1, "Low": 2}
    sorted_gap = sorted(gap, key=lambda x: priority_map.get(x["priority"], 3))

    for item in sorted_gap:
        skill = item["skill"]
        status = item["status"]
        
        if status == "strong":
            continue

        # 1. Resolve dependencies first (Foundational Knowledge)
        deps = resolve_dependencies(skill, graph)
        for dep in deps:
            if dep not in added_skills:
                # Basic course info
                course_data = courses.get(dep, {}).get("beginner", {})
                title = course_data.get("title", f"{dep} Fundamentals")
                time = course_data.get("time", 5)
                
                # Best training instruction
                task = generate_training_instruction(dep, "foundation", course_data)

                roadmap.append({
                    "skill": dep,
                    "level": "foundation",
                    "priority": "Dependency",
                    "course": {
                        "title": title,
                        "time": time,
                        "task": task
                    }
                })
                added_skills.add(dep)

        # 2. Add main skill (Target Proficiency)
        if skill not in added_skills:
            # Determine level needed to bridge the gap
            level = "advanced"
            if status == "missing":
                level = "beginner"
            elif status == "weak":
                level = "foundation"
            elif status == "moderate":
                level = "intermediate"
            
            course_data = courses.get(skill, {}).get(level, {})
            title = course_data.get("title", f"{level.title()} {skill} Mastery")
            time = course_data.get("time", 10)
            
            # Best training instruction
            task = generate_training_instruction(skill, level, course_data)

            roadmap.append({
                "skill": skill,
                "level": level,
                "priority": item["priority"],
                "course": {
                    "title": title,
                    "time": time,
                    "task": task
                }
            })
            added_skills.add(skill)

    time_saved = estimate_time_saved(gap, roadmap)

    return {
        "roadmap": roadmap,
        "time_saved": time_saved
    }
