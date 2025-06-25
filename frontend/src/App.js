import React, { useState } from 'react';
import { AlertTriangle, Brain, Heart, Activity, User, MapPin, GraduationCap, Scale, Cigarette, Wine, Utensils, Moon, Briefcase, Users, DollarSign, Zap, TreePine } from 'lucide-react';

const AlzheimerPredictor = () => {
  const [formData, setFormData] = useState({
    Country: 'USA',
    Age: 65,
    Gender: 'Male',
    EducationLevel: 12,
    BMI: 25.0,
    PhysicalActivityLevel: 'Medium',
    SmokingStatus: 'Never',
    AlcoholConsumption: 'Occasionally',
    Diabetes: 'No',
    Hypertension: 'No',
    CholesterolLevel: 'Normal',
    AlzheimerInFamily: 'No',
    CognitiveTestScore: 70,
    DepressionLevel: 'Low',
    SleepQuality: 'Good',
    DietaryHabits: 'Healthy',
    AirPollutionExposure: 'Low',
    EmploymentStatus: 'Employed',
    MaritalStatus: 'Married',
    GeneticRisk: 'No',
    SocialEngagementLevel: 'High',
    IncomeLevel: 'Medium',
    StressLevels: 'Low',
    UrbanRural: 'Urban'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const countries = ['Spain', 'Argentina', 'South Africa', 'China', 'Sweden', 'South Korea', 'Germany', 'UK', 'Canada', 'India', 'Italy', 'USA', 'Russia', 'Japan', 'France', 'Norway', 'Saudi Arabia', 'Mexico', 'Australia', 'Brazil'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Error: ${err.message}. Asegúrate de que el backend esté ejecutándose en http://localhost:8000`);
    } finally {
      setLoading(false);
    }
  };

  const renderSlider = (field, label, min, max, step, icon) => {
    const currentValue = formData[field];
    const displayValue = step < 1 ? parseFloat(currentValue).toFixed(1) : Math.round(currentValue);
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <label className="text-sm font-semibold text-gray-700">{label}</label>
        </div>
        <div className="space-y-3">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={(e) => handleInputChange(field, parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{min}</span>
            <span className="text-lg font-bold text-blue-600 mx-4">{displayValue}</span>
            <span className="text-xs text-gray-500">{max}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSelect = (field, label, options, icon) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      </div>
      <select
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Predictor de Riesgo de Alzheimer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Evaluación de riesgo basada en inteligencia artificial. Complete los campos para obtener una estimación personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Demographic Info */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Demográfica
                </h3>
              </div>
              
              {renderSelect('Country', 'País', countries, <MapPin className="w-5 h-5 text-blue-500" />)}
              {renderSlider('Age', 'Edad', 50, 94, 1, <User className="w-5 h-5 text-green-500" />)}
              {renderSelect('Gender', 'Género', ['Male', 'Female'], <User className="w-5 h-5 text-purple-500" />)}
              {renderSlider('EducationLevel', 'Nivel Educativo (años)', 0, 19, 1, <GraduationCap className="w-5 h-5 text-orange-500" />)}

              {/* Health Metrics */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Métricas de Salud
                </h3>
              </div>

              {renderSlider('BMI', 'IMC (Índice de Masa Corporal)', 18.5, 35.0, 0.1, <Scale className="w-5 h-5 text-red-500" />)}
              {renderSlider('CognitiveTestScore', 'Puntuación Test Cognitivo', 30, 99, 1, <Brain className="w-5 h-5 text-indigo-500" />)}
              {renderSelect('PhysicalActivityLevel', 'Nivel de Actividad Física', ['Low', 'Medium', 'High'], <Activity className="w-5 h-5 text-green-500" />)}
              {renderSelect('Diabetes', 'Diabetes', ['No', 'Yes'], <Heart className="w-5 h-5 text-red-500" />)}
              {renderSelect('Hypertension', 'Hipertensión', ['No', 'Yes'], <Heart className="w-5 h-5 text-red-500" />)}
              {renderSelect('CholesterolLevel', 'Nivel de Colesterol', ['Normal', 'High'], <Heart className="w-5 h-5 text-red-500" />)}

              {/* Lifestyle */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Estilo de Vida
                </h3>
              </div>

              {renderSelect('SmokingStatus', 'Estado de Fumador', ['Never', 'Former', 'Current'], <Cigarette className="w-5 h-5 text-gray-500" />)}
              {renderSelect('AlcoholConsumption', 'Consumo de Alcohol', ['Never', 'Occasionally', 'Regularly'], <Wine className="w-5 h-5 text-purple-500" />)}
              {renderSelect('DietaryHabits', 'Hábitos Alimentarios', ['Healthy', 'Average', 'Unhealthy'], <Utensils className="w-5 h-5 text-green-500" />)}
              {renderSelect('SleepQuality', 'Calidad del Sueño', ['Poor', 'Average', 'Good'], <Moon className="w-5 h-5 text-blue-500" />)}

              {/* Mental & Social */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Factores Mentales y Sociales
                </h3>
              </div>

              {renderSelect('DepressionLevel', 'Nivel de Depresión', ['Low', 'Medium', 'High'], <Brain className="w-5 h-5 text-indigo-500" />)}
              {renderSelect('StressLevels', 'Niveles de Estrés', ['Low', 'Medium', 'High'], <Zap className="w-5 h-5 text-yellow-500" />)}
              {renderSelect('SocialEngagementLevel', 'Nivel de Compromiso Social', ['Low', 'Medium', 'High'], <Users className="w-5 h-5 text-pink-500" />)}
              {renderSelect('MaritalStatus', 'Estado Civil', ['Single', 'Married', 'Widowed'], <Users className="w-5 h-5 text-pink-500" />)}

              {/* Environmental & Genetic */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TreePine className="w-5 h-5" />
                  Factores Ambientales y Genéticos
                </h3>
              </div>

              {renderSelect('AirPollutionExposure', 'Exposición a Contaminación', ['Low', 'Medium', 'High'], <TreePine className="w-5 h-5 text-green-500" />)}
              {renderSelect('UrbanRural', 'Tipo de Área', ['Urban', 'Rural'], <MapPin className="w-5 h-5 text-blue-500" />)}
              {renderSelect('AlzheimerInFamily', 'Alzheimer en la Familia', ['No', 'Yes'], <Users className="w-5 h-5 text-red-500" />)}
              {renderSelect('GeneticRisk', 'Riesgo Genético', ['No', 'Yes'], <Brain className="w-5 h-5 text-red-500" />)}

              {/* Socioeconomic */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Factores Socioeconómicos
                </h3>
              </div>

              {renderSelect('EmploymentStatus', 'Estado Laboral', ['Employed', 'Unemployed', 'Retired'], <Briefcase className="w-5 h-5 text-gray-500" />)}
              {renderSelect('IncomeLevel', 'Nivel de Ingresos', ['Low', 'Medium', 'High'], <DollarSign className="w-5 h-5 text-green-500" />)}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Análisis de Riesgo
                </h3>

                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      Predecir Riesgo
                    </>
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold">Error</span>
                    </div>
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  </div>
                )}

                {prediction && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${
                      prediction.prediction === 'Yes' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {prediction.prediction === 'Yes' ? (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        ) : (
                          <Heart className="w-5 h-5 text-green-600" />
                        )}
                        <span className={`font-bold ${
                          prediction.prediction === 'Yes' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {prediction.prediction === 'Yes' ? 'Riesgo Elevado' : 'Riesgo Bajo'}
                        </span>
                      </div>
                      {prediction.confidence && (
                        <p className="text-sm text-gray-600 mb-2">
                          Confianza: {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">{prediction.message}</p>
                    </div>

                    {prediction.risk_factors && prediction.risk_factors.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Factores de Riesgo Identificados:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {prediction.risk_factors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-yellow-600">•</span>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-600">
                        <strong>Nota importante:</strong> Esta predicción es solo una estimación basada en un modelo de IA y no debe usarse como diagnóstico médico. Consulte siempre con un profesional de la salud.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlzheimerPredictor;