import os
import json
from typing import List, Dict, Any
from pathlib import Path
from app.services.dataset_loader import DatasetLoader
from app.services.custom_model import CustomSkillModel

class TrainingPipeline:
    """Complete training pipeline for custom skill extraction model"""
    
    def __init__(self, data_dir: str = "data/", model_dir: str = "models/"):
        self.data_dir = data_dir
        self.model_dir = model_dir
        self.dataset_loader = DatasetLoader(data_dir)
        self.model = CustomSkillModel(model_dir)
        
        # Create directories
        os.makedirs(data_dir, exist_ok=True)
        os.makedirs(model_dir, exist_ok=True)
    
    def prepare_sample_data(self) -> tuple:
        """Create sample training data if no dataset is provided"""
        sample_resumes = [
            {
                "text": "John Smith - Senior Python Developer with 5 years of experience. Developed REST APIs using Django and Flask. Built scalable web applications and deployed them on AWS. Experience with PostgreSQL databases and Redis caching.",
                "skills": ["Python", "Django", "Flask", "REST API", "AWS", "PostgreSQL", "Redis"],
                "skill_dna": {
                    "Python": {"conceptual": 90, "practical": 85, "real_world": 80},
                    "Django": {"conceptual": 85, "practical": 80, "real_world": 75},
                    "Flask": {"conceptual": 80, "practical": 75, "real_world": 70},
                    "REST API": {"conceptual": 85, "practical": 90, "real_world": 85},
                    "AWS": {"conceptual": 75, "practical": 70, "real_world": 65},
                    "PostgreSQL": {"conceptual": 80, "practical": 85, "real_world": 80},
                    "Redis": {"conceptual": 70, "practical": 65, "real_world": 60}
                },
                "type": "resume"
            },
            {
                "text": "Sarah Johnson - Full Stack Developer specializing in React and Node.js. Created responsive user interfaces with TypeScript and Next.js. Implemented microservices architecture using Docker and Kubernetes. Experience with MongoDB and GraphQL APIs.",
                "skills": ["React", "Node.js", "TypeScript", "Next.js", "Docker", "Kubernetes", "MongoDB", "GraphQL"],
                "skill_dna": {
                    "React": {"conceptual": 90, "practical": 85, "real_world": 80},
                    "Node.js": {"conceptual": 85, "practical": 80, "real_world": 75},
                    "TypeScript": {"conceptual": 80, "practical": 75, "real_world": 70},
                    "Next.js": {"conceptual": 85, "practical": 80, "real_world": 75},
                    "Docker": {"conceptual": 75, "practical": 70, "real_world": 65},
                    "Kubernetes": {"conceptual": 70, "practical": 65, "real_world": 60},
                    "MongoDB": {"conceptual": 80, "practical": 75, "real_world": 70},
                    "GraphQL": {"conceptual": 75, "practical": 70, "real_world": 65}
                },
                "type": "resume"
            },
            {
                "text": "Mike Chen - Data Scientist with expertise in Machine Learning and Deep Learning. Developed predictive models using TensorFlow and PyTorch. Experience with data analysis using Pandas and NumPy. Built data pipelines with Apache Spark.",
                "skills": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Apache Spark"],
                "skill_dna": {
                    "Machine Learning": {"conceptual": 90, "practical": 85, "real_world": 80},
                    "Deep Learning": {"conceptual": 85, "practical": 80, "real_world": 75},
                    "TensorFlow": {"conceptual": 80, "practical": 75, "real_world": 70},
                    "PyTorch": {"conceptual": 75, "practical": 70, "real_world": 65},
                    "Pandas": {"conceptual": 85, "practical": 90, "real_world": 85},
                    "NumPy": {"conceptual": 80, "practical": 85, "real_world": 80},
                    "Apache Spark": {"conceptual": 70, "practical": 65, "real_world": 60}
                },
                "type": "resume"
            }
        ]
        
        sample_jds = [
            {
                "text": "Senior Python Developer - We are looking for an experienced Python developer with strong expertise in Django and Flask. Must have experience building REST APIs and working with PostgreSQL databases. AWS deployment experience is required.",
                "skills": {
                    "Python": "High",
                    "Django": "High", 
                    "Flask": "Medium",
                    "REST API": "High",
                    "PostgreSQL": "High",
                    "AWS": "Required"
                },
                "type": "job_description"
            },
            {
                "text": "Full Stack React Developer - Seeking a developer skilled in React, Node.js, and TypeScript. Experience with Next.js is preferred. Knowledge of Docker and microservices architecture is a plus. MongoDB and GraphQL experience desired.",
                "skills": {
                    "React": "High",
                    "Node.js": "High",
                    "TypeScript": "High",
                    "Next.js": "Medium",
                    "Docker": "Medium",
                    "MongoDB": "Medium",
                    "GraphQL": "Low"
                },
                "type": "job_description"
            },
            {
                "text": "Data Scientist Position - Looking for a candidate with strong Machine Learning and Deep Learning background. Must have experience with TensorFlow or PyTorch. Proficiency in Pandas and NumPy is required. Apache Spark experience is a bonus.",
                "skills": {
                    "Machine Learning": "High",
                    "Deep Learning": "High",
                    "TensorFlow": "Medium",
                    "PyTorch": "Medium",
                    "Pandas": "Required",
                    "NumPy": "Required",
                    "Apache Spark": "Low"
                },
                "type": "job_description"
            }
        ]
        
        return sample_resumes, sample_jds
    
    def train_model_direct(self, resume_data: List[Dict], jd_data: List[Dict], test_size: float = 0.2):
        """Train model directly with provided data"""
        print("Training model with provided data...")
        
        if not resume_data and not jd_data:
            raise ValueError("No training data provided")
        
        print(f"Training with {len(resume_data)} resumes and {len(jd_data)} job descriptions")
        
        # Train model
        training_results = self.model.train(resume_data, jd_data, test_size)
        
        # Save model
        self.model.save_model()
        
        # Save training metadata
        metadata = {
            "training_data_size": {
                "resumes": len(resume_data),
                "job_descriptions": len(jd_data)
            },
            "model_performance": training_results,
            "known_skills": self.model.known_skills
        }
        
        with open(os.path.join(self.model_dir, "training_metadata.json"), "w") as f:
            json.dump(metadata, f, indent=2)
        
        print("Training completed successfully!")
        return metadata
    
    def train_model(self, resume_file: str = None, jd_file: str = None, use_sample_data: bool = True):
        """Train the custom model"""
        print("Starting model training pipeline...")
        
        # Load data
        if use_sample_data or (not resume_file and not jd_file):
            print("Using sample training data...")
            resume_data, jd_data = self.prepare_sample_data()
        else:
            print("Loading data from files...")
            resume_data, jd_data = self.dataset_loader.create_training_data(resume_file, jd_file)
        
        if not resume_data and not jd_data:
            raise ValueError("No training data available. Please provide dataset files or use sample data.")
        
        print(f"Loaded {len(resume_data)} resumes and {len(jd_data)} job descriptions")
        
        # Train model
        training_results = self.model.train(resume_data, jd_data)
        
        # Save model
        self.model.save_model()
        
        # Save training metadata
        metadata = {
            "training_data_size": {
                "resumes": len(resume_data),
                "job_descriptions": len(jd_data)
            },
            "model_performance": training_results,
            "known_skills": self.model.known_skills
        }
        
        with open(os.path.join(self.model_dir, "training_metadata.json"), "w") as f:
            json.dump(metadata, f, indent=2)
        
        print("Training pipeline completed successfully!")
        return metadata
    
    def load_trained_model(self):
        """Load a previously trained model"""
        try:
            self.model.load_model()
            
            # Load metadata
            metadata_file = os.path.join(self.model_dir, "training_metadata.json")
            if os.path.exists(metadata_file):
                with open(metadata_file, "r") as f:
                    metadata = json.load(f)
                print(f"Loaded model with {len(metadata.get('known_skills', []))} known skills")
                return metadata
            else:
                print("Model loaded but no metadata found")
                return None
        except FileNotFoundError:
            print("No trained model found. Please train the model first.")
            return None
    
    def test_model(self, test_text: str = None):
        """Test the trained model with sample input"""
        if not self.model.is_trained:
            print("Model is not trained. Please train or load a model first.")
            return None
        
        if test_text is None:
            test_text = """
            Senior Software Engineer with 5+ years of experience in Python development. 
            Expert in Django and Flask frameworks. Built REST APIs and microservices. 
            Deployed applications on AWS and Docker. Experience with PostgreSQL and Redis databases.
            """
        
        print("Testing model with sample text...")
        print(f"Input text: {test_text[:100]}...")
        
        # Test skill extraction
        skills = self.model.extract_skills(test_text)
        print(f"Extracted skills: {skills}")
        
        # Test importance prediction
        importance = self.model.predict_importance(test_text, skills)
        print(f"Predicted importance: {importance}")
        
        # Test DNA prediction
        dna = self.model.predict_skill_dna(test_text, skills)
        print(f"Predicted skill DNA: {dna}")
        
        return {
            "skills": skills,
            "importance": importance,
            "dna": dna
        }
    
    def get_model_status(self):
        """Get current model status"""
        if self.model.is_trained:
            return self.model.get_model_info()
        else:
            return {"status": "not_trained", "message": "Model needs to be trained first"}

# Convenience function for quick training
def quick_train(data_dir: str = "data/", model_dir: str = "models/"):
    """Quick training function"""
    pipeline = TrainingPipeline(data_dir, model_dir)
    return pipeline.train_model(use_sample_data=True)

# Convenience function for loading and testing
def quick_test(model_dir: str = "models/"):
    """Quick test function"""
    pipeline = TrainingPipeline(model_dir=model_dir)
    pipeline.load_trained_model()
    return pipeline.test_model()
