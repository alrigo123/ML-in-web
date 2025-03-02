import xgboost as xgb
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from data_loader import load_and_preprocess_data

# Ruta del dataset
DATA_PATH = '../../../databases/TIME_SERIES-Andenes_Diario-13-23.csv'
DATA_PATH_M = '../../../databases/TIME_SERIES-Andenes_Mensual-86-23.csv'

# Cargar los datos
df, features, target = load_and_preprocess_data(DATA_PATH)

# Dividir datos (sin shuffle porque es una serie temporal)
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, shuffle=False)

# Definir y entrenar el modelo
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
model.fit(X_train, y_train, eval_set=[(X_train, y_train), (X_test, y_test)], verbose=False)

# Función para predecir días futuros
def predict_future(n_days: int):
    last_observations = df.drop(columns=['Fecha', 'Humedad']).iloc[-1].values.copy()
    future_dates = pd.date_range(start=df['Fecha'].iloc[-1] + pd.Timedelta(days=1), periods=n_days, freq='D')
    predictions = []

    for i in range(n_days):
        temp_df = pd.DataFrame([last_observations], columns=features.columns)
        future_pred = model.predict(temp_df)[0]
        predictions.append(float(future_pred))  # Convertir a float antes de añadir

        # Actualizar observaciones
        last_observations = np.roll(last_observations, -1)
        last_observations[-1] = future_pred
    
    return {"dates": [str(date.date()) for date in future_dates], "predictions": predictions}
