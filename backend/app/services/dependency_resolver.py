import json
import os

def load_graph():
    path = os.path.join(os.path.dirname(__file__), "../utils/skill_map.json")
    try:
        with open(path) as f:
            return json.load(f)
    except Exception:
        return {}

def resolve_dependencies(skill, graph, visited=None):
    if visited is None:
        visited = set()

    if skill in visited:
        return []

    visited.add(skill)

    dependencies = graph.get(skill, [])
    result = []

    for dep in dependencies:
        result += resolve_dependencies(dep, graph, set(visited))
        result.append(dep)

    # ensure unique while preserving some order
    seen = set()
    unique_result = []
    for r in result:
        if r not in seen:
            seen.add(r)
            unique_result.append(r)
            
    return unique_result
