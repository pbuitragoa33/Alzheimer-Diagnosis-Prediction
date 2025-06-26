# Alzheimer Risk Predictor - Deployment

This project provides a comprehensive Machine Learning solution for predicting Alzheimer's disease risk, featuring a FastAPI backend and React frontend with an intuitive user interface for healthcare assessment.

## Project Overview

The Alzheimer Risk Predictor is a full-stack web application that uses a trained LightGBM model to assess the probability of Alzheimer's disease based on 24 demographic, health, lifestyle, and genetic factors. The application provides real-time predictions with confidence scores and identifies key risk factors.

## Architecture

- **Backend**: FastAPI with RESTful API endpoints
- **Frontend**: React with modern UI/UX design
- **ML Model**: LightGBM classifier with preprocessing pipeline
- **Data Processing**: Scikit-learn column transformer pipeline (imputation, encoding, scaling)

## Features

### Backend API
- **Prediction Endpoint**: Real-time Alzheimer risk assessment
- **Health Check**: API statu
- **Input Validation**: Data range and format validation
- **Risk Factor Analysis**: Automated identification of contributing factors

### Frontend Interface
- **Interactive Form**: 24 input fields with sliders and dropdowns
- **Real-time Validation**: Client-side input validation
- **Risk Visualization**: Results with confidence scores
- **Risk Factor Display**: Detailed breakdown of identified risk factors

## Input Variables

The model analyzes 24 key factors:

### Demographic Information
- **Country**: 20 supported countries (Spain, Argentina, South Africa, China, Sweden, etc.)
- **Age**: 50-94 years
- **Gender**: Male/Female
- **Education Level**: 0-19 years

### Health Metrics
- **BMI**: 18.5-35.0
- **Cognitive Test Score**: 30-99 points
- **Physical Activity Level**: Low/Medium/High
- **Diabetes**: Yes/No
- **Hypertension**: Yes/No
- **Cholesterol Level**: Normal/High

### Lifestyle Factors
- **Smoking Status**: Never/Former/Current
- **Alcohol Consumption**: Never/Occasionally/Regularly
- **Dietary Habits**: Healthy/Average/Unhealthy
- **Sleep Quality**: Poor/Average/Good

### Mental & Social Factors
- **Depression Level**: Low/Medium/High
- **Stress Levels**: Low/Medium/High
- **Social Engagement**: Low/Medium/High
- **Marital Status**: Single/Married/Widowed

### Environmental & Genetic
- **Air Pollution Exposure**: Low/Medium/High
- **Urban/Rural**: Living environment
- **Alzheimer in Family**: Family history
- **Genetic Risk**: Genetic predisposition

### Socioeconomic
- **Employment Status**: Employed/Unemployed/Retired
- **Income Level**: Low/Medium/High

## Prerequisites

### Backend Requirements
- Python 3.8+
- pip package manager

### Frontend Requirements
- Node.js 14+
- npm or yarn

### Important Disclaimer: The sliders (used for numerical variables in deployment) has the range of the variable between itself, ex:  minAge(slider)maxAge ----> 50(when you move the bottom only change this value)94

### Required Files
- `models/LightGBM_model.joblib`: Trained LightGBM model
- `models/the_preprocessor.joblib`: Preprocessing pipeline

## Installation & Setup

### 1. Clone Repository
```bash
git clone <https://github.com/pbuitragoa33/Alzheimer-Diagnosis-Prediction.git>
cd alzheimer-predictor
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Ensure model files are in place
# backend/models/LightGBM_model.joblib
# backend/models/the_preprocessor.joblib
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install required packages
npm install lucide-react
```

## Running the Application

### 1. Start Backend Server
```bash
cd backend
python main.py
```
The API will be available at: `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### 2. Start Frontend Development Server
```bash
cd frontend
npm start
```
The web application will be available at: `http://localhost:3000`

## API Endpoints

### Core Endpoints
- `GET /`: API status and health check
- `POST /predict`: Main prediction endpoint
- `GET /health`: Detailed health status
- `GET /model-info`: Model information and metadata
- `POST /validate`: Input validation endpoint

### Example API Usage
```javascript
// Prediction request
const response = await fetch('http://localhost:8000/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    Country: 'USA',
    Age: 65,
    Gender: 'Male',
    EducationLevel: 12,
    BMI: 25,
    // ... other 19 parameters
  })
});

const result = await response.json();
// Returns: prediction, confidence, risk_factors, message
```


## Dependencies

### Backend (requirements.txt)
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
pandas==2.1.3
numpy==1.25.2
scikit-learn==1.3.2
lightgbm==4.1.0
joblib==1.3.2
pydantic==2.5.0
python-multipart==0.0.6
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.x",
    "lucide-react": "^0.x"
  }
}
```

## Model Information

- **Algorithm**: LightGBM Classifier
- **Features**: 24 input variables
- **Target**: Binary classification (Alzheimer: Yes/No)
- **Preprocessing**: Comprehensive pipeline including imputation, encoding, and scaling
- **Performance**: Optimized through hyperparameter tuning with Optuna


## Deployment Considerations

### Production Deployment
1. **Environment Variables**: Configure for production URLs
2. **HTTPS**: Enable SSL certificates
3. **Database**: Consider adding user session management
4. **Monitoring**: Implement logging and monitoring
5. **Scaling**: Use proper ASGI servers like Gunicorn + Uvicorn



### Health Checks
- Backend health: `http://localhost:8000/health`
- Model status: `http://localhost:8000/model-info`

## Medical Disclaimer

⚠️ **Important**: This application is for educational and research purposes only. The predictions should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

---

**Version**: 1.0.0  
**Last Updated**: June 2025  
**Technology Stack in a nutshell**: FastAPI + React + LightGBM


