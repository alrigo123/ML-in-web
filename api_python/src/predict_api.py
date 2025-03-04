from fastapi import FastAPI, Query, APIRouter
from model_xgboost import predict_future_xgboost
from model_randomforest import predict_future_random_forest
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permitir solicitudes desde http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O usa ["*"] para permitir todos los orígenes (no recomendado en producción)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear un router con la ruta base /predict
predict_router = APIRouter(prefix="/predict")

# Endpoint para el modelo XGBoost
@predict_router.get("/xgboost")
def get_prediction_xgboost(
    n: int = Query(..., description="Número de días a predecir"),
    variable: str = Query(..., description="Variable objetivo: Temp_max, Temp_min, Humedad o Precipitacion")
):
    try:
        result = predict_future_xgboost(n, variable)
        return result
    except Exception as e:
        return {"error": str(e)}

# Endpoint para el modelo Random Forest en /predict/random_forest
@predict_router.get("/random_forest")
def get_prediction_random_forest(
    n: int = Query(..., description="Número de días a predecir"),
    variable: str = Query(..., description="Variable objetivo: Temp_max, Temp_min, Humedad o Precipitacion")
):
    try:
        result = predict_future_random_forest(n, variable)
        return result
    except Exception as e:
        return {"error": str(e)}


# Incluir el router en la aplicación principal
app.include_router(predict_router)

# Para ejecutar el servidor desde línea de comandos:
# uvicorn predict_api:app --host 0.0.0.0 --port 8000 --reload
