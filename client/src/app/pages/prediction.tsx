"use client";

// pages/prediccion.tsx
import { useState, useEffect } from 'react';

interface PredictionData {
  dates: string[];
  predictions: number[];
}

export default function PrediccionPage() {
  const [data, setData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const nDias: number = 10; // Número de días a predecir; puedes parametrizarlo

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const response = await fetch(`/api/predict?n=${nDias}`);
        const result: PredictionData = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener la predicción:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrediction();
  }, [nDias]);

  return (
    <div>
      <h1>Predicción a {nDias} días</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : data ? (
        <div>
          <h2>Fechas y Predicciones:</h2>
          <ul>
            {data.dates.map((fecha, index) => (
              <li key={index}>
                {fecha}: {data.predictions[index].toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron datos.</p>
      )}
    </div>
  );
}
