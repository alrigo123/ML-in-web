import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from xgboost import XGBRegressor
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

import xgboost as xgb
from sklearn.metrics import mean_squared_error
color_pal = sns.color_palette()

# // read the csv file and store it in DataFrame -> data_csv object, and Country column will be the index use as index of the DataFrame
path = '/content/drive/MyDrive/Colab Notebooks/MACHINE LEARNING TESIS/TIME-SERIES-Diario-13-23.csv'
# path = '/content/drive/MyDrive/Colab Notebooks/MACHINE LEARNING TESIS/TIME-SERIES-Mensual-86-23.csv'
df = pd.read_csv(path,delimiter=',')
df

# Asegúrate de convertir la columna de fecha al formato adecuado
df['Fecha'] = pd.to_datetime(df['Fecha'])
# data.set_index('Fecha', inplace=True)
df = df.rename(columns={"Tｰ Media": "Temp_media", "TｰMaxima": "Temp_max", "TｰMinima": "Temp_min", "Lluvia": "Precipitacion", "%Humedad": "Humedad" })
# all_data = df.drop(["Año", "Mes", "Dia", "Temp_media"], axis=1)
# df = df.drop(["Año", "Mes", "Temp_media", "Temp_min", "Precipitacion", "Temp_max"], axis=1) #Humedad
df = df.drop(["Año", "Mes", "Dia","Temp_media", "Temp_min", "Precipitacion", "Temp_max"], axis=1) #Humedad
df

# Eliminar valores nulos generados por el shift
df.dropna(inplace=True)

# Crear características de lags
for lag in range(1, 10+1):  # 7 lags (una semana de retraso)
    df[f'Humedad_lag_{lag}'] = df['Humedad'].shift(lag)

# Agregar componentes de estacionalidad (mes y día del año)
df['month'] = df['Fecha'].dt.month
df['dayofyear'] = df['Fecha'].dt.dayofyear

# Eliminar valores nulos generados por el shift
df.dropna(inplace=True)
# Mostrar las primeras filas con las nuevas características
df.head()

from sklearn.model_selection import train_test_split

# Definir características y variable objetivo
features = df.drop(columns=['Fecha', 'Humedad'])
target = df['Humedad']

# Dividir los datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, shuffle=False)

# Mostrar las dimensiones de los conjuntos de datos
X_train.shape, X_test.shape

import xgboost as xgb
from sklearn.metrics import mean_squared_error

model = xgb.XGBRegressor(
    base_score=0.5,
    booster='gbtree', # Utiliza árboles de decisión.
    objective='reg:squarederror',
    # early_stopping_rounds=50,

    n_estimators=1000,  # Ajustado para un aprendizaje más rápido
    max_depth=150,  # Más profundo para capturar más complejidad
    learning_rate=0.01,  # Aumentado para un aprendizaje más rápido
    subsample=0.7,  # Usar solo 80% de las muestras para cada árbol
    colsample_bytree=0.7,  # Usar solo 80% de las características para cada árbol
    gamma=0.1,  # Prueba también con valores como 0.1, 0.2
    reg_alpha=0,  # Regularización L1
    reg_lambda=1,  # Regularización L2

    eval_metric="rmse"
)

eval_set = [(X_train, y_train), (X_test, y_test)]

# Entrenar el modelo
model.fit(X_train, y_train,  eval_set=[(X_train, y_train), (X_test, y_test)], verbose=2)

# # Predecir el conjunto de prueba
# y_pred = model.predict(X_test)

# Predicciones
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

# Calcular el MSE
mse = mean_squared_error(y_test, y_test_pred)
# Calcular el RMSE
rmse = np.sqrt(mse)
# Calcular R-cuadrado (coefficient of determination)
r2 = r2_score(y_test, y_test_pred)
# Calcular el MAE
mae = mean_absolute_error(y_test, y_test_pred)
# Imprimir las métricas
print(f'MSE: {mse:.5f}')
print(f'RMSE: {rmse:.5f}')
print(f'R² Score: {r2:.5f}')
print(f'MAE: {mae:.5f}')

plt.figure(figsize=(14, 6))
plt.plot(df['Fecha'].iloc[:len(X_train)], y_train, label='Datos de Entrenamiento', color='blue')
plt.plot(df['Fecha'].iloc[len(X_train):], y_test, label='Datos de Prueba', color='green')
plt.plot(df['Fecha'].iloc[len(X_train):], y_test_pred, label='Predicciones', color='red')
plt.xlabel('Fecha')
plt.ylabel('Humedad')
# plt.title('Comparación de Datos Reales y Predicciones')
plt.legend()
# plt.grid()
plt.show()

# Número de días a predecir en el futuro
future_days = 24

# Crear un DataFrame para las predicciones futuras
future_dates = pd.date_range(start=df['Fecha'].iloc[-1] + pd.Timedelta(days=1), periods=future_days, freq='D')
# future_dates = pd.date_range(start=df['Fecha'].iloc[-1] + pd.Timedelta(days=1), periods=future_days, freq='M')
future_df = pd.DataFrame({'Fecha': future_dates})

# Usar las últimas observaciones como características para predecir el futuro
# Asegúrate de que estás obteniendo el número correcto de lags (en este caso, 7)
last_observations = df.drop(columns=['Fecha', 'Humedad']).iloc[-1].values  # Cambiado de [-7:] a [-1]

# Inicializar una lista para almacenar las predicciones futuras
future_predictions = []

# Iterar sobre el número de días a predecir
for i in range(future_days):
    # Crear un DataFrame temporal con las características para predecir
    # Asegúrate de que la forma de los datos coincida con lo que espera el modelo
    temp_df = pd.DataFrame([last_observations], columns=features.columns)

    # Predecir el próximo valor
    future_pred = model.predict(temp_df)[0]

    # Agregar la predicción al DataFrame futuro
    future_df.loc[i, 'Humedad'] = future_pred

    # Actualizar las observaciones para la siguiente predicción
    last_observations = np.roll(last_observations, -1)  # Rueda los valores para dejar espacio para el nuevo
    last_observations[-1] = future_pred  # Añadir la nueva predicción al final

# Gráfico de las predicciones futuras
plt.figure(figsize=(14, 6))
plt.plot(df['Fecha'], df['Humedad'], label='Datos Reales', color='blue', linewidth=2)
plt.plot(future_df['Fecha'], future_df['Humedad'], label='Predicciones Futuras', color='orange', linestyle='dashed', linewidth=2)
plt.xlabel('Fecha')
plt.ylabel('Temperatura Máxima')
plt.title('Predicciones Futuras de Temperatura Máxima usando XGBoost')
plt.legend()
plt.grid()
plt.show()