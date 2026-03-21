import re
import os
import json

# Use same registry as resume_parser for consistency
from app.services.resume_parser import SKILL_REGISTRY, ALIASES

# Importance signals
_HIGH_KW   = ["must", "required", "essential", "need", "mandatory", "critical",
               "strong", "expert", "proven", "solid", "hands-on", "primary",
               "key", "minimum", "at least", "proficient in"]
_MEDIUM_KW = ["experience", "knowledge", "familiar", "working knowledge",
               "understanding", "ability", "comfort", "good", "exposure"]
_LOW_KW    = ["preferred", "desirable", "nice to have", "bonus", "plus",
               "advantage", "optional", "ideally", "would be"]


def parse_jd(text: str) -> dict:
    """
    Parse job description and return { skill: "High"|"Medium"|"Low" }.
    """
    text_lower = text.lower()
    results = {}

    # Load extra skills from skill_map.json
    try:
        path = os.path.join(os.path.dirname(__file__), "../utils/skill_map.json")
        with open(path) as f:
            extra = set(json.load(f).keys())
    except Exception:
        extra = set()

    all_skills = SKILL_REGISTRY | extra

    for skill in sorted(all_skills, key=len, reverse=True):
        safe = re.escape(skill.lower())
        pattern = rf"(?<![a-zA-Z]){safe}(?![a-zA-Z])"
        matches = list(re.finditer(pattern, text_lower, re.IGNORECASE))

        if not matches:
            # Try aliases
            for alias, canonical in ALIASES.items():
                if canonical == skill or canonical.lower() == skill.lower():
                    ap = rf"(?<![a-zA-Z]){re.escape(alias)}(?![a-zA-Z])"
                    alias_matches = list(re.finditer(ap, text_lower, re.IGNORECASE))
                    if alias_matches:
                        matches = alias_matches
                        break

        if not matches:
            continue

        importance = "Medium"  # default

        for m in matches:
            start = max(0, m.start() - 120)
            end   = min(len(text_lower), m.end() + 120)
            ctx   = text_lower[start:end]

            if any(kw in ctx for kw in _HIGH_KW):
                importance = "High"
                break
            elif any(kw in ctx for kw in _LOW_KW):
                importance = "Low"

        canonical = ALIASES.get(skill.lower(), skill)
        if canonical not in results:
            results[canonical] = importance

    print(f"[JD Parser] Extracted {len(results)} skills from JD.")
    return results
