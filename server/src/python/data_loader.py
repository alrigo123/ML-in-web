import pandas as pd

def load_and_preprocess_data(path: str):
    df = pd.read_csv(path, delimiter=',')
    df['Fecha'] = pd.to_datetime(df['Fecha'])
    
    # Renombrar columnas
    df = df.rename(columns={"Tｰ Media": "Temp_media", "TｰMaxima": "Temp_max", 
                            "TｰMinima": "Temp_min", "Lluvia": "Precipitacion", 
                            "%Humedad": "Humedad"})
    
    # Mantener solo la variable objetivo
    df = df.drop(["Año", "Mes", "Dia", "Temp_media", "Temp_min", "Precipitacion", "Temp_max"], axis=1)
    
    # Crear lags
    for lag in range(1, 11):
        df[f'Humedad_lag_{lag}'] = df['Humedad'].shift(lag)

    # Agregar variables de fecha
    df['month'] = df['Fecha'].dt.month
    df['dayofyear'] = df['Fecha'].dt.dayofyear

    # Eliminar filas con valores NaN
    df.dropna(inplace=True)
    
    features = df.drop(columns=['Fecha', 'Humedad'])
    target = df['Humedad']
    
    return df, features, target
