#!/usr/bin/env python3
"""
Quick script to train the custom model
Run this script to train the model with sample data or your own dataset
"""

from app.services.training_pipeline import TrainingPipeline
import argparse

def main():
    parser = argparse.ArgumentParser(description='Train custom skill extraction model')
    parser.add_argument('--resume-file', type=str, help='Path to resume dataset (CSV or JSON)')
    parser.add_argument('--jd-file', type=str, help='Path to job description dataset (CSV or JSON)')
    parser.add_argument('--no-sample', action='store_true', help='Don\'t use sample data')
    parser.add_argument('--data-dir', type=str, default='data/', help='Data directory')
    parser.add_argument('--model-dir', type=str, default='models/', help='Model directory')
    
    args = parser.parse_args()
    
    # Create training pipeline
    pipeline = TrainingPipeline(data_dir=args.data_dir, model_dir=args.model_dir)
    
    # Train model
    use_sample = not args.no_sample
    metadata = pipeline.train_model(
        resume_file=args.resume_file,
        jd_file=args.jd_file,
        use_sample_data=use_sample
    )
    
    print("\n" + "="*50)
    print("TRAINING COMPLETED!")
    print("="*50)
    print(f"Model trained with {metadata['training_data_size']['resumes']} resumes")
    print(f"Model trained with {metadata['training_data_size']['job_descriptions']} job descriptions")
    print(f"Skill extraction accuracy: {metadata['model_performance']['skill_accuracy']:.3f}")
    print(f"Importance prediction accuracy: {metadata['model_performance']['importance_accuracy']:.3f}")
    print(f"Total known skills: {len(metadata['known_skills'])}")
    print(f"Model saved to: {args.model_dir}")
    print("="*50)
    
    # Test the model
    print("\nTesting trained model...")
    test_results = pipeline.test_model()
    
    if test_results:
        print("Model test successful!")
        print(f"Extracted skills: {test_results['skills']}")
        print(f"Importance levels: {test_results['importance']}")
        print(f"Skill DNA sample: {list(test_results['dna'].items())[:2]}")

if __name__ == "__main__":
    main()
