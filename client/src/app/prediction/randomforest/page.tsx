/* eslint-disable react-hooks/rules-of-hooks */
"use client"; // Si necesitas usar estado o efectos en Next.js 13

import { useState } from "react";
import axios from "axios";
import styles from "../../../styles/page-predict.module.css";

interface PredictionResponse {
  dates: string[];
  predictions: number[];
}

export default function RandomForestPrediction() {
  const [n, setN] = useState<number>(7);
  const [variable, setVariable] = useState<string>("Humedad");
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:7000/predict/xgboost", {
        params: { n, variable },
      });
      setPrediction(response.data);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Error al obtener la predicción");
    } finally {
      setLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Predicción Meteorológica</h1>

        {!prediction && (
          <>
            <p className={styles.subHeading}>
              Ingresa el número de días y selecciona la variable para ver la predicción.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="n" className={styles.label}>
                  Número de días:
                </label>
                <input
                  id="n"
                  type="number"
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="variable" className={styles.label}>
                  Variable objetivo:
                </label>
                <select
                  id="variable"
                  value={variable}
                  onChange={(e) => setVariable(e.target.value)}
                  className={styles.select}
                >
                  <option value="Temp_max">Temp_max</option>
                  <option value="Temp_min">Temp_min</option>
                  <option value="Humedad">Humedad</option>
                  <option value="Precipitacion">Precipitacion</option>
                </select>
              </div>
              <button type="submit" className={styles.button}>
                Mostrar Predicción
              </button>
            </form>
          </>
        )}

        {loading && <p style={{ marginTop: "20px", textAlign: "center" }}>Cargando...</p>}
        {error && (
          <p style={{ marginTop: "20px", textAlign: "center", color: "red" }}>{error}</p>
        )}

        {prediction && (
          <div style={{ marginTop: "30px" }}>
            <h2 className={styles.heading}>
              Predicción de {variable} para {n} {n === 1 ? "día" : "días"}
            </h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Predicción</th>
                </tr>
              </thead>
              <tbody>
                {prediction.dates.map((date, index) => (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{prediction.predictions[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={resetPrediction} className={styles.backButton}>
                Regresar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
