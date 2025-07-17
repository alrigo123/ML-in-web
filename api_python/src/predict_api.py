from fastapi import FastAPI, Query, APIRouter
# Importa las funciones que realizan la predicción con cada modelo
from model_xgboost import predict_future_xgboost
from model_randomforest import predict_future_random_forest
# Middleware para habilitar CORS (solicitudes cross‑origin)
from fastapi.middleware.cors import CORSMiddleware

# 1) Crear la instancia principal de FastAPI
app = FastAPI()

# 2) Configurar CORS para permitir solicitudes desde el frontend
#    En desarrollo puede usarse ["*"], pero en producción es mejor restringir los orígenes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Orígenes permitidos
    allow_credentials=True,   # Permitir envío de cookies y credenciales
    allow_methods=["*"],      # Métodos HTTP permitidos (GET, POST, etc.)
    allow_headers=["*"],      # Cabeceras permitidas
)

# 3) Crear un router con prefijo "/predict"
#    Así agrupas las rutas de predicción bajo un mismo path
predict_router = APIRouter(prefix="/predict")

# 4) Endpoint GET para predicción con XGBoost
@predict_router.get("/xgboost")
def get_prediction_xgboost(
    n: int = Query(..., description="Número de días a predecir"),
    variable: str = Query(..., description="Variable objetivo: Temp_max, Temp_min, Humedad o Precipitacion")
):
    """
    Recibe:
      - n: cuantos días hacia el futuro quiere predecir
      - variable: qué variable climática predecir
    Llama a predict_future_xgboost y devuelve el resultado o un error.
    """
    try:
        result = predict_future_xgboost(n, variable)
        return result
    except Exception as e:
        # Captura errores y los devuelve en formato JSON
        return {"error": str(e)}

# 5) Endpoint GET para predicción con Random Forest
@predict_router.get("/random_forest")
def get_prediction_random_forest(
    n: int = Query(..., description="Número de días a predecir"),
    variable: str = Query(..., description="Variable objetivo: Temp_max, Temp_min, Humedad o Precipitacion")
):
    """
    Igual que el anterior, pero usa el modelo Random Forest.
    """
    try:
        result = predict_future_random_forest(n, variable)
        return result
    except Exception as e:
        return {"error": str(e)}

# 6) Incluir el router en la app principal
app.include_router(predict_router)