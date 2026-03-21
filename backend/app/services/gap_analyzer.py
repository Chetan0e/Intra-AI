def advanced_gap_analysis(skill_dna, jd_skills):
    gap = []

    # Calculate overall match score
    total_skills = len(jd_skills)
    match_score_total = 0

    for skill, priority in jd_skills.items():
        if skill not in skill_dna:
            gap.append({
                "skill": skill,
                "status": "missing",
                "priority": priority,
                "score": 0
            })
        else:
            avg_score = sum(skill_dna[skill].values()) / 3

            status = "strong"
            if avg_score < 40:
                status = "weak"
            elif avg_score < 70:
                status = "moderate"

            gap.append({
                "skill": skill,
                "status": status,
                "priority": priority,
                "score": round(avg_score, 1)
            })
            
            # Map avg_score to matched points
            if status == "strong":
                match_score_total += 1
            elif status == "moderate":
                match_score_total += 0.5
            elif status == "weak":
                match_score_total += 0.25

    overall_score = round((match_score_total / total_skills) * 100) if total_skills > 0 else 0

    return {
        "gap": gap,
        "overall_score": overall_score
    }
