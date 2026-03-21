def advanced_gap_analysis(skill_dna: dict, jd_skills: dict) -> dict:
    """
    Compare resume skill DNA against JD requirements.
    """
    if not jd_skills:
        return {
            "gap": [],
            "overall_score": 0,
            "matched": [],
            "missing": [],
            "weak": [],
            "strong_count": 0,
            "total_required": 0,
        }

    gap = []
    matched = []
    missing = []
    weak_list = []
    strong_count = 0

    weight_map = {"High": 3, "Medium": 2, "Low": 1}
    total_weight    = 0
    achieved_weight = 0

    for skill, priority in jd_skills.items():
        w = weight_map.get(priority, 2)
        total_weight += w

        matching_key = _fuzzy_find(skill, skill_dna)
        if matching_key:
            scores = skill_dna[matching_key]
            avg = sum(scores.values()) / 3
        else:
            avg = 0

        if avg == 0:
            status = "missing"
            missing.append(skill)
            achieved_weight += 0
        elif avg < 40:
            status = "weak"
            weak_list.append(skill)
            achieved_weight += w * 0.2
        elif avg < 65:
            status = "moderate"
            matched.append(skill)
            achieved_weight += w * 0.6
        else:
            status = "strong"
            strong_count += 1
            matched.append(skill)
            achieved_weight += w * 1.0

        gap.append({
            "skill":     skill,
            "status":    status,
            "priority":  priority,
            "score":     round(avg, 1),
            "breakdown": skill_dna.get(_fuzzy_find(skill, skill_dna) or "")
        })

    overall_score = round((achieved_weight / total_weight) * 100) if total_weight > 0 else 0

    priority_order = {"High": 0, "Medium": 1, "Low": 2}
    status_order   = {"missing": 0, "weak": 1, "moderate": 2, "strong": 3}
    gap.sort(key=lambda x: (status_order.get(x["status"], 9), priority_order.get(x["priority"], 9)))

    return {
        "gap":            gap,
        "overall_score":  overall_score,
        "matched":        matched,
        "missing":        missing,
        "weak":           weak_list,
        "strong_count":   strong_count,
        "total_required": len(jd_skills),
    }

def _fuzzy_find(skill: str, skill_dna: dict) -> str | None:
    skill_l = skill.lower()
    for k in skill_dna:
        if k.lower() == skill_l:
            return k
    return None
