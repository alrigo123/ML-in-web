# predict_api.py
from fastapi import FastAPI, Query
import pandas as pd
import numpy as np
import joblib  # Si decides guardar el modelo o recargarlo
import xgboost as xgb
from datetime import timedelta

app = FastAPI()

# --- Cargar y preparar los datos y el modelo al iniciar el servicio ---
# Lee el CSV y realiza las transformaciones iniciales
path = '../../../databases/TIME_SERIES-Andenes_Diario-13-23.csv'
df = pd.read_csv(path, delimiter=',')
df['Fecha'] = pd.to_datetime(df['Fecha'])
df = df.rename(columns={"Tｰ Media": "Temp_media", "TｰMaxima": "Temp_max", "TｰMinima": "Temp_min", "Lluvia": "Precipitacion", "%Humedad": "Humedad" })
df = df.drop(["Año", "Mes", "Dia","Temp_media", "Temp_min", "Precipitacion", "Temp_max"], axis=1)  # Dejamos solo Humedad
# Crear lags
for lag in range(1, 11):  # lags 1 a 10
    df[f'Humedad_lag_{lag}'] = df['Humedad'].shift(lag)
# Agregar variables de fecha
df['month'] = df['Fecha'].dt.month
df['dayofyear'] = df['Fecha'].dt.dayofyear
df.dropna(inplace=True)

# Definir características y objetivo
features = df.drop(columns=['Fecha', 'Humedad'])
target = df['Humedad']

# Entrenamiento (aquí suponemos que ya has entrenado el modelo; en producción podrías cargar uno serializado)
model = xgb.XGBRegressor(
    objective='reg:squarederror',
    n_estimators=1000,
    max_depth=150,
    learning_rate=0.01,
    subsample=0.7,
    colsample_bytree=0.7,
    gamma=0.1,
    reg_alpha=0,
    reg_lambda=1,
    eval_metric="rmse"
)
# Dividir datos (sin shuffle para series temporales)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, shuffle=False)
model.fit(X_train, y_train, eval_set=[(X_train, y_train), (X_test, y_test)], verbose=False)

# --- Definir la función de predicción futura ---
def predict_future(n_days: int):
    # Usar las últimas observaciones para iniciar las predicciones
    last_observations = df.drop(columns=['Fecha', 'Humedad']).iloc[-1].values.copy()
    future_dates = pd.date_range(start=df['Fecha'].iloc[-1] + pd.Timedelta(days=1), periods=n_days, freq='D')
    predictions = []

    for i in range(n_days):
        temp_df = pd.DataFrame([last_observations], columns=features.columns)
        future_pred = model.predict(temp_df)[0]
        # Convertir a float de Python antes de agregarlo
        predictions.append(float(future_pred))
        # Actualizar las observaciones para la siguiente predicción
        last_observations = np.roll(last_observations, -1)
        last_observations[-1] = future_pred
        print(f"Predicción {i+1}: {future_pred}")
    return {
        "dates": [str(date.date()) for date in future_dates],
        "predictions": predictions
    }


# --- Definir el endpoint REST ---
@app.get("/predict")
def get_prediction(n: int = Query(..., description="Número de días a predecir")):
    result = predict_future(n)
    return result

# Para ejecutar: uvicorn predict_api:app --host 0.0.0.0 --port 8000
