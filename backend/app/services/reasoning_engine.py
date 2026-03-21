def advanced_reasoning(gap, roadmap):
    explanations = []

    for item in gap:
        if item["status"] == "strong":
            explanations.append({
                "skill": item["skill"],
                "reason": f"Skill is '{item['status']}' with a score of {item.get('score', 100)}.",
                "action": "Skipped in adaptive path to save training time."
            })
        else:
            explanations.append({
                "skill": item["skill"],
                "reason": f"Skill '{item['skill']}' is marked as '{item['status']}' with priority '{item['priority']}' (Score: {item.get('score', 0)}/100).",
                "action": "Added to roadmap and assessed graph-based dependencies."
            })

    return explanations
