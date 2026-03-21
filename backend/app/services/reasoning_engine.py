def advanced_reasoning(gap, roadmap):
    """
    Generate deep AI reasoning for the gaps found and the suggested path.
    This provides the 'why' behind the adaptive intelligence report.
    """
    explanations = []

    for item in gap:
        skill = item["skill"]
        status = item["status"]
        priority = item["priority"]
        score = item.get("score", 0)
        
        # Determine the narrative based on status and priority
        if status == "strong":
            reason = (
                f"Your profile demonstrates specialized expertise in {skill}. "
                f"With a match score of {score}/100, we've identified that you possess "
                f"the {priority}-priority competencies required for this role."
            )
            action = "Optimized out of learning path to accelerate your time-to-hire."
        
        elif status == "moderate":
            reason = (
                f"You have a solid foundation in {skill} ({score}/100), but the job requires "
                f"more {'advanced' if priority == 'High' else 'specific'} application of this skill. "
                "There's a slight delta between your current proficiency and the role's expectations."
            )
            action = f"Suggested targeted {priority.lower()}-priority refinement module."
            
        elif status == "weak":
            reason = (
                f"While you've mentioned {skill} or related concepts, your profile indicates "
                f"early-stage exposure ({score}/100). For a {priority}-priority requirement, "
                "this represents a significant growth opportunity."
            )
            action = f"Injected foundational and practical {skill} modules into your roadmap."
            
        else: # missing
            reason = (
                f"We could not detect {skill} in your resume. Since this is a {priority}-priority "
                f"requirement for the role, mastering this is critical for your success."
            )
            action = f"Added comprehensive {skill} 'Zero-to-Hero' path including dependencies."

        explanations.append({
            "skill": skill,
            "reason": reason,
            "action": action,
            "priority": priority,
            "confidence": "High (Rule-based deterministic analysis)"
        })

    return explanations
