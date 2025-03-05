'use client';
import { useEffect, useState } from "react";
import axios from "axios";

export default function RandomForestPrediction() {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const response = await axios.get("http://localhost:7000/predict", {
          params: { n: 10, variable: "valorEjemplo", model: "randomforest" },
        });
        setPrediction(response.data);
      } catch (error) {
        console.error("Error al obtener la predicción:", error);
      }
    }
    fetchPrediction();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Predicción con RandomForest</h1>
      <p>
        {prediction ? JSON.stringify(prediction) : "Cargando predicción..."}
      </p>
    </div>
  );
}
