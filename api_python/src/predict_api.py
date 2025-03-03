from fastapi import FastAPI, Query
from model_xgboost import predict_future
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Permitir solicitudes desde http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # O usa ["*"] para permitir todos los orígenes (no recomendado en producción)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict")
def get_prediction(
    n: int = Query(..., description="Número de días a predecir"),
    variable: str = Query(..., description="Variable objetivo: Temp_max, Temp_min, Humedad o Precipitacion")
):
    try:
        result = predict_future(n, variable)
        return result
    except Exception as e:
        return {"error": str(e)}

# Para ejecutar el servidor desde línea de comandos:
# uvicorn predict_api:app --host 0.0.0.0 --port 8000 --reload
