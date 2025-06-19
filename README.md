# Alzheimer's Disease Diagnosis Prediction

This project aims to build a Machine Learning model to predict Alzheimer's disease diagnosis. The model is trained using a comprehensive dataset containing various demographic, health, and lifestyle factors.

## Project Goals

- Predict Alzheimer's disease diagnosis.
- Utilize a dataset with demographic, health, and lifestyle information.
- Perform extensive data preprocessing, including handling missing values, encoding categorical features, and scaling numerical data.
- Implement and tune multiple machine learning models for classification.
- Evaluate model performance using standard classification metrics.

## Data Sources

The data for this project comes from an `AlzheimerData.csv` file. The dataset includes features such as:

- **Demographic Information**: Country, Age, Gender, Education Level, Marital Status, Employment Status, Urban/Rural residency, Income Level.
- **Health Metrics**: BMI, Cognitive Test Score, Cholesterol Level, Diabetes, Hypertension, Alzheimer in Family, Genetic Risk.
- **Lifestyle Factors**: Physical Activity Level, Smoking Status, Alcohol Consumption, Depression Level, Sleep Quality, Dietary Habits, Air Pollution Exposure, Social Engagement Level, Stress Levels.
- **Target Variable**: Alzheimer Diagnosis.

## Approach

1.  **Data Preprocessing**:
    * Import and initial inspection of the dataset.
    * Correction of data types for categorical features.
    * Handling of missing values through imputation (median for numerical, mode for categorical).
    * One-Hot Encoding for multi-category nominal features.
    * Binary Encoding for binary categorical features.
    * Scaling of numerical features.
    * Label encoding for the target variable `AlzheimerDiagnosis`.
    * Saving of preprocessed datasets and processing objects.

2.  **Modeling**:
    * Loading of preprocessed training and testing data.
    * Hyperparameter tuning using `Optuna` for various classification models, including:
        * Logistic Regression
        * K-Nearest Neighbors
        * Support Vector Machine (SVM)
        * Decision Tree
        * Random Forest
        * Gradient Boosting
        * XGBoost
        * LightGBM

3.  **Model Evaluation**:
    * Assessment of model accuracy and reliability using metrics such as:
        * Classification Report
        * Confusion Matrix
        * AUC-ROC Curve
    * Saving the best performing model.

## Requirements

The project requires the following Python libraries:

* `pandas`
* `numpy`
* `matplotlib.pyplot`
* `optuna`
* `seaborn`
* `scikit-learn` 
* `scipy.stats`
* `joblib`
* `xgboost`
* `lightgbm`
* `os`

## Installation

To run this project, clone the repository and install the required libraries.

```bash
git clone https://github.com/pbuitragoa33/Alzheimer-Diagnosis-Prediction.git


