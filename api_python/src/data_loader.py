import pandas as pd

def load_and_preprocess_data(path: str, target_variable: str = "Humedad"):
    """
    Carga y preprocesa los datos, permitiendo seleccionar la variable objetivo.
    Parámetros:
      - path: Ruta del archivo CSV.
      - target_variable: Variable a predecir 
                         (debe ser: "Temp_max", "Temp_min", "Humedad" o "Precipitacion").
    Retorna:
      - df: DataFrame completo procesado.
      - features: Conjunto de variables predictoras.
      - target: Serie con la variable objetivo.
    """
    # 1) Leer el CSV desde la ruta indicada
    df = pd.read_csv(path, delimiter=',')
    
    # 2) Convertir la columna 'Fecha' a tipo datetime para facilidad de manejo
    df['Fecha'] = pd.to_datetime(df['Fecha'])
    
    # 3) Renombrar columnas con nombres más amigables
    df = df.rename(columns={
        "Tｰ Media": "Temp_media",
        "TｰMaxima": "Temp_max",
        "TｰMinima": "Temp_min",
        "Lluvia": "Precipitacion",
        "%Humedad": "Humedad"
    })
    
    # 4) Validar que la variable objetivo sea una de las permitidas
    valid_targets = {"Temp_max", "Temp_min", "Humedad", "Precipitacion"}
    if target_variable not in valid_targets:
        raise ValueError(
            f"La variable objetivo debe ser una de: {', '.join(valid_targets)}"
        )
    
    # 5) Eliminar columnas que no aportan al modelo, salvo la target
    #    Empezamos con un set genérico de columnas a eliminar...
    columnas_a_eliminar = {
        "Año", "Mes", "Dia",
        "Temp_media", "Temp_min", "Precipitacion", "Temp_max"
    }
    #    ...y quitamos la target para que no se elimine por error
    columnas_a_eliminar.discard(target_variable)
    #    Luego eliminamos esas columnas (errors="ignore" evita errores si no existen)
    df = df.drop(columns=list(columnas_a_eliminar), errors="ignore")
    
    # 6) Generar características de rezago (lags) de 1 a 10 días para la target
    for lag in range(1, 11):
        df[f'{target_variable}_lag_{lag}'] = df[target_variable].shift(lag)
    
    # 7) Extraer variables de fecha útiles para capturar patrones estacionales
    df['month'] = df['Fecha'].dt.month         # Mes del año (1–12)
    df['dayofyear'] = df['Fecha'].dt.dayofyear # Día ordinal del año (1–365/366)
    
    # 8) Eliminar filas con NaN, producidas por los lags iniciales
    df.dropna(inplace=True)
    
    # 9) Separar en *features* (todas menos Fecha y la target) y *target*
    features = df.drop(columns=['Fecha', target_variable])
    target = df[target_variable]
    
    # 10) Retornar el DataFrame completo, las features y la target
    return df, features, target
