# import pandas as pd

# def load_and_preprocess_data(path: str):
#     df = pd.read_csv(path, delimiter=',')
#     df['Fecha'] = pd.to_datetime(df['Fecha'])
    
#     # Renombrar columnas
#     df = df.rename(columns={"Tｰ Media": "Temp_media", "TｰMaxima": "Temp_max", 
#                             "TｰMinima": "Temp_min", "Lluvia": "Precipitacion", 
#                             "%Humedad": "Humedad"})
    
#     # Mantener solo la variable objetivo
#     df = df.drop(["Año", "Mes", "Dia", "Temp_media", "Temp_min", "Precipitacion", "Temp_max"], axis=1)
    
#     # Crear lags
#     for lag in range(1, 11):
#         df[f'Humedad_lag_{lag}'] = df['Humedad'].shift(lag)

#     # Agregar variables de fecha
#     df['month'] = df['Fecha'].dt.month
#     df['dayofyear'] = df['Fecha'].dt.dayofyear

#     # Eliminar filas con valores NaN
#     df.dropna(inplace=True)
    
#     features = df.drop(columns=['Fecha', 'Humedad'])
#     target = df['Humedad']
    
#     return df, features, target


import pandas as pd

def load_and_preprocess_data(path: str, target_variable: str = "Humedad"):
    """
    Carga y preprocesa los datos, permitiendo seleccionar la variable objetivo.
    Parámetros:
      - path: Ruta del archivo CSV.
      - target_variable: Variable a predecir (debe ser: "Temp_max", "Temp_min", "Humedad" o "Precipitacion").
    Retorna:
      - df: DataFrame completo procesado.
      - features: Conjunto de variables predictoras.
      - target: La variable objetivo.
    """
    df = pd.read_csv(path, delimiter=',')
    df['Fecha'] = pd.to_datetime(df['Fecha'])
    
    # Renombrar columnas
    df = df.rename(columns={
        "Tｰ Media": "Temp_media",
        "TｰMaxima": "Temp_max",
        "TｰMinima": "Temp_min",
        "Lluvia": "Precipitacion",
        "%Humedad": "Humedad"
    })
    
    # Validar que la variable objetivo sea válida
    valid_targets = {"Temp_max", "Temp_min", "Humedad", "Precipitacion"}
    if target_variable not in valid_targets:
        raise ValueError(f"La variable objetivo debe ser una de: {', '.join(valid_targets)}")
    
    # Eliminar columnas irrelevantes, manteniendo la que se desea predecir
    columnas_a_eliminar = {"Año", "Mes", "Dia", "Temp_media", "Temp_min", "Precipitacion", "Temp_max"}
    # Si la variable objetivo se encuentra en el set, la quitamos para no eliminarla
    columnas_a_eliminar.discard(target_variable)
    df = df.drop(columns=list(columnas_a_eliminar), errors="ignore")
    
    # Crear lags para la variable objetivo
    for lag in range(1, 11):
        df[f'{target_variable}_lag_{lag}'] = df[target_variable].shift(lag)
    
    # Agregar variables de fecha
    df['month'] = df['Fecha'].dt.month
    df['dayofyear'] = df['Fecha'].dt.dayofyear

    # Eliminar filas con valores NaN (generados por los lags)
    df.dropna(inplace=True)
    
    # Definir características y target
    features = df.drop(columns=['Fecha', target_variable])
    target = df[target_variable]
    
    return df, features, target
