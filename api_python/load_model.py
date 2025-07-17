from xgboost import XGBRegressor
import pickle
import os

# 1) Determinar la ruta base del proyecto (dos niveles arriba de este archivo)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 2) Construir la ruta al archivo JSON del modelo XGBoost
json_model_path = os.path.join(BASE_DIR, "models", "xgboost_model.json")
print("Cargando modelo JSON desde:", json_model_path)

# 3) Crear una instancia vacía de XGBRegressor y cargar los pesos desde JSON
model_json = XGBRegressor()
model_json.load_model(json_model_path)
print("✅ Modelo JSON cargado exitosamente")

# 4) Construir la ruta al archivo Pickle del mismo modelo
pkl_model_path = os.path.join(BASE_DIR, "models", "xgboost_model.pkl")
print("Cargando modelo Pickle desde:", pkl_model_path)

# 5) Abrir el archivo .pkl y deserializarlo para obtener el objeto entrenado
with open(pkl_model_path, "rb") as f:
    model_pkl = pickle.load(f)
print("✅ Modelo Pickle cargado exitosamente")
