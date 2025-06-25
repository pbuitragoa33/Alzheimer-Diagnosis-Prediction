from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from typing import Optional
import os


app = FastAPI(
    title = "Alzheimer Predictor API",
    description = "API para predicción de Alzheimer usando LightGBM",
    version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000", "http://127.0.0.1:3000"],  
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


MODEL_PATH = "models/LightGBM_model.joblib"
PREPROCESSOR_PATH = "models/the_preprocessor.joblib"

try:
    model = joblib.load(MODEL_PATH)
    preprocessor = joblib.load(PREPROCESSOR_PATH)
    print("Modelo y preprocessor cargados exitosamente")
except Exception as e:
    print(f"Error cargando archivos: {e}")
    model = None
    preprocessor = None


class PatientData(BaseModel):
    Country: str = "USA"
    Age: float = 65.0
    Gender: str = "Male"
    EducationLevel: float = 12.0
    BMI: float = 25.0
    PhysicalActivityLevel: str = "Medium"
    SmokingStatus: str = "Never"
    AlcoholConsumption: str = "Occasionally"
    Diabetes: str = "No"
    Hypertension: str = "No"
    CholesterolLevel: str = "Normal"
    AlzheimerInFamily: str = "No"
    CognitiveTestScore: float = 70.0
    DepressionLevel: str = "Low"
    SleepQuality: str = "Good"
    DietaryHabits: str = "Healthy"
    AirPollutionExposure: str = "Low"
    EmploymentStatus: str = "Employed"
    MaritalStatus: str = "Married"
    GeneticRisk: str = "No"
    SocialEngagementLevel: str = "High"
    IncomeLevel: str = "Medium"
    StressLevels: str = "Low"
    UrbanRural: str = "Urban"


class PredictionResponse(BaseModel):
    prediction: str
    confidence: Optional[float] = None
    risk_factors: list = []
    message: str

@app.get("/")
def read_root():
    return {
        "message": "Alzheimer Predictor API",
        "status": "active",
        "model_loaded": model is not None,
        "preprocessor_loaded": preprocessor is not None
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_status": "loaded" if model is not None else "not_loaded",
        "preprocessor_status": "loaded" if preprocessor is not None else "not_loaded"
    }

def identify_risk_factors(data: dict) -> list:
    """Identifica factores de riesgo basados en los datos del paciente"""
    risk_factors = []
    
    if data.get('Age', 0) > 75:
        risk_factors.append("Edad avanzada (>75 años)")
    
    if data.get('AlzheimerInFamily') == 'Yes':
        risk_factors.append("Historial familiar de Alzheimer")
    
    if data.get('GeneticRisk') == 'Yes':
        risk_factors.append("Riesgo genético elevado")
    
    if data.get('CognitiveTestScore', 100) < 50:
        risk_factors.append("Puntuación baja en test cognitivo")
    
    if data.get('DepressionLevel') == 'High':
        risk_factors.append("Nivel alto de depresión")
    
    if data.get('PhysicalActivityLevel') == 'Low':
        risk_factors.append("Baja actividad física")
    
    if data.get('SmokingStatus') == 'Current':
        risk_factors.append("Fumador actual")
    
    if data.get('Diabetes') == 'Yes':
        risk_factors.append("Diabetes")
    
    if data.get('Hypertension') == 'Yes':
        risk_factors.append("Hipertensión")
    
    if data.get('CholesterolLevel') == 'High':
        risk_factors.append("Colesterol alto")
    
    if data.get('SleepQuality') == 'Poor':
        risk_factors.append("Mala calidad del sueño")
    
    if data.get('DietaryHabits') == 'Unhealthy':
        risk_factors.append("Hábitos alimentarios poco saludables")
    
    if data.get('AirPollutionExposure') == 'High':
        risk_factors.append("Alta exposición a contaminación")
    
    if data.get('StressLevels') == 'High':
        risk_factors.append("Altos niveles de estrés")
    
    if data.get('SocialEngagementLevel') == 'Low':
        risk_factors.append("Bajo compromiso social")
    
    return risk_factors

@app.post("/predict", response_model=PredictionResponse)
def predict_alzheimer(patient_data: PatientData):
    """Endpoint principal para realizar predicciones"""
    
    if model is None or preprocessor is None:
        raise HTTPException(
            status_code = 500, 
            detail = "Modelo o preprocessor no están cargados. Verifica los archivos .joblib"
        )
    
    try:
        input_data = patient_data.dict()
        df = pd.DataFrame([input_data])
        
        processed_data = preprocessor.transform(df)
        
        prediction = model.predict(processed_data)[0]
        
        prediction_str = "Yes" if prediction == 1 else "No"
        
        confidence = None
        try:
            if hasattr(model, 'predict_proba'):
                probabilities = model.predict_proba(processed_data)[0]
                confidence = float(max(probabilities))
        except Exception as e:
            print(f"No se pudo obtener probabilidades: {e}")
        
        risk_factors = identify_risk_factors(input_data)
        
        if prediction_str == "Yes":
            message = f"El modelo sugiere un riesgo elevado de Alzheimer. Se recomienda consultar con un especialista para una evaluación más detallada. Factores de riesgo identificados: {len(risk_factors)}"
        else:
            message = f"El modelo indica un bajo riesgo de Alzheimer basado en los factores analizados. Factores de riesgo identificados: {len(risk_factors)}"
        
        return PredictionResponse(
            prediction = prediction_str,
            confidence = confidence,
            risk_factors = risk_factors,
            message = message
        )
        
    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail = f"Error durante la predicción: {str(e)}"
        )

@app.get("/model-info")
def get_model_info():
    """Información sobre el modelo cargado"""
    if model is None:
        return {"error": "Modelo no cargado"}
    
    info = {
        "model_type": str(type(model).__name__),
        "model_loaded": True,
        "preprocessor_loaded": preprocessor is not None
    }

    try:
        if hasattr(model, 'n_features_'):
            info["n_features"] = model.n_features_
        if hasattr(model, 'classes_'):
            info["classes"] = model.classes_.tolist()
    except:
        pass
    
    return info

@app.post("/validate")
def validate_input(patient_data: PatientData):
    """Valida que los datos de entrada estén en el rango correcto"""
    
    errors = []
    data = patient_data.dict()
    
    if not (50 <= data['Age'] <= 94):
        errors.append("Age debe estar entre 50 y 94")
    
    if not (0 <= data['EducationLevel'] <= 19):
        errors.append("EducationLevel debe estar entre 0 y 19")
    
    if not (18.5 <= data['BMI'] <= 35.0):
        errors.append("BMI debe estar entre 18.5 y 35.0")
    
    if not (30 <= data['CognitiveTestScore'] <= 99):
        errors.append("CognitiveTestScore debe estar entre 30 y 99")
    
    if errors:
        return {"valid": False, "errors": errors}
    else:
        return {"valid": True, "message": "Datos válidos"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)