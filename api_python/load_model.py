from xgboost import XGBRegressor
import pickle
import os

# Definir la ruta base
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Cargar modelo JSON
json_model_path = os.path.join(BASE_DIR, "models", "xgboost_model.json")
print("Cargando modelo JSON desde:", json_model_path)

model_json = XGBRegressor()
model_json.load_model(json_model_path)
print("✅ Modelo JSON cargado exitosamente")

# Cargar modelo Pickle
pkl_model_path = os.path.join(BASE_DIR, "models", "xgboost_model.pkl")
print("Cargando modelo Pickle desde:", pkl_model_path)

with open(pkl_model_path, "rb") as f:
    model_pkl = pickle.load(f)
print("✅ Modelo Pickle cargado exitosamente")


