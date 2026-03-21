import os
import json
import openai
from dotenv import load_dotenv
from typing import Dict, List, Any
from app.services.custom_model import CustomSkillModel
from app.services.dataset_loader import DatasetLoader

# Load environment variables
load_dotenv()

class AIEngine:
    """Main AI Engine that uses custom trained models with OpenAI API fallback"""
    
    def __init__(self, model_path: str = "models/"):
        self.model_path = model_path
        self.custom_model = CustomSkillModel(model_path)
        self.dataset_loader = DatasetLoader()
        self.is_initialized = False
        self.openai_available = bool(os.getenv("OPENAI_API_KEY"))
        
        # Try to load existing model
        self._initialize()
    
    def _initialize(self):
        """Initialize the AI engine with trained model or fallback"""
        try:
            self.custom_model.load_model()
            self.is_initialized = True
            print("Custom AI model loaded successfully")
        except FileNotFoundError:
            print("No trained model found. Using rule-based fallback.")
            self.is_initialized = False
    
    def extract_skill_dna(self, resume_text: str) -> Dict[str, Dict[str, int]]:
        """Extract Skill DNA from resume text"""
        print(f"Extracting skill DNA from resume (length: {len(resume_text)})")
        
        # Try custom model first
        if self.is_initialized:
            try:
                skills = self.custom_model.extract_skills(resume_text)
                print(f"Custom model extracted skills: {skills}")
                
                if skills:  # If we found skills with custom model
                    skill_dna = self.custom_model.predict_skill_dna(resume_text, skills)
                    if skill_dna and skill_dna != {}:  # If we got meaningful results
                        print(f"Custom model skill DNA: {list(skill_dna.keys())}")
                        return skill_dna
                    else:
                        print("Custom model returned empty DNA, falling back...")
                else:
                    print("Custom model found no skills, falling back...")
            except Exception as e:
                print(f"Custom model failed: {e}, falling back...")
        
        # Try OpenAI API if available
        if self.openai_available:
            try:
                print("Using OpenAI API fallback...")
                result = self._openai_skill_dna(resume_text)
                if result and result != {}:
                    print(f"OpenAI extracted {len(result)} skills successfully")
                    return result
                else:
                    print("OpenAI returned empty result, using rule-based fallback...")
            except Exception as e:
                print(f"OpenAI API failed: {e}, using rule-based fallback...")
        
        # Final fallback to rule-based
        print("Using rule-based fallback...")
        return self._rule_based_skill_dna(resume_text)
    
    def parse_job_description(self, jd_text: str) -> Dict[str, str]:
        """Parse job description and extract skills with importance"""
        print(f"Parsing job description (length: {len(jd_text)})")
        
        # Try custom model first
        if self.is_initialized:
            try:
                skills = self.custom_model.extract_skills(jd_text)
                print(f"Custom model extracted JD skills: {skills}")
                
                if skills:  # If we found skills with custom model
                    importance = self.custom_model.predict_importance(jd_text, skills)
                    if importance and importance != {}:  # If we got meaningful results
                        print(f"Custom model JD importance: {list(importance.keys())}")
                        return importance
                    else:
                        print("Custom model returned empty importance, falling back...")
                else:
                    print("Custom model found no JD skills, falling back...")
            except Exception as e:
                print(f"Custom model failed: {e}, falling back...")
        
        # Try OpenAI API if available
        if self.openai_available:
            try:
                print("Using OpenAI API for JD parsing...")
                result = self._openai_jd_parsing(jd_text)
                if result and result != {}:
                    print(f"OpenAI extracted {len(result)} JD skills successfully")
                    return result
                else:
                    print("OpenAI returned empty JD result, using rule-based fallback...")
            except Exception as e:
                print(f"OpenAI API failed: {e}, using rule-based fallback...")
        
        # Final fallback to rule-based
        print("Using rule-based JD fallback...")
        return self._rule_based_jd_parsing(jd_text)
    
    def _rule_based_skill_dna(self, resume_text: str) -> Dict[str, Dict[str, int]]:
        """Rule-based fallback for skill DNA extraction"""
        import re
        
        # Get known skills
        known_skills = self.dataset_loader._extract_skills_from_text(resume_text)
        skill_dna = {}
        text_lower = resume_text.lower()
        
        # Heuristics keywords for scores
        practical_keywords = ["built", "developed", "created", "implemented", "engineered", "designed"]
        real_world_keywords = ["production", "deployed", "scaled", "led", "managed", "users", "impact"]
        
        for skill in known_skills:
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
        
        # Ensure at least one skill is returned
        if not skill_dna:
            # Look for any skill-like patterns
            general_skill_pattern = r'\b(experience|expertise|skilled|proficient|knowledge|familiar)\s+in\s+([a-zA-Z\s]+?)(?:,|\.|and|or)'
            matches = re.findall(general_skill_pattern, text_lower, re.IGNORECASE)
            
            for match in matches:
                skill_name = match[1].strip().title()
                if len(skill_name) > 2 and len(skill_name) < 30:  # Reasonable skill name length
                    skill_dna[skill_name] = {
                        "conceptual": 70,
                        "practical": 60,
                        "real_world": 50
                    }
        
        print(f"Rule-based extracted {len(skill_dna)} skills: {list(skill_dna.keys())}")
        return skill_dna
    
    def _rule_based_jd_parsing(self, jd_text: str) -> Dict[str, str]:
        """Rule-based fallback for job description parsing"""
        import re
        
        # Common tech skills with their patterns
        tech_skills = {
            'JavaScript': r'\bjavascript\b|\bjs\b',
            'Python': r'\bpython\b',
            'React': r'\breact\b|\breactjs\b',
            'TypeScript': r'\btypescript\b|\bts\b',
            'Node.js': r'\bnode\.?js\b|\bnodejs\b',
            'HTML': r'\bhtml\b|\bhtml5\b',
            'CSS': r'\bcss\b|\bcss3\b|\bscss\b|\bsass\b',
            'Java': r'\bjava\b(?!script)',
            'C++': r'\bc\+\+\b',
            'C#': r'\bcsharp\b|\bc#\b',
            'PHP': r'\bphp\b',
            'SQL': r'\bsql\b',
            'AWS': r'\baws\b|\bamazon web services\b',
            'Docker': r'\bdocker\b',
            'Git': r'\bgit\b'
        }
        
        extracted = {}
        text_lower = jd_text.lower()
        
        # Find skills in the text
        for skill, pattern in tech_skills.items():
            if re.search(pattern, text_lower, re.IGNORECASE):
                # Determine importance based on context
                importance = "Medium"
                
                # Look at context around the skill
                matches = re.finditer(pattern, text_lower, re.IGNORECASE)
                for match in matches:
                    start = max(0, match.start() - 50)
                    end = min(len(text_lower), match.end() + 50)
                    context = text_lower[start:end]
                    
                    # High importance indicators
                    if any(kw in context for kw in ["must", "required", "expert", "strong", "advanced", "senior", "essential"]):
                        importance = "High"
                        break
                    # Medium importance indicators
                    elif any(kw in context for kw in ["preferred", "desired", "plus", "bonus", "ideal"]):
                        importance = "Medium"
                
                extracted[skill] = importance
        
        # If no tech skills found, try to extract from common patterns
        if not extracted:
            # Look for skill requirements
            skill_pattern = r'\b(experience|knowledge|skill|proficiency|expertise)\s+(?:in|with|of)\s+([a-zA-Z\s]+?)(?:,|\.|and|or)'
            matches = re.findall(skill_pattern, text_lower, re.IGNORECASE)
            
            for match in matches:
                skill_name = match[1].strip().title()
                if len(skill_name) > 2 and len(skill_name) < 30:  # Reasonable skill name length
                    extracted[skill_name] = "Medium"
        
        print(f"Rule-based extracted {len(extracted)} JD skills: {list(extracted.keys())}")
        return extracted
    
    def _openai_skill_dna(self, resume_text: str) -> Dict[str, Dict[str, int]]:
        """OpenAI API fallback for skill DNA extraction"""
        client = openai.OpenAI()
        prompt = f"""
        Analyze this resume and generate Skill DNA for each skill found.
        For each skill, return:
        - conceptual (0-100): theoretical understanding
        - practical (0-100): hands-on implementation ability  
        - real_world (0-100): actual project experience

        Resume:
        {resume_text}

        Rules:
        - Extract ONLY skills explicitly mentioned in the resume
        - Be specific and accurate - don't invent skills
        - Score based on experience level described
        - Return valid JSON only

        Output format example:
        {{"React": {{"conceptual": 85, "practical": 90, "real_world": 80}}, "Python": {{"conceptual": 70, "practical": 75, "real_world": 65}}}}
        """
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",  # Use available model
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3  # Lower temperature for consistency
            )
            content = response.choices[0].message.content.strip()
            
            # Clean up the response
            if content.startswith("```json"):
                content = content.replace("```json", "").replace("```", "")
            content = content.strip()
            
            result = json.loads(content)
            
            # Validate the result
            if isinstance(result, dict):
                # Ensure proper structure
                validated_result = {}
                for skill, scores in result.items():
                    if isinstance(scores, dict) and all(k in scores for k in ["conceptual", "practical", "real_world"]):
                        validated_result[skill] = scores
                
                print(f"OpenAI extracted {len(validated_result)} skills: {list(validated_result.keys())}")
                return validated_result
            else:
                raise ValueError("Invalid response format")
                
        except Exception as e:
            print(f"OpenAI API error in skill DNA: {e}")
            raise e
    
    def _openai_jd_parsing(self, jd_text: str) -> Dict[str, str]:
        """OpenAI API fallback for job description parsing"""
        client = openai.OpenAI()
        prompt = f"""
        Extract required skills with importance level (High/Medium/Low) from this job description.
        
        Job Description:
        {jd_text}
        
        Rules:
        - Extract ONLY skills explicitly mentioned or clearly required
        - Assign importance based on emphasis in the description
        - Use only: High, Medium, or Low
        - Be specific and accurate
        
        Output format example:
        {{"React": "High", "TypeScript": "High", "CSS": "Medium"}}
        """
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",  # Use available model
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3
            )
            content = response.choices[0].message.content.strip()
            
            # Clean up the response
            if content.startswith("```json"):
                content = content.replace("```json", "").replace("```", "")
            content = content.strip()
            
            result = json.loads(content)
            
            # Validate the result
            if isinstance(result, dict):
                # Ensure valid importance levels
                validated_result = {}
                for skill, importance in result.items():
                    if importance in ["High", "Medium", "Low"]:
                        validated_result[skill] = importance
                
                print(f"OpenAI extracted {len(validated_result)} JD skills: {list(validated_result.keys())}")
                return validated_result
            else:
                raise ValueError("Invalid response format")
                
        except Exception as e:
            print(f"OpenAI API error in JD parsing: {e}")
            raise e
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get information about the current AI engine status"""
        if self.is_initialized:
            return {
                "status": "custom_model",
                "model_info": self.custom_model.get_model_info(),
                "openai_available": self.openai_available
            }
        else:
            return {
                "status": "rule_based_fallback",
                "openai_available": self.openai_available,
                "message": "Using rule-based fallback (no trained model found)"
            }
    
    def train_new_model(self, resume_file: str = None, jd_file: str = None, use_sample_data: bool = True):
        """Train a new custom model"""
        from app.services.training_pipeline import TrainingPipeline
        
        print("Training new custom model...")
        pipeline = TrainingPipeline(model_dir=self.model_path)
        metadata = pipeline.train_model(resume_file, jd_file, use_sample_data)
        
        # Reload the newly trained model
        self._initialize()
        
        return metadata

# Global AI engine instance
ai_engine = AIEngine()
