import json
import pandas as pd
import os
from typing import List, Dict, Any, Tuple
import re
from pathlib import Path

class DatasetLoader:
    """Load and preprocess resume/job description datasets for training"""
    
    def __init__(self, dataset_path: str = None):
        self.dataset_path = dataset_path or "data/"
        self.skills_map = self._load_skills_map()
        
    def _load_skills_map(self) -> Dict[str, List[str]]:
        """Load the skills dependency map"""
        try:
            path = os.path.join(os.path.dirname(__file__), "../utils/skill_map.json")
            with open(path) as f:
                return json.load(f)
        except Exception:
            return {}
    
    def load_resume_dataset(self, file_path: str) -> List[Dict[str, Any]]:
        """Load resume dataset from CSV or JSON"""
        file_ext = Path(file_path).suffix.lower()
        
        if file_ext == '.csv':
            df = pd.read_csv(file_path)
            return self._process_resume_dataframe(df)
        elif file_ext == '.json':
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return self._process_resume_json(data)
        else:
            raise ValueError(f"Unsupported file format: {file_ext}")
    
    def load_jd_dataset(self, file_path: str) -> List[Dict[str, Any]]:
        """Load job description dataset from CSV or JSON"""
        file_ext = Path(file_path).suffix.lower()
        
        if file_ext == '.csv':
            df = pd.read_csv(file_path)
            return self._process_jd_dataframe(df)
        elif file_ext == '.json':
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return self._process_jd_json(data)
        else:
            raise ValueError(f"Unsupported file format: {file_ext}")
    
    def _process_resume_dataframe(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Process resume dataframe into training format"""
        processed = []
        
        # Common column names for resume text
        text_columns = ['resume', 'resume_text', 'text', 'content', 'description']
        text_col = self._find_column(df, text_columns)
        
        # Common column names for skills
        skills_columns = ['skills', 'skill', 'tags', 'keywords']
        skills_col = self._find_column(df, skills_columns)
        
        for _, row in df.iterrows():
            resume_text = str(row[text_col]) if text_col else ""
            
            # Extract skills if available, otherwise use regex extraction
            if skills_col and pd.notna(row[skills_col]):
                skills = self._parse_skills_list(row[skills_col])
            else:
                skills = self._extract_skills_from_text(resume_text)
            
            # Generate skill DNA scores
            skill_dna = self._generate_skill_dna(resume_text, skills)
            
            processed.append({
                'text': resume_text,
                'skills': skills,
                'skill_dna': skill_dna,
                'type': 'resume'
            })
        
        return processed
    
    def _process_jd_dataframe(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Process job description dataframe into training format"""
        processed = []
        
        # Common column names for JD text
        text_columns = ['job_description', 'description', 'jd', 'text', 'content']
        text_col = self._find_column(df, text_columns)
        
        # Common column names for required skills
        skills_columns = ['required_skills', 'skills', 'qualifications', 'requirements']
        skills_col = self._find_column(df, skills_columns)
        
        for _, row in df.iterrows():
            jd_text = str(row[text_col]) if text_col else ""
            
            # Extract skills with importance levels
            if skills_col and pd.notna(row[skills_col]):
                skills_with_importance = self._parse_skills_with_importance(row[skills_col])
            else:
                skills_with_importance = self._extract_skills_with_importance(jd_text)
            
            processed.append({
                'text': jd_text,
                'skills': skills_with_importance,
                'type': 'job_description'
            })
        
        return processed
    
    def _process_resume_json(self, data: List[Dict]) -> List[Dict[str, Any]]:
        """Process resume JSON data"""
        processed = []
        
        for item in data:
            # Handle different JSON structures
            if isinstance(item, dict):
                text = item.get('resume', item.get('text', item.get('content', '')))
                skills = item.get('skills', [])
                
                if isinstance(skills, str):
                    skills = self._parse_skills_list(skills)
                
                skill_dna = self._generate_skill_dna(text, skills)
                
                processed.append({
                    'text': text,
                    'skills': skills,
                    'skill_dna': skill_dna,
                    'type': 'resume'
                })
        
        return processed
    
    def _process_jd_json(self, data: List[Dict]) -> List[Dict[str, Any]]:
        """Process job description JSON data"""
        processed = []
        
        for item in data:
            if isinstance(item, dict):
                text = item.get('job_description', item.get('description', item.get('text', '')))
                skills = item.get('skills', item.get('required_skills', {}))
                
                if isinstance(skills, list):
                    skills = self._convert_to_importance_dict(skills)
                
                processed.append({
                    'text': text,
                    'skills': skills,
                    'type': 'job_description'
                })
        
        return processed
    
    def _find_column(self, df: pd.DataFrame, possible_names: List[str]) -> str:
        """Find the best matching column name"""
        for name in possible_names:
            if name in df.columns:
                return name
        return None
    
    def _parse_skills_list(self, skills_str: str) -> List[str]:
        """Parse skills from string format"""
        if isinstance(skills_str, list):
            return [str(skill).strip() for skill in skills_str]
        
        # Handle comma-separated, pipe-separated, etc.
        skills_str = str(skills_str)
        if ',' in skills_str:
            return [skill.strip() for skill in skills_str.split(',')]
        elif '|' in skills_str:
            return [skill.strip() for skill in skills_str.split('|')]
        elif ';' in skills_str:
            return [skill.strip() for skill in skills_str.split(';')]
        else:
            return [skills_str.strip()]
    
    def _parse_skills_with_importance(self, skills_data) -> Dict[str, str]:
        """Parse skills with importance levels"""
        if isinstance(skills_data, dict):
            return skills_data
        elif isinstance(skills_data, str):
            skills = self._parse_skills_list(skills_data)
            return {skill: "Medium" for skill in skills}
        elif isinstance(skills_data, list):
            return self._convert_to_importance_dict(skills_data)
        else:
            return {}
    
    def _convert_to_importance_dict(self, skills_list: List[str]) -> Dict[str, str]:
        """Convert skills list to importance dict"""
        importance_dict = {}
        for skill in skills_list:
            importance_dict[str(skill)] = "Medium"
        return importance_dict
    
    def _extract_skills_from_text(self, text: str) -> List[str]:
        """Extract skills using regex and known skills map"""
        if not text:
            return []
        
        text_lower = text.lower()
        extracted = set()
        
        for skill in self.skills_map.keys():
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            if re.search(pattern, text_lower):
                extracted.add(skill)
        
        # Handle common variants
        clean_text = text_lower.replace(".", "")
        if "nextjs" in clean_text:
            extracted.add("Next.js")
        if "nodejs" in clean_text:
            extracted.add("Node.js")
        
        return list(extracted)
    
    def _extract_skills_with_importance(self, text: str) -> Dict[str, str]:
        """Extract skills with importance from job description text"""
        skills = self._extract_skills_from_text(text)
        
        # Determine importance based on context
        high_keywords = ["must", "required", "expert", "strong", "advanced", "senior"]
        medium_keywords = ["preferred", "desired", "plus", "bonus"]
        
        skills_with_importance = {}
        text_lower = text.lower()
        
        for skill in skills:
            skill_lower = skill.lower()
            
            # Look for context around skill mentions
            pattern = r'.{0,40}' + re.escape(skill_lower) + '.{0,40}'
            matches = re.finditer(pattern, text_lower)
            
            importance = "Medium"
            for match in matches:
                context = match.group()
                if any(kw in context for kw in high_keywords):
                    importance = "High"
                    break
                elif any(kw in context for kw in medium_keywords):
                    importance = "Low"
            
            skills_with_importance[skill] = importance
        
        return skills_with_importance
    
    def _generate_skill_dna(self, text: str, skills: List[str]) -> Dict[str, Dict[str, int]]:
        """Generate skill DNA scores for resume text"""
        skill_dna = {}
        text_lower = text.lower()
        
        # Heuristics keywords for scores
        practical_keywords = ["built", "developed", "created", "implemented", "engineered", "designed"]
        real_world_keywords = ["production", "deployed", "scaled", "led", "managed", "users", "impact"]
        
        for skill in skills:
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            matches = list(re.finditer(pattern, text_lower))
            
            if matches:
                conceptual = 60
                practical = 40
                real_world = 30
                
                # Boost scores based on occurrence count
                conceptual = min(100, conceptual + len(matches) * 5)
                
                # Analyze context around matches
                for match in matches:
                    start = max(0, match.start() - 60)
                    end = min(len(text_lower), match.end() + 60)
                    context = text_lower[start:end]
                    
                    if any(kw in context for kw in practical_keywords):
                        practical = min(100, practical + 15)
                    if any(kw in context for kw in real_world_keywords):
                        real_world = min(100, real_world + 20)
                
                skill_dna[skill] = {
                    "conceptual": conceptual,
                    "practical": practical,
                    "real_world": real_world
                }
        
        return skill_dna
    
    def create_training_data(self, resume_file: str = None, jd_file: str = None) -> Tuple[List[Dict], List[Dict]]:
        """Create complete training dataset"""
        resume_data = []
        jd_data = []
        
        if resume_file and os.path.exists(resume_file):
            resume_data = self.load_resume_dataset(resume_file)
        
        if jd_file and os.path.exists(jd_file):
            jd_data = self.load_jd_dataset(jd_file)
        
        return resume_data, jd_data
