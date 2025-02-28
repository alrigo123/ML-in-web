# api.py (ejemplo con FastAPI)
from fastapi import FastAPI, Query
import pandas as pd
import joblib  # O la librería que hayas utilizado para guardar el modelo

app = FastAPI()

# Cargar datos y modelo al iniciar el servicio
data = pd.read_csv('../../../databases/TIME_SERIES-Andenes_Diario-13-23.csv')
model = joblib.load('../../models/xgboost_model.pkl')

@app.get("/predict")
def predict(n: int = Query(..., description="Número de días adelante a predecir")):
    # Aquí depende de cómo esté implementada tu función de predicción.
    # Por ejemplo, si tu modelo tiene un método 'predict_future' que recibe la data y n:
    prediction = model.predict_future(data, n)
    
    # Convertir la predicción a un formato serializable (por ejemplo, lista)
    return {"prediction": prediction.tolist()}

# Para ejecutar: uvicorn predict_api:app --host 0.0.0.0 --port 8000
