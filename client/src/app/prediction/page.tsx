import React from 'react'
import Link from "next/link";

const Predictions = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Predicciones de Modelos</h1>
      <div className="flex gap-4">
        <Link
          href="/prediction/xgboost"
          className="bg-blue-600 text-dark p-4 rounded"
        >
          XGBoost
        </Link>
        <Link
          href="/prediction/randomforest"
          className="bg-green-600 text-dark p-4 rounded"
        >
          RandomForest
        </Link>
      </div>
    </div>
  )
}

export default Predictions
