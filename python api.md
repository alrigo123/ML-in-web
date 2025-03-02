# Instalar dependencias
- pip install fastapi uvicorn xgboost pandas numpy scikit-learn


# GO TO THE FILE's PATH AND EXCEUTE
- uvicorn "file_name (del modelo)":app --host 0.0.0.0 --port 8000 --reload
- python -m uvicorn predict_api:app --host 0.0.0.0 --port 8000 --reload (if above doesnt work)

# URL MODEL
http://localhost:8000/predict?n=10