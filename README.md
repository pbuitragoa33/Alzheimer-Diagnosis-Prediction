# Alzheimer's Disease Diagnosis Prediction

This project aims to build a Machine Learning model to predict Alzheimer's disease diagnosis. The model is trained using a comprehensive dataset containing various demographic, health, and lifestyle factors.

## Project Goals

- Predict Alzheimer's disease diagnosis.
- Utilize a dataset with demographic, health, and lifestyle information.
- Perform extensive data preprocessing, including handling missing values, encoding categorical features, and scaling numerical data.
- Implement and tune multiple machine learning models for classification.
- Evaluate model performance using standard classification metrics.
- Deploy the best performing model through an interactive full-stack web application.

## Data Sources

The data for this project comes from an AlzheimerData.csv file. The dataset includes features such as:

- **Demographic Information**: Country, Age, Gender, Education Level, Marital Status, Employment Status, Urban/Rural residency, Income Level.
- **Health Metrics**: BMI, Cognitive Test Score, Cholesterol Level, Diabetes, Hypertension, Alzheimer in Family, Genetic Risk.
- **Lifestyle Factors**: Physical Activity Level, Smoking Status, Alcohol Consumption, Depression Level, Sleep Quality, Dietary Habits, Air Pollution Exposure, Social Engagement Level, Stress Levels.
- **Target Variable**: Alzheimer Diagnosis.

## Approach

1. **Data Preprocessing**:
   - Import and initial inspection of the dataset.
   - Correction of data types for categorical features.
   - Handling of missing values through imputation (median for numerical, mode for categorical).
   - One-Hot Encoding for multi-category nominal features.
   - Binary Encoding for binary categorical features.
   - Scaling of numerical features.
   - Label encoding for the target variable AlzheimerDiagnosis.
   - Saving of preprocessed datasets and processing objects.

2. **Modeling**:
   - Loading of preprocessed training and testing data.
   - Hyperparameter tuning using Optuna for various classification models, including:
     - Multi-Layer Perceptron
     - K-Nearest Neighbors
     - Support Vector Machine (SVM)
     - Decision Tree
     - Random Forest
     - Gradient Boosting
     - XGBoost
     - LightGBM

3. **Model Evaluation**:
   - Assessment of model accuracy and reliability using metrics such as:
     - Classification Report
     - Confusion Matrix
     - AUC-ROC Curve
   - Saving the best performing model.

## Deployment

A full-stack web application was developed to make the prediction model accessible via a user-friendly interface.

1. **Architecture**:
   - **Backend**: FastAPI providing RESTful endpoints
   - **Frontend**: React for interactive UI
   - **ML Model**: Trained LightGBM classifier with preprocessing pipeline
   - **Deployment Mode**: Localhost (development), production-ready with minor adjustments

2. **Key Functionalities**:
   - Real-time prediction endpoint `/predict`
   - Client-side and server-side validation
   - Confidence score and contributing risk factors
   - Visual feedback through risk level indicators

3. **Deployment Instructions**:
   - Backend: Run with `uvicorn main:app` after placing the model and preprocessor files in `models/`
   - Frontend: Start with `npm start` after installing dependencies
   - Backend runs on `http://localhost:8000`, frontend on `http://localhost:3000`

4. **Requirements for Deployment**:
   - Python 3.8+, Node.js 14+
   - `LightGBM_model.joblib` and `the_preprocessor.joblib` files
   - Backend libraries: FastAPI, scikit-learn, LightGBM, joblib, pandas, numpy
   - Frontend libraries: React, lucide-react

5. **Security and Production Considerations**:
   - Input validation on both client and server
   - CORS configured for development
   - HTTPS recommended for deployment
   - No user data stored or transmitted externally

## Requirements

The project requires the following Python libraries:

- pandas  
- numpy  
- matplotlib.pyplot  
- optuna  
- scikit-learn  
- lightgbm  
- joblib  
- fastapi  
- uvicorn  
- pydantic  
- python-multipart  

---

**Version**: 1.0.0  
**Last Updated**: June 2025  
**Deployment Stack**: FastAPI + React + LightGBM  
**Disclaimer**: For research and educational purposes only. Not intended for clinical use.



