import json
import pickle
import os
import numpy as np
from typing import Dict, List, Any, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import re
from pathlib import Path

class CustomSkillModel:
    """Custom ML model for skill extraction and analysis"""
    
    def __init__(self, model_path: str = "models/"):
        self.model_path = model_path
        self.skill_vectorizer = None
        self.importance_classifier = None
        self.dna_regressor = None
        self.known_skills = []
        self.is_trained = False
        
        # Create model directory if it doesn't exist
        os.makedirs(model_path, exist_ok=True)
    
    def prepare_training_data(self, resume_data: List[Dict], jd_data: List[Dict]) -> Tuple:
        """Prepare data for training"""
        texts = []
        skill_labels = []
        importance_labels = []
        dna_labels = []
        
        # Process resume data
        for item in resume_data:
            texts.append(item['text'])
            skill_labels.append(item['skills'])
            importance_labels.append({skill: "Medium" for skill in item['skills']})
            dna_labels.append(item['skill_dna'])
        
        # Process job description data
        for item in jd_data:
            texts.append(item['text'])
            skills = list(item['skills'].keys())
            skill_labels.append(skills)
            importance_labels.append(item['skills'])
            
            # Generate dummy DNA for JD data (not used for JD processing)
            dna_labels.append({})
        
        # Collect all unique skills
        all_skills = set()
        for skills in skill_labels:
            all_skills.update(skills)
        self.known_skills = sorted(list(all_skills))
        
        # Create binary skill presence matrix
        skill_matrix = []
        for skills in skill_labels:
            skill_vector = [1 if skill in skills else 0 for skill in self.known_skills]
            skill_matrix.append(skill_vector)
        
        # Create importance matrix (convert to numerical)
        importance_map = {"Low": 0, "Medium": 1, "High": 2}
        importance_matrix = []
        for importance_dict in importance_labels:
            importance_vector = []
            for skill in self.known_skills:
                importance_vector.append(importance_map.get(importance_dict.get(skill, "Medium"), 1))
            importance_matrix.append(importance_vector)
        
        # Create DNA matrix for resumes only
        dna_matrix = []
        for i, dna_dict in enumerate(dna_labels):
            if i < len(resume_data):  # Only for resumes
                dna_vector = []
                for skill in self.known_skills:
                    if skill in dna_dict:
                        dna_vector.extend([
                            dna_dict[skill]['conceptual'],
                            dna_dict[skill]['practical'],
                            dna_dict[skill]['real_world']
                        ])
                    else:
                        dna_vector.extend([0, 0, 0])
                dna_matrix.append(dna_vector)
            else:
                # Add dummy DNA for JD data
                dna_vector = [0] * (len(self.known_skills) * 3)
                dna_matrix.append(dna_vector)
        
        return texts, np.array(skill_matrix), np.array(importance_matrix), np.array(dna_matrix)
    
    def train(self, resume_data: List[Dict], jd_data: List[Dict], test_size: float = 0.2):
        """Train the custom model"""
        print("Preparing training data...")
        texts, skill_matrix, importance_matrix, dna_matrix = self.prepare_training_data(resume_data, jd_data)
        
        # Split data
        X_train, X_test, y_skill_train, y_skill_test = train_test_split(
            texts, skill_matrix, test_size=test_size, random_state=42
        )
        
        # Train TF-IDF vectorizer
        print("Training text vectorizer...")
        self.skill_vectorizer = TfidfVectorizer(
            max_features=5000,
            ngram_range=(1, 2),
            stop_words='english'
        )
        X_train_vec = self.skill_vectorizer.fit_transform(X_train)
        X_test_vec = self.skill_vectorizer.transform(X_test)
        
        # Train skill extraction classifier
        print("Training skill extraction model...")
        self.skill_classifier = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, random_state=42))
        self.skill_classifier.fit(X_train_vec, y_skill_train)
        
        # Train importance classifier
        print("Training importance prediction model...")
        self.importance_classifier = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, random_state=42))
        self.importance_classifier.fit(X_train_vec, importance_matrix[:len(y_skill_train)])
        
        # Train DNA regressor (for resumes only)
        resume_indices = [i for i, item in enumerate(resume_data + jd_data) if i < len(resume_data)]
        if resume_indices:
            X_resume_vec = X_train_vec[resume_indices]
            y_dna_train = dna_matrix[resume_indices]
            
            print("Training DNA prediction model...")
            self.dna_regressor = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, random_state=42))
            self.dna_regressor.fit(X_resume_vec, y_dna_train)
        
        # Evaluate models
        print("Evaluating models...")
        skill_pred = self.skill_classifier.predict(X_test_vec)
        skill_accuracy = accuracy_score(y_skill_test, skill_pred)
        print(f"Skill Extraction Accuracy: {skill_accuracy:.3f}")
        
        # Evaluate importance
        importance_pred = self.importance_classifier.predict(X_test_vec)
        importance_accuracy = accuracy_score(importance_matrix[:len(y_skill_test)], importance_pred)
        print(f"Importance Prediction Accuracy: {importance_accuracy:.3f}")
        
        self.is_trained = True
        print("Model training completed!")
        
        return {
            'skill_accuracy': skill_accuracy,
            'importance_accuracy': importance_accuracy
        }
    
    def extract_skills(self, text: str) -> List[str]:
        """Extract skills from text using trained model"""
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        # Vectorize text
        text_vec = self.skill_vectorizer.transform([text])
        
        # Predict skills
        skill_predictions = self.skill_classifier.predict(text_vec)[0]
        
        # Convert predictions to skill names
        extracted_skills = []
        for i, prediction in enumerate(skill_predictions):
            if prediction == 1:
                extracted_skills.append(self.known_skills[i])
        
        return extracted_skills
    
    def predict_importance(self, text: str, skills: List[str]) -> Dict[str, str]:
        """Predict importance levels for skills"""
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        # Vectorize text
        text_vec = self.skill_vectorizer.transform([text])
        
        # Predict importance
        importance_predictions = self.importance_classifier.predict(text_vec)[0]
        
        # Convert predictions to importance levels
        importance_map = {0: "Low", 1: "Medium", 2: "High"}
        skills_with_importance = {}
        
        for i, skill in enumerate(self.known_skills):
            if skill in skills:
                importance_level = importance_map.get(importance_predictions[i], "Medium")
                skills_with_importance[skill] = importance_level
        
        return skills_with_importance
    
    def predict_skill_dna(self, text: str, skills: List[str]) -> Dict[str, Dict[str, int]]:
        """Predict skill DNA scores"""
        if not self.is_trained or self.dna_regressor is None:
            # Fallback to rule-based approach
            return self._rule_based_dna_extraction(text, skills)
        
        # Vectorize text
        text_vec = self.skill_vectorizer.transform([text])
        
        # Predict DNA
        dna_predictions = self.dna_regressor.predict(text_vec)[0]
        
        # Convert predictions to DNA format
        skill_dna = {}
        for i, skill in enumerate(self.known_skills):
            if skill in skills:
                start_idx = i * 3
                conceptual = int(dna_predictions[start_idx])
                practical = int(dna_predictions[start_idx + 1])
                real_world = int(dna_predictions[start_idx + 2])
                
                # Ensure values are within 0-100 range
                conceptual = max(0, min(100, conceptual))
                practical = max(0, min(100, practical))
                real_world = max(0, min(100, real_world))
                
                skill_dna[skill] = {
                    "conceptual": conceptual,
                    "practical": practical,
                    "real_world": real_world
                }
        
        return skill_dna
    
    def _rule_based_dna_extraction(self, text: str, skills: List[str]) -> Dict[str, Dict[str, int]]:
        """Fallback rule-based DNA extraction"""
        skill_dna = {}
        text_lower = text.lower()
        
        practical_keywords = ["built", "developed", "created", "implemented", "engineered", "designed"]
        real_world_keywords = ["production", "deployed", "scaled", "led", "managed", "users", "impact"]
        
        for skill in skills:
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            matches = list(re.finditer(pattern, text_lower))
            
            if matches:
                conceptual = 60
                practical = 40
                real_world = 30
                
                conceptual = min(100, conceptual + len(matches) * 5)
                
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
    
    def save_model(self):
        """Save trained model to disk"""
        if not self.is_trained:
            raise ValueError("No trained model to save")
        
        model_data = {
            'skill_vectorizer': self.skill_vectorizer,
            'skill_classifier': self.skill_classifier,
            'importance_classifier': self.importance_classifier,
            'dna_regressor': self.dna_regressor,
            'known_skills': self.known_skills,
            'is_trained': self.is_trained
        }
        
        with open(os.path.join(self.model_path, 'skill_model.pkl'), 'wb') as f:
            pickle.dump(model_data, f)
        
        print(f"Model saved to {self.model_path}")
    
    def load_model(self):
        """Load trained model from disk"""
        model_file = os.path.join(self.model_path, 'skill_model.pkl')
        
        if not os.path.exists(model_file):
            raise FileNotFoundError(f"No trained model found at {model_file}")
        
        with open(model_file, 'rb') as f:
            model_data = pickle.load(f)
        
        self.skill_vectorizer = model_data['skill_vectorizer']
        self.skill_classifier = model_data['skill_classifier']
        self.importance_classifier = model_data['importance_classifier']
        self.dna_regressor = model_data.get('dna_regressor')
        self.known_skills = model_data['known_skills']
        self.is_trained = model_data['is_trained']
        
        print("Model loaded successfully")
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get information about the trained model"""
        if not self.is_trained:
            return {"status": "not_trained"}
        
        return {
            "status": "trained",
            "known_skills_count": len(self.known_skills),
            "known_skills": self.known_skills[:20],  # Show first 20 skills
            "model_path": self.model_path
        }
