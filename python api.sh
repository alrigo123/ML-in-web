# Instalar dependencias
- pip install fastapi uvicorn xgboost pandas numpy scikit-learn
- pip install fastapi[all]

# GO TO THE FILE's PATH AND EXCEUTE
* uvicorn "file_name (del modelo)":app --host 0.0.0.0 --port 8000 --reload
* python -m uvicorn predict_api:app --host 0.0.0.0 --port 8000 --reload (if above doesnt work)

# URL MODEL VARIABLE
http://localhost:8000/predict?n=30&variable=Temp_max
http://localhost:8000/predict?n=30&variable=Temp_min

# PREDICT API SERVER ADD
"
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
"
