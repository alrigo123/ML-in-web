import xgboost as xgb
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from data_loader import load_and_preprocess_data

# Definir la ruta del CSV
CSV_PATH = '../../databases/TIME_SERIES-Andenes_Diario-13-23.csv'
CSV_PATH_M = '../../databases/TIME_SERIES-Andenes_Mensual-86-23.csv'

def train_model(target_variable: str):
    """
    Carga los datos, los preprocesa y entrena el modelo XGBoost.
    Retorna:
      - df: DataFrame con las fechas.
      - features: Variables predictoras.
      - model: Modelo entrenado.
    """
    df, features, target = load_and_preprocess_data(CSV_PATH, target_variable=target_variable)
    
    # Dividir en entrenamiento y prueba (sin mezclar, ya que es una serie temporal)
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, shuffle=False)
    
    # Configuración y entrenamiento del modelo XGBoost
    model = xgb.XGBRegressor(
        objective='reg:squarederror',
        n_estimators=100,    # Puedes ajustar estos parámetros
        max_depth=10,
        learning_rate=0.01
    )
    model.fit(X_train, y_train, eval_set=[(X_train, y_train), (X_test, y_test)], verbose=False)
    
    return df, features, model

def predict_future(n_days: int, target_variable: str):
    """
    Realiza predicciones futuras.
    Parámetros:
      - n_days: Número de días a predecir.
      - target_variable: Variable objetivo.
    Retorna:
      - Diccionario con las fechas futuras y las predicciones.
    """
    df, features, model = train_model(target_variable)
    
    # Tomamos las últimas observaciones del conjunto de features para iniciar las predicciones
    last_observations = features.iloc[-1].values.copy()
    future_dates = pd.date_range(start=df['Fecha'].iloc[-1] + pd.Timedelta(days=1), periods=n_days, freq='D')
    predictions = []

    for i in range(n_days):
        temp_df = pd.DataFrame([last_observations], columns=features.columns)
        future_pred = model.predict(temp_df)[0]
        predictions.append(float(future_pred))
        
        # Actualizamos las observaciones para la siguiente predicción (autoregresivo)
        last_observations = np.roll(last_observations, -1)
        last_observations[-1] = future_pred

    return {"dates": [str(date.date()) for date in future_dates], "predictions": predictions}
